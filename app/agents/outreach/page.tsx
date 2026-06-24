"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PromptInput } from "@/components/agents/PromptInput";
import { LoadingState } from "@/components/agents/LoadingState";
import { CopyButton } from "@/components/agents/CopyButton";
import { OutreachMessages } from "@/types/recruitment";
import { cn } from "@/lib/utils";
import { Send, Mail, MessageSquare } from "lucide-react";

const EXAMPLE_CANDIDATE = `John Matthews
Current Role: Senior Network Engineer at Telstra (3 years)
Skills: Cisco Nexus, BGP, OSPF, Fibre installation
Location: Sydney
Not actively looking, but endorsed for cloud migrations.`;

const EXAMPLE_JOB = `Senior Data Centre Engineer
Client: Equinix (Sydney)
Focus: Large-scale data centre network expansions, transitioning to spine-leaf architecture.
Why it's good: Fast-growing team, huge budget, path to Lead Architect.`;

type TabType = "linkedin" | "email" | "followUp";

export default function OutreachPage() {
  const [candidateInfo, setCandidateInfo] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OutreachMessages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("linkedin");

  const handleGenerate = async () => {
    if (!candidateInfo.trim() || !jobInfo.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateInfo, jobInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate outreach messages");
      }

      const data: OutreachMessages = await response.json();
      setResult(data);
      setActiveTab("linkedin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveContent = () => {
    if (!result) return "";
    if (activeTab === "linkedin") return result.linkedinMessage;
    if (activeTab === "email") return result.emailMessage;
    return result.followUpMessage;
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#c0a8dd] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
              GENERATING
            </div>
            <h1 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
              Outreach Agent
            </h1>
            <p className="mt-2 text-[16px] text-body">
              Generate personalized, human-sounding outreach sequences based on candidate profiles and job context.
            </p>
          </div>
        </div>

        {/* Input Section - Split Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromptInput
            label="Candidate Context"
            placeholder="Paste candidate details, current role, or LinkedIn summary..."
            value={candidateInfo}
            onChange={(e) => setCandidateInfo(e.target.value)}
            exampleText="Candidate Example"
            onUseExample={() => setCandidateInfo(EXAMPLE_CANDIDATE)}
            onClear={() => setCandidateInfo("")}
          />
          <PromptInput
            label="Job Opportunity Context"
            placeholder="Key selling points of the role, company name, why they should care..."
            value={jobInfo}
            onChange={(e) => setJobInfo(e.target.value)}
            exampleText="Job Example"
            onUseExample={() => setJobInfo(EXAMPLE_JOB)}
            onClear={() => setJobInfo("")}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !candidateInfo.trim() || !jobInfo.trim()}
            className="flex h-10 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-medium text-on-primary transition-colors hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate Messages
          </button>
        </div>
        {error && <p className="text-[14px] text-error text-right">{error}</p>}

        {/* Loading State */}
        {isLoading && <LoadingState message="Drafting personalized outreach variants..." />}

        {/* Results Section */}
        {result && !isLoading && (
          <div className="animate-fade-in-up space-y-6">
            
            <div className="rounded-lg border border-hairline bg-surface-card overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-hairline bg-canvas-soft">
                <button
                  onClick={() => setActiveTab("linkedin")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.88px] transition-colors",
                    activeTab === "linkedin"
                      ? "border-primary text-ink bg-surface-card"
                      : "border-transparent text-muted hover:text-ink hover:bg-surface-card"
                  )}
                >
                  <Send className="h-4 w-4" />
                  LinkedIn InMail
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 border-b-2 border-l border-l-hairline px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.88px] transition-colors",
                    activeTab === "email"
                      ? "border-primary text-ink bg-surface-card"
                      : "border-transparent text-muted hover:text-ink hover:bg-surface-card"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  Cold Email
                </button>
                <button
                  onClick={() => setActiveTab("followUp")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 border-b-2 border-l border-l-hairline px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.88px] transition-colors",
                    activeTab === "followUp"
                      ? "border-primary text-ink bg-surface-card"
                      : "border-transparent text-muted hover:text-ink hover:bg-surface-card"
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                  Follow Up
                </button>
              </div>

              {/* Message Content */}
              <div className="p-8 relative group min-h-[250px]">
                <p className="text-[16px] text-ink whitespace-pre-wrap leading-relaxed">
                  {getActiveContent()}
                </p>
                
                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                  <span className="text-[13px] text-muted">
                    {getActiveContent().length} chars
                  </span>
                  <CopyButton text={getActiveContent()} />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </PageWrapper>
  );
}
