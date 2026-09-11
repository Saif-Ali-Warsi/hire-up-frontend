import { useState } from "react";
import { useScreening } from "../../context/ScreeningContext";
import { Navigate, useNavigate } from "react-router-dom";
import { screenGuest } from "../../services/screeningService";
import { canGuestUse, consumeGuestUse } from "../../utils/guestUsage";
import LoginPromptModal from "../Auth/LoginPromptModal";
import { createJob } from "../../services/jobService";
import { uploadResumes } from "../../services/resumeService";
import toast from "react-hot-toast";
import { 
  UploadCloud, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Layers
} from "lucide-react";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

function ResumeUpload() {
  const navigate = useNavigate();

  const { job, jobId, resumes, setJobId, setResumes, setResults } =
    useScreening();

  const [files, setFiles] = useState<File[]>(resumes);
  const [invalidFiles, setInvalidFiles] = useState<File[]>([]);
  const [isScreening, setIsScreening] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

    const invalidFilesList = selectedFiles.filter(
      (file) => file.type !== "application/pdf" || file.size > MAX_FILE_SIZE,
    );

    setFiles(validFiles);
    setInvalidFiles(invalidFilesList);
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

        if (!currentJobId) {
          const createdJob = await createJob(job, accessToken);
          const createdJobId = createdJob?.job?.id;

          if (!createdJobId) {
            throw new Error("Job was created but no job ID was returned.");
          }

          currentJobId = createdJobId;
          setJobId(createdJobId);
        }

        if (!currentJobId) {
          throw new Error("Unable to determine job ID.");
        }

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
      consumeGuestUse();
      navigate("/results");
    } catch (error) {
      console.error("Guest screening failed:", error);
      toast.error("Screening failed. Please try again.");
    } finally {
      setIsScreening(false);
    }
  };

  const totalSelectedCount = files.length + invalidFiles.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-[#f8f3eb]/40 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Header Title Area */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1254E7]/10 border border-[#1254E7]/20 text-[#1254E7] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Candidate Pipeline</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Upload Candidate Resumes
          </h1>

          <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Upload candidate portfolios in bulk. Only <span className="font-semibold text-gray-800">PDF format</span> up to <span className="font-semibold text-gray-800">1 MB</span> per file are accepted.
          </p>
        </div>

        {/* Drag and Drop Upload Box Container */}
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xl shadow-blue-900/5 space-y-6">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 group ${
              isDragging 
                ? "border-[#1254E7] bg-blue-50/50 scale-[1.01]" 
                : "border-gray-200 hover:border-[#1254E7] bg-gray-50/40 hover:bg-blue-50/20"
            }`}
          >
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md shadow-blue-500/10 border border-gray-100 group-hover:bg-[#1254E7] text-[#1254E7] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-gray-800">
                  Click to upload <span className="font-normal text-gray-500">or drag & drop files here</span>
                </div>
                <p className="text-xs text-gray-400">
                  Maximum 50 files allowed (.PDF only, max 1MB each)
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 shadow-sm">
                Browse Files
              </span>
            </div>
          </div>

          {/* Selection Counter Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gray-400" />
              <span>Selection Overview</span>
            </span>
            <span className="text-[#1254E7] bg-[#1254E7]/10 px-3 py-1 rounded-full font-bold">
              {totalSelectedCount} / 50 resumes selected
            </span>
          </div>
        </div>

        {/* Ready for Screening Files List */}
        {files.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                Ready for Screening
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                {files.length} Valid File{files.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-gray-50/80 hover:bg-emerald-50/30 rounded-2xl transition-all text-sm border border-gray-100 hover:border-emerald-200 group"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/60 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-800 truncate block">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-50 transition-colors ml-2 shrink-0"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Eligible / Invalid Files List */}
        {invalidFiles.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-red-100 shadow-xl shadow-red-900/5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-red-50 pb-3.5">
              <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />
                Not Eligible for Screening
              </h3>
              <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full">
                {invalidFiles.length} Invalid File{invalidFiles.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {invalidFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-red-50/40 hover:bg-red-50/70 rounded-2xl transition-all text-sm border border-red-100"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-800 truncate block">
                        {file.name}
                      </span>
                      <span className="text-xs font-medium text-red-600">
                        {file.type !== "application/pdf"
                          ? "Only PDF format is permitted"
                          : "File size exceeds 1 MB limit"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeInvalidFile(index)}
                    className="text-red-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-100 transition-colors ml-2 shrink-0"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Panel / Sticky Submit Trigger */}
        {resumes.length > 0 && (
          <div className="bg-white/90 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xl shadow-blue-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-6 z-20 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <div className="w-10 h-10 rounded-2xl bg-[#1254E7]/10 text-[#1254E7] flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#1254E7]" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">
                  {files.length} resume{files.length > 1 ? "s" : ""} validated
                </span>
                <span className="text-xs text-gray-400">Ready to initiate intelligent review</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartScreening}
              disabled={isScreening}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-[#1254E7]/25 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              {isScreening ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Resumes...</span>
                </>
              ) : (
                <>
                  <span>Start AI Screening</span>
                  <ArrowRight className="w-4 h-4" />
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