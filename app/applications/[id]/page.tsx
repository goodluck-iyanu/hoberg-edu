'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, FileText, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ApplicationStatusBadge } from '@/components/applications/ApplicationStatusBadge';
import { MOCK_APPLICATIONS } from '@/lib/data/mock-db';

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const app = MOCK_APPLICATIONS.find(a => a.id === params.id) || MOCK_APPLICATIONS[0];
  const [checklist, setChecklist] = useState(app.checklist || []);

  const toggleCheck = (idx: number) => {
    const updated = [...checklist];
    updated[idx].is_completed = !updated[idx].is_completed;
    setChecklist(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-950 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Applications
      </Link>

      <div className="bg-white border border-navy-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <ApplicationStatusBadge status={app.status} />
            <h1 className="text-2xl font-black text-navy-950 mt-2">{app.opportunity_title}</h1>
            <p className="text-sm font-bold text-navy-600">{app.institution_name}</p>
          </div>
        </div>

        {/* Customizable Checklist */}
        <div className="space-y-4 pt-6 border-t border-navy-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy-950 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" /> Required Documents & Checklist
            </h3>
          </div>

          <div className="space-y-2">
            {checklist.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(idx)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-navy-100 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.is_completed ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-navy-300 shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${item.is_completed ? 'line-through text-navy-400' : 'text-navy-900'}`}>
                    {item.document_type}
                  </span>
                </div>
                <span className="text-xs font-semibold text-navy-400">
                  {item.is_completed ? 'Ready' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
