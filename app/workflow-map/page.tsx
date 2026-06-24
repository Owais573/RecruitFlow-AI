"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArrowRight, Clock, Zap, Target, LineChart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKFLOW_STAGES = [
  {
    id: "sourcing",
    title: "1. Role Analysis & Sourcing",
    icon: Target,
    manual: {
      desc: "Recruiters manually read 5-page JDs, extract skills, and trial-and-error boolean strings on LinkedIn.",
      time: "45 mins / role",
      painPoint: "Inconsistent boolean strings lead to missed candidates."
    },
    ai: {
      desc: "Job Intelligence Agent instantly parses JD, extracts critical skills, and generates optimized boolean strings.",
      time: "1 min / role",
      agentLink: "/agents/job-intelligence",
      pillColor: "bg-[#dfa88f]", // peach
      pillLabel: "ANALYZING"
    }
  },
  {
    id: "screening",
    title: "2. Candidate Screening & Matching",
    icon: LineChart,
    manual: {
      desc: "Visually scanning 100+ resumes against complex technical requirements (Cisco, Data Centres).",
      time: "3-4 hours / batch",
      painPoint: "High risk of human error or unconscious bias."
    },
    ai: {
      desc: "Candidate Match Agent scores profiles objectively against requirements and flags missing skills instantly.",
      time: "10 mins / batch",
      agentLink: "/agents/candidate-match",
      pillColor: "bg-[#9fbbe0]", // blue
      pillLabel: "MATCHING"
    }
  },
  {
    id: "outreach",
    title: "3. Passive Outreach",
    icon: MessageSquare,
    manual: {
      desc: "Copy-pasting generic templates, manually replacing names, or struggling with writer's block.",
      time: "1 hour / 10 candidates",
      painPoint: "Low response rates from generic messaging."
    },
    ai: {
      desc: "Outreach Agent drafts hyper-personalized InMails and emails based on candidate's exact background.",
      time: "2 mins / 10 candidates",
      agentLink: "/agents/outreach",
      pillColor: "bg-[#c0a8dd]", // lavender
      pillLabel: "GENERATING"
    }
  },
  {
    id: "updates",
    title: "4. Client Reporting",
    icon: Zap,
    manual: {
      desc: "Gathering metrics from ATS, formatting emails, and writing summaries for hiring managers.",
      time: "45 mins / client",
      painPoint: "Often delayed or skipped due to high workload."
    },
    ai: {
      desc: "Client Update Agent transforms raw notes into professional, ready-to-send pipeline reports.",
      time: "2 mins / client",
      agentLink: "/agents/client-update",
      pillColor: "bg-[#c08532]", // gold
      pillLabel: "COMPLETE"
    }
  }
];

export default function WorkflowMapPage() {
  const [activeStageId, setActiveStageId] = useState("sourcing");
  const activeStage = WORKFLOW_STAGES.find(s => s.id === activeStageId)!;

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-[36px] font-normal tracking-[-0.72px] text-ink mb-3">
            Workflow Automation Map
          </h1>
          <p className="text-[18px] text-body max-w-[800px] leading-relaxed">
            A strategic review of your current recruitment process, identifying high-impact 
            automation opportunities using specialized AI agents. Designed specifically for 
            high-volume technical and infrastructure recruitment.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Navigation/Stepper */}
          <div className="flex flex-col gap-2 lg:w-1/3">
            {WORKFLOW_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 text-left transition-all",
                    isActive 
                      ? "border-primary bg-surface-card shadow-sm" 
                      : "border-transparent hover:bg-surface-card hover:border-hairline"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary text-on-primary" : "bg-surface-strong text-muted"
                  )}>
                    <stage.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-[15px] font-medium transition-colors",
                      isActive ? "text-ink font-semibold" : "text-muted"
                    )}>
                      {stage.title}
                    </h3>
                  </div>
                </button>
              );
            })}
            
            <div className="mt-8 rounded-lg border border-hairline bg-surface-card p-5">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.88px] text-muted mb-4">Total Time Savings</h4>
              <div className="flex items-end gap-3">
                <span className="text-[36px] font-normal tracking-[-0.72px] text-success leading-none">
                  ~5.5
                </span>
                <span className="text-[16px] text-body mb-1">hrs / role</span>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Panel */}
          <div className="lg:w-2/3">
            <div className="rounded-lg border border-hairline bg-surface-card overflow-hidden h-full">
              {/* Header */}
              <div className="border-b border-hairline bg-canvas-soft px-8 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px] text-ink",
                    activeStage.ai.pillColor,
                    activeStage.id === "updates" ? "text-on-primary" : ""
                  )}>
                    {activeStage.ai.pillLabel}
                  </div>
                  <h2 className="text-[22px] font-normal tracking-[-0.11px] text-ink">
                    {activeStage.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8 animate-fade-in-up" key={activeStage.id}>
                
                {/* Manual Process */}
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-1 bg-error rounded-full opacity-50" />
                  <div className="pl-6">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.88px] text-muted flex items-center gap-2 mb-3">
                      Current Manual Process
                    </h3>
                    <p className="text-[16px] text-ink leading-relaxed mb-4">
                      {activeStage.manual.desc}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[14px] text-muted">
                        <Clock className="h-4 w-4" /> {activeStage.manual.time}
                      </div>
                      <div className="text-[14px] text-error font-medium">
                        Pain: {activeStage.manual.painPoint}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center py-2">
                  <ArrowRight className="h-6 w-6 text-muted rotate-90 lg:rotate-0" />
                </div>

                {/* AI Automated */}
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-1 bg-success rounded-full" />
                  <div className="pl-6">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.88px] text-success flex items-center gap-2 mb-3">
                      With RecruitFlow AI
                    </h3>
                    <p className="text-[16px] text-ink leading-relaxed mb-4">
                      {activeStage.ai.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 text-[14px] font-medium text-success">
                        <Clock className="h-4 w-4" /> {activeStage.ai.time}
                      </div>
                      <a 
                        href={activeStage.ai.agentLink}
                        className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:text-primary-active transition-colors"
                      >
                        Try this Agent <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
