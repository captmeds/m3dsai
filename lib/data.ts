export const services = [
  {
    id: "ai-consulting",
    name: "AI Consulting & Business Automation",
    description:
      "Transform your business with practical AI solutions that reduce costs, automate repetitive tasks, improve customer engagement, and increase operational efficiency. We identify high-impact AI opportunities and implement automation strategies that deliver measurable results.",
    icon: "Brain",
    gradient: "from-purple-500 to-blue-500",
    features: [
      "AI strategy and implementation",
      "Business process automation",
      "Workflow optimisation",
      "AI chatbot deployment",
      "Content automation systems",
      "AI-powered customer support",
      "Productivity and efficiency consulting",
    ],
    benefits: [
      "Reduce operational costs",
      "Save hundreds of staff hours",
      "Increase productivity",
      "Improve customer response times",
      "Scale operations efficiently",
    ],
    cta: "Book an AI Strategy Session",
    pricing: { starter: 799, growth: 1799, enterprise: "Custom" },
  },
  {
    id: "cloud-infrastructure",
    name: "Cloud Infrastructure & Managed Hosting",
    description:
      "Build a secure, scalable, and high-performance cloud environment that supports your business growth. We design, deploy, manage, and optimise cloud infrastructure for reliability, security, and maximum uptime.",
    icon: "Cloud",
    gradient: "from-sky-500 to-cyan-400",
    features: [
      "Cloud architecture design",
      "Server deployment and management",
      "Cloud migration services",
      "Performance optimisation",
      "Security hardening",
      "Backup and disaster recovery",
      "Infrastructure monitoring",
    ],
    benefits: [
      "Improved reliability",
      "Enhanced security",
      "Reduced downtime",
      "Scalable infrastructure",
      "Lower IT management costs",
    ],
    cta: "Discuss Your Cloud Requirements",
    pricing: { starter: 999, growth: 1999, enterprise: "Custom" },
  },
  {
    id: "custom-dashboards",
    name: "Custom Dashboards & Business Intelligence",
    description:
      "Turn your business data into actionable insights with custom dashboards designed specifically for your operations. Monitor KPIs, sales, marketing performance, customer activity, and operational metrics in real time.",
    icon: "LayoutDashboard",
    gradient: "from-emerald-400 to-cyan-500",
    features: [
      "Executive dashboards",
      "Sales reporting dashboards",
      "Marketing analytics dashboards",
      "Financial reporting systems",
      "CRM integrations",
      "Real-time KPI monitoring",
      "Automated reporting",
    ],
    benefits: [
      "Better decision making",
      "Real-time visibility",
      "Increased accountability",
      "Improved forecasting",
      "Data-driven growth",
    ],
    cta: "Request a Dashboard Demo",
    pricing: { starter: 599, growth: 1299, enterprise: "Custom" },
  },
  {
    id: "ai-website-design",
    name: "AI Website Design & Development",
    description:
      "Create high-converting websites powered by modern AI technologies and built specifically to generate leads, improve customer engagement, and increase online sales. Every site is mobile-first, performance-optimised, and SEO-ready from day one.",
    icon: "Monitor",
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Business websites",
      "E-commerce websites",
      "AI-powered websites",
      "Landing page development",
      "Conversion optimisation",
      "Mobile-first design",
      "Performance optimisation",
    ],
    benefits: [
      "More leads and enquiries",
      "Faster website performance",
      "Improved user experience",
      "Higher search rankings",
      "Increased conversion rates",
    ],
    cta: "Start Your Website Project",
    pricing: { starter: 499, growth: 999, enterprise: "Custom" },
  },
  {
    id: "openclaw",
    name: "OpenClaw Setup, Automation & Support",
    description:
      "Leverage the power of OpenClaw AI automation to streamline business operations, automate repetitive tasks, and create intelligent workflows that work around the clock. M3DS AI handles full setup, integration, and ongoing support.",
    icon: "Bot",
    gradient: "from-teal-400 to-cyan-500",
    features: [
      "OpenClaw installation",
      "Configuration and deployment",
      "AI workflow development",
      "Integration with business systems",
      "Automation consulting",
      "Staff training",
      "Ongoing support and maintenance",
    ],
    benefits: [
      "Increased efficiency",
      "Reduced manual workload",
      "Better workflow management",
      "Faster task completion",
      "Continuous automation support",
    ],
    cta: "Schedule an OpenClaw Consultation",
    pricing: { starter: 995, growth: 1495, enterprise: "Custom" },
  },
  {
    id: "seo-digital-marketing",
    name: "SEO & Digital Marketing Growth Services",
    description:
      "Increase your online visibility, generate qualified leads, and grow your business with data-driven SEO and digital marketing strategies tailored for Australian and Asian markets. We focus on sustainable, long-term results that build your brand authority.",
    icon: "TrendingUp",
    gradient: "from-orange-400 to-amber-500",
    features: [
      "Search engine optimisation",
      "Local SEO",
      "Content marketing",
      "Technical SEO",
      "Google Business optimisation",
      "Lead generation campaigns",
      "Digital growth strategy",
    ],
    benefits: [
      "Higher search rankings",
      "Increased website traffic",
      "More qualified leads",
      "Improved online visibility",
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
    title: "Discover",
    description: "We dive deep into your business, goals, and challenges to understand exactly what you need."
  },
  {
    number: "02",
    title: "Design",
    description: "We craft detailed strategies and designs that align with your vision and drive results."
  },
  {
    number: "03",
    title: "Build",
    description: "Our team develops solutions with precision, using cutting-edge technology and best practices."
  },
  {
    number: "04",
    title: "Launch & Optimise",
    description: "We deploy your solution and continuously optimize for peak performance and growth."
  }
];

export const faqs = [
  {
    question: "How long does a typical website project take?",
    answer: "Most website projects take 4-8 weeks from kickoff to launch. Complex enterprise sites may take 10-12 weeks. We'll provide a detailed timeline during our discovery call."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes! We offer monthly maintenance and support packages. All Growth and Enterprise plans include 30 days of post-launch support."
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely. We're technology-agnostic and can integrate with your existing systems, whether it's WordPress, Shopify, custom APIs, or enterprise platforms."
  },
  {
    question: "What makes m3DSai different from other agencies?",
    answer: "We combine deep technical expertise with business strategy. Every solution is built with your ROI in mind, not just aesthetics. Plus, our AI-native approach means smarter, more efficient solutions."
  },
  {
    question: "How do you handle project communication?",
    answer: "We use a dedicated Slack channel, weekly video check-ins, and a shared project dashboard. You'll always know exactly where your project stands."
  }
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
  { name: "Pricing", href: "/pricing/" },
  { name: "Resources", href: "/resources/" },
  { name: "About", href: "/about/" },
  { name: "Our Work", href: "/our-work/" },
  { name: "Contact", href: "/contact/" },
];
