import type { Metadata } from "next";

export const siteConfig = {
  name: "M3DS AI",
  legalName: "M3DS AI",
  domain: "m3dsai.com",
  url: "https://m3dsai.com",
  email: "meds@m3dsai.com",
  founder: "Mehdi Debbabi",
  tagline: "AI-powered IT Service Management for Southeast Asia",
  defaultTitle: "M3DS AI | IT Service Management, AI Automation and Web Growth",
  defaultDescription:
    "M3DS AI helps Southeast Asian SMBs modernize IT service management, AI automation, dashboards, cybersecurity, websites and SEO with 24+ years of enterprise IT expertise.",
  locale: "en_US",
  ogImage: "/og/m3dsai-og.svg",
  markets: ["Singapore", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam"],
  sameAs: [
    "https://github.com/captmeds",
    "https://www.linkedin.com/company/m3ds-ai",
  ],
} as const;

export type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(siteConfig.ogImage);
  const finalTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      absolute: finalTitle,
    },
    description,
    keywords: [
      ...keywords,
      "ITSM consulting Southeast Asia",
      "AI automation consultant",
      "IT service management consultant",
      "M3DS AI",
    ],
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: finalTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [image],
    },
  };
}

export function withTrailingSlash(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}
