"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CandidateScore({ score }: { score: number }) {
  const [hasMounted, setHasMounted] = useState(false);
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    setHasMounted(true);
    springValue.set(score);
  }, [score, springValue]);

  // Determine color based on score
  let colorClass = "text-error stroke-error"; // < 50
  if (score >= 75) colorClass = "text-success stroke-success";
  else if (score >= 50) colorClass = "text-[#c08532] stroke-[#c08532]"; // gold

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  // Calculate offset based on spring value for smooth animation
  const strokeDashoffset = useTransform(springValue, (current) => 
    circumference - (current / 100) * circumference
  );

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className="stroke-hairline-strong"
          strokeWidth="8"
        />
        {/* Foreground circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={colorClass}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: hasMounted ? strokeDashoffset : circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-[36px] font-normal tracking-[-0.72px] leading-none ${colorClass.split(" ")[0]}`}>
          {hasMounted ? <motion.span>{displayValue}</motion.span> : 0}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.88px] text-muted">
          Match
        </span>
      </div>
    </div>
  );
}
