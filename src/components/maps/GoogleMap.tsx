import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const GoogleMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (window.google) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);

        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!isLoaded || !mapRef.current) return;

        // Lấy vị trí người dùng
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserLocation(userPos);

                // Chỉ tạo bản đồ nếu chưa có
                if (!mapInstance.current) {
                    const { Map } = google.maps;
                    mapInstance.current = new Map(mapRef.current!, {
                        center: userPos,
                        zoom: 15,
                        mapTypeId: "hybrid",
                    });

                    // Xử lý khi người dùng nhấp chọn điểm đến
                    mapInstance.current.addListener("click", (e: google.maps.MapMouseEvent) => {
                        if (e.latLng) {
                            setDestination({
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng(),
                            });
                        }
                    });
                }
            },
            () => alert("Không thể lấy vị trí của bạn.")
        );
    }, [isLoaded]);

    // Tạo marker khi chọn điểm đến
    useEffect(() => {
        if (!mapInstance.current || !destination) return;

        const marker = new google.maps.Marker({
            position: destination,
            map: mapInstance.current,
            title: "Điểm đến",
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Marker màu đỏ
        });

        return () => marker.setMap(null); // Xóa marker cũ nếu điểm đến thay đổi
    }, [destination]);

    // Xử lý chỉ đường khi chọn điểm đến
    useEffect(() => {
        if (!userLocation || !destination || !mapInstance.current) return;

        const directionsService = new google.maps.DirectionsService();

        // Nếu chưa có directionsRenderer thì tạo mới
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new google.maps.DirectionsRenderer();
            directionsRendererRef.current.setMap(mapInstance.current);
        }

        directionsService.route(
            {
                origin: userLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
                    directionsRendererRef.current.setDirections(result);
                } else {
                    console.error("Lỗi khi lấy chỉ đường: ", status);
                }
            }
        );
    }, [destination, userLocation]);

    return <div ref={mapRef} className="w-full h-screen" />;
};

export default GoogleMap;
