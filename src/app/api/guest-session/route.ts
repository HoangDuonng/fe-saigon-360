import axiosClient from '@/helpers/call-apis';
import axios from 'axios';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const response = await axiosClient.get('/api/guest-session');
        return NextResponse.json({ sessionId: response.data.sessionId });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            return NextResponse.json(
                {
                    message: 'Error fetching guest session ID.',
                    details: error.response?.data || null,
                },
                { status: error.response?.status || 500 }
            );
        } else if (error instanceof Error) {
            console.error('Unexpected error:', error.message);
            return NextResponse.json(
                {
                    message: error.message,
                },
                { status: 500 }
            );
        } else {
            console.error('Unknown error:', error);
            return NextResponse.json(
                {
                    message: 'An unexpected error occurred.',
                },
                { status: 500 }
            );
        }
    }
}