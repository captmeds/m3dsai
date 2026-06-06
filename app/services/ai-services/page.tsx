import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Services and Automation Consulting | M3DS AI",
  description:
    "AI services for SMBs, including OpenClaw setup, AI chatbots, workflow automation, predictive analytics and AI strategy.",
  path: "/services/ai-services/",
  keywords: ["AI services", "AI automation consultant", "AI chatbot integration", "OpenClaw setup"],
});

export default function AIServicesPage() {
  return <ServicePage serviceId="ai-services" />;
}
