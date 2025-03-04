import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"]{
            ...,
            "productPath": [
                category->parent->parent->slug.current, 
                category->parent->slug.current, 
                category->slug.current
            ]
        }
    `);

    try {
        const response = await sanityFetch({
            query: ALL_PRODUCTS_QUERY
        });
        return response.data || [];
    } catch (error) {
        console.log("Error While fetching ALL_PRODUCTS_QUERY", error);
        return [];
    }
};
