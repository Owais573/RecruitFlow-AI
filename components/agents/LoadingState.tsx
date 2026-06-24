"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: "analyzing", label: "ANALYZING", color: "bg-[#dfa88f]", text: "text-ink" }, // timeline-thinking
  { id: "sourcing", label: "SOURCING", color: "bg-[#9fc9a2]", text: "text-ink" }, // timeline-grep
  { id: "matching", label: "MATCHING", color: "bg-[#9fbbe0]", text: "text-ink" }, // timeline-read
  { id: "generating", label: "GENERATING", color: "bg-[#c0a8dd]", text: "text-ink" }, // timeline-edit
  { id: "complete", label: "COMPLETE", color: "bg-[#c08532]", text: "text-[#ffffff]" }, // timeline-done
];

export function LoadingState({ message = "AI is thinking..." }: { message?: string }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    // Progress through stages every 800ms
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev < STAGES.length - 1) return prev + 1;
        // Don't loop back to beginning, stay at complete or loop? Let's just hold at generating until complete is passed externally.
        // Actually, since this is a pure UI component without external stage control, we'll just loop for demo purposes, 
        // or just stay at generating. Real apps would drive this via props.
        return prev === STAGES.length - 2 ? prev : prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex items-center gap-3 mb-6">
        {STAGES.map((stage, index) => {
          const isActive = index === activeStage;
          const isPast = index < activeStage;
          
          if (!isActive && !isPast) return null; // Only show pills as they are reached

          return (
            <div
              key={stage.id}
              className={cn(
                "rounded-full px-3 py-1 transition-all duration-300",
                stage.color,
                isActive ? "animate-pulse-pill scale-110" : "scale-100 opacity-80"
              )}
            >
              <span className={cn("text-[11px] font-semibold uppercase tracking-[0.88px]", stage.text)}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[13px] text-muted animate-pulse">{message}</p>
    </div>
  );
}
