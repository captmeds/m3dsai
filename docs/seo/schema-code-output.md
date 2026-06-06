# M3DS AI Schema And SEO Code Output

This file contains production-ready code patterns for the current Next.js 14 static export site. Do not publish fake address, phone, review, or certification data. Use only facts visible on the page or verified in business records.

## 1. Shared SEO Configuration

~~~ts
// lib/seo.ts
import type { Metadata } from "next";

export const siteConfig = {
  name: "M3DS AI",
  legalName: "M3DS AI",
  url: "https://m3dsai.com",
  email: "meds@m3dsai.com",
  founder: "Mehdi Debbabi",
  founderAlias: "Meds",
  description:
    "M3DS AI is a Southeast Asia focused AI-powered IT service management consultancy helping SMB and mid-market teams improve IT operations, automation, security, dashboards, websites, and growth systems.",
  areaServed: ["Singapore", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam", "Southeast Asia"],
  sameAs: ["https://github.com/captmeds"],
};

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = new URL(input.path, siteConfig.url).toString();
  const image = input.image ? new URL(input.image, siteConfig.url).toString() : new URL("/og/m3dsai-og.jpg", siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name + " - AI-powered IT service management" }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}
~~~

## 2. Sitemap

~~~ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const staticRoutes = [
  "",
  "/services/it-service-management-consulting/",
  "/services/ai-automation-consulting/",
  "/services/cybersecurity-consulting/",
  "/services/cloud-infrastructure-devops/",
  "/services/custom-dashboards-bi/",
  "/services/website-design-seo/",
  "/pricing/",
  "/case-studies/",
  "/about/",
  "/contact/",
  "/resources/",
  "/locations/singapore-it-consulting/",
  "/locations/malaysia-it-consulting/",
  "/locations/indonesia-it-consulting/",
  "/locations/philippines-it-consulting/",
  "/locations/thailand-it-consulting/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: siteConfig.url + route,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
~~~

## 3. Robots.txt For Search And AI Visibility

~~~ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: siteConfig.url + "/sitemap.xml",
    host: siteConfig.url,
  };
}
~~~

## 4. JSON-LD Component

~~~tsx
// components/JsonLd.tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
~~~

## 5. Homepage Organization Graph

~~~ts
// lib/schema.ts
import { siteConfig } from "@/lib/seo";

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": siteConfig.url + "/#organization",
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        founder: {
          "@type": "Person",
          name: siteConfig.founder,
          alternateName: siteConfig.founderAlias,
          description: "Founder of M3DS AI with 24+ years of enterprise IT experience across infrastructure, virtualization, networking, Active Directory, data centers, and service operations.",
          sameAs: ["https://github.com/captmeds"],
        },
        sameAs: siteConfig.sameAs,
        areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
        knowsAbout: [
          "IT Service Management",
          "ITIL",
          "AI automation",
          "Cybersecurity consulting",
          "Cloud infrastructure",
          "Custom dashboards",
          "Technical SEO",
          "Conversion-focused web design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteConfig.url + "/#website",
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": siteConfig.url + "/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": siteConfig.url + "/#professionalservice",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
        serviceType: [
          "ITSM consulting",
          "AI automation consulting",
          "Cybersecurity consulting",
          "Cloud infrastructure consulting",
          "Custom dashboard development",
          "Website design and SEO",
        ],
        provider: { "@id": siteConfig.url + "/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": siteConfig.url + "/#webpage",
        url: siteConfig.url,
        name: "AI-powered IT service management consultancy for Southeast Asia",
        description: siteConfig.description,
        isPartOf: { "@id": siteConfig.url + "/#website" },
        about: { "@id": siteConfig.url + "/#organization" },
        primaryImageOfPage: { "@type": "ImageObject", url: siteConfig.url + "/og/m3dsai-og.jpg" },
      },
    ],
  };
}
~~~

## 6. Service Schema Generator

~~~ts
// lib/service-schema.ts
import { siteConfig } from "@/lib/seo";

export function serviceSchema(input: {
  name: string;
  path: string;
  description: string;
  audience: string;
  features: string[];
}) {
  const url = siteConfig.url + input.path;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": url + "#service",
        name: input.name,
        description: input.description,
        serviceType: input.name,
        provider: { "@id": siteConfig.url + "/#organization" },
        areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
        audience: { "@type": "BusinessAudience", audienceType: input.audience },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: input.name + " deliverables",
          itemListElement: input.features.map((feature, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: { "@type": "Service", name: feature },
          })),
        },
      },
      breadcrumbSchema([
        ["Home", "/"],
        ["Services", "/services/"],
        [input.name, input.path],
      ]),
    ],
  };
}

export function breadcrumbSchema(items: Array<[string, string]>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: siteConfig.url + item,
    })),
  };
}
~~~

## 7. FAQ Schema

Google deprecated most FAQ rich results in 2026, but FAQ markup still helps machine parsing. Only mark up FAQs visible on the page.

~~~ts
// lib/faq-schema.ts
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
~~~

## 8. Article Schema

~~~ts
// lib/article-schema.ts
import { siteConfig } from "@/lib/seo";

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  const url = siteConfig.url + input.path;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url + "#article",
    headline: input.headline,
    description: input.description,
    image: input.image ? siteConfig.url + input.image : siteConfig.url + "/og/m3dsai-og.jpg",
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.founder,
      url: siteConfig.url + "/authors/mehdi-debbabi/",
    },
    publisher: { "@id": siteConfig.url + "/#organization" },
    mainEntityOfPage: url,
  };
}
~~~

## 9. Cloudflare Pages Headers

For static export, place this at `public/_headers` so it is copied into `out/_headers`.

~~~txt
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me https://api.whatsapp.com;

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable
~~~

## 10. llms.txt

~~~txt
# M3DS AI

M3DS AI is a Southeast Asia focused AI-powered IT service management consultancy led by Mehdi Debbabi, founder with 24+ years of enterprise IT experience.

## Core Services
- IT service management and ITIL consulting
- AI automation, AI chatbots, RAG systems, and voice AI agents
- Cybersecurity consulting, penetration testing, zero trust, and compliance readiness
- Cloud infrastructure, DevOps, Cloudflare Pages, and Next.js implementation
- Custom dashboards, KPI reporting, and BI systems
- Conversion-focused websites, technical SEO, and digital growth

## Key Pages
- https://m3dsai.com/services/it-service-management-consulting/
- https://m3dsai.com/services/ai-automation-consulting/
- https://m3dsai.com/services/cybersecurity-consulting/
- https://m3dsai.com/resources/itsm-consulting-southeast-asia/
- https://m3dsai.com/contact/

## Contact
meds@m3dsai.com
~~~
