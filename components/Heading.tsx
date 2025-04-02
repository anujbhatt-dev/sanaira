"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap"

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const animation = gsap.from(lettersRef.current, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Starts animation when 80% of the element is visible
        toggleActions: "play none none reverse", // Play on enter, reverse on leave        
      },
    });

    // Cleanup the animation and scroll trigger
    return () => {
      animation.kill(); // Kill the GSAP animation
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all active scroll triggers
    };
  }, []);

  return (
    <h1
      ref={containerRef}
      className=" uppercase tracking-widest flex overflow-hidden my-4 lg:my-8"
    >
      {text.split("").map((letter, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) lettersRef.current[index] = el;
          }}
          className={`inline-block ${letter === " " && "w-4"}`}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default Heading;


// md:text-[3rem] text-[1rem]