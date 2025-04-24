import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getSimilarProductBySlug = async (slug:string) => {
    const SIMILAR_PRODUCT_BY_SLUG_QUERY = defineQuery(`
        *[_type == "product" && slug.current == $slug][0]{            
            youMayAlsoLike[]->{
                ...,
                "productPath": [
                category->parent->parent->slug.current, 
                category->parent->slug.current, 
                category->slug.current
            ]
            }
        }
    `);

    try {
        const response = await sanityFetch({ query: SIMILAR_PRODUCT_BY_SLUG_QUERY, params: { slug } });
        return response.data || null;
    } catch (error) {
        console.error("Error fetching PRODUCT_BY_SLUG_QUERY:", error);
        return null;
    }
};