import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300 border-t border-navy-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-black text-2xl tracking-tight">
                <span className="text-[#dc2626]">Hoberg</span>
                <span className="text-white">Edu</span>
              </span>
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed">
              Nigeria&apos;s premier platform for verified international scholarships, degree programs, and global study abroad opportunities.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-brand-400 bg-brand-950/60 border border-brand-800/40 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% verified official sources. No third-party scam listings.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/scholarships" className="hover:text-brand-400 transition-colors">Fully Funded Scholarships</Link></li>
              <li><Link href="/programs" className="hover:text-brand-400 transition-colors">Master&apos;s & PhD Programs</Link></li>
              <li><Link href="/universities" className="hover:text-brand-400 transition-colors">Global Universities Directory</Link></li>
              <li><Link href="/countries" className="hover:text-brand-400 transition-colors">Top Destination Countries</Link></li>
              <li><Link href="/premium" className="hover:text-gold-400 transition-colors flex items-center gap-1">Hoberg Premium (₦5,000/mo)</Link></li>
            </ul>
          </div>

          {/* Top Countries */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Destinations</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/countries/canada" className="hover:text-brand-400 transition-colors">Study in Canada</Link></li>
              <li><Link href="/countries/united-kingdom" className="hover:text-brand-400 transition-colors">Study in United Kingdom</Link></li>
              <li><Link href="/countries/united-states" className="hover:text-brand-400 transition-colors">Study in United States</Link></li>
              <li><Link href="/countries/germany" className="hover:text-brand-400 transition-colors">Study in Germany (Tuition-Free)</Link></li>
              <li><Link href="/countries/australia" className="hover:text-brand-400 transition-colors">Study in Australia</Link></li>
            </ul>
          </div>

          {/* Legal & Disclaimer */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Transparency</h4>
            <p className="text-xs text-navy-400 leading-relaxed mb-4">
              <strong>Disclaimer:</strong> Hoberg Edu is an independent educational discovery and matching platform. Hoberg Edu is not a university and does not guarantee admission, scholarships, visas, or funding. Final admissions and funding decisions are made exclusively by the official institutions.
            </p>
            <div className="text-xs text-navy-500">
              © 2026 Hoberg Edu Technologies. All rights reserved.
            </div>
            <div className="text-xs text-navy-500 mt-1">
              Built by{' '}
              <a href="https://hoberg.com.ng" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">
                Hoberg Digital Agency
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
