"use client";

import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import PortfolioGrid from "@/components/PortfolioGrid";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

const title = "Our Work | M3DS AI Portfolio";
const description =
  "A selection of websites and digital experiences built by M3DS AI, including XJKT, ZAAAS, Bali Sunny Kids, 23Tribes, and Keira Shabira.";

export default function OurWorkPage() {
  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/our-work/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Work", path: "/our-work/" },
          ]),
        ])}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionLabel text="Portfolio" className="mb-4" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              M3DS AI designs and builds modern websites, brands, and digital
              experiences. Here&apos;s a selection of live projects we&apos;ve shipped
              for clients across Southeast Asia and beyond.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGrid />
        </div>
      </section>
    </PageTransition>
  );
}
