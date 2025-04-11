"use client";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeadingProps {
  text: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, className = "" }) => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!containerRef.current || lettersRef.current.length === 0) return;

    // Clear any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Reset initial state
    gsap.set(lettersRef.current, {
      y: 0,
      opacity: 1,
    });

    // Create new animation
    animationRef.current = gsap.from(lettersRef.current, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false, // Set to true for debugging
        invalidateOnRefresh: true, // Important for responsive changes
      },
    });

    // Refresh ScrollTrigger after a short delay to ensure proper calculation
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text]); // Re-run effect when text changes

  // Additional refresh on mount
  useEffect(() => {
    const handle = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(handle);
  }, []);

  return (
    <h1
      ref={containerRef}
      className={`uppercase tracking-widest flex flex-wrap overflow-hidden my-4 lg:my-8 ${className}`}
      aria-label={text}
    >
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          ref={(el) => {
            if (el) lettersRef.current[index] = el;
          }}
          className={`inline-block ${letter === " " ? "w-4" : ""}`}
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default Heading;