import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Globe2, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_UNIVERSITIES } from '@/lib/data/mock-db';

export default function UniversitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Globe2 className="w-4 h-4" /> Global Directory
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">
          World-Class Universities
        </h1>
        <p className="text-sm text-navy-600 mt-1">
          Accredited international universities with dedicated international student offices and scholarships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_UNIVERSITIES.map((uni) => (
          <div key={uni.id} className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <Badge variant="default">{uni.country}</Badge>
                <span className="text-xs text-navy-500 font-medium">{uni.city}</span>
              </div>

              <Link href={`/universities/${uni.slug}`} className="block group-hover:text-brand-600 transition-colors">
                <h3 className="font-bold text-xl text-navy-950 mb-2">
                  {uni.name}
                </h3>
              </Link>

              <p className="text-sm text-navy-600 line-clamp-3 mb-6">
                {uni.description}
              </p>
            </div>

            <div className="pt-4 border-t border-navy-100 flex items-center justify-between">
              <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-navy-500 hover:text-navy-900 flex items-center gap-1">
                Official Website <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link href={`/universities/${uni.slug}`}>
                <Button variant="primary" size="sm" className="gap-1.5">
                  View Programs <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
