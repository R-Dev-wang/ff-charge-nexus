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

interface GroupedOrders {
  [key: string]: Order[];
}

export const RecentOrders = () => {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrders>({});

  useEffect(() => {
    fetchRecentOrders();
    
    // Clean up old orders (older than 6 months)
    cleanupOldOrders();
    
    // Set up real-time subscription for order updates
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, () => {
        fetchRecentOrders();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      // Group orders by month
      const grouped = (data || []).reduce((acc: GroupedOrders, order) => {
        const date = new Date(order.created_at);
        const monthKey = date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        });
        
        if (!acc[monthKey]) {
          acc[monthKey] = [];
        }
        acc[monthKey].push(order);
        return acc;
      }, {});
      
      setGroupedOrders(grouped);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cleanupOldOrders = async () => {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      await supabase
        .from('orders')
        .delete()
        .lt('created_at', sixMonthsAgo.toISOString());
    } catch (error) {
      console.error('Error cleaning up old orders:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (Object.keys(groupedOrders).length === 0) return null;

  return (
    <div className="space-y-6">
      {Object.entries(groupedOrders).map(([month, orders]) => (
        <Card key={month}>
          <CardHeader>
            <CardTitle className="text-lg">{month} Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm"
                >
                  <div>
                    <p className="font-semibold">Order #{order.order_number}</p>
                    <p className="text-muted-foreground">UID: {order.uid}</p>
                    <p className="text-muted-foreground text-xs">{formatDate(order.created_at)}</p>
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
      ))}
    </div>
  );
};