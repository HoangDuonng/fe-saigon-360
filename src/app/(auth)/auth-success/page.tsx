'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { env } from '@/env.mjs';

const AuthSuccessPage = () => {
    const fetchUserInfo = async () => {
        const sessionId = Cookies.get('sessionId') || 'default-session-id';
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/google?sessionId=${encodeURIComponent(sessionId)}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            console.log("ANH VAN DAT TRAI TIM LEN BAN", response);

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const data = await response.json();
            console.log('User data:', data);
        } catch (error) {
            console.error('Error during Google login:', error);
        } finally {
            window.close();
        }
    };
    useEffect(() => {   
        fetchUserInfo();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'Arial, sans-serif',
            }}>
            <p>Logging you in...</p>
        </div>
    );
};

export default AuthSuccessPage;


