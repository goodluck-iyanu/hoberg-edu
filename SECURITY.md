# Security Policy & Architecture - Hoberg Edu

1. **Authentication & Authorization**: Supabase Auth SSR + Row Level Security (RLS) on all private user tables.
2. **Server-Side Secrets**: Service-role keys and Paystack secret keys never exposed to client.
3. **Paystack Webhook Verification**: Cryptographic HMAC SHA-512 signature validation on every event.
4. **Private Storage**: User CVs are strictly stored in private Supabase buckets.
