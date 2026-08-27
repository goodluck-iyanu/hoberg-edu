'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Globe2, 
  BookOpen, 
  Award, 
  Crown, 
  Menu, 
  X, 
  User, 
  Bookmark, 
  FileText, 
  Bell, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthenticated = true;
  const isAdmin = true;

  const navLinks = [
    { name: 'Universities', href: '/universities', icon: Globe2 },
    { name: 'Programs', href: '/programs', icon: BookOpen },
    { name: 'Scholarships', href: '/scholarships', icon: Award },
    { name: 'Countries', href: '/countries', icon: Globe2 },
    { name: 'Premium', href: '/premium', icon: Crown, highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-navy-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo without icon: Hoberg in RED, Edu in BLACK */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex flex-col group">
              <span className="font-black text-2xl tracking-tight leading-none">
                <span className="text-[#dc2626]">Hoberg</span>
                <span className="text-black">Edu</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-navy-500 mt-0.5">
                Discover • Apply • Study
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      link.highlight
                        ? 'text-gold-700 bg-gold-50/80 hover:bg-gold-100/80 font-semibold'
                        : isActive
                        ? 'bg-navy-100 text-navy-950 font-semibold'
                        : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
                    }`}
                  >
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-gold-600" />}
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/saved" className="p-2 text-navy-600 hover:text-navy-900 hover:bg-navy-100 rounded-lg" title="Saved Opportunities">
                  <Bookmark className="w-5 h-5" />
                </Link>
                <Link href="/applications" className="p-2 text-navy-600 hover:text-navy-900 hover:bg-navy-100 rounded-lg" title="My Applications">
                  <FileText className="w-5 h-5" />
                </Link>
                <Link href="/notifications" className="p-2 text-navy-600 hover:text-navy-900 hover:bg-navy-100 rounded-lg relative" title="Notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full ring-2 ring-white"></span>
                </Link>

                {isAdmin && (
                  <Link href="/admin" className="px-2.5 py-1 text-xs font-semibold bg-navy-900 text-white rounded-md flex items-center gap-1 hover:bg-navy-950">
                    <ShieldAlert className="w-3.5 h-3.5 text-gold-400" /> Admin
                  </Link>
                )}

                <Link href="/dashboard">
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <User className="w-4 h-4" /> Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-navy-600 hover:text-navy-950 hover:bg-navy-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-navy-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-navy-700 hover:bg-navy-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-navy-100 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Dashboard</Button>
            </Link>
            <Link href="/saved" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Saved Opportunities</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
