import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata, siteConfig } from "@/lib/seo";

const title = "Terms of Service";
const description =
  "M3DS AI terms of service for website visitors, project inquiries, consulting discussions and client engagements.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/terms-of-service/",
});

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/terms-of-service/", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/terms-of-service/" },
          ]),
        ])}
      />
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Legal" className="mb-4" />
          <h1 className="font-display text-4xl font-bold text-text-primary mb-6">
            Terms of Service
          </h1>
          <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
            <p>
              This site tells you about our services. Sending us a message doesn&apos;t make you a client until we both sign an agreement.
            </p>
            <p>
              How long a project takes and what it costs depends on what we agree to and how quickly you can respond.
            </p>
            <p>
              The info on this site is for general use only. It is not legal or financial advice.
            </p>
            <p>
              For questions, contact <a className="text-accent-primary" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
            <p>
              Last updated: June 6, 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
