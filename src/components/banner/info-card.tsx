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
    <div className="flex flex-col sm:flex-row w-full h-auto mt-10 bg-white shadow-2xl rounded-3xl overflow-hidden p-4 sm:p-8 gap-4 sm:gap-6 items-center pb-20">
      {/* Left Section - Image & Gallery */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-[300px] relative rounded-3xl overflow-hidden">
          <Image
            src={mainImage}
            alt="Main Image"
            width={800}
            height={800}
            className="object-cover w-[500px] h-full transition-all  hover:scale-105"
          />
        </div>
        {/* Ẩn gallery trên mobile */}
        <div className="flex space-x-2 sm:space-x-3 mt-2 sm:mt-4 overflow-x-auto scrollbar-hide">
          {gallery.map((img, index) => (
            <button key={index} onClick={() => setMainImage(img)}>
              <div className="w-[50px] h-[50px] sm:w-[82px] sm:h-[82px] relative rounded-xl overflow-hidden shadow-md border-2 border-transparent hover:border-black transition-all">
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
      <div className="sm:w-1/2 flex flex-col justify-center text-black space-y-3 sm:space-y-4 h-[300px] sm:h-[400px] mt-10">
        <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
          {locale === "en" ? "About " : ""}{title}
        </h2>
        <p className="text-sm sm:text-base text-black leading-relaxed">
          {description}
        </p>
      </div>
    </div>

  );
}
