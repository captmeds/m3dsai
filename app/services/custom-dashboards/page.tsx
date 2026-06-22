import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Dashboards & Business Intelligence Development Australia & Asia | M3DS AI",
  description:
    "Custom business intelligence dashboards for Australian and Asian SMBs. Real-time KPI monitoring, sales reporting, marketing analytics, and automated reporting. Request a demo.",
  path: "/services/custom-dashboards/",
  keywords: [
    "custom dashboard development",
    "business intelligence dashboards",
    "KPI dashboard Australia",
    "real-time reporting dashboard",
    "sales analytics dashboard",
    "data visualisation consultant",
    "BI dashboard development",
    "executive dashboard design",
  ],
});

export default function CustomDashboardsPage() {
  return <ServicePage serviceId="custom-dashboards" />;
}
