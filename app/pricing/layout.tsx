import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "M3DS AI Pricing | ITSM, AI Automation, Web and Security Services",
  description:
    "Review M3DS AI pricing options for ITSM consulting, AI automation, website SEO, dashboards, digital marketing and cybersecurity services.",
  path: "/pricing/",
  keywords: ["M3DS AI pricing", "ITSM consulting pricing", "AI automation pricing", "website SEO pricing"],
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
