import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_NOTIFICATIONS } from '@/lib/data/mock-db';

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4" /> Activity Alerts
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950">Notifications & Deadlines</h1>
      </div>

      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div key={n.id} className="bg-white border border-navy-200/80 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-navy-950">{n.title}</h4>
              <p className="text-xs text-navy-600">{n.body}</p>
            </div>
            {n.link_url && (
              <Link href={n.link_url}>
                <Button variant="outline" size="sm" className="gap-1 text-xs shrink-0">
                  View <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
