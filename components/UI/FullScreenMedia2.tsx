"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

const mediaArray = [
  {
    type: "image",
    src: "/hero2.png",
  },
  {
    type: "image",
    src: "/hero3.png",
  },
  {
    type: "image",
    src: "/hero4.png",
  },
];

const FullScreenMedia2: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (!isManualNavigation) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaArray.length);
      }
      setIsManualNavigation(false);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, isManualNavigation]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const goToIndex = (index: number) => {
    setIsManualNavigation(true);
    setCurrentIndex(index);
    setIsPaused(false);
  };

  const currentMedia = mediaArray[currentIndex];

  return (
    <div className="h-[calc(80vh)] relative overflow-hidden flex items-start justify-end text-white text-right my-12 ">
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
            priority
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

      {/* Navigation Buttons - Rectangular */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {mediaArray.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-1 w-8 transition-all duration-300 ${
              currentIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Stop/Play Button */}
      <button
        onClick={togglePause}
        className="absolute left-2 bottom-2 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all z-20 h-[2rem] w-[2rem] flex justify-center items-center text-[1rem] origin-center"
      >
        {isPaused ? <Play /> : <Pause />}
      </button>
    </div>
  );
};

export default FullScreenMedia2;