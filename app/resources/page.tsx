import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { resourcePages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "ITSM, AI Automation and SEO Resources";
const description =
  "Practical M3DS AI guides for ITSM, AI service desk automation, cybersecurity, cloud migration, technical SEO and AI search optimization.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/resources/",
  keywords: ["ITSM resources", "AI automation guide", "AI search optimization", "cybersecurity checklist SMB"],
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/resources/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
          ]),
        ])}
      />
      <SeoHubPage
        eyebrow="Resources"
        title="Guides on AI, IT, and Growing Your Business Online"
        description="Practical guides on AI tools, IT support, security, cloud servers, and getting your website found on Google."
        pages={resourcePages}
        basePath="/resources"
        ctaLabel="Book a Free Call"
      />
    </>
  );
}
