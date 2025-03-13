'use client';

import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notification() {
  const locale = useLocale();
  const [count] = useState(3); // Số thông báo có sẵn
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown khi nhấn vào icon
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center space-x-2" ref={dropdownRef}>
      {/* Icon thông báo */}
      <div className="relative" onClick={toggleDropdown}>
        <IoNotificationsOutline className="w-5 h-5 text-white cursor-pointer" />

        {/* Badge số lượng thông báo */}
        {count > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-light px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>

      {/* Văn bản "Thông báo" */}
      <span
        className="px-1 py-1 block font-light text-white text-sm transition hover:text-red-500 hover:cursor-pointer"
        onClick={toggleDropdown}
      >
        {locale === "en" ? "Notifications" : "Thông báo"}
      </span>

      {/* Dropdown danh sách thông báo */}
      {isOpen && (
        <div className="absolute top-8 left-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50">
          <h3 className="text-sm font-semibold border-b pb-2">{locale === "en" ? "Recent Notifications" : "Thông báo gần đây"}</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
              {locale === "en" ? "New message received" : "Bạn có tin nhắn mới"}
            </li>
            <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
              {locale === "en" ? "Your booking is confirmed" : "Đặt lịch của bạn đã được xác nhận"}
            </li>
            <li className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
              {locale === "en" ? "System maintenance at midnight" : "Bảo trì hệ thống lúc nửa đêm"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
