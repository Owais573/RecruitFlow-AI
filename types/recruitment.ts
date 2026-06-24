export interface RoleAnalysis {
  roleSummary: string;
  criticalSkills: string[];
  niceToHaveSkills: string[];
  candidatePersona: string;
  booleanSearchStrings: string;
  targetCompanies: string[];
  screeningQuestions: string[];
}

export interface CandidateMatch {
  candidateName: string;
  matchScore: number; // 0-100
  recommendation: "Strong Candidate" | "Moderate Match" | "Weak Match";
  strengths: string[];
  missingSkills: string[];
  recruiterSummary: string;
  interviewQuestions: string[];
}

export interface OutreachMessages {
  linkedinMessage: string;
  emailMessage: string;
  followUpMessage: string;
}

export interface ClientUpdate {
  subjectLine: string;
  emailBody: string;
  nextSteps: string;
}
