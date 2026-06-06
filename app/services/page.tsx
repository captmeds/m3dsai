import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { serviceLandingPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "ITSM, AI Automation, Cybersecurity and Web Growth Services";
const description =
  "M3DS AI service pages for ITSM consulting, AI automation, Freshservice, HaloITSM, Jira Service Management, dashboards, cybersecurity, cloud and website SEO.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/services/",
  keywords: ["ITSM consulting services", "AI automation services", "Freshservice consultant", "HaloITSM consultant"],
});

export default function ServicesPage() {
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
      <SeoHubPage
        eyebrow="Services"
        title="ITSM, AI Automation and Web Growth Services"
        description={description}
        pages={serviceLandingPages}
        basePath="/services"
        ctaLabel="Plan the right engagement"
      />
    </>
  );
}
