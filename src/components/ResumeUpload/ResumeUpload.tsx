import { useState } from "react";
import { useScreening } from "../../context/ScreeningContext";
import { Navigate, useNavigate } from "react-router-dom";
import { screenGuest } from "../../services/screeningService";
import { canGuestUse, consumeGuestUse } from "../../utils/guestUsage";
import LoginPromptModal from "../Auth/LoginPromptModal";
import { createJob } from "../../services/jobService";
import { uploadResumes } from "../../services/resumeService";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

function ResumeUpload() {
  const navigate = useNavigate();

  const { job, jobId, resumes, setJobId, setResumes, setResults } =
    useScreening();

  const [files, setFiles] = useState<File[]>(resumes);
  const [invalidFiles, setInvalidFiles] = useState<File[]>([]);
  const [isScreening, setIsScreening] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!job) {
    return <Navigate to="/job" replace />;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 50) {
      toast.error("You can upload a maximum of 50 resumes.");
      return;
    }

    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE,
    );

    const invalidFiles = selectedFiles.filter(
      (file) => file.type !== "application/pdf" || file.size > MAX_FILE_SIZE,
    );

    setFiles(validFiles);
    setInvalidFiles(invalidFiles);
    setResumes(validFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter(
      (_, currentIndex) => currentIndex !== index,
    );

    setFiles(updatedFiles);
    setResumes(updatedFiles);
  };

  const removeInvalidFile = (index: number) => {
    setInvalidFiles(
      invalidFiles.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const handleStartScreening = async () => {
    if (!job) {
      toast.error("Job information is missing.");
      return;
    }

    if (resumes.length === 0) {
      toast.error("Please upload at least one resume.");
      return;
    }

    const accessToken = localStorage.getItem("access_token");

    // ==========================================
    // AUTHENTICATED USER
    // ==========================================
    if (accessToken) {
      try {
        setIsScreening(true);

        let currentJobId = jobId;

        // Create job if we don't already have a jobId
        if (!currentJobId) {
          const createdJob = await createJob(job, accessToken);

          console.log("Created job response:", createdJob);

          const createdJobId = createdJob?.job?.id;

          if (!createdJobId) {
            throw new Error("Job was created but no job ID was returned.");
          }

          currentJobId = createdJobId;

          setJobId(createdJobId);
        }

        // Extra safety check for TypeScript
        if (!currentJobId) {
          throw new Error("Unable to determine job ID.");
        }

        // Upload resumes using authenticated API
        const data = await uploadResumes(resumes, currentJobId, accessToken);

        setResults(data);

        navigate("/results");
      } catch (error) {
        console.error("Authenticated screening failed:", error);

        if (
          error instanceof Error &&
          error.message
            .toLowerCase()
            .includes("invalid or expired authentication token")
        ) {
          localStorage.removeItem("access_token");

          toast.error("Your session has expired. Please sign in again.");

          navigate("/login", {
            state: {
              from: "/upload",
            },
          });

          return;
        }

        toast.error(
          error instanceof Error
            ? error.message
            : "Screening failed. Please try again.",
        );
      } finally {
        setIsScreening(false);
      }

      return;
    }

    // ==========================================
    // GUEST USER
    // ==========================================
    if (!canGuestUse()) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsScreening(true);

      const data = await screenGuest(job, resumes);

      setResults(data);

      // Consume only after successful screening
      consumeGuestUse();

      navigate("/results");
    } catch (error) {
      console.error("Guest screening failed:", error);
    toast.error("Screening failed. Please try again.");
    } finally {
      setIsScreening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Title Area */}
        <div className="text-center">
          <span className="inline-block text-[#1254E7] font-semibold text-sm uppercase tracking-wider bg-[#1254E7]/10 px-3.5 py-1.5 rounded-full mb-3">
            Candidate Pipeline
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Upload Candidate Resumes
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Upload candidate files in bulk. Only{" "}
            <span className="font-semibold text-gray-800">PDF format</span> up
            to <span className="font-semibold text-gray-800">1 MB</span> are
            accepted.
          </p>
        </div>

        {/* Drag and Drop Upload Box Container */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="relative border-2 border-dashed border-gray-200 hover:border-[#1254E7] rounded-xl p-8 text-center transition-colors duration-200 group bg-gray-50/30">
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#1254E7]/10 group-hover:bg-[#1254E7] text-[#1254E7] group-hover:text-white flex items-center justify-center transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Click to upload or drag & drop files here
              </div>
              <p className="text-xs text-gray-400">
                Maximum 50 files allowed (.PDF only, max 1MB each)
              </p>
            </div>
          </div>

          {/* Selection Counter Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
            <span>Selected Files Counter</span>
            <span className="text-[#1254E7] bg-[#1254E7]/10 px-2.5 py-1 rounded-full">
              {files.length + invalidFiles.length} / 50 resumes selected
            </span>
          </div>
        </div>

        {/* Ready for Screening Files List */}
        {files.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Ready for Screening
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {files.length} Valid
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100/70 rounded-xl transition-colors text-sm border border-gray-100"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <svg
                      className="w-5 h-5 text-[#1254E7] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700 truncate">
                      {file.name}{" "}
                      <span className="text-xs text-gray-400 font-normal">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Eligible / Invalid Files List */}
        {invalidFiles.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-red-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-red-50 pb-3">
              <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Not Eligible for Screening
              </h3>
              <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                {invalidFiles.length} Invalid
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {invalidFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-red-50/40 hover:bg-red-50/70 rounded-xl transition-colors text-sm border border-red-100"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="truncate">
                      <span className="font-medium text-gray-800">
                        {file.name}
                      </span>
                      <span className="block text-xs text-red-600">
                        {file.type !== "application/pdf"
                          ? "Only PDF files are allowed"
                          : "File is larger than 1 MB"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeInvalidFile(index)}
                    className="text-red-400 hover:text-red-600 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Panel / Submit Trigger */}
        {resumes.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
            <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
              <span className="font-bold text-gray-900">
                {files.length} resume(s)
              </span>{" "}
              ready for screening.
            </div>

            <button
              type="button"
              onClick={handleStartScreening}
              disabled={isScreening}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScreening ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Screening...
                </>
              ) : (
                <>
                  <span>Start Screening</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          navigate("/login", {
            state: {
              from: "/upload",
            },
          });
        }}
        onRegister={() => {
          navigate("/login", {
            state: {
              from: "/upload",
              mode: "register",
            },
          });
        }}
      />
    </div>
  );
}

export default ResumeUpload;
