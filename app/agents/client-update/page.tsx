"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PromptInput } from "@/components/agents/PromptInput";
import { ResultPanel } from "@/components/agents/ResultPanel";
import { LoadingState } from "@/components/agents/LoadingState";
import { CopyButton } from "@/components/agents/CopyButton";
import { ClientUpdate } from "@/types/recruitment";

const EXAMPLE_DATA = `Role: Senior Data Centre Engineer for Equinix
Market is tight this week.
Contacted 45 people.
12 replied.
Screened 4.
2 are really good (John M. and Sarah T.) - sending their CVs over today.
1 was too expensive (180k).
Next week focusing on reaching out to people at NextDC.`;

export default function ClientUpdatePage() {
  const [activityData, setActivityData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClientUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!activityData.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/client-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate client update");
      }

      const data: ClientUpdate = await response.json();
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
            <div className="mb-3 inline-flex rounded-full bg-[#c08532] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-[#ffffff]">
              COMPLETE
            </div>
            <h1 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
              Client Update Agent
            </h1>
            <p className="mt-2 text-[16px] text-body">
              Transform raw recruiter notes and weekly metrics into a polished, professional client update email.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <PromptInput
            label="Raw Activity Data"
            placeholder="Paste your rough notes, numbers, and plan for next week..."
            value={activityData}
            onChange={(e) => setActivityData(e.target.value)}
            exampleText="Use Example Notes"
            onUseExample={() => setActivityData(EXAMPLE_DATA)}
            onClear={() => setActivityData("")}
          />
          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !activityData.trim()}
              className="flex h-10 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-medium text-on-primary transition-colors hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-50"
            >
              Generate Report
            </button>
          </div>
          {error && <p className="text-[14px] text-error">{error}</p>}
        </div>

        {/* Loading State */}
        {isLoading && <LoadingState message="Formatting professional client update..." />}

        {/* Results Section */}
        {result && !isLoading && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="rounded-lg border border-hairline bg-surface-card overflow-hidden">
              <div className="border-b border-hairline bg-canvas-soft px-6 py-4">
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.88px] text-muted w-20">Subject:</span>
                  <span className="text-[15px] font-medium text-ink">{result.subjectLine}</span>
                </div>
              </div>
              <div className="p-8 relative group">
                <p className="text-[16px] text-ink whitespace-pre-wrap leading-relaxed">
                  {result.emailBody}
                </p>
                <div className="mt-8">
                  <h4 className="text-[13px] font-semibold uppercase tracking-[0.88px] text-muted mb-3">
                    Next Steps
                  </h4>
                  <p className="text-[16px] text-ink whitespace-pre-wrap leading-relaxed">
                    {result.nextSteps}
                  </p>
                </div>
                
                <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={`Subject: ${result.subjectLine}\n\n${result.emailBody}\n\nNext Steps:\n${result.nextSteps}`} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
