import { useNavigate } from "react-router-dom";
import { useScreening } from "../../context/ScreeningContext";
import type { JobDescription } from "../../types/hireup";
import { useState } from "react";

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

    if (!skill) {
      return;
    }

    setSkills([...skills, skill]);
    setSkillInput("");
  };

  const addCertification = () => {
    const certification = certificationInput.trim();

    if (!certification) {
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
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#1254E7] font-semibold text-sm uppercase tracking-wider bg-[#1254E7]/10 px-3.5 py-1.5 rounded-full mb-3">
            AI Screening Setup
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Job Description
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Define your role requirements so our AI engine can precisely evaluate and rank candidate resumes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              1. General Role Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description Summary</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide a comprehensive summary of responsibilities..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    value={minExperience}
                    onChange={(event) => setMinExperience(Number(event.target.value))}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    value={maxExperience}
                    onChange={(event) => setMaxExperience(Number(event.target.value))}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skills & Qualifications */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              2. Qualifications & Technical Stack
            </h2>

            {/* Skills Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Required Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a skill (e.g. React, TypeScript)"
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); }}}
                  className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
                />
                <button 
                  type="button" 
                  onClick={addSkill}
                  className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-[#1254E7]/20 text-sm whitespace-nowrap"
                >
                  Add Skill
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1.5 bg-[#1254E7]/10 text-[#1254E7] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#1254E7]/20"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => setSkills(skills.filter((item) => item !== skill))}
                        className="text-[#1254E7] hover:text-red-600 font-bold ml-1 transition-colors"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Education Requirement</label>
              <input
                type="text"
                placeholder="e.g. Bachelor's in Computer Science or equivalent"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
              />
            </div>

            {/* Certifications Input */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-700">Certifications</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a certification (e.g. AWS Certified Developer)"
                  value={certificationInput}
                  onChange={(event) => setCertificationInput(event.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCertification(); }}}
                  className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] text-gray-800 transition-all text-sm"
                />
                <button 
                  type="button" 
                  onClick={addCertification}
                  className="bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-[#1254E7]/20 text-sm whitespace-nowrap"
                >
                  Add Certification
                </button>
              </div>

              {certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {certifications.map((certification) => (
                    <span 
                      key={certification} 
                      className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200"
                    >
                      {certification}
                      <button
                        type="button"
                        onClick={() => setCertifications(certifications.filter((item) => item !== certification))}
                        className="text-gray-400 hover:text-red-600 font-bold ml-1 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Additional Requirements */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">3. Additional Requirements</h2>
                <p className="text-xs text-gray-500 mt-0.5">Add custom evaluation criteria (required or preferred)</p>
              </div>
              <button 
                type="button" 
                onClick={addRequirement}
                className="inline-flex items-center gap-1.5 bg-[#1254E7]/10 hover:bg-[#1254E7]/20 text-[#1254E7] font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                <span>+ Add Requirement</span>
              </button>
            </div>

            {requirements.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                No custom requirements added yet. Click "+ Add Requirement" above.
              </div>
            ) : (
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="p-5 bg-gray-50/70 border border-gray-200/80 rounded-xl space-y-4 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1254E7] uppercase tracking-wider">
                        Requirement #{index + 1}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => removeRequirement(index)}
                        className="text-gray-400 hover:text-red-600 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Requirement title (e.g. Cloud Experience)"
                          value={requirement.title}
                          onChange={(event) => updateRequirement(index, "title", event.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7]"
                        />
                      </div>
                      <div>
                        <select
                          value={requirement.type}
                          onChange={(event) => updateRequirement(index, "type", event.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7]"
                        >
                          <option value="required">Required</option>
                          <option value="preferred">Preferred</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Detailed description for the AI matching engine..."
                        value={requirement.description}
                        onChange={(event) => updateRequirement(index, "description", event.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1254E7]/20 focus:border-[#1254E7] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action Sticky Footer */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg flex items-center justify-end sticky bottom-4 z-20">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5 text-base"
            >
              <span>Create Job & Continue to Upload</span>
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default JobDescriptionForm;