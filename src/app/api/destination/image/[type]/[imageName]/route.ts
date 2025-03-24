import { NextResponse } from 'next/server';
import axios from 'axios';
import { env } from '@/env.mjs';

export async function GET(
  request: Request,
  { params }: { params: { type: string; imageName: string } }
) {
  try {
    const { type, imageName } = params;

    if (!type || !imageName) {
      return NextResponse.json({ message: 'Type and Image name are required.' }, { status: 400 });
    }

    const backendUrl = `${env.NEXT_PUBLIC_BACKEND_DOMAIN}/images/destination/${type}/${imageName}`;
    const response = await axios.get(backendUrl, {
      responseType: 'arraybuffer',
    });

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': response.headers['content-type'] || 'image/jpeg',
        'Content-Disposition': 'inline',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching image from backend:', error);
    return NextResponse.json({ message: 'Error fetching image.' }, { status: 500 });
  }
}
