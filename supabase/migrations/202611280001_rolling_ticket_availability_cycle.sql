-- Seven-day rolling public availability cycle for the three independent DALA75 offer categories.
-- Counts are presentation counters, not hard inventory limits. Only paid DALA75 orders
-- for Regular, VIP or VVIP advance the counter; every third unit rolls it back to 3.

alter table public.ticket_orders
  add column if not exists offer_code text;
create table if not exists public.ticket_availability_cycles (
  ticket_type text primary key check (ticket_type in ('Regular','VIP','VVIP')),
  cycle_progress integer not null default 0 check (cycle_progress between 0 and 2),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  updated_at timestamptz not null default now(),
  constraint ticket_availability_window_valid check (ends_at > starts_at)
);

insert into public.ticket_availability_cycles (ticket_type, cycle_progress, starts_at, ends_at)
values
  ('Regular', 0, timestamptz '2026-11-29 00:30:00+00', timestamptz '2026-12-06 00:30:00+00'),
  ('VIP', 0, timestamptz '2026-11-29 00:30:00+00', timestamptz '2026-12-06 00:30:00+00'),
  ('VVIP', 0, timestamptz '2026-11-29 00:30:00+00', timestamptz '2026-12-06 00:30:00+00')
on conflict (ticket_type) do nothing;

-- A ledger makes the update idempotent even if an order is ever reprocessed.
create table if not exists public.ticket_availability_sales (
  order_id uuid primary key references public.ticket_orders(id) on delete restrict,
  ticket_type text not null,
  quantity integer not null check (quantity > 0),
  recorded_at timestamptz not null default now()
);

alter table public.ticket_availability_cycles enable row level security;
alter table public.ticket_availability_sales enable row level security;

revoke all on table public.ticket_availability_cycles from anon, authenticated, public;
revoke all on table public.ticket_availability_sales from anon, authenticated, public;
grant all on table public.ticket_availability_cycles to service_role;
grant all on table public.ticket_availability_sales to service_role;

create or replace function public.record_paid_ticket_availability()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  recorded_order_id uuid;
begin
  if new.offer_code is distinct from 'DALA75'
     or new.ticket_type not in ('Regular', 'VIP', 'VVIP') then
    return new;
  end if;

  insert into public.ticket_availability_sales (order_id, ticket_type, quantity)
  values (new.id, new.ticket_type, new.quantity)
  on conflict (order_id) do nothing
  returning order_id into recorded_order_id;

  if recorded_order_id is not null then
    update public.ticket_availability_cycles
    set cycle_progress = mod(cycle_progress + new.quantity, 3),
        updated_at = clock_timestamp()
    where ticket_type = new.ticket_type
      and clock_timestamp() >= starts_at
      and clock_timestamp() < ends_at;
  end if;

  return new;
end;
$$;

revoke all on function public.record_paid_ticket_availability() from public, anon, authenticated;
grant execute on function public.record_paid_ticket_availability() to service_role;

drop trigger if exists ticket_orders_record_paid_availability on public.ticket_orders;
create trigger ticket_orders_record_paid_availability
after update of payment_status on public.ticket_orders
for each row
when (old.payment_status is distinct from 'paid' and new.payment_status = 'paid')
execute function public.record_paid_ticket_availability();
