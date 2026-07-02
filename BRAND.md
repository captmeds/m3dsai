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

## Visual identity — "Fresh Corporate — Emerald & Graphite"

Design direction: clean, readable light body with graphite sections and cards; a single emerald accent (no blue). Fresh, growth-oriented, modern corporate.

### Colour palette

**Light surfaces**
| Token | Hex | Use |
|---|---|---|
| `--bg-primary` | `#F7FAF8` | Page background (snow) |
| `--bg-secondary` | `#ECF3EF` | Alternate light section (mist) |
| `--bg-card` | `#FFFFFF` | Light cards |

**Graphite surfaces**
| Token | Hex | Use |
|---|---|---|
| `--bg-ink` | `#0E1512` | Dark sections, footer, hero centerpiece |
| `--bg-ink-2` | `#16211C` | Cards on dark (`.card-ink`) |
| `--bg-ink-3` | `#1E2C26` | Elevated dark surfaces, hairlines |

**Accents** (contrast-aware — use `primary` on light, `bright` on dark)
| Token | Hex | Use |
|---|---|---|
| `--accent-primary` | `#047857` | Links, CTA fill, accents **on light** (WCAG AA on white) |
| `--accent-bright` | `#34D399` | Accents, glows, gradient text **on graphite** |
| `--accent-secondary` | `#059669` | Emerald — secondary accent, confirmations |
| `--accent-hover` | `#065F46` | Hover state for primary |
| `--accent-warm` | `#D97706` | Sparing warm highlight |

**Text**
| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#0B1210` | Headings/body on light |
| `--text-secondary` | `#33423C` | Body on light |
| `--text-muted` | `#64726B` | Meta/muted on light |
| `--text-on-ink` | `#E9F1EC` | Headings/body on graphite |
| `--text-on-ink-muted` | `#93A69C` | Muted on graphite |

**Usage rules**
- On white/light: use `--accent-primary` (`#047857`) for text/links/CTAs — the deeper emerald that passes AA on white.
- On graphite: use `--accent-bright` (`#34D399`) for accents and gradient text.
- White text is only ever placed on an accent-colored fill (buttons, badges), never on light backgrounds.
- Gradient text: light `#047857 → #059669 → #065F46`; on graphite `#34D399 → #10B981`.
- No blue anywhere — the identity is emerald + neutral graphite.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** (500/600/700) | Loaded via `next/font/google`, self-hosted. Tight tracking (-0.02em). |
| Body | **Inter** | Default sans. |
| Mono / eyebrows / data | **JetBrains Mono** (400/500) | Uppercase eyebrow labels, stat/data. |

CSS variables: `--font-display`, `--font-body`, `--font-mono` (set in `app/layout.tsx`, mapped in `tailwind.config.ts`).

### Logo
Wordmark: `m3DS` (ink/on-ink) + `ai` (accent). Favicon/OG use graphite `#0E1512` tile with emerald `#34D399` "M3DS" mark and `#10B981` "D/ai" mark (`public/favicon.svg`, `public/og/m3dsai-og.svg`).

### Where it lives
Tokens are the single source of truth in `app/globals.css` `:root`, exposed to Tailwind (`bg-*`, `accent-*`, `text-*`, `border-*`, `bg-ink*`, `text-on-ink*`, `accent-bright`). Dark bands use the `.section-ink` and `.card-ink` utilities.

## CTA
Primary: **"Book a Free Call"** → `/contact/`. Secondary product CTA: **"Learn about OpenClaw"**.

## Channels
Website (m3dsai.com), blog, email `admin@m3dsai.com`.

## Assets / output
Keep this client's raw assets + finished reels in this folder (`m3dsai.com/`).

## Notes
Redesign shipped on branch `feature/redesign-deep-navy` (fresh-corporate emerald & graphite theme — no blue, real font loading, light/graphite section rhythm).
