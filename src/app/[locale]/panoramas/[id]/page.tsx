"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import axiosFe from "@/helpers/call-fe";

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
                    {/* Iframe hiển thị tour 360 */}
                    {locale === "en" ?
                        <div className="w-full h-screen">
                            <iframe
                                src={`/panoramas/vtour/en/${id}.html`}
                                title="360 Tour"
                                className="w-full h-full shadow-lg rounded-lg"
                                loading="lazy"
                            />
                        </div>
                        :
                        <div className="w-full h-screen">
                            <iframe
                                src={`/panoramas/vtour/vi/${id}.html`}
                                title="360 Tour"
                                className="w-full h-full shadow-lg rounded-lg"
                                loading="lazy"
                            />
                        </div>
                    }

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
