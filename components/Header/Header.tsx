import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getAllFeaturedCategories } from "@/sanity/lib/categories/getAllFeaturedCategories";
import SearchBar from "../SearchBar";
import { mulish } from "@/utils/font";
import { ShoppingCart } from "lucide-react";
import TotalItemCount from "../TotalItemsCount";
import { currentUser } from "@clerk/nextjs/server";


export const getUserAccessLevel = async () => {
  const user = await currentUser()
  return user?.publicMetadata?.accessLevel || 'public'
}

const Header = async () => {
  const ALL_FEATURED_CATEGORY = await getAllFeaturedCategories();
  const user = await currentUser()
  const isPro = user?.publicMetadata?.type === "pro"
  
  
  return (
    <header className={`px-6 lg:px-20 mx-auto flex justify-between h-16 fixed top-0 w-full z-50 items-center bg-black/90 backdrop-blur-md text-white ${mulish.className}`}>
      {/* Logo */}
      <Link 
        href="/" 
        className="text-2xl font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
      >
        Sanaira
      </Link>
      
      {/* Navigation */}
      <nav className="hidden lg:flex justify-center space-x-8">
        {ALL_FEATURED_CATEGORY.map((category) => (
          <Link 
            href={`/category/${category.slug?.current}`} 
            key={category._id}
            className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </nav>
      
      {/* User Actions */}
      <div className="flex items-center space-x-8">
        <SearchBar />
        
        <SignedOut>
          <div className="hidden sm:flex space-x-3">
            <SignUpButton mode="modal">
              <button className="text-sm uppercase tracking-wider px-3 py-1 hover:text-gray-300 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="text-sm uppercase tracking-wider border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        <div className="relative">

        <SignedIn>
          <div className="flex items-center space-x-4 reletive">
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-4 h-4",
              }
            }}/>
          </div>
        </SignedIn>
            {
              isPro &&
              <span className="bg-white absolute -bottom-1 right-0 px-1 text-blue-600 font-semibold rounded-full text-[0.5rem] translate-x-[50%]">
                PRO  
              </span>
            }
            </div>
        
        <Link href="/my-basket" className="relative flex items-center">
          <ShoppingCart className="w-6 h-6 hover:text-gray-300 transition-colors" />
          <TotalItemCount />
        </Link>
      </div>
    </header>
  );
};

export default Header;