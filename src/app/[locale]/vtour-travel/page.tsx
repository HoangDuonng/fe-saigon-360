"use client";
import Images from "@/components/shared";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { CiPlay1 } from "react-icons/ci";
import { useState } from "react";

export default function VtourTravel() {
    const locale = useLocale();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <Image
                src={Images.district1}
                layout="fill"
                objectFit="cover"
                alt="Ho Chi Minh Travel"
                className="brightness-75"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-6 z-10">
                {/* Title */}
                <h1 className="text-4xl font-light drop-shadow-lg">
                    {locale === "en" ? "Welcome to" : "Chào mừng tới"}
                </h1>
                <h2 className="text-5xl font-bold drop-shadow-xl">
                    {locale === "en" ? "Ho Chi Minh City" : "Thành phố Hồ Chí Minh"}
                </h2>

                {/* Video Play Button */}
                <button
                    onClick={() => setShowVideo(true)}
                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition duration-300 shadow-lg"
                >
                    <CiPlay1 className="ml-1 w-8 h-8 text-white drop-shadow-md" />
                </button>

                {/* Continue Button */}
                <Link href={`/${locale}/vtour-travel/panorama`}>
                    <button className="flex items-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full space-x-2 transition duration-300 shadow-md">
                        <span className="uppercase tracking-wide">Continue</span>
                    </button>
                </Link>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                    <div className="relative w-3/4 max-w-4xl h-3/4 bg-black rounded-lg overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-3 right-3 text-white text-3xl z-30 hover:text-red-500 transition duration-200"
                        >
                            ✕
                        </button>
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/ZBSiZ5Pcjjg"
                            title="Tourism Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
