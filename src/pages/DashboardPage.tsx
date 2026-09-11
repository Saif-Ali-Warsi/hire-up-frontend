import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { getDashboardStats } from "../services/dashboardService";

type Job = {
  id: string;
  job_title: string;
  description: string;
  min_experience: number;
  max_experience: number;
  education: string | null;
  skills: string[];
  certifications: string[];
  requirements: {
    title: string;
    description: string;
    type: "required" | "preferred";
  }[];
  created_at: string;
  updated_at: string;
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalJobs: 0,
    candidatesScreened: 0,
    screeningSessions: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setIsStatsLoading(true);
        setError("");

        const [jobsData, statsData] = await Promise.all([
          getJobs(token),
          getDashboardStats(token),
        ]);

        setJobs(jobsData.jobs || []);
        setStats(statsData.stats || { totalJobs: 0, candidatesScreened: 0, screeningSessions: 0 });
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
        setIsStatsLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8f3eb]/50">
      
      {/* Header Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center p-1.5 bg-white rounded-2xl shadow-md shadow-blue-500/15 border border-gray-100 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="https://www.image2url.com/r2/default/images/1789100294147-a604f829-b27a-4b30-81d0-17b2fb789440.png" 
                alt="HireUP Logo" 
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Hire<span className="text-[#1254E7]">UP</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-200">
              ● Recruiter Workspace
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-600 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Informative Welcome Banner */}
        <div className="bg-gradient-to-r from-[#1254E7] to-[#1e40af] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#1254E7]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Overview Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Recruiter 👋
            </h1>
            <p className="text-blue-100 text-sm max-w-xl">
              Monitor your AI screening sessions, check candidate metrics, and launch new role evaluations instantly.
            </p>
          </div>

          <Link
            to="/job"
            className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-[#1254E7] font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>+ Create New Job</span>
          </Link>
        </div>

        {/* Stats Grid with Shimmer Loaders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {isStatsLoading ? (
            // Shimmer Loader Placeholders
            <>
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Active Jobs</p>
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1254E7] flex items-center justify-center font-bold text-xs">💼</span>
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mt-3">
                  {stats.totalJobs}
                </p>
                <p className="text-xs text-gray-400 mt-1">Configured role profiles</p>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidates Screened</p>
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">👥</span>
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mt-3">
                  {stats.candidatesScreened}
                </p>
                <p className="text-xs text-gray-400 mt-1">Evaluated via AI engine</p>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Screening Sessions</p>
                  <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">⚡</span>
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mt-3">
                  {stats.screeningSessions}
                </p>
                <p className="text-xs text-gray-400 mt-1">Total batches processed</p>
              </div>
            </>
          )}
        </div>

        {/* My Jobs Section */}
        <section className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Job Descriptions</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage and review your saved job descriptions and requirements.</p>
            </div>

            <Link
              to="/job"
              className="inline-flex items-center justify-center bg-[#1254E7]/10 hover:bg-[#1254E7]/20 text-[#1254E7] font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              + Create New Job
            </Link>
          </div>

          {/* Conditional Job States */}
          {isLoading ? (
            <div className="text-center py-20 space-y-3">
              <div className="inline-block w-8 h-8 border-4 border-[#1254E7] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 font-medium">Loading your job profiles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50/50 rounded-2xl border border-red-100">
              <p className="text-sm text-red-600 font-medium">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 text-xs font-bold text-[#1254E7] hover:underline cursor-pointer"
              >
                Try reloading page
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-12 h-12 bg-blue-50 text-[#1254E7] rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl font-bold">📋</div>
              <h3 className="text-base font-bold text-gray-900">No jobs created yet</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                Create your first job description to start evaluating and ranking candidate resumes effortlessly.
              </p>
              <Link
                to="/job"
                className="inline-block mt-5 bg-[#1254E7] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#1254E7]/20 hover:bg-[#0f46c2] transition-all"
              >
                Create your first job →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-50/60 border border-gray-200/80 rounded-2xl p-6 hover:border-[#1254E7]/40 hover:bg-white transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-[#1254E7] transition-colors">
                        {job.job_title}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-lg shrink-0">
                        {job.min_experience}–{job.max_experience} yrs
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {job.description || "No description provided."}
                    </p>
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium bg-white text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200/80"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="text-[11px] font-medium text-gray-400 px-2 py-1">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                    <span className="text-[11px] text-gray-400">
                      Created {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/job/${job.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1254E7] hover:underline"
                    >
                      <span>Manage Role</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default DashboardPage;