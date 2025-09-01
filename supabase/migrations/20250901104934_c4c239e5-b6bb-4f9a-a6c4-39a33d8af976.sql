-- Drop the unique constraint on order_number
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_order_number_key;