import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  onSelect: () => void;
  isSelected: boolean;
}

export const ProductCard = ({ title, price, image, onSelect, isSelected }: ProductCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <img 
            src={image} 
            alt={title}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-primary font-bold">{price}</p>
          </div>
          <Button 
            size="sm" 
            variant={isSelected ? "default" : "outline"}
            className="text-xs"
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};