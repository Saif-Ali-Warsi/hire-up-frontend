const API_URL = import.meta.env.VITE_API_URL;

export const uploadResumes = async (
  files: File[],
  jobId: string,
  token: string
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("resumes", file);
  });

  formData.append("jobId", jobId);

  const response = await fetch(
    `${API_URL}/api/resumes/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload resumes"
    );
  }

  return data;
};