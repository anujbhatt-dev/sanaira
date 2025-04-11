import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  productGridCols: number;
  productGridCols2: number;
  setProductGridCols: (cols: number) => void;
  setProductGridCols2: (cols: number) => void;
};

export const usePreferenceStore = create<Store>()(
  persist(
    (set) => ({
      productGridCols: 3, // Default value
      productGridCols2: 2, // Default value
      setProductGridCols: (cols) => set({ productGridCols: cols }),
      setProductGridCols2: (cols) => set({ productGridCols: cols }),
    }),
    {
      name: 'product-grid-prefs', // LocalStorage key
    }
  )
);