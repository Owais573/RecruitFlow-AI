"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 overflow-y-auto"
    >
      <div className="mx-auto max-w-[1200px] px-8 py-[80px]">
        {children}
      </div>
    </motion.main>
  );
}
