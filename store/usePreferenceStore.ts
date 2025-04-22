import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  productGridCols: number;
  setProductGridCols: (cols: number) => void;
};

export const usePreferenceStore = create<Store>()(
  persist(
    (set) => ({
      productGridCols: 3, // Default value
      setProductGridCols: (cols) => set({ productGridCols: cols }),
    }),
    {
      name: 'product-grid-prefs', // LocalStorage key
    }
  )
);