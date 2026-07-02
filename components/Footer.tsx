"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  services: [
    { name: "AI Consulting", href: "/services/ai-consulting/" },
    { name: "OpenClaw Setup", href: "/services/openclaw/" },
    { name: "Cloud & Hosting", href: "/services/cloud-infrastructure/" },
    { name: "Custom Dashboards", href: "/services/custom-dashboards/" },
    { name: "Website Design", href: "/services/ai-website-design/" },
    { name: "SEO & Marketing", href: "/services/seo-digital-marketing/" },
  ],
  company: [
    { name: "About Us", href: "/about/" },
    { name: "Blog", href: "/blog/" },
    { name: "Our Work", href: "/our-work/" },
    { name: "Pricing", href: "/pricing/" },
    { name: "Contact", href: "/contact/" },
  ],
  locations: [
    { name: "Singapore", href: "/locations/singapore/" },
    { name: "Malaysia", href: "/locations/malaysia/" },
    { name: "Indonesia", href: "/locations/indonesia/" },
    { name: "Australia", href: "/locations/australia/" },
  ],
};

export default function Footer() {
  return (
    <footer className="section-ink relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-bright/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold">
                <span className="text-text-on-ink">m3DS</span>
                <span className="text-accent-bright">ai</span>
              </span>
            </Link>
            <p className="text-text-on-ink-muted text-sm leading-relaxed mb-6">
              We help small businesses in Asia and Australia get more customers, save time, and grow online — with no tech jargon.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-bright hover:gap-3 transition-all duration-200"
            >
              Book a free call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-ink-muted mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-on-ink-muted hover:text-accent-bright text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-ink-muted mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-on-ink-muted hover:text-accent-bright text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations + Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-ink-muted mb-5">
              Locations
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-on-ink-muted hover:text-accent-bright text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-on-ink-muted mb-5">
              Contact
            </h4>
            <a
              href="mailto:admin@m3dsai.com"
              className="inline-flex items-center gap-2 text-text-on-ink-muted hover:text-accent-bright text-sm transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              admin@m3dsai.com
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-ink flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-on-ink-muted text-xs">
            © 2026 m3DSai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy/"
              className="text-text-on-ink-muted hover:text-text-on-ink text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service/"
              className="text-text-on-ink-muted hover:text-text-on-ink text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
