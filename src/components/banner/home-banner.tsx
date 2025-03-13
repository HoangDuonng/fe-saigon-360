"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Header from "@/components/header/header"; // Import header vào đây

const videos = [
  "/assets/video/nhathoducba.mp4",
  "/assets/video/nhathoducba.mp4",
];

export default function BookBanner() {
  const locale = useLocale();
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[820px] flex items-center justify-start overflow-hidden">
      {/* Header nằm trên banner */}
      <Header />

      {/* Video Background */}
      <motion.div
        key={currentVideo}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <video
          src={videos[currentVideo]}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Nội dung bên trái */}
      <motion.div
        className="relative z-10 text-left text-white bg-opacity-50 p-10 rounded-lg max-w-[600px] ml-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h5 className="uppercase tracking-wide font-semibold">
          {locale == "en" ? "Scientific research" : "Nghiên cứu khoa học"}
        </h5>
        <h1 className="text-5xl font-bold leading-tight my-4">
          {locale == "en" ? (
            <>Travel Sai Gon <br /> with panorama</>
          ) : (
            <>Du lịch Sài Gòn <br /> với panorama</>
          )}
        </h1>
        <p className="mb-6">
          {locale == "en"
            ? "This is a student scientific research project of a group of students majoring in Information Technology."
            : "Đây là dự án nghiên cứu khoa học sinh viên của nhóm sinh viên chuyên ngành Công nghệ thông tin."}
        </p>
        <Button className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow opacity-80 transition">
          {locale == "en" ? "Explore now" : "Khám phá ngay"}
        </Button>
      </motion.div>
    </div>
  );
}
