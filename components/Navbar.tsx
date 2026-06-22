"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import GlowButton from "./GlowButton";
import { useCurrency, FLAGS, type Currency } from "@/lib/currency";

type Theme = "light" | "dark";

function ThemeToggle({
  theme,
  onSelect,
}: {
  theme: Theme;
  onSelect: (theme: Theme) => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-bg-card/70 p-1 shadow-sm"
      role="group"
      aria-label="Choose color theme"
    >
      <button
        type="button"
        onClick={() => onSelect("light")}
        className={`inline-flex h-9 items-center gap-2 rounded px-3 text-xs font-semibold transition-colors ${
          theme === "light"
            ? "bg-accent-primary text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-pressed={theme === "light"}
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
        Light
      </button>
      <button
        type="button"
        onClick={() => onSelect("dark")}
        className={`inline-flex h-9 items-center gap-2 rounded px-3 text-xs font-semibold transition-colors ${
          theme === "dark"
            ? "bg-accent-primary text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-4 w-4" aria-hidden="true" />
        Dark
      </button>
    </div>
  );
}

const CURRENCIES: Currency[] = ["USD", "SGD", "MYR", "IDR", "PHP", "THB"];

function CurrencyToggle() {
  const { currency, detected, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Switch display currency"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-bg-card/70 px-3 text-xs font-semibold text-text-secondary shadow-sm transition-colors hover:text-text-primary"
      >
        <span>{FLAGS[currency]}</span>
        <span>{currency}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-32 rounded-lg border border-border bg-bg-card/95 py-1 shadow-xl backdrop-blur-xl z-50">
          {CURRENCIES.map((code) => (
            <button
              key={code}
              onClick={() => { setCurrency(code); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors ${
                code === currency
                  ? "bg-accent-primary/10 text-accent-primary font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
              }`}
            >
              <span>{FLAGS[code]}</span>
              <span>{code}</span>
              {code === detected && (
                <span className="ml-auto text-[10px] opacity-50">auto</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    if (currentTheme === "light" || currentTheme === "dark") {
      setTheme(currentTheme);
      return;
    }

    setTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }, []);

  const selectTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("m3dsai-theme", nextTheme);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl font-bold">
                <span className="text-text-primary">m3DS</span>
                <span className="text-accent-primary">ai</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-text-secondary hover:text-text-primary text-sm font-medium transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Theme, Currency and CTA */}
            <div className="hidden md:flex items-center gap-4">
              <CurrencyToggle />
              <ThemeToggle theme={theme} onSelect={selectTheme} />
              <GlowButton href="/contact/" variant="outline" className="text-sm py-2.5 px-6">
                Book a Demo
              </GlowButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-primary"
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
            <div className="flex items-center justify-center gap-3">
              <CurrencyToggle />
              <ThemeToggle theme={theme} onSelect={selectTheme} />
            </div>
            <GlowButton href="/contact/" variant="primary">
              Book a Demo
            </GlowButton>
          </div>
        </div>
      )}
    </>
  );
}
