import { createContext, useContext, useState, type ReactNode } from "react";

import type { JobDescription } from "../types/hireup";

type ScreeningResult = any;

type ScreeningContextType = {
  job: JobDescription | null;
  resumes: File[];
  results: ScreeningResult | null;

  setJob: (job: JobDescription) => void;
  setResumes: (resumes: File[]) => void;
  setResults: (results: ScreeningResult) => void;

  clearScreening: () => void;
};

const ScreeningContext = createContext<ScreeningContextType | undefined>(
  undefined,
);

export function ScreeningProvider({ children }: { children: ReactNode }) {
  const [job, setJob] = useState<JobDescription | null>(null);

  const [resumes, setResumes] = useState<File[]>([]);

  const [results, setResults] = useState<ScreeningResult | null>(null);

  const clearScreening = () => {
    setJob(null);
    setResumes([]);
    setResults(null);
  };

  return (
    <ScreeningContext.Provider
      value={{
        job,
        resumes,
        results,
        setJob,
        setResumes,
        setResults,
        clearScreening,
      }}
    >
      {children}
    </ScreeningContext.Provider>
  );
}

export function useScreening() {
  const context = useContext(ScreeningContext);

  if (!context) {
    throw new Error("useScreening must be used inside ScreeningProvider");
  }

  return context;
}
