"use client";

import { ArrowUpRight } from "lucide-react";
import GlowButton from "./GlowButton";
import type { PortfolioProject } from "@/lib/portfolio";

export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  const { name, initials, url, displayUrl, description, bio, gradient } = project;

  return (
    <article className="group flex h-full flex-col rounded-2xl glass p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-primary/40 hover:shadow-xl hover:shadow-accent-glow">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} font-display text-lg font-bold text-white shadow-lg`}
        aria-hidden="true"
      >
        {initials}
      </div>

      <h3 className="font-display text-xl font-bold text-text-primary mt-5">
        {name}
      </h3>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-accent-primary transition-colors hover:text-accent-secondary break-all"
      >
        {displayUrl}
        <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      </a>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      <p className="mt-3 flex-grow text-sm leading-relaxed text-text-muted">
        {bio}
      </p>

      <GlowButton
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        className="mt-6 w-full text-sm py-3"
      >
        Visit Website
        <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </GlowButton>
    </article>
  );
}
