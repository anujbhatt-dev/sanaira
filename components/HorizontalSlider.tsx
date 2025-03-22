"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ALL_PRODUCTS_QUERYResult } from "@/sanity.types";
import { mulish } from "@/utils/font";
import ProductThumbnail from "./ProductThumbnail";

gsap.registerPlugin(ScrollTrigger);

function HorizontalSlider({products}:{products:ALL_PRODUCTS_QUERYResult}) {
  const HorizontalRef = useRef<HTMLHeadingElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!HorizontalRef.current || !wrapperRef.current) return;

    const textWidth = HorizontalRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(HorizontalRef.current, {
      x: `-${textWidth - viewportWidth}px`, // Move based on text width
      duration: 10,
      // ease:"back.out",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 0",
        end: "top -200%",
        scrub: 1,
        // markers: true,
        pin: wrapperRef.current, // Pinning the wrapper instead of text
      },
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="h-[100vh] w-[100vw] flex items-center overflow-hidden bg-cover bg-center relative"      
    >
      <div className="h-full w-full absolute top-0 left-0 -z-10">
            {/* <img src="5.jpg" alt="" className="w-full h-full object-cover" /> */}
            <div className="h-full w-full backdrop-blur-sm absolute top-0 left-0 "></div>
      </div>
      <div
        ref={HorizontalRef}
        className=""        
      >
        <div className="w-[180vw] flex gap-x-10">
            <div className={`${mulish.className} w-[20vw] shrink-0 flex items-center justify-center flex-col  uppercase`}>
                 <h1 className="text-5xl font-semibold">Related</h1>
                 <h1 className="text-5xl font-semibold -rotate-12">Products</h1>
            </div>
            {products.map((product)=>(
              <div className="relative shrink-0" key={product._id} >
                  <div className="w-[23vw]  shrink-0">
                     <ProductThumbnail key={product._id} product={product} index={0}/>
                </div>
              </div>
            ))}
            <div className={`${mulish.className} grow-1 shrink-0 flex items-center justify-center flex-col uppercase`}>
                 <h1 className="text-5xl font-semibold">Kahan Ja</h1>
                 <h1 className="text-5xl font-semibold">Rahe Ho</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalSlider;