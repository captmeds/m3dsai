import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot, Shield, Zap, Mic, Brain, Globe, CheckCircle, ArrowRight,
  Server, Lock, Users, Clock, MessageSquare, Wrench,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import GlowButton from "@/components/GlowButton";
import FadeUp from "@/components/animations/FadeUp";
import PageTransition from "@/components/PageTransition";
import { breadcrumbSchema, faqSchema, graphSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import OpenClawForm from "./OpenClawForm";

const title = "OpenClaw AI Agent Setup & Support — Southeast Asia | M3DS AI";
const description =
  "M3DS AI is a certified OpenClaw partner for Southeast Asia. We deploy, configure, and support your private AI agent across WhatsApp, Telegram, Slack, Discord, and 50+ tools. Live in 48 hours.";
const path = "/services/openclaw/";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    "OpenClaw setup Southeast Asia",
    "OpenClaw consultant",
    "private AI agent deployment",
    "OpenClaw WhatsApp integration",
    "OpenClaw Telegram setup",
    "AI assistant setup SEA",
    "open-source AI agent setup",
  ],
});

const features = [
  {
    icon: MessageSquare,
    title: "50+ Messaging Apps",
    desc: "OpenClaw works with WhatsApp, Telegram, Slack, Discord, and Signal — the apps your team and customers already use.",
  },
  {
    icon: Globe,
    title: "Connects to Your Apps",
    desc: "Link Gmail, Google Calendar, Notion, Airtable, and hundreds more apps to automate your daily work.",
  },
  {
    icon: Wrench,
    title: "Runs Tasks for You",
    desc: "It can manage files, control apps, and run tasks — all by itself. No manual steps needed.",
  },
  {
    icon: Mic,
    title: "Voice Commands",
    desc: "Talk to it out loud and it talks back. Your voice turns into action across your tools.",
  },
  {
    icon: Brain,
    title: "Remembers You",
    desc: "OpenClaw remembers your preferences and past chats — it gets more helpful the more you use it.",
  },
  {
    icon: Bot,
    title: "Claude & GPT-4 Ready",
    desc: "Pick your AI brain — Claude or GPT-4. We set it up to fit exactly what you need.",
  },
];

const deliverables = [
  "Full OpenClaw server setup",
  "Security setup to keep your data safe",
  "Connecting your chat apps (WhatsApp, Telegram, Slack, Discord, Signal)",
  "Picking and tuning the best AI model for you",
  "App connections (up to plan limit)",
  "Custom feature building",
  "Team training and a setup guide",
  "Ongoing monitoring and support",
];

const packages = [
  {
    name: "Starter",
    price: "$799",
    period: "one-time setup",
    desc: "For solo users or small teams starting with AI automation.",
    features: [
      "Single user",
      "1 messaging app",
      "Up to 5 app connections",
      "Basic security setup",
      "1 AI model",
      "7 days of support after setup",
      "Setup guide",
    ],
    cta: "Get Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,799",
    period: "one-time setup",
    desc: "For teams who want to use multiple apps and get more help.",
    features: [
      "Up to 5 users",
      "3 messaging apps",
      "Up to 20 app connections",
      "Advanced security",
      "2 AI models",
      "1 custom feature",
      "30 days of support after setup",
      "Team training and a guide",
    ],
    cta: "Get Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored for you",
    desc: "For larger teams needing a fully custom setup and a dedicated support person.",
    features: [
      "Unlimited users",
      "All messaging apps",
      "Unlimited app connections",
      "Enterprise security and support agreement",
      "Custom features and workflows",
      "Your own support person",
      "Regular performance reviews",
      "Priority response time",
    ],
    cta: "Talk About Scope",
    highlight: false,
  },
];

const risks = [
  "Poor setup can leave your network open to hackers",
  "Your data can leak through unsafe apps or wrong settings",
  "You could break data rules in Singapore, Malaysia, and Indonesia",
  "Crashes and bugs from a badly built setup",
  "Weeks of fixing problems if you don't have the right skills",
];

const faqs = [
  {
    question: "What is OpenClaw?",
    answer:
      "OpenClaw is a free, open AI tool that runs on your own server or cloud. It connects to your chat apps, work tools, and internal systems. Unlike other AI tools, your data stays with you — it doesn't go to outside companies.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Starter and Growth plans are live within 48 hours of starting. Enterprise setups with custom features usually take 1–2 weeks.",
  },
  {
    question: "Do I need my own server?",
    answer:
      "No. We can host OpenClaw for you on our own private cloud. Or we can set it up on your own server (AWS, GCP, DigitalOcean, etc.).",
  },
  {
    question: "Which AI does it use?",
    answer:
      "OpenClaw works with Claude (Anthropic) and GPT-4 (OpenAI). We'll help you pick the best one. You can also switch later without starting over.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. OpenClaw runs on your own server. Your data, chats, and files never leave your system — unless you set up a connection that sends them out. We add strong security to every setup.",
  },
  {
    question: "What messaging apps work with it?",
    answer:
      "WhatsApp, Telegram, Slack, Discord, and Signal work right away. You can add more through extra features.",
  },
  {
    question: "Can I add more app connections later?",
    answer:
      "Yes. We offer add-on packages and monthly plans so you can add new app connections and features any time.",
  },
  {
    question: "Do you help after the setup is done?",
    answer:
      "Yes. Starter gets 7 days of support, Growth gets 30 days, and Enterprise gets ongoing support. Monthly care plans are also available for all plans.",
  },
];

const stats = [
  { value: "50+", label: "App connections" },
  { value: "48h", label: "Setup time" },
  { value: "24/7", label: "Runs by itself" },
  { value: "100%", label: "Your own server" },
];

const whyReasons = [
  "24+ years of real IT work — not just AI tools",
  "Certified OpenClaw partner for Southeast Asia",
  "Full security setup included — not an extra cost",
  "Fixed prices with a full plan before we start",
  "You talk directly to the person doing the work",
  "We work across Singapore, Malaysia, Indonesia, Philippines, Thailand, and Vietnam time zones",
];

export default function OpenClawPage() {
  return (
    <PageTransition>
      <JsonLd
        data={graphSchema([
          webPageSchema({ path, title, description, pageType: "ServicePage" }),
          serviceSchema({ path, name: "OpenClaw AI Agent Setup & Support", description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "OpenClaw", path },
          ]),
          faqSchema(faqs),
        ])}
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/10 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.08]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/8 text-xs text-accent-primary font-mono tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              Certified OpenClaw Partner · Southeast Asia
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6 max-w-4xl">
              OpenClaw, Set Up Right —{" "}
              <span className="gradient-text">We Do It For You</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl">
              OpenClaw is a powerful AI helper. Setting it up safely takes real skill. We handle everything — servers, security, app connections, and training — and have it running in 48 hours.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap gap-4 mb-14">
              <GlowButton href="#inquiry" variant="primary">
                <Bot className="w-4 h-4 mr-2 inline" />
                Book a Free Discovery Call
              </GlowButton>
              <GlowButton href="#packages" variant="outline">
                View Packages
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </GlowButton>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-accent-primary">{s.value}</div>
                  <div className="text-text-muted text-xs mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── What is OpenClaw ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <SectionLabel text="What is OpenClaw" className="mb-4" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                  An AI helper that runs on your own server
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-4">
                  OpenClaw is a free, open AI tool that runs on your own server. Your data stays with you — it never goes to outside companies unless you say so.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="text-text-secondary leading-relaxed mb-8">
                  It connects to 50+ apps — like WhatsApp, Telegram, Google Calendar, and Gmail — and runs tasks on its own, all day and night.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <ul className="space-y-3">
                  {[
                    "Runs on your own server — your data stays private",
                    "Manages your calendar, clears your inbox, and runs tasks for you",
                    "Works with Claude (Anthropic) and GPT-4 (OpenAI)",
                    "Connects to 50+ apps and messaging platforms",
                    "Add extra features to make it do more things",
                    "Remembers your settings and gets smarter over time",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Server, label: "Your Own Server", desc: "Your data never leaves your network" },
                { icon: Lock, label: "Security Built In", desc: "Locked down settings to keep your data safe" },
                { icon: Users, label: "Team or Solo", desc: "Works for one person or an entire company" },
                { icon: Clock, label: "48-Hour Setup", desc: "From start to live AI helper in 48 hours" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass tech-surface rounded-lg p-5">
                  <Icon className="w-6 h-6 text-accent-primary mb-3" />
                  <p className="font-display font-semibold text-text-primary text-sm mb-1">{label}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <FadeUp>
              <SectionLabel text="Capabilities" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                What OpenClaw Can Do
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-text-secondary max-w-2xl mx-auto">
                An AI helper that works across your apps and tools — without you having to ask each time.
              </p>
            </FadeUp>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FadeUp key={f.title}>
                <div className="glass tech-surface rounded-lg p-6 h-full">
                  <f.icon className="w-6 h-6 text-accent-primary mb-4" />
                  <h3 className="font-display font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIY Risks ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass tech-surface rounded-lg p-8 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <FadeUp>
                  <SectionLabel text="Why not DIY" className="mb-4" />
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                    OpenClaw is powerful. A bad setup can cause real problems.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="text-text-secondary leading-relaxed">
                    If set up wrong, it can leave your network open to attack, leak your data, and break the rules. This isn&apos;t just a software problem — it&apos;s a serious IT risk.
                  </p>
                </FadeUp>
              </div>
              <ul className="space-y-3">
                {risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why M3DS AI ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              {deliverables.slice(0, 4).map((d) => (
                <div key={d} className="glass tech-surface rounded-lg p-4">
                  <CheckCircle className="w-4 h-4 text-accent-primary mb-2" />
                  <p className="text-text-secondary text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <div>
              <FadeUp>
                <SectionLabel text="Why M3DS AI" className="mb-4" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                  Deep IT experience. Built with AI from the start.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Our founder Mehdi has 24+ years working with servers, networks, and IT systems. Setting up OpenClaw is a real IT project — and his background means we do it right.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <ul className="space-y-3 mb-8">
                  {whyReasons.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.2}>
                <GlowButton href="#inquiry" variant="outline">
                  Talk to Us
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </GlowButton>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <FadeUp>
              <SectionLabel text="Packages" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Clear, Fixed Prices
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-text-secondary max-w-xl mx-auto">
                We send a full plan before starting. No surprises. Prices are in USD.
              </p>
            </FadeUp>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <FadeUp key={pkg.name}>
                <div
                  className={`relative rounded-lg p-7 flex flex-col h-full ${
                    pkg.highlight
                      ? "bg-accent-primary/10 border-2 border-accent-primary/50"
                      : "glass tech-surface"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-accent-primary text-bg-primary text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent-primary mb-2">{pkg.name}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-3xl font-bold text-text-primary">{pkg.price}</span>
                      {pkg.price !== "Custom" && (
                        <span className="text-text-muted text-sm">USD</span>
                      )}
                    </div>
                    <p className="text-text-muted text-xs">{pkg.period}</p>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">{pkg.desc}</p>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <GlowButton
                    href="#inquiry"
                    variant={pkg.highlight ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    {pkg.cta}
                  </GlowButton>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="text-center text-text-muted text-sm mt-8">
            Every plan includes a free 30-minute call before you decide. No payment needed to start.
          </p>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section id="inquiry" className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <FadeUp>
                <SectionLabel text="Get Started" className="mb-4" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Tell Us What You Need
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Fill in the form and we&apos;ll reply within 24 hours with a plan and a call time. No commitment needed.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: "We reply within 24 hours" },
                    { icon: Shield, text: "A full, fixed-price plan" },
                    { icon: Users, text: "You talk directly to the person doing the work" },
                    { icon: Zap, text: "Free 30-min call included" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-text-secondary">
                      <Icon className="w-4 h-4 text-accent-primary shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
            <div className="lg:col-span-3">
              <div className="glass tech-surface rounded-lg p-6 sm:p-8">
                <OpenClawForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FadeUp>
              <SectionLabel text="FAQ" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.05}>
              <h2 className="font-display text-3xl font-bold text-text-primary">Common Questions</h2>
            </FadeUp>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FadeUp key={faq.question}>
                <div className="glass tech-surface rounded-lg p-6">
                  <h3 className="font-display font-bold text-text-primary mb-3">{faq.question}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Ready to Start with OpenClaw?
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Book a free 30-minute call. We&apos;ll find the right plan for you and send a fixed-price proposal — no commitment needed.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href="#inquiry" variant="primary">
                <Bot className="w-4 h-4 mr-2 inline" />
                Start Your OpenClaw Enquiry
              </GlowButton>
              <GlowButton href="/contact/" variant="ghost">
                General Enquiry
              </GlowButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  );
}
