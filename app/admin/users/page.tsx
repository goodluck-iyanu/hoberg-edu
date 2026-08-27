import React from 'react';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MOCK_USER } from '@/lib/data/mock-db';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-navy-950">User Accounts & Subscriptions</h1>
      <div className="bg-white border border-navy-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 border-b border-navy-200 text-xs font-semibold text-navy-700 uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Profile Completion</th>
              <th className="p-4">Subscription</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            <tr>
              <td className="p-4 font-bold text-navy-950">{MOCK_USER.full_name}</td>
              <td className="p-4 text-navy-600">{MOCK_USER.email}</td>
              <td className="p-4"><Badge variant="success">85% Complete</Badge></td>
              <td className="p-4"><Badge variant="gold">⭐ Premium Active</Badge></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
