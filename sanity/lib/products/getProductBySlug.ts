import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug:string) => {
    const PRODUCT_BY_SLUG_QUERY = defineQuery(`
        *[_type == "product" && slug.current == $slug][0]{
            ...,    
            youMayAlsoLike[]->{
                ...,
                "productPath": [
                category->parent->parent->slug.current, 
                category->parent->slug.current, 
                category->slug.current
            ]
            },        
            "productPath": [
                category->parent->parent->slug.current, 
                category->parent->slug.current, 
                category->slug.current
            ]
        }
    `);

    try {
        const response = await sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } });
        return response.data || null;
    } catch (error) {
        console.error("Error fetching PRODUCT_BY_SLUG_QUERY:", error);
        return null;
    }
};