import { Product } from "./sanity.types";

export  type ProductPageType = Omit<Product, "productPath"> & {productPath: (string | null)[];}


 export interface ShippingAddress {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface UserStore {
user: {
    clerkUserId: string;
    createdAt: string;
    lastActiveAt: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    primaryEmail: string;
    phone: string;
    shippingDetails: {
    name: string;
    phone: string;
    address: ShippingAddress;
    };
    wishlist: {
    productId: string;
    addedAt: string;
    variant: {
        color: string;
        size: string;
    };
    }[];
    recentlyViewed: {
    productId: string;
    viewedAt: string;
    }[];
};
setUserData: (userData: UserStore["user"]) => void;
updateWishlist: (wishlist: UserStore["user"]["wishlist"]) => void;
updateRecentlyViewed: (recentlyViewed: UserStore["user"]["recentlyViewed"]) => void;
}

export type Metadata = {
    orderNumber:string;
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}