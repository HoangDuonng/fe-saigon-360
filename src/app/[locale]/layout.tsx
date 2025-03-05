"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../provider";
import { getOrCreateGuestSession } from "@/services/guestSessionService";
import { useEffect } from "react";
import UserFetcher from "./UserFetcher";
import { WebSocketProvider } from "./web-socket-context";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  useEffect(() => {
    getOrCreateGuestSession();
  }, []);

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <WebSocketProvider>
            <UserFetcher>
              <div className="flex flex-col min-h-screen mx-auto">
                <div className="flex-grow">{children}</div>
              </div>
            </UserFetcher>
          </WebSocketProvider>
        </Provider>
      </body>
    </html>
  );
}
