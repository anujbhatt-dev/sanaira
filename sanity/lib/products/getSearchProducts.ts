import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getSearchedProducts = async (q: string) => {
    const PRODUCTS_BY_SEARCH_QUERY = defineQuery(`
        *[
          _type=="product" && 
          (
            title match $q || 
            description[].children[].text match $q // Corrected description search
          )
        ] | order(title asc){
            ...,
            "productPath": [
                category->parent->parent->slug.current, 
                category->parent->slug.current, 
                category->slug.current
            ]
        }
    `);

    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_SEARCH_QUERY,
            params: {
                q: `${q}*` // Allow partial matches
            }
        });
        return products.data || [];
    } catch (error) {
        console.log("Error Fetching Products by Search Query", error);
        return [];
    }
};
