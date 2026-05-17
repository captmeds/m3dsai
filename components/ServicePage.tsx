"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, Calendar } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import ServiceAccordion from "@/components/ServiceAccordion";
import GlowButton from "@/components/GlowButton";
import { services, faqs } from "@/lib/data";

interface ServicePageProps {
  serviceId: string;
}

export default function ServicePage({ serviceId }: ServicePageProps) {
  const service = services.find(s => s.id === serviceId);

  if (!service) return null;

  const serviceFaqs = faqs.slice(0, 3);

  const accordionItems = service.features.map((feature, index) => ({
    title: feature,
    description: `Our ${feature.toLowerCase()} service delivers exceptional results through proven methodologies and cutting-edge technology.`,
    features: [
      "Strategic planning and consultation",
      "Custom implementation tailored to your needs",
      "Ongoing optimization and support",
      "Detailed reporting and analytics"
    ]
  }));

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <Link 
              href="/services/website-design/"
              className="inline-flex items-center text-text-secondary hover:text-accent-primary text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp>
                <SectionLabel text={service.name} className="mb-4" />
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                  {service.name}{" "}
                  <span className="gradient-text">Services</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <GlowButton href="/pricing/" variant="primary">
                    View Pricing
                  </GlowButton>
                  <GlowButton href="/contact/" variant="ghost">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </GlowButton>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.2}>
              <div className={`glass rounded-2xl p-8 bg-gradient-to-br ${service.gradient} bg-opacity-5`}>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-bg-card/50 rounded-xl p-4"
                    >
                      <Check className="w-5 h-5 text-accent-secondary mb-2" />
                      <p className="text-text-primary text-sm font-medium">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionLabel text="Details" className="mb-4" />
            <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
              What's Included
            </h2>
          </FadeUp>

          <ServiceAccordion items={accordionItems} />
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-12 text-center">
            <FadeUp>
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Transparent Pricing
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Choose the plan that fits your business. All plans include our core {service.name.toLowerCase()} services with varying levels of support and features.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                <div className="bg-bg-card rounded-xl p-6">
                  <p className="font-mono text-xs text-text-muted uppercase mb-2">Starter</p>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    ${typeof service.pricing.starter === 'number' ? service.pricing.starter : service.pricing.starter}
                  </p>
                </div>
                <div className="bg-bg-card rounded-xl p-6 border-2 border-accent-primary">
                  <p className="font-mono text-xs text-accent-primary uppercase mb-2">Growth</p>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    ${typeof service.pricing.growth === 'number' ? service.pricing.growth : service.pricing.growth}
                  </p>
                </div>
                <div className="bg-bg-card rounded-xl p-6">
                  <p className="font-mono text-xs text-text-muted uppercase mb-2">Enterprise</p>
                  <p className="font-display text-3xl font-bold text-text-primary">Custom</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <GlowButton href="/pricing/" variant="primary">
                View Full Pricing
              </GlowButton>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionLabel text="FAQ" className="mb-4" />
            <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
              Common Questions
            </h2>
          </FadeUp>

          <ServiceAccordion 
            items={serviceFaqs.map(faq => ({
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
            <h2 className="font-display text-3xl font-bold text-text-primary mb-6">
              Ready to get started?
            </h2>
            <p className="text-text-secondary mb-8">
              Book a free consultation and let's discuss how our {service.name.toLowerCase()} services can help your business grow.
            </p>
            <GlowButton href="/contact/" variant="primary" className="text-lg px-10 py-5">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Free Consultation
            </GlowButton>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  );
}
