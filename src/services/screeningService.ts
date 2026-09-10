const API_URL = import.meta.env.VITE_API_URL;

export const screenGuest = async (
  job: unknown,
  resumes: File[]
) => {
  const formData = new FormData();

  formData.append(
    "job",
    JSON.stringify(job)
  );

  resumes.forEach((resume) => {
    formData.append("resumes", resume);
  });

  const response = await fetch(
    `${API_URL}/api/screening/guest`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Guest screening failed"
    );
  }

  return data;
};