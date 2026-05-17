"use client";

import { motion } from "framer-motion";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: () => void;
}

export default function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm font-medium ${!isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>
        Monthly
      </span>

      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full bg-bg-card border border-border p-1 transition-colors"
        aria-label="Toggle pricing period"
      >
        <motion.div
          animate={{ x: isAnnual ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-accent-primary shadow-lg"
        />
      </button>

      <span className={`text-sm font-medium ${isAnnual ? 'text-text-primary' : 'text-text-muted'}`}>
        Annual
      </span>

      {isAnnual && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs font-mono text-accent-secondary bg-accent-secondary/10 px-2 py-1 rounded-full"
        >
          Save 20%
        </motion.span>
      )}
    </div>
  );
}
