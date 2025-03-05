import { NextRequest, NextResponse } from 'next/server';
import axiosApis from '@/helpers/call-apis';
import axiosFe from '@/helpers/call-fe';

export async function GET(req: NextRequest, context: { params: { locale: string } }) {
    const { locale } = context.params; 

    if (!['en', 'vi'].includes(locale)) {
        return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    try {
        const response = await axiosFe.get(`/api/destinations?lang=${locale}`); 
        return NextResponse.json(response.data); 
    } catch (error) {
        console.error('Error fetching menu:', error);
        return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 });
    }
}
