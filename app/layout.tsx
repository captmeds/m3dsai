import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import LazyChatWidget from "@/components/LazyChatWidget";
import { graphSchema, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | M3DS AI",
  },
  description: siteConfig.defaultDescription,
  keywords: [
    "IT service management consulting",
    "ITSM consultant Southeast Asia",
    "AI automation consulting",
    "Freshservice consultant",
    "HaloITSM consultant",
    "Jira Service Management consultant",
    "cybersecurity consultant SMB",
    "custom dashboards",
    "technical SEO consultant",
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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var storedTheme = window.localStorage.getItem("m3dsai-theme");
                var theme = storedTheme === "light" || storedTheme === "dark"
                  ? storedTheme
                  : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
                document.documentElement.dataset.theme = theme;
              } catch (error) {
                document.documentElement.dataset.theme = "dark";
              }
            })();
          `}
        </Script>
      </head>
      <body className="antialiased">
        <JsonLd data={graphSchema([organizationSchema(), websiteSchema(), localBusinessSchema()])} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LazyChatWidget />
      </body>
    </html>
  );
}
