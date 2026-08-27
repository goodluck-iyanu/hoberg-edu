import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Sparkles, 
  Bookmark, 
  FileText, 
  Calendar, 
  Crown, 
  ArrowRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { ProfileCompletionWidget } from '@/components/dashboard/ProfileCompletionWidget';
import { ApplicationStatusBadge } from '@/components/applications/ApplicationStatusBadge';
import { calculateProgramMatch, calculateScholarshipMatch } from '@/lib/matching/engine';
import { 
  MOCK_USER, 
  MOCK_EDUCATION, 
  MOCK_PREFERENCES, 
  MOCK_PROGRAMS, 
  MOCK_SCHOLARSHIPS, 
  MOCK_APPLICATIONS 
} from '@/lib/data/mock-db';

export default function DashboardPage() {
  const user = MOCK_USER;
  const education = MOCK_EDUCATION;
  const preferences = MOCK_PREFERENCES;
  const applications = MOCK_APPLICATIONS;

  // Calculate matches
  const programMatches = MOCK_PROGRAMS.map(p => ({
    program: p,
    match: calculateProgramMatch(p, preferences, education),
  }));

  const scholarshipMatches = MOCK_SCHOLARSHIPS.map(s => ({
    scholarship: s,
    match: calculateScholarshipMatch(s, preferences, education),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Welcome Greeting & Status Header */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-brand-600">Student Dashboard</span>
            <Badge variant="gold">⭐ Premium Member</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950">
            Welcome back, {user.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-navy-600">
            Targeting <strong>{preferences.desired_degree.join(', ')}</strong> in <strong>{preferences.desired_countries.join(', ')}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/saved">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Bookmark className="w-4 h-4" /> Saved Opportunities
            </Button>
          </Link>
          <Link href="/applications">
            <Button variant="primary" size="sm" className="gap-1.5">
              <FileText className="w-4 h-4" /> Application Tracker
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed: Recommendations & Deadlines */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personalized Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-navy-950">Recommended For You</h2>
              </div>
              <span className="text-xs text-navy-500 font-medium">Based on your UNILAG CS background</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programMatches.slice(0, 2).map(({ program, match }) => (
                <RecommendationCard
                  key={program.id}
                  title={program.name}
                  institution={program.university_name || 'University'}
                  country={program.university_country || 'International'}
                  degree={program.degree_level}
                  slug={program.slug}
                  type="program"
                  match={match}
                />
              ))}

              {scholarshipMatches.slice(0, 2).map(({ scholarship, match }) => (
                <RecommendationCard
                  key={scholarship.id}
                  title={scholarship.name}
                  institution={scholarship.provider}
                  country="Global / UK"
                  degree="Master's / Full Funding"
                  slug={scholarship.slug}
                  type="scholarship"
                  match={match}
                />
              ))}
            </div>
          </div>

          {/* Active Application Tracker Preview */}
          <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-navy-950 text-base">Your Active Applications</h3>
              </div>
              <Link href="/applications" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                View All ({applications.length})
              </Link>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <Link
                  key={app.id}
                  href={`/applications/${app.id}`}
                  className="block p-4 border border-navy-100 hover:border-brand-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-navy-950">{app.opportunity_title}</div>
                      <div className="text-xs text-navy-500">{app.institution_name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApplicationStatusBadge status={app.status} />
                      <span className="text-xs text-navy-400">Deadline: Nov 2026</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <ProfileCompletionWidget percentage={user.profile_completion_percentage} />

          {/* Upcoming Deadlines Widget */}
          <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-navy-950 text-base">Upcoming Deadlines</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="font-bold text-amber-950">Chevening UK Scholarship</div>
                <div className="text-amber-800">Deadline: Nov 5, 2026 (70 days left)</div>
              </div>
              <div className="p-3 bg-navy-50 border border-navy-100 rounded-xl">
                <div className="font-bold text-navy-950">U of T MSc in Applied Computing</div>
                <div className="text-navy-600">Deadline: Dec 1, 2026</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
