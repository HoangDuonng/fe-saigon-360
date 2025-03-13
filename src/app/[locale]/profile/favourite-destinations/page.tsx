"use client";
import Header from "@/components/header/header";
import axiosFe from "@/helpers/call-fe";
import { RootState } from "@/redux/store";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Destination {
    id: string;
    name: string;
    imageUrl?: string;
}

export default function FavouriteDestination() {
    const locale = useLocale();
    const user = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<Destination[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchFavorites = async () => {
            try {
                if (!user?.id) return;

                const response = await axiosFe.get(`/api/favorites/${user.id}`, { signal });
                const favoriteDestinations = response.data;

                if (favoriteDestinations.length === 0) return;

                const destinations = await Promise.all(
                    favoriteDestinations.map(async (fav: { destinationId: string }) => {
                        try {
                            const destinationResponse = await axiosFe.get(`/api/destination/${locale}/${fav.destinationId}`, { signal });
                            const data = destinationResponse.data;
                            return {
                                id: data.id,
                                name: data[`name_${locale}`] || "N/A",
                                imageUrl: data.image_banner
                                    ? `/assets/images/${data.id}/about/${data.image_banner.split(",")[0]}.png`
                                    : undefined, // Lấy ảnh đầu tiên
                            };
                        } catch (error) {
                            console.error(`Error fetching destination ${fav.destinationId}:`, error);
                            return null;
                        }
                    })
                );

                setFavorites(destinations.filter(Boolean)); // Lọc bỏ `null` nếu có request bị lỗi
            } catch (error) {
                console.error("Error fetching favorite destinations:", error);
            }
        };

        fetchFavorites();

        return () => controller.abort(); // Hủy request nếu component bị unmount
    }, [user?.id, locale]);

    return (
        <div>
            <Header />
            <div className="p-6 mt-20 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {locale === "en" ? "Favorite Destinations" : "Địa điểm yêu thích"}
                </h1>

                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500">
                        {locale === "en" ? "No favorite destinations yet." : "Chưa có địa điểm yêu thích nào."}
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((destination) => (
                            <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
                                {destination.imageUrl && (
                                    <Image
                                        src={destination.imageUrl}
                                        alt={destination.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{destination.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
