import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { resourcePages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "M3DS AI Blog and Resources";
const description =
  "M3DS AI blog and resources for IT service management, AI automation, cybersecurity, dashboards, SEO and AI search.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/blog/",
  keywords: ["M3DS AI blog", "ITSM blog", "AI automation blog"],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/blog/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
        ])}
      />
      <SeoHubPage
        eyebrow="Blog"
        title="M3DS AI Blog and Resources"
        description={description}
        pages={resourcePages}
        basePath="/resources"
        ctaLabel="Turn insights into a roadmap"
      />
    </>
  );
}
