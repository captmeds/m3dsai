import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { industryPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "ITSM, AI Automation and SEO by Industry";
const description =
  "Industry-specific M3DS AI consulting pages for fintech, ecommerce, logistics, healthcare and professional services teams.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/industries/",
  keywords: ["ITSM by industry", "AI automation fintech", "ecommerce ITSM", "healthcare cybersecurity SMB"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/industries/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries/" },
          ]),
        ])}
      />
      <SeoHubPage
        eyebrow="Industries"
        title="ITSM, AI Automation and SEO by Industry"
        description={description}
        pages={industryPages}
        basePath="/industries"
        ctaLabel="Discuss industry fit"
      />
    </>
  );
}
