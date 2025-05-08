"use client";
import "@/styles/globals.css";
import Provider from "../provider";
import { getOrCreateGuestSession } from "@/services/guestSessionService";
import { useEffect, useState } from "react";
import UserFetcher from "./UserFetcher";
import { WebSocketProvider } from "./web-socket-context";
import GuestSessionInitializer from "@/components/guest-session/GuestSessionInitializer";
import VirtualAssistant from "@/components/chatbot";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrCreateGuestSession().finally(() => {
      setLoading(false); // Ẩn spinner sau khi load xong
    });
  }, []);

  return (
    <>
      <GuestSessionInitializer />
      <Provider>
        <WebSocketProvider>
          <UserFetcher>
            {/* Spinner hiển thị khi loading */}
            {loading && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-[#C4A300] rounded-full animate-spin"></div>
              </div>
            )}

            {/* Nội dung chính */}
            <div className="flex flex-col min-h-screen mx-auto">
              <div className="flex-grow">{children}</div>
              <VirtualAssistant />
            </div>
          </UserFetcher>
        </WebSocketProvider>
      </Provider>
    </>
  );
}
