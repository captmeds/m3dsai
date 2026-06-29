import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata, siteConfig } from "@/lib/seo";

const title = "About M3DS AI and Founder Mehdi Debbabi";
const description =
  "M3DS AI is founded by Mehdi Debbabi, bringing 24+ years of enterprise IT experience to ITSM, AI automation, cybersecurity, dashboards and web growth for SEA SMBs.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about/",
  keywords: ["Mehdi Debbabi", "M3DS AI founder", "ITSM consultant Southeast Asia", "enterprise IT consultant"],
});

const proofPoints = [
  "24+ years working on servers, networks, and IT systems",
  "Designing better IT support workflows and help desks",
  "Building AI tools that automate work and save time",
  "Building fast websites that rank well on Google",
  "Finding security problems and fixing them",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/about/", title, description, pageType: "AboutPage" }),
          {
            "@type": "Person",
            "@id": `${siteConfig.url}/authors/mehdi-debbabi/#person`,
            name: siteConfig.founder,
            jobTitle: "Founder, M3DS AI",
            email: siteConfig.email,
            url: `${siteConfig.url}/authors/mehdi-debbabi/`,
            worksFor: {
              "@id": `${siteConfig.url}/#organization`,
            },
            knowsAbout: [
              "IT Service Management",
              "Infrastructure",
              "Virtualization",
              "Networking",
              "Active Directory",
              "AI automation",
              "Technical SEO",
            ],
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
        ])}
      />
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
            <div>
              <SectionLabel text="About" className="mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                Big IT Know-How, Made for Small Businesses in Asia
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                M3DS AI helps small businesses in Southeast Asia set up better IT support, automate boring tasks, stay safe online, track their data, and get more leads from their websites.
              </p>
              <div className="flex flex-wrap gap-4">
                <GlowButton href="/contact/" variant="primary">
                  Work with M3DS AI
                </GlowButton>
                <GlowButton href="/authors/mehdi-debbabi/" variant="ghost">
                  Meet the founder
                </GlowButton>
              </div>
            </div>

            <aside className="glass tech-surface rounded-lg p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary mb-4">
                Founder
              </p>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
                Mehdi Debbabi
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Founder of M3DS AI. Known as Meds. He has 24+ years in IT and focuses on real, measurable results for your business.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Skills" className="mb-4" />
          <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
            Why You Can Trust Our Advice
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {proofPoints.map((point) => (
              <li key={point} className="flex gap-3 text-text-secondary">
                <CheckCircle2 className="h-5 w-5 text-accent-secondary flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
