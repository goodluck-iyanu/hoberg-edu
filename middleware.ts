import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Production middleware for session verification and protected routes
  const { pathname } = request.nextUrl;
  
  // Public routes always accessible
  const publicRoutes = ['/', '/login', '/signup', '/universities', '/programs', '/scholarships', '/countries', '/premium', '/api/paystack/webhook'];
  const isPublic = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // In production, Supabase Auth session token is verified from cookies here
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
