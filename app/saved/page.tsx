import React from 'react';
import { Bookmark } from 'lucide-react';
import { OpportunityCard } from '@/components/discovery/OpportunityCard';
import { MOCK_PROGRAMS, MOCK_SCHOLARSHIPS } from '@/lib/data/mock-db';

export default function SavedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Bookmark className="w-4 h-4" /> Bookmarks
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">My Saved Opportunities</h1>
        <p className="text-sm text-navy-600 mt-1">Easily reference and track deadlines for opportunities you&apos;ve shortlisted.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OpportunityCard type="scholarship" data={MOCK_SCHOLARSHIPS[0]} />
        <OpportunityCard type="program" data={MOCK_PROGRAMS[0]} />
      </div>
    </div>
  );
}
