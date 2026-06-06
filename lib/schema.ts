import { siteConfig, absoluteUrl, withTrailingSlash } from "./seo";

type SchemaValue =
  | string
  | number
  | boolean
  | null
  | SchemaObject
  | SchemaValue[];

export type SchemaObject = {
  [key: string]: SchemaValue;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export function organizationSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/favicon.svg"),
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Founder and IT Service Management Consultant",
      url: absoluteUrl("/authors/mehdi-debbabi/"),
    },
    areaServed: siteConfig.markets.map((market) => ({
      "@type": "Country",
      name: market,
    })),
    sameAs: [...siteConfig.sameAs],
    description: siteConfig.defaultDescription,
    knowsAbout: [
      "IT Service Management",
      "ITIL 4",
      "AI automation",
      "Service desk modernization",
      "Freshservice implementation",
      "HaloITSM implementation",
      "Jira Service Management",
      "Cloud infrastructure",
      "Cybersecurity consulting",
      "SEO and AI search optimization",
    ],
  };
}

export function websiteSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/resources/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({
  path,
  title,
  description,
  pageType = "WebPage",
}: {
  path: string;
  title: string;
  description: string;
  pageType?: string;
}): SchemaObject {
  const url = absoluteUrl(withTrailingSlash(path));

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    headline: title,
    description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
    inLanguage: "en",
  };
}

export function serviceSchema({
  path,
  name,
  description,
  areaServed = siteConfig.markets,
  offers,
}: {
  path: string;
  name: string;
  description: string;
  areaServed?: readonly string[];
  offers?: SchemaObject[];
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(withTrailingSlash(path))}#service`,
    name,
    serviceType: name,
    description,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: areaServed.map((market) => ({
      "@type": "Place",
      name: market,
    })),
    offers: offers ?? [
      {
        "@type": "Offer",
        priceCurrency: "SGD",
        availability: "https://schema.org/InStock",
        url: absoluteUrl(withTrailingSlash(path)),
      },
    ],
  };
}

export function localBusinessSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#local-business`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    priceRange: "$$",
    image: absoluteUrl(siteConfig.ogImage),
    areaServed: siteConfig.markets.map((market) => ({
      "@type": "Country",
      name: market,
    })),
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    makesOffer: [
      "IT Service Management Consulting",
      "AI Automation Consulting",
      "Cybersecurity Consulting",
      "Custom Dashboard Development",
      "Website Design and SEO",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(withTrailingSlash(item.path)),
    })),
  };
}

export function faqSchema(items: FaqItem[]): SchemaObject {
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

export function articleSchema({
  path,
  title,
  description,
  datePublished = "2026-06-06",
  dateModified = "2026-06-06",
}: {
  path: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(withTrailingSlash(path))}#article`,
    headline: title,
    description,
    image: absoluteUrl(siteConfig.ogImage),
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.founder,
      url: absoluteUrl("/authors/mehdi-debbabi/"),
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: absoluteUrl(withTrailingSlash(path)),
  };
}

export function graphSchema(items: SchemaObject[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}
