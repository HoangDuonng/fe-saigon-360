"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { clearUser } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import axiosClientFe from '@/helpers/call-fe';
import axiosFe from "@/helpers/call-fe";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Destination {
    id: string;
    name: string;
    imageUrl?: string;
}

export default function ProfileAndFavorites() {
    const dispatch = useDispatch();
    const locale = useLocale();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const [favorites, setFavorites] = useState<Destination[]>([]);

    const handleLogout = async () => {
        const accessToken = Cookies.get('access_token');
        console.log("Access Token:", accessToken);

        try {
            const response = await axiosClientFe.post(
                `/api/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Logout response:", response); // Xem phản hồi từ API

            if (response.status === 200) {
                dispatch(clearUser());
                Cookies.remove('refresh_token');
                Cookies.remove('access_token');
                Cookies.remove('sessionId');
                router.push("/")
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

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
                            const destinationResponse = await axiosFe.get(
                                `/api/destination/${locale}/${fav.destinationId}`,
                                { signal }
                            );
                            const data = destinationResponse.data;
                            return {
                                id: data.id,
                                name: data[`name_${locale}`] || "N/A",
                                imageUrl: data.image_banner
                                    ? `/assets/images/${data.id}/about/${data.image_banner.split(",")[0]}.png`
                                    : undefined,
                            };
                        } catch (error) {
                            console.error(`Error fetching destination ${fav.destinationId}:`, error);
                            return null;
                        }
                    })
                );

                setFavorites(destinations.filter(Boolean));
            } catch (error) {
                console.error("Error fetching favorite destinations:", error);
            }
        };

        fetchFavorites();
        return () => controller.abort();
    }, [user?.id, locale]);


    return (
        <div>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-screen-lg mb-8 mt-32">
                    <div className="flex flex-col items-center">
                        <Image
                            src={user?.img || "/assets/images/default-avatar.png"}
                            width={96}
                            height={96}
                            alt="Avatar"
                            className="rounded-full border-1 shadow-md"
                        />
                        <h2 className="text-lg font-semibold mt-4">
                            {user?.name || (locale === "en" ? "Not updated" : "Tên chưa cập nhật")}
                        </h2>
                        <p className="text-black text-sm font-light">
                            {user?.email || (locale === "en" ? "Email not updated" : "Email chưa cập nhật")}
                        </p>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-black text-sm">
                                {locale === "en" ? "Full Name:" : "Họ và tên:"}
                            </span>
                            <span className="text-black font-light text-sm">
                                {user?.name || (locale === "en" ? "Not updated" : "Chưa cập nhật")}
                            </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-black text-sm">E-mail:</span>
                            <span className="text-black font-light text-sm">
                                {user?.email || (locale === "en" ? "Not updated" : "Chưa cập nhật")}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Button
                            onClick={handleLogout}
                            className="bg-yellow text-white px-6 py-2 rounded-lg hover:bg-yellow hover:font-bold hover:opacity-50"
                        >
                            {locale === "en" ? "Sign Out" : "Đăng xuất"}
                        </Button>
                    </div>
                </div>
                <div className="p-6 w-full max-w-screen-lg">
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
                                    <Link href={`/${locale}/destinations/${destination.id}`}>
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
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}