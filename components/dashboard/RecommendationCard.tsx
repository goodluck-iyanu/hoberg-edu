import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MatchScoreResult } from '@/types';

interface RecommendationCardProps {
  title: string;
  institution: string;
  country: string;
  degree: string;
  slug: string;
  type: 'program' | 'scholarship';
  match: MatchScoreResult;
}

export function RecommendationCard({ title, institution, country, degree, slug, type, match }: RecommendationCardProps) {
  const getBadgeVariant = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 65) return 'info';
    return 'warning';
  };

  return (
    <div className="bg-white border border-brand-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-0" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <Badge variant={getBadgeVariant(match.score)} size="md" className="gap-1 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" /> {match.score}% Profile Match
          </Badge>
          <span className="text-xs text-navy-400 font-medium">{degree}</span>
        </div>

        <Link href={`/${type === 'program' ? 'programs' : 'scholarships'}/${slug}`}>
          <h4 className="font-bold text-navy-950 hover:text-brand-600 transition-colors line-clamp-2 mb-1">
            {title}
          </h4>
        </Link>

        <p className="text-xs text-navy-600 font-medium mb-3">
          {institution} • {country}
        </p>

        {/* Why this matches rationale */}
        <div className="bg-brand-50/70 border border-brand-100 rounded-xl p-3 mb-4 text-xs text-navy-800 space-y-1.5">
          <div className="font-semibold text-brand-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-brand-600" /> Why this was matched
          </div>
          {match.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-navy-700 leading-snug">
              <span className="text-brand-500 font-bold">•</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-navy-100 flex items-center justify-between">
        <span className="text-[11px] text-navy-400 italic">Not a guarantee of admission</span>
        <Link href={`/${type === 'program' ? 'programs' : 'scholarships'}/${slug}`}>
          <Button variant="primary" size="sm" className="gap-1 text-xs">
            Review <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
