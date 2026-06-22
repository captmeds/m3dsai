import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Infrastructure & Managed Hosting Services Australia & Asia | M3DS AI",
  description:
    "Secure, scalable cloud infrastructure design, deployment, and management for Australian and Asian SMBs. Cloud migration, performance optimisation, and disaster recovery. Get a free consultation.",
  path: "/services/cloud-infrastructure/",
  keywords: [
    "cloud infrastructure services",
    "cloud migration Australia",
    "cloud hosting solutions",
    "managed cloud services",
    "cloud computing solutions",
    "cloud architecture consultant",
    "server management Australia",
    "cloud security services",
  ],
});

export default function CloudInfrastructurePage() {
  return <ServicePage serviceId="cloud-infrastructure" />;
}
