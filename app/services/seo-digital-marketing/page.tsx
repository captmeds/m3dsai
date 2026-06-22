import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "SEO & Digital Marketing Services Australia & Asia | M3DS AI",
  description:
    "Data-driven SEO and digital marketing for SMBs in Australia and across Asia. Technical SEO, local SEO, content marketing, and lead generation campaigns. Get a free SEO audit.",
  path: "/services/seo-digital-marketing/",
  keywords: [
    "SEO services Australia",
    "digital marketing agency Australia",
    "digital marketing Asia",
    "local SEO Australia",
    "technical SEO consultant",
    "content marketing services",
    "lead generation campaigns",
    "Google Business optimisation",
    "digital growth strategy",
  ],
});

export default function SEODigitalMarketingPage() {
  return <ServicePage serviceId="seo-digital-marketing" />;
}
