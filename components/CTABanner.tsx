"use client";

import { motion } from "framer-motion";
import GlowButton from "./GlowButton";
import FadeUp from "./animations/FadeUp";

export default function CTABanner() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-bg-secondary to-accent-secondary/10" />
      <div className="absolute inset-0 dot-grid opacity-[0.03]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Ready to Transform{" "}
            <span className="gradient-text">Your Business?</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Book a free strategy call and discover how m3DSai can accelerate your growth with smart technology solutions.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlowButton href="/contact/" variant="primary" className="text-lg px-10 py-5">
              Book a Free Strategy Call
            </GlowButton>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
