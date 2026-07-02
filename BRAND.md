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

## Visual identity — "Deep-Navy Premium"

Design direction: light, readable body with deep-navy premium sections and cards; sky + teal accents that match the logo. Confident, technical, trustworthy.

### Colour palette

**Light surfaces**
| Token | Hex | Use |
|---|---|---|
| `--bg-primary` | `#F6F9FB` | Page background (cloud) |
| `--bg-secondary` | `#EDF2F7` | Alternate light section |
| `--bg-card` | `#FFFFFF` | Light cards |

**Deep-navy surfaces**
| Token | Hex | Use |
|---|---|---|
| `--bg-ink` | `#0B1220` | Dark sections, footer, hero centerpiece |
| `--bg-ink-2` | `#0F1B2D` | Cards on dark (`.card-ink`) |
| `--bg-ink-3` | `#16263B` | Elevated dark surfaces, hairlines |

**Accents** (contrast-aware — use `primary` on light, `bright` on dark)
| Token | Hex | Use |
|---|---|---|
| `--accent-primary` | `#0284C7` | Links, CTA fill, accents **on light** (WCAG AA on white) |
| `--accent-bright` | `#38BDF8` | Accents, glows, gradient text **on dark navy** (matches logo) |
| `--accent-secondary` | `#14B8A6` | Teal — secondary accent, confirmations |
| `--accent-hover` | `#0369A1` | Hover state for primary |
| `--accent-warm` | `#D97706` | Sparing warm highlight |

**Text**
| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#0F172A` | Headings/body on light |
| `--text-secondary` | `#334155` | Body on light |
| `--text-muted` | `#64748B` | Meta/muted on light |
| `--text-on-ink` | `#E8EEF5` | Headings/body on navy |
| `--text-on-ink-muted` | `#94A3B8` | Muted on navy |

**Usage rules**
- On white/light: use `--accent-primary` (`#0284C7`) for text/links/CTAs — never the bright sky, which fails AA on white.
- On navy: use `--accent-bright` (`#38BDF8`) for accents and gradient text.
- White text is only ever placed on an accent-colored fill (buttons, badges), never on light backgrounds.
- Gradient text: light `#0284C7 → #0E7490 → #164E63`; on ink `#38BDF8 → #14B8A6`.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** (500/600/700) | Loaded via `next/font/google`, self-hosted. Tight tracking (-0.02em). |
| Body | **Inter** | Default sans. |
| Mono / eyebrows / data | **JetBrains Mono** (400/500) | Uppercase eyebrow labels, stat/data. |

CSS variables: `--font-display`, `--font-body`, `--font-mono` (set in `app/layout.tsx`, mapped in `tailwind.config.ts`).

### Logo
Wordmark: `m3DS` (ink/on-ink) + `ai` (accent). Favicon/OG use ink navy `#0B1220` tile with sky `#38BDF8` "M3DS" mark and teal `#14B8A6` "D/ai" mark (`public/favicon.svg`, `public/og/m3dsai-og.svg`).

### Where it lives
Tokens are the single source of truth in `app/globals.css` `:root`, exposed to Tailwind (`bg-*`, `accent-*`, `text-*`, `border-*`, `bg-ink*`, `text-on-ink*`, `accent-bright`). Dark bands use the `.section-ink` and `.card-ink` utilities.

## CTA
Primary: **"Book a Free Call"** → `/contact/`. Secondary product CTA: **"Learn about OpenClaw"**.

## Channels
Website (m3dsai.com), blog, email `admin@m3dsai.com`.

## Assets / output
Keep this client's raw assets + finished reels in this folder (`m3dsai.com/`).

## Notes
Redesign shipped on branch `feature/redesign-deep-navy` (deep-navy premium theme, real font loading, light/ink section rhythm).
