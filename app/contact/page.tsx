"use client";

import { Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

const title = "Contact M3DS AI";
const description =
  "Contact M3DS AI for ITSM consulting, AI automation, dashboards, cybersecurity, website SEO and AI search optimization.";

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/contact/", title, description, pageType: "ContactPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact/" },
          ]),
        ])}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="Contact" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                Let&apos;s Start a{" "}
                <span className="gradient-text">Conversation</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Share the essentials about your business, goals, budget, and timeline. We&apos;ll receive a clear project brief through WhatsApp.
              </p>
            </FadeUp>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeUp>
              <div className="glass tech-surface rounded-lg p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                  Build your project brief
                </h2>
                <ContactForm />
              </div>
            </FadeUp>

            {/* Contact Info */}
            <FadeUp delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                    Contact Information
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Prefer to reach out directly? Here&apos;s how you can get in touch with our team.
                  </p>
                </div>

                  <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "meds@m3dsai.com" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-md bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-text-primary mb-1">{item.label}</p>
                        <p className="text-text-secondary text-sm whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass tech-surface rounded-lg p-6 mt-8">
                  <h3 className="font-display font-bold text-text-primary mb-4">
                    What M3DS AI Can Help With
                  </h3>
                  <ul className="space-y-3 text-text-secondary text-sm">
                    <li>Website design, SEO structure, and performance tuning</li>
                    <li>AI services, chatbot integration, and workflow automation</li>
                    <li>Digital marketing, conversion optimization, and reporting</li>
                    <li>Custom dashboards, KPI tracking, and security consulting</li>
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
