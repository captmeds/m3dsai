import type { Metadata } from "next";
import BillingPlatformPrototype from "@/components/BillingPlatformPrototype";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "M3DSAI Billing Platform Dashboard Prototype";
const description =
  "Interactive M3DSAI billing dashboard prototype with invoices, clients, payments, invoice creation and payment recording workflows.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/billing-platform/",
  keywords: ["M3DSAI billing platform", "invoice dashboard", "SEA billing dashboard"],
  noIndex: true,
});

export default function BillingPlatformPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/billing-platform/", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Billing Platform", path: "/billing-platform/" },
          ]),
        ])}
      />
      <BillingPlatformPrototype />
    </>
  );
}
