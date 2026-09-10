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
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalJobs: 0,
    candidatesScreened: 0,
    screeningSessions: 0,
  });

  useEffect(() => {
    const loadJobs = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getJobs(token);

        setJobs(data.jobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load jobs.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) return;

    const loadDashboard = async () => {
      try {
        const [jobsData, statsData] = await Promise.all([
          getJobs(token),
          getDashboardStats(token),
        ]);

        setJobs(jobsData.jobs);
        setStats(statsData.stats);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  {
    isLoading ? (
      <div className="text-center py-16">
        <p className="text-sm text-gray-500">Loading your jobs...</p>
      </div>
    ) : error ? (
      <div className="text-center py-16">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-semibold text-[#1254E7] hover:underline"
        >
          Try again
        </button>
      </div>
    ) : jobs.length === 0 ? (
      <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800">No jobs yet</h3>

        <p className="text-sm text-gray-500 mt-2">
          Create your first job to start screening candidates.
        </p>

        <Link
          to="/job"
          className="inline-block mt-5 text-sm font-semibold text-[#1254E7] hover:underline"
        >
          Create your first job →
        </Link>
      </div>
    ) : (
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-xl p-5 hover:border-[#1254E7]/30 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900">{job.job_title}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  {job.min_experience}–{job.max_experience} years
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-[#1254E7] hover:underline"
              >
                Open →
              </button>
            </div>

            {job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {job.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}

                {job.skills.length > 5 && (
                  <span className="text-xs text-gray-400 px-2 py-1">
                    +{job.skills.length - 5} more
                  </span>
                )}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4">
              Created {new Date(job.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3eb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-2xl font-bold text-[#1254E7]">
            HireUP
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-600 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <p className="mt-2 text-gray-500">
            Manage your jobs and candidate screening.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Total Jobs</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Candidates Screened</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {" "}
              {stats.candidatesScreened}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Screening Sessions</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.screeningSessions}
            </p>
          </div>
        </div>

        {/* My Jobs */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Jobs</h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage your saved job descriptions.
              </p>
            </div>

            <Link
              to="/job"
              className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-3 rounded-xl"
            >
              + Create New Job
            </Link>
          </div>

          {/* Temporary empty state */}
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800">No jobs yet</h3>

            <p className="text-sm text-gray-500 mt-2">
              Create your first job to start screening candidates.
            </p>

            <Link
              to="/job"
              className="inline-block mt-5 text-sm font-semibold text-[#1254E7] hover:underline"
            >
              Create your first job →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
