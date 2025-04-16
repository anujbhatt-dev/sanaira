import { UserStore } from "@/types";
import {create} from "zustand";



export const useUserStore = create<UserStore>((set) => ({
  user: {
    clerkUserId: "",
    createdAt: "",
    lastActiveAt: "",
    imageUrl: "",
    firstName: "",
    lastName: "",
    primaryEmail: "",
    phone: "",
    shippingDetails: {
      name: "",
      phone: "",
      address: {
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
    },
    wishlist: [],
    recentlyViewed: [],
  },
  setUserData: (userData) => set({ user: userData }),
  updateWishlist: (wishlist) => set((state) => ({ user: { ...state.user, wishlist } })),
  updateRecentlyViewed: (recentlyViewed) => set((state) => ({ user: { ...state.user, recentlyViewed } })),
}));
