// import { categories, CategoryType } from "@/utils/categorySeed";
import Link from "next/link";
// import { useRef } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategory";
import MyBasketButton from "./MyBasketButton";


const Header = async () => {
  const ALL_CATEGORY = await getAllCategories();
  return (
    <>
      <div
        className={`backdrop-blur-sm bg-white/20 px-[2rem] mx-auto border-b border-white/0 flex justify-between h-[4rem] fixed top-0 right-0 left-0 gap-x-4 z-20 transition-all duration-75 items-center `}
      >
        <div className="flex justify-cneter items-center gap-x-10">
            <Link href={"/"} className="text-[2rem] ml-[1rem] font-semibold tracking-wider uppercase">
              Sanaira
            </Link>    
            <div className="flex justify-center space-x-4 capitalize font-serif tracking-wider">
              {ALL_CATEGORY.map((category,i)=>{
                return <div className="cursor-pointer hover:underline" key={category._id+i}>{category.name}</div>
              })}
            </div>
          </div>
        <div className="flex justify-cneter items-center gap-x-4">
        <SignedOut>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <MyBasketButton/>
        </div></div>
    </>
  );
};

export default Header;