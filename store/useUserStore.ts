
import { create } from "zustand";
import axios from "axios";


type Address = {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  
  type ShippingDetails = {
    name?: string;
    phone?: string;
    address?: Address;
  };
  
  type Variant = {
    color?: string;
    size?: string;
  };
  
  type WishlistItem = {
    productId: string;
    addedAt: string;
    variant?: Variant;
  };
  
  type RecentlyViewedItem = {
    productId: string;
    viewedAt: string;
  };
  
  type User = {
    clerkUserId: string;
    createdAt?: string;
    lastActiveAt?: string;
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
    primaryEmail?: string;
    phone?: string;
    shippingDetails?: ShippingDetails;
    wishlist: WishlistItem[];
    recentlyViewed: RecentlyViewedItem[];
    orders: string[]; // Assuming array of order document IDs
  };
  
  // Zustand store type
  export type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    updateShippingDetails: (details: Partial<ShippingDetails>) => void;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (productId: string) => void;
    addRecentlyViewed: (item: RecentlyViewedItem) => void;
  };

export const useUserStore = create<UserStore>((set) => ({
    user: null,
  
    setUser: (user) => set({ user }),
  
    clearUser: () => set({ user: null }),
  
    updateShippingDetails: (details) =>
      set((state) =>
        state.user
          ? {
              user: {
                ...state.user,
                shippingDetails: {
                  ...state.user.shippingDetails,
                  ...details,
                },
              },
            }
          : {}
      ),
  
    addToWishlist: (item) =>
      set((state) =>
        state.user
          ? {
              user: {
                ...state.user,
                wishlist: [
                  ...state.user.wishlist.filter((w) => w.productId !== item.productId),
                  item,
                ],
              },
            }
          : {}
      ),
  
    removeFromWishlist: (productId) =>
      set((state) =>
        state.user
          ? {
              user: {
                ...state.user,
                wishlist: state.user.wishlist.filter((w) => w.productId !== productId),
              },
            }
          : {}
      ),
  
    addRecentlyViewed: (item) =>
      set((state) =>
        state.user
          ? {
              user: {
                ...state.user,
                recentlyViewed: [
                  item,
                  ...state.user.recentlyViewed
                    .filter((v) => v.productId !== item.productId)
                    .slice(0, 19), // Max 20
                ],
              },
            }
          : {}
      ),
  }));