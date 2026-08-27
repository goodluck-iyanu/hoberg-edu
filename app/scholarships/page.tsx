import React from 'react';
import { Award } from 'lucide-react';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { MOCK_SCHOLARSHIPS } from '@/lib/data/mock-db';

export default function ScholarshipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" /> Global Financial Aid
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">
          Fully & Partially Funded Scholarships
        </h1>
        <p className="text-sm text-navy-600 mt-1">
          Discover verified government and university scholarships open to Nigerian students with official source links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_SCHOLARSHIPS.map((scholarship) => (
          <OpportunityCard key={scholarship.id} type="scholarship" data={scholarship} />
        ))}
      </div>
    </div>
  );
}
