"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import GlowButton from "./GlowButton";

interface PricingCardProps {
  tier: string;
  price: string | number;
  description: string;
  features: string[];
  isPopular?: boolean;
  index: number;
}

export default function PricingCard({ tier, price, description, features, isPopular = false, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl p-8 h-full flex flex-col ${
        isPopular 
          ? 'bg-gradient-to-b from-accent-primary/20 to-bg-card border-2 border-accent-primary/50 shadow-lg shadow-accent-glow' 
          : 'glass'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-accent-primary text-white text-xs font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">{tier}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>

      <div className="mb-8">
        <span className="font-display text-4xl font-bold text-text-primary">
          {typeof price === 'number' ? `$${price}` : price}
        </span>
        {typeof price === 'number' && (
          <span className="text-text-secondary text-sm ml-2">/project</span>
        )}
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" />
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <GlowButton 
        variant={isPopular ? "primary" : "ghost"} 
        href="/contact/"
        className="w-full"
      >
        Get Started
      </GlowButton>
    </motion.div>
  );
}
