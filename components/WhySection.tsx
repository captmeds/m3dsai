import { Check, Cpu, DollarSign, Layers } from "lucide-react";
import FadeUp from "./animations/FadeUp";
import SectionLabel from "./SectionLabel";

const valueProps = [
  {
    icon: Cpu,
    title: "AI Built In",
    description: "We build AI into everything we do — not as an add-on. You get faster and smarter results."
  },
  {
    icon: DollarSign,
    title: "Prices for Small Businesses",
    description: "Top-quality work at a price that makes sense for your size. Clear prices, no hidden fees, real results."
  },
  {
    icon: Layers,
    title: "One Team, Start to Finish",
    description: "One team handles everything — from planning to launch. No passing the work around to other teams."
  }
];

export default function WhySection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <FadeUp>
              <SectionLabel text="Why m3DSai" className="mb-4" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                We&apos;re Built for{" "}
                <span className="gradient-text">Businesses Like Yours.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                Most tech companies only care about big businesses. We work with small and medium businesses and give them the same great tools.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {valueProps.map((prop, index) => (
                <FadeUp key={prop.title} delay={0.3 + index * 0.1}>
                  <div className="flex gap-4 group transition-transform duration-300 hover:translate-x-2">
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
                  </div>
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
                    <span className="font-mono text-xs text-accent-primary">m3DSai vs Others</span>
                  </div>

                  {[
                    { feature: "Response Time", m3dsai: "< 2 hours", traditional: "2-3 days" },
                    { feature: "AI Integration", m3dsai: "Native", traditional: "Add-on" },
                    { feature: "Pricing", m3dsai: "Transparent", traditional: "Hidden fees" },
                    { feature: "Support", m3dsai: "Dedicated", traditional: "Ticket-based" },
                    { feature: "Results", m3dsai: "Guaranteed", traditional: "Variable" }
                  ].map((row) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-3 gap-4 items-center"
                    >
                      <span className="text-text-secondary text-sm">{row.feature}</span>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent-secondary" />
                        <span className="text-text-primary text-sm font-medium">{row.m3dsai}</span>
                      </div>
                      <span className="text-text-muted text-sm">{row.traditional}</span>
                    </div>
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
