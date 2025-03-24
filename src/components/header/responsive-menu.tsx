'use client';
import React, { useEffect, useState } from 'react';
import GoogleButton from './login-button';
import axiosClientFe from '@/helpers/call-fe';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import LocalSwitcher from './../local-switcher';
import { MdKeyboardArrowUp, MdOutlineClose, MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface SubFunction {
    name: string;
    url: string;
}

interface MenuFunction {
    id: string;
    nameEn: string;
    nameVi: string;
    subFunctions: SubFunction[];
}

interface ResponsiveMenuProps {
    setMenuResponsive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResponsiveMenu({
    setMenuResponsive,
}: ResponsiveMenuProps) {
    const locale = useLocale();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [menuFunctions, setMenuFunctions] = useState<MenuFunction[]>([]);

    const toggleDropdown = (mainMenuFunction: string) => {
        setActiveDropdown(
            activeDropdown === mainMenuFunction ? null : mainMenuFunction
        );
    };

    useEffect(() => {
        const fetchMenuFunctions = async () => {
            try {
                const res = await fetch(`/api/menu/${locale}`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data: MenuFunction[] = await res.json();
                setMenuFunctions(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchMenuFunctions();
    }, [locale]);

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-yellow z-[9999] flex flex-col items-center justify-start'>
            {/* Header Section */}
            <div className='flex justify-between items-center w-full p-4 bg-yellow-600'>
                <div className='flex items-center justify-center space-x-1'>
                    <span className='text-2xl font-bold text-red'>SAIGON</span>
                    <span className='text-2xl font-bold text-white'>360</span>
                </div>
                <LocalSwitcher />
                <MdOutlineClose className='w-8 h-8 text-white cursor-pointer' onClick={() => setMenuResponsive(false)} />
            </div>

            {/* Google Login */}
            <div className='my-4'>
                <GoogleButton />
            </div>

            {/* Responsive Menu Items */}
            <div className='flex flex-col mt-10 items-center w-full space-y-8 overflow-y-auto'>
                {/* Homepage */}
                <Link href={`/${locale}/`}>
                    <button className='w-full text-base py-2 text-white uppercase hover:text-red transition-all'>
                        {locale === 'en' ? 'Homepage' : 'Trang chủ'}
                    </button>
                </Link>

                {/* Introduce */}
                <Link href={`/${locale}/introduce`}>
                    <button className='w-full text-base py-2 text-white uppercase hover:text-red transition-all'>
                        {locale === 'en' ? 'Introduce' : 'Giới thiệu'}
                    </button>
                </Link>

                {/* Menu Items */}
                {menuFunctions.map((menu) => (
                    <div key={menu.id} className='w-full text-center'>
                        <span
                            onClick={() => toggleDropdown(menu.id)}
                            className='flex items-center justify-center text-base py-2 text-yellow-700 cursor-pointer uppercase hover:text-red transition-all'>
                            {locale === 'en' ? menu.nameEn : menu.nameVi}
                            {activeDropdown === menu.id ? <MdKeyboardArrowUp className='ml-2' /> : <MdOutlineKeyboardArrowDown className='ml-2' />}
                        </span>
                        {activeDropdown === menu.id && (
                            <div className='flex flex-col mt-10 mb-10 items-center space-y-8'>
                                {menu.subFunctions.map((sub) => (
                                    <a key={sub.url} href={`/${locale}${sub.url}`} className='text-base italic text-gray-200 hover:text-red transition-all'>
                                        {sub.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Virtual Tour */}
                <Link href={`/${locale}/vtour-travel`}>
                    <button className='w-full text-base py-2 text-white uppercase hover:text-red transition-all'>
                        {locale === 'en' ? 'Virtual Tour' : 'Tham quan thực tế ảo'}
                    </button>
                </Link>
            </div>
        </div>
    );
}
