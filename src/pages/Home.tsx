import { useState, useEffect, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import StockList from "@/components/StockList";
import { getStocks } from "@/services/api";
import { Stock } from "@/types/stock";

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      const data = await getStocks();
      setStocks(data);
      setIsLoading(false);
    };

    fetchStocks();
  }, []);

  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) {
      return stocks;
    }

    const query = searchQuery.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    );
  }, [stocks, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Stock Analyzer
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 flex justify-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Stock List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <StockList stocks={filteredStocks} />
        )}
      </main>
    </div>
  );
};

export default Home;
