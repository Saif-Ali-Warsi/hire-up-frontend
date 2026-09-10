export type Requirement = {
  title: string;
  description: string;
  type: "required" | "preferred";
};

export type JobDescription = {
  jobTitle: string;
  description: string;
  experience: {
    min: number;
    max: number;
  };
  education: string;
  skills: string[];
  certifications: string[];
  requirements: Requirement[];
};
