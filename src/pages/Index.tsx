import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { OrderForm } from "@/components/OrderForm";
import { RecentOrders } from "@/components/RecentOrders";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<{title: string; price: string} | null>(null);

  const diamondProducts = [
    { title: "25 Diamonds", price: "৳25", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "50 Diamonds", price: "৳40", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "115 Diamonds", price: "৳80", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "240 Diamonds", price: "৳160", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "355 Diamonds", price: "৳280", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "480 Diamonds", price: "৳320", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "610 Diamonds", price: "৳410", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "850 Diamonds", price: "৳570", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "1240 Diamonds", price: "৳820", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "1850 Diamonds", price: "৳1230", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "2530 Diamonds", price: "৳1650", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "5060 Diamonds", price: "৳3280", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "10120 Diamonds", price: "৳6550", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "1090 Diamonds", price: "৳690", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
    { title: "12650 Diamonds", price: "৳7600", image: "/lovable-uploads/1b6cfbcf-127f-4e4f-b8b8-eb23bca5448a.png" },
  ];

  const membershipProducts = [
    { title: "Weekly Membership", price: "৳160", image: "/lovable-uploads/f7fda25d-1bc9-4bae-b0df-cb82b8a08d9f.png" },
    { title: "Monthly Membership", price: "৳770", image: "/lovable-uploads/f7fda25d-1bc9-4bae-b0df-cb82b8a08d9f.png" },
    { title: "Weekly Membership 2X", price: "৳320", image: "/lovable-uploads/f7fda25d-1bc9-4bae-b0df-cb82b8a08d9f.png" },
    { title: "Monthly Membership 2X", price: "৳1440", image: "/lovable-uploads/f7fda25d-1bc9-4bae-b0df-cb82b8a08d9f.png" },
  ];

  const levelUpProducts = [
    { title: "Level Up Pass 6 LV", price: "৳40", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Level Up Pass 10 LV", price: "৳70", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Level Up Pass 15 LV", price: "৳70", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Level Up Pass 20 LV", price: "৳70", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Level Up Pass 25 LV", price: "৳70", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Level Up Pass 30 LV", price: "৳100", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
    { title: "Full Level Up Pass", price: "৳420", image: "/lovable-uploads/77c005cd-5f28-4f05-bfee-11b6507553fb.png" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">TIJARAH Top up Center</h1>
          <p className="text-center text-muted-foreground mt-2">Fast & Secure Free Fire Recharge</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="diamond" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="diamond">Diamond</TabsTrigger>
                <TabsTrigger value="membership">Weekly/Monthly</TabsTrigger>
                <TabsTrigger value="levelup">Level Up Pass</TabsTrigger>
              </TabsList>

              <TabsContent value="diamond" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {diamondProducts.map((product) => (
                    <ProductCard
                      key={product.title}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      isSelected={selectedProduct?.title === product.title}
                      onSelect={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="membership" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {membershipProducts.map((product) => (
                    <ProductCard
                      key={product.title}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      isSelected={selectedProduct?.title === product.title}
                      onSelect={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="levelup" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {levelUpProducts.map((product) => (
                    <ProductCard
                      key={product.title}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      isSelected={selectedProduct?.title === product.title}
                      onSelect={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OrderForm selectedProduct={selectedProduct} />
          </div>
        </div>

        {/* Footer with Recent Orders */}
        <footer className="mt-16 py-8 border-t">
          <RecentOrders />
        </footer>
      </div>
    </div>
  );
};

export default Index;
