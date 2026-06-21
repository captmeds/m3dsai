import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowRight, Zap, Clock, Wifi } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import ServiceCard from "@/components/ServiceCard";
import WhySection from "@/components/WhySection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialCard from "@/components/TestimonialCard";
import CTABanner from "@/components/CTABanner";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import { faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { services, testimonials } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

const title = "M3DS AI | AI Automation, Cloud and Web Growth for SEA SMBs";
const description =
  "M3DS AI helps Southeast Asian SMBs deploy private AI agents (OpenClaw), automate IT operations, modernize cloud infrastructure and grow with SEO-ready websites.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "OpenClaw setup consultant",
    "AI automation consultant Southeast Asia",
    "private AI agent deployment",
    "cloud infrastructure consulting SEA",
    "IT modernisation SMB",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/", title, description }),
          faqSchema([
            {
              question: "What does M3DS AI do?",
              answer:
                "M3DS AI provides private AI agent deployment (OpenClaw), AI automation consulting, cloud infrastructure, custom dashboards, website design and SEO for Southeast Asian SMBs.",
            },
            {
              question: "What is OpenClaw and how does M3DS AI help?",
              answer:
                "OpenClaw is a private AI agent platform that connects to WhatsApp, Telegram, Slack and 50+ tools. M3DS AI handles full setup, security hardening, integrations and ongoing support — live in 48 hours.",
            },
            {
              question: "Which markets does M3DS AI serve?",
              answer:
                "M3DS AI supports Southeast Asian SMBs, including Singapore, Malaysia, Indonesia, Philippines, Thailand, Vietnam and remote regional teams.",
            },
          ]),
        ])}
      />
      <HeroSection />
      <TrustedBy />

      {/* OpenClaw Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <Link
              href="/services/openclaw/"
              className="group relative block rounded-2xl border border-accent-primary/35 bg-accent-primary/5 p-8 sm:p-12 transition-all duration-300 hover:border-accent-primary/65 hover:bg-accent-primary/8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-primary/6 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/15 border border-accent-primary/30 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-accent-primary" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary">
                      Featured Service
                    </span>
                    <span className="bg-accent-primary text-bg-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      New
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">
                    OpenClaw Setup &amp; Support —{" "}
                    <span className="gradient-text">Your 24/7 AI Agent</span>
                  </h2>

                  <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl text-sm sm:text-base">
                    Deploy a private AI agent on your own infrastructure. Connects to WhatsApp,
                    Telegram, Slack, Discord and 50+ tools. Manages calendars, clears inboxes,
                    executes scripts — autonomously, around the clock. M3DS AI handles full setup,
                    security hardening, integrations and ongoing support.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      { icon: Clock, label: "Live in 48 Hours" },
                      { icon: Zap, label: "50+ Integrations" },
                      { icon: Wifi, label: "WhatsApp & Telegram" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs text-text-secondary"
                      >
                        <Icon className="w-3.5 h-3.5 text-accent-primary" />
                        {label}
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary group-hover:gap-3 transition-all duration-300">
                    Explore OpenClaw Setup &amp; Support
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-56">
                  {[
                    { value: "48h", label: "Setup time" },
                    { value: "50+", label: "Integrations" },
                    { value: "24/7", label: "Operation" },
                    { value: "100%", label: "Private infra" },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border bg-bg-card/60 p-4 text-center"
                    >
                      <p className="text-xl font-bold text-accent-primary">{value}</p>
                      <p className="text-xs text-text-muted mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="What We Do" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                IT Modernisation, AI Automation and Web Growth.{" "}
                <span className="gradient-text">One Practical Partner.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                Enterprise-grade technology services built for lean SMB teams across Southeast Asia.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                icon={service.icon}
                href={`/services/${service.id}/`}
                index={index}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-secondary transition-colors"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <WhySection />
      <ProcessTimeline />

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="Testimonials" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                Trusted by <span className="gradient-text">Industry Leaders</span>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                company={testimonial.company}
                role={testimonial.role}
                rating={testimonial.rating}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
