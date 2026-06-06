import type { Metadata } from "next";
import { CalendarCheck, FileSearch, Route } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Book an ITSM and AI Automation Demo";
const description =
  "Book a focused M3DS AI consultation to review ITSM, AI automation, dashboards, cybersecurity, website SEO and revenue opportunities.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/demo/",
  keywords: ["book ITSM consultation", "AI automation demo", "service desk audit"],
});

const steps = [
  {
    icon: FileSearch,
    title: "Audit",
    text: "Review your current service desk, website, automation, security or dashboard setup.",
  },
  {
    icon: Route,
    title: "Roadmap",
    text: "Identify the fastest path to better operations, organic traffic and qualified lead flow.",
  },
  {
    icon: CalendarCheck,
    title: "Scope",
    text: "Turn the roadmap into a practical implementation plan with clear priorities.",
  },
];

export default function DemoPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/demo/", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Demo", path: "/demo/" },
          ]),
        ])}
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text="Demo" className="mb-4" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Book a Practical ITSM, AI and SEO Opportunity Review
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            Bring one messy workflow, one growth problem or one platform decision. M3DS AI will help you identify what to fix first and how to scope it.
          </p>
          <GlowButton href="/contact/" variant="primary" className="text-lg px-10 py-5">
            Request a review
          </GlowButton>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="glass tech-surface rounded-lg p-7">
              <div className="w-12 h-12 rounded-md bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center mb-5">
                <step.icon className="h-6 w-6 text-accent-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-text-primary mb-3">
                {step.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
