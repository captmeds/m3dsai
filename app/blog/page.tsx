import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageTransition from "@/components/PageTransition";
import SectionLabel from "@/components/SectionLabel";
import GlowButton from "@/components/GlowButton";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog-posts";

const title = "M3DS AI Blog — IT, AI and Growth Insights for Southeast Asia";
const description =
  "Practical guides on ITSM, AI automation, cybersecurity and digital transformation for SMBs in Singapore, Malaysia, Indonesia and beyond.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/blog/",
  keywords: ["M3DS AI blog", "ITSM blog Southeast Asia", "AI automation SMB", "digital transformation guide"],
});

const CATEGORY_COLORS: Record<string, string> = {
  ITSM: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "AI Automation": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Cybersecurity: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "Digital Transformation": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path: "/blog/", title, description, pageType: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
        ])}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-hero text-center">
        <div className="max-w-3xl mx-auto">
          <SectionLabel text="Blog" />
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6 leading-tight">
            Tips &amp; Guides for{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Small Businesses in Asia
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Easy-to-follow guides on AI tools, IT support, security, and growing your business online.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href={`/blog/${featured.slug}/`}
            className="group block rounded-2xl border border-border bg-bg-card hover:border-border-accent transition-all duration-300 overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLORS[featured.category] ?? "bg-sky-500/15 text-sky-300 border-sky-500/30"}`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-text-muted">
                  {new Date(featured.date).toLocaleDateString("en-SG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-xs text-text-muted">· {featured.readMinutes} min read</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-4 leading-snug">
                {featured.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
                {featured.excerpt}
              </p>
              <span className="text-accent-primary text-sm font-semibold group-hover:underline">
                Read article →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((post) => {
              const colorClass =
                CATEGORY_COLORS[post.category] ?? "bg-sky-500/15 text-sky-300 border-sky-500/30";
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group block rounded-xl border border-border bg-bg-card hover:border-border-accent transition-all duration-300 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-text-muted">{post.readMinutes} min</span>
                  </div>
                  <h2 className="text-base font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-xs text-accent-primary font-semibold group-hover:underline">
                    Read →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border-accent bg-bg-card p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Want a clear plan for your business?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Book a free call with Mehdi. We&apos;ll look at where you are now and tell you exactly what to do next — no hard sell.
          </p>
          <GlowButton href="/contact/" variant="primary">
            Book a Free Call
          </GlowButton>
        </div>
      </section>
    </PageTransition>
  );
}
