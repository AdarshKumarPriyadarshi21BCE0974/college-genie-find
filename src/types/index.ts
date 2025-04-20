
// Define types for the CollegeFinder form
export interface FormData {
  degree?: 'Bachelor\'s' | 'Master\'s';
  country?: string;
  major?: string;
  intendedCourseTaxonomyId?: string;
  undergradCollege?: string;
  undergradMajor?: string;
  undergradMajorTaxonomyId?: string;
  score?: number;
  scoreType?: string;
  backlogs?: number;
  englishTest?: string | null;
  englishScore?: number;
  aptitudeTest?: string;
  gmatScore?: number;
  greVerbal?: number;
  greQuants?: number;
  greAwa?: number;
  workExperience?: number;
  researchPapers?: 'International' | 'National' | 'None';
  projects?: number;
}

// Define University interface
export interface University {
  name: string;
  country: string;
  rank?: number;
  logo?: string;
  matchPercentage: number;
  programs?: string[];
  university_courses_id?: string;
  university_courses_credential?: string;
  university_courses_tuition_usd?: number;
  location_name?: string;
  university_courses_duration?: number;
  university_id?: string;
  university_slug?: string;
  annual_fee?: number;
}

// Define Country type explicitly
export interface Country {
  name: string;
  flag: string;
  code: string;
}

// Country data with flags
export const countries: Country[] = [
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
  { name: "Canada", flag: "🇨🇦", code: "CA" },
  { name: "Australia & New Zealand", flag: "🇦🇺", code: "AU" },
  { name: "European Union", flag: "🇪🇺", code: "EU" },
  { name: "Singapore", flag: "🇸🇬", code: "SG" },
  { name: "Hong Kong", flag: "🇭🇰", code: "HK" },
  { name: "Netherlands", flag: "🇳🇱", code: "NL" },
  { name: "Germany", flag: "🇩🇪", code: "DE" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH" },
  { name: "Ireland", flag: "🇮🇪", code: "IE" },
  { name: "Japan", flag: "🇯🇵", code: "JP" }
];
