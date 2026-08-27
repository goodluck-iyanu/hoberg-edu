'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getDaysRemaining, formatCurrency } from '@/lib/utils';
import { AcademicProgram, Scholarship } from '@/types';

interface ProgramCardProps {
  type: 'program';
  data: AcademicProgram;
}

interface ScholarshipCardProps {
  type: 'scholarship';
  data: Scholarship;
}

export type OpportunityCardProps = ProgramCardProps | ScholarshipCardProps;

export function OpportunityCard(props: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (props.type === 'program') {
    const { data } = props;
    const deadlineInfo = getDaysRemaining(data.deadline);

    return (
      <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="default">{data.degree_level}</Badge>
              <Badge variant="info">{data.field}</Badge>
              {data.is_featured && <Badge variant="gold">⭐ Featured</Badge>}
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? 'text-brand-600 bg-brand-50' : 'text-navy-400 hover:text-navy-700 hover:bg-navy-50'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save opportunity'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-brand-600' : ''}`} />
            </button>
          </div>

          <Link href={`/programs/${data.slug}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-lg text-navy-950 line-clamp-2 mb-1.5">
              {data.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-sm font-medium text-navy-600 mb-4">
            <Building2 className="w-4 h-4 text-navy-400 shrink-0" />
            <span>{data.university_name || 'Partner University'}</span>
            {data.university_country && (
              <>
                <span className="text-navy-300">•</span>
                <span className="text-navy-500">{data.university_country}</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-navy-600 bg-navy-50/60 p-3 rounded-xl mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-navy-400" />
              <span>Intake: <strong>{data.intake}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-navy-400" />
              <span>Tuition: <strong>{data.tuition_amount ? formatCurrency(data.tuition_amount, data.tuition_currency) : 'Check Source'}</strong></span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-navy-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-navy-500">Deadline: </span>
            <span className={`font-semibold ${deadlineInfo.isClosingSoon ? 'text-amber-600' : 'text-navy-800'}`}>
              {deadlineInfo.text}
            </span>
          </div>

          <Link href={`/programs/${data.slug}`}>
            <Button variant="primary" size="sm" className="gap-1.5">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { data } = props;
  const deadlineInfo = getDaysRemaining(data.deadline);

  return (
    <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 to-gold-500" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={data.funding_type === 'fully_funded' ? 'success' : 'info'}>
              {data.funding_type === 'fully_funded' ? '🌟 Fully Funded' : 'Partially Funded'}
            </Badge>
            <Badge variant="purple">{data.degree_levels.join(', ')}</Badge>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-lg transition-colors ${
              isSaved ? 'text-brand-600 bg-brand-50' : 'text-navy-400 hover:text-navy-700 hover:bg-navy-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save scholarship'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-brand-600' : ''}`} />
          </button>
        </div>

        <Link href={`/scholarships/${data.slug}`} className="block group-hover:text-brand-600 transition-colors">
          <h3 className="font-bold text-lg text-navy-950 line-clamp-2 mb-1.5">
            {data.name}
          </h3>
        </Link>

        <p className="text-xs font-semibold text-navy-500 mb-3 uppercase tracking-wider">
          Provider: {data.provider}
        </p>

        <p className="text-sm text-navy-600 line-clamp-2 mb-4">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium text-navy-700">
          {data.tuition_coverage && (
            <span className="flex items-center gap-1 text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tuition
            </span>
          )}
          {data.living_allowance && (
            <span className="flex items-center gap-1 text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> Living Allowance
            </span>
          )}
          {data.travel_support && (
            <span className="flex items-center gap-1 text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> Flight Tickets
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-navy-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs text-navy-500">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Verified Source</span>
        </div>

        <Link href={`/scholarships/${data.slug}`}>
          <Button variant="primary" size="sm" className="gap-1.5">
            Details & Apply <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
