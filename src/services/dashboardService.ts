const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardStats = async (token: string) => {
  const response = await fetch(`${API_URL}/api/dashboard/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard stats");
  }

  return data;
};