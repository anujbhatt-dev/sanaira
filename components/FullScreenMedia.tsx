"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import Heading from "./Heading";
import { cinzel } from "@/utils/font";
// import { useCursorStore } from "@/store/useCursorStore";


const mediaArray = [
  {
    type: "image",
    src: "/hero.png",
  },
  {
    type: "video",
    src: "https://anaira-assets.s3.ap-south-1.amazonaws.com/anaira-v1.mp4",
  },  
  {
    type: "video",
    src: "https://anaira-assets.s3.ap-south-1.amazonaws.com/anaira-v2.mp4",
  },
  {
    type: "video",
    src: "https://anaira-assets.s3.ap-south-1.amazonaws.com/anaira-v3.mp4",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];


const FullScreenMedia: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaArray.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const currentMedia = mediaArray[currentIndex];

  return (
    <div
    
    className="h-[calc(100vh)] relative overflow-hidden flex items-start justify-end  text-white text-right -mt-[4rem]" >
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
              id="my-video"
              src={currentMedia.src}
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              className="w-full h-full object-cover"
            />
        )}
      </motion.div>

      

      {/* Centered Progress Bar */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gray-300/30 overflow-hidden">
        <motion.div
          key={`${currentIndex}-progress`}
          className="h-full bg-white w-full"
          initial={{ translateX: "-100%" }}
          animate={isPaused ? { translateX: "-100%" } : { translateX: "0%" }}
          transition={{ duration: isPaused ? 0 : 10, ease: "linear" }}
        />
      </div>

      {/* Stop/Play Button */}
      <button
        onClick={togglePause}
        // onMouseEnter={handleCursorEnter}
        // onMouseLeave={handleCursorLeave}
        className="absolute left-2 bottom-2  bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all z-10 h-[2rem] w-[2rem] flex justify-center items-center text-[1rem] origin-center"
      >
        {isPaused ? <Play/> : <Pause/>}
      </button>

        <div className="h-full w-full flex justify-center items-center text-2xl md:text-5xl lg:text-6xl xl:text-7xl z-10 font-bold md:font-thin gap-2 lg:gap-4">
        <div className={`${cinzel.className}`}>
          {currentIndex==1 && <Heading text="TIMELESS PRICELESS"/>}
        </div>
      </div>
      
    </div>
  );
};

export default FullScreenMedia;