import React from 'react';
import { FileCheck2, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminSourcesPage() {
  const sources = [
    { name: 'UK Foreign & Commonwealth Office (Chevening)', url: 'https://www.chevening.org', type: 'Government Body', country: 'UK', status: 'Active' },
    { name: 'Mastercard Foundation Scholars Portal', url: 'https://mastercardfdn.org', type: 'International Foundation', country: 'Global', status: 'Active' },
    { name: 'DAAD German Academic Exchange Service', url: 'https://www.daad.de', type: 'Government Body', country: 'Germany', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-950">Verified Opportunity Sources</h1>
        <Button variant="primary" size="sm" className="gap-1.5"><Plus className="w-4 h-4" /> Register Source</Button>
      </div>

      <div className="bg-white border border-navy-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 border-b border-navy-200 text-xs font-semibold text-navy-700 uppercase">
            <tr>
              <th className="p-4">Source Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Country</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {sources.map((src, i) => (
              <tr key={i}>
                <td className="p-4 font-bold text-navy-950">{src.name}</td>
                <td className="p-4 text-navy-600">{src.type}</td>
                <td className="p-4 text-navy-600">{src.country}</td>
                <td className="p-4"><Badge variant="success">{src.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
