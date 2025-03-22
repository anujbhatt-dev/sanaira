import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import { StarIcon } from "lucide-react";

const reviews = [
  {
    name: "Aarav Sharma",
    image: "/2.jpg",
    rating: 5,
    text: "Absolutely love the quality and design! The attention to detail is just amazing. Will definitely recommend to friends!",
  },
  {
    name: "Meera Kapoor",
    image: "/3.jpg",
    rating: 5,
    text: "The fabric feels premium, and the fit is perfect. Great experience from start to finish!",
  },
  {
    name: "Rohan Verma",
    image: "/4.jpg",
    rating: 5,
    text: "I was skeptical at first, but this turned out to be one of my best purchases. The quality is exceptional!",
  },
];

const ReviewCard = ({ name, image, rating, text }: { name: string; image: string; rating: number; text: string }) => {
  return (
    <div className="bg-zinc-100 p-4 rounded-lg">
      <div className="flex items-center gap-x-4">
        <Image src={image} alt="avatar" width={160} height={160} className="w-20 h-20 object-cover rounded-full" />
        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="text-sm text-zinc-500 flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-amber-600 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-zinc-500 mt-2">{text}</div>
    </div>
  );
};

export default function Reviews() {
  return (
    <div className="mt-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-xl md:text-3xl flex items-center justify-center gap-x-4">
          <Heading text="What " />
          <Heading text="they" />
          <Heading text="say?" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
}
