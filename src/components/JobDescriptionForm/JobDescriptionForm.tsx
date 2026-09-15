import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreening } from "../../context/ScreeningContext";
import type { JobDescription } from "../../types/hireup";
import toast from "react-hot-toast";

type Requirement = {
  title: string;
  description: string;
  type: "required" | "preferred";
};

function JobDescriptionForm() {
  const navigate = useNavigate();
  const { setJob } = useScreening();

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [education, setEducation] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certificationInput, setCertificationInput] = useState("");
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (skills.includes(skill)) {
      setSkillInput("");
      return;
    }
    setSkills([...skills, skill]);
    setSkillInput("");
  };

  const addCertification = () => {
    const certification = certificationInput.trim();
    if (!certification) return;
    if (certifications.includes(certification)) {
      setCertificationInput("");
      return;
    }
    setCertifications([...certifications, certification]);
    setCertificationInput("");
  };

  const addRequirement = () => {
    setRequirements([
      ...requirements,
      {
        title: "",
        description: "",
        type: "required",
      },
    ]);
  };

  const updateRequirement = (
    index: number,
    field: keyof Requirement,
    value: string,
  ) => {
    setRequirements(
      requirements.map((requirement, currentIndex) => {
        if (currentIndex === index) {
          return {
            ...requirement,
            [field]: value,
          };
        }
        return requirement;
      }),
    );
  };

  const removeRequirement = (index: number) => {
    setRequirements(
      requirements.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (maxExperience < minExperience) {
      toast.error("Maximum experience cannot be less than minimum experience.");
      return;
    }

    const jobDescription: JobDescription = {
      jobTitle: jobTitle.trim(),
      description: description.trim(),
      experience: {
        min: minExperience,
        max: maxExperience,
      },
      education: education.trim(),
      skills,
      certifications,
      requirements,
    };

    setJob(jobDescription);
    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Mesh Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" 
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#1254E7]/10 via-indigo-400/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Pipeline Stepper */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
            <span className="text-[#1254E7] flex items-center gap-1.5 font-bold">
              <span className="w-5 h-5 rounded-full bg-[#1254E7] text-white flex items-center justify-center text-[10px]">1</span>
              Define Criteria
            </span>
            <div className="h-0.5 flex-1 mx-3 bg-stone-200" />
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px]">2</span>
              Upload Resumes
            </span>
            <div className="h-0.5 flex-1 mx-3 bg-stone-200" />
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px]">3</span>
              AI Shortlist
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200/80 shadow-2xs px-3.5 py-1.5 rounded-full mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#1254E7] animate-pulse" />
            <span className="text-xs font-semibold text-[#1254E7] tracking-wide uppercase">
              AI Calibration Rubric
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Job Description
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Configure the baseline criteria our neural model will use to benchmark, score, and rank candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: General Details */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1254E7] font-bold text-sm flex items-center justify-center border border-blue-100">
                  01
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">General Role Details</h2>
                  <p className="text-xs text-gray-500">Core identification and role overview</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full-Stack React / Node Engineer"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                  className="w-full px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 transition-all text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Role Summary & Core Responsibilities <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline high-level responsibilities, product mission, and team structure..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 transition-all text-sm resize-none placeholder:text-gray-400 leading-relaxed"
                />
              </div>

              {/* Experience Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Min Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minExperience}
                    onChange={(event) => setMinExperience(Number(event.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 text-sm font-semibold transition-all"
                  />
                </div>
                <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Max Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={maxExperience}
                    onChange={(event) => setMaxExperience(Number(event.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Qualifications & Stack */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1254E7] font-bold text-sm flex items-center justify-center border border-blue-100">
                  02
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Qualifications & Technical Stack</h2>
                  <p className="text-xs text-gray-500">Skills, degrees, and industry credentials</p>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Required Competencies & Skills
                </label>
                {skills.length > 0 && (
                  <span className="text-[11px] font-semibold text-[#1254E7] bg-blue-50 px-2 py-0.5 rounded-md">
                    {skills.length} skills added
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter (e.g. Next.js, Docker, GraphQL)"
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 text-sm placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-[#1254E7]/20 text-sm whitespace-nowrap active:scale-95"
                >
                  + Add
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-blue-50/80 text-[#1254E7] text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200/60 shadow-2xs group"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => setSkills(skills.filter((item) => item !== skill))}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-blue-400 hover:bg-rose-100 hover:text-rose-600 transition-colors ml-0.5"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Education Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Education Requirement
              </label>
              <input
                type="text"
                placeholder="e.g. Bachelor's in CS, Software Engineering, or equivalent practical experience"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                className="w-full px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Certifications Input */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Certifications (Optional)
                </label>
                {certifications.length > 0 && (
                  <span className="text-[11px] font-semibold text-gray-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    {certifications.length} certifications
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AWS Solutions Architect, CKA, PMP"
                  value={certificationInput}
                  onChange={(event) => setCertificationInput(event.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCertification();
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-900 text-sm placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={addCertification}
                  className="bg-stone-800 hover:bg-stone-900 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-sm text-sm whitespace-nowrap active:scale-95"
                >
                  + Add
                </button>
              </div>

              {certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {certifications.map((certification) => (
                    <span
                      key={certification}
                      className="inline-flex items-center gap-1.5 bg-stone-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs"
                    >
                      <span>{certification}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCertifications(certifications.filter((item) => item !== certification))
                        }
                        className="w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition-colors ml-0.5"
                        aria-label={`Remove ${certification}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Custom Evaluation Criteria */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6 transition-all hover:shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-100 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1254E7] font-bold text-sm flex items-center justify-center border border-blue-100">
                  03
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Custom Evaluation Criteria</h2>
                  <p className="text-xs text-gray-500">Fine-tune the weights our AI scores against</p>
                </div>
              </div>

              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-[#1254E7] border border-blue-200/60 font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-2xs"
              >
                <span>+ Add Requirement</span>
              </button>
            </div>

            {requirements.length === 0 ? (
              <div className="text-center py-12 px-4 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">No custom requirements added yet</p>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Click "+ Add Requirement" to define specific criteria like system scale, leadership traits, or domain know-how.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="p-5 bg-stone-50/70 border border-stone-200/80 rounded-2xl space-y-4 relative transition-all hover:border-[#1254E7]/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold text-[#1254E7] uppercase tracking-wider bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                          Criterion #{index + 1}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          requirement.type === "required"
                            ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                            : "bg-amber-50 text-amber-700 border border-amber-200/60"
                        }`}>
                          {requirement.type}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-stone-400 hover:text-rose-600 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Criterion title (e.g. Distributed Systems Architecture)"
                          value={requirement.title}
                          onChange={(event) =>
                            updateRequirement(index, "title", event.target.value)
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7]"
                        />
                      </div>
                      <div>
                        <select
                          value={requirement.type}
                          onChange={(event) =>
                            updateRequirement(index, "type", event.target.value as "required" | "preferred")
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7]"
                        >
                          <option value="required">Required (Must have)</option>
                          <option value="preferred">Preferred (Nice to have)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Explain what candidate qualifications or evidence fulfill this requirement..."
                        value={requirement.description}
                        onChange={(event) =>
                          updateRequirement(index, "description", event.target.value)
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action: Sticky Glassmorphic Footer */}
          <div className="sticky bottom-4 z-20 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 hidden sm:block">
              <span className="font-semibold text-gray-900">{skills.length}</span> skills •{" "}
              <span className="font-semibold text-gray-900">{requirements.length}</span> custom criteria configured
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#1254E7]/25 hover:shadow-xl hover:shadow-[#1254E7]/35 transition-all duration-200 transform hover:-translate-y-0.5 text-sm group"
            >
              <span>Save & Continue to Upload Resumes</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default JobDescriptionForm;
