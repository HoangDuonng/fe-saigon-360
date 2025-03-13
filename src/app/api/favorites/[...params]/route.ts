import axiosClient from '@/helpers/call-apis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { params: string[] } }) {
    if (!params.params || params.params.length < 1 || params.params.length > 2) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const [userId, destinationId] = params.params;

    try {
        if (destinationId) {
            // Kiểm tra nếu địa điểm đã được yêu thích
            const response = await axiosClient.get(`/api/favorites/${userId}/${destinationId}`);
            return NextResponse.json(response.data, { status: response.status });
        } else {
            // Lấy danh sách yêu thích của user
            const response = await axiosClient.get(`/api/favorites/${userId}`);
            return NextResponse.json(response.data, { status: response.status });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch favorites" }, { status: error?.response?.status || 500 });
    }
}
export async function POST(req: NextRequest, { params }: { params: { params: string[] } }) {
    if (!params.params || params.params.length !== 2) {
        return NextResponse.json({ error: "User ID and Destination ID are required" }, { status: 400 });
    }

    const [userId, destinationId] = params.params;

    try {
        const response = await axiosClient.post(`/api/favorites/${userId}/${destinationId}`);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to add favorite" }, { status: error?.response?.status || 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { params: string[] } }) {
    if (!params.params || params.params.length !== 2) {
        return NextResponse.json({ error: "User ID and Destination ID are required" }, { status: 400 });
    }

    const [userId, destinationId] = params.params;

    try {
        const response = await axiosClient.delete(`/api/favorites/${userId}/${destinationId}`);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete favorite" }, { status: error?.response?.status || 500 });
    }
}

