import { Product } from "./sanity.types";

// export type ProductMini = Omit<Product, "productPath"> & {
//   productPath: (string | null)[];
// };

// export type ProductPageType = Omit<Product, "productPath" | "youMayAlsoLike"> & {
//   productPath: (string | null)[];
//   youMayAlsoLike: ProductMini[] | null;
// };

export type ProductPageType = Omit<Product, "productPath"> & {
  productPath: (string | null)[];
};

export interface CartItem {
  item_id: string;
  item_name: string;
  item_discounted_unit_price: number;
  item_original_unit_price: number;
  item_quantity: number;
  item_tags: (string | number)[];
}

export interface UserI {
    _id: string;
    _type: "user";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    
    // Clerk IDs and metadata
    clerkUserId: string;
    createdAt: string; // ISO datetime string
    lastActiveAt?: string; // ISO datetime string
    imageUrl?: string;
  
    // User info
    firstName?: string;
    lastName?: string;
    primaryEmail?: string;
    phone?: string;
  
    // Shipping details
    shippingDetails?: {
      name?: string;
      phone?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
      };
    };
  
    // Wishlist
    wishlist?: Array<{
      _key: string;
      product: {
        _type: "reference";
        _ref: string;
      };
      addedAt: string; // ISO datetime string
      variant?: {
        color?: string;
        size?: string;
      };
    }>;
  
    // Recently Viewed
    recentlyViewed?: Array<{
      _key: string;
      product: {
        _type: "reference";
        _ref: string;
      };
      viewedAt: string; // ISO datetime string
    }>;
  
    // Orders
    orders?: Array<{
      _type: "reference";
      _ref: string;
    }>;
  }

export type Metadata = {
    orderNumber:string;
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}
