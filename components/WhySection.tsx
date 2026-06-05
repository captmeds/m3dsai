"use client";

import { motion } from "framer-motion";
import { Check, Cpu, DollarSign, Layers } from "lucide-react";
import FadeUp from "./animations/FadeUp";
import SectionLabel from "./SectionLabel";

const valueProps = [
  {
    icon: Cpu,
    title: "AI-Native Approach",
    description: "We don't just use AI tools — we architect solutions with artificial intelligence at their core, delivering smarter, faster results."
  },
  {
    icon: DollarSign,
    title: "SMB-Focused Pricing",
    description: "Enterprise-quality solutions without enterprise-level budgets. Transparent pricing, no hidden fees, real ROI."
  },
  {
    icon: Layers,
    title: "Full-Stack Execution",
    description: "From strategy to design to development to deployment — one team, one vision, zero handoff friction."
  }
];

export default function WhySection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <FadeUp>
              <SectionLabel text="Why m3DSai" className="mb-4" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Built Different.{" "}
                <span className="gradient-text">Built for You.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                Most agencies treat SMBs like afterthoughts. We built m3DSai specifically for businesses that need enterprise-grade solutions without the enterprise baggage.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {valueProps.map((prop, index) => (
                <FadeUp key={prop.title} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-md bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-primary/20 transition-colors">
                      <prop.icon className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <FadeUp delay={0.3}>
            <div className="relative">
              <div className="glass tech-surface rounded-lg p-8 border border-border">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Comparison</span>
                    <span className="font-mono text-xs text-accent-primary">m3DSai vs Traditional</span>
                  </div>

                  {[
                    { feature: "Response Time", m3dsai: "< 2 hours", traditional: "2-3 days" },
                    { feature: "AI Integration", m3dsai: "Native", traditional: "Add-on" },
                    { feature: "Pricing", m3dsai: "Transparent", traditional: "Hidden fees" },
                    { feature: "Support", m3dsai: "Dedicated", traditional: "Ticket-based" },
                    { feature: "Results", m3dsai: "Guaranteed", traditional: "Variable" }
                  ].map((row, i) => (
                    <motion.div
                      key={row.feature}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="grid grid-cols-3 gap-4 items-center"
                    >
                      <span className="text-text-secondary text-sm">{row.feature}</span>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent-secondary" />
                        <span className="text-text-primary text-sm font-medium">{row.m3dsai}</span>
                      </div>
                      <span className="text-text-muted text-sm">{row.traditional}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-3 -right-3 h-16 w-16 border-t border-r border-accent-primary/40" />
              <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-accent-secondary/35" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
