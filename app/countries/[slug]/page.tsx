import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe2, BookOpen } from 'lucide-react';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { MOCK_PROGRAMS, MOCK_COUNTRIES } from '@/lib/data/mock-db';

export default function CountryDetailPage({ params }: { params: { slug: string } }) {
  const countryName = params.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const countryInfo = MOCK_COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase()) || MOCK_COUNTRIES[0];
  const programs = MOCK_PROGRAMS.filter(p => p.university_country?.toLowerCase() === countryInfo.name.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/countries" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-950 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Destinations
      </Link>

      <div className="bg-white border border-navy-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{countryInfo.flag}</span>
          <h1 className="text-3xl font-black text-navy-950">Study in {countryInfo.name}</h1>
        </div>
        <p className="text-sm sm:text-base text-navy-700 leading-relaxed max-w-3xl">
          {countryInfo.description}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600" /> Featured Programs in {countryInfo.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <OpportunityCard key={p.id} type="program" data={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
