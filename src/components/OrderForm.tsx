import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  selectedProduct: {
    title: string;
    price: string;
  } | null;
}

export const OrderForm = ({ selectedProduct }: OrderFormProps) => {
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOrder = async () => {
    if (!selectedProduct || !uid.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a product and enter your UID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          uid: uid.trim(),
          product_name: selectedProduct.title,
          price: parseFloat(selectedProduct.price.replace('৳', ''))
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${data.id} for ${selectedProduct.title}`,
      });

      setUid("");
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Order Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Place Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedProduct && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-semibold">{selectedProduct.title}</p>
            <p className="text-primary font-bold">{selectedProduct.price}</p>
          </div>
        )}
        
        <div>
          <Label htmlFor="uid">Free Fire UID</Label>
          <Input
            id="uid"
            type="text"
            placeholder="Enter your FF UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleOrder}
          disabled={!selectedProduct || !uid.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Order Now"}
        </Button>
      </CardContent>
    </Card>
  );
};