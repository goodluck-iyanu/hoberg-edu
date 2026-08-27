import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, MapPin, Globe2, ExternalLink, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { MOCK_UNIVERSITIES, MOCK_PROGRAMS } from '@/lib/data/mock-db';

export default function UniversityDetailPage({ params }: { params: { slug: string } }) {
  const university = MOCK_UNIVERSITIES.find((u) => u.slug === params.slug) || MOCK_UNIVERSITIES[0];
  const programs = MOCK_PROGRAMS.filter((p) => p.university_id === university.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/universities" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-950 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Universities
      </Link>

      <div className="bg-white border border-navy-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="default">{university.country}</Badge>
          <span className="flex items-center gap-1 text-xs text-navy-500">
            <MapPin className="w-3.5 h-3.5 text-navy-400" /> {university.city}
          </span>
        </div>

        <h1 className="text-3xl font-black text-navy-950 mb-4">{university.name}</h1>
        <p className="text-sm sm:text-base text-navy-700 leading-relaxed max-w-3xl mb-6">
          {university.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-navy-100">
          <a href={university.website} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              Official Website <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
          <a href={university.admissions_url} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm" className="gap-1.5">
              Admissions Portal <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600" /> Available Programs at {university.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <OpportunityCard key={program.id} type="program" data={program} />
          ))}
        </div>
      </div>
    </div>
  );
}
