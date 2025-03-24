"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// react icons
import { MdDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <MdDashboard /> },
  { name: 'Destination', href: '/dashboard/manage-destination', icon: <FaMapLocationDot /> },
  { name: 'User', href: '/dashboard/manage-users', icon: <RiUserSettingsLine /> },
  { name: 'Settings', href: '/settings', icon: <CiSettings /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className="h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col p-5 fixed left-0 top-0">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-2 ml-1">
          <span className="text-base md:text-2xl font-bold text-red">SAIGON</span>
          <span className="text-m md:text-2xl font-bold text-yellow">360</span>
        </div>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${pathname === item.href ? 'bg-yellow text-white' : 'hover:bg-gray-100'}`}
          >
            <div className="flex items-center space-x-2">
              <span>{item.icon}</span>
              <span className="text-base font-light">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
