import { AcademicProgram, Scholarship, StudyPreferences, EducationProfile, MatchScoreResult } from '@/types';

export function calculateProgramMatch(
  program: AcademicProgram,
  preferences?: StudyPreferences | null,
  education?: EducationProfile | null
): MatchScoreResult {
  let score = 50;
  const reasons: string[] = [];
  const factors = { degreeMatch: false, countryMatch: false, fieldMatch: false, gradeMatch: false };

  if (!preferences && !education) {
    return {
      score: 70,
      reasons: ["Popular opportunity matching general Nigerian applicant profile."],
      matchFactors: factors,
      disclaimer: "This score is a recommendation tool, not an admissions decision. Hoberg Edu does not guarantee admission or funding."
    };
  }

  if (preferences?.desired_degree && preferences.desired_degree.includes(program.degree_level)) {
    score += 20;
    factors.degreeMatch = true;
    reasons.push(`Matches your preference for ${program.degree_level} programs.`);
  }

  const programField = program.field.toLowerCase();
  const userField = education?.field?.toLowerCase() || "";
  const desiredFields = preferences?.desired_fields || [];
  const fieldMatches = desiredFields.some(f => programField.includes(f.toLowerCase()) || f.toLowerCase().includes(programField)) ||
                       (userField && programField.includes(userField));

  if (fieldMatches) {
    score += 15;
    factors.fieldMatch = true;
    reasons.push(`Aligns with your academic background in ${program.field}.`);
  }

  if (program.university_country && preferences?.desired_countries?.includes(program.university_country)) {
    score += 10;
    factors.countryMatch = true;
    reasons.push(`Located in ${program.university_country}, one of your target study destinations.`);
  }

  if (education?.grade && (education.grade.includes('First') || parseFloat(education.grade) >= 3.5 || parseFloat(education.grade) >= 4.0)) {
    score += 5;
    factors.gradeMatch = true;
    reasons.push("Your strong academic grade meets or exceeds general requirements.");
  }

  score = Math.min(Math.max(score, 40), 98);
  return {
    score,
    reasons: reasons.length > 0 ? reasons : ["Relevant program based on popular study preferences."],
    matchFactors: factors,
    disclaimer: "This score is a recommendation tool, not an admissions decision. Hoberg Edu does not guarantee admission or funding. Confirm official requirements before applying."
  };
}

export function calculateScholarshipMatch(
  scholarship: Scholarship,
  preferences?: StudyPreferences | null,
  education?: EducationProfile | null
): MatchScoreResult {
  let score = 55;
  const reasons: string[] = [];
  const factors = { degreeMatch: false, countryMatch: false, fieldMatch: false, gradeMatch: false };

  if (scholarship.eligible_countries.includes('Nigeria') || scholarship.eligible_countries.includes('International') || scholarship.eligible_countries.includes('African Countries')) {
    score += 15;
    reasons.push("Open to citizens and residents of Nigeria.");
  }

  if (scholarship.funding_type === 'fully_funded') {
    score += 10;
    reasons.push("Provides 100% full funding (tuition + living stipend + travel).");
  }

  if (preferences?.desired_degree && preferences.desired_degree.some(d => scholarship.degree_levels.includes(d))) {
    score += 10;
    factors.degreeMatch = true;
    reasons.push(`Covers your targeted study level: ${preferences.desired_degree.join(', ')}.`);
  }

  if (scholarship.fields.includes('All Fields') || preferences?.desired_fields?.some(f => scholarship.fields.includes(f))) {
    score += 10;
    factors.fieldMatch = true;
    reasons.push("Eligible across your academic discipline.");
  }

  score = Math.min(Math.max(score, 45), 98);
  return {
    score,
    reasons,
    matchFactors: factors,
    disclaimer: "This opportunity appears relevant based on your profile. Hoberg Edu does not guarantee scholarship awards. Official decisions rest solely with provider institutions."
  };
}
