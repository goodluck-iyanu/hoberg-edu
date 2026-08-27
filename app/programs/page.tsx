import React from 'react';
import { BookOpen, Filter } from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { MOCK_PROGRAMS } from '@/lib/data/mock-db';

export default function ProgramsPage({
  searchParams,
}: {
  searchParams: { q?: string; country?: string; degree?: string };
}) {
  const query = (searchParams.q || '').toLowerCase();
  const country = searchParams.country || '';
  const degree = searchParams.degree || '';

  const filteredPrograms = MOCK_PROGRAMS.filter((p) => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.field.toLowerCase().includes(query) || (p.university_name && p.university_name.toLowerCase().includes(query));
    const matchesCountry = !country || (p.university_country && p.university_country.toLowerCase() === country.toLowerCase());
    const matchesDegree = !degree || p.degree_level === degree;
    return matchesQuery && matchesCountry && matchesDegree;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" /> Academic Opportunities
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">
          International Academic Programs
        </h1>
        <p className="text-sm text-navy-600 mt-1">
          Explore Bachelor&apos;s, Master&apos;s, and PhD programs from accredited global universities with verified application requirements.
        </p>
      </div>

      <SearchBar initialQuery={searchParams.q} initialCountry={searchParams.country} initialDegree={searchParams.degree} />

      <div className="flex items-center justify-between text-xs text-navy-500 font-medium">
        <span>Showing <strong>{filteredPrograms.length}</strong> academic programs</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <OpportunityCard key={program.id} type="program" data={program} />
        ))}
      </div>
    </div>
  );
}
