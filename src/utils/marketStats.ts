import { MarketListing, MarketStats } from '../types';

export function marketStats(listings: MarketListing[], model?: string): MarketStats | null {
  const filtered = model ? listings.filter(l => l.model === model) : listings;
  if (filtered.length === 0) return null;
  const prices = filtered.map(l => l.price).sort((a, b) => a - b);
  return {
    median: prices[Math.floor(prices.length / 2)],
    count: filtered.length,
    min: prices[0],
    max: prices[prices.length - 1],
  };
}
