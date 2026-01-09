import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChartContainer from "@/components/ChartContainer";
import IndicatorCard from "@/components/IndicatorCard";
import { getStockBySymbol } from "@/services/api";
import { StockDetail as StockDetailType } from "@/types/stock";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      if (!symbol) return;
      setIsLoading(true);
      const data = await getStockBySymbol(symbol);
      setStock(data);
      setIsLoading(false);
    };

    fetchStock();
  }, [symbol]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-lg text-muted-foreground">Stock not found</p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const externalLinks = [
    {
      name: "Moneycontrol",
      url: `https://www.moneycontrol.com/india/stockpricequote/${stock.symbol}`,
    },
    {
      name: "Screener",
      url: `https://www.screener.in/company/${stock.symbol}/`,
    },
    {
      name: "Company Filings",
      url: `https://www.bseindia.com/stock-share-price/${stock.symbol}/`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stocks
          </Button>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {stock.symbol}
              </h1>
              <Badge variant="outline" className="text-sm">
                Equity
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{stock.name}</p>
            <p className="text-sm text-muted-foreground">
              ISIN: <span className="font-mono">{stock.isin}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Chart Section */}
          <ChartContainer />

          {/* Indicators Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Technical Indicators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <IndicatorCard
                title="EMA (Exponential Moving Average)"
                description="Trend-following indicator that gives more weight to recent prices"
              />
              <IndicatorCard
                title="SMA (Simple Moving Average)"
                description="Average price over a specified number of periods"
              />
              <IndicatorCard
                title="RSI (Relative Strength Index)"
                description="Momentum oscillator measuring speed and change of price movements"
              />
            </div>
          </section>

          {/* AI Explanation Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              AI Analysis
            </h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                    <TrendingUp className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Trend</p>
                      <p className="text-sm text-muted-foreground">
                        Analysis will appear here based on price patterns and volume
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                    <Target className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Confidence</p>
                      <p className="text-sm text-muted-foreground">
                        Signal strength based on multiple technical indicators
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Risk</p>
                      <p className="text-sm text-muted-foreground">
                        Volatility assessment and potential downside analysis
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-border bg-card p-4">
                  <p className="text-sm italic text-muted-foreground">
                    "AI-powered analysis will provide actionable insights based on
                    technical indicators, historical patterns, and market sentiment.
                    This feature is coming soon."
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* External Sources */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              External Sources
            </h2>
            <div className="flex flex-wrap gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    {link.name}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StockDetail;
