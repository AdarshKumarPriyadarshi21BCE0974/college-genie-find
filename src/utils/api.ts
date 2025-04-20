
import { UniversityRequestPayload, UniversityResponse } from '@/types/api';

export const fetchUniversityRecommendations = async (payload: UniversityRequestPayload) => {
  try {
    const response = await fetch('https://api.yocket.com/grad-school-finder/3610297b-98e9-4f23-9e49-956ce3e24dc0', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJFUzI1NiIsImlkIjoiMzYxMDI5N2ItOThlOS00ZjIzLTllNDktOTU2Y2UzZTI0ZGMwIiwiaWF0IjoxNzQ0OTk0NzA1LCJleHAiOjE3NDc2MjQ0NTF9.7h38zZY-7ZgtkUwleSXyMGxtTtjdL-heD77v9jhJEfs`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch university recommendations');
    }

    const data: UniversityResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching university recommendations:', error);
    throw error;
  }
};
