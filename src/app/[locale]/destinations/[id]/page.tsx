"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import axiosFe from "@/helpers/call-fe";
import DestinationBanner from "@/components/banner/destination-banner";
import DestinationIntroduce from '@/components/destination/destination-introduce';
import InfoCard from "@/components/banner/info-card";
import InfoSection from "@/components/banner/info-section";
import Header from "@/components/header/header";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Destination = {
    id: string;
    name: string;
    address: string;
    open_time: string;
    title: string;
    description: string;
    content: string; 
    image_banner: string[];
    image_content: string[];
};

export default function DestinationById() {
    const locale = useLocale();
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.user);
    const [destination, setDestination] = useState<Destination | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!id) return;

        axiosFe
            .get(`/api/destination/${locale}/${id}`)
            .then((res) => {
                console.log("API Response Data:", res.data);  
                setDestination({
                    id: res.data.id,
                    name: res.data[`name_${locale}`] || "N/A",
                    address: res.data[`address_${locale}`] || "N/A",
                    open_time: res.data.open_time || "N/A",
                    title: res.data[`title_${locale}`] || "N/A",
                    description: res.data[`description_${locale}`] || "N/A",
                    content: res.data[`content_${locale}`] || "N/A", // NEW: Get Vietnamese content
                    image_banner: res.data.image_banner ? res.data.image_banner.split(",") : [],
                    image_content: res.data.image_content ? res.data.image_content.split(",") : [],
                });
            })
            .catch((error) => console.error("Fetch error:", error));
            console.log("")
    }, [locale, id]);

    // Kiểm tra nếu đã thêm vào danh sách yêu thích
    useEffect(() => {
        if (!user?.id || !id) return;

        axiosFe.get(`/api/favorites/${user.id}`)
            .then((res) => {
                const favorites = res.data || [];
                setIsFavorite(favorites.some((fav: { destinationId: string }) => fav.destinationId === id));
            })
            .catch((error) => console.error("Error checking favorites:", error));
    }, [user?.id, id]);

    // Hàm thêm vào danh sách yêu thích
    const handleAddFavorite = async () => {
        if (!user?.id || !id) return;

        try {
            await axiosFe.post(`/api/favorites/${user.id}/${id}`);
            console.log("Check user id", user.id)
            console.log("Check destination id", id)
            setIsFavorite(true);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    return (
        <div>
            {destination ? (
                <div>
                    <Header />
                    <DestinationBanner
                        images={destination.image_banner.map(image => `/api/destination/image/banner/${image}`)}
                        text={destination.name}
                        address={destination.address}
                    />

                    <div className="mx-6 md:mx-40">
                        <InfoCard
                            title={destination.name}
                            description={destination.description}
                            duration={destination.open_time}
                            imageUrl={
                                destination.image_banner.length > 0 
                                    ? `/api/destination/image/banner/${destination.image_banner[0]}` 
                                    : '/path/to/default-image.png'
                            }
                            gallery={destination.image_banner.map(image => `/api/destination/image/banner/${image}`)}
                            reviewCount={destination.image_content.length}
                        />

                        <InfoSection
                            title={destination.name}
                            openTime={destination.open_time}
                            subtitle={destination.title}
                            content={destination.content} 
                            images={destination.image_content.map(image => `/api/destination/image/content/${image}`)}
                            id={destination.id}
                        />

                        <div className="md:pt-24">
                            <div className="w-full md:h-auto">
                                <iframe
                                    src={`/panoramas/vtour/${locale}/${id}.html`}
                                    title="360 Tour"
                                    className="w-full shadow-lg rounded-lg"
                                    style={{ height: "calc(100vh - 96px)" }}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-roboto font-bold text-black pb-1 flex items-center gap-2 mt-10">
                            {locale === "en" ? "Nearby Attractions" : "Địa điểm gần đây hấp dẫn"}
                        </h2>
                        <DestinationIntroduce />
                        
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}