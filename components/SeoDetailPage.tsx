import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionLabel from "./SectionLabel";
import GlowButton from "./GlowButton";
import type { SeoContentPage } from "@/lib/seo-content";

type SeoDetailPageProps = {
  page: SeoContentPage;
  basePath: string;
  groupLabel: string;
  relatedPages?: SeoContentPage[];
};

export default function SeoDetailPage({
  page,
  basePath,
  groupLabel,
  relatedPages = [],
}: SeoDetailPageProps) {
  const answer =
    page.sections[0]?.body ??
    page.summary;

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/8 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center text-text-secondary hover:text-accent-primary text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {groupLabel}
          </Link>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <SectionLabel text={page.eyebrow} className="mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                {page.h1}
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mb-8">
                {page.summary}
              </p>
              <div className="flex flex-wrap gap-4">
                <GlowButton href={page.ctaHref} variant="primary">
                  {page.ctaLabel}
                </GlowButton>
                <GlowButton href="/resources/itsm-consulting-southeast-asia/" variant="ghost">
                  Read ITSM guide
                </GlowButton>
              </div>
            </div>

            <aside className="glass tech-surface rounded-lg p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-primary mb-3">
                Direct Answer
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {answer}
              </p>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-text-muted">Primary keyword</dt>
                  <dd className="text-text-primary text-sm mt-1">{page.targetKeyword}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-text-muted">Business value</dt>
                  <dd className="text-text-primary text-sm mt-1">{page.businessValue}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                  {section.heading}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-text-secondary text-sm">
                        <CheckCircle2 className="h-5 w-5 text-accent-secondary flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="FAQ" className="mb-4" />
          <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
            Questions People Ask
          </h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="glass rounded-lg p-5">
                <summary className="cursor-pointer font-display font-semibold text-text-primary">
                  {faq.question}
                </summary>
                <p className="text-text-secondary text-sm leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedPages.length > 0 && (
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <SectionLabel text="Related" className="mb-4" />
                <h2 className="font-display text-3xl font-bold text-text-primary">
                  Keep Building Context
                </h2>
              </div>
              <Link href={`${basePath}/`} className="hidden sm:inline-flex items-center gap-2 text-sm text-accent-primary">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPages.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  href={`${basePath}/${related.slug}/`}
                  className="glass rounded-lg p-6 transition-colors duration-300 hover:border-accent-primary/50"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary mb-3">
                    {related.eyebrow}
                  </p>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    {related.h1}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass tech-surface rounded-lg p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
              Need this implemented cleanly?
            </h2>
            <p className="text-text-secondary mb-8">
              M3DS AI can audit the current state, design the roadmap and help your team implement the operational, automation and growth systems behind it.
            </p>
            <GlowButton href={page.ctaHref} variant="primary">
              {page.ctaLabel}
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
