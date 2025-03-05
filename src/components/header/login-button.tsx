import Image from 'next/image';
import Images from '@/components/shared';
import Cookies from 'js-cookie';
import { env } from '@/env.mjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';


let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

export default function GoogleButton() {
    const locale = useLocale();
    const user = useSelector((state: RootState) => state.user);

    const openSignInWindow = (url: string, name: string) => {
        const strWindowFeatures =
            'toolbar=no, menubar=no, width=600, height=700';

        if (windowObjectReference === null || windowObjectReference.closed) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
            if (windowObjectReference === null) {
                console.log('null');
            }
            windowObjectReference?.focus();
        } else {
            windowObjectReference.focus();
        }

        previousUrl = url;
    };


    const handleLoginGoogle = () => {
        const sessionId = Cookies.get('sessionId') || 'generated-session-id';

        // const googleAuthUrl = 
        // `${env.NEXT_PUBLIC_GOOGLE_LOGIN
        // }?sessionId=${encodeURIComponent(sessionId)}`;
        const googleAuthUrl = `http://localhost:8386/oauth2/authorization/google?sessionId=${encodeURIComponent(sessionId)}`;

        openSignInWindow(googleAuthUrl, 'Google Login');
    };

    useEffect(() => {
        console.log('Redux user:', user);
    }, []);

    return (
        <div>
            {user && user.name ? (
                <div className="flex items-center space-x-2 hover:bg-black hover:text-white !hover:bg-textBlueLight !hover:text-white">
                    <span className="text-base font-light text-gray-800">
                        {user.name}
                    </span>
                </div>
            ) : (
                <button
                    className="flex justify-center items-center px-6 py-1 space-x-2 w-full rounded text-black hover:bg-red hover:text-white md:px-2 md:py-2"
                    onClick={handleLoginGoogle} 
                >
                    <span className="text-base font-bold">
                        {locale=="en" ? "Login" : "Đăng nhập"}
                    </span>
                    <Image
                        src={Images.google}
                        width={15}
                        height={15}
                        alt="google.png"
                        className='w-5 h-5 object-cover'
                    />
                </button>
            )}
        </div>
    );
}