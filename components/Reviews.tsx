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
    <div className="bg-zinc-100 rounded-lg overflow-hidden ">
      <div className="flex flex-col gap-4">
        <Image src={image} alt="avatar" width={500} height={600} className="w-full h-[600px] object-cover " />
        <div>
          <div className="text-sm font-bold px-4">{name}</div>
          <div className="text-sm text-zinc-500 flex gap-2 px-4 mt-2">
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-zinc-800 fill-zinc-800" />
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-zinc-500 mt-2 p-4">{text}</div>
    </div>
  );
};

export default function Reviews() {
  return (
    <div className="mt-12">
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
