import { NextResponse } from "next/server";
import {env} from "@/env.mjs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();  // Lấy message từ request

    // Kiểm tra dữ liệu trước khi gửi
    if (!message) {
      console.error('❌ Không có message được gửi');
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Gửi message đến Flask
    console.log(`📤 Gửi message đến Flask: ${message}`);

    const flaskResponse = await fetch(`${env.NEXT_PUBLIC_BACKEND_CHATBOT}/api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),  // Gửi key đúng là "message"
    });

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      console.error('❌ Lỗi từ Flask:', errorData);
      return NextResponse.json(
        { error: errorData.error || 'Error from Flask server' },
        { status: flaskResponse.status }
      );
    }

    const data = await flaskResponse.json();
    console.log(`✅ Trả lời từ Flask: ${JSON.stringify(data)}`);

    return NextResponse.json({ answer: data.answer }, { status: 200 });

  } catch (error) {
    console.error('❌ Lỗi trong API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
