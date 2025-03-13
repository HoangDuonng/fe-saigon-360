"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

interface InfoCardProps {
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  gallery: string[];
  reviewCount: number;
}

export default function InfoCard({
  title,
  description,
  duration,
  imageUrl,
  gallery,
  reviewCount,
}: InfoCardProps) {
  const locale = useLocale();
  const [mainImage, setMainImage] = useState(imageUrl);

  return (
    <div className="flex flex-col md:flex-row w-full mt-10 bg-white shadow-2xl rounded-3xl overflow-hidden p-8 gap-6 items-center">
      {/* Left Section - Image & Gallery */}
      <div className="md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full h-[400px] relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={mainImage}
            alt="Main Image"
            fill
            className="object-cover h-full w-full transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="flex space-x-3 mt-4 overflow-auto scrollbar-hide">
          {gallery.map((img, index) => (
            <button key={index} onClick={() => setMainImage(img)}>
              <div className="w-[82px] h-[82px] relative rounded-xl overflow-hidden shadow-md border-2 border-transparent hover:border-black transition-all">
                <Image
                  src={img}
                  alt="Gallery Image"
                  fill
                  className="object-cover cursor-pointer hover:opacity-75 transition"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="md:w-1/2 flex flex-col justify-center text-black space-y-4 h-[400px]">
        <h2 className="text-2xl font-extrabold leading-tight">
          {locale === "en" ? "About " : ""}{title}
        </h2>
        <p className="text-base text-black leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
