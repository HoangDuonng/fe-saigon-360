"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import axiosFe from "@/helpers/call-fe";
import Link from "next/link";

type Destination = {
  id: string;
  name: string;
};

export default function Destinations() {
  const locale = useLocale();
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    axiosFe
      .get(`/api/destination/${locale}`)
      .then((res) => {
        console.log("API Response:", res.data);

        const formattedData = res.data.map((item: any) => ({
          id: item.id, 
          name: item[`name_${locale}`] || "N/A",
        }));

        setDestinations(formattedData);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [locale]);

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <li key={destination.id}>
              <Link href={`/${locale}/destinations/${destination.id}`}>
                {destination.name}
              </Link>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

