"use client";
import Menu from "./menu";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false); 
    } else {
      setShow(true); 
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-white z-50 border-b-1"
    >
      <div className="container mx-auto">
        <Menu />
      </div>
    </motion.header>
  );
}
