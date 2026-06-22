import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Brain, Cloud, LayoutDashboard, Monitor, Bot, TrendingUp, Calendar } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import GlowButton from "@/components/GlowButton";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/data";

const title = "AI Consulting, Cloud & Digital Marketing Services Australia & Asia | M3DS AI";
const description =
  "M3DS AI delivers AI consulting, cloud infrastructure, business intelligence dashboards, AI website design, OpenClaw automation, and SEO services for SMBs across Australia and Asia. Book a free consultation.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/services/",
  keywords: [
    "AI consulting Australia",
    "AI consulting Asia",
    "business automation",
    "cloud infrastructure services",
    "cloud migration Australia",
    "custom dashboard development",
    "AI website design",
    "SEO services Australia",
    "digital marketing agency",
    "OpenClaw setup",
    "AI automation solutions",
    "SMB technology consulting",
    "digital transformation",
    "business process automation",
    "cloud computing solutions",
  ],
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Cloud, LayoutDashboard, Monitor, Bot, TrendingUp,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/services/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
        ])}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-4">
              AI Consulting &amp; Technology Services
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 max-w-4xl leading-tight">
              AI, Cloud &amp; Digital Growth Services for{" "}
              <span className="gradient-text">Australian &amp; Asian SMBs</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-8">
              We help forward-thinking businesses in Australia and across Asia leverage AI automation, cloud infrastructure, business intelligence, and digital marketing to reduce costs, increase efficiency, and accelerate growth.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap gap-4">
              <GlowButton href="/contact/" variant="primary">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Free Consultation
              </GlowButton>
              <GlowButton href="/contact/" variant="ghost">
                Request a Proposal
              </GlowButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services — full detail cards */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Brain;
              return (
                <FadeUp key={service.id} delay={i * 0.07}>
                  <div className="glass tech-surface rounded-xl p-8 h-full flex flex-col">
                    {/* Icon + Label */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted mb-1">
                          Service {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="font-display text-xl font-bold text-text-primary leading-tight">
                          {service.name}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* What We Offer */}
                    <div className="mb-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted mb-3">
                        What We Offer
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs text-text-secondary">
                            <Check className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    {"benefits" in service && Array.isArray(service.benefits) && (
                      <div className="mb-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted mb-3">
                          Key Benefits
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(service.benefits as string[]).map((benefit) => (
                            <span
                              key={benefit}
                              className="text-xs px-2.5 py-1 rounded-md border border-accent-primary/25 text-accent-primary bg-accent-primary/5"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/services/${service.id}/`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-secondary transition-colors group"
                      >
                        {"cta" in service ? String(service.cta) : "Learn more"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="py-20 lg:py-28 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionLabel text="Why Choose M3DS AI" className="mb-5" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Helping Australian &amp; Asian Businesses{" "}
              <span className="gradient-text">Grow with AI</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              We help forward-thinking businesses leverage AI, automation, cloud technologies, and digital marketing to increase efficiency, reduce costs, and accelerate growth. Whether you&apos;re launching a new business, scaling operations, or modernising existing systems, our team delivers practical solutions that produce real results.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href="/contact/" variant="primary" className="text-base px-10 py-5">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Consultation
              </GlowButton>
              <GlowButton href="/contact/" variant="ghost" className="text-base px-10 py-5">
                Request a Proposal
              </GlowButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
