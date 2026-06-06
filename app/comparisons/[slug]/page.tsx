import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoDetailPage from "@/components/SeoDetailPage";
import { articleSchema, breadcrumbSchema, faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { comparisonPages, findSeoPage } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = findSeoPage(comparisonPages, params.slug);

  if (!page) {
    return pageMetadata({
      title: "Comparison Not Found",
      description: "This M3DS AI comparison page could not be found.",
      path: "/comparisons/",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/comparisons/${page.slug}/`,
    keywords: [page.targetKeyword, ...page.secondaryKeywords],
    type: "article",
  });
}

export default function ComparisonDetailPage({ params }: PageProps) {
  const page = findSeoPage(comparisonPages, params.slug);

  if (!page) {
    notFound();
  }

  const path = `/comparisons/${page.slug}/`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: page.title, description: page.description, pageType: "Article" }),
          articleSchema({ path, title: page.title, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/comparisons/" },
            { name: page.h1, path },
          ]),
          faqSchema(page.faqs),
        ])}
      />
      <SeoDetailPage
        page={page}
        basePath="/comparisons"
        groupLabel="Comparisons"
        relatedPages={comparisonPages.filter((related) => related.slug !== page.slug)}
      />
    </>
  );
}
