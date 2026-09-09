import { useState } from "react";
import { createJob } from "../../services/jobService";
import {
  getGuestUsage,
  getRemainingGuestUses,
  consumeGuestUse
} from '../../utils/guestUsage';

type Requirement = {
  title: string;
  description: string;
  type: "required" | "preferred";
};

function JobDescriptionForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [education, setEducation] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certificationInput, setCertificationInput] = useState("");
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [remainingGuestUses, setRemainingGuestUses] = useState(
  getRemainingGuestUses()
);

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

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const jobDescription = {
    jobTitle,
    description,
    experience: {
      min: minExperience,
      max: maxExperience
    },
    education,
    skills,
    certifications,
    requirements
  };

  const token = localStorage.getItem('access_token');

  if (!token) {
    console.error('Authentication token not found');
    return;
  }

  try {
    const data = await createJob(jobDescription, token);

    console.log('Job created successfully:', data);
  } catch (error) {
    console.error('Failed to create job:', error);
  }
};

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
  <strong>
    {remainingGuestUses} free screenings remaining
  </strong>
</div>
      <div>
        <h1>Create Job Description</h1>

        <label>Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
        />

        <label>Job Description</label>
        <input
          type="text"
          value={description}
          onChange={(event) => SetDescription(event.target.value)}
        />

        <label>Minimum Experience</label>
        <input
          type="number"
          min="0"
          value={minExperience}
          onChange={(event) => setMinExperience(Number(event.target.value))}
        />

        <label>Maximum Experience</label>
        <input
          type="number"
          min="0"
          value={maxExperience}
          onChange={(event) => setMaxExperience(Number(event.target.value))}
        />

        <label>Skill</label>
        <input
          type="text"
          placeholder="Enter a skill"
          value={skillInput}
          onChange={(event) => setSkillInput(event.target.value)}
        />
        <button type="button" onClick={addSkill}>
          Add Skill
        </button>
        <div>
          {skills.map((skill) => (
            <div key={skill}>
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => {
                  setSkills(skills.filter((item) => item !== skill));
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <label>Education</label>
        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={(event) => setEducation(event.target.value)}
        />

        <label>Certification</label>

        <input
          type="text"
          placeholder="Enter a certification"
          value={certificationInput}
          onChange={(event) => setCertificationInput(event.target.value)}
        />

        <button type="button" onClick={addCertification}>
          Add Certification
        </button>

        <div>
          {certifications.map((certification) => (
            <div key={certification}>
              <span>{certification}</span>

              <button
                type="button"
                onClick={() => {
                  setCertifications(
                    certifications.filter((item) => item !== certification),
                  );
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <h2>Additional Requirements</h2>

        {requirements.map((requirement, index) => (
          <div key={index}>
            <h3>Requirement {index + 1}</h3>

            <input
              type="text"
              placeholder="Requirement title"
              value={requirement.title}
              onChange={(event) =>
                updateRequirement(index, "title", event.target.value)
              }
            />

            <textarea
              placeholder="Requirement description"
              value={requirement.description}
              onChange={(event) =>
                updateRequirement(index, "description", event.target.value)
              }
            />

            <select
              value={requirement.type}
              onChange={(event) =>
                updateRequirement(index, "type", event.target.value)
              }
            >
              <option value="required">Required</option>
              <option value="preferred">Preferred</option>
            </select>

            <button type="button" onClick={() => removeRequirement(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addRequirement}>
          + Add Requirement
        </button>
      </div>

      <button type="submit">Create Job</button>

      <button
  type="button"
  onClick={() => {
    console.log('Before:', getGuestUsage());
    consumeGuestUse();
    console.log('After:', getGuestUsage());
    console.log('Remaining:', getRemainingGuestUses());
  }}
>
  Test Guest Usage
</button>
    </form>
  );
}

export default JobDescriptionForm;
