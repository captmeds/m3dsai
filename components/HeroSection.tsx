import Link from "next/link";
import { Bot, ArrowRight, Zap, Clock, Wifi } from "lucide-react";

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
        <div className="absolute inset-x-0 top-1/3 h-28 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.03),transparent)]" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-primary mb-6 block">
            AI Tools &amp; Website Growth
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.04] mb-10">
            We Help Small Businesses in{" "}
            <span className="gradient-text">Asia &amp; Australia</span>{" "}
            Grow Online
          </h1>

          {/* OpenClaw banner */}
          <Link
            href="/services/openclaw/"
            className="group relative block rounded-2xl border border-accent-primary/35 bg-accent-primary/5 p-7 sm:p-10 transition-all duration-300 hover:border-accent-primary/65 hover:bg-accent-primary/8 overflow-hidden text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-primary/6 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/15 border border-accent-primary/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent-primary" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary">
                    Featured Service
                  </span>
                  <span className="bg-accent-primary text-bg-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">
                  OpenClaw —{" "}
                  <span className="gradient-text">Your AI Helper That Never Sleeps</span>
                </h2>

                <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl text-sm sm:text-base">
                  We set up your own AI helper that works just for your business — not shared with anyone else. It answers messages, handles tasks, and replies to customers on WhatsApp, Telegram, Slack and more. It runs 24/7 and we handle all the setup for you.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { icon: Clock, label: "Ready in 48 Hours" },
                    { icon: Zap, label: "Connects to 50+ Apps" },
                    { icon: Wifi, label: "WhatsApp & Telegram" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-text-secondary"
                    >
                      <Icon className="w-3.5 h-3.5 text-accent-primary" />
                      {label}
                    </div>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary group-hover:gap-3 transition-all duration-300">
                  Learn about OpenClaw
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-56">
                {[
                  { value: "48h", label: "Setup time" },
                  { value: "50+", label: "App connections" },
                  { value: "24/7", label: "Runs by itself" },
                  { value: "100%", label: "Just for you" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-bg-card/60 p-4 text-center"
                  >
                    <p className="text-xl font-bold text-accent-primary">{value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
