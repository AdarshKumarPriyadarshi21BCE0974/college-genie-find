
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
        university_courses_points: "87",
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
        university_courses_points: "85",
        users_university_application: null,
        annual_fee: 60000
      },
      {
        university_courses_id: "1005",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 1800,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Delhi",
        university_courses_slug: "computer-science-engineering",
        university_abb: "IITD",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 140000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1005",
        university_name: "Indian Institute of Technology Delhi",
        university_slug: "iit-delhi",
        university_global_rank: 197,
        university_logo_url: "iitd_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "83",
        users_university_application: null,
        annual_fee: 70000
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
        university_courses_points: "72",
        users_university_application: null,
        annual_fee: 50000
      },
      {
        university_courses_id: "1006",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 1400,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Chennai",
        university_courses_slug: "computer-science-engineering",
        university_abb: "IITM",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 110000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1006",
        university_name: "Indian Institute of Technology Madras",
        university_slug: "iit-madras",
        university_global_rank: 250,
        university_logo_url: "iitm_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "70",
        users_university_application: null,
        annual_fee: 55000
      },
      {
        university_courses_id: "1007",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science",
        university_courses_tuition_usd: 1300,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Kanpur",
        university_courses_slug: "computer-science",
        university_abb: "IITK",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 105000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1007",
        university_name: "Indian Institute of Technology Kanpur",
        university_slug: "iit-kanpur",
        university_global_rank: 277,
        university_logo_url: "iitk_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "68",
        users_university_application: null,
        annual_fee: 52500
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
        university_courses_points: "62",
        users_university_application: null,
        annual_fee: 40000
      },
      {
        university_courses_id: "1008",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science",
        university_courses_tuition_usd: 900,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Hyderabad",
        university_courses_slug: "computer-science",
        university_abb: "IIITH",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 75000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1008",
        university_name: "International Institute of Information Technology Hyderabad",
        university_slug: "iiit-hyderabad",
        university_global_rank: 901,
        university_logo_url: "iiith_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "58",
        users_university_application: null,
        annual_fee: 37500
      },
      {
        university_courses_id: "1009",
        university_courses_credential: "M.Tech",
        university_courses_name: "Computer Science and Engineering",
        university_courses_tuition_usd: 850,
        university_courses_level: 2,
        country_id: 2,
        location_name: "Kharagpur",
        university_courses_slug: "computer-science-engineering",
        university_abb: "IITKGP",
        is_partner: true,
        university_courses_is_partner: true,
        is_fee_waived: false,
        university_courses_tuition_local: 70000,
        university_courses_duration: 24,
        course_taxonomy_id: "23989",
        university_id: "1009",
        university_name: "Indian Institute of Technology Kharagpur",
        university_slug: "iit-kharagpur",
        university_global_rank: 951,
        university_logo_url: "iitkgp_logo.jpg",
        country: "India",
        symbol: "INR",
        university_courses_points: "56",
        users_university_application: null,
        annual_fee: 35000
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
