export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type SeoContentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  businessValue: "High" | "Medium" | "Low";
  ctaLabel: string;
  ctaHref: string;
  sections: ContentSection[];
  faqs: FaqItem[];
};

export type RouteGroup = {
  basePath: string;
  label: string;
  pages: SeoContentPage[];
};

const defaultCta = {
  ctaLabel: "Book an ITSM consultation",
  ctaHref: "/contact/",
};

export const serviceLandingPages: SeoContentPage[] = [
  {
    slug: "it-service-management-consulting",
    title: "IT Service Management Consulting Southeast Asia | M3DS AI",
    description:
      "ITSM consulting for Southeast Asian SMBs: service desk design, ITIL 4 workflows, SLAs, automation, reporting and tool implementation.",
    h1: "IT Service Management Consulting for Southeast Asian SMBs",
    eyebrow: "ITSM Consulting",
    summary:
      "Build a service desk that resolves incidents faster, protects uptime and gives leadership reliable IT operations visibility.",
    targetKeyword: "IT service management consulting Southeast Asia",
    secondaryKeywords: [
      "ITSM consultant",
      "service desk consulting",
      "ITIL 4 implementation",
      "IT operations consulting",
      "SLA design consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "What M3DS AI Fixes",
        body: "Most SMB service desks are trapped between informal chat support and enterprise ITSM tools that were configured without operational discipline. M3DS AI designs the process layer, service catalog, escalation model and reporting cadence so the tool supports the business instead of becoming another queue.",
        bullets: [
          "Incident, request, change and problem workflows",
          "Service catalog, priority matrix and SLA model",
          "Approval rules, automations and escalation paths",
          "Executive reporting for uptime, backlog and response quality",
        ],
      },
      {
        heading: "Why It Works",
        body: "Founder Mehdi Debbabi brings 24+ years across infrastructure, virtualization, networking, Active Directory and data center operations. That background matters because strong ITSM is not just form design; it is operating-model design for real technical teams.",
      },
      {
        heading: "Implementation Roadmap",
        body: "A typical engagement starts with a service desk audit, then moves into workflow design, platform configuration, automation, dashboarding, training and continuous improvement.",
      },
    ],
    faqs: [
      {
        question: "What does an ITSM consultant do?",
        answer:
          "An ITSM consultant designs service desk processes, tool configuration, SLAs, service catalogs, automations, reports and governance so IT teams can resolve work predictably.",
      },
      {
        question: "Which ITSM tools can M3DS AI support?",
        answer:
          "M3DS AI can advise on Freshservice, HaloITSM, Jira Service Management and similar platforms, with tool choice based on budget, team maturity and integration needs.",
      },
      {
        question: "Is ITSM consulting useful for SMBs?",
        answer:
          "Yes. SMBs often see the fastest gains because clear intake, prioritization, SLAs and automation remove operational waste without requiring a large IT department.",
      },
    ],
  },
  {
    slug: "ai-automation-consulting",
    title: "AI Automation Consulting for SMB Operations | M3DS AI",
    description:
      "AI automation consulting for support, operations and knowledge workflows: chatbots, triage, reporting, RAG search and process automation.",
    h1: "AI Automation Consulting for Support and Operations Teams",
    eyebrow: "AI Automation",
    summary:
      "Turn repetitive service desk, admin and reporting work into governed AI-assisted workflows that save time without losing control.",
    targetKeyword: "AI automation consulting",
    secondaryKeywords: [
      "AI workflow automation consultant",
      "AI chatbot consultant",
      "RAG chatbot implementation",
      "service desk automation",
      "business process automation AI",
    ],
    businessValue: "High",
    ctaLabel: "Plan an AI automation roadmap",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "AI Use Cases That Create ROI",
        body: "The best AI projects start with repetitive, high-volume workflows: ticket classification, knowledge retrieval, internal support questions, reporting summaries and lead qualification.",
        bullets: [
          "Internal knowledge-base assistants",
          "Ticket triage and routing logic",
          "Customer support chatbots with guardrails",
          "Weekly operational reporting summaries",
          "Workflow automation between forms, CRM and service desk tools",
        ],
      },
      {
        heading: "Governance Comes First",
        body: "M3DS AI designs AI workflows around security, source control, human review and clear fallback paths. The goal is useful automation, not a black box that creates new risk.",
      },
      {
        heading: "Delivery Model",
        body: "Engagements include process discovery, data/source review, workflow mapping, prototype build, testing, measurement and a handover plan for internal teams.",
      },
    ],
    faqs: [
      {
        question: "What should a company automate with AI first?",
        answer:
          "Start with repetitive workflows that have clear inputs, clear outputs and measurable time savings, such as triage, internal Q&A, summaries and routing.",
      },
      {
        question: "Can AI automation work with existing tools?",
        answer:
          "Yes. M3DS AI can connect AI workflows to websites, forms, service desk platforms, dashboards, APIs and internal knowledge sources.",
      },
      {
        question: "How do you reduce AI risk?",
        answer:
          "Risk is reduced through source restrictions, human approval steps, audit logs, careful prompt design, access controls and explicit fallback processes.",
      },
    ],
  },
  {
    slug: "freshservice-implementation-consultant",
    title: "Freshservice Implementation Consultant | M3DS AI",
    description:
      "Freshservice implementation help for SMBs: service catalog, SLAs, automations, asset workflows, reporting and ITIL-aligned rollout.",
    h1: "Freshservice Implementation Consultant",
    eyebrow: "Freshservice Consulting",
    summary:
      "Configure Freshservice around the way your IT team actually works, from intake and SLAs to automation and executive reporting.",
    targetKeyword: "Freshservice implementation consultant",
    secondaryKeywords: [
      "Freshservice consultant",
      "Freshservice setup",
      "Freshservice service catalog",
      "Freshservice automation",
      "Freshservice ITIL consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Implementation Scope",
        body: "M3DS AI helps teams configure Freshservice with practical service catalog items, ticket forms, workflow automators, priorities, groups, SLAs and reports.",
      },
      {
        heading: "Avoid Tool Sprawl",
        body: "Freshservice can become noisy if every request, alert and approval is added without a governance model. We define ownership and reporting before configuration grows too large.",
      },
      {
        heading: "Best Fit",
        body: "Freshservice is often a strong fit for SMB and mid-market teams that want a modern ITSM platform without the complexity of a heavyweight enterprise rollout.",
      },
    ],
    faqs: [
      {
        question: "How long does a Freshservice implementation take?",
        answer:
          "A focused SMB rollout can often be scoped into a few weeks, depending on the number of workflows, integrations and reporting requirements.",
      },
      {
        question: "Can M3DS AI migrate from spreadsheets or email?",
        answer:
          "Yes. M3DS AI can map current request types, priorities and ownership into Freshservice workflows and service catalog items.",
      },
      {
        question: "Do you configure Freshservice automations?",
        answer:
          "Yes. Automation design can include routing, approvals, SLA notifications, status updates and cross-tool workflow triggers.",
      },
    ],
  },
  {
    slug: "haloitsm-implementation-consultant",
    title: "HaloITSM Implementation Consultant | M3DS AI",
    description:
      "HaloITSM implementation consulting for service desk design, ITIL workflows, service catalog, automation, reporting and rollout governance.",
    h1: "HaloITSM Implementation Consultant",
    eyebrow: "HaloITSM Consulting",
    summary:
      "Design and configure HaloITSM so service desk teams can manage requests, incidents, changes and assets with clean governance.",
    targetKeyword: "HaloITSM implementation consultant",
    secondaryKeywords: [
      "HaloITSM consultant",
      "HaloITSM implementation",
      "HaloITSM service catalog",
      "HaloITSM workflow automation",
      "HaloITSM ITIL consulting",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Configuration That Matches Operations",
        body: "M3DS AI helps define the workflow model first, then configures HaloITSM around request handling, incident response, approvals, SLAs and reporting.",
      },
      {
        heading: "Who It Helps",
        body: "HaloITSM can support teams that want deeper ITSM capability and flexibility across service management workflows, assets and service catalog operations.",
      },
      {
        heading: "Rollout Support",
        body: "A strong rollout includes process documentation, training, stakeholder communication and post-launch measurement so adoption does not stall after go-live.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI help compare HaloITSM with Freshservice?",
        answer:
          "Yes. M3DS AI can compare tools against workflow complexity, budget, reporting, integrations, team maturity and long-term administration needs.",
      },
      {
        question: "What should be configured first in HaloITSM?",
        answer:
          "Start with request categories, roles, SLAs, priority matrix, service catalog and escalation ownership before adding advanced automations.",
      },
      {
        question: "Does HaloITSM require ITIL maturity?",
        answer:
          "No, but ITIL-aligned thinking helps teams avoid unclear ownership, inconsistent priorities and unreliable reporting.",
      },
    ],
  },
  {
    slug: "jira-service-management-consultant",
    title: "Jira Service Management Consultant | M3DS AI",
    description:
      "Jira Service Management consulting for service desks, DevOps support, request portals, automation, SLAs, knowledge base and reporting.",
    h1: "Jira Service Management Consultant",
    eyebrow: "JSM Consulting",
    summary:
      "Make Jira Service Management easier for requesters, support agents and technical teams by designing the portal, workflows and automation properly.",
    targetKeyword: "Jira Service Management consultant",
    secondaryKeywords: [
      "JSM consultant",
      "Jira service desk setup",
      "Jira Service Management implementation",
      "Atlassian ITSM consultant",
      "Jira automation consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Best Use Cases",
        body: "Jira Service Management is often strongest where IT support, software teams and DevOps workflows need to collaborate around incidents, requests and changes.",
      },
      {
        heading: "M3DS AI Setup Approach",
        body: "We simplify request types, portal structure, queues, SLAs and automation so JSM supports the operating model instead of exposing internal complexity to employees.",
      },
      {
        heading: "Reporting and Knowledge",
        body: "Good JSM implementations include knowledge base structure, deflection metrics, SLA dashboards and backlog views for leaders.",
      },
    ],
    faqs: [
      {
        question: "Is Jira Service Management good for SMBs?",
        answer:
          "Yes, especially when the company already uses Atlassian tools or needs strong alignment between IT, product and engineering teams.",
      },
      {
        question: "Can M3DS AI redesign an existing JSM portal?",
        answer:
          "Yes. M3DS AI can audit request types, queues, automations and reporting, then simplify the portal and improve agent workflows.",
      },
      {
        question: "What is the biggest JSM implementation mistake?",
        answer:
          "The most common mistake is exposing too many internal categories and fields to requesters, which reduces adoption and creates bad data.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure-devops",
    title: "Cloud Infrastructure and DevOps Consulting | M3DS AI",
    description:
      "Cloud infrastructure and DevOps consulting for SMBs: architecture, migrations, CI/CD, monitoring, reliability and cost control.",
    h1: "Cloud Infrastructure and DevOps Consulting",
    eyebrow: "Cloud and DevOps",
    summary:
      "Modernize hosting, deployment and reliability practices without overengineering the stack or losing cost control.",
    targetKeyword: "cloud infrastructure consulting Southeast Asia",
    secondaryKeywords: [
      "DevOps consulting SMB",
      "cloud migration consultant",
      "CI/CD consultant",
      "infrastructure modernization",
      "Cloudflare Pages consultant",
    ],
    businessValue: "High",
    ctaLabel: "Audit our infrastructure",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Practical Modernization",
        body: "M3DS AI helps teams move from fragile manual deployments to documented, repeatable release processes with clear ownership and monitoring.",
      },
      {
        heading: "What Gets Reviewed",
        body: "Reviews can include hosting architecture, DNS, CDN, deployment pipelines, backups, access control, logging, observability and cost risk.",
      },
      {
        heading: "Business Outcome",
        body: "The goal is a stack that is easier to deploy, easier to recover and easier to explain to leadership.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI support Cloudflare Pages?",
        answer:
          "Yes. M3DS AI can help with Cloudflare Pages, DNS, caching, static site deployment and supporting CI/CD workflows.",
      },
      {
        question: "Do SMBs need DevOps consulting?",
        answer:
          "SMBs benefit when deployments are slow, risky, undocumented or dependent on one person. DevOps consulting makes delivery repeatable.",
      },
      {
        question: "Can you reduce cloud costs?",
        answer:
          "Cost reduction is part of the review where usage, hosting choices, cache strategy and unnecessary services create waste.",
      },
    ],
  },
  {
    slug: "custom-dashboards-bi",
    title: "Custom Dashboard and BI Development | M3DS AI",
    description:
      "Custom dashboard development for SMBs: KPI tracking, service desk reports, executive dashboards, data integration and automated alerts.",
    h1: "Custom Dashboard and BI Development",
    eyebrow: "Dashboards",
    summary:
      "Give leaders a reliable view of service quality, sales performance, operations and risk without manual spreadsheet reporting.",
    targetKeyword: "custom dashboard development",
    secondaryKeywords: [
      "BI dashboard consultant",
      "KPI dashboard development",
      "service desk dashboard",
      "executive reporting dashboard",
      "data visualization consultant",
    ],
    businessValue: "High",
    ctaLabel: "Design a KPI dashboard",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Dashboard Use Cases",
        body: "M3DS AI builds dashboards for service desks, sales pipelines, operations, finance snapshots, marketing performance and executive reporting.",
      },
      {
        heading: "Data Quality First",
        body: "A dashboard is only useful if the underlying fields, definitions and update cadence are clear. We align metrics before building visuals.",
      },
      {
        heading: "Delivery",
        body: "Projects can include source mapping, metric definitions, dashboard design, data automation, role-based views and team training.",
      },
    ],
    faqs: [
      {
        question: "What tools can be used for dashboards?",
        answer:
          "Tool choice depends on data sources and budget. Options can include web dashboards, BI tools, spreadsheet-connected dashboards and custom reporting apps.",
      },
      {
        question: "Can dashboards connect to service desk data?",
        answer:
          "Yes. Service desk metrics such as SLA performance, backlog, first response time and ticket volume are strong dashboard candidates.",
      },
      {
        question: "What makes a dashboard useful?",
        answer:
          "Useful dashboards focus on decisions, not decoration. Each chart should support ownership, action or performance management.",
      },
    ],
  },
  {
    slug: "website-design-seo",
    title: "Website Design and SEO for Service Businesses | M3DS AI",
    description:
      "Fast, conversion-focused website design and SEO architecture for service businesses that need qualified leads from Google and AI search.",
    h1: "Website Design and SEO for Service Businesses",
    eyebrow: "Web and SEO",
    summary:
      "Launch a fast, credible website with service pages, schema, content structure and conversion paths built for organic lead generation.",
    targetKeyword: "website design and SEO services",
    secondaryKeywords: [
      "service business website design",
      "technical SEO consultant",
      "AI search optimization",
      "Next.js SEO website",
      "conversion website design",
    ],
    businessValue: "High",
    ctaLabel: "Plan a lead-gen website",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Built for Search and Sales",
        body: "The website must explain what you do, prove you can do it and make the next step obvious. M3DS AI combines technical SEO, page speed, structured data, service architecture and conversion-focused copy.",
      },
      {
        heading: "AI Search Readiness",
        body: "Pages are structured with answer blocks, FAQ schema, entity references and clear citations so Google AI Overviews, ChatGPT Search, Perplexity and Gemini can understand and cite the business.",
      },
      {
        heading: "Performance Baseline",
        body: "Every build targets Core Web Vitals, accessible HTML, optimized metadata, Open Graph tags, canonicals and crawlable internal links.",
      },
    ],
    faqs: [
      {
        question: "Is SEO included with website design?",
        answer:
          "Yes. M3DS AI designs the site architecture, metadata, content hierarchy, schema and performance foundation needed for organic growth.",
      },
      {
        question: "Can a website rank without a blog?",
        answer:
          "Service pages can rank, but long-term growth usually requires resource pages, comparison pages, location pages and topical authority content.",
      },
      {
        question: "What platform does M3DS AI use?",
        answer:
          "M3DS AI commonly uses fast static or Next.js sites deployed through Cloudflare Pages, depending on project requirements.",
      },
    ],
  },
];

export const resourcePages: SeoContentPage[] = [
  {
    slug: "itsm-consulting-southeast-asia",
    title: "ITSM Consulting in Southeast Asia: Buyer Guide | M3DS AI",
    description:
      "A practical guide to ITSM consulting for Southeast Asian SMBs, including workflows, tools, SLAs, automation and rollout priorities.",
    h1: "ITSM Consulting in Southeast Asia: A Practical Buyer Guide",
    eyebrow: "Guide",
    summary:
      "Use this guide to understand when to hire an ITSM consultant, what to fix first and how to avoid expensive service desk mistakes.",
    targetKeyword: "ITSM consulting Southeast Asia",
    secondaryKeywords: [
      "ITSM consultant SEA",
      "IT service management guide",
      "service desk consulting Southeast Asia",
      "ITIL SMB guide",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "When ITSM Consulting Becomes Urgent",
        body: "ITSM consulting becomes urgent when employees bypass the service desk, SLAs are unclear, ticket data cannot be trusted, incidents repeat and leaders cannot see operational risk.",
      },
      {
        heading: "What to Prioritize First",
        body: "Fix intake, ownership and prioritization before buying more software. A clean request model and SLA matrix can improve outcomes faster than a new tool alone.",
        bullets: [
          "Map request types and service ownership",
          "Define priority based on impact and urgency",
          "Standardize escalation and approval rules",
          "Build dashboards for backlog and SLA health",
        ],
      },
      {
        heading: "How to Choose a Consultant",
        body: "Look for a consultant who understands infrastructure operations, not only ITIL terminology. The best partner can translate messy real-world support into practical workflows.",
      },
    ],
    faqs: [
      {
        question: "What is ITSM consulting?",
        answer:
          "ITSM consulting helps organizations design and improve IT service processes, tools, SLAs, reporting, governance and automation.",
      },
      {
        question: "How much does ITSM consulting cost?",
        answer:
          "Cost depends on scope, tool complexity and rollout support. SMB projects are often scoped by audit, implementation and ongoing optimization phases.",
      },
      {
        question: "What is the best ITSM tool for SMBs?",
        answer:
          "Freshservice, HaloITSM and Jira Service Management can all work. The best choice depends on team maturity, integrations, budget and workflow complexity.",
      },
    ],
  },
  {
    slug: "ai-service-desk-automation",
    title: "AI Service Desk Automation: Use Cases and Roadmap | M3DS AI",
    description:
      "Learn how AI can improve service desk triage, routing, knowledge retrieval, reporting and employee support without losing governance.",
    h1: "AI Service Desk Automation: Use Cases That Actually Work",
    eyebrow: "AI Service Desk",
    summary:
      "AI can reduce service desk workload when it is applied to clear, measurable workflows with controlled data and human fallback.",
    targetKeyword: "AI service desk automation",
    secondaryKeywords: [
      "AI ticket triage",
      "service desk chatbot",
      "IT support automation",
      "AI ITSM",
      "knowledge base chatbot",
    ],
    businessValue: "High",
    ctaLabel: "Assess service desk automation",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "High-ROI AI Use Cases",
        body: "The strongest first use cases are ticket summarization, ticket classification, routing, internal knowledge search and employee self-service for common questions.",
      },
      {
        heading: "Where AI Should Not Be Fully Autonomous",
        body: "Avoid fully automated decisions for high-risk security, access, finance or compliance workflows until governance, approvals and logs are mature.",
      },
      {
        heading: "How to Measure Success",
        body: "Track deflection rate, first response time, reassignment rate, agent time saved, knowledge gap volume and customer satisfaction.",
      },
    ],
    faqs: [
      {
        question: "Can AI replace the service desk?",
        answer:
          "No. AI is best used to assist agents, deflect repetitive questions and accelerate triage while humans handle exceptions and risk.",
      },
      {
        question: "What data is needed for a service desk chatbot?",
        answer:
          "Useful sources include knowledge base articles, SOPs, service catalog entries, policies, ticket categories and approved troubleshooting guides.",
      },
      {
        question: "How fast can AI automation show results?",
        answer:
          "Focused use cases such as ticket summaries or internal Q&A can show value quickly once source content and workflows are clear.",
      },
    ],
  },
  {
    slug: "choose-itsm-tool-smb",
    title: "How to Choose an ITSM Tool for an SMB | M3DS AI",
    description:
      "Compare ITSM tool selection criteria for SMBs: cost, workflows, integrations, reporting, automation, administration and adoption risk.",
    h1: "How to Choose an ITSM Tool for an SMB",
    eyebrow: "Tool Selection",
    summary:
      "Choose the ITSM tool that fits your operating model, not the one with the longest feature list.",
    targetKeyword: "choose ITSM tool SMB",
    secondaryKeywords: [
      "best ITSM tool for SMB",
      "Freshservice vs Jira Service Management",
      "HaloITSM vs Freshservice",
      "service desk software selection",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Selection Criteria",
        body: "Evaluate request portals, workflow flexibility, automation, reporting, integrations, administration effort, licensing and adoption experience.",
      },
      {
        heading: "Common Buying Mistakes",
        body: "SMBs often overbuy enterprise complexity, underfund implementation or skip process design. Tool selection should follow workflow design.",
      },
      {
        heading: "Recommended Process",
        body: "Start with a service desk audit, define future-state workflows, shortlist tools, prototype critical workflows and only then commit to licensing.",
      },
    ],
    faqs: [
      {
        question: "Should an SMB choose Freshservice, HaloITSM or Jira Service Management?",
        answer:
          "It depends on workflow complexity, Atlassian usage, budget, reporting needs and internal admin capacity.",
      },
      {
        question: "Do ITSM tools need customization?",
        answer:
          "Yes, but customization should be controlled. Configure around core workflows first, then add complexity where it improves measurable outcomes.",
      },
      {
        question: "What is the first step before buying ITSM software?",
        answer:
          "Map existing request types, owners, escalation paths, pain points and reporting needs before selecting a platform.",
      },
    ],
  },
  {
    slug: "itil-4-for-smb-service-desks",
    title: "ITIL 4 for SMB Service Desks | M3DS AI",
    description:
      "A practical ITIL 4 guide for SMB service desks that need better incidents, requests, changes, SLAs and continual improvement.",
    h1: "ITIL 4 for SMB Service Desks",
    eyebrow: "ITIL 4",
    summary:
      "ITIL 4 can help SMBs without adding bureaucracy when practices are translated into lightweight operating routines.",
    targetKeyword: "ITIL 4 for SMB service desk",
    secondaryKeywords: [
      "ITIL implementation SMB",
      "ITIL service desk",
      "ITIL 4 consulting",
      "incident management SMB",
    ],
    businessValue: "Medium",
    ...defaultCta,
    sections: [
      {
        heading: "Keep ITIL Practical",
        body: "SMBs do not need heavyweight governance to benefit from ITIL. Start with consistent incident, request, change and knowledge practices.",
      },
      {
        heading: "Practices to Implement First",
        body: "Incident management, service request management, change enablement, knowledge management and continual improvement usually create the fastest gains.",
      },
      {
        heading: "How to Avoid Bureaucracy",
        body: "Use ITIL as a decision framework, not a paperwork exercise. Keep forms short, roles clear and dashboards action-oriented.",
      },
    ],
    faqs: [
      {
        question: "Is ITIL too complex for SMBs?",
        answer:
          "It can be if copied blindly. A lightweight ITIL-aligned model is often valuable for SMBs with growing support needs.",
      },
      {
        question: "Which ITIL practice should an SMB start with?",
        answer:
          "Start with incident and service request management because they directly affect user experience and support workload.",
      },
      {
        question: "Does ITIL require a specific tool?",
        answer:
          "No. ITIL is a management framework and can be implemented across many service desk platforms.",
      },
    ],
  },
  {
    slug: "rag-chatbot-internal-knowledge-base",
    title: "RAG Chatbot for Internal Knowledge Bases | M3DS AI",
    description:
      "How to plan a retrieval-augmented chatbot for SOPs, policies, service desk knowledge and internal support content.",
    h1: "RAG Chatbot for Internal Knowledge Bases",
    eyebrow: "RAG Chatbots",
    summary:
      "A RAG chatbot can make internal knowledge easier to find when source documents, access rules and answer quality checks are handled properly.",
    targetKeyword: "RAG chatbot internal knowledge base",
    secondaryKeywords: [
      "knowledge base chatbot",
      "internal AI assistant",
      "retrieval augmented generation consultant",
      "AI knowledge management",
    ],
    businessValue: "High",
    ctaLabel: "Scope a knowledge chatbot",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Good Source Content Matters",
        body: "RAG quality depends on clean policies, SOPs, FAQs and knowledge articles. Outdated or contradictory sources produce unreliable answers.",
      },
      {
        heading: "Security and Access",
        body: "Internal chatbots need source restrictions, role-aware access, logging and a clear answer policy when the system does not know.",
      },
      {
        heading: "Implementation Steps",
        body: "Inventory knowledge, clean sources, define permissions, build a prototype, test answer quality and create a content maintenance process.",
      },
    ],
    faqs: [
      {
        question: "What is a RAG chatbot?",
        answer:
          "A RAG chatbot retrieves approved source content before generating answers, which helps ground responses in company knowledge.",
      },
      {
        question: "Can a chatbot answer from private documents?",
        answer:
          "Yes, if permissions, storage, retrieval and logging are designed correctly for the organization's security requirements.",
      },
      {
        question: "How do you improve chatbot answer quality?",
        answer:
          "Improve source content, chunking, retrieval logic, prompts, fallback behavior and ongoing answer review.",
      },
    ],
  },
  {
    slug: "cybersecurity-audit-checklist-sea",
    title: "Cybersecurity Audit Checklist for SEA SMBs | M3DS AI",
    description:
      "A cybersecurity audit checklist for Southeast Asian SMBs covering identity, endpoints, backups, cloud, DNS, websites and response plans.",
    h1: "Cybersecurity Audit Checklist for Southeast Asian SMBs",
    eyebrow: "Security",
    summary:
      "Use this checklist to identify practical security gaps before they become incidents.",
    targetKeyword: "cybersecurity audit checklist SMB",
    secondaryKeywords: [
      "SMB security audit",
      "cybersecurity consultant Southeast Asia",
      "IT security assessment",
      "cloud security checklist",
    ],
    businessValue: "High",
    ctaLabel: "Book a security audit",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Core Areas to Review",
        body: "Review identity and access, MFA, endpoint protection, backups, patching, DNS, hosting, email security, admin accounts and incident response.",
      },
      {
        heading: "Evidence to Collect",
        body: "Collect screenshots, policy exports, admin lists, backup reports, asset lists and recent incident examples. Evidence makes the audit actionable.",
      },
      {
        heading: "Prioritize by Risk",
        body: "Fix high-impact basics first: MFA, backups, admin access, exposed services, stale accounts, unpatched systems and missing recovery procedures.",
      },
    ],
    faqs: [
      {
        question: "How often should an SMB run a security audit?",
        answer:
          "At least annually, and after major system changes, incidents, migrations or rapid hiring.",
      },
      {
        question: "What is the fastest SMB security win?",
        answer:
          "Strong MFA on admin and email accounts is usually one of the fastest high-impact improvements.",
      },
      {
        question: "Does M3DS AI provide cybersecurity consulting?",
        answer:
          "Yes. M3DS AI provides security assessments, practical remediation planning and implementation support.",
      },
    ],
  },
  {
    slug: "cloud-migration-roadmap-smb-sea",
    title: "Cloud Migration Roadmap for SMBs in SEA | M3DS AI",
    description:
      "A practical cloud migration roadmap for SMBs covering discovery, risk, DNS, hosting, backups, security, rollout and optimization.",
    h1: "Cloud Migration Roadmap for SMBs in Southeast Asia",
    eyebrow: "Cloud",
    summary:
      "Cloud migration succeeds when business risk, dependencies and recovery plans are mapped before the move.",
    targetKeyword: "cloud migration roadmap SMB",
    secondaryKeywords: [
      "cloud migration consultant SEA",
      "SMB cloud migration",
      "infrastructure modernization",
      "Cloudflare migration consultant",
    ],
    businessValue: "High",
    ctaLabel: "Plan a cloud migration",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Phase 1: Discovery",
        body: "Inventory applications, DNS, users, databases, integrations, traffic patterns, backups and compliance requirements before changing infrastructure.",
      },
      {
        heading: "Phase 2: Migration Design",
        body: "Design the target architecture, access model, deployment process, rollback plan and monitoring approach.",
      },
      {
        heading: "Phase 3: Rollout and Optimization",
        body: "Migrate in controlled stages, validate performance, test recovery and tune costs after real usage data appears.",
      },
    ],
    faqs: [
      {
        question: "What is the biggest cloud migration risk?",
        answer:
          "Hidden dependencies are a major risk because they can break authentication, integrations, DNS routing or reporting after migration.",
      },
      {
        question: "Should SMBs migrate everything at once?",
        answer:
          "Usually no. Phased migration reduces downtime and makes rollback easier.",
      },
      {
        question: "Can M3DS AI help with Cloudflare?",
        answer:
          "Yes. M3DS AI can support Cloudflare DNS, Pages, CDN, security headers and static site deployment patterns.",
      },
    ],
  },
  {
    slug: "ai-search-optimization-b2b-services",
    title: "AI Search Optimization for B2B Service Websites | M3DS AI",
    description:
      "How B2B service companies can optimize for Google AI Overviews, ChatGPT Search, Perplexity, Gemini and citation-driven discovery.",
    h1: "AI Search Optimization for B2B Service Websites",
    eyebrow: "AI Search",
    summary:
      "AI search visibility depends on clear entities, answerable pages, schema, topical authority and external corroboration.",
    targetKeyword: "AI search optimization B2B services",
    secondaryKeywords: [
      "generative engine optimization",
      "GEO consultant",
      "Google AI Overviews optimization",
      "ChatGPT Search SEO",
      "Perplexity SEO",
    ],
    businessValue: "High",
    ctaLabel: "Audit AI search visibility",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "What AI Systems Need",
        body: "AI systems need extractable answers, clear entity relationships, concise definitions, source consistency and pages that directly satisfy user questions.",
      },
      {
        heading: "Content Structures That Get Cited",
        body: "Use answer blocks, comparison tables, FAQs, glossaries, author bios, case studies, schema and source-backed claims.",
      },
      {
        heading: "Authority Signals",
        body: "AI visibility improves when the brand is corroborated by consistent profiles, citations, case studies, reviews, media mentions and expert-authored content.",
      },
    ],
    faqs: [
      {
        question: "What is AI search optimization?",
        answer:
          "AI search optimization improves how easily systems such as Google AI Overviews, ChatGPT Search, Perplexity and Gemini can understand, cite and recommend a brand.",
      },
      {
        question: "Is GEO different from SEO?",
        answer:
          "GEO builds on SEO but adds answer extraction, entity clarity, citation readiness and content structures designed for generative systems.",
      },
      {
        question: "Does schema help AI search?",
        answer:
          "Schema helps clarify entities, page types, breadcrumbs, services, FAQs, authors and organization details, which supports machine understanding.",
      },
    ],
  },
];

export const locationPages: SeoContentPage[] = [
  {
    slug: "singapore",
    title: "ITSM and AI Automation Consultant Singapore | M3DS AI",
    description:
      "Remote ITSM, AI automation, cybersecurity, dashboards and SEO consulting for Singapore SMBs and regional teams.",
    h1: "ITSM and AI Automation Consultant for Singapore SMBs",
    eyebrow: "Singapore",
    summary:
      "Support Singapore teams with practical ITSM workflows, AI automation, dashboards, security reviews and web growth systems.",
    targetKeyword: "ITSM consultant Singapore",
    secondaryKeywords: [
      "AI automation consultant Singapore",
      "Freshservice consultant Singapore",
      "service desk consultant Singapore",
      "cybersecurity consultant Singapore SMB",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Singapore Use Cases",
        body: "M3DS AI supports Singapore SMBs that need professional service desk workflows, better reporting, stronger security posture and lean automation across support and operations.",
      },
      {
        heading: "Remote Delivery",
        body: "Consulting is delivered remotely with timezone-aware workshops for UTC+7 to UTC+8 teams, structured documentation and clear implementation milestones.",
      },
      {
        heading: "Best-Fit Projects",
        body: "Common projects include ITSM audits, Freshservice setup, AI knowledge assistants, Cloudflare websites, dashboards and cybersecurity gap reviews.",
      },
    ],
    faqs: [
      {
        question: "Does M3DS AI work with Singapore companies?",
        answer:
          "Yes. M3DS AI supports Singapore SMBs and regional teams remotely across ITSM, AI automation, security, dashboards and web growth.",
      },
      {
        question: "Can pricing be scoped in SGD?",
        answer:
          "Yes. M3DS AI can scope proposals in SGD where appropriate for Singapore clients.",
      },
      {
        question: "What is the best first engagement?",
        answer:
          "A focused ITSM, AI automation or security audit is usually the fastest way to identify high-ROI improvements.",
      },
    ],
  },
  {
    slug: "malaysia",
    title: "ITSM and AI Automation Consultant Malaysia | M3DS AI",
    description:
      "ITSM consulting, service desk modernization, AI automation, dashboards and cybersecurity support for Malaysian SMBs.",
    h1: "ITSM and AI Automation Consultant for Malaysia",
    eyebrow: "Malaysia",
    summary:
      "Modernize support operations, dashboards and automation for Malaysian SMBs without heavyweight enterprise overhead.",
    targetKeyword: "ITSM consultant Malaysia",
    secondaryKeywords: [
      "AI automation consultant Malaysia",
      "service desk consultant Malaysia",
      "Freshservice consultant Malaysia",
      "cybersecurity consultant Malaysia SMB",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Malaysia Market Fit",
        body: "Malaysian SMBs often need practical governance, service visibility and automation as teams expand across locations, vendors and customer support channels.",
      },
      {
        heading: "Engagement Types",
        body: "M3DS AI can support ITSM roadmaps, service desk platform setup, dashboards, AI workflow automation and website SEO architecture.",
      },
      {
        heading: "Commercial Clarity",
        body: "Projects can be scoped around fixed implementation phases, monthly optimization or targeted audits depending on urgency and budget.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI scope projects in MYR?",
        answer:
          "Yes. Project estimates can include MYR references where useful for Malaysian buyers.",
      },
      {
        question: "Does M3DS AI work remotely with Malaysia teams?",
        answer:
          "Yes. Workshops and implementation support can be delivered remotely in SEA-friendly time windows.",
      },
      {
        question: "Which services are most relevant for Malaysia SMBs?",
        answer:
          "ITSM consulting, AI automation, custom dashboards, website SEO and cybersecurity audits are common high-value starting points.",
      },
    ],
  },
  {
    slug: "indonesia",
    title: "ITSM and AI Automation Consultant Indonesia | M3DS AI",
    description:
      "ITSM, AI automation, cybersecurity, dashboards and website growth consulting for Indonesian SMBs and Bali-based teams.",
    h1: "ITSM and AI Automation Consultant for Indonesia",
    eyebrow: "Indonesia",
    summary:
      "Support Indonesian teams with service desk structure, AI workflows, dashboards, secure cloud practices and high-performing websites.",
    targetKeyword: "ITSM consultant Indonesia",
    secondaryKeywords: [
      "AI automation consultant Indonesia",
      "IT consultant Bali",
      "service desk consultant Indonesia",
      "website design Indonesia SEO",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Indonesia Use Cases",
        body: "M3DS AI helps Indonesian SMBs move from informal support, manual reporting and inconsistent web presence into more structured operating systems.",
      },
      {
        heading: "Local and Regional Delivery",
        body: "Projects can support Indonesia-based teams and regional SEA operations with practical documentation, remote workshops and implementation guidance.",
      },
      {
        heading: "Where to Start",
        body: "Start with a service desk audit, website SEO audit, dashboard scope or AI automation discovery workshop depending on the most urgent revenue or operations gap.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI work with Indonesian businesses?",
        answer:
          "Yes. M3DS AI supports Indonesian SMBs and Bali-based businesses across ITSM, websites, AI automation, dashboards and security.",
      },
      {
        question: "Can proposals include IDR?",
        answer:
          "Yes. Project estimates can include IDR references where appropriate for Indonesian clients.",
      },
      {
        question: "What is a good first project?",
        answer:
          "A website SEO audit, ITSM audit or AI automation roadmap can quickly reveal practical improvements.",
      },
    ],
  },
  {
    slug: "philippines",
    title: "ITSM and AI Automation Consultant Philippines | M3DS AI",
    description:
      "Service desk consulting, AI automation, dashboards, cybersecurity and SEO consulting for Philippine SMBs and support teams.",
    h1: "ITSM and AI Automation Consultant for the Philippines",
    eyebrow: "Philippines",
    summary:
      "Improve support operations, automation and reporting for Philippine SMBs, service teams and growing remote operations.",
    targetKeyword: "ITSM consultant Philippines",
    secondaryKeywords: [
      "AI automation consultant Philippines",
      "service desk consultant Philippines",
      "Jira Service Management consultant Philippines",
      "cybersecurity consultant Philippines SMB",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Philippines Team Needs",
        body: "Support-heavy teams need clean request intake, knowledge management, escalation and reporting so customer and employee requests do not disappear into chat threads.",
      },
      {
        heading: "Where M3DS AI Helps",
        body: "M3DS AI can design service desk workflows, configure tools, create AI support assistants, build dashboards and improve technical SEO.",
      },
      {
        heading: "Delivery Style",
        body: "Remote-first delivery keeps projects efficient with structured workshops, implementation notes and measurable milestones.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI support Philippine companies remotely?",
        answer:
          "Yes. M3DS AI supports Philippine SMBs and regional teams through remote workshops and implementation support.",
      },
      {
        question: "Can pricing be shown in PHP?",
        answer:
          "Yes. Proposals can include PHP references where helpful for local planning.",
      },
      {
        question: "Which tool is best for support-heavy teams?",
        answer:
          "Tool choice depends on workflow complexity, integrations and budget. Freshservice, HaloITSM and Jira Service Management can all be evaluated.",
      },
    ],
  },
  {
    slug: "thailand",
    title: "ITSM and AI Automation Consultant Thailand | M3DS AI",
    description:
      "ITSM consulting, AI automation, dashboards, cybersecurity and website SEO for Thailand SMBs and regional teams.",
    h1: "ITSM and AI Automation Consultant for Thailand",
    eyebrow: "Thailand",
    summary:
      "Help Thailand-based SMBs improve support operations, automation, dashboards and technical web growth.",
    targetKeyword: "ITSM consultant Thailand",
    secondaryKeywords: [
      "AI automation consultant Thailand",
      "service desk consultant Thailand",
      "Freshservice consultant Thailand",
      "cybersecurity consultant Thailand SMB",
    ],
    businessValue: "Medium",
    ...defaultCta,
    sections: [
      {
        heading: "Operational Focus",
        body: "M3DS AI helps Thailand teams build clearer service desk processes, practical AI automation and dashboards that leaders can trust.",
      },
      {
        heading: "Remote SEA Delivery",
        body: "Projects are run with SEA-friendly scheduling, documentation and milestone-based implementation.",
      },
      {
        heading: "Common Starting Points",
        body: "Start with ITSM process cleanup, website performance and SEO, security basics or an AI automation use-case assessment.",
      },
    ],
    faqs: [
      {
        question: "Can M3DS AI work with Thailand companies?",
        answer:
          "Yes. M3DS AI can support Thailand SMBs remotely across ITSM, AI, web, security and dashboard projects.",
      },
      {
        question: "Can pricing include THB?",
        answer:
          "Yes. Project estimates can include THB references where useful.",
      },
      {
        question: "What is the best first step?",
        answer:
          "A short audit or discovery workshop is the best way to find practical improvement opportunities.",
      },
    ],
  },
];

export const industryPages: SeoContentPage[] = [
  {
    slug: "fintech",
    title: "ITSM and AI Automation for Fintech SMBs | M3DS AI",
    description:
      "ITSM, AI automation, dashboards and cybersecurity consulting for fintech teams that need reliability, auditability and secure support.",
    h1: "ITSM and AI Automation for Fintech Teams",
    eyebrow: "Fintech",
    summary:
      "Fintech teams need fast support, reliable change control, security discipline and dashboards leaders can trust.",
    targetKeyword: "ITSM consulting fintech",
    secondaryKeywords: [
      "fintech service desk",
      "fintech cybersecurity consultant",
      "AI automation fintech operations",
      "ITIL fintech support",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Operational Risks",
        body: "Fintech support teams need clear incident handling, access request control, change evidence and repeatable escalation when systems affect customers or compliance.",
      },
      {
        heading: "M3DS AI Approach",
        body: "We design ITSM workflows, dashboards and AI-assisted support patterns that protect speed and control at the same time.",
      },
      {
        heading: "High-Value Deliverables",
        body: "Priority matrix, access workflows, change approval, incident templates, knowledge base, executive dashboards and security remediation plan.",
      },
    ],
    faqs: [
      {
        question: "Why does fintech need strong ITSM?",
        answer:
          "Fintech teams need traceability, uptime, fast incident response and reliable change control because operational mistakes can affect trust and compliance.",
      },
      {
        question: "Can AI be used safely in fintech support?",
        answer:
          "Yes, when AI is limited to approved sources, human-reviewed workflows and clear audit trails.",
      },
      {
        question: "What should fintech dashboards track?",
        answer:
          "Track incidents, SLA performance, change success, access requests, backlog, recurring issues and security remediation.",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "ITSM, AI Automation and SEO for Ecommerce | M3DS AI",
    description:
      "Improve ecommerce operations with service desk workflows, AI support automation, dashboards, cybersecurity and conversion-focused SEO.",
    h1: "ITSM, AI Automation and SEO for Ecommerce Teams",
    eyebrow: "Ecommerce",
    summary:
      "Ecommerce teams need fast issue resolution, reliable websites, support automation and performance dashboards tied to revenue.",
    targetKeyword: "AI automation ecommerce support",
    secondaryKeywords: [
      "ecommerce ITSM",
      "ecommerce dashboard development",
      "ecommerce cybersecurity audit",
      "ecommerce SEO technical consultant",
    ],
    businessValue: "High",
    ctaLabel: "Improve ecommerce operations",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Revenue-Linked Operations",
        body: "Website downtime, payment issues, inventory data problems and slow support responses directly affect revenue. M3DS AI connects technical operations with commercial priorities.",
      },
      {
        heading: "Automation Opportunities",
        body: "AI support can help answer order, product, policy and troubleshooting questions when the source data and escalation model are reliable.",
      },
      {
        heading: "Dashboards",
        body: "Dashboards should connect service quality, web performance, conversion rates and operational issues so leaders see causes, not only symptoms.",
      },
    ],
    faqs: [
      {
        question: "How can ITSM help ecommerce?",
        answer:
          "ITSM improves how teams handle incidents, requests, changes and recurring problems that affect website performance and customer experience.",
      },
      {
        question: "Can AI handle ecommerce support?",
        answer:
          "AI can assist with repetitive support questions and routing, while humans handle refunds, exceptions and sensitive cases.",
      },
      {
        question: "What should ecommerce technical SEO prioritize?",
        answer:
          "Prioritize crawlability, site speed, structured data, canonical control, product/category architecture and conversion paths.",
      },
    ],
  },
  {
    slug: "logistics",
    title: "ITSM and Dashboards for Logistics Companies | M3DS AI",
    description:
      "ITSM consulting, workflow automation and operational dashboards for logistics SMBs that need visibility, uptime and faster support.",
    h1: "ITSM and Dashboards for Logistics Companies",
    eyebrow: "Logistics",
    summary:
      "Logistics teams need reliable systems, clear escalation and operational dashboards that show delays, incidents and bottlenecks.",
    targetKeyword: "ITSM consulting logistics",
    secondaryKeywords: [
      "logistics dashboard development",
      "logistics IT support automation",
      "logistics cybersecurity consultant",
      "service desk logistics",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Operational Visibility",
        body: "Logistics support issues can affect routing, fulfillment, customer updates and partner coordination. A structured service desk reduces ambiguity.",
      },
      {
        heading: "Automation and Reporting",
        body: "Automations can route incidents, summarize updates and notify owners while dashboards show incident trends and operational bottlenecks.",
      },
      {
        heading: "Security Basics",
        body: "Access control, endpoint hygiene, backups and cloud configuration are critical for distributed teams and partner-facing systems.",
      },
    ],
    faqs: [
      {
        question: "Why do logistics firms need ITSM?",
        answer:
          "ITSM helps logistics firms resolve operational technology issues faster and create accountability for recurring problems.",
      },
      {
        question: "What dashboards are useful in logistics?",
        answer:
          "Useful dashboards show incident volume, SLA health, system availability, backlog, recurring issues and operational bottlenecks.",
      },
      {
        question: "Can AI help logistics support?",
        answer:
          "Yes. AI can summarize tickets, assist internal knowledge lookup and route issues to the correct owner.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "ITSM and Cybersecurity for Healthcare SMBs | M3DS AI",
    description:
      "ITSM workflows, cybersecurity assessments, dashboards and controlled AI automation for healthcare SMB operations.",
    h1: "ITSM and Cybersecurity for Healthcare SMBs",
    eyebrow: "Healthcare",
    summary:
      "Healthcare operations need reliable support, careful access control, documented workflows and practical security hygiene.",
    targetKeyword: "ITSM consulting healthcare SMB",
    secondaryKeywords: [
      "healthcare cybersecurity consultant",
      "healthcare service desk",
      "healthcare IT operations",
      "AI automation healthcare support",
    ],
    businessValue: "High",
    ctaLabel: "Review healthcare IT operations",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Support With Control",
        body: "Healthcare teams need efficient support while protecting sensitive systems, user access and operational continuity.",
      },
      {
        heading: "Security Review",
        body: "M3DS AI can review MFA, account access, backup posture, endpoint basics, admin privileges, website headers and incident response readiness.",
      },
      {
        heading: "Workflow Design",
        body: "Service desk workflows should clearly separate routine requests, access changes, incidents and vendor-dependent issues.",
      },
    ],
    faqs: [
      {
        question: "Can AI be used in healthcare support?",
        answer:
          "AI should be used carefully with approved sources, access controls and human review for sensitive workflows.",
      },
      {
        question: "What is the first security priority?",
        answer:
          "MFA, access review, backups and admin account control are usually high-priority basics.",
      },
      {
        question: "How does ITSM help healthcare SMBs?",
        answer:
          "ITSM gives healthcare teams a repeatable way to manage incidents, requests, access, vendors and recurring operational issues.",
      },
    ],
  },
  {
    slug: "professional-services",
    title: "ITSM, AI Automation and SEO for Professional Services | M3DS AI",
    description:
      "ITSM, AI workflow automation, dashboards, cybersecurity and lead-generation SEO for professional service firms.",
    h1: "ITSM, AI Automation and SEO for Professional Services Firms",
    eyebrow: "Professional Services",
    summary:
      "Professional service firms need reliable internal operations and a website that turns expertise into qualified inquiries.",
    targetKeyword: "AI automation professional services",
    secondaryKeywords: [
      "professional services SEO",
      "ITSM professional services",
      "service business automation",
      "consulting firm website SEO",
    ],
    businessValue: "High",
    ctaLabel: "Build a lead-generation system",
    ctaHref: "/contact/",
    sections: [
      {
        heading: "Operations and Revenue",
        body: "M3DS AI connects internal service workflows, dashboards, AI automation and SEO architecture so firms can scale delivery and lead generation together.",
      },
      {
        heading: "AI Use Cases",
        body: "Useful automations include intake qualification, internal knowledge search, proposal support, reporting summaries and client support routing.",
      },
      {
        heading: "SEO Architecture",
        body: "Service firms need service pages, industry pages, comparison pages, FAQ content, author credibility and clear conversion paths.",
      },
    ],
    faqs: [
      {
        question: "What SEO pages should a service firm build?",
        answer:
          "Start with service pages, industry pages, problem-solution pages, comparison pages, case studies and expert-authored resources.",
      },
      {
        question: "Can AI help professional services?",
        answer:
          "Yes. AI can reduce repetitive admin, accelerate research, summarize information and improve intake routing.",
      },
      {
        question: "What dashboard metrics matter?",
        answer:
          "Track leads, pipeline, delivery capacity, support requests, SLA performance and client outcomes.",
      },
    ],
  },
];

export const comparisonPages: SeoContentPage[] = [
  {
    slug: "servicenow-vs-freshservice",
    title: "ServiceNow vs Freshservice for SMBs | M3DS AI",
    description:
      "Compare ServiceNow and Freshservice for SMB IT service management by complexity, cost, implementation effort, reporting and fit.",
    h1: "ServiceNow vs Freshservice for SMBs",
    eyebrow: "Comparison",
    summary:
      "ServiceNow is powerful but often heavy for SMBs; Freshservice can be faster to implement when workflows are focused and governance is clear.",
    targetKeyword: "ServiceNow vs Freshservice for SMB",
    secondaryKeywords: [
      "Freshservice alternative",
      "ServiceNow alternative SMB",
      "ITSM tool comparison",
      "Freshservice consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Best Fit",
        body: "ServiceNow is typically best for large enterprises with complex governance, while Freshservice is often better for SMB and mid-market teams seeking faster rollout.",
      },
      {
        heading: "Implementation Effort",
        body: "Freshservice usually requires less implementation overhead. ServiceNow can require larger budgets, deeper administration and more formal operating maturity.",
      },
      {
        heading: "Decision Rule",
        body: "Choose the platform that matches your process maturity, internal admin capacity, integration needs and budget, not only feature breadth.",
      },
    ],
    faqs: [
      {
        question: "Is Freshservice better than ServiceNow for SMBs?",
        answer:
          "Freshservice is often a better SMB fit when teams need modern ITSM quickly without enterprise-level implementation overhead.",
      },
      {
        question: "When should a company choose ServiceNow?",
        answer:
          "ServiceNow can be a strong fit for large, complex organizations with mature governance and the budget to support implementation and administration.",
      },
      {
        question: "Can M3DS AI help choose an ITSM tool?",
        answer:
          "Yes. M3DS AI can evaluate workflows, reporting, integrations and budget to recommend a practical ITSM platform.",
      },
    ],
  },
  {
    slug: "haloitsm-vs-freshservice",
    title: "HaloITSM vs Freshservice: SMB ITSM Comparison | M3DS AI",
    description:
      "Compare HaloITSM and Freshservice for service desk modernization, ITIL workflows, automation, reporting and SMB fit.",
    h1: "HaloITSM vs Freshservice",
    eyebrow: "Comparison",
    summary:
      "Both platforms can work for SMB ITSM. The better choice depends on workflow depth, flexibility, admin capacity and rollout goals.",
    targetKeyword: "HaloITSM vs Freshservice",
    secondaryKeywords: [
      "HaloITSM alternative",
      "Freshservice vs HaloITSM",
      "ITSM software comparison SMB",
      "HaloITSM consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "Freshservice Strengths",
        body: "Freshservice is often attractive for teams that want a polished experience, faster onboarding and practical ITSM features without heavy customization.",
      },
      {
        heading: "HaloITSM Strengths",
        body: "HaloITSM can be attractive for teams that need flexible ITSM workflows, deeper configuration and broader service management capability.",
      },
      {
        heading: "How to Decide",
        body: "Prototype the most important workflows, reporting views and approval paths before buying. The winner should fit the team's daily operating model.",
      },
    ],
    faqs: [
      {
        question: "Is HaloITSM more flexible than Freshservice?",
        answer:
          "HaloITSM can offer strong workflow flexibility, but the best choice depends on the team's requirements and administration capacity.",
      },
      {
        question: "Is Freshservice easier to implement?",
        answer:
          "Freshservice can be faster for many SMB teams when workflows are straightforward and the team wants a modern out-of-the-box experience.",
      },
      {
        question: "Should we run a pilot?",
        answer:
          "Yes. A pilot with real request types, SLAs and reports is the safest way to compare fit.",
      },
    ],
  },
  {
    slug: "jira-service-management-vs-servicenow",
    title: "Jira Service Management vs ServiceNow | M3DS AI",
    description:
      "Compare Jira Service Management and ServiceNow for ITSM, DevOps support, enterprise governance, workflows and implementation complexity.",
    h1: "Jira Service Management vs ServiceNow",
    eyebrow: "Comparison",
    summary:
      "Jira Service Management can fit teams close to software and DevOps; ServiceNow fits larger enterprise service management complexity.",
    targetKeyword: "Jira Service Management vs ServiceNow",
    secondaryKeywords: [
      "JSM vs ServiceNow",
      "Atlassian ITSM comparison",
      "ServiceNow alternative",
      "Jira Service Management consultant",
    ],
    businessValue: "High",
    ...defaultCta,
    sections: [
      {
        heading: "JSM Strengths",
        body: "Jira Service Management is often strong when IT, engineering and DevOps teams collaborate and the organization already uses Atlassian tools.",
      },
      {
        heading: "ServiceNow Strengths",
        body: "ServiceNow is built for large enterprise workflows, governance, integrations and broad service management programs.",
      },
      {
        heading: "SMB Decision",
        body: "SMBs should be careful not to buy enterprise complexity before process maturity, budget and internal administration can support it.",
      },
    ],
    faqs: [
      {
        question: "Is Jira Service Management cheaper than ServiceNow?",
        answer:
          "JSM is often more accessible for smaller teams, but total cost depends on licensing, implementation, integrations and administration.",
      },
      {
        question: "Is ServiceNow too much for SMBs?",
        answer:
          "It can be if the SMB does not need enterprise-grade complexity or cannot support the implementation and administration effort.",
      },
      {
        question: "Can M3DS AI implement JSM?",
        answer:
          "Yes. M3DS AI can help design request portals, queues, SLAs, automations and reports for Jira Service Management.",
      },
    ],
  },
];

export const routeGroups: RouteGroup[] = [
  {
    basePath: "/services",
    label: "Services",
    pages: serviceLandingPages,
  },
  {
    basePath: "/resources",
    label: "Resources",
    pages: resourcePages,
  },
  {
    basePath: "/locations",
    label: "Locations",
    pages: locationPages,
  },
  {
    basePath: "/industries",
    label: "Industries",
    pages: industryPages,
  },
  {
    basePath: "/comparisons",
    label: "Comparisons",
    pages: comparisonPages,
  },
];

export const staticRoutes = [
  "/",
  "/about/",
  "/authors/mehdi-debbabi/",
  "/blog/",
  "/contact/",
  "/demo/",
  "/industries/",
  "/locations/",
  "/our-work/",
  "/pricing/",
  "/privacy-policy/",
  "/resources/",
  "/services/",
  "/terms-of-service/",
  "/services/website-design/",
  "/services/ai-services/",
  "/services/digital-marketing/",
  "/services/custom-dashboards/",
  "/services/security-consulting/",
  "/comparisons/",
];

export const allGeneratedRoutes = routeGroups.flatMap((group) =>
  group.pages.map((page) => `${group.basePath}/${page.slug}/`)
);

export function findSeoPage(pages: SeoContentPage[], slug: string) {
  return pages.find((page) => page.slug === slug);
}
