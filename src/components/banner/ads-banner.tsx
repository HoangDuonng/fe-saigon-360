"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

const images = [
  {
    src: "/assets/images/hochiminh.png",
    titleEn: "Discover Ho Chi Minh City",
    titleVi: "Khám phá thành phố Hồ Chí Minh",
    descriptionEn: "Experience the vibrant beauty of Saigon with 360° panoramic views.",
    descriptionVi: "Trải nghiệm vẻ đẹp sôi động của Sài Gòn với góc nhìn toàn cảnh 360°."
  },
  {
    src: "/assets/images/amthuc.png",
    titleEn: "Savor the Rich Vietnamese Cuisine",
    titleVi: "Thưởng thức nền ẩm thực phong phú của Việt Nam",
    descriptionEn: "Enjoy the diverse and flavorful dishes that define Vietnamese culture.",
    descriptionVi: "Thưởng thức những món ăn đa dạng và đậm đà làm nên văn hóa Việt Nam."
  },
  {
    src: "/assets/images/event.png",
    titleEn: "Celebrate Unique Festivals in Ho Chi Minh City",
    titleVi: "Hòa mình vào các lễ hội độc đáo tại thành phố Hồ Chí Minh",
    descriptionEn: "Discover the vibrant traditions and festivals of the local people.",
    descriptionVi: "Khám phá những nét truyền thống và lễ hội sôi động của người dân địa phương."
  },
];

export default function AdsBanner() {
  const [current, setCurrent] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {images.map((img, index) =>
          index === current ? (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={img.src}
                alt={locale === "en" ? img.titleEn : img.titleVi}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-5xl font-bold uppercase mb-4 font-[Dancing Script]">
                  {locale === "en" ? img.titleEn : img.titleVi}
                </h1>
                <p className="text-lg font-medium">
                  {locale === "en" ? img.descriptionEn : img.descriptionVi}
                </p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
