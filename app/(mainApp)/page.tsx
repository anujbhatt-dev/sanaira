import FullScreenMedia from "@/components/FullScreenMedia";
import Products from "@/components/Products";
import Collection from "@/components/Collection";
export default function Home() {
  return (
    <div className="">
      <FullScreenMedia/>
      <Products/>
      <Collection slug="new-arrivals"/>
    </div>
  );
}
