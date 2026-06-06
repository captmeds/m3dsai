import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoDetailPage from "@/components/SeoDetailPage";
import { articleSchema, breadcrumbSchema, faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { findSeoPage, resourcePages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return resourcePages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = findSeoPage(resourcePages, params.slug);

  if (!page) {
    return pageMetadata({
      title: "Resource Not Found",
      description: "This M3DS AI resource could not be found.",
      path: "/resources/",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/resources/${page.slug}/`,
    keywords: [page.targetKeyword, ...page.secondaryKeywords],
    type: "article",
  });
}

export default function ResourceDetailPage({ params }: PageProps) {
  const page = findSeoPage(resourcePages, params.slug);

  if (!page) {
    notFound();
  }

  const path = `/resources/${page.slug}/`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: page.title, description: page.description, pageType: "Article" }),
          articleSchema({ path, title: page.title, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
            { name: page.h1, path },
          ]),
          faqSchema(page.faqs),
        ])}
      />
      <SeoDetailPage
        page={page}
        basePath="/resources"
        groupLabel="Resources"
        relatedPages={resourcePages.filter((related) => related.slug !== page.slug)}
      />
    </>
  );
}
