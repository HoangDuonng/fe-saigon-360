'use client'
import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Thêm sự kiện cuộn
    window.addEventListener('scroll', handleScroll);

    // Xóa sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-[#333333] transition-colors"
          aria-label="Back to top"
        >
          <MdOutlineKeyboardArrowUp className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
