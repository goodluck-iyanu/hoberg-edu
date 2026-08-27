import React from 'react';
import { Award, Plus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_SCHOLARSHIPS } from '@/lib/data/mock-db';

export default function AdminScholarshipsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-950">Scholarship Review & Verification</h1>
        <Button variant="primary" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> New Opportunity</Button>
      </div>

      <div className="bg-white border border-navy-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 border-b border-navy-200 text-xs font-semibold text-navy-700 uppercase">
            <tr>
              <th className="p-4">Scholarship</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Funding</th>
              <th className="p-4">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {MOCK_SCHOLARSHIPS.map((s) => (
              <tr key={s.id}>
                <td className="p-4 font-bold text-navy-950">{s.name}</td>
                <td className="p-4 text-navy-600">{s.provider}</td>
                <td className="p-4"><Badge variant="success">Fully Funded</Badge></td>
                <td className="p-4"><Badge variant="info">Verified Source</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
