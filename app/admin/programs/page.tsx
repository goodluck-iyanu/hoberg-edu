import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PROGRAMS } from '@/lib/data/mock-db';

export default function AdminProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-950">Academic Programs Management</h1>
        <Button variant="primary" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add Program</Button>
      </div>

      <div className="bg-white border border-navy-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 border-b border-navy-200 text-xs font-semibold text-navy-700 uppercase">
            <tr>
              <th className="p-4">Program</th>
              <th className="p-4">Degree</th>
              <th className="p-4">Field</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {MOCK_PROGRAMS.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-bold text-navy-950">{p.name}</td>
                <td className="p-4 text-navy-600">{p.degree_level}</td>
                <td className="p-4 text-navy-600">{p.field}</td>
                <td className="p-4"><Badge variant="success">Published</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
