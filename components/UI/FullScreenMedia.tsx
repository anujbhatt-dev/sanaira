"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import Heading from "../Heading";
import { cinzel } from "@/utils/font";

const mediaArray = [
  { type: "image", src: "/hero8.png" },
  { type: "image", src: "/hero.png" },
  { type: "image", src: "/hero7.png" },
  { type: "image", src: "/hero6.png" },
  { type: "image", src: "/hero9.png" },
  { type: "image", src: "/hero4.png" },
];

const FullScreenMedia: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextIndexRef = useRef((currentIndex + 1) % mediaArray.length);

  // Faster transition (0.5s)
  const TRANSITION_DURATION = 0.2;
  // Shorter interval between slides (3000ms)
  const SLIDE_INTERVAL = 4000;

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % mediaArray.length;
        nextIndexRef.current = (nextIndex + 1) % mediaArray.length;
        return nextIndex;
      });
    }, SLIDE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);

  const currentMedia = mediaArray[currentIndex];
  const nextMedia = mediaArray[nextIndexRef.current];

  return (
    <div className="h-[calc(70vh)] lg:h-[calc(100vh)] relative overflow-hidden flex items-start justify-end text-white text-right -mt-[4rem]">
      {/* Preload next image */}
      {nextMedia.type === "image" && (
        <div className="hidden">
          <Image src={nextMedia.src} width={1600} height={800} alt="preload" priority quality={100} />
        </div>
      )}

      {/* Faster transitions with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
        >
          {currentMedia.type === "image" ? (
            <Image
              src={currentMedia.src}
              width={1600}
              height={800}
              alt="media"
              className="w-full h-full object-cover object-top"
              priority
              quality={100}
            />
          ) : (
            <video
              src={currentMedia.src}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar matches faster timing */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gray-300/30 overflow-hidden">
        <motion.div
          key={`${currentIndex}-progress`}
          className="h-full bg-white w-full"
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          transition={{ duration: isPaused ? 0 : SLIDE_INTERVAL/1000, ease: "linear" }}
        />
      </div>

      <button
        onClick={togglePause}
        className="absolute left-2 bottom-2 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all z-10 h-[2rem] w-[2rem] flex justify-center items-center text-[1rem]"
      >
        {isPaused ? <Play /> : <Pause />}
      </button>

      <div className="h-full w-full flex justify-center items-center text-2xl md:text-5xl lg:text-6xl xl:text-7xl z-10 font-bold md:font-thin gap-2 lg:gap-4">
        <div className={`${cinzel.className} text-accent`}>
          {currentIndex === 1 && <Heading text="TIMELESS PRICELESS" />}
        </div>
      </div>
    </div>
  );
};

export default FullScreenMedia;