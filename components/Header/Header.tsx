"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import SearchBar from "../SearchBar";
import { cinzel } from "@/utils/font";
import { ShoppingCart } from "lucide-react";
import TotalItemCount from "../TotalItemsCount";
import { ALL_FEATURED_CATEGORIES_QUERYResult } from "@/sanity.types";
import { useEffect, useState } from "react";

interface IHeader {
  categories: ALL_FEATURED_CATEGORIES_QUERYResult;
  isPro: boolean;
}

const Header = ({ categories, isPro }: IHeader) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast = window.scrollY > window.innerHeight;
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
      className={`px-6 lg:px-20 mx-auto flex justify-between h-16 fixed top-0 w-full z-50 items-center text-black transition-colors duration-300 ${cinzel.className}
        ${solid ? "bg-[#f5f5dc]/90 backdrop-blur-md" : "lg:bg-transparent lg:backdrop-blur-none bg-[#f5f5dc]/90 backdrop-blur-md"}
      `}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-medium tracking-widest uppercase hover:text-gray-600 transition-colors"
      >
        Anaira
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex justify-center space-x-8">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug?.current}`}
            key={category._id}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
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
              <button className="text-sm uppercase tracking-wider px-3 py-1 hover:text-gray-600 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="text-sm uppercase tracking-wider border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <div className="relative">
          <SignedIn>
            <div className="flex items-center space-x-4">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-4 h-4",
                  },
                }}
              />
            </div>
          </SignedIn>

          {isPro && (
            <span className="bg-black absolute -bottom-1 right-0 px-1 text-white font-semibold rounded-full text-[0.5rem] translate-x-[50%]">
              PRO
            </span>
          )}
        </div>

        <Link href="/my-basket" className="relative flex items-center">
          <ShoppingCart className="w-6 h-6 hover:text-gray-600 transition-colors" />
          <TotalItemCount />
        </Link>
      </div>
    </header>
  );
};

export default Header;
