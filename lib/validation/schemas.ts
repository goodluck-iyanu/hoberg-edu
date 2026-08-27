import { z } from 'zod';

export const ProfileUpdateSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  country: z.string().min(2),
  city: z.string().optional(),
  education_status: z.enum(['student', 'graduate', 'working_professional']),
});

export const EducationProfileSchema = z.object({
  school: z.string().min(2, "School name is required"),
  degree: z.string().min(2, "Degree name is required"),
  field: z.string().min(2, "Field of study is required"),
  graduation_year: z.number().int().min(1980).max(2035).optional(),
  grade: z.string().optional(),
  grading_scale: z.string().optional(),
});

export const StudyPreferencesSchema = z.object({
  desired_degree: z.array(z.string()).min(1, "Select at least one degree"),
  desired_countries: z.array(z.string()).min(1, "Select at least one country"),
  desired_fields: z.array(z.string()).min(1, "Select at least one field"),
  preferred_intake: z.string(),
  budget_range: z.string(),
});

export const ApplicationCreateSchema = z.object({
  institution_name: z.string().min(2),
  opportunity_title: z.string().min(2),
  program_id: z.string().uuid().optional(),
  scholarship_id: z.string().uuid().optional(),
  deadline: z.string().optional(),
  status: z.enum(['interested', 'preparing', 'documents_ready', 'applied', 'interview', 'offer', 'rejected', 'withdrawn']).default('interested'),
  notes: z.string().optional(),
});
