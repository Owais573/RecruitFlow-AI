"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportButtonProps {
  data: string;
  filename: string;
  className?: string;
}

export function ExportButton({ data, filename, className }: ExportButtonProps) {
  const handleExport = () => {
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className={cn(
        "flex h-8 items-center gap-2 rounded-md border border-hairline-strong bg-surface-card px-3 text-[13px] font-medium text-ink transition-colors hover:bg-canvas-soft",
        className
      )}
    >
      <Download className="h-3.5 w-3.5 text-muted" />
      <span>Export</span>
    </button>
  );
}
