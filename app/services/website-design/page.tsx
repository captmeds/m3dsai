import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Services for SMBs | M3DS AI",
  description:
    "Fast, conversion-focused website design services with SEO architecture, performance optimization and AI search readiness.",
  path: "/services/website-design/",
  keywords: ["website design services", "SEO website design", "Next.js website design", "service business website"],
});

export default function WebsiteDesignPage() {
  return <ServicePage serviceId="website-design" />;
}
