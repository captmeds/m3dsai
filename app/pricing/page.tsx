"use client";

import { Check, Tag, Zap, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import GlowButton from "@/components/GlowButton";
import ServiceAccordion from "@/components/ServiceAccordion";
import { services, faqs } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { breadcrumbSchema, faqSchema, graphSchema, webPageSchema } from "@/lib/schema";

const DISCOUNT = 0.4;

const title = "M3DS AI Pricing — 40% Launch Offer";
const description =
  "Launch pricing on all M3DS AI services — AI consulting, cloud infrastructure, dashboards, websites, OpenClaw automation and SEO — at 40% off market rate.";

function off(price: number) {
  return Math.round(price * (1 - DISCOUNT));
}

interface TierCardProps {
  name: string;
  description: string;
  originalPrice: number | "Custom";
  features: string[];
  isPopular?: boolean;
  delay?: number;
  format: (usd: number) => string;
}

function TierCard({
  name,
  description,
  originalPrice,
  features,
  isPopular = false,
  delay = 0,
  format,
}: TierCardProps) {
  const discounted = typeof originalPrice === "number" ? off(originalPrice) : null;
  const savings = typeof originalPrice === "number" ? originalPrice - off(originalPrice) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-xl p-7 flex flex-col h-full ${
        isPopular
          ? "bg-gradient-to-b from-accent-primary/20 to-bg-card border-2 border-accent-primary/50 shadow-lg shadow-accent-glow"
          : "glass"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-accent-primary text-white text-xs font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
            <Zap className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      {discounted !== null && (
        <div className="absolute top-5 right-5">
          <span className="inline-flex items-center gap-1 bg-amber-400/15 text-amber-400 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <Tag className="w-2.5 h-2.5" />
            40% off
          </span>
        </div>
      )}

      <div className="mb-5 pr-14">
        <h3 className="font-display text-xl font-bold text-text-primary mb-1">{name}</h3>
        <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
      </div>

      <div className="mb-6">
        {discounted !== null ? (
          <>
            <div className="text-text-muted text-sm line-through mb-1">
              {format(originalPrice as number)} market rate
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-text-primary">
                {format(discounted)}
              </span>
              <span className="text-text-secondary text-sm">/project</span>
            </div>
            {savings !== null && (
              <p className="mt-1.5 text-amber-400 text-xs font-mono font-medium">
                You save {format(savings)}
              </p>
            )}
          </>
        ) : (
          <>
            <span className="font-display text-4xl font-bold text-text-primary">Custom</span>
            <p className="mt-1.5 text-text-muted text-xs">Scoped to your requirements</p>
          </>
        )}
      </div>

      <ul className="space-y-3 mb-7 flex-grow">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" />
            <span className="text-text-secondary text-sm leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <GlowButton
        variant={isPopular ? "primary" : "ghost"}
        href="/contact/"
        className="w-full"
      >
        {originalPrice === "Custom" ? "Contact Us" : "Get Started"}
      </GlowButton>
    </motion.div>
  );
}

interface ServiceBlockProps {
  service: (typeof services)[0];
  format: (usd: number) => string;
}

function ServiceBlock({ service, format }: ServiceBlockProps) {
  return (
    <div className="mb-24">
      <FadeUp>
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            {service.name}
          </h2>
          <p className="text-text-secondary text-sm max-w-xl mx-auto">
            {service.description.split(". ")[0]}.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <TierCard
          name="Starter"
          description="Perfect for small businesses getting started."
          originalPrice={service.pricing.starter}
          features={service.features.slice(0, 3)}
          delay={0}
          format={format}
        />
        <TierCard
          name="Growth"
          description="Ideal for growing businesses with expanding needs."
          originalPrice={service.pricing.growth}
          features={service.features.slice(0, 5)}
          isPopular
          delay={0.1}
          format={format}
        />
        <TierCard
          name="Enterprise"
          description="Tailored for larger organisations and complex needs."
          originalPrice="Custom"
          features={service.features}
          delay={0.2}
          format={format}
        />
      </div>
    </div>
  );
}

const included = [
  { label: "Dedicated point of contact", tier: "All plans" },
  { label: "Weekly progress updates", tier: "All plans" },
  { label: "30-day post-launch support", tier: "Growth & Enterprise" },
  { label: "Staff training & documentation", tier: "Growth & Enterprise" },
  { label: "Priority support queue", tier: "Enterprise" },
  { label: "Custom SLA", tier: "Enterprise" },
  { label: "API integrations", tier: "Growth & Enterprise" },
  { label: "Security hardening review", tier: "Enterprise" },
];

export default function PricingPage() {
  const { format } = useCurrency();

  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/pricing/", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing/" },
          ]),
          faqSchema(faqs),
        ])}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/25 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Tag className="w-3.5 h-3.5" />
              Launch Offer — 40% Off All Services
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Transparent Pricing.{" "}
              <span className="relative inline-block">
                <span className="gradient-text">40% Off.</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 C 75 2, 225 2, 298 6"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              All six services, three tiers each. Market rates shown for reference — your launch price is
              always <span className="text-amber-400 font-semibold">40% below market</span>, automatically applied.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-text-secondary">
              {["No hidden fees", "Currency auto-detected", "Free discovery call", "No lock-in contracts"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-accent-secondary flex-shrink-0" />
                    {item}
                  </span>
                )
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Service pricing */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sticky discount reminder */}
          <FadeUp>
            <div className="glass rounded-xl p-5 mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold">
                    Launch pricing active — 40% off every service
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    Strikethrough prices reflect standard market rates. Your price is highlighted below.
                  </p>
                </div>
              </div>
              <GlowButton href="/contact/" variant="outline" className="text-sm py-2.5 px-5 flex-shrink-0">
                Lock in your rate
              </GlowButton>
            </div>
          </FadeUp>

          {services.map((service) => (
            <ServiceBlock key={service.id} service={service} format={format} />
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionLabel text="What's Included" className="mb-4" />
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Every Plan, Every Service
              </h2>
              <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">
                Core deliverables that come standard — no upselling once you start.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {included.map((item, i) => (
                <div key={i} className="glass rounded-xl p-5">
                  <Check className="w-5 h-5 text-accent-secondary mb-3" />
                  <p className="text-text-primary text-sm font-medium mb-1">{item.label}</p>
                  <span className="text-text-muted text-[11px] font-mono">{item.tier}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionLabel text="FAQ" className="mb-4" />
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Common Questions
              </h2>
            </div>
          </FadeUp>
          <ServiceAccordion
            items={faqs.map((faq) => ({
              title: faq.question,
              description: faq.answer,
              features: [],
            }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="glass rounded-2xl p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.07) 0%, transparent 65%)",
                }}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-7 h-7 text-amber-400" />
                </div>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-3">
                  Not sure which tier?
                </h2>
                <p className="text-text-secondary mb-2 max-w-lg mx-auto">
                  Book a free 30-minute discovery call. We&apos;ll scope your project and lock in your 40% launch rate.
                </p>
                <p className="text-amber-400 text-sm font-mono mb-8">Limited availability at launch pricing.</p>
                <GlowButton href="/contact/" variant="primary" className="text-base px-10 py-4">
                  Book a Free Discovery Call
                </GlowButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  );
}
