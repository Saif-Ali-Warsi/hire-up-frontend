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
} from "lucide-react";

import { useScreening } from "../context/ScreeningContext";

const ScreeningResultsPage = () => {
  const { results, job } = useScreening();
  const navigate = useNavigate();

  const [expandedCandidate, setExpandedCandidate] =
    useState<number | null>(null);

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
    (item: any) =>
      item.evaluation?.hardRequirementFailed
  ).length;

  const getScoreClass = (score: number) => {
    if (score >= 85) {
      return "text-emerald-600";
    }

    if (score >= 65) {
      return "text-amber-600";
    }

    return "text-red-600";
  };

  const getTierBadge = (tier: string) => {
    if (tier === "Tier 1") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (tier === "Tier 2") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  const getStatusIcon = (status: string) => {
    if (status === "MATCHED") {
      return (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      );
    }

    if (status === "EXPLICITLY_NOT_MATCHED") {
      return (
        <XCircle className="w-4 h-4 text-red-500" />
      );
    }

    return (
      <AlertCircle className="w-4 h-4 text-amber-500" />
    );
  };

  const toggleCandidate = (index: number) => {
    setExpandedCandidate(
      expandedCandidate === index ? null : index
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

          <div>
            <div className="inline-flex items-center gap-2 bg-[#1254E7]/10 text-[#1254E7] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              <CheckCircle2 className="w-4 h-4" />
              AI Screening Complete
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900">
              Screening Results
            </h1>

            <p className="text-gray-500 mt-1">
              Showing candidate matches for{" "}
              <span className="font-semibold text-gray-900">
                {job?.jobTitle}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/job")}
            className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            New Screening
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <MetricCard
            icon={<Users className="w-5 h-5" />}
            label="Candidates Screened"
            value={totalCandidates}
          />

          <MetricCard
            icon={<Target className="w-5 h-5" />}
            label="Average Match"
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

        {/* Screening Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900">
                Candidate Ranking
              </h2>

              <p className="text-sm text-gray-500">
                Candidates ranked by overall AI match score
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {tier3Count} Tier 3
            </span>
          </div>

          {/* Candidates */}
          <div className="space-y-4">

            {sortedCandidates.map(
              (item: any, index: number) => {

                const candidate =
                  item.candidate || {};

                const evaluation =
                  item.evaluation || {};

                const score =
                  evaluation.overallScore || 0;

                const isExpanded =
                  expandedCandidate === index;

                const skills =
                  evaluation.skills || {};

                return (
                  <div
                    key={`${item.fileName}-${index}`}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >

                    {/* Candidate row */}
                    <div className="p-5">

                      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                        {/* Rank */}
                        <div className="w-10 h-10 rounded-xl bg-[#1254E7]/10 text-[#1254E7] flex items-center justify-center font-bold shrink-0">
                          #{index + 1}
                        </div>

                        {/* Candidate information */}
                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-lg font-bold text-gray-900">
                              {candidate.name ||
                                item.fileName}
                            </h3>

                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getTierBadge(
                                evaluation.tier
                              )}`}
                            >
                              {evaluation.tier}
                            </span>

                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            {candidate.headline ||
                              "Candidate"}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {item.fileName}
                          </p>

                        </div>

                        {/* Score */}
                        <div className="text-right">

                          <div
                            className={`text-3xl font-extrabold ${getScoreClass(
                              score
                            )}`}
                          >
                            {score}%
                          </div>

                          <div className="text-xs text-gray-400 uppercase tracking-wide">
                            Match Score
                          </div>

                        </div>

                        {/* Expand */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleCandidate(index)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          {isExpanded ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>

                      </div>

                      {/* Score bar */}
                      <div className="mt-5">

                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-[#1254E7] rounded-full transition-all"
                            style={{
                              width: `${score}%`,
                            }}
                          />

                        </div>

                      </div>

                      {/* Quick metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">

                        <MatchItem
                          label="Experience"
                          status={
                            evaluation.experience?.status
                          }
                        />

                        <MatchItem
                          label="Skills"
                          status={
                            evaluation.skills?.status
                          }
                        />

                        <MatchItem
                          label="Education"
                          status={
                            evaluation.education?.status
                          }
                        />

                        <MatchItem
                          label="Certifications"
                          status={
                            evaluation.certifications?.status
                          }
                        />

                      </div>

                    </div>

                    {/* Details */}
                    {isExpanded && (

                      <div className="border-t border-gray-200 bg-gray-50 p-5">

                        {/* Summary */}
                        {candidate.summary && (
                          <div className="mb-6">
                            <h4 className="font-bold text-gray-900 mb-2">
                              Candidate Summary
                            </h4>

                            <p className="text-sm text-gray-600 leading-relaxed">
                              {candidate.summary}
                            </p>
                          </div>
                        )}

                        {/* Score breakdown */}
                        <div className="mb-6">

                          <h4 className="font-bold text-gray-900 mb-3">
                            Score Breakdown
                          </h4>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                            <ScoreBox
                              label="Experience"
                              score={
                                evaluation.experience
                                  ?.score || 0
                              }
                            />

                            <ScoreBox
                              label="Skills"
                              score={
                                evaluation.skills
                                  ?.score || 0
                              }
                            />

                            <ScoreBox
                              label="Education"
                              score={
                                evaluation.education
                                  ?.score || 0
                              }
                            />

                            <ScoreBox
                              label="Certifications"
                              score={
                                evaluation.certifications
                                  ?.score || 0
                              }
                            />

                          </div>

                        </div>

                        {/* Skills */}
                        <div className="mb-6">

                          <h4 className="font-bold text-gray-900 mb-3">
                            Skills Match
                          </h4>

                          <div className="flex flex-wrap gap-2">

                            {skills.matched?.map(
                              (skill: string) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {skill}
                                </span>
                              )
                            )}

                            {skills.missing?.map(
                              (skill: string) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  {skill}
                                </span>
                              )
                            )}

                          </div>

                        </div>

                        {/* Requirements */}
                        {evaluation.requirements?.length > 0 && (

                          <div>

                            <h4 className="font-bold text-gray-900 mb-3">
                              Additional Requirements
                            </h4>

                            <div className="space-y-3">

                              {evaluation.requirements.map(
                                (
                                  requirement: any,
                                  requirementIndex: number
                                ) => (

                                  <div
                                    key={requirementIndex}
                                    className="bg-white border border-gray-200 rounded-xl p-4"
                                  >

                                    <div className="flex items-start gap-3">

                                      {getStatusIcon(
                                        requirement.status
                                      )}

                                      <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-2">

                                          <h5 className="font-semibold text-gray-900">
                                            {requirement.title}
                                          </h5>

                                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                                            {requirement.type}
                                          </span>

                                        </div>

                                        <p className="text-sm text-gray-600 mt-1">
                                          {requirement.reason}
                                        </p>

                                      </div>

                                      <span className="font-bold text-sm text-gray-700">
                                        {requirement.score}%
                                      </span>

                                    </div>

                                  </div>

                                )
                              )}

                            </div>

                          </div>

                        )}

                        {/* Hard requirement warning */}
                        {evaluation.hardRequirementFailed && (
                          <div className="mt-5 flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">

                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />

                            <div>
                              <p className="font-semibold text-red-800">
                                Required criteria not met
                              </p>

                              <p className="text-sm text-red-700 mt-1">
                                This candidate has failed at least one
                                explicitly required condition.
                              </p>
                            </div>

                          </div>
                        )}

                      </div>

                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* Screening insight */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

          <h2 className="font-bold text-gray-900 mb-4">
            Screening Overview
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">

            <Insight
              icon={<CheckCircle2 />}
              title="Tier 1"
              value={`${tier1Count} candidates`}
              description="Strong matches worth prioritizing."
              type="success"
            />

            <Insight
              icon={<AlertCircle />}
              title="Tier 2"
              value={`${tier2Count} candidates`}
              description="Potential matches requiring review."
              type="warning"
            />

            <Insight
              icon={<XCircle />}
              title="Tier 3"
              value={`${tier3Count} candidates`}
              description="Lower match based on available evidence."
              type="danger"
            />

          </div>

          {hardFailures > 0 && (
            <p className="text-sm text-gray-500 mt-5">
              {hardFailures} candidate
              {hardFailures > 1 ? "s" : ""} failed
              at least one explicitly required criterion.
            </p>
          )}

        </div>

      </div>
    </div>
  );
};


/* -------------------------------- */
/* Supporting components */
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
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="w-9 h-9 rounded-lg bg-[#1254E7]/10 text-[#1254E7] flex items-center justify-center mb-4">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="text-2xl font-extrabold text-gray-900 mt-1">
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
    <div className="flex items-center gap-2 text-xs">

      {matched ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      ) : failed ? (
        <XCircle className="w-4 h-4 text-red-500" />
      ) : (
        <AlertCircle className="w-4 h-4 text-amber-500" />
      )}

      <span className="text-gray-600">
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
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="text-xl font-bold text-gray-900 mt-1">
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
    success:
      "bg-emerald-50 text-emerald-600",
    warning:
      "bg-amber-50 text-amber-600",
    danger:
      "bg-red-50 text-red-600",
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4">

      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${classes[type]}`}
      >
        {icon}
      </div>

      <p className="font-semibold text-gray-900">
        {title}
      </p>

      <p className="text-sm font-medium text-gray-700 mt-1">
        {value}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {description}
      </p>

    </div>
  );
};


export default ScreeningResultsPage;