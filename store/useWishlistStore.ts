// store/wishlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductPageType } from '@/types'

interface WishlistState {
  items: ProductPageType[]
  addToWishlist: (product: ProductPageType) => void
  removeFromWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  getWishlist: () => ProductPageType[]
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const alreadyExists = get().items.find((item) => item._id === product._id)
        if (!alreadyExists) {
          set((state) => ({ items: [...state.items, product] }))
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }))
      },

      isWishlisted: (productId) => {
        return get().items.some((item) => item._id === productId)
      },

      getWishlist: () => get().items,
    }),
    { name: 'wishlist-storage' }
  )
)
