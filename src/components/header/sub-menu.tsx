"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface SubFunction {
  name: string;
  url: string;
}

interface SubMenuProps {
  subFunctions: SubFunction[];
  locale: string;
}

export default function SubMenu({ subFunctions, locale }: SubMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 w-full bg-[#EBEBEB] shadow-md z-50 border-t border-b-4 border-red"
    >
      <div className="container mx-auto grid grid-cols-3 gap-6 h-72 p-6 overflow-y-auto">
        {subFunctions.map((sub) => (
          <Link
            key={sub.url}
            href={`/${locale}${sub.url}`}
            className="block text-yellow font-medium hover:font-bold"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
