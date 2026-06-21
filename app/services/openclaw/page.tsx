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
    title: "50+ Messaging Integrations",
    desc: "WhatsApp, Telegram, Slack, Discord, Signal — OpenClaw communicates on the platforms your team and customers already use.",
  },
  {
    icon: Globe,
    title: "Productivity Tool Connectivity",
    desc: "Connect Gmail, Google Calendar, Notion, Linear, Airtable, and hundreds more productivity apps for seamless automation.",
  },
  {
    icon: Wrench,
    title: "File & Shell Automation",
    desc: "Execute shell commands, manage files, control browsers, and run scripts — fully automated by your AI agent.",
  },
  {
    icon: Mic,
    title: "Voice Interaction",
    desc: "Issue voice commands and receive spoken responses. OpenClaw bridges voice to action across your workflows.",
  },
  {
    icon: Brain,
    title: "Persistent Memory",
    desc: "OpenClaw remembers your preferences, context, and prior conversations — becoming more useful over time.",
  },
  {
    icon: Bot,
    title: "Claude & GPT-4 Ready",
    desc: "Choose your AI model — Anthropic Claude or OpenAI GPT-4. We configure and optimise it for your specific use case.",
  },
];

const deliverables = [
  "Full OpenClaw server installation & configuration",
  "Security hardening — DM pairing, sandbox modes, permission models",
  "Channel authentication (WhatsApp, Telegram, Slack, Discord, Signal)",
  "AI model selection, tuning and prompt optimisation",
  "Tool integrations (up to package limit)",
  "Custom skill development",
  "Staff onboarding & documentation",
  "Ongoing monitoring, updates & support",
];

const packages = [
  {
    name: "Starter",
    price: "$799",
    period: "one-time setup",
    desc: "For individuals or small teams automating personal or lightweight business workflows.",
    features: [
      "Single user deployment",
      "1 messaging platform",
      "Up to 5 tool integrations",
      "Standard security hardening",
      "1 AI model configuration",
      "7-day post-setup support",
      "Setup documentation",
    ],
    cta: "Get Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,799",
    period: "one-time setup",
    desc: "For teams that want multi-channel AI automation, more integrations, and hands-on support.",
    features: [
      "Up to 5 users",
      "3 messaging platforms",
      "Up to 20 tool integrations",
      "Advanced security & compliance",
      "2 AI model configurations",
      "1 custom skill development",
      "30-day post-setup support",
      "Staff training & documentation",
    ],
    cta: "Get Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored engagement",
    desc: "Full-scale team or organisation deployment with custom skills, SLA, and a dedicated support engineer.",
    features: [
      "Unlimited users",
      "All messaging platforms",
      "Unlimited integrations",
      "Enterprise security & SLA",
      "Custom skills & workflows",
      "Dedicated support engineer",
      "Regular performance reviews",
      "Priority response time",
    ],
    cta: "Discuss Scope",
    highlight: false,
  },
];

const risks = [
  "Security misconfigurations exposing your internal network to the internet",
  "Data leaks through unsecured messaging channels or poorly scoped permissions",
  "Compliance gaps — OpenClaw without governance violates data residency rules in SG, MY and ID",
  "Unstable deployments without proper environment setup and dependency management",
  "Weeks of troubleshooting without deep infrastructure and AI expertise",
];

const faqs = [
  {
    question: "What is OpenClaw?",
    answer:
      "OpenClaw is an open-source AI assistant that runs entirely on your own private server or cloud infrastructure. It connects to your messaging channels, productivity tools, and internal systems — enabling autonomous AI automation without sending your data to third-party SaaS platforms.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Standard Starter and Growth deployments are live within 48 hours of project kickoff. Enterprise scopes with custom skills and integrations typically take 1–2 weeks.",
  },
  {
    question: "Do I need my own server?",
    answer:
      "No. M3DS AI can host your OpenClaw instance on our managed cloud infrastructure — fully isolated and private. Alternatively, we deploy to your own VPS, cloud VM (AWS, GCP, DigitalOcean, etc.), or on-premises server.",
  },
  {
    question: "Which AI model does it use?",
    answer:
      "OpenClaw is compatible with Anthropic Claude and OpenAI GPT-4. We recommend the best model for your use case and configure it optimally. You can switch models later without re-deploying.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. OpenClaw runs on infrastructure you own or control. Your data, conversations, and files never leave your environment unless you explicitly configure an integration that sends data externally. We implement DM pairing policies, sandbox modes, and permission models as part of every deployment.",
  },
  {
    question: "What messaging apps are supported?",
    answer:
      "WhatsApp, Telegram, Slack, Discord, and Signal are supported out of the box. Additional channels are available via community-built skills.",
  },
  {
    question: "Can I add more integrations after setup?",
    answer:
      "Yes. We offer add-on integration packages and monthly support retainers for ongoing configuration changes, new tool connections, and skill development.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "All packages include post-setup support: 7 days for Starter, 30 days for Growth, and ongoing for Enterprise. Monthly maintenance retainers are available for all tiers.",
  },
];

const stats = [
  { value: "50+", label: "Service integrations" },
  { value: "48h", label: "Standard setup time" },
  { value: "24/7", label: "Autonomous operation" },
  { value: "100%", label: "Private infrastructure" },
];

const whyReasons = [
  "24+ years enterprise IT — infrastructure expertise, not just AI APIs",
  "Certified OpenClaw partner for Southeast Asia",
  "Full security hardening included as standard, not an add-on",
  "Fixed-price packages with detailed proposals before we start",
  "Direct access to the principal engineer on every project",
  "SEA-specialist: SG, MY, ID, PH, TH, VN timezone-aware delivery",
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
              OpenClaw Setup Done Right —{" "}
              <span className="gradient-text">So You Don&apos;t Go It Alone</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl">
              OpenClaw is a powerful open-source AI assistant. Deploying it securely across your channels, devices, and workflows takes real expertise. We handle the infrastructure, security, integrations, and training — so you get a working AI agent in 48 hours.
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
                  A local-first AI assistant that lives where you already work
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-4">
                  OpenClaw is an open-source AI agent that runs entirely on your own private server or cloud infrastructure. Unlike SaaS AI tools, your data never leaves your network unless you explicitly configure it to.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="text-text-secondary leading-relaxed mb-8">
                  It connects to 50+ services — from WhatsApp and Telegram to Google Calendar, Gmail, Notion, and custom internal tools — enabling fully autonomous workflows that run 24/7 without manual prompting.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <ul className="space-y-3">
                  {[
                    "Runs on hardware you own — data never leaves your network",
                    "Manages calendars, clears inboxes, browses the web, executes scripts",
                    "Compatible with Claude (Anthropic) and GPT-4 (OpenAI)",
                    "50+ service connections including all major messaging platforms",
                    "Community-built extensible skills for custom capabilities",
                    "Persistent memory that learns your preferences and context",
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
                { icon: Server, label: "Private Infrastructure", desc: "Your data never leaves your network" },
                { icon: Lock, label: "Security Hardened", desc: "DM pairing, sandbox modes, permission models" },
                { icon: Users, label: "Team or Solo", desc: "Scales from one person to entire departments" },
                { icon: Clock, label: "48-Hour Setup", desc: "From kickoff to live AI agent in 48 hours" },
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
                An autonomous AI agent that works across your existing tools and channels — without you having to ask each time.
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
                    OpenClaw is powerful. The risks of a bad setup are real.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="text-text-secondary leading-relaxed">
                    Without proper configuration, an OpenClaw deployment can expose your network, leak sensitive data, and create compliance gaps. These are infrastructure problems — not just software ones.
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
                  Enterprise IT expertise. AI-native execution.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Founder Mehdi Debbabi brings 24+ years across infrastructure, virtualisation, networking, Active Directory, and data centre operations. A proper OpenClaw deployment is an infrastructure project, not just a software install — and that background matters.
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
                Simple, Fixed-Price Setup
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-text-secondary max-w-xl mx-auto">
                Detailed proposals sent before we start. No surprises. All prices in USD.
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
            All packages include a free 30-minute discovery call before any commitment. No upfront payment required.
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
                  Tell Us About Your OpenClaw Project
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Fill in the form and we&apos;ll respond within 24 hours with a detailed proposal and discovery call availability. No commitment required.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: "Response within 24 hours" },
                    { icon: Shield, text: "Detailed fixed-price proposal" },
                    { icon: Users, text: "Direct access to the principal" },
                    { icon: Zap, text: "Free 30-min discovery call included" },
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
              Ready to Deploy Your AI Agent?
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Book a free 30-minute discovery call. We&apos;ll scope your requirements, recommend the right package, and send a fixed-price proposal — no strings attached.
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
