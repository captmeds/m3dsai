import type { Metadata } from "next";
import { Linkedin, Mail } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata, siteConfig } from "@/lib/seo";

const title = "Mehdi Debbabi | Founder of M3DS AI";
const description =
  "Mehdi Debbabi is the founder of M3DS AI, with 24+ years of enterprise IT experience across infrastructure, virtualization, networking, AD and data center operations.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/authors/mehdi-debbabi/",
  keywords: ["Mehdi Debbabi", "Meds M3DS AI", "enterprise IT consultant", "ITSM consultant"],
});

export default function AuthorPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/authors/mehdi-debbabi/", title, description, pageType: "ProfilePage" }),
          {
            "@type": "Person",
            "@id": `${siteConfig.url}/authors/mehdi-debbabi/#person`,
            name: "Mehdi Debbabi",
            alternateName: "Meds",
            email: siteConfig.email,
            jobTitle: "Founder, M3DS AI",
            url: `${siteConfig.url}/authors/mehdi-debbabi/`,
            worksFor: {
              "@id": `${siteConfig.url}/#organization`,
            },
            sameAs: [...siteConfig.sameAs],
            knowsAbout: [
              "Enterprise IT infrastructure",
              "Virtualization",
              "Networking",
              "Active Directory",
              "Data center operations",
              "IT Service Management",
              "AI automation",
              "Cybersecurity",
            ],
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Authors", path: "/authors/mehdi-debbabi/" },
            { name: "Mehdi Debbabi", path: "/authors/mehdi-debbabi/" },
          ]),
        ])}
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Author" className="mb-4" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Mehdi Debbabi
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Founder of M3DS AI. I help small businesses in Southeast Asia set up better IT support, use AI tools, stay safe online, track their data, and build websites that get found on Google.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="glass rounded-lg p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary mb-2">Experience</p>
              <p className="text-text-primary font-display text-2xl font-bold">24+ years</p>
            </div>
            <div className="glass rounded-lg p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary mb-2">Focus</p>
              <p className="text-text-primary font-display text-2xl font-bold">ITSM + AI</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <GlowButton href="/contact/" variant="primary">
              Book a consultation
            </GlowButton>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors">
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <a href="https://www.linkedin.com/company/m3ds-ai" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
