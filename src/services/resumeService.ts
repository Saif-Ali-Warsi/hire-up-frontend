const API_URL = import.meta.env.VITE_API_URL

export const uploadResumes = async (
  files: File[],
  token?: string
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('resumes', file);
  });

  const response = await fetch(`${API_URL}/resumes/upload`, {
    method: 'POST',
    body: formData,
    ...(token
      ? {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      : {})
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to upload resumes'
    );
  }

  return data;
};