import { Product } from "./sanity.types";

export  type ProductPageType = Omit<Product, "productPath"> & {productPath: (string | null)[];}



export type Metadata = {
    orderNumber:string;
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}