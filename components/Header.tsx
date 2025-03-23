// import { categories, CategoryType } from "@/utils/categorySeed";
import Link from "next/link";
// import { useRef } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getAllFeaturedCategories } from "@/sanity/lib/categories/getAllFeaturedCategories";
import SearchBar from "./SearchBar";
import {  mulish } from "@/utils/font";
import { ShoppingBasket, ShoppingBasketIcon, ShoppingCart } from "lucide-react";


const Header = async () => {
  const ALL_FEATURED_CATEGORY = await getAllFeaturedCategories();
  return (
    <>
      <div
        className={`px-4 lg:px-[5rem] mx-auto border-b border-white/0 flex justify-between h-[4rem] fixed top-0 right-0 left-0 gap-x-4 z-20 transition-all duration-150 items-center bg-black/100  md:bg-black/80 hover:bg-black/100 backdrop-blur-sm text-white ${mulish.className}`}
      >
        <div className="flex justify-cneter items-center gap-x-10">
            <Link href={"/"} className={`lg:text-[2rem] font-semibold tracking-wider uppercase `}>
              Sanaira
            </Link>    
          </div>
          <div className="lg:flex justify-center space-x-4 capitalize tracking-wider hidden">
            {ALL_FEATURED_CATEGORY.map((category,i)=>{
              return <div className="cursor-pointer hover:underline" key={category._id+i}>{category.name}</div>
            })}
          </div>
          <div className="flex justify-cneter items-center gap-x-2 text-[0.8rem]">            
            <SignedOut>
                <div className="p-2 md:px-4 md:py-2 rounded font-thin cursor-pointer">
                  <SignUpButton mode="modal" />
                </div>
                <div className="bg-teal-700 p-2 md:px-4 md:py-2 rounded font-thin cursor-pointer">
                  <SignInButton mode="modal" />
                </div>
            </SignedOut>
            <SearchBar/>     
            <SignedIn>
                <UserButton />
            </SignedIn>
            <Link className="relative w-8 h-8" href={"/my-basket"}>
              <ShoppingCart className="w-8 h-8 cursor-pointer"/>
              <span className="absolute top-0 right-[0rem] text-xs text-white bg-black px-2 py-1 rounded-full translate-x-1/2 -translate-y-1/2">{0}</span>
            </Link>
          </div>
        </div>
    </>
  );
};

export default Header;