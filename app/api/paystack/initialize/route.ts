import { NextResponse } from 'next/server';
import { initializePaystackPayment } from '@/lib/paystack/client';
import { checkRateLimit } from '@/lib/security/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(ip, 10, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ status: false, message: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const result = await initializePaystackPayment({
      email: body.email || 'student@hobergedu.com',
      amount: 500000, // ₦5,000
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: false, message: 'Payment initialization failed' }, { status: 500 });
  }
}
