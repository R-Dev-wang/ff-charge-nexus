-- Add a sequence for order numbers and update the table
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 1001;

-- Set default value for order_number to use the sequence
ALTER TABLE public.orders 
ALTER COLUMN order_number SET DEFAULT nextval('order_number_seq');

-- Update existing records to have proper order numbers
UPDATE public.orders 
SET order_number = nextval('order_number_seq') 
WHERE order_number > 2147483647;