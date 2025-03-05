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
    <div className="flex flex-col md:flex-row w-full mt-10 bg-white shadow-2xl rounded-3xl overflow-hidden p-8 gap-6">
      {/* Left Section - Image & Gallery */}
      <div className="md:w-1/2 flex flex-col items-center">
        <div className="w-full h-[450px] relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={mainImage}
            alt="Main Image"
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
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
      <div className="md:w-1/2 flex flex-col justify-center text-black space-y-4">
        <h2 className="text-2xl font-extrabold leading-tight">
        {locale==="en"? "About " : ""}
           {title}</h2>
        <p className="text-[15px] text-black leading-relaxed">{description}</p>
        <p className="text-black font-medium text-xs">
          {locale==="en"? "🕒Open time: " : "🕒 Thời gian hoạt động: "}
          {duration}
          </p>
        <button className="mt-4 bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
          {locale==="en"? "See options" : "Xem lựa chọn"}
        </button>
      </div>
    </div>
  );
}
