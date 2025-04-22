
import { UniversityRequestPayload, UniversityResponse } from '@/types/api';

export const fetchUniversityRecommendations = async (payload: UniversityRequestPayload): Promise<UniversityResponse> => {
  try {
    console.log("Sending API request with payload:", payload);
    
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
