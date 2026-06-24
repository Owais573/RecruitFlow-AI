"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/agents/job-intelligence": "Job Intelligence Agent",
  "/agents/candidate-match": "Candidate Match Agent",
  "/agents/outreach": "Outreach Agent",
  "/agents/client-update": "Client Update Agent",
  "/workflow-map": "Workflow Automation Map",
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = routeNames[pathname] || "RecruitFlow AI";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-hairline bg-canvas px-8">
      <div className="flex flex-col">
        {/* Breadcrumb / Section Label - using caption-uppercase for editorial feel */}
        {(pathname?.startsWith("/agents") || pathname?.startsWith("/workflow")) && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-muted">
            {pathname?.startsWith("/agents") ? "AI Agents" : "Process Strategy"}
          </span>
        )}
        {/* Page Title - display-md */}
        <h1 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* API Status Badge */}
        <div className="flex items-center gap-2 rounded-full bg-surface-strong px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
            API Connected
          </span>
        </div>
      </div>
    </header>
  );
}
