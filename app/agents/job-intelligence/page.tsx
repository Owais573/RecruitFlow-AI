"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PromptInput } from "@/components/agents/PromptInput";
import { ResultPanel } from "@/components/agents/ResultPanel";
import { LoadingState } from "@/components/agents/LoadingState";
import { CopyButton } from "@/components/agents/CopyButton";
import { ExportButton } from "@/components/agents/ExportButton";
import { RoleAnalysis } from "@/types/recruitment";
import { Check } from "lucide-react";

const EXAMPLE_JD = `Senior Data Centre Engineer
Location: Sydney, NSW
Company: Top-Tier Telecom Provider

We are seeking a highly experienced Senior Data Centre Engineer to join our infrastructure team in Sydney. You will be responsible for the end-to-end delivery of data centre projects, focusing on fibre cabling, network infrastructure, and power/cooling optimization.

Key Responsibilities:
- Manage complex data centre migrations and capacity planning.
- Implement and troubleshoot Cisco networking equipment (Nexus switches, routers).
- Oversee large-scale fibre optic cabling installations and documentation.
- Coordinate with vendors for hardware procurement and SLA management.

Requirements:
- 5+ years experience in a large-scale data centre environment.
- Deep expertise in Cisco networking and infrastructure support.
- Proven experience with fibre cabling and structural design.
- CCNP or equivalent certification preferred.
- Strong understanding of data centre power, cooling, and environmental controls.`;

export default function JobIntelligencePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RoleAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze job description");
      }

      const data: RoleAnalysis = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#dfa88f] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
              ANALYZING
            </div>
            <h1 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
              Job Intelligence Agent
            </h1>
            <p className="mt-2 text-[16px] text-body">
              Paste a job description to instantly generate role insights, boolean search strings, and screening questions.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <PromptInput
            label="Job Description"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            exampleText={EXAMPLE_JD}
            onUseExample={() => setJobDescription(EXAMPLE_JD)}
            onClear={() => setJobDescription("")}
          />
          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !jobDescription.trim()}
              className="flex h-10 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-medium text-on-primary transition-colors hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-50"
            >
              Analyze Role
            </button>
          </div>
          {error && <p className="text-[14px] text-error">{error}</p>}
        </div>

        {/* Loading State */}
        {isLoading && <LoadingState message="Analyzing role requirements..." />}

        {/* Results Section */}
        {result && !isLoading && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-end gap-3 mb-4">
              <CopyButton text={JSON.stringify(result, null, 2)} />
              <ExportButton data={JSON.stringify(result, null, 2)} filename="job-analysis.json" />
            </div>

            <ResultPanel title="Role Summary">
              <p className="text-[16px] text-ink">{result.roleSummary}</p>
            </ResultPanel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultPanel title="Critical Skills">
                <div className="flex flex-wrap gap-2">
                  {result.criticalSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 rounded-full bg-surface-strong px-3 py-1 text-[13px] text-ink">
                      <Check className="h-3.5 w-3.5 text-success" />
                      {skill}
                    </div>
                  ))}
                </div>
              </ResultPanel>

              <ResultPanel title="Nice-to-Have Skills">
                <div className="flex flex-wrap gap-2">
                  {result.niceToHaveSkills.map((skill, idx) => (
                    <div key={idx} className="rounded-full bg-surface-strong/50 border border-hairline px-3 py-1 text-[13px] text-muted">
                      {skill}
                    </div>
                  ))}
                </div>
              </ResultPanel>
            </div>

            <ResultPanel title="LinkedIn Boolean Search">
              <div className="rounded-lg border border-hairline bg-surface-card p-5 relative group">
                <code className="font-mono text-[13px] text-ink block whitespace-pre-wrap">
                  {result.booleanSearchStrings}
                </code>
                <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={result.booleanSearchStrings} />
                </div>
              </div>
            </ResultPanel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultPanel title="Target Companies">
                <div className="flex flex-wrap gap-2">
                  {result.targetCompanies.map((company, idx) => (
                    <div key={idx} className="rounded-full bg-surface-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
                      {company}
                    </div>
                  ))}
                </div>
              </ResultPanel>

              <ResultPanel title="Candidate Persona">
                <p className="text-[14px] text-ink">{result.candidatePersona}</p>
              </ResultPanel>
            </div>

            <ResultPanel title="Screening Questions">
              <ol className="list-decimal pl-5 space-y-3">
                {result.screeningQuestions.map((q, idx) => (
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
