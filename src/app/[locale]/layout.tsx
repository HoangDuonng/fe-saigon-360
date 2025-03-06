// import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../provider";
import UserFetcher from "./UserFetcher";
import { WebSocketProvider } from "./web-socket-context";
import GuestSessionInitializer from "@/components/GuestSession/GuestSessionInitializer";

// const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {

  return (
    <>
      <GuestSessionInitializer />
      <Provider>
        <WebSocketProvider>
          <UserFetcher>
            <div className="flex flex-col min-h-screen mx-auto">
              <div className="flex-grow">{children}</div>
            </div>
          </UserFetcher>
        </WebSocketProvider>
      </Provider>
    </>
  );
}
