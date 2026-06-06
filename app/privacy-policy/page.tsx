import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata, siteConfig } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "M3DS AI privacy policy covering contact submissions, project inquiries, analytics and how to contact the team about data.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/privacy-policy/", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy/" },
          ]),
        ])}
      />
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Legal" className="mb-4" />
          <h1 className="font-display text-4xl font-bold text-text-primary mb-6">
            Privacy Policy
          </h1>
          <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
            <p>
              M3DS AI collects the information you submit through forms or direct email so we can respond to inquiries, scope projects and provide consulting services.
            </p>
            <p>
              We may collect business contact details, project requirements, website URLs, budget ranges, timelines and messages you choose to provide.
            </p>
            <p>
              We do not sell personal information. We use submitted information for communication, project evaluation, service delivery, security and basic website analytics.
            </p>
            <p>
              To ask about your data, contact <a className="text-accent-primary" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
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
