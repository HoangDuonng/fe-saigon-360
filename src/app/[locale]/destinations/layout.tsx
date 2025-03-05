"use client";
import BackToTop from "@/components/back-to-top";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ReactNode, useEffect, useState } from "react";
import ClientProvider from "../../provider";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (

    <>
      <ClientProvider>
        <div className="mb-20">
          <Header />
        </div>
        {children}
        <BackToTop />
        <Footer />
      </ClientProvider>
    </>
  )
}
