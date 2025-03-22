// import { categories, CategoryType } from "@/utils/categorySeed";
import Link from "next/link";
// import { useRef } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import MyBasketButton from "./MyBasketButton";
import { getAllFeaturedCategories } from "@/sanity/lib/categories/getAllFeaturedCategories";
import SearchBar from "./SearchBar";
import { gruppo } from "@/utils/font";


const Header = async () => {
  const ALL_FEATURED_CATEGORY = await getAllFeaturedCategories();
  return (
    <>
      <div
        className={`px-4 lg:px-[5rem] mx-auto border-b border-white/0 flex justify-between h-[4rem] fixed top-0 right-0 left-0 gap-x-4 z-20 transition-all duration-150 items-center bg-black/100 hover:bg-black/100 hover:backdrop-blur-sm text-white ${gruppo.className}`}
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
                <div className=" bg-teal-700 p-2 md:px-4 md:py-2 rounded font-thin cursor-pointer">
                  <SignInButton mode="modal" />
                </div>
            </SignedOut>
            <SearchBar/>     
            {/* <MyBasketButton/> */}
            <SignedIn>
                <UserButton />
            </SignedIn>
          </div>
        </div>
    </>
  );
};

export default Header;