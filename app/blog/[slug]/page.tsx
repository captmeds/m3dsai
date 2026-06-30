import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageTransition from "@/components/PageTransition";
import GlowButton from "@/components/GlowButton";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { pageMetadata } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  webPageSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
    type: "article",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  ITSM: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "AI Automation": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Cybersecurity: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "Digital Transformation": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}/`;
  const colorClass = CATEGORY_COLORS[post.category] ?? "bg-sky-500/15 text-sky-300 border-sky-500/30";

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || true))
    .slice(0, 3);

  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title: post.title, description: post.metaDescription, pageType: "Article" }),
          articleSchema({ path, title: post.title, description: post.metaDescription, datePublished: post.date, dateModified: post.date }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.title, path },
          ]),
          faqSchema(post.faqs),
        ])}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 bg-gradient-hero">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/blog/"
              className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
            >
              ← Blog
            </Link>
            <span className="text-text-muted">/</span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>By Admin</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-SG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {post.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-bg-card p-6"
              >
                <h3 className="text-base font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border-accent bg-bg-card p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Ready to take action?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              M3DS AI helps Southeast Asian SMBs modernise IT service management, automate
              operations and grow with AI — with 24+ years of enterprise IT behind every
              engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton href="/contact/" variant="primary">
                Book a Strategy Call
              </GlowButton>
              <GlowButton href="/services/" variant="ghost">
                Explore Services
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-text-primary mb-6">More from the blog</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => {
                const rc = CATEGORY_COLORS[related.category] ?? "bg-sky-500/15 text-sky-300 border-sky-500/30";
                return (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}/`}
                    className="group block rounded-xl border border-border bg-bg-card p-5 hover:border-border-accent transition-colors"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${rc} mb-3 inline-block`}>
                      {related.category}
                    </span>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors leading-snug">
                      {related.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
