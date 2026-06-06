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
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-primary mb-6 block">
              ITSM, AI Automation and Web Growth
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.04] mb-6">
            AI-Powered IT Service Management for{" "}
            <span className="gradient-text">Southeast Asian SMBs</span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            M3DS AI helps Singapore, Malaysia, Indonesia, Philippines and Thailand teams modernize service desks, AI automation, dashboards, cybersecurity and revenue-focused websites.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <GlowButton href="/services/it-service-management-consulting/" variant="primary">
              Explore ITSM Consulting
              <ArrowRight className="w-4 h-4 ml-2" />
            </GlowButton>
            <GlowButton href="/resources/itsm-consulting-southeast-asia/" variant="ghost">
              <Play className="w-4 h-4 mr-2" />
              Read the Buyer Guide
            </GlowButton>
          </div>

          {/* Stats */}
          <div className="glass tech-surface rounded-lg border-border-accent/50 px-6 py-5 flex flex-wrap gap-8 justify-center max-w-2xl mx-auto">
            <div className="text-center">
              <AnimatedCounter target={24} suffix="+" className="text-2xl text-accent-primary" />
              <p className="text-text-secondary text-sm mt-1">Years Enterprise IT</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center">
              <AnimatedCounter target={6} suffix="+" className="text-2xl text-accent-secondary" />
              <p className="text-text-secondary text-sm mt-1">SEA Markets</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="text-center">
              <span className="font-mono font-bold text-2xl text-accent-primary">ITIL</span>
              <p className="text-text-secondary text-sm mt-1">Service Desk Ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
