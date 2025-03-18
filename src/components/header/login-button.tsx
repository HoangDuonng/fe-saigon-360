import Image from 'next/image';
import Images from '@/components/shared';
import Cookies from 'js-cookie';
import { env } from '@/env.mjs';
import { clearUser } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { RootState } from '@/redux/store';
import { useEffect, useState, useRef } from 'react';
import axiosClientFe from '@/helpers/call-fe';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '../ui/button';
let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

export default function GoogleButton() {
    const locale = useLocale();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const hrefs = `/${locale}/api/profile`;
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const openSignInWindow = (url: string, name: string) => {
        const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700';

        if (!windowObjectReference || windowObjectReference.closed) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference?.focus();
        } else {
            windowObjectReference.focus();
        }

        previousUrl = url;
    };

    const handleLoginGoogle = () => {
        const sessionId = Cookies.get('sessionId') || 'generated-session-id';
        const googleAuthUrl = `${env.NEXT_PUBLIC_GOOGLE_LOGIN}?sessionId=${encodeURIComponent(sessionId)}`;
        openSignInWindow(googleAuthUrl, 'Google Login');
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        console.log('Redux user:', user);
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        const accessToken = Cookies.get('access_token'); 
        console.log("Access Token:", accessToken); // Log token để kiểm tra
    
        try {
            const response = await axiosClientFe.post(
                `/api/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Logout response:", response); // Xem phản hồi từ API
    
            if (response.status === 200) {
                dispatch(clearUser());
                Cookies.remove('refresh_token');
                Cookies.remove('access_token');
                Cookies.remove('sessionId');
                window.location.reload();
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div ref={menuRef} className="relative">
            {user && user.name ? (
                <div className="flex items-center space-x-4" onClick={toggleMenu}>
                    <Image
                        src={user.img || "/assets/images/default-avatar.png"}
                        width={200}
                        height={200}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-gray-200 cursor-pointer"
                    />
                    <span className="text-sm text-white font-light hover:cursor-pointer">{user.name}</span>
                    {showMenu && (
                        <ul className="absolute top-10 right-0 w-48 p-2 bg-black bg-opacity-50 backdrop-blur-sm shadow-md rounded-lg border border-gray-600 text-white text-sm font-light">
                            <li className="px-4 py-2 font-medium hover:bg-yellow hover:bg-opacity-50 rounded cursor-pointer">
                                <Link href={`/${locale}/profile`}>
                                {locale === "en" ? "Account Info" : "Thông tin tài khoản"}
                                </Link>
                            </li>
                            <li className="px-4 py-2 font-medium hover:bg-yellow hover:bg-opacity-50 rounded cursor-pointer">
                                <Link href={`/${locale}/profile/favourite-destinations`}>
                                    {locale === "en" ? "Favourite tours" : "Địa điểm yêu thích"}
                                </Link>
                            </li>
                            <Button className="px-4 py-2 bg-transparent hover:bg-yellow hover:bg-opacity-50 rounded cursor-pointer" onClick={handleLogout}>
                                {locale === "en" ? "Sign out" : "Đăng xuất"}
                            </Button>
                        </ul>
                    )}
                </div>
            ) : (
                <button
                    className="flex justify-center items-center px-6 py-2 space-x-2 w-full text-white bg-transparent bg-opacity-50 hover:bg-yellow hover:bg-opacity-50 transition duration-300"
                    onClick={handleLoginGoogle}
                >
                    <span className="text-sm font-light">
                        {locale === "en" ? "Sign In" : "Đăng nhập"}
                    </span>
                    <Image
                        src={Images.google}
                        width={15}
                        height={15}
                        alt="google.png"
                        className="w-5 h-5 object-cover"
                    />
                </button>
            )}
        </div>
    );
}
