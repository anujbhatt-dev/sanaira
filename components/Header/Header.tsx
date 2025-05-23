"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchBar from "../SearchBar";
import { cinzel, poppins } from "@/utils/font";
import { Heart, LogIn, ShoppingBag} from "lucide-react";
import TotalItemCount from "../TotalItemsCount";
import { ALL_FEATURED_CATEGORIES_QUERYResult } from "@/sanity.types";
import { useEffect, useState } from "react";
import { useBasketStore } from "@/store/useBasketStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface IHeader {
  categories: ALL_FEATURED_CATEGORIES_QUERYResult;
  isPro: boolean;
}

const Header = ({  isPro }: IHeader) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {getItemCount} = useBasketStore()
  const  {getWishlist} = useWishlistStore()
  const totalCartItems = getItemCount()
  const totalWishlistItems = getWishlist().length

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast = window.scrollY > (window.innerHeight*0.9);
      setIsScrolled(scrolledPast);
    };

    handleScroll(); // run on mount

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  const solid = isScrolled || isHovered;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-4 pr-6 lg:px-8 py-4 mx-auto flex justify-between fixed top-0 w-full z-50 items-center transition-all duration-200 ${cinzel.className}
        ${solid ? "bg-[#7E6B5E] text-white" : "bg-transparent text-black"}
      `}
    >
      {/* Logo */}
      <div className="flex space-x-8 items-center justify-between">

      <Link
        href="/"
        className="text-2xl font-medium tracking-widest uppercase transition-colors"
        >
        Anaira
      </Link>

      {/* Navigation */}
      {/* <nav className="hidden lg:flex justify-center space-x-4">
        {categories.map((category) => (
          <Link
          href={`/category/${category.slug?.current}`}
          key={category._id}
          className="text-sm uppercase tracking-wider hover:text-accent hover:scale-105 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </nav> */}
      </div>

      <SearchBar solid={solid}/>
      {/* User Actions */}
      <div className="flex items-center space-x-8">

        <SignedOut>
          <div className="flex space-x-3">
            {/* <SignUpButton mode="modal">
              <button className="text-sm uppercase tracking-wider px-3 py-1 hover:text-accent hover:scale-105 transition-colors">
                 <span className="md:hidden"><User className=""/></span><span className="hidden md:flex">Sign Up</span>
              </button>
            </SignUpButton> */}
            <SignInButton mode="modal">
              <button className="text-sm uppercase tracking-wider px-3 py-1 hover:bg-black hover:text-accent transition-colors">
              <span className="md:hidden"><LogIn className=""/></span><span className="hidden md:flex">Sign In</span>
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
        <Link className="text-xs font-semibold" href={"/my-orders"}>My Orders</Link>
        <div className="relative">
            <div className="flex justify-center items-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-4 h-4",
                  },
                }}
              />
            </div>

          {isPro && (
            <span className={`${poppins.className} bg-white absolute -bottom-2 right-0 px-1 text-blue-600 font-semibold rounded-lg text-[0.6rem] translate-x-[50%]`}>
                Plus
            </span>
          )}
        </div>
        </SignedIn>
        <Link href="/my-wishlist" className="relative flex items-center">
          <Heart className="w-8 h-8 hover:text-accent transition-colors" />
          {totalWishlistItems > 0  && <TotalItemCount total={totalWishlistItems}/>}
        </Link>
        <Link href="/my-basket" className="relative flex items-center">
          <ShoppingBag className="w-8 h-8 hover:text-accent transition-colors" />
          {totalCartItems > 0 && <TotalItemCount total={totalCartItems} />}
        </Link>
      </div>
    </header>
  );
};

export default Header;
