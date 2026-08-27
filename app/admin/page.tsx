import React from 'react';
import { LayoutDashboard, Building2, BookOpen, Award, Users, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MOCK_UNIVERSITIES, MOCK_PROGRAMS, MOCK_SCHOLARSHIPS } from '@/lib/data/mock-db';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" /> Admin Operations
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">Platform Analytics & Verification</h1>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-navy-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-1">Total Users</div>
          <div className="text-3xl font-black text-navy-950">1,248</div>
          <div className="text-xs text-brand-600 font-semibold mt-1">+142 this week</div>
        </div>
        <div className="bg-white border border-navy-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-1">Premium Subscribers</div>
          <div className="text-3xl font-black text-gold-600">312</div>
          <div className="text-xs text-navy-500 font-semibold mt-1">₦1,560,000 MRR</div>
        </div>
        <div className="bg-white border border-navy-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-1">Verified Scholarships</div>
          <div className="text-3xl font-black text-brand-600">{MOCK_SCHOLARSHIPS.length}</div>
          <div className="text-xs text-navy-500 font-semibold mt-1">100% official sources</div>
        </div>
        <div className="bg-white border border-navy-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-1">Active Programs</div>
          <div className="text-3xl font-black text-navy-950">{MOCK_PROGRAMS.length}</div>
          <div className="text-xs text-navy-500 font-semibold mt-1">Across 4 countries</div>
        </div>
      </div>

      {/* Verification Workflow Queue */}
      <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-navy-950 text-base flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" /> Scholarship Verification Queue
        </h3>
        <div className="divide-y divide-navy-100 text-sm">
          {MOCK_SCHOLARSHIPS.map((s) => (
            <div key={s.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-navy-950">{s.name}</div>
                <div className="text-xs text-navy-500">{s.provider} • Source: {s.source_name}</div>
              </div>
              <Badge variant="success">Verified & Published</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
