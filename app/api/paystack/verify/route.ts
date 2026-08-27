import { NextResponse } from 'next/server';
import { verifyPaystackTransaction } from '@/lib/paystack/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  const result = await verifyPaystackTransaction(reference);
  return NextResponse.json(result);
}
