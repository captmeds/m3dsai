import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import ServiceCard from "@/components/ServiceCard";
import WhySection from "@/components/WhySection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialCard from "@/components/TestimonialCard";
import CTABanner from "@/components/CTABanner";
import GlowButton from "@/components/GlowButton";
import JsonLd from "@/components/JsonLd";
import { Bot, MessageSquare, Mic, Brain, Clock, ArrowRight } from "lucide-react";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import { faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { services, testimonials } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

const title = "M3DS AI | ITSM, AI Automation and Web Growth for SEA SMBs";
const description =
  "M3DS AI helps Southeast Asian SMBs modernize IT service management, AI automation, dashboards, cybersecurity and search-ready websites.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "ITSM consultant Southeast Asia",
    "AI automation consultant",
    "Freshservice consultant",
    "service desk modernization",
    "AI search optimization",
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
                "M3DS AI provides IT service management consulting, AI automation, custom dashboards, cybersecurity, website design, SEO and AI search optimization for Southeast Asian SMBs.",
            },
            {
              question: "Who founded M3DS AI?",
              answer:
                "M3DS AI was founded by Mehdi Debbabi, who brings 24+ years of enterprise IT experience across infrastructure, virtualization, networking, Active Directory and data center operations.",
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

      {/* Services Overview */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="What We Do" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                IT Operations, Automation and Search.{" "}
                <span className="gradient-text">One Practical Partner.</span>
              </h2>
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
        </div>
      </section>

      {/* OpenClaw Spotlight */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="glass rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-accent-primary/30">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-glow/20 rounded-full blur-3xl pointer-events-none" />
              <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-center relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-accent-primary/15 text-accent-primary">
                      <Bot className="w-6 h-6" />
                    </span>
                    <SectionLabel text="Featured Service" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5">
                    Your Own Private{" "}
                    <span className="gradient-text">AI Agent</span>, Live in 48 Hours
                  </h2>
                  <p className="text-text-secondary leading-relaxed text-lg mb-8 max-w-2xl">
                    We are a certified OpenClaw partner for Southeast Asia. We deploy, configure and
                    support a private AI agent that works across WhatsApp, Telegram, Slack, Discord and
                    50+ tools — reading email, managing files, automating workflows and remembering your
                    business context.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                    {[
                      { icon: MessageSquare, label: "50+ messaging & tool integrations" },
                      { icon: Brain, label: "Persistent memory of your business" },
                      { icon: Mic, label: "Voice commands & spoken replies" },
                      { icon: Clock, label: "Fully set up and live in 48 hours" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 text-text-secondary">
                        <item.icon className="w-5 h-5 text-accent-primary shrink-0" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <GlowButton href="/services/openclaw/">
                    Explore OpenClaw Setup &amp; Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </GlowButton>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/30">
                      <Bot className="w-24 h-24 text-accent-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <WhySection />
      <ProcessTimeline />

      <section className="py-24 lg:py-32 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <SectionLabel text="Authority Hub" className="mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                Built to Answer the Questions Buyers and AI Search Engines Ask
              </h2>
              <p className="text-text-secondary leading-relaxed">
                The site now connects service pages, resources, locations, industries and software comparisons so Google and AI answer engines can understand what M3DS AI does, who it serves and why it is credible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "ITSM Guide", href: "/resources/itsm-consulting-southeast-asia/" },
                { label: "AI Service Desk Automation", href: "/resources/ai-service-desk-automation/" },
                { label: "Freshservice Consulting", href: "/services/freshservice-implementation-consultant/" },
                { label: "Singapore ITSM", href: "/locations/singapore/" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="glass rounded-lg p-5 font-display font-semibold text-text-primary hover:border-accent-primary/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

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
