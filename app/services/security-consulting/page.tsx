import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security Consulting and Cybersecurity Audits | M3DS AI",
  description:
    "Security consulting for SMBs, including security audits, vulnerability assessments, compliance support and incident response planning.",
  path: "/services/security-consulting/",
  keywords: ["security consulting", "cybersecurity audit SMB", "security assessment", "incident response planning"],
});

export default function SecurityConsultingPage() {
  return <ServicePage serviceId="security-consulting" />;
}
