import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "M3DS AI Pricing — 40% Off All Services | Launch Offer",
  description:
    "M3DS AI launch pricing: AI consulting, cloud infrastructure, custom dashboards, website design, OpenClaw automation and SEO — all at 40% below market rate.",
  path: "/pricing/",
  keywords: [
    "M3DS AI pricing",
    "AI consulting pricing Australia",
    "cloud infrastructure pricing SEA",
    "40% off AI services",
    "OpenClaw pricing",
    "SEO services pricing",
  ],
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
