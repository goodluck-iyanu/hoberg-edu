import React from 'react';
import { Settings, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-950">Account & Subscription</h1>
        <p className="text-sm text-navy-600 mt-1">Manage your Paystack billing and notification preferences.</p>
      </div>

      <div className="bg-white border border-navy-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-navy-950 flex items-center gap-2">
          <Crown className="w-5 h-5 text-gold-500" /> Premium Subscription
        </h3>
        <p className="text-xs text-navy-600">Current Plan: <strong>Hoberg Edu Premium (₦5,000/month)</strong></p>
        <p className="text-xs text-navy-500">Status: <strong className="text-brand-600">Active</strong></p>
        <Button variant="outline" size="sm">Manage Paystack Subscription</Button>
      </div>
    </div>
  );
}
