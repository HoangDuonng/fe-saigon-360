"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axiosFe from "@/helpers/call-fe";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useLocale } from "next-intl";

interface ImagePanoramaProps {
  images: string[];
  text?: string;
  address?: string;
  interval?: number;
}

export default function DestinationBanner({ images, text, address, interval = 3000 }: ImagePanoramaProps) {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user?.id && id) {
      axiosFe
        .get(`/api/favorites/${user.id}/${id}`)
        .then((res) => {
          console.log("🔥 API Response:", res.data); // Xem API trả về gì
          setIsFavorite(res.data);
        })
        .catch((error) => console.error("❌ Error checking favorite status:", error));
    }
  }, [user?.id, id]);


  const handleFavoriteToggle = async () => {
    if (!user?.id || !id) return;

    try {
      if (isFavorite) {
        await axiosFe.delete(`/api/favorites/${user.id}/${id}`);
      } else {
        await axiosFe.post(`/api/favorites/${user.id}/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[740px] cursor-pointer overflow-hidden select-none">
      {/* Ảnh Panorama */}
      <Image
        src={images[currentIndex]}
        alt="Panorama"
        layout="fill"
        objectFit="cover"
        className="rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out"
      />

      {/* Overlay Text + Address */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        <span className="text-white text-xl md:text-4xl font-bold">{text || "Ouvrir la visite virtuelle"}</span>

        {/* Thêm link Google Maps */}
        {address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm md:text-base font-light mt-2 underline hover:text-yellow-400 transition-all"
          >
            {address}
          </a>
        )}

        <button
          onClick={handleFavoriteToggle}
          className={`flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-xl transition-all duration-300
      ${isFavorite ? "bg-yellow text-white opacity-90" : "bg-red-500 hover:bg-yellow text-white"}
    `}
          disabled={loading}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <MdOutlineBookmarkAdd className="w-6 h-6 transition-all duration-300 text-white" />
          )}
          <span className="text-sm font-light">
            {locale === "en" ? (isFavorite ? "Remove from Favorites" : "Add to Favorites") : (isFavorite ? "Hủy yêu thích" : "Thêm vào yêu thích")}
          </span>
        </button>
      </div>

    </div>
  );
}
