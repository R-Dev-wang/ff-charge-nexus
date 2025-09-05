-- Remove August and September 2025 orders
DELETE FROM public.orders 
WHERE created_at >= '2025-08-01' AND created_at < '2025-10-01';