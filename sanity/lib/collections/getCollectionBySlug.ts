import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCollectionBySlug = async (slug: string) => {
    const COLLECTION_BY_SLUG_QUERY = defineQuery(`
        *[_type == "collection" && slug.current == $slug][0]{
            title,
            slug,
            products[]->{
                ...,
                "productPath": [
                    category->parent->parent->slug.current,
                    category->parent->slug.current,
                    category->slug.current
                ]
            },
            description,
            image
        }
    `);

    try {
        const response = await sanityFetch({
            query: COLLECTION_BY_SLUG_QUERY,
            params: { slug }
        });
        return response.data;
    } catch (error) {
        console.log("Error While fetching COLLECTION_BY_SLUG_QUERY", error);
        return null;
    }
};

