import { NextResponse } from 'next/server';
import { verifyPaystackSignature } from '@/lib/paystack/webhook';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-paystack-signature');
    const rawBody = await request.text();

    // Verify HMAC SHA512 signature in production
    const isLocal = !process.env.PAYSTACK_WEBHOOK_SECRET;
    if (!isLocal && !verifyPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle Paystack subscription events
    if (event.event === 'charge.success' || event.event === 'subscription.create') {
      // In production: Server updates public.premium_memberships and records payment
      console.log('[Paystack Webhook] Successfully processed event:', event.event);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
