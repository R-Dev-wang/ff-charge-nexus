import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: number;
  uid: string;
  product_name: string;
  price: number;
  order_number: number;
  created_at: string;
}

export const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchRecentOrders();
    
    // Clean up old orders (older than 2 months)
    cleanupOldOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cleanupOldOrders = async () => {
    try {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      await supabase
        .from('orders')
        .delete()
        .lt('created_at', twoMonthsAgo.toISOString());
    } catch (error) {
      console.error('Error cleaning up old orders:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (orders.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm"
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-muted-foreground">{formatDate(order.created_at)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.product_name}</p>
                <p className="text-primary font-bold">৳{order.price}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};