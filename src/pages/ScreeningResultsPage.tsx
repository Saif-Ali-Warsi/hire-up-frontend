import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Trophy,
  Target,
  BarChart3,
  Sparkles,
  ArrowLeft,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Check,
} from "lucide-react";

import { useScreening } from "../context/ScreeningContext";

const ScreeningResultsPage = () => {
  const { results, job } = useScreening();
  const navigate = useNavigate();

  const [expandedCandidate, setExpandedCandidate] = useState<number | null>(null);

  if (!results) {
    return <Navigate to="/job" replace />;
  }

  const candidates = results.resumes || [];

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort(
      (a: any, b: any) =>
        (b.evaluation?.overallScore || 0) - (a.evaluation?.overallScore || 0)
    );
  }, [candidates]);

  const totalCandidates = candidates.length;

  const tier1Count = candidates.filter(
    (item: any) => item.evaluation?.tier === "Tier 1"
  ).length;

  const tier2Count = candidates.filter(
    (item: any) => item.evaluation?.tier === "Tier 2"
  ).length;

  const tier3Count = candidates.filter(
    (item: any) => item.evaluation?.tier === "Tier 3"
  ).length;

  const averageScore =
    totalCandidates > 0
      ? Math.round(
          candidates.reduce(
            (sum: number, item: any) =>
              sum + (item.evaluation?.overallScore || 0),
            0
          ) / totalCandidates
        )
      : 0;

  const hardFailures = candidates.filter(
    (item: any) => item.evaluation?.hardRequirementFailed
  ).length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 65) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  };

  const getTierBadge = (tier: string) => {
    if (tier === "Tier 1")
      return "bg-emerald-50 text-emerald-800 border-emerald-200/80 font-bold";
    if (tier === "Tier 2")
      return "bg-amber-50 text-amber-800 border-amber-200/80 font-bold";
    return "bg-stone-100 text-stone-700 border-stone-200 font-medium";
  };

  const getStatusIcon = (status: string) => {
    if (status === "MATCHED")
      return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (status === "EXPLICITLY_NOT_MATCHED")
      return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
    return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
  };

  const toggleCandidate = (index: number) => {
    setExpandedCandidate(expandedCandidate === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" 
      />
      <div className="absolute top-0 right-1/4 w-[700px] h-[350px] bg-gradient-to-tr from-[#1254E7]/10 via-indigo-400/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <button
              onClick={() => navigate("/job")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1254E7] transition-colors mb-3 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Job Setup</span>
            </button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Screening Results
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/60 text-[#1254E7] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                AI Verified
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Ranked candidate evaluations for{" "}
              <span className="font-semibold text-gray-900">
                {job?.jobTitle || "the position"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/job")}
              className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#1254E7]/20 hover:shadow-lg hover:shadow-[#1254E7]/30 transition-all text-sm flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>+ New Screening</span>
            </button>
          </div>
        </div>

        {/* Executive Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            label="Candidates Evaluated"
            value={totalCandidates}
            badge="Parsed"
          />
          <MetricCard
            icon={<Target className="w-5 h-5" />}
            label="Avg. Match Benchmark"
            value={`${averageScore}%`}
            badge="Cohort Avg"
          />
          <MetricCard
            icon={<Trophy className="w-5 h-5 text-amber-500" />}
            label="Tier 1 Shortlist"
            value={tier1Count}
            badge="Top Fits"
            highlight
          />
          <MetricCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="Tier 2 Candidates"
            value={tier2Count}
            badge="Review Needed"
          />
        </div>

        {/* Candidates Leaderboard */}
        <div className="bg-white border border-stone-200/80 shadow-sm rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Candidate Leaderboard
                </h2>
                <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                  {totalCandidates} Profiles
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Sorted by multidimensional match scoring & mandatory rubric fulfillment
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-600 bg-stone-50 border border-stone-200/70 px-3 py-1.5 rounded-xl">
                {tier3Count} Low Fit (Tier 3)
              </span>
            </div>
          </div>

          {/* Candidate List */}
          <div className="space-y-4">
            {sortedCandidates.map((item: any, index: number) => {
              const candidate = item.candidate || {};
              const evaluation = item.evaluation || {};
              const score = evaluation.overallScore || 0;
              const isExpanded = expandedCandidate === index;
              const skills = evaluation.skills || {};
              const isTopRank = index === 0 && score > 0;

              return (
                <div
                  key={`${item.fileName}-${index}`}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isTopRank
                      ? "border-amber-200/90 bg-gradient-to-r from-amber-50/[0.15] via-white to-white shadow-md shadow-amber-900/5 ring-1 ring-amber-400/20"
                      : "border-stone-200/80 bg-white hover:border-stone-300 shadow-2xs"
                  }`}
                >
                  {/* Candidate Summary Row */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      
                      {/* Rank Indicator */}
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border ${
                          isTopRank 
                            ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs" 
                            : index < 3 
                              ? "bg-blue-50 text-[#1254E7] border-blue-200/80" 
                              : "bg-stone-100 text-stone-700 border-stone-200"
                        }`}>
                          #{index + 1}
                        </div>
                      </div>

                      {/* Candidate Meta Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900 truncate">
                            {candidate.name || item.fileName}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs border ${getTierBadge(
                              evaluation.tier
                            )}`}
                          >
                            {evaluation.tier || "Unranked"}
                          </span>
                          {isTopRank && (
                            <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-400/20 text-amber-800 border border-amber-400/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Trophy className="w-3 h-3 text-amber-600" /> Top Match
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                          {candidate.headline || "Candidate Profile"}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400 font-mono">
                          <FileText className="w-3 h-3 text-gray-400" />
                          <span className="truncate">{item.fileName}</span>
                        </div>
                      </div>

                      {/* Match Score Indicator & Expand Button */}
                      <div className="flex items-center gap-3.5 justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                        <div className={`px-4 py-2 rounded-2xl border text-right min-w-[100px] ${getScoreColor(score)}`}>
                          <div className="text-2xl font-black tracking-tight leading-none">
                            {score}%
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 mt-0.5">
                            Fit Score
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCandidate(index)}
                          className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
                            isExpanded
                              ? "bg-stone-900 text-white border-stone-900"
                              : "bg-stone-50 hover:bg-stone-100 text-gray-700 border-stone-200"
                          }`}
                          aria-label="Toggle candidate breakdown"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                    </div>

                    {/* Overall Score Meter Bar */}
                    <div className="mt-4">
                      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            score >= 85 
                              ? "bg-emerald-500" 
                              : score >= 65 
                                ? "bg-amber-500" 
                                : "bg-rose-500"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>

                    {/* Scannable Micro Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-stone-100">
                      <MatchItem icon={<Briefcase className="w-3 h-3 text-gray-400" />} label="Experience" status={evaluation.experience?.status} />
                      <MatchItem icon={<Layers className="w-3 h-3 text-gray-400" />} label="Skills" status={evaluation.skills?.status} />
                      <MatchItem icon={<GraduationCap className="w-3 h-3 text-gray-400" />} label="Education" status={evaluation.education?.status} />
                      <MatchItem icon={<Award className="w-3 h-3 text-gray-400" />} label="Certifications" status={evaluation.certifications?.status} />
                    </div>

                  </div>

                  {/* Expanded Detailed Assessment Dossier */}
                  {isExpanded && (
                    <div className="border-t border-stone-200/80 bg-stone-50/70 p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
                      
                      {/* Executive Summary Card */}
                      {candidate.summary && (
                        <div className="bg-white p-4.5 rounded-2xl border border-stone-200/70 shadow-2xs space-y-1.5">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#1254E7]" />
                            Executive Assessment Summary
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {candidate.summary}
                          </p>
                        </div>
                      )}

                      {/* Hard Requirement Failure Callout */}
                      {evaluation.hardRequirementFailed && (
                        <div className="flex gap-3.5 p-4 bg-rose-50 border border-rose-200/80 rounded-2xl">
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-xs uppercase tracking-wider text-rose-900">
                              Mandatory Qualification Unmet
                            </p>
                            <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                              This candidate failed at least one non-negotiable requirement defined in your job criteria.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Score Breakdown Metrics */}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-3">
                          Dimension Score Breakdown
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <ScoreBox label="Experience Depth" score={evaluation.experience?.score || 0} />
                          <ScoreBox label="Technical Stack" score={evaluation.skills?.score || 0} />
                          <ScoreBox label="Education Match" score={evaluation.education?.score || 0} />
                          <ScoreBox label="Certifications" score={evaluation.certifications?.score || 0} />
                        </div>
                      </div>

                      {/* Skills Alignment */}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-3">
                          Skills Alignment & Gaps
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.matched?.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-lg text-xs font-semibold shadow-2xs"
                            >
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                              {skill}
                            </span>
                          ))}
                          {skills.missing?.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200/80 rounded-lg text-xs font-semibold shadow-2xs"
                            >
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Custom Requirements Checks */}
                      {evaluation.requirements?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-3">
                            Custom Evaluation Criteria Details
                          </h4>
                          <div className="space-y-2.5">
                            {evaluation.requirements.map((requirement: any, reqIdx: number) => (
                              <div
                                key={reqIdx}
                                className="bg-white border border-stone-200/70 rounded-xl p-4 shadow-2xs flex items-start justify-between gap-3"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">
                                    {getStatusIcon(requirement.status)}
                                  </div>
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h5 className="font-bold text-xs text-gray-900">
                                        {requirement.title}
                                      </h5>
                                      <span className="text-[10px] px-2 py-0.5 bg-stone-100 rounded-md text-stone-600 font-semibold uppercase">
                                        {requirement.type}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                      {requirement.reason}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-black text-xs text-gray-900 bg-stone-100 px-2.5 py-1 rounded-lg shrink-0">
                                  {requirement.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline Summary Footer */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 text-base">
            Screening Pipeline Summary & Next Steps
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Insight
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              title="Tier 1 Fast-Track"
              value={`${tier1Count} candidates`}
              description="High-compatibility matches primed for immediate first-round interview invitations."
              type="success"
            />
            <Insight
              icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
              title="Tier 2 Review"
              value={`${tier2Count} candidates`}
              description="Moderate compatibility profiles requiring manual portfolio or experience review."
              type="warning"
            />
            <Insight
              icon={<XCircle className="w-5 h-5 text-rose-600" />}
              title="Tier 3 Archived"
              value={`${tier3Count} candidates`}
              description="Profiles missing critical stack competencies or mandatory criteria."
              type="danger"
            />
          </div>

          {hardFailures > 0 && (
            <p className="text-xs text-gray-500 mt-5 pt-4 border-t border-stone-100">
              * Note: {hardFailures} candidate{hardFailures > 1 ? "s" : ""} did not meet mandatory minimum baseline requirements.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

/* -------------------------------- */
/* Supporting components            */
/* -------------------------------- */

const MetricCard = ({
  icon,
  label,
  value,
  badge,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badge?: string;
  highlight?: boolean;
}) => {
  return (
    <div className={`border rounded-2xl p-5 shadow-2xs transition-all ${
      highlight 
        ? "bg-gradient-to-br from-amber-50/40 to-white border-amber-200/80 shadow-xs" 
        : "bg-white border-stone-200/80"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1254E7] flex items-center justify-center border border-blue-100/60 shadow-2xs">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-bold text-gray-500 bg-stone-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-gray-500">
        {label}
      </p>
      <p className="text-2xl font-black text-gray-900 mt-0.5 tracking-tight">
        {value}
      </p>
    </div>
  );
};

const MatchItem = ({
  icon,
  label,
  status,
}: {
  icon?: React.ReactNode;
  label: string;
  status?: string;
}) => {
  const matched = status === "MATCHED";
  const failed = status === "EXPLICITLY_NOT_MATCHED";

  return (
    <div className="flex items-center justify-between text-xs bg-stone-50/80 px-2.5 py-1.5 rounded-lg border border-stone-200/60">
      <div className="flex items-center gap-1.5 truncate">
        {icon}
        <span className="text-gray-700 font-medium truncate text-[11px]">
          {label}
        </span>
      </div>
      {matched ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      ) : failed ? (
        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      )}
    </div>
  );
};

const ScoreBox = ({
  label,
  score,
}: {
  label: string;
  score: number;
}) => {
  return (
    <div className="bg-white border border-stone-200/70 rounded-xl p-3.5 shadow-2xs">
      <p className="text-[11px] font-medium text-gray-500">
        {label}
      </p>
      <p className="text-lg font-black text-gray-900 mt-0.5">
        {score}%
      </p>
    </div>
  );
};

const Insight = ({
  icon,
  title,
  value,
  description,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  type: "success" | "warning" | "danger";
}) => {
  const classes = {
    success: "bg-emerald-50 border-emerald-100",
    warning: "bg-amber-50 border-amber-100",
    danger: "bg-rose-50 border-rose-100",
  };

  return (
    <div className="border border-stone-200/80 rounded-2xl p-4 bg-stone-50/40">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 border ${classes[type]}`}>
        {icon}
      </div>
      <p className="font-bold text-sm text-gray-900">
        {title}
      </p>
      <p className="text-xs font-semibold text-gray-700 mt-0.5">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ScreeningResultsPage;
