import "@/styles/globals.css"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import SideBar from "@/app/(administration)/components/header/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SideBar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}

