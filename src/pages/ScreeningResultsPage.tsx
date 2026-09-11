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
      (a, b) =>
        (b.evaluation?.overallScore || 0) -
        (a.evaluation?.overallScore || 0)
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

  const getScoreClass = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50/80 border-emerald-100";
    if (score >= 65) return "text-amber-600 bg-amber-50/80 border-amber-100";
    return "text-red-600 bg-red-50/80 border-red-100";
  };

  const getTierBadge = (tier: string) => {
    if (tier === "Tier 1") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (tier === "Tier 2") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status: string) => {
    if (status === "MATCHED") return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
    if (status === "EXPLICITLY_NOT_MATCHED") return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
    return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
  };

  const toggleCandidate = (index: number) => {
    setExpandedCandidate(expandedCandidate === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8f3eb]/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <button
              onClick={() => navigate("/job")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#1254E7] transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Job Setup
            </button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Screening Results
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-[#1254E7]/10 text-[#1254E7] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" /> AI Verified
              </span>
            </div>

            <p className="text-gray-600 mt-1.5">
              Ranked candidate evaluations for{" "}
              <span className="font-semibold text-gray-900">
                {job?.jobTitle || "the position"}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/job")}
            className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-[#1254E7]/20 transition-all flex items-center justify-center gap-2"
          >
            New Screening
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            label="Candidates Screened"
            value={totalCandidates}
          />
          <MetricCard
            icon={<Target className="w-5 h-5" />}
            label="Average Match Score"
            value={`${averageScore}%`}
          />
          <MetricCard
            icon={<Trophy className="w-5 h-5" />}
            label="Tier 1 Candidates"
            value={tier1Count}
          />
          <MetricCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="Tier 2 Candidates"
            value={tier2Count}
          />
        </div>

        {/* Candidate Ranking Section */}
        <div className="bg-white border border-gray-200/80 shadow-sm rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Candidate Ranking
              </h2>
              <p className="text-sm text-gray-500">
                Sorted by AI compatibility score and requirement fulfillment
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200/60">
              <span>{tier3Count} Tier 3 Review</span>
            </div>
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            {sortedCandidates.map((item: any, index: number) => {
              const candidate = item.candidate || {};
              const evaluation = item.evaluation || {};
              const score = evaluation.overallScore || 0;
              const isExpanded = expandedCandidate === index;
              const skills = evaluation.skills || {};

              return (
                <div
                  key={`${item.fileName}-${index}`}
                  className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white hover:border-gray-300 transition-all shadow-2xs"
                >
                  {/* Candidate Row Summary */}
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      
                      {/* Rank badge */}
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
                        #{index + 1}
                      </div>

                      {/* Candidate info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base font-bold text-gray-900 truncate">
                            {candidate.name || item.fileName}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getTierBadge(
                              evaluation.tier
                            )}`}
                          >
                            {evaluation.tier || "Unranked"}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-0.5 truncate">
                          {candidate.headline || "Candidate Profile"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">
                          {item.fileName}
                        </p>
                      </div>

                      {/* Score Badge */}
                      <div className="flex items-center gap-4 justify-between lg:justify-end">
                        <div className={`px-3.5 py-1.5 rounded-xl border text-right ${getScoreClass(score)}`}>
                          <div className="text-2xl font-black tracking-tight">
                            {score}%
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                            Match Score
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCandidate(index)}
                          className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                          aria-label="Toggle details"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1254E7] rounded-full transition-all duration-500"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Core Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-gray-100">
                      <MatchItem label="Experience" status={evaluation.experience?.status} />
                      <MatchItem label="Skills" status={evaluation.skills?.status} />
                      <MatchItem label="Education" status={evaluation.education?.status} />
                      <MatchItem label="Certifications" status={evaluation.certifications?.status} />
                    </div>
                  </div>

                  {/* Expanded Details Section */}
                  {isExpanded && (
                    <div className="border-t border-gray-200/80 bg-gray-50/70 p-6 space-y-6">
                      
                      {/* Candidate Summary */}
                      {candidate.summary && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200/60">
                          <h4 className="font-bold text-sm text-gray-900 mb-1.5">
                            Candidate Summary
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {candidate.summary}
                          </p>
                        </div>
                      )}

                      {/* Score Breakdown Boxes */}
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-3">
                          Score Breakdown
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <ScoreBox label="Experience" score={evaluation.experience?.score || 0} />
                          <ScoreBox label="Skills" score={evaluation.skills?.score || 0} />
                          <ScoreBox label="Education" score={evaluation.education?.score || 0} />
                          <ScoreBox label="Certifications" score={evaluation.certifications?.score || 0} />
                        </div>
                      </div>

                      {/* Skills Analysis */}
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-3">
                          Skills Alignment
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.matched?.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-lg text-xs font-medium"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {skill}
                            </span>
                          ))}
                          {skills.missing?.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200/80 rounded-lg text-xs font-medium"
                            >
                              <XCircle className="w-3.5 h-3.5 text-red-600" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Additional Requirements */}
                      {evaluation.requirements?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 mb-3">
                            Additional Requirements Check
                          </h4>
                          <div className="space-y-2.5">
                            {evaluation.requirements.map((requirement: any, reqIdx: number) => (
                              <div
                                key={reqIdx}
                                className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex items-start justify-between gap-3"
                              >
                                <div className="flex items-start gap-3">
                                  {getStatusIcon(requirement.status)}
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h5 className="font-semibold text-xs text-gray-900">
                                        {requirement.title}
                                      </h5>
                                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-md text-gray-500 font-mono">
                                        {requirement.type}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1 leading-normal">
                                      {requirement.reason}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-bold text-xs text-gray-700 shrink-0">
                                  {requirement.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Hard Requirement Warning */}
                      {evaluation.hardRequirementFailed && (
                        <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm text-red-800">
                              Required criteria not met
                            </p>
                            <p className="text-xs text-red-700 mt-0.5">
                              This candidate failed at least one explicitly mandatory qualification.
                            </p>
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

        {/* Screening Insight Footer Overview */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">
            Screening Pipeline Summary
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Insight
              icon={<CheckCircle2 className="w-5 h-5" />}
              title="Tier 1"
              value={`${tier1Count} candidates`}
              description="High-compatibility matches primed for immediate outreach."
              type="success"
            />
            <Insight
              icon={<AlertCircle className="w-5 h-5" />}
              title="Tier 2"
              value={`${tier2Count} candidates`}
              description="Conditional matches requiring closer manual screening."
              type="warning"
            />
            <Insight
              icon={<XCircle className="w-5 h-5" />}
              title="Tier 3"
              value={`${tier3Count} candidates`}
              description="Low compatibility profile based on uploaded evidence."
              type="danger"
            />
          </div>

          {hardFailures > 0 && (
            <p className="text-xs text-gray-500 mt-5 pt-4 border-t border-gray-100">
              * Note: {hardFailures} candidate{hardFailures > 1 ? "s" : ""} failed mandatory criteria filters.
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-[#1254E7]/10 text-[#1254E7] flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>
      <p className="text-2xl font-black text-gray-900 mt-1 tracking-tight">
        {value}
      </p>
    </div>
  );
};

const MatchItem = ({
  label,
  status,
}: {
  label: string;
  status?: string;
}) => {
  const matched = status === "MATCHED";
  const failed = status === "EXPLICITLY_NOT_MATCHED";

  return (
    <div className="flex items-center gap-2 text-xs bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-200/60">
      {matched ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
      ) : failed ? (
        <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      )}
      <span className="text-gray-700 font-medium truncate">
        {label}
      </span>
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
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
      <p className="text-[11px] font-medium text-gray-500">
        {label}
      </p>
      <p className="text-lg font-bold text-gray-900 mt-0.5">
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
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    danger: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="border border-gray-200/80 rounded-xl p-4 bg-gray-50/40">
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