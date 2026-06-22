import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Consulting & Business Automation Services Australia & Asia | M3DS AI",
  description:
    "Expert AI consulting and business automation for SMBs across Australia and Asia. Reduce costs, automate workflows, and scale operations with practical AI solutions. Book a free strategy session.",
  path: "/services/ai-consulting/",
  keywords: [
    "AI consulting Australia",
    "AI consulting Asia",
    "business automation",
    "AI automation solutions",
    "artificial intelligence solutions",
    "business process automation",
    "digital transformation consultant",
    "SMB technology consulting",
  ],
});

export default function AIConsultingPage() {
  return <ServicePage serviceId="ai-consulting" />;
}
