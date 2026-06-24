"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isLoading?: boolean;
}

export function ResultPanel({ title, children, defaultOpen = true, isLoading = false }: ResultPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface-card transition-colors hover:border-hairline-strong">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-surface-card px-6 py-4 outline-none"
      >
        <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
        <div className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-canvas-soft">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="border-t border-hairline px-6 py-4">
              {isLoading ? (
                <div className="flex flex-col gap-3">
                  <div className="h-4 w-full animate-pulse rounded bg-surface-strong" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-surface-strong" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-surface-strong" />
                </div>
              ) : (
                children
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
