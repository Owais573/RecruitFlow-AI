"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  title: string;
  description: string;
  href: string;
  status: "ACTIVE" | "INACTIVE";
  stagePillColor: string;
  stagePillLabel: string;
  stagePillTextColor?: string;
}

export function AgentCard({
  title,
  description,
  href,
  status,
  stagePillColor,
  stagePillLabel,
  stagePillTextColor = "text-ink",
}: AgentCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between rounded-lg border border-hairline bg-surface-card p-6 transition-all hover:border-hairline-strong hover:shadow-sm"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {status === "ACTIVE" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              )}
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full",
                  status === "ACTIVE" ? "bg-success" : "bg-muted"
                )}
              ></span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-ink">
              {status}
            </span>
          </div>

          <div
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.88px]",
              stagePillColor,
              stagePillTextColor
            )}
          >
            {stagePillLabel}
          </div>
        </div>

        <h3 className="mb-2 text-[18px] font-semibold text-ink">{title}</h3>
        <p className="text-[14px] text-body">{description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open Agent <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
