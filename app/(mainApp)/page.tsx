import FullScreenMedia from "@/components/UI/FullScreenMedia";
import Products from "@/components/Products";
import Collection from "@/components/Collection";
import FullScreenMedia2 from "@/components/UI/FullScreenMedia2";
import { getCollectionBySlug } from "@/sanity/lib/collections/getCollectionBySlug";
export default async function Home() {
  const collection = await getCollectionBySlug("new-arrivals");
  return (
    <div className="">
      <FullScreenMedia/>
      <Products/>
      <FullScreenMedia2/>
      <Collection collection={collection}/>
    </div>
  );
}
