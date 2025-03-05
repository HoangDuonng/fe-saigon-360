import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
    const { sessionId } = params;

    if (!sessionId) {
        return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    try {
        const backendResponse = await fetch(`${env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/google?sessionId=${encodeURIComponent(sessionId)}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: req.headers.get('cookie') || '',
            },
        });

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        console.error('Error proxying request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
