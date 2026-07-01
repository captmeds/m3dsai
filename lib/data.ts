export const services = [
  {
    id: "ai-consulting",
    name: "AI Consulting & Business Automation",
    description:
      "We help your business use AI tools to save time and cut costs. We find the best places AI can help and then set it all up for you.",
    icon: "Brain",
    gradient: "from-purple-500 to-blue-500",
    features: [
      "AI planning and setup",
      "Business task automation",
      "Workflow improvements",
      "AI chatbot setup",
      "Content automation",
      "AI-powered customer support",
      "Productivity consulting",
    ],
    benefits: [
      "Lower running costs",
      "Save hundreds of work hours",
      "Get more done each day",
      "Faster customer replies",
      "Grow without extra staff",
    ],
    cta: "Book an AI Strategy Session",
    pricing: { starter: 799, growth: 1799, enterprise: "Custom" },
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud Infrastructure & Managed Hosting",
    description:
      "We build and look after your online servers so your business stays fast, safe, and always running.",
    icon: "Cloud",
    gradient: "from-sky-500 to-cyan-400",
    features: [
      "Cloud server design",
      "Server setup and management",
      "Moving to the cloud",
      "Speed improvements",
      "Security setup",
      "Backup and recovery",
      "Server monitoring",
    ],
    benefits: [
      "More reliable systems",
      "Better security",
      "Less downtime",
      "Servers that grow with you",
      "Lower IT costs",
    ],
    cta: "Talk About Your Cloud Needs",
    pricing: { starter: 999, growth: 1999, enterprise: "Custom" },
  },
  {
    id: "custom-dashboards",
    name: "Custom Dashboards & Business Intelligence",
    description:
      "We turn your business numbers into easy-to-read charts and reports, so you always know how things are going.",
    icon: "LayoutDashboard",
    gradient: "from-emerald-400 to-cyan-500",
    features: [
      "Executive dashboards",
      "Sales reports",
      "Marketing analytics",
      "Financial reports",
      "CRM connections",
      "Live KPI tracking",
      "Automated reports",
    ],
    benefits: [
      "Better decisions",
      "See results in real time",
      "More accountability",
      "Better planning",
      "Grow using your own data",
    ],
    cta: "Request a Dashboard Demo",
    pricing: { starter: 599, growth: 1299, enterprise: "Custom" },
  },
  {
    id: "ai-website-design",
    name: "AI Website Design & Development",
    description:
      "We build websites that look great, load fast, and help you get more customers. Every site works on phones and is ready for Google from day one.",
    icon: "Monitor",
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Business websites",
      "Online shop websites",
      "AI-powered websites",
      "Landing pages",
      "Conversion improvements",
      "Mobile-friendly design",
      "Speed improvements",
    ],
    benefits: [
      "More leads and enquiries",
      "Faster website",
      "Better user experience",
      "Higher Google rankings",
      "More sales",
    ],
    cta: "Start Your Website Project",
    pricing: { starter: 499, growth: 999, enterprise: "Custom" },
  },
  {
    id: "openclaw",
    name: "OpenClaw Setup, Automation & Support",
    description:
      "We set up OpenClaw — a smart AI helper that works on your own server. It connects to your apps and handles tasks for you, day and night. We do the full setup, connections, and support.",
    icon: "Bot",
    gradient: "from-teal-400 to-cyan-500",
    features: [
      "OpenClaw installation",
      "Setup and deployment",
      "AI workflow building",
      "App connections",
      "Automation advice",
      "Team training",
      "Ongoing support",
    ],
    benefits: [
      "Work faster",
      "Less manual work",
      "Better task management",
      "Tasks done quicker",
      "Always-on support",
    ],
    cta: "Book an OpenClaw Consultation",
    pricing: { starter: 995, growth: 1495, enterprise: "Custom" },
  },
  {
    id: "seo-digital-marketing",
    name: "SEO & Digital Marketing Growth Services",
    description:
      "We help more people find your business online. We grow your website traffic and bring in customers who are ready to buy.",
    icon: "TrendingUp",
    gradient: "from-orange-400 to-amber-500",
    features: [
      "Search engine optimisation (SEO)",
      "Local SEO",
      "Content marketing",
      "Technical SEO",
      "Google Business setup",
      "Lead generation",
      "Digital growth strategy",
    ],
    benefits: [
      "Higher Google rankings",
      "More website visitors",
      "More ready-to-buy leads",
      "Better online presence",
      "Long-term business growth",
    ],
    cta: "Get a Free SEO Audit",
    pricing: { starter: 599, growth: 1299, enterprise: "Custom" },
  },
];

export const testimonials: {
  quote: string;
  name: string;
  company: string;
  role: string;
  rating: number;
}[] = [];

export const processSteps = [
  {
    number: "01",
    title: "Free Call",
    description: "We have a quick chat about your business. No tech knowledge needed — just tell us what you want to improve."
  },
  {
    number: "02",
    title: "We Plan It",
    description: "We put together a clear plan and show you exactly what we'll do, how long it takes, and what it costs."
  },
  {
    number: "03",
    title: "We Build It",
    description: "We do all the work for you. You'll get updates along the way so you always know what's happening."
  },
  {
    number: "04",
    title: "You See Results",
    description: "Your new tool or website goes live. We stick around to make sure everything works and keep improving it."
  }
];

export const faqs = [
  {
    question: "How long does a website project take?",
    answer: "We'll give you a clear timeline during our first call. Most small websites are completed within a few days, while larger, more complex websites typically take one to two weeks."
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes. We offer monthly care plans. Growth and Enterprise plans include 30 days of free support after launch."
  },
  {
    question: "Can you work with the tools we already use?",
    answer: "Yes. We can connect to most tools and systems you use — WordPress, Shopify, custom systems, and more."
  },
  {
    question: "What makes m3DSai different?",
    answer: "We focus on real results, not just looks. Every solution is built to help your business grow. We also use AI in smarter ways than most agencies."
  },
  {
    question: "How do you keep us updated?",
    answer: "We use a shared Slack channel, weekly video calls, and a live project tracker. You'll always know where things stand."
  }
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
  { name: "Pricing", href: "/pricing/" },
  { name: "Blog", href: "/blog/" },
  { name: "About", href: "/about/" },
  { name: "Our Work", href: "/our-work/" },
  { name: "Contact", href: "/contact/" },
];
