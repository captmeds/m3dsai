import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact M3DS AI | Book an ITSM and AI Automation Consultation",
  description:
    "Contact M3DS AI to discuss ITSM consulting, AI automation, dashboards, cybersecurity, website SEO and AI search optimization.",
  path: "/contact/",
  keywords: ["contact M3DS AI", "book ITSM consultation", "AI automation consultation"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
