"use client";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { clearUser } from "@/redux/slices/authSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LocalSwitcher from "../local-switcher";
import { useEffect, useState } from "react";
import SubMenu from "./sub-menu";
import LoginButton from "./login-button";
import axiosFe from "@/helpers/call-fe";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const handleLogout = async () => {
    const accessToken = Cookies.get('access_token'); // Lấy access token từ cookies
    // Gọi API logout và truyền access_token qua header
    try {
        const response = await axiosFe.post(
            `/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 200) {
            dispatch(clearUser());
            Cookies.remove('refresh_token');
            Cookies.remove('access_token');
            Cookies.remove('sessionId');
            //WebSocketService.disconnect();
            router.push('/');
        } else {
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
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
    // <header className="p-5 bg-black bg-opacity-50">
    <header className="fixed top-0 left-0 w-full z-50 p-5 bg-[#C4A300] bg-opacity-60 backdrop-blur-sm text-white">
      <nav className="flex items-center justify-between relative">
        <Link href={`/${locale}/`}>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-2 ml-1">
            <span className="text-sm md:text-xl font-bold text-red">SAIGON</span>
            <span className="text-sm md:text-xl font-bold text-white">360</span>
          </div>
        </Link>

        <div className="flex space-x-20 text-base relative">
          {/* Trang chủ */}
          <Link href={`/${locale}/`}>
            <button className="px-1 py-1 block font-light text-white text-sm transition hover:text-red">
              {locale === "en" ? "Homepage" : "Trang chủ"}
            </button>
          </Link>

          <Link href={`/${locale}/introduce`}>
            <button className="px-1 py-1 block font-light text-white text-sm transition hover:text-red">
              {locale === "en" ? "Introduce" : "Giới thiệu"}
            </button>
          </Link>

          {/* Các menu khác */}
          {menu.map(
            (item) =>
              item.active && (
                <div
                  key={item.id}
                  className="relative flex items-center hover:text-red"
                  onClick={() => handleClick(item)}
                >
                  <button className="px-1 py-1 block font-light text-white text-sm transition hover:text-red">
                    {locale === "en" ? item.nameEn : item.nameVi}
                  </button>
                  {activeItem?.id === item.id ? <IoIosArrowUp className="w-3 h-3 text-white" /> : <IoIosArrowDown className="w-3 h-3 text-white" />}
                </div>
              )
          )}
          <Link href={`/${locale}/vtour-travel`}>
            <button className="px-1 py-1 block font-light text-white text-sm transition hover:text-red">
              {locale === "en" ? "Virtual Tour" : "Tham quan thực tế ảo"}
            </button>
        </Link>
        </div>
        

        <LocalSwitcher />
        <LoginButton />
      </nav>

      {/* SubMenu chỉ hiển thị nếu có subFunctions */}
      {activeItem?.subFunctions && <SubMenu subFunctions={activeItem.subFunctions} locale={locale} />}
    </header>
  );
}
