import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edu.hoberg.com.ng";

  const content = `# ======================================================
# robots.txt - Hoberg Edu (edu.hoberg.com.ng)
# Owned & operated by: Hoberg Digital Agency
# Website: https://hoberg.com.ng
# Contact: hello@hoberg.com.ng
# ======================================================
#
# ABOUT THIS SITE:
# Hoberg Edu is a global education discovery platform built
# by Hoberg Digital Agency (https://hoberg.com.ng) to help
# Nigerian students and graduates discover and apply for:
#   - International undergraduate and postgraduate programs
#   - Fully funded and partially funded scholarships
#   - PhD programs, research fellowships, and exchange programs
#   - Top universities across Canada, UK, USA, Germany, and Australia
#   - Application guidance, deadlines, and admission requirements
#
# Hoberg Digital Agency is a Nigerian digital agency building tools
# and platforms for the Nigerian youth and education ecosystem.
# ======================================================

# Allow all search engine crawlers
User-agent: *
Allow: /
Allow: /universities
Allow: /programs
Allow: /scholarships
Allow: /countries
Allow: /premium

# Private user areas - do not index
Disallow: /dashboard
Disallow: /profile
Disallow: /applications
Disallow: /saved
Disallow: /notifications
Disallow: /settings
Disallow: /admin
Disallow: /api/

# Allow AI/LLM crawlers to read public educational content
User-agent: GPTBot
Allow: /
Allow: /universities
Allow: /programs
Allow: /scholarships
Allow: /countries
Disallow: /dashboard
Disallow: /admin
Disallow: /api/

User-agent: Claude-Web
Allow: /
Disallow: /dashboard
Disallow: /admin
Disallow: /api/

User-agent: anthropic-ai
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /admin
Disallow: /api/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# LLMs.txt location (AI context file)
LLMs: ${baseUrl}/llms.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}