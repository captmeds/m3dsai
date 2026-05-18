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

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-1/3 right-0 w-80 h-80 bg-accent-secondary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-6 block">
                Smart Technology. Real Results.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.1] mb-6"
            >
              IT Services That Actually{" "}
              <span className="gradient-text">Move Your Business Forward</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
            >
              m3DSai delivers AI-powered IT service management — from smart websites to security consulting — built for small and medium businesses ready to grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-8"
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

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Browser mockup */}
              <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-accent-glow border border-border">
                <div className="bg-bg-secondary px-4 py-3 flex items-center gap-2 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-bg-card rounded-md px-3 py-1.5 text-xs text-text-muted font-mono text-center">
                      m3dsai.com/dashboard
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary">Analytics Overview</h3>
                      <p className="text-text-secondary text-sm">Real-time business intelligence</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-accent-primary text-xs font-mono">+24%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Revenue", value: "$48.2K", change: "+12%" },
                      { label: "Users", value: "2,847", change: "+8%" },
                      { label: "Conversion", value: "3.24%", change: "+18%" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-bg-card/50 rounded-xl p-4">
                        <p className="text-text-muted text-xs mb-1">{stat.label}</p>
                        <p className="font-display text-lg font-bold text-text-primary">{stat.value}</p>
                        <p className="text-accent-secondary text-xs mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-bg-card/50 rounded-xl p-4 h-32 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-accent-primary/60 to-accent-primary/20 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">System Secure</p>
                    <p className="text-text-muted text-xs">All checks passed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <span className="text-accent-primary text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">AI Optimized</p>
                    <p className="text-text-muted text-xs">Performance +40%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
