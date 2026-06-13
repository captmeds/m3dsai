import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work | Client Websites and Digital Projects",
  description:
    "Explore M3DS AI client work including XJKT, ZAAAS, Bali Sunny Kids, 23Tribes, and Keira Shabira.",
  path: "/our-work/",
  keywords: ["M3DS AI portfolio", "client website projects", "Bali Sunny Kids website", "23Tribes website", "ZAAAS", "XJKT"],
});

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
