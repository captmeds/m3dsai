import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SeoDetailPage from "@/components/SeoDetailPage";
import { breadcrumbSchema, faqSchema, graphSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import { findSeoPage, serviceLandingPages } from "@/lib/seo-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return serviceLandingPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = findSeoPage(serviceLandingPages, params.slug);

  if (!page) {
    return pageMetadata({
      title: "Service Not Found",
      description: "This M3DS AI service page could not be found.",
      path: "/services/it-service-management-consulting/",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/services/${page.slug}/`,
    keywords: [page.targetKeyword, ...page.secondaryKeywords],
  });
}

export default function ServiceLandingPage({ params }: PageProps) {
  const page = findSeoPage(serviceLandingPages, params.slug);

  if (!page) {
    notFound();
  }

  const path = `/services/${page.slug}/`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: page.title, description: page.description, pageType: "ServicePage" }),
          serviceSchema({ path, name: page.h1, description: page.description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/it-service-management-consulting/" },
            { name: page.h1, path },
          ]),
          faqSchema(page.faqs),
        ])}
      />
      <SeoDetailPage
        page={page}
        basePath="/services"
        groupLabel="Services"
        relatedPages={serviceLandingPages.filter((related) => related.slug !== page.slug)}
      />
    </>
  );
}
