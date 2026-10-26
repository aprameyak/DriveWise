import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MarketListing } from '../types';

interface PriceCheckState {
  listings: MarketListing[];
  addListing: (listing: Omit<MarketListing, 'id' | 'timestamp'>) => void;
  removeListing: (id: string) => void;
}

export const usePriceCheckStore = create<PriceCheckState>()(
  persist(
    (set, get) => ({
      listings: [],

      addListing: (listing) => {
        set({
          listings: [
            ...get().listings,
            {
              ...listing,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
            },
          ],
        });
      },

      removeListing: (id: string) => {
        set({ listings: get().listings.filter(l => l.id !== id) });
      },
    }),
    {
      name: 'price-check-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
