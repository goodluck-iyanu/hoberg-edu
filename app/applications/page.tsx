import React from 'react';
import Link from 'next/link';
import { FileText, Plus, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ApplicationStatusBadge } from '@/components/applications/ApplicationStatusBadge';
import { MOCK_APPLICATIONS } from '@/lib/data/mock-db';

export default function ApplicationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" /> Application Tracker
          </div>
          <h1 className="text-3xl font-extrabold text-navy-950">My Study Applications</h1>
          <p className="text-sm text-navy-600 mt-1">Track requirements, deadlines, and document checklists across all your university and scholarship applications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <ApplicationStatusBadge status={app.status} />
                <span className="text-xs text-navy-500 font-medium">Deadline: Dec 1, 2026</span>
              </div>
              <h3 className="font-bold text-lg text-navy-950 mb-1">{app.opportunity_title}</h3>
              <p className="text-xs text-navy-500 font-semibold mb-3">{app.institution_name}</p>
              <p className="text-xs text-navy-600 italic bg-navy-50/70 p-2.5 rounded-lg">{app.notes}</p>
            </div>

            <div className="pt-4 border-t border-navy-100 flex items-center justify-between">
              <span className="text-xs text-navy-500 font-medium">
                {app.checklist?.filter(c => c.is_completed).length} / {app.checklist?.length} Documents Ready
              </span>
              <Link href={`/applications/${app.id}`}>
                <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                  Manage Checklist <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
