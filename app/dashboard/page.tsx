"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Users, Clock, MessageSquare, Zap, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <h1 className="text-[36px] font-normal tracking-[-0.72px] text-ink mb-2">
            RecruitFlow AI
          </h1>
          <p className="text-[16px] text-body max-w-[600px]">
            AI operating layer for modern recruitment teams. Automate your workflows 
            across sourcing, screening, outreach, and client reporting.
          </p>
        </section>

        {/* Analytics Row */}
        <section>
          <h2 className="text-[22px] font-normal tracking-[-0.11px] text-ink mb-6">
            Weekly Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Candidates Analyzed"
              value={86}
              trend="12% this week"
              trendUp={true}
              Icon={Users}
            />
            <MetricCard
              title="Hours Saved"
              value={14}
              suffix=".5 hrs"
              trend="23% this week"
              trendUp={true}
              Icon={Clock}
            />
            <MetricCard
              title="Messages Generated"
              value={43}
              trend="8% this week"
              trendUp={true}
              Icon={MessageSquare}
            />
            <MetricCard
              title="Active AI Workflows"
              value={4}
              trend="Stable"
              trendUp={true}
              Icon={Zap}
            />
          </div>
        </section>

        {/* AI Agents Grid */}
        <section>
          <h2 className="text-[22px] font-normal tracking-[-0.11px] text-ink mb-6">
            Active Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgentCard
              title="Job Intelligence Agent"
              description="Analyzes job descriptions, generates boolean searches, and extracts critical skills."
              href="/agents/job-intelligence"
              status="ACTIVE"
              stagePillColor="bg-[#dfa88f]"
              stagePillLabel="ANALYZING"
            />
            <AgentCard
              title="Candidate Match Agent"
              description="Scores and ranks candidate-role fit with detailed gap analysis."
              href="/agents/candidate-match"
              status="ACTIVE"
              stagePillColor="bg-[#9fbbe0]"
              stagePillLabel="MATCHING"
            />
            <AgentCard
              title="Outreach Agent"
              description="Generates personalized, human-sounding messages across channels."
              href="/agents/outreach"
              status="ACTIVE"
              stagePillColor="bg-[#c0a8dd]"
              stagePillLabel="GENERATING"
            />
            <AgentCard
              title="Client Update Agent"
              description="Creates professional client update reports and pipeline summaries."
              href="/agents/client-update"
              status="ACTIVE"
              stagePillColor="bg-[#c08532]"
              stagePillLabel="COMPLETE"
              stagePillTextColor="text-[#ffffff]"
            />
          </div>
        </section>

        {/* Recent Activity Feed */}
        <section>
          <h2 className="text-[22px] font-normal tracking-[-0.11px] text-ink mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted" /> Recent Activity
          </h2>
          <div className="rounded-lg border border-hairline bg-surface-card overflow-hidden">
            <div className="divide-y divide-hairline">
              {[
                { time: "10 mins ago", action: "Generated 3 outreach variants for John Matthews", agent: "Outreach Agent" },
                { time: "1 hr ago", action: "Analyzed JD: Senior Data Centre Engineer", agent: "Job Intelligence Agent" },
                { time: "2 hrs ago", action: "Scored candidate profile: 87% Match", agent: "Candidate Match Agent" },
                { time: "Yesterday", action: "Generated Weekly Pipeline Report", agent: "Client Update Agent" },
                { time: "Yesterday", action: "Created boolean search for Cloud Architect", agent: "Job Intelligence Agent" },
              ].map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-canvas-soft transition-colors">
                  <div>
                    <p className="text-[14px] text-ink font-medium mb-1">{item.action}</p>
                    <p className="text-[13px] text-muted">{item.agent}</p>
                  </div>
                  <span className="text-[13px] text-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
