"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
// import { useCursorStore } from "@/store/useCursorStore";

const mediaArray = [
  {
    type: "video",
    src: "/luxury-b-roll.mp4",
    title: "The Legacy of Elegance",
    subtitle: "Timeless Fashion for the Elite",
    cta: "Shop the Collection",
    fontSize: "3xl",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Refined Sophistication",
    subtitle: "Crafted for the Modern Aristocrat",
    cta: "Explore Now",    
    fontSize: "3xl",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Eternal Style",
    subtitle: "Luxury that Never Fades",
    cta: "Discover More",    
    fontSize: "3xl",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bespoke Heritage",
    subtitle: "Tailored for the Privileged Few",
    cta: "Browse Collection",    
    fontSize: "3xl",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "The Art of Dressing Well",
    subtitle: "Where Tradition Meets Luxury",
    cta: "Shop Now",    
    fontSize: "3xl",
  },
];


const FullScreenMedia: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
//   const { scaleUp, scaleDown} = useCursorStore()
  
//   const handleCursorEnter = ()=>{
//       if(isPaused)
//       scaleUp("Play slide")
//       else
//       scaleUp("Pause Slide")
//   }

//   const handleCursorLeave = ()=>{
//     scaleDown()
//   }

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaArray.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const currentMedia = mediaArray[currentIndex];

  return (
    <div
    
    className="h-[calc(70vh)] relative overflow-hidden flex items-start justify-end  text-white text-right" >
      {/* Background Media */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        key={`${currentIndex}-media`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {currentMedia.type === "image" ? (
          <Image
            src={currentMedia.src}
            width={1600}
            height={800}
            alt="media"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <video
            src={currentMedia.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Overlay Text */}
      <motion.div
        key={`${currentIndex}-text`}
        className={`absolute px-6 py-4 mt-[10rem] bg-black/50 ${currentIndex==0 && "hidden"}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 1 }}
      >
        <h1
          className={`font-serif font-bold mb-3 lg:text-6xl text-xl`}          
        >
          {currentMedia.title}
        </h1>
        <p
          className="text-md md:text-xl font-light mb-4 lg:text-3xl text-xl"
        >
          {currentMedia.subtitle}
        </p>
      </motion.div>
        <motion.button
          className="bg-[#B76e79] text-white font-semibold hover:bg-gray-300 transition-all -translate-x-[50%] -translate-y-[50%] absolute left-[50%] bottom-[10%] cursor-pointer px-10 py-4 text-nowrap"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2,ease:"linear"}}
        >
          {currentMedia.cta}
        </motion.button>

      {/* Centered Progress Bar */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gray-300/30 overflow-hidden">
        <motion.div
          key={`${currentIndex}-progress`}
          className="h-full bg-white w-full"
          initial={{ translateX: "-100%" }}
          animate={isPaused ? { translateX: "-100%" } : { translateX: "0%" }}
          transition={{ duration: isPaused ? 0 : 30, ease: "linear" }}
        />
      </div>

      {/* Stop/Play Button */}
      <button
        onClick={togglePause}
        // onMouseEnter={handleCursorEnter}
        // onMouseLeave={handleCursorLeave}
        className="absolute left-2 bottom-2  bg-opacity-50  rounded-full hover:bg-opacity-75 transition-all z-10 h-[2rem] w-[2rem] flex justify-center items-center text-[1rem] origin-center"
      >
        {isPaused ? <Play/> : <Pause/>}
      </button>
    </div>
  );
};

export default FullScreenMedia;