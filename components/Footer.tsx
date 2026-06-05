"use client";

import Link from "next/link";

const footerLinks = {
  services: [
    { name: "Website Design", href: "/services/website-design/" },
    { name: "AI Services", href: "/services/ai-services/" },
    { name: "Digital Marketing", href: "/services/digital-marketing/" },
    { name: "Custom Dashboards", href: "/services/custom-dashboards/" },
    { name: "Security Consulting", href: "/services/security-consulting/" }
  ],
  company: [
    { name: "Our Work", href: "/our-work/" },
    { name: "Pricing", href: "/pricing/" },
    { name: "Contact", href: "/contact/" }
  ]
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold">
                <span className="text-text-primary">m3DS</span>
                <span className="text-accent-primary">ai</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Smart Technology. Real Results. AI-powered IT services for SMBs ready to grow.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-text-primary mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>admin@m3dsai.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © 2026 m3DSai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-text-muted hover:text-text-secondary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-text-muted hover:text-text-secondary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
