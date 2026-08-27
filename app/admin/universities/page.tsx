import React from 'react';
import { Building2, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_UNIVERSITIES } from '@/lib/data/mock-db';

export default function AdminUniversitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-950">University Directory Management</h1>
        <Button variant="primary" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Add University</Button>
      </div>

      <div className="bg-white border border-navy-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 border-b border-navy-200 text-xs font-semibold text-navy-700 uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Country</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {MOCK_UNIVERSITIES.map((u) => (
              <tr key={u.id}>
                <td className="p-4 font-bold text-navy-950">{u.name}</td>
                <td className="p-4 text-navy-600">{u.country}</td>
                <td className="p-4"><Badge variant="success">Published</Badge></td>
                <td className="p-4">
                  <a href={u.website} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
