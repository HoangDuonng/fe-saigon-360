import { NextRequest, NextResponse } from 'next/server';
import axiosApis from '@/helpers/call-apis';

export async function GET(req: NextRequest, context: { params: { id: string; locale: string } }) {
    const { id, locale } = context.params;

    if (!['en', 'vi'].includes(locale)) {
        return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    try {
        const response = await axiosApis.get(`/api/destinations/${id}?lang=${locale}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching destination details:', error);
        return NextResponse.json({ error: 'Failed to fetch destination details' }, { status: 500 });
    }
}
