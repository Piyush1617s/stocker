import { Stock } from "@/types/stock";
import StockCard from "./StockCard";

interface StockListProps {
  stocks: Stock[];
}

const StockList = ({ stocks }: StockListProps) => {
  if (stocks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">No stocks found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
