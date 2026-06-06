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
              This website provides general information about M3DS AI consulting services. Submitting an inquiry does not create a client relationship until a written scope or agreement is accepted.
            </p>
            <p>
              Project timelines, pricing and deliverables depend on agreed scope, access, dependencies and client responsiveness.
            </p>
            <p>
              Website content is provided for informational purposes and should not be treated as legal, financial or compliance advice.
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
