
import { UniversityRequestPayload, UniversityResponse } from '@/types/api';

const indianUniversitiesDummyData: UniversityResponse = {
  state: true,
  message: "Graduate University Finder List",
  data: {
    isInitialVisit: false,
    ambitious_universities: [
      {
        university_courses_id: "1001",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 2000,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Bangalore",
        university_courses_slug: "computer-science-engineering",
        university_abb: "IISC",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 160000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1001",
        university_name: "Indian Institute of Science",
        university_slug: "indian-institute-of-science",
        university_global_rank: 155,
        university_logo_url: "iisc_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "175",
        users_university_application: null,
        annual_fee: 80000
      },
      {
        university_courses_id: "1002",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 1500,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Mumbai",
        university_courses_slug: "computer-science-engineering",
        university_abb: "IITB",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 120000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1002",
        university_name: "Indian Institute of Technology Bombay",
        university_slug: "iit-bombay",
        university_global_rank: 177,
        university_logo_url: "iitb_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "170",
        users_university_application: null,
        annual_fee: 60000
      }
    ],
    moderate_universities: [
      {
        university_courses_id: "1003",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science",
        university_courses_tuition_usd: 1200,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Delhi",
        university_courses_slug: "computer-science",
        university_abb: "IIITD",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 100000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1003",
        university_name: "Indraprastha Institute of Information Technology Delhi",
        university_slug: "iiit-delhi",
        university_global_rank: 601,
        university_logo_url: "iiitd_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "145",
        users_university_application: null,
        annual_fee: 50000
      }
    ],
    safe_universities: [
      {
        university_courses_id: "1004",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 1000,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Bangalore",
        university_courses_slug: "computer-science-engineering",
        university_abb: "BITS",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 80000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1004",
        university_name: "Birla Institute of Technology and Science, Pilani",
        university_slug: "bits-pilani",
        university_global_rank: 801,
        university_logo_url: "bits_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "125",
        users_university_application: null,
        annual_fee: 40000
      }
    ],
    student_score: 121.73,
    use_course_group: false,
    course_group_id: 30037,
    origin: "yocket"
  }
};

export const fetchUniversityRecommendations = async (payload: UniversityRequestPayload): Promise<UniversityResponse> => {
  try {
    console.log("Sending API request with payload:", payload);
    
    // Return dummy data for India
    if (payload.country === 'india') {
      console.log("Returning dummy data for India");
      return indianUniversitiesDummyData;
    }
    
    const response = await fetch('https://api.yocket.com/grad-school-finder/3610297b-98e9-4f23-9e49-956ce3e24dc0', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJFUzI1NiIsImlkIjoiMzYxMDI5N2ItOThlOS00ZjIzLTllNDktOTU2Y2UzZTI0ZGMwIiwiaWF0IjoxNzQ1MzUwODAxLCJleHAiOjE3NDc5ODA1NDd9.4g8ZjG3gJ6C9Ls0V6OEohhS4BpUgLgMJ-tjHdpTLfNc`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("API response not ok", response.status, response.statusText);
      throw new Error(`Failed to fetch university recommendations: ${response.status} ${response.statusText}`);
    }

    const data: UniversityResponse = await response.json();
    console.log("API response received:", data);
    return data;
  } catch (error) {
    console.error('Error fetching university recommendations:', error);
    throw error;
  }
};
