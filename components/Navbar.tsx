"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import GlowButton from "./GlowButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-ink/90 backdrop-blur-xl border-b border-border-ink'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl font-bold">
                <span className={isScrolled ? "text-text-on-ink" : "text-text-primary"}>m3DS</span>
                <span className={isScrolled ? "text-accent-bright" : "text-accent-primary"}>ai</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group ${
                    isScrolled
                      ? "text-text-on-ink-muted hover:text-text-on-ink"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${isScrolled ? "bg-accent-bright" : "bg-accent-primary"}`} />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <GlowButton
                href="/contact/"
                variant="outline"
                className={`text-sm py-2.5 px-6 ${isScrolled ? "!border-accent-bright !text-accent-bright hover:!bg-accent-bright hover:!text-bg-ink" : ""}`}
              >
                Book a Free Call
              </GlowButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${isScrolled ? "text-text-on-ink" : "text-text-primary"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-text-primary hover:text-accent-primary transition-colors"
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <GlowButton href="/contact/" variant="primary">
              Book a Free Call
            </GlowButton>
          </div>
        </div>
      )}
    </>
  );
}
