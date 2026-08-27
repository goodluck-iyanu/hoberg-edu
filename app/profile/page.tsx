'use client';
import React, { useState } from 'react';
import { User, GraduationCap, Compass, Briefcase, FileUp, Link as LinkIcon, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_USER, MOCK_EDUCATION, MOCK_PREFERENCES } from '@/lib/data/mock-db';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'preferences' | 'cv'>('personal');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-950">Your Profile & Preferences</h1>
        <p className="text-sm text-navy-600 mt-1">Keep your profile complete to receive highly accurate match scores and opportunity recommendations.</p>
      </div>

      {isSavedAlert && (
        <div className="p-4 bg-brand-50 border border-brand-200 text-brand-900 rounded-xl flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 text-brand-600" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-navy-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('personal')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'personal' ? 'border-brand-600 text-brand-600' : 'border-transparent text-navy-500 hover:text-navy-900'
          }`}
        >
          <User className="w-4 h-4" /> Personal
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'education' ? 'border-brand-600 text-brand-600' : 'border-transparent text-navy-500 hover:text-navy-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Education & Grades
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'preferences' ? 'border-brand-600 text-brand-600' : 'border-transparent text-navy-500 hover:text-navy-900'
          }`}
        >
          <Compass className="w-4 h-4" /> Study Preferences
        </button>
        <button
          onClick={() => setActiveTab('cv')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'cv' ? 'border-brand-600 text-brand-600' : 'border-transparent text-navy-500 hover:text-navy-900'
          }`}
        >
          <FileUp className="w-4 h-4" /> CV & Documents
        </button>
      </div>

      {/* Tab Contents */}
      <form onSubmit={handleSave} className="bg-white border border-navy-200 rounded-3xl p-8 shadow-sm space-y-6">
        {activeTab === 'personal' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-bold text-lg text-navy-950">Personal Information</h3>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Full Name</label>
              <input defaultValue={MOCK_USER.full_name} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Country of Origin / Residence</label>
              <input defaultValue={MOCK_USER.country} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">City</label>
              <input defaultValue={MOCK_USER.city} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-bold text-lg text-navy-950">Academic Background</h3>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">University / Institution</label>
              <input defaultValue={MOCK_EDUCATION.school} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Field of Study</label>
              <input defaultValue={MOCK_EDUCATION.field} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Degree Grade / GPA</label>
              <input defaultValue={MOCK_EDUCATION.grade} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-bold text-lg text-navy-950">Target Study Preferences</h3>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Desired Countries</label>
              <input defaultValue={MOCK_PREFERENCES.desired_countries.join(', ')} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">Preferred Intake</label>
              <input defaultValue={MOCK_PREFERENCES.preferred_intake} className="w-full p-3 bg-navy-50 border border-navy-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        )}

        {activeTab === 'cv' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-bold text-lg text-navy-950">Curriculum Vitae (CV)</h3>
            <p className="text-xs text-navy-600">Upload your academic CV to private storage. Used for profile matching and application readiness.</p>
            <div className="border-2 border-dashed border-navy-300 rounded-2xl p-8 text-center space-y-2">
              <FileUp className="w-8 h-8 text-brand-600 mx-auto" />
              <div className="text-sm font-bold text-navy-900">Goodluck_Nwachukwu_CV_2026.pdf</div>
              <div className="text-xs text-navy-400">PDF, DOCX up to 10MB (Stored in secure private bucket)</div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-navy-100 flex items-center justify-end">
          <Button type="submit" variant="primary" size="md" className="gap-1.5">
            <Save className="w-4 h-4" /> Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
