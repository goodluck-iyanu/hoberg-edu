-- ======================================================================
-- HOBERG EDU - INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ======================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    country TEXT NOT NULL DEFAULT 'Nigeria',
    city TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    education_status TEXT DEFAULT 'student' CHECK (education_status IN ('student', 'graduate', 'working_professional')),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    profile_completion_percentage INTEGER NOT NULL DEFAULT 20,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. EDUCATION PROFILES
CREATE TABLE IF NOT EXISTS public.education_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    school TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT NOT NULL,
    graduation_year INTEGER,
    grade TEXT,
    grading_scale TEXT DEFAULT '5.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_education UNIQUE (user_id)
);

-- 3. STUDY PREFERENCES
CREATE TABLE IF NOT EXISTS public.study_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    desired_degree TEXT[] DEFAULT ARRAY['Master''s']::TEXT[],
    desired_countries TEXT[] DEFAULT ARRAY['Canada', 'United Kingdom']::TEXT[],
    desired_fields TEXT[] DEFAULT ARRAY['Computer Science', 'Business']::TEXT[],
    preferred_intake TEXT DEFAULT 'Fall 2026',
    budget_range TEXT DEFAULT 'Under $15,000',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_preferences UNIQUE (user_id)
);

-- 4. UNIVERSITIES
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    website TEXT NOT NULL,
    admissions_url TEXT NOT NULL,
    international_admissions_url TEXT,
    description TEXT NOT NULL,
    logo_url TEXT,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'under_review', 'published', 'archived')),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PROGRAMS
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    degree_level TEXT NOT NULL CHECK (degree_level IN ('Bachelor''s', 'Master''s', 'PhD', 'Diploma', 'Certificate')),
    field TEXT NOT NULL,
    tuition_amount NUMERIC,
    tuition_currency TEXT DEFAULT 'USD',
    duration TEXT NOT NULL,
    deadline TIMESTAMPTZ,
    intake TEXT NOT NULL,
    requirements JSONB DEFAULT '[]'::JSONB,
    english_requirements TEXT,
    application_url TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'under_review', 'published', 'archived')),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SCHOLARSHIPS
CREATE TABLE IF NOT EXISTS public.scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    provider TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    degree_levels TEXT[] NOT NULL DEFAULT ARRAY['Master''s']::TEXT[],
    eligible_countries TEXT[] NOT NULL DEFAULT ARRAY['Nigeria', 'International']::TEXT[],
    fields TEXT[] NOT NULL DEFAULT ARRAY['All Fields']::TEXT[],
    funding_type TEXT NOT NULL CHECK (funding_type IN ('fully_funded', 'partially_funded', 'tuition_only', 'stipend')),
    funding_amount TEXT,
    tuition_coverage BOOLEAN NOT NULL DEFAULT TRUE,
    living_allowance BOOLEAN NOT NULL DEFAULT TRUE,
    travel_support BOOLEAN NOT NULL DEFAULT FALSE,
    deadline TIMESTAMPTZ,
    requirements JSONB DEFAULT '[]'::JSONB,
    application_url TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_name TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('draft', 'under_review', 'verified', 'closing_soon', 'expired', 'suspended')),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SAVED OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.saved_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_saved_program UNIQUE (user_id, program_id)
);

CREATE TABLE IF NOT EXISTS public.saved_scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_saved_scholarship UNIQUE (user_id, scholarship_id)
);

CREATE TABLE IF NOT EXISTS public.saved_universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_saved_university UNIQUE (user_id, university_id)
);

-- 8. APPLICATIONS TRACKER
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
    scholarship_id UUID REFERENCES public.scholarships(id) ON DELETE SET NULL,
    institution_name TEXT NOT NULL,
    opportunity_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'interested' CHECK (status IN ('interested', 'preparing', 'documents_ready', 'applied', 'interview', 'offer', 'rejected', 'withdrawn')),
    deadline TIMESTAMPTZ,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. APPLICATION DOCUMENTS
CREATE TABLE IF NOT EXISTS public.application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    document_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. PREMIUM MEMBERSHIPS
CREATE TABLE IF NOT EXISTS public.premium_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'active', 'past_due', 'cancelled', 'expired')),
    paystack_customer_code TEXT,
    paystack_subscription_code TEXT,
    plan_code TEXT DEFAULT 'PLN_hoberg_premium_monthly',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_membership UNIQUE (user_id)
);

-- 11. PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reference TEXT NOT NULL UNIQUE,
    amount NUMERIC NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    provider TEXT NOT NULL DEFAULT 'paystack',
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('scholarship_alert', 'deadline_reminder', 'recommendation', 'system', 'premium')),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link_url TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. OPPORTUNITY SOURCES
CREATE TABLE IF NOT EXISTS public.opportunity_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('university_portal', 'government_body', 'international_foundation', 'verified_partner')),
    country TEXT NOT NULL,
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'review_needed', 'deprecated')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS ACTIVATION
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_sources ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own education" ON public.education_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own education" ON public.education_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own education" ON public.education_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own preferences" ON public.study_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON public.study_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.study_preferences FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Published universities are viewable by everyone" ON public.universities FOR SELECT USING (status = 'published');
CREATE POLICY "Published programs are viewable by everyone" ON public.programs FOR SELECT USING (status = 'published');
CREATE POLICY "Verified scholarships are viewable by everyone" ON public.scholarships FOR SELECT USING (verification_status IN ('verified', 'closing_soon'));

CREATE POLICY "Users can read own saved programs" ON public.saved_programs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save programs" ON public.saved_programs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete saved programs" ON public.saved_programs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own saved scholarships" ON public.saved_scholarships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save scholarships" ON public.saved_scholarships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete saved scholarships" ON public.saved_scholarships FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own application documents" ON public.application_documents FOR ALL USING (
    EXISTS (SELECT 1 FROM public.applications WHERE applications.id = application_documents.application_id AND applications.user_id = auth.uid())
);

CREATE POLICY "Users can view own membership" ON public.premium_memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view and manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
