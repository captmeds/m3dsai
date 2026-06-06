import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoDetailPage from "@/components/SeoDetailPage";
import { breadcrumbSchema, faqSchema, graphSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import { findSeoPage, locationPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return locationPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = findSeoPage(locationPages, params.slug);

  if (!page) {
    return pageMetadata({
      title: "Location Not Found",
      description: "This M3DS AI location page could not be found.",
      path: "/locations/",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${page.slug}/`,
    keywords: [page.targetKeyword, ...page.secondaryKeywords],
  });
}

export default function LocationDetailPage({ params }: PageProps) {
  const page = findSeoPage(locationPages, params.slug);

  if (!page) {
    notFound();
  }

  const path = `/locations/${page.slug}/`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: page.title, description: page.description }),
          serviceSchema({ path, name: page.h1, description: page.description, areaServed: [page.eyebrow] }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
            { name: page.eyebrow, path },
          ]),
          faqSchema(page.faqs),
        ])}
      />
      <SeoDetailPage
        page={page}
        basePath="/locations"
        groupLabel="Locations"
        relatedPages={locationPages.filter((related) => related.slug !== page.slug)}
      />
    </>
  );
}
