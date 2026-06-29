import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { locationPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "ITSM and AI Automation Consulting Across Southeast Asia";
const description =
  "Location pages for M3DS AI consulting across Singapore, Malaysia, Indonesia, Philippines and Thailand.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/locations/",
  keywords: ["ITSM consultant Singapore", "ITSM consultant Malaysia", "AI automation consultant Indonesia"],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/locations/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
          ]),
        ])}
      />
      <SeoHubPage
        eyebrow="Locations"
        title="We Work With Businesses Across Southeast Asia"
        description="We help businesses in Singapore, Malaysia, Indonesia, Philippines, and Thailand with AI tools, IT support, and website growth."
        pages={locationPages}
        basePath="/locations"
        ctaLabel="Talk to Us"
      />
    </>
  );
}
