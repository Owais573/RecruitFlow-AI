"use client";

import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PromptInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  exampleText?: string;
  onUseExample?: () => void;
  onClear?: () => void;
}

export function PromptInput({
  label,
  exampleText,
  onUseExample,
  onClear,
  className,
  value,
  ...props
}: PromptInputProps) {
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[16px] font-semibold text-ink">{label}</label>
          <div className="flex items-center gap-3">
            {exampleText && onUseExample && (
              <button
                type="button"
                onClick={onUseExample}
                className="text-[11px] font-semibold uppercase tracking-[0.88px] text-primary transition-colors hover:text-primary-active"
              >
                Use Example
              </button>
            )}
            {onClear && charCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-[11px] font-semibold uppercase tracking-[0.88px] text-muted transition-colors hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="relative">
        <textarea
          value={value}
          className="min-h-[200px] w-full resize-y rounded-md border border-hairline bg-surface-card p-4 text-[16px] font-normal text-ink shadow-none outline-none transition-colors placeholder:text-muted focus:border-hairline-strong"
          {...props}
        />
        <div className="absolute bottom-3 right-3 text-[13px] text-muted">
          {charCount} chars
        </div>
      </div>
    </div>
  );
}
