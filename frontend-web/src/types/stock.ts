export interface Stock {
  symbol: string;
  name: string;
}

export interface StockDetail extends Stock {
  isin: string;
}

export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}
// Candle is defined but NOT used in Phase 1
