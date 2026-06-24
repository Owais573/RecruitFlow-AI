"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileSearch, Send, Mail, GitBranch } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Job Intelligence", href: "/agents/job-intelligence", icon: Briefcase },
  { name: "Candidate Match", href: "/agents/candidate-match", icon: FileSearch },
  { name: "Outreach", href: "/agents/outreach", icon: Send },
  { name: "Client Updates", href: "/agents/client-update", icon: Mail },
  { name: "Workflow Map", href: "/workflow-map", icon: GitBranch },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-hairline bg-surface-card">
      {/* Brand Wordmark */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/logo.png" alt="RecruitFlow AI Logo" className="h-6 w-6 object-contain" />
          <span className="text-xl tracking-[-0.72px] text-ink">RecruitFlow AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-4 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.88px] transition-all border-l-2",
                isActive
                  ? "border-primary text-ink"
                  : "border-transparent text-muted hover:border-hairline-strong hover:text-ink"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted group-hover:text-ink"
              )} aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Area - Placeholder */}
      <div className="border-t border-hairline p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-surface-strong flex items-center justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">OA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-ink">Owais Ansari</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-muted">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
