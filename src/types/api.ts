
export interface CourseOption {
  course_name: string;
  course_taxonomy_id: number;
}

export interface UniversityRequestPayload {
  country: string;
  intended_course_taxonomy_id: number;
  grade: string;
  grade_scale: string;
  college: number;
  major: string;
  backlogs: number;
  is_stem: boolean;
  SOP: number;
  LOR: number;
  Resume: number;
  ielts_overall: number;
}

interface UniversityData {
  university_courses_id: string;
  university_courses_credential: string;
  university_courses_name: string;
  university_courses_tuition_usd: number;
  university_courses_level: number;
  country_id: number;
  location_name: string;
  university_courses_slug: string;
  university_abb: string;
  is_partner: boolean;
  university_courses_is_partner: boolean;
  is_fee_waived: boolean;
  university_courses_tuition_local: number;
  university_courses_duration: number;
  course_taxonomy_id: string;
  university_id: string;
  university_name: string;
  university_slug: string;
  university_global_rank: number;
  university_logo_url: string;
  country: string;
  symbol: string;
  university_courses_points: string;
  users_university_application: any;
  annual_fee: number;
}

export interface UniversityResponse {
  state: boolean;
  message: string;
  data: {
    isInitialVisit: boolean;
    ambitious_universities: UniversityData[];
    moderate_universities: UniversityData[];
    safe_universities: UniversityData[];
  };
}
