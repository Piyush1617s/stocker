import { Stock, StockDetail } from "@/types/stock";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Mock data for development - will be replaced by real API
const MOCK_STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd." },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd." },
  { symbol: "INFY", name: "Infosys Ltd." },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd." },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd." },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd." },
  { symbol: "WIPRO", name: "Wipro Ltd." },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd." },
  { symbol: "ITC", name: "ITC Ltd." },
  { symbol: "SBIN", name: "State Bank of India" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd." },
];

const MOCK_STOCK_DETAILS: Record<string, StockDetail> = {
  AAPL: { symbol: "AAPL", name: "Apple Inc.", isin: "US0378331005" },
  GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", isin: "US02079K3059" },
  MSFT: { symbol: "MSFT", name: "Microsoft Corporation", isin: "US5949181045" },
  TSLA: { symbol: "TSLA", name: "Tesla Inc.", isin: "US88160R1014" },
  AMZN: { symbol: "AMZN", name: "Amazon.com Inc.", isin: "US0231351067" },
  META: { symbol: "META", name: "Meta Platforms Inc.", isin: "US30303M1027" },
  NVDA: { symbol: "NVDA", name: "NVIDIA Corporation", isin: "US67066G1040" },
  RELIANCE: { symbol: "RELIANCE", name: "Reliance Industries Ltd.", isin: "INE002A01018" },
  TCS: { symbol: "TCS", name: "Tata Consultancy Services Ltd.", isin: "INE467B01029" },
  INFY: { symbol: "INFY", name: "Infosys Ltd.", isin: "INE009A01021" },
  HDFCBANK: { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", isin: "INE040A01034" },
  ICICIBANK: { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", isin: "INE090A01021" },
  HINDUNILVR: { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.", isin: "INE030A01027" },
  WIPRO: { symbol: "WIPRO", name: "Wipro Ltd.", isin: "INE075A01022" },
  BHARTIARTL: { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", isin: "INE397D01024" },
  ITC: { symbol: "ITC", name: "ITC Ltd.", isin: "INE154A01025" },
  SBIN: { symbol: "SBIN", name: "State Bank of India", isin: "INE062A01020" },
  BAJFINANCE: { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.", isin: "INE296A01024" },
};

export async function getStocks(): Promise<Stock[]> {
  if (!API_BASE_URL) {
    return MOCK_STOCKS;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/stocks`);
    if (!response.ok) {
      throw new Error("Failed to fetch stocks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stocks, using mock data:", error);
    return MOCK_STOCKS;
  }
}

export async function getStockBySymbol(symbol: string): Promise<StockDetail | null> {
  if (!API_BASE_URL) {
    return MOCK_STOCK_DETAILS[symbol.toUpperCase()] || null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/stocks/${symbol}`);
    if (!response.ok) {
      throw new Error("Failed to fetch stock details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock details, using mock data:", error);
    return MOCK_STOCK_DETAILS[symbol.toUpperCase()] || null;
  }
}
