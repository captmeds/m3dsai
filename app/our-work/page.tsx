"use client";

import PageTransition from "@/components/PageTransition";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import FilterableGrid from "@/components/FilterableGrid";

export default function OurWorkPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionLabel text="Our Work" className="mb-4" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Results That{" "}
              <span className="gradient-text">Speak for Themselves</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              A selection of live client projects, including Bali Sunny Kids, 23Tribes, Keira Shabira, XJKT Fun, and more.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterableGrid />
        </div>
      </section>
    </PageTransition>
  );
}
