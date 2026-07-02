# Client Brand File — m3dsai

_Media/reels workflow + tools: see `projects/Remotion/CLAUDE.md`._

## One-liner
Enterprise-grade IT, AI automation and web growth — made affordable and jargon-free for small businesses in Southeast Asia & Australia.

## Audience
SMB owners/operators in Singapore, Malaysia, Indonesia, Philippines, Thailand, Vietnam and Australia. Non-technical decision-makers who want results, not jargon.

## Brand voice
Plain, reassuring, confident. No tech jargon. Speak to outcomes (more customers, save time, grow online). Sentence case, active voice, specific over clever.

## Offer / product
Flagship: **OpenClaw** — private AI agent, live in 48h. Plus AI consulting/automation, cloud & hosting, custom dashboards, AI website design, SEO & digital marketing, security consulting.

## Proof points
24+ years enterprise IT experience (founder Mehdi "Meds" Debbabi). One team start-to-finish, clear upfront pricing, AI built in, replies under 2 hours.

---

## Visual identity — "Warm Terminal — Coral & Charcoal" (DARK)

Design direction: dark-first, terminal-inspired. Charcoal-plum backgrounds, cream text, a single warm coral/terracotta accent. Confident, technical, distinctive. **This is the standing M3DS palette — use it for all new work.**

### Colour palette

**Dark surfaces (page is dark)**
| Token | Hex | Use |
|---|---|---|
| `--bg-primary` | `#14121C` | Page background (charcoal-plum) |
| `--bg-secondary` | `#1A1724` | Alternate section |
| `--bg-card` | `#1C1927` | Cards |
| `--bg-ink` | `#100E18` | Darkest bands (footer, CTA, hero base) |
| `--bg-ink-2` | `#201C2B` | Cards on bands (`.card-ink`) |
| `--bg-ink-3` | `#2A2537` | Elevated surfaces, hairlines |

**Accents — coral / terracotta**
| Token | Hex | Use |
|---|---|---|
| `--accent-primary` | `#E8845A` | Command/link/accent text, CTA fill, icons |
| `--accent-bright` | `#F2A07A` | Peach — glows, gradient-text highlight |
| `--accent-secondary` | `#C96442` | Terracotta — deeper accent |
| `--accent-hover` | `#F0946A` | Hover state |
| `--on-accent` | `#17131F` | Dark text placed on a coral fill (buttons) |
| `--accent-warm` | `#D97706` | Sparing amber highlight |

**Text (cream)**
| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#F4ECDD` | Headings/body |
| `--text-secondary` | `#D5CCBB` | Body / descriptions |
| `--text-muted` | `#948C7D` | Meta/muted |
| `--text-on-ink` | `#F4ECDD` | Text on darkest bands |
| `--text-on-ink-muted` | `#A39B8B` | Muted on bands |

**Usage rules**
- Coral (`#E8845A`) is the accent for text/links/icons on dark. Cream (`#F4ECDD`) is default text.
- On a coral fill (buttons/badges) use **dark** text (`--on-accent #17131F`), never white — white on coral fails contrast.
- Gradient text: `#E8845A → #F2A07A → #D5764F`.
- No blue. Backgrounds stay charcoal-plum, never navy.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** (500/600/700) | Loaded via `next/font/google`, self-hosted. Tight tracking (-0.02em). |
| Body | **Inter** | Default sans. |
| Mono / eyebrows / data | **JetBrains Mono** (400/500) | Uppercase eyebrow labels, stat/data. |

CSS variables: `--font-display`, `--font-body`, `--font-mono` (set in `app/layout.tsx`, mapped in `tailwind.config.ts`).

### Logo
Wordmark: `m3DS` (cream) + `ai` (coral accent). Favicon/OG use charcoal `#14121C` tile with coral `#E8845A` "M3DS" mark and terracotta `#C96442` "D/ai" mark (`public/favicon.svg`, `public/og/m3dsai-og.svg`).

### Where it lives
Tokens are the single source of truth in `app/globals.css` `:root`, exposed to Tailwind (`bg-*`, `accent-*`, `text-*`, `border-*`, `bg-ink*`, `text-on-ink*`, `accent-bright`). Dark bands use the `.section-ink` and `.card-ink` utilities.

## CTA
Primary: **"Book a Free Call"** → `/contact/`. Secondary product CTA: **"Learn about OpenClaw"**.

## Channels
Website (m3dsai.com), blog, email `admin@m3dsai.com`.

## Assets / output
Keep this client's raw assets + finished reels in this folder (`m3dsai.com/`).

## Notes
Redesign shipped on branch `feature/redesign-deep-navy`. Current theme = warm-terminal coral & charcoal (dark), real font loading (Space Grotesk / Inter / JetBrains Mono), token-driven so palette swaps are a single edit in `app/globals.css` `:root`.
