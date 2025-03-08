import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"



export const getAllFeaturedCategories = async () => {
    const ALL_FEATURED_CATEGORIES_QUERY = defineQuery(`
          *[_type=="category" && isFeatured==true] 
        `)

    try {
        const featuredCategories = await sanityFetch({
            query:ALL_FEATURED_CATEGORIES_QUERY
        })
    
        return featuredCategories.data || [];        
    } catch (error) {
        console.log("Error fetching categories ",error);
        return [];        
    }    
}