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
  Layers,
  Check
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
  const capacityPercentage = Math.min((files.length / 50) * 100, 100);

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Mesh Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" 
      />
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-[#1254E7]/10 via-indigo-400/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Stepper Header */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              Define Criteria
            </span>
            <div className="h-0.5 flex-1 mx-3 bg-emerald-200" />
            <span className="text-[#1254E7] flex items-center gap-1.5 font-bold">
              <span className="w-5 h-5 rounded-full bg-[#1254E7] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              Upload Resumes
            </span>
            <div className="h-0.5 flex-1 mx-3 bg-stone-200" />
            <span className="text-gray-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px]">
                3
              </span>
              AI Shortlist
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-2xs text-[#1254E7] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Ingestion Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Upload Candidate Resumes
          </h1>

          {/* Active Job Pill */}
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/60 px-3.5 py-1 rounded-xl text-xs text-[#1254E7]">
            <span className="font-semibold text-gray-600">Target Role:</span>
            <span className="font-bold">{job.jobTitle || "Untitled Position"}</span>
          </div>

          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Drag & drop candidate CVs in bulk. We parse individual work histories and measure semantic alignment against your criteria.
          </p>
        </div>

        {/* Drag and Drop Container */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 group cursor-pointer ${
              isDragging 
                ? "border-[#1254E7] bg-blue-50/60 scale-[1.01]" 
                : "border-stone-200 hover:border-[#1254E7] bg-stone-50/50 hover:bg-blue-50/20"
            }`}
          >
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md shadow-blue-500/10 border border-stone-200/80 group-hover:bg-[#1254E7] text-[#1254E7] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <UploadCloud className="w-8 h-8 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-gray-900">
                  Click to upload <span className="font-normal text-gray-500">or drag & drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PDF format only • Maximum 1 MB per file
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs group-hover:border-[#1254E7]/40 transition-colors">
                Browse System Files
              </span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gray-400" />
                <span>Batch Upload Capacity</span>
              </span>
              <span className="text-[#1254E7] font-bold">
                {files.length} / 50 resumes ready
              </span>
            </div>
            
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#1254E7] h-full rounded-full transition-all duration-300"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Valid Resumes List */}
        {files.length > 0 && (
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500" />
                Valid Resumes for Evaluation
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                {files.length} File{files.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-stone-50/70 hover:bg-emerald-50/30 rounded-2xl transition-all text-sm border border-stone-200/60 hover:border-emerald-200 group"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-800 truncate block text-xs sm:text-sm">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {(file.size / 1024).toFixed(0)} KB • PDF
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors ml-2 shrink-0"
                    title="Remove resume"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invalid Files Warning List */}
        {invalidFiles.length > 0 && (
          <div className="bg-white rounded-3xl border border-rose-200/80 shadow-sm p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3.5">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500" />
                Incompatible Files (Skipped)
              </h3>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-1 rounded-full">
                {invalidFiles.length} Skipped
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {invalidFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between p-3.5 bg-rose-50/30 rounded-2xl transition-all text-sm border border-rose-100"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-800 truncate block text-xs sm:text-sm">
                        {file.name}
                      </span>
                      <span className="text-[11px] font-medium text-rose-600">
                        {file.type !== "application/pdf"
                          ? "Unsupported file type (PDF required)"
                          : "Exceeds 1 MB size limit"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeInvalidFile(index)}
                    className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-100 transition-colors ml-2 shrink-0"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Action Footer */}
        {resumes.length > 0 && (
          <div className="sticky bottom-6 z-20 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1254E7] flex items-center justify-center font-bold shrink-0 border border-blue-100">
                <CheckCircle2 className="w-4 h-4 text-[#1254E7]" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block text-xs sm:text-sm">
                  {files.length} candidate resume{files.length > 1 ? "s" : ""} staged
                </span>
                <span className="text-[11px] text-gray-500">Ready for instant AI screening</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartScreening}
              disabled={isScreening}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-[#1254E7]/25 hover:shadow-xl hover:shadow-[#1254E7]/35 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              {isScreening ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Candidates...</span>
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
