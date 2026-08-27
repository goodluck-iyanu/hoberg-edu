export interface InitializePaymentParams {
  email: string;
  amount: number;
  plan?: string;
  metadata?: Record<string, any>;
  callbackUrl?: string;
}

export async function initializePaystackPayment(params: InitializePaymentParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || secretKey.startsWith('sk_test_placeholder')) {
    return {
      status: true,
      message: 'Authorization URL created (Local Sandbox Mock)',
      data: {
        authorization_url: `/dashboard?payment=success&ref=MOCK_${Date.now()}`,
        access_code: `mock_code_${Date.now()}`,
        reference: `MOCK_${Date.now()}`,
      }
    };
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      plan: params.plan || process.env.PAYSTACK_PREMIUM_PLAN_CODE,
      callback_url: params.callbackUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      metadata: params.metadata,
    }),
  });

  return await response.json();
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || secretKey.startsWith('sk_test_placeholder')) {
    return { status: true, data: { status: 'success', reference, amount: 500000 } };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  return await response.json();
}
