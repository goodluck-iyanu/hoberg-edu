'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  Award, 
  Users, 
  ShieldCheck, 
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Universities', href: '/admin/universities', icon: Building2 },
    { name: 'Programs', href: '/admin/programs', icon: BookOpen },
    { name: 'Scholarships & Review', href: '/admin/scholarships', icon: Award },
    { name: 'Sources & Portals', href: '/admin/sources', icon: FileCheck2 },
    { name: 'Users & Subscriptions', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="w-64 bg-navy-950 text-navy-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between border-r border-navy-900">
      <div className="space-y-6">
        <div className="px-3 py-2 bg-navy-900 rounded-xl border border-navy-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white uppercase tracking-wider">Admin Control</div>
            <div className="text-navy-400">Security Enforced</div>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-sm'
                    : 'text-navy-300 hover:text-white hover:bg-navy-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-navy-900 text-xs text-navy-500 px-2">
        <p>Hoberg Edu Admin v1.0</p>
        <p>Audit logging active</p>
      </div>
    </div>
  );
}
