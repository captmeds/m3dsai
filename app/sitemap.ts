import type { MetadataRoute } from "next";
import { allGeneratedRoutes, staticRoutes } from "@/lib/seo-content";
import { absoluteUrl } from "@/lib/seo";

const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-06-22",
  "/contact/": "2026-06-22",
  "/pricing/": "2026-06-22",
  "/services/openclaw/": "2026-06-22",
};
const DEFAULT_DATE = "2026-06-15";

function sitemapEntry(
  route: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(route),
    lastModified: new Date(LAST_MODIFIED[route] ?? DEFAULT_DATE),
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
