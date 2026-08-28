import React from 'react';
import { Crown, Sparkles, CheckCircle2, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PremiumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
          <Crown className="w-4 h-4 text-gold-600" />
          <span>Hoberg Edu Premium Experience</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Supercharge Your International Study Applications
        </h1>

        <p className="text-base sm:text-lg text-navy-600">
          Unlock personalized 0–100% eligibility match scoring, priority deadline reminders, and customized application checklists for just ₦5,000/month.
        </p>
      </div>

      {/* Pricing Card */}
      <div className="max-w-xl mx-auto bg-white border-2 border-gold-400/80 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gold-400 text-navy-950 text-xs font-extrabold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          Monthly Membership
        </div>

        <div className="mb-6">
          <div className="text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">Recurring Plan</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-navy-950">₦5,000</span>
            <span className="text-navy-500 font-semibold">/ month</span>
          </div>
          <p className="text-xs text-navy-500 mt-2">Billed automatically. Cancel online anytime.</p>
        </div>

        <div className="space-y-3.5 mb-8">
          <div className="flex items-center gap-2.5 text-sm text-navy-800">
            <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
            <span><strong>Personalized Match Score %</strong> on every program & scholarship</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-navy-800">
            <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
            <span><strong>Curated High-Value Opportunities</strong> tailored to your GPA and field</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-navy-800">
            <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
            <span><strong>Custom Document Checklist</strong> (SOP, CV, Transcripts, Recommendations)</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-navy-800">
            <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
            <span><strong>Priority Deadline Warnings</strong> so you never miss application windows</span>
          </div>
        </div>

        <Button variant="gold" size="lg" className="w-full justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform">
          <Crown className="w-5 h-5 text-navy-950" />
          <span>Subscribe Now — Coming Soon</span>
        </Button>

        <div className="pt-6 mt-6 border-t border-navy-100 text-center text-xs text-navy-400">
          🔒 Secure 256-bit encrypted checkout.
        </div>
      </div>

      {/* Non-Guarantee Transparency Disclaimer */}
      <div className="bg-slate-100 border border-navy-200 rounded-2xl p-6 text-center max-w-3xl mx-auto space-y-2">
        <h4 className="font-bold text-sm text-navy-900">Our Transparency Commitment</h4>
        <p className="text-xs text-navy-600 leading-relaxed">
          Hoberg Edu does not guarantee university admission, scholarships, visas, funding, or employment. Final decisions are made solely by universities and scholarship providers. Premium provides tools, data, and guidance to maximize your application readiness.
        </p>
      </div>

    </div>
  );
}