import axios from 'axios';
import axiosClient from '@/helpers/call-apis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await axiosClient.post('/api/logout', null, {
            headers: {
                Authorization: authorization,
            },
        });

        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: 'Error during logout process.',
                    details: error.response?.data || null,
                },
                { status: error.response?.status || 500 }
            );
        } else {
            return NextResponse.json(
                {
                    message: 'An unexpected error occurred.',
                },
                { status: 500 }
            );
        }
    }
}