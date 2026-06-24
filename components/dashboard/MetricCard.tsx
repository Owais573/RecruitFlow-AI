"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  trend: string;
  trendUp: boolean;
  Icon: LucideIcon;
}

export function MetricCard({ title, value, suffix = "", trend, trendUp, Icon }: MetricCardProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    setHasMounted(true);
    springValue.set(value);
  }, [value, springValue]);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-hairline bg-surface-card p-6 transition-colors hover:border-hairline-strong">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-muted">{title}</span>
        <Icon className="h-5 w-5 text-muted-soft" />
      </div>
      
      <div className="flex items-baseline gap-2">
        <h2 className="text-[26px] font-normal tracking-[-0.325px] text-ink">
          {hasMounted ? <motion.span>{displayValue}</motion.span> : 0}
          {suffix}
        </h2>
      </div>
      
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.88px] ${
            trendUp ? "text-success" : "text-error"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </span>
      </div>
    </div>
  );
}
