'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SearchBarProps {
  initialQuery?: string;
  initialCountry?: string;
  initialDegree?: string;
  onFilterToggle?: () => void;
}

export function SearchBar({ initialQuery = '', initialCountry = '', initialDegree = '', onFilterToggle }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [country, setCountry] = useState(initialCountry);
  const [degree, setDegree] = useState(initialDegree);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (country) params.set('country', country);
    if (degree) params.set('degree', degree);
    router.push(`/programs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-navy-200/80">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Keyword / Program Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-5 h-5 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, programs, scholarships..."
            className="w-full pl-11 pr-4 py-3 bg-navy-50/70 focus:bg-white border border-navy-200 rounded-xl text-sm font-medium text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Country Select */}
        <div className="md:col-span-3 relative">
          <MapPin className="w-5 h-5 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full pl-11 pr-8 py-3 bg-navy-50/70 focus:bg-white border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none transition-all cursor-pointer"
          >
            <option value="">Any Country</option>
            <option value="Canada">Canada 🇨🇦</option>
            <option value="United Kingdom">United Kingdom 🇬🇧</option>
            <option value="United States">United States 🇺🇸</option>
            <option value="Germany">Germany 🇩🇪</option>
            <option value="Australia">Australia 🇦🇺</option>
            <option value="Ireland">Ireland 🇮🇪</option>
          </select>
        </div>

        {/* Degree Select */}
        <div className="md:col-span-2">
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full px-3 py-3 bg-navy-50/70 focus:bg-white border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none transition-all cursor-pointer"
          >
            <option value="">All Degrees</option>
            <option value="Bachelor's">Bachelor&apos;s</option>
            <option value="Master's">Master&apos;s</option>
            <option value="PhD">PhD</option>
            <option value="Diploma">Diploma / Cert</option>
          </select>
        </div>

        {/* Search & Filter Buttons */}
        <div className="md:col-span-2 flex gap-2">
          {onFilterToggle && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onFilterToggle}
              className="px-3"
              title="More Filters"
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}
          <Button type="submit" variant="primary" size="md" className="w-full gap-2 py-3">
            <Sparkles className="w-4 h-4" /> Search
          </Button>
        </div>

      </div>
    </form>
  );
}
