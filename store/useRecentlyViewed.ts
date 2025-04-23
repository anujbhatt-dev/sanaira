import { ProductPageType } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentlyViewedState {
  items: ProductPageType[]
}

interface RecentlyViewedActions {
  addViewedItem: (product: ProductPageType) => void
  clearViewedItems: () => void
  getViewedItems: () => ProductPageType[]
}

export const useRecentlyViewedStore = create<RecentlyViewedState & RecentlyViewedActions>()(
  persist(
    (set, get) => ({
      items: [],

      addViewedItem: (product: ProductPageType) => {
        set((state) => {
          const exists = state.items.find((item) => item._id === product._id)

          let updatedItems = exists
            ? state.items.filter((item) => item._id !== product._id)
            : state.items

          updatedItems = [product, ...updatedItems].slice(0, 10) // Max 10 recent items

          return { items: updatedItems }
        })
      },

      clearViewedItems: () => set({ items: [] }),

      getViewedItems: () => get().items,
    }),
    { name: 'recently-viewed-storage' }
  )
)
