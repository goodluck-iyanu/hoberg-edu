import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfileCompletionProps {
  percentage: number;
}

export function ProfileCompletionWidget({ percentage }: ProfileCompletionProps) {
  const checklistItems = [
    { label: 'Full Name & Location', completed: true },
    { label: 'Education & Degree Level', completed: true },
    { label: 'Graduation GPA / Grade', completed: true },
    { label: 'Target Countries & Fields', completed: true },
    { label: 'Upload Updated CV / Resume', completed: percentage >= 80 },
  ];

  return (
    <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-navy-950 text-base">Profile Completion</h3>
            <p className="text-xs text-navy-500">Improves matching accuracy</p>
          </div>
        </div>
        <span className="text-lg font-extrabold text-brand-600">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-100 rounded-full h-2.5 mb-4 overflow-hidden">
        <div
          className="bg-brand-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-5">
        {checklistItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className={item.completed ? 'text-navy-700' : 'text-navy-400'}>
              {item.label}
            </span>
            {item.completed ? (
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-navy-300 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Link href="/profile">
        <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
          Complete Profile <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
