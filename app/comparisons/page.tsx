import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SeoHubPage from "@/components/SeoHubPage";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { comparisonPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

const title = "ITSM Software Comparisons for SMBs";
const description =
  "Compare Freshservice, HaloITSM, Jira Service Management and ServiceNow for SMB service desk modernization.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/comparisons/",
  keywords: ["ITSM software comparison", "ServiceNow vs Freshservice", "HaloITSM vs Freshservice", "JSM vs ServiceNow"],
});

export default function ComparisonsPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/comparisons/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/comparisons/" },
          ]),
        ])}
      />
      <SeoHubPage
        eyebrow="Comparisons"
        title="ITSM Software Comparisons for SMBs"
        description={description}
        pages={comparisonPages}
        basePath="/comparisons"
        ctaLabel="Choose the right ITSM tool"
      />
    </>
  );
}
