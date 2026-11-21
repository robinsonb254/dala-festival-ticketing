-- Allow only one active M-Pesa checkout per normalized phone number.
-- Older abandoned prompts are expired by the checkout endpoint before a new order.
with ranked_pending as (
  select id,
         row_number() over (partition by phone order by created_at desc, id desc) as position
  from public.ticket_orders
  where payment_provider = 'mpesa'
    and payment_status = 'pending'
    and created_at >= now() - interval '5 minutes'
)
update public.ticket_orders as orders
set payment_status = 'failed'
from ranked_pending
where orders.id = ranked_pending.id
  and ranked_pending.position > 1;

update public.ticket_orders
set payment_status = 'failed'
where payment_provider = 'mpesa'
  and payment_status = 'pending'
  and created_at < now() - interval '5 minutes';

create unique index if not exists ticket_orders_one_pending_mpesa_per_phone
on public.ticket_orders (phone)
where payment_provider = 'mpesa' and payment_status = 'pending';
