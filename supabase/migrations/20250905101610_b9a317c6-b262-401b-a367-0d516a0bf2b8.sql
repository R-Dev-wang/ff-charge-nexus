-- Clear all existing orders
DELETE FROM public.orders;

-- Reset the order number sequence to start from 1
ALTER SEQUENCE order_number_seq RESTART WITH 1;

-- Insert sample/example orders for demonstration
INSERT INTO public.orders (uid, product_name, price, created_at) VALUES 
('123456789', '25 Diamonds', 25, now() - interval '2 hours'),
('987654321', '50 Diamonds', 40, now() - interval '1 day'),
('555666777', 'Weekly Membership', 160, now() - interval '3 days'),
('444555666', '115 Diamonds', 80, now() - interval '1 week'),
('333444555', 'Level Up Pass 6 LV', 40, now() - interval '2 weeks');