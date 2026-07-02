import GlowButton from "./GlowButton";
import FadeUp from "./animations/FadeUp";

export default function CTABanner() {
  return (
    <section className="section-ink py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-[0.5]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] rounded-full bg-accent-bright/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-bright/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-secondary/35 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-on-ink mb-6">
            Not Sure Where to Start?{" "}
            <span className="gradient-text">Let&apos;s Talk.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-text-on-ink-muted text-lg mb-10 max-w-2xl mx-auto">
            Book a free 30-minute call with us. Tell us about your business and we&apos;ll tell you exactly what will help — no tech jargon, no hard sell.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div>
            <GlowButton href="/contact/" variant="primary" className="text-lg px-10 py-5">
              Book a Free Call
            </GlowButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
