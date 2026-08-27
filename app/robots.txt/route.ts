import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hobergedu.com';

  const content = `User-agent: *
Allow: /
Allow: /universities
Allow: /programs
Allow: /scholarships
Allow: /countries
Allow: /premium

Disallow: /dashboard
Disallow: /profile
Disallow: /applications
Disallow: /saved
Disallow: /notifications
Disallow: /settings
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
