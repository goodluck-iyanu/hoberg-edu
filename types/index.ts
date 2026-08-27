export type EducationStatus = 'student' | 'graduate' | 'working_professional';
export type DegreeLevel = "Bachelor's" | "Master's" | 'PhD' | 'Diploma' | 'Certificate';
export type FundingType = 'fully_funded' | 'partially_funded' | 'tuition_only' | 'stipend';
export type VerificationStatus = 'draft' | 'under_review' | 'verified' | 'closing_soon' | 'expired' | 'suspended';
export type ApplicationStatus = 'interested' | 'preparing' | 'documents_ready' | 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
export type MembershipStatus = 'free' | 'active' | 'past_due' | 'cancelled' | 'expired';

export interface UserProfile {
  id: string;
  email?: string;
  full_name: string;
  country: string;
  city?: string;
  avatar_url?: string;
  education_status: EducationStatus;
  is_admin: boolean;
  profile_completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface EducationProfile {
  id: string;
  user_id: string;
  school: string;
  degree: string;
  field: string;
  graduation_year?: number;
  grade?: string;
  grading_scale?: string;
  created_at: string;
  updated_at: string;
}

export interface StudyPreferences {
  id: string;
  user_id: string;
  desired_degree: string[];
  desired_countries: string[];
  desired_fields: string[];
  preferred_intake: string;
  budget_range: string;
  created_at: string;
  updated_at: string;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  website: string;
  admissions_url: string;
  international_admissions_url?: string;
  description: string;
  logo_url?: string;
  image_url?: string;
  status: 'draft' | 'under_review' | 'published' | 'archived';
  programs_count?: number;
  scholarships_count?: number;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface AcademicProgram {
  id: string;
  slug: string;
  university_id: string;
  university_name?: string;
  university_country?: string;
  name: string;
  degree_level: DegreeLevel;
  field: string;
  tuition_amount?: number;
  tuition_currency?: string;
  duration: string;
  deadline?: string;
  intake: string;
  requirements: string[];
  english_requirements?: string;
  application_url: string;
  is_featured: boolean;
  status: 'draft' | 'under_review' | 'published' | 'archived';
  last_verified_at: string;
  created_at: string;
}

export interface Scholarship {
  id: string;
  slug: string;
  provider: string;
  name: string;
  description: string;
  degree_levels: string[];
  eligible_countries: string[];
  fields: string[];
  funding_type: FundingType;
  funding_amount?: string;
  tuition_coverage: boolean;
  living_allowance: boolean;
  travel_support: boolean;
  deadline?: string;
  requirements: string[];
  application_url: string;
  source_url: string;
  source_name: string;
  is_featured: boolean;
  verification_status: VerificationStatus;
  last_verified_at: string;
  created_at: string;
}

export interface ApplicationItem {
  id: string;
  user_id: string;
  program_id?: string;
  scholarship_id?: string;
  institution_name: string;
  opportunity_title: string;
  status: ApplicationStatus;
  deadline?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  checklist?: ApplicationDocumentItem[];
}

export interface ApplicationDocumentItem {
  id: string;
  application_id: string;
  document_type: string;
  is_completed: boolean;
  document_url?: string;
  notes?: string;
}

export interface PremiumMembership {
  id: string;
  user_id: string;
  status: MembershipStatus;
  paystack_customer_code?: string;
  paystack_subscription_code?: string;
  plan_code: string;
  current_period_start?: string;
  current_period_end?: string;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  reference: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  provider: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: 'scholarship_alert' | 'deadline_reminder' | 'recommendation' | 'system' | 'premium';
  title: string;
  body: string;
  link_url?: string;
  read_at?: string;
  created_at: string;
}

export interface MatchScoreResult {
  score: number;
  reasons: string[];
  matchFactors: {
    degreeMatch: boolean;
    countryMatch: boolean;
    fieldMatch: boolean;
    gradeMatch: boolean;
  };
  disclaimer: string;
}
