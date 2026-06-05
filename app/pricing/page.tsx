"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import PricingCard from "@/components/PricingCard";
import PricingToggle from "@/components/PricingToggle";
import GlowButton from "@/components/GlowButton";
import ServiceAccordion from "@/components/ServiceAccordion";
import { services, faqs } from "@/lib/data";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (basePrice: number) => {
    if (isAnnual) {
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  };

  const allFeatures = [
    "Custom strategy & consultation",
    "Dedicated project manager",
    "Priority support",
    "Monthly reporting",
    "Performance optimization",
    "Security monitoring",
    "API integrations",
    "Training & documentation"
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <SectionLabel text="Pricing" className="mb-4" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              Choose the plan that fits your business. No hidden fees, no surprises. Scale up or down anytime.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <PricingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />
          </FadeUp>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, serviceIndex) => (
            <div key={service.id} className="mb-20">
              <FadeUp>
                <div className="text-center mb-10">
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-2">{service.name}</h2>
                  <p className="text-text-secondary text-sm">{service.description}</p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard
                  tier="Starter"
                  price={typeof service.pricing.starter === 'number' ? getPrice(service.pricing.starter) : service.pricing.starter}
                  description="Perfect for small projects and getting started."
                  features={service.features.slice(0, 3)}
                  index={0}
                />
                <PricingCard
                  tier="Growth"
                  price={typeof service.pricing.growth === 'number' ? getPrice(service.pricing.growth) : service.pricing.growth}
                  description="Ideal for growing businesses with expanding needs."
                  features={service.features.slice(0, 5)}
                  isPopular
                  index={1}
                />
                <PricingCard
                  tier="Enterprise"
                  price="Custom"
                  description="Tailored solutions for large-scale operations."
                  features={service.features}
                  index={2}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionLabel text="Comparison" className="mb-4" />
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Feature Comparison
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="glass rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-6 text-text-primary font-display">Feature</th>
                      <th className="text-center p-6 text-text-primary font-display">Starter</th>
                      <th className="text-center p-6 text-accent-primary font-display">Growth</th>
                      <th className="text-center p-6 text-text-primary font-display">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((feature, index) => (
                      <motion.tr
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0"
                      >
                        <td className="p-6 text-text-secondary text-sm">{feature}</td>
                        <td className="p-6 text-center">
                          <Check className={`w-5 h-5 mx-auto ${index < 3 ? 'text-accent-secondary' : 'text-text-muted'}`} />
                        </td>
                        <td className="p-6 text-center">
                          <Check className={`w-5 h-5 mx-auto ${index < 6 ? 'text-accent-secondary' : 'text-text-muted'}`} />
                        </td>
                        <td className="p-6 text-center">
                          <Check className="w-5 h-5 mx-auto text-accent-secondary" />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                Frequently Asked Questions
              </h2>
            </div>
          </FadeUp>

          <ServiceAccordion 
            items={faqs.map(faq => ({
              title: faq.question,
              description: faq.answer,
              features: []
            }))} 
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="glass rounded-lg p-12">
              <HelpCircle className="w-12 h-12 text-accent-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Not sure which plan?
              </h2>
              <p className="text-text-secondary mb-8">
                Let's discuss your needs and find the perfect solution for your business.
              </p>
              <GlowButton href="/contact/" variant="primary" className="text-lg px-10 py-5">
                Book a Free Call
              </GlowButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  );
}
