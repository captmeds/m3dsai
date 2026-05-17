# m3DSai Website

A premium, multi-page business website for m3DSai — an IT Service Management company targeting small-to-medium businesses (SMBs).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 + CSS Variables
- **Animation**: Framer Motion v11
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Syne, DM Sans, JetBrains Mono)

## Features

- 7 pages: Home, 5 Service pages, Pricing, Our Work, Contact
- Dark-luxe tech aesthetic with glassmorphism
- Animated gradient mesh backgrounds
- Interactive AI chatbot widget
- Responsive design (mobile → wide desktop)
- Scroll-triggered animations
- Form validation with animated feedback

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Cloudflare Pages
```bash
npm run build
# Upload dist/ folder to Cloudflare Pages
```

## Environment Variables

```
OPENAI_API_KEY=your_openai_api_key_here
RESEND_API_KEY=your_resend_api_key_here
```

## License

© 2026 m3DSai. All rights reserved.
