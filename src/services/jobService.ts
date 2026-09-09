const API_URL = 'http://localhost:5000/api';

export const createJob = async (jobDescription: unknown, token: string) => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(jobDescription)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create job');
  }

  return data;
};