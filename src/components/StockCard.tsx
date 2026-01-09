import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Stock } from "@/types/stock";

interface StockCardProps {
  stock: Stock;
}

const StockCard = ({ stock }: StockCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stock/${stock.symbol}`);
  };

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground tracking-wide">
          {stock.symbol}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {stock.name}
        </p>
      </CardContent>
    </Card>
  );
};

export default StockCard;
