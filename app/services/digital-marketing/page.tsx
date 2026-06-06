import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Digital Marketing, SEO and CRO Services | M3DS AI",
  description:
    "Digital marketing services for SMBs including SEO, PPC, content strategy, email automation, analytics and conversion optimization.",
  path: "/services/digital-marketing/",
  keywords: ["digital marketing services", "SEO content strategy", "conversion optimization", "SMB marketing consultant"],
});

export default function DigitalMarketingPage() {
  return <ServicePage serviceId="digital-marketing" />;
}
