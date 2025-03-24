"use client";
import { ToastContainer } from "react-toastify";
import SideBar from "@/app/(administration)/components/header/side-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <main className="ml-64 p-4">{children}</main> 
      <ToastContainer />
    </>
  );
}
