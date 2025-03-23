import { ProductPageType } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IBasketItem {
    product: ProductPageType
    quantity: number
    size: string
    color: string
}

interface BasketState {
    items: IBasketItem[]
}

interface BasketActions {
    addItem: (product: ProductPageType, size: string, color: string, quantity: number) => void
    removeItem: (productId: string, size: string, color: string) => void
    clearBasket: () => void
    getTotalPrice: () => number
    getItemCount: () => number
    getGroupedItems: () => IBasketItem[]
    getSingleItemCount: (productId: string, size: string, color: string) => number
}

// Zustand store with persistence
export const useBasketStore = create<BasketState & BasketActions>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: ProductPageType, size: string, color: string, quantity: number) => {
                set((state) => {
                    // Check if the item already exists in the basket
                    const existingItemIndex = state.items.findIndex(
                        (item) =>
                            item.product._id === product._id &&
                            item.size === size &&
                            item.color === color
                    );
            
                    if (existingItemIndex !== -1) {
                        // If the item exists, update its quantity
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex] = {
                            ...updatedItems[existingItemIndex],
                            quantity: updatedItems[existingItemIndex].quantity + quantity,
                        };
                        return { items: updatedItems };
                    } else {
                        // If the item doesn't exist, add it to the basket
                        return { items: [...state.items, { product, quantity, size, color }] };
                    }
                });
            },

            removeItem: (productId: string, size: string, color: string) => {
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.product._id === productId && item.size === size && item.color === color
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                }))
            },

            clearBasket: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.product.variants?.[0].sizes?.[0].price ?? 0
                    return total + price * item.quantity
                }, 0)
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },

            getGroupedItems: () => {
                return Object.values(
                    get().items.reduce((acc, item) => {
                        const key = `${item.product._id}-${item.size}-${item.color}`
                        if (!acc[key]) {
                            acc[key] = { ...item }
                        } else {
                            acc[key].quantity += item.quantity
                        }
                        return acc
                    }, {} as Record<string, IBasketItem>)
                )
            },

            getSingleItemCount: (productId: string, size: string, color: string) => {
                const item = get().items.find(
                    (item) => item.product._id === productId && item.size === size && item.color === color
                )
                return item ? item.quantity : 0
            },
        }),
        { name: 'basket-storage' }
    )
)
