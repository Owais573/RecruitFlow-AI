"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PromptInput } from "@/components/agents/PromptInput";
import { ResultPanel } from "@/components/agents/ResultPanel";
import { LoadingState } from "@/components/agents/LoadingState";
import { CandidateScore } from "@/components/agents/CandidateScore";
import { CandidateMatch } from "@/types/recruitment";
import { Check, AlertTriangle } from "lucide-react";

const EXAMPLE_JD = `Senior Data Centre Engineer
Requirements:
- 5+ years experience in a large-scale data centre environment.
- Deep expertise in Cisco networking and infrastructure support.
- Proven experience with fibre cabling and structural design.
- CCNP or equivalent certification preferred.
- Strong understanding of data centre power, cooling, and environmental controls.`;

const EXAMPLE_RESUME = `John Matthews
Network & Infrastructure Engineer

Experience:
Network Engineer at Telstra (2020 - Present)
- Managed core Cisco network infrastructure for Sydney CBD.
- Led data centre expansion projects including rack installation and power provisioning.
- Supervised fibre optic cabling rollouts across 3 major facilities.

Systems Admin at Optus (2017 - 2020)
- Handled server administration and basic networking support.

Certifications:
- CCNA Routing and Switching
- CompTIA Network+`;

export default function CandidateMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [candidateProfile, setCandidateProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CandidateMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !candidateProfile.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/match-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, candidateProfile }),
      });

      if (!response.ok) {
        throw new Error("Failed to match candidate");
      }

      const data: CandidateMatch = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#9fbbe0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
              MATCHING
            </div>
            <h1 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
              Candidate Match Agent
            </h1>
            <p className="mt-2 text-[16px] text-body">
              Compare a candidate's profile against job requirements to generate objective match scores and identify skill gaps.
            </p>
          </div>
        </div>

        {/* Input Section - Split Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromptInput
            label="Job Description"
            placeholder="Paste the job requirements..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            exampleText="JD Example"
            onUseExample={() => setJobDescription(EXAMPLE_JD)}
            onClear={() => setJobDescription("")}
          />
          <PromptInput
            label="Candidate Resume/Profile"
            placeholder="Paste the candidate's experience..."
            value={candidateProfile}
            onChange={(e) => setCandidateProfile(e.target.value)}
            exampleText="Resume Example"
            onUseExample={() => setCandidateProfile(EXAMPLE_RESUME)}
            onClear={() => setCandidateProfile("")}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !jobDescription.trim() || !candidateProfile.trim()}
            className="flex h-10 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-medium text-on-primary transition-colors hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-50"
          >
            Analyze Match
          </button>
        </div>
        {error && <p className="text-[14px] text-error text-right">{error}</p>}

        {/* Loading State */}
        {isLoading && <LoadingState message="Scoring candidate against role..." />}

        {/* Results Section */}
        {result && !isLoading && (
          <div className="space-y-6 animate-fade-in-up">
            
            {/* Top Score Card */}
            <div className="rounded-lg border border-hairline bg-surface-card p-8 flex flex-col md:flex-row items-center gap-8">
              <CandidateScore score={result.matchScore} />
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
                    {result.candidateName}
                  </h2>
                  <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] ${
                    result.recommendation === "Strong Candidate" ? "bg-surface-strong text-success" : 
                    result.recommendation === "Moderate Match" ? "bg-surface-strong text-[#c08532]" : 
                    "bg-surface-strong text-error"
                  }`}>
                    {result.recommendation}
                  </div>
                </div>
                <p className="text-[16px] text-ink">
                  {result.recruiterSummary}
                </p>
              </div>
            </div>

            {/* Strengths & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultPanel title="Verified Strengths" defaultOpen>
                <ul className="space-y-3">
                  {result.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[15px] text-ink">
                      <Check className="h-5 w-5 shrink-0 text-success mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </ResultPanel>

              <ResultPanel title="Missing Skills & Gaps" defaultOpen>
                <ul className="space-y-3">
                  {result.missingSkills.length > 0 ? result.missingSkills.map((gap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[15px] text-ink">
                      <AlertTriangle className="h-5 w-5 shrink-0 text-[#c08532] mt-0.5" />
                      <span>{gap}</span>
                    </li>
                  )) : (
                    <li className="text-[15px] text-muted italic">No significant gaps identified.</li>
                  )}
                </ul>
              </ResultPanel>
            </div>

            <ResultPanel title="Recommended Interview Questions">
              <ol className="list-decimal pl-5 space-y-3">
                {result.interviewQuestions.map((q, idx) => (
                  <li key={idx} className="text-[15px] text-ink pl-1">{q}</li>
                ))}
              </ol>
            </ResultPanel>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
