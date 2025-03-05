"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LocalSwitcher from "../local-switcher";
import { useEffect, useState } from "react";
import LoginButton from "./login-button";
import SubMenu from "./sub-menu";
import Favourite from "./favorite";

interface SubFunction {
  name: string;
  url: string;
}

interface MenuItem {
  id: string;
  nameEn: string;
  nameVi: string;
  active: boolean;
  subFunctions?: SubFunction[];
}

export default function Menu() {
  const locale = useLocale();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch(`/api/menu/${locale}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [locale]);

  const handleClick = (item: MenuItem) => {
    setActiveItem(activeItem?.id === item.id ? null : item);
  };

  return (
    <header className="p-5 bg-white">
      <nav className="flex items-center justify-between relative">
        <Link href={`/${locale}/`}>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-2 ml-1">
            <span className="text-xl md:text-2xl font-bold text-red">SAIGON</span>
            <span className="text-xl md:text-2xl font-bold text-yellow">360</span>
          </div>
        </Link>
        <div className="flex space-x-20 text-base relative">
          {menu.map(
            (item) =>
              item.active && (
                <div key={item.id} className="relative flex items-center hover:text-red" onClick={() => handleClick(item)}>
                  <button
                    className="px-1 py-1 block font-bold text-black transition hover:text-red"
                  >
                    {locale === "en" ? item.nameEn : item.nameVi}
                  </button>
                  {activeItem?.id === item.id ? <IoIosArrowUp className="w-4 h-4" /> : <IoIosArrowDown className="w-4 h-4" />}
                </div>
              )
          )}
        </div>

        <Favourite />
        <LocalSwitcher />
        <LoginButton />
      </nav>

      {activeItem?.subFunctions && (
        <SubMenu subFunctions={activeItem.subFunctions} locale={locale} />
      )}
    </header>
  );
}