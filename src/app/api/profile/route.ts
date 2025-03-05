import axios from 'axios';
import axiosClient from '@/helpers/call-apis';
import {NextRequest, NextResponse } from 'next/server';

// Đảm bảo rằng params có kiểu { pid: string }
export async function GET(req: NextRequest) {
    const pid = req.nextUrl.searchParams.get('pid'); 
    console.log('ID received:', pid);

    console.log('ID received:', pid);

    try {
        const response = await axiosClient.get(`/api/users/${pid}`);

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            return NextResponse.json(
                {
                    message: 'Error fetching user data.',
                    details: error.response?.data || null,
                },
                { status: error.response?.status || 500 }
            );
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                {
                    message: 'An unexpected error occurred.',
                },
                { status: 500 }
            );
        }
    }
}
