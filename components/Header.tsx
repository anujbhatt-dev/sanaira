// import { categories, CategoryType } from "@/utils/categorySeed";
import Link from "next/link";
// import { useRef } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategory";


const Header = async () => {
  const ALL_CATEGORY = await getAllCategories();
  return (
    <>
      <div
        className={`backdrop-blur-md px-[10rem] mx-auto border-b border-white/0 flex justify-between h-[4rem] fixed top-0 right-0 left-0 gap-x-4 z-20 transition-all duration-75 items-center `}
      >
        <Link href={"/"} className="text-[2rem] ml-[1rem] font-semibold tracking-wider uppercase">
          Anaira
        </Link>    
        <div>
          {ALL_CATEGORY.map((category,i)=>{
              return <div key={category._id+i}>{category.name}</div>
          })}
        </div>
        <div className="flex justify-cneter items-center gap-x-4">
        <SignedOut>
            <SignInButton />
            <SignUpButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        </div></div>
    </>
  );
};

export default Header;