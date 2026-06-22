import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Website Design & Development for Australian & Asian SMBs | M3DS AI",
  description:
    "High-converting AI-powered website design and development for SMBs across Australia and Asia. Mobile-first, SEO-optimised, and built to generate leads. Start your website project today.",
  path: "/services/ai-website-design/",
  keywords: [
    "AI website design",
    "AI web development",
    "website design Australia",
    "web development Asia",
    "high-converting website design",
    "e-commerce website development",
    "landing page development",
    "mobile-first website design",
    "conversion optimisation",
  ],
});

export default function AIWebsiteDesignPage() {
  return <ServicePage serviceId="ai-website-design" />;
}
