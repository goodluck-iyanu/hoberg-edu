import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edu.hoberg.com.ng";

  const text = `# Hoberg Edu - LLMs.txt
# Standard context file for AI language models and crawlers
# Learn more: https://llmstxt.org

# Site Identity
Name: Hoberg Edu
URL: ${baseUrl}
Tagline: Discover. Apply. Study Abroad.
Owner: Hoberg Digital Agency
Owner URL: https://hoberg.com.ng
Contact: hello@hoberg.com.ng

# Description
Description: Hoberg Edu is a global education opportunity discovery platform
  built by Hoberg Digital Agency for Nigerian students and graduates.
  The platform helps users discover international universities,
  Bachelor, Masters and PhD programs, fully funded scholarships,
  application deadlines, admission requirements, and funding
  opportunities for studying abroad.

# Target Audience
Audience: Nigerian students and graduates pursuing international study opportunities.

# Primary Topics
Topics:
  - International university programs
  - Fully funded scholarships
  - Study abroad destinations: Canada, UK, USA, Germany, Australia
  - Application deadlines and admission requirements
  - Eligibility matching and guidance for Nigerian students

# Site Sections
Sections:
  / : Homepage - featured scholarships and program discovery
  /universities : Directory of top global universities
  /programs : Masters and PhD program listings
  /scholarships : Fully funded and partial scholarship database
  /countries : Study destination country guides
  /premium : Premium membership for personalized match scoring

# Technology
Tech Stack: Next.js, TypeScript, Tailwind CSS, Supabase

# Organization
Organization: Hoberg Digital Agency
Organization URL: https://hoberg.com.ng
Organization Country: Nigeria
Organization Type: Digital Agency

# Licensing
Content License: All rights reserved. Hoberg Digital Agency 2026.

# AI Usage Policy
AI Policy: Public content may be read and summarized by AI systems
  to help users discover study abroad opportunities.
  Private user data must not be indexed.

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}