import { processSteps } from "@/lib/data";
import FadeUp from "./animations/FadeUp";
import SectionLabel from "./SectionLabel";

export default function ProcessTimeline() {
  return (
    <section className="py-12 lg:py-16 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <FadeUp>
            <SectionLabel text="How It Works" className="mb-4" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
              Simple Steps,{" "}<span className="gradient-text">Real Results</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              You don&apos;t need to know anything about tech. We take care of everything from start to finish.
            </p>
          </FadeUp>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative"
                data-index={index}
              >
                <div className="glass tech-surface rounded-lg p-8 h-full relative z-10 hover:border-accent-primary/50 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-6">
                    <span className="font-mono text-xl font-bold text-white">{step.number}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector dot */}
                <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-bg-primary border-2 border-accent-primary z-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
