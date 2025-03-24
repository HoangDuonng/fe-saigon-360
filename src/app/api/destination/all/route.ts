import { NextRequest, NextResponse } from 'next/server';
import axiosApis from '@/helpers/call-apis';

export async function GET(req: NextRequest) {
    try {
        // Gọi API từ Spring Boot
        const response = await axiosApis.get('/api/destinations/all');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching all destinations:', error);
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
    }
}
