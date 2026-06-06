import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoDetailPage from "@/components/SeoDetailPage";
import { articleSchema, breadcrumbSchema, faqSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { findSeoPage, industryPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return industryPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = findSeoPage(industryPages, params.slug);

  if (!page) {
    return pageMetadata({
      title: "Industry Not Found",
      description: "This M3DS AI industry page could not be found.",
      path: "/industries/",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/industries/${page.slug}/`,
    keywords: [page.targetKeyword, ...page.secondaryKeywords],
    type: "article",
  });
}

export default function IndustryDetailPage({ params }: PageProps) {
  const page = findSeoPage(industryPages, params.slug);

  if (!page) {
    notFound();
  }

  const path = `/industries/${page.slug}/`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: page.title, description: page.description, pageType: "Article" }),
          articleSchema({ path, title: page.title, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries/" },
            { name: page.eyebrow, path },
          ]),
          faqSchema(page.faqs),
        ])}
      />
      <SeoDetailPage
        page={page}
        basePath="/industries"
        groupLabel="Industries"
        relatedPages={industryPages.filter((related) => related.slug !== page.slug)}
      />
    </>
  );
}
