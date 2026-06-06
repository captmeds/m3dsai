import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Dashboard Development and BI Services | M3DS AI",
  description:
    "Custom dashboard and BI development for KPI tracking, service desk reporting, multi-source integration and automated alerts.",
  path: "/services/custom-dashboards/",
  keywords: ["custom dashboard development", "BI dashboard consultant", "KPI dashboard", "service desk dashboard"],
});

export default function CustomDashboardsPage() {
  return <ServicePage serviceId="custom-dashboards" />;
}
