import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  FileCheck2,
  DollarSign,
  Plane,
  Home
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, getDaysRemaining } from '@/lib/utils';
import { MOCK_SCHOLARSHIPS } from '@/lib/data/mock-db';

export default function ScholarshipDetailPage({ params }: { params: { slug: string } }) {
  const scholarship = MOCK_SCHOLARSHIPS.find((s) => s.slug === params.slug) || MOCK_SCHOLARSHIPS[0];
  const deadlineInfo = getDaysRemaining(scholarship.deadline);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <Link href="/scholarships" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-950 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Scholarships
      </Link>

      <div className="bg-white border border-navy-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="success">🌟 Fully Funded</Badge>
          <Badge variant="purple">{scholarship.degree_levels.join(', ')}</Badge>
          <Badge variant="default">Verified Official Source</Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 mb-2">
          {scholarship.name}
        </h1>

        <p className="text-sm font-bold text-navy-600 mb-6">
          Provider: <span className="text-navy-900">{scholarship.provider}</span>
        </p>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-brand-50/70 border border-brand-100 rounded-2xl mb-6">
          {scholarship.tuition_coverage && (
            <div className="flex items-center gap-2.5 text-xs text-brand-950 font-semibold">
              <DollarSign className="w-4 h-4 text-brand-600 shrink-0" />
              <span>100% Tuition Waiver</span>
            </div>
          )}
          {scholarship.living_allowance && (
            <div className="flex items-center gap-2.5 text-xs text-brand-950 font-semibold">
              <Home className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Monthly Living Stipend</span>
            </div>
          )}
          {scholarship.travel_support && (
            <div className="flex items-center gap-2.5 text-xs text-brand-950 font-semibold">
              <Plane className="w-4 h-4 text-brand-600 shrink-0" />
              <span>International Return Flights</span>
            </div>
          )}
        </div>

        {/* Application CTA */}
        <div className="pt-6 border-t border-navy-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-navy-500">Deadline: </span>
            <span className="font-bold text-navy-900">{formatDate(scholarship.deadline)} ({deadlineInfo.text})</span>
          </div>

          <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md" className="gap-2">
              Apply on Official Website <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Description & Eligibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-navy-950">About the Award</h3>
            <p className="text-sm text-navy-700 leading-relaxed">
              {scholarship.description}
            </p>

            <h3 className="font-bold text-lg text-navy-950 pt-4">Eligibility Requirements</h3>
            <ul className="space-y-3">
              {scholarship.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Source Verification Registry */}
        <div className="space-y-6">
          <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Source Verification
            </div>
            <div className="text-xs text-navy-600">
              <div className="font-semibold text-navy-900 mb-1">{scholarship.source_name}</div>
              <p className="mb-3">This opportunity was manually checked against the official portal.</p>
              <a href={scholarship.source_url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                Official Portal Link <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
