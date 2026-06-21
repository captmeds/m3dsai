import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { serviceLandingPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const SERVICE_SLUGS = [
  "ai-automation-consulting",
  "cloud-infrastructure-devops",
  "custom-dashboards-bi",
  "website-design-seo",
];

const title = "AI Automation, Cybersecurity and Web Growth Services | M3DS AI";
const description =
  "M3DS AI services: private AI agent deployment (OpenClaw), AI automation consulting, cloud infrastructure, custom dashboards, cybersecurity and website SEO across Southeast Asia.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/services/",
  keywords: [
    "AI automation services Southeast Asia",
    "OpenClaw setup consultant",
    "private AI agent deployment",
    "cloud infrastructure consulting SEA",
    "custom dashboards SMB",
    "website design SEO consultant",
  ],
});

export default function ServicesPage() {
  const coreServices = serviceLandingPages.filter((p) =>
    SERVICE_SLUGS.includes(p.slug)
  );

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
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-4">Services</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 max-w-3xl leading-tight">
            AI Automation &amp; Web Growth Services
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-12">
            Enterprise-grade technology services for SMBs across Southeast Asia — from private AI agent deployment to cloud infrastructure, dashboards, and SEO.
          </p>
        </div>
      </section>

      {/* Featured: OpenClaw */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-4">Featured Service</p>
          <Link
            href="/services/openclaw/"
            className="group block rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-8 transition-all duration-300 hover:border-accent-primary/60 hover:-translate-y-0.5 hover:bg-accent-primary/8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary">
                    OpenClaw AI Agent
                  </span>
                  <span className="bg-accent-primary text-bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  OpenClaw Setup &amp; Support — Your 24/7 AI Agent
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-5">
                  Deploy a private AI agent on your own infrastructure. Connects to WhatsApp, Telegram, Slack, Discord and 50+ tools. Manages calendars, clears inboxes, executes scripts — autonomously, 24/7. M3DS AI handles full setup, security hardening, integrations and support. Live in 48 hours.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["48h Setup", "Private Infrastructure", "WhatsApp & Telegram", "Claude & GPT-4", "50+ Integrations", "24/7 Operation"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border px-2.5 py-1 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent-primary shrink-0 sm:mt-1">
                <Bot className="w-4 h-4" />
                <span>Explore OpenClaw</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-6">All Services</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {coreServices.map((page) => (
              <Link
                key={page.slug}
                href={`/services/${page.slug}/`}
                className="group glass tech-surface rounded-lg p-7 transition-all duration-300 hover:border-accent-primary/50 hover:-translate-y-1"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary mb-4">
                  {page.eyebrow}
                </p>
                <h2 className="font-display text-xl font-bold text-text-primary mb-3">{page.h1}</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{page.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {page.secondaryKeywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="rounded border border-border px-2.5 py-1 text-xs text-text-muted">
                      {kw}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
            Not sure which service fits?
          </h2>
          <p className="text-text-secondary mb-8">
            Book a free 30-minute discovery call and we&apos;ll map out exactly what your business needs.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 bg-accent-primary text-bg-primary font-semibold px-6 py-3 rounded-md hover:bg-accent-secondary transition-colors text-sm"
          >
            Book a Free Discovery Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
