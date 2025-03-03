import { Product } from '@/sanity.types'
import { create } from 'zustand'
import { persist } from "zustand/middleware"

export interface IBasketItem {
    product: Product
    quantity: number
}

interface BasketState {
    items: IBasketItem[]
}

interface BasketActions {
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearBasket: () => void
    getTotalPrice: () => number
    getItemCount: () => number
    getGroupedItems: () => IBasketItem[]
    getSingleItemCount: (productId: string) => number // ✅ New function
}

// Zustand store with persistence
export const useBasketStore = create<BasketState & BasketActions>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.product._id === product._id)
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product._id === product._id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        }
                    } else {
                        return { items: [...state.items, { product, quantity: 1 }] }
                    }
                })
            },

            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.product._id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                }))
            },

            clearBasket: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    return total + (item.product?.price ?? 0) * item.quantity
                }, 0)
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },

            getGroupedItems: () => {
                return get().items
            },

            getSingleItemCount: (productId: string) => {
                const item = get().items.find((item) => item.product._id === productId)
                return item ? item.quantity : 0 // ✅ Returns the count of a specific item
            },
        }),
        { name: "basket-storage" }
    )
)
