import type { MetadataRoute } from "next";
import { allGeneratedRoutes, staticRoutes } from "@/lib/seo-content";
import { absoluteUrl } from "@/lib/seo";

const now = new Date("2026-06-06T00:00:00+07:00");

function sitemapEntry(
  route: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const highPriorityRoutes = ["/", "/contact/", "/pricing/"];
  const generated = allGeneratedRoutes.map((route) =>
    sitemapEntry(route, route.startsWith("/services/") ? 0.92 : 0.78, "monthly")
  );
  const staticEntries = staticRoutes.map((route) =>
    sitemapEntry(route, highPriorityRoutes.includes(route) ? 1 : 0.72, "monthly")
  );

  return [...staticEntries, ...generated];
}
