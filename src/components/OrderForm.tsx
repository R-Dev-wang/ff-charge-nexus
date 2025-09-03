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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOrder = async () => {
    if (!selectedProduct || !uid.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a product, enter your UID and password",
        variant: "destructive",
      });
      return;
    }

    if (password !== "098765") {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password",
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
      setPassword("");
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
        
        <div className="animate-fade-in">
          <Label htmlFor="uid">Free Fire UID</Label>
          <Input
            id="uid"
            type="text"
            placeholder="Enter your FF UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="transition-all duration-300 focus:scale-105"
          />
        </div>
        
        <div className="animate-fade-in">
          <Label htmlFor="password">Security Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter security password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="transition-all duration-300 focus:scale-105"
          />
        </div>
        
        <Button 
          onClick={handleOrder}
          disabled={!selectedProduct || !uid.trim() || !password.trim() || isLoading}
          className="w-full hover-scale transition-all duration-300"
        >
          {isLoading ? "Processing..." : "Order Now"}
        </Button>
      </CardContent>
    </Card>
  );
};