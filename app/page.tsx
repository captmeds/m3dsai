import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import ServiceCard from "@/components/ServiceCard";
import WhySection from "@/components/WhySection";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTABanner from "@/components/CTABanner";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import { faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { services } from "@/lib/data";
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

      {/* What We Do */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <FadeUp>
              <SectionLabel text="Our Services" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                AI, Cloud &amp; Website Growth for{" "}
                <span className="gradient-text">Businesses in Australia &amp; Asia.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                Six services to help your business grow: AI tools, cloud servers, dashboards, websites, AI automation, and SEO.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <WhySection />
      <ProcessTimeline />

      <CTABanner />
    </>
  );
}
