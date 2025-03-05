"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import axiosFe from "@/helpers/call-fe";
import { env } from '@/env.mjs';
import DestinationBanner from "@/components/banner/destination-banner";
import InfoCard from "@/components/banner/info-card";
import InfoSection from "@/components/banner/info-section";

type Destination = {
    id: string;
    name: string;
    address: string;
    open_time: string;
    title: string;
    description: string;
    image_banner: string[];
    image_content: string[];
};

export default function DestinationById() {
    const locale = useLocale();
    const { id } = useParams();
    const [destination, setDestination] = useState<Destination | null>(null);

    useEffect(() => {
        if (!id) return;

        axiosFe
            .get(`/api/destination/${locale}/${id}`)
            .then((res) => {
                console.log("API Response:", res.data);

                setDestination({
                    id: res.data.id,
                    name: res.data[`name_${locale}`] || "N/A",
                    address: res.data[`address_${locale}`] || "N/A",
                    open_time: res.data.open_time || "N/A",
                    title: res.data[`title_${locale}`] || "N/A",
                    description: res.data[`description_${locale}`] || "N/A",
                    image_banner: res.data.image_banner ? res.data.image_banner.split(",") : [],
                    image_content: res.data.image_content ? res.data.image_content.split(",") : [],
                });
            })
            .catch((error) => console.error("Fetch error:", error));
    }, [locale, id]);

    return (
        <div>
            {destination ? (
                <div>
                    {/* Banner hiển thị ảnh nền */}
                    <DestinationBanner
                        images={destination.image_content.map(image => `${env.NEXT_PUBLIC_IMAGE}/${id}/${image}.png`)}
                        text={destination.name}
                        address={destination.address}
                    />

                    <div className="mx-20">
                        {/* InfoCard hiển thị thông tin tóm tắt */}
                        <InfoCard
                            title={destination.name}
                            description={destination.description}
                            duration={destination.open_time}
                            imageUrl={`/assets/images/${id}/about/${destination.image_banner[0]}.png`}
                            gallery={destination.image_banner.map(image => `/assets/images/${id}/about/${image}.png`)}
                            reviewCount={destination.image_content.length}
                        />

                        {/* InfoSection hiển thị thông tin chi tiết */}
                        <InfoSection
                            title={destination.name}
                            openTime={destination.open_time}
                            subtitle={destination.title}
                            content={destination.description.split("\n")}
                            images={destination.image_content.length > 0 ? destination.image_content.map(image => `/assets/images/${id}/${image}.png`) : []} // Kiểm tra images
                            id={destination.id}
                        />

                        {/* Iframe hiển thị tour 360 */}
                        <div className="md:pt-24">
                            <div className="w-full md:h-auto">

                                {locale === "en" ?
                                    <iframe
                                        src={`/panoramas/vtour/en/${id}.html`}
                                        title="360 Tour"
                                        className="w-full shadow-lg rounded-lg"
                                        style={{ height: "calc(100vh - 96px)" }}
                                        loading="lazy"
                                    />
                                    :
                                    <iframe
                                        src={`/panoramas/vtour/vi/${id}.html`}
                                        title="360 Tour"
                                        className="w-full shadow-lg rounded-lg"
                                        style={{ height: "calc(100vh - 96px)" }}
                                        loading="lazy"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
}
