import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import GlowButton from "./GlowButton";
import type { SeoContentPage } from "@/lib/seo-content";

type SeoHubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  pages: SeoContentPage[];
  basePath: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function SeoHubPage({
  eyebrow,
  title,
  description,
  pages,
  basePath,
  ctaLabel = "Book a consultation",
  ctaHref = "/contact/",
}: SeoHubPageProps) {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel text={eyebrow} className="mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              {title}
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              {description}
            </p>
            <GlowButton href={ctaHref} variant="primary">
              {ctaLabel}
            </GlowButton>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`${basePath}/${page.slug}/`}
                className="group glass tech-surface rounded-lg p-7 transition-all duration-300 hover:border-accent-primary/50 hover:-translate-y-1"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary mb-4">
                  {page.eyebrow}
                </p>
                <h2 className="font-display text-xl font-bold text-text-primary mb-3">
                  {page.h1}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {page.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {page.secondaryKeywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded border border-border px-2.5 py-1 text-xs text-text-muted"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary">
                  Read page
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
