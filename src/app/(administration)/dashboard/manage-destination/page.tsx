"use client"
import axiosFe from "@/helpers/call-fe";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho Destination
interface Destination {
    id: string;
    name_vi: string;
    name_en: string;
}

export default function ManageDestination() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosFe.get('/api/destination/all');
                setDestinations(response.data);
                console.log("DAYA", response)
            } catch (err) {
                setError("Failed to fetch destinations.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>All Destinations</h1>
            <ul>
                {destinations.map((destination) => (
                    <li key={destination.id}>{destination.name_vi || destination.name_en}</li>
                ))}
            </ul>
        </div>
    );
}
