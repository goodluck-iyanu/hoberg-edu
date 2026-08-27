import React from 'react';
import Link from 'next/link';
import { Globe2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MOCK_COUNTRIES } from '@/lib/data/mock-db';

export default function CountriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Globe2 className="w-4 h-4" /> Destination Directory
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">
          Study Destinations for Nigerians
        </h1>
        <p className="text-sm text-navy-600 mt-1">
          Compare international study destinations by tuition affordability, post-graduation work visa rights, and English requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COUNTRIES.map((c) => (
          <Link
            key={c.name}
            href={`/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{c.flag}</span>
                <Badge variant="default">{c.count}+ Opportunities</Badge>
              </div>
              <h3 className="font-bold text-xl text-navy-950 group-hover:text-brand-600 transition-colors mb-2">
                {c.name}
              </h3>
              <p className="text-xs text-navy-600 leading-relaxed mb-6">
                {c.description}
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
              <span>View {c.name} Opportunities</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
