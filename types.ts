import { Product } from "./sanity.types";

export  type ProductPageType = Omit<Product, "productPath"> & {productPath: (string | null)[];}