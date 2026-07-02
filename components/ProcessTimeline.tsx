import { processSteps } from "@/lib/data";
import FadeUp from "./animations/FadeUp";
import SectionLabel from "./SectionLabel";

export default function ProcessTimeline() {
  return (
    <section className="section-ink py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.35]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <FadeUp>
            <SectionLabel text="How It Works" className="mb-4 !text-accent-bright" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-on-ink">
              Simple Steps,{" "}<span className="gradient-text">Real Results</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-text-on-ink-muted mt-4 max-w-xl mx-auto">
              You don&apos;t need to know anything about tech. We take care of everything from start to finish.
            </p>
          </FadeUp>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[3.75rem] left-0 right-0 h-px bg-border-ink" />
          <div className="hidden lg:block absolute top-[3.75rem] left-0 right-0 h-px bg-gradient-to-r from-accent-bright to-accent-secondary opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative"
                data-index={index}
              >
                <div className="card-ink tech-surface rounded-xl p-7 h-full relative z-10 transition-colors duration-300 hover:border-accent-bright/45">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent-bright to-accent-secondary flex items-center justify-center mb-6 shadow-lg shadow-accent-glow">
                    <span className="font-mono text-xl font-bold text-bg-ink">{step.number}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-on-ink mb-3">
                    {step.title}
                  </h3>

                  <p className="text-text-on-ink-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
