"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import GlowButton from "./GlowButton";
import AnimatedCounter from "./AnimatedCounter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Technical signal field */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        <div className="absolute left-0 right-0 top-24 h-px bg-gradient-to-r from-transparent via-accent-primary/35 to-transparent" />
        <div className="absolute left-0 right-0 bottom-28 h-px bg-gradient-to-r from-transparent via-accent-secondary/25 to-transparent" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-accent-primary/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-1/3 h-28 bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.06),transparent)]" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-primary mb-6 block">
              Smart Technology. Real Results.
            </span>
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.04] mb-6"
          >
            IT Services That Actually{" "}
            <span className="gradient-text">Move Your Business Forward</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            m3DSai delivers AI-powered IT service management — from smart websites to security consulting — built for small and medium businesses ready to grow.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <GlowButton href="/services/website-design/" variant="primary">
              Explore Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </GlowButton>
            <GlowButton href="/our-work/" variant="ghost">
              <Play className="w-4 h-4 mr-2" />
              View Our Work
            </GlowButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass tech-surface rounded-lg border-border-accent/50 px-6 py-5 flex flex-wrap gap-8 justify-center max-w-2xl mx-auto"
          >
            <div className="text-center">
              <AnimatedCounter target={150} suffix="+" className="text-2xl text-accent-primary" />
              <p className="text-text-secondary text-sm mt-1">Projects</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center">
              <AnimatedCounter target={98} suffix="%" className="text-2xl text-accent-secondary" />
              <p className="text-text-secondary text-sm mt-1">Client Retention</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center">
              <span className="font-mono font-bold text-2xl text-accent-primary">24hr</span>
              <p className="text-text-secondary text-sm mt-1">Response SLA</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
