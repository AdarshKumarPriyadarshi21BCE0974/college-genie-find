
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

export interface UniversityResponse {
  // Add response type based on the API response structure
  universities: any[]; // Update this with the actual university response type
}
