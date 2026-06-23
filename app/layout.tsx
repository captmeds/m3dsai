import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import LazyChatWidget from "@/components/LazyChatWidget";
import { graphSchema, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { CurrencyProvider } from "@/lib/currency";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | M3DS AI",
  },
  description: siteConfig.defaultDescription,
  keywords: [
    "AI consulting Australia",
    "AI consulting Asia",
    "business automation",
    "cloud infrastructure services",
    "cloud migration Australia",
    "custom dashboard development",
    "AI website design",
    "SEO services Australia",
    "digital marketing agency",
    "OpenClaw setup",
    "SMB technology consulting",
    "digital transformation",
    "business process automation",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={graphSchema([organizationSchema(), websiteSchema(), localBusinessSchema()])} />
        <CurrencyProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LazyChatWidget />
        </CurrencyProvider>
      </body>
    </html>
  );
}
