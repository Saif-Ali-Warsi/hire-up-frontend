import { useState } from 'react';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [invalidFiles, setInvalidFiles] = useState<File[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 50) {
      alert('You can upload a maximum of 50 resumes.');
      return;
    }

    const validFiles = selectedFiles.filter(
      (file) =>
        file.type === 'application/pdf' &&
        file.size <= MAX_FILE_SIZE
    );

    const invalidFiles = selectedFiles.filter(
      (file) =>
        file.type !== 'application/pdf' ||
        file.size > MAX_FILE_SIZE
    );

    setFiles(validFiles);
    setInvalidFiles(invalidFiles);
  };

  const removeFile = (index: number) => {
    setFiles(
      files.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const removeInvalidFile = (index: number) => {
    setInvalidFiles(
      invalidFiles.filter(
        (_, currentIndex) => currentIndex !== index
      )
    );
  };

  return (
    <div>
      <h2>Upload Candidate Resumes</h2>

      <input
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={handleFileChange}
      />

      <p>
        {files.length + invalidFiles.length} / 50 resumes selected
      </p>

      {files.length > 0 && (
        <div>
          <h3>Ready for Screening</h3>

          {files.map((file, index) => (
            <div key={`${file.name}-${file.lastModified}`}>
              <span>
                {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </span>

              <button
                type="button"
                onClick={() => removeFile(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {invalidFiles.length > 0 && (
        <div>
          <h3>Not Eligible for Screening</h3>

          {invalidFiles.map((file, index) => (
            <div key={`${file.name}-${file.lastModified}`}>
              <span>
                {file.name} —{' '}
                {file.type !== 'application/pdf'
                  ? 'Only PDF files are allowed'
                  : 'File is larger than 1 MB'}
              </span>

              <button
                type="button"
                onClick={() => removeInvalidFile(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <p>
          {files.length} resume(s) ready for screening.
        </p>
      )}
    </div>
  );
}

export default ResumeUpload;