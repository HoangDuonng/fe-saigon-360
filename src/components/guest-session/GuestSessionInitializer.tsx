"use client";

import { useEffect } from 'react';
import { getOrCreateGuestSession } from '@/services/guestSessionService';

export default function GuestSessionInitializer() {
    useEffect(() => {
        getOrCreateGuestSession();
    }, []);

    return null; // không render gì hết
}