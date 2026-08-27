import { NextResponse } from 'next/server';
import { MOCK_PROGRAMS, MOCK_SCHOLARSHIPS, MOCK_UNIVERSITIES, MOCK_COUNTRIES } from '@/lib/data/mock-db';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hobergedu.com';

  const staticUrls = ['', '/universities', '/programs', '/scholarships', '/countries', '/premium'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>daily</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${MOCK_UNIVERSITIES.map((u) => `<url><loc>${baseUrl}/universities/${u.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('')}
  ${MOCK_PROGRAMS.map((p) => `<url><loc>${baseUrl}/programs/${p.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('')}
  ${MOCK_SCHOLARSHIPS.map((s) => `<url><loc>${baseUrl}/scholarships/${s.slug}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`).join('')}
  ${MOCK_COUNTRIES.map((c) => `<url><loc>${baseUrl}/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
