import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "M3DS AI Work | Client Websites, Automation and Digital Projects",
  description:
    "Explore M3DS AI client work including Bali Sunny Kids, 23Tribes, Keira Shabira, XJKT Fun and other digital projects.",
  path: "/our-work/",
  keywords: ["M3DS AI portfolio", "client website projects", "Bali Sunny Kids website", "23Tribes website"],
});

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
