import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatCurrency, getDaysRemaining } from '@/lib/utils';
import { MOCK_PROGRAMS, MOCK_UNIVERSITIES } from '@/lib/data/mock-db';

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = MOCK_PROGRAMS.find((p) => p.slug === params.slug) || MOCK_PROGRAMS[0];
  const university = MOCK_UNIVERSITIES.find((u) => u.id === program.university_id) || MOCK_UNIVERSITIES[0];
  const deadlineInfo = getDaysRemaining(program.deadline);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <Link href="/programs" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-950 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Programs
      </Link>

      {/* Main Header Card */}
      <div className="bg-white border border-navy-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="default">{program.degree_level}</Badge>
          <Badge variant="info">{program.field}</Badge>
          {deadlineInfo.isClosingSoon && <Badge variant="warning">⏳ Closing Soon</Badge>}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 mb-3">
          {program.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-navy-600 font-medium mb-6">
          <Link href={`/universities/${university.slug}`} className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
            <Building2 className="w-4 h-4 text-navy-400" />
            <span className="font-bold text-navy-900">{university.name}</span>
          </Link>
          <span className="flex items-center gap-1 text-navy-500">
            <MapPin className="w-4 h-4 text-navy-400" />
            <span>{university.city}, {university.country}</span>
          </span>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-navy-50/70 rounded-2xl text-xs text-navy-700">
          <div>
            <div className="text-navy-400 font-medium mb-0.5">Duration</div>
            <div className="font-bold text-navy-900 text-sm">{program.duration}</div>
          </div>
          <div>
            <div className="text-navy-400 font-medium mb-0.5">Intake</div>
            <div className="font-bold text-navy-900 text-sm">{program.intake}</div>
          </div>
          <div>
            <div className="text-navy-400 font-medium mb-0.5">Tuition Estimate</div>
            <div className="font-bold text-navy-900 text-sm">
              {program.tuition_amount ? formatCurrency(program.tuition_amount, program.tuition_currency) : 'Check Source'}
            </div>
          </div>
          <div>
            <div className="text-navy-400 font-medium mb-0.5">Application Deadline</div>
            <div className={`font-bold text-sm ${deadlineInfo.isClosingSoon ? 'text-amber-600' : 'text-navy-900'}`}>
              {formatDate(program.deadline)} ({deadlineInfo.text})
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-6 mt-6 border-t border-navy-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-navy-500">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Last verified on {formatDate(program.last_verified_at)}</span>
          </div>

          <div className="flex items-center gap-3">
            <a href={program.application_url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="gap-2">
                Apply on Official Website <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-navy-950 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-600" /> Admission Requirements
            </h3>
            <ul className="space-y-3">
              {program.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            {program.english_requirements && (
              <div className="pt-4 border-t border-navy-100">
                <h4 className="font-semibold text-xs text-navy-500 uppercase tracking-wider mb-2">
                  Language Proficiency (English)
                </h4>
                <p className="text-sm text-navy-700 bg-slate-50 p-3 rounded-xl border border-navy-100">
                  {program.english_requirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-navy-950 text-sm">About {university.name}</h4>
            <p className="text-xs text-navy-600 leading-relaxed">
              {university.description}
            </p>
            <div className="pt-2">
              <a href={university.admissions_url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                Official Admissions Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
