// import { categories, CategoryType } from "@/utils/categorySeed";
import Link from "next/link";
// import { useRef } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import MyBasketButton from "./MyBasketButton";
import { getAllFeaturedCategories } from "@/sanity/lib/categories/getAllFeaturedCategories";
import SearchBar from "./SearchBar";


const Header = async () => {
  const ALL_FEATURED_CATEGORY = await getAllFeaturedCategories();
  return (
    <>
      <div
        className={`px-4 lg:px-[2rem] mx-auto border-b border-white/0 flex justify-between h-[4rem] fixed top-0 right-0 left-0 gap-x-4 z-20 transition-all duration-75 items-center bg-yellow-50`}
      >
        <div className="flex justify-cneter items-center gap-x-10">
            <Link href={"/"} className="lg:text-[2rem] lg:ml-[1rem] font-semibold tracking-wider uppercase">
              Sanaira
            </Link>    
          </div>
          <div className="lg:flex justify-center space-x-4 capitalize font-serif tracking-wider hidden">
            {ALL_FEATURED_CATEGORY.map((category,i)=>{
              return <div className="cursor-pointer hover:underline" key={category._id+i}>{category.name}</div>
            })}
          </div>
          <div className="flex justify-cneter items-center gap-x-4 text-[0.8rem]">
            <SearchBar/>     
            {/* <MyBasketButton/> */}
            <SignedOut>
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </div>
        </div>
    </>
  );
};

export default Header;