import React from 'react';
import Link from 'next/link';
import { 
  Globe2, 
  Award, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Crown,
  ChevronRight
} from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PROGRAMS, MOCK_SCHOLARSHIPS, MOCK_COUNTRIES } from '@/lib/data/mock-db';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* GREEN BADGE PRESERVED AS REQUESTED */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>For Nigerian Students & Graduates Pursuing Global Degrees</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.15]">
              Find your next opportunity to <span className="text-[#dc2626]">study abroad</span>.
            </h1>

            <p className="text-base sm:text-lg text-navy-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Discover verified international universities, academic programs, deadlines, requirements, and fully funded scholarships tailored to your academic background.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/scholarships">
                <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-brand-500/20">
                  <Award className="w-5 h-5" /> Find Scholarships
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" /> Explore Programs
                </Button>
              </Link>
              <Link href="/universities">
                <Button variant="ghost" size="lg" className="gap-2 text-navy-700">
                  <Globe2 className="w-5 h-5" /> Top Universities
                </Button>
              </Link>
            </div>

            {/* Live Search Bar */}
            <div className="pt-6 max-w-4xl mx-auto">
              <SearchBar />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-navy-500 pt-4 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" /> 100% Verified Official Sources
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" /> Real-time Application Deadlines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" /> Zero Application Scams
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED SCHOLARSHIPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" /> Funding Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              High-Value & Fully Funded Scholarships
            </h2>
            <p className="text-sm text-navy-600 mt-1">
              Curated prestigious scholarships covering full tuition, living stipends, and travel.
            </p>
          </div>
          <Link href="/scholarships">
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
              View All Scholarships <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SCHOLARSHIPS.map((scholarship) => (
            <OpportunityCard key={scholarship.id} type="scholarship" data={scholarship} />
          ))}
        </div>
      </section>

      {/* 3. BROWSE BY DESTINATION COUNTRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4" /> Study Destinations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Explore by Country
            </h2>
            <p className="text-sm text-navy-600 mt-1">
              Understand post-study work permits, visa regulations, and top research institutions.
            </p>
          </div>
          <Link href="/countries">
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
              All Countries <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COUNTRIES.map((c) => (
            <Link
              key={c.name}
              href={`/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white border border-navy-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{c.flag}</span>
                  <Badge variant="default">{c.count}+ Opportunities</Badge>
                </div>
                <h3 className="font-bold text-lg text-navy-950 group-hover:text-brand-600 transition-colors mb-1.5">
                  {c.name}
                </h3>
                <p className="text-xs text-navy-600 leading-relaxed mb-4">
                  {c.description}
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                <span>Browse Opportunities</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR DEGREE PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> Degree Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Featured Academic Programs
            </h2>
            <p className="text-sm text-navy-600 mt-1">
              Top international Master&apos;s and undergraduate programs accepting applications.
            </p>
          </div>
          <Link href="/programs">
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
              Explore All Programs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PROGRAMS.map((program) => (
            <OpportunityCard key={program.id} type="program" data={program} />
          ))}
        </div>
      </section>

      {/* 5. PREMIUM SHOWCASE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-navy-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/20 text-gold-300 rounded-full text-xs font-semibold border border-gold-400/30">
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span>Hoberg Edu Premium — ₦5,000 / month</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Unlock Deep Profile Matching & Application Guidance
            </h2>

            <p className="text-sm sm:text-base text-navy-300 leading-relaxed">
              Get intelligent profile-to-scholarship match scoring (0–100%), priority deadline alerts, customized document checklists, and tailored opportunity breakdowns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-navy-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Personalized Match Scores</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Curated High-Value Funding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Application Tracker & Checklist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Zero False Guarantees</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/premium">
                <Button variant="gold" size="lg" className="gap-2">
                  <Crown className="w-4 h-4" /> Learn About Premium
                </Button>
              </Link>
              <span className="text-xs text-navy-400">Cancel anytime with Paystack.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
