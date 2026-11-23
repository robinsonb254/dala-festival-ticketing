-- PayPal checkout does not require a Kenyan phone number.
-- M-Pesa checkout continues to validate and store a normalized phone number in the API.
ALTER TABLE public.ticket_orders
  ALTER COLUMN phone DROP NOT NULL;
