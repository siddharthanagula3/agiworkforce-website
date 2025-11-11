# AGI Workforce Website

Marketing website for AGI Workforce - autonomous desktop automation powered by AI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes (dark/light mode)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
apps/website/
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Marketing pages (uses layout)
│   │   ├── page.tsx        # Homepage
│   │   ├── features/       # Features page
│   │   ├── pricing/        # Pricing page
│   │   ├── enterprise/     # Enterprise page
│   │   ├── download/       # Download page
│   │   └── changelog/      # Changelog page
│   ├── api/                # API routes
│   │   ├── contact/        # Contact form endpoint
│   │   └── newsletter/     # Newsletter endpoint
│   ├── layout.tsx          # Root layout
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Sitemap generator
│   └── robots.ts           # Robots.txt generator
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   ├── marketing/          # Marketing-specific components
│   └── forms/              # Form components
├── config/                 # Configuration files
│   ├── site.ts            # Site metadata and navigation
│   └── pricing.ts         # Pricing tiers
├── lib/                    # Utilities
│   ├── utils.ts           # Helper functions
│   └── structured-data.ts # SEO structured data
└── public/                # Static assets
```

## Features

### Pages
- ✅ Homepage with 11 sections
- ✅ Features page (12 features)
- ✅ Pricing page with comparison table
- ✅ Enterprise page with contact form
- ✅ Download page with OS detection
- ✅ Changelog page

### Components
- ✅ Responsive header with mobile menu
- ✅ Footer with newsletter signup
- ✅ Dark/light theme toggle
- ✅ Cookie consent banner
- ✅ Contact form with validation
- ✅ Demo video modal
- ✅ Loading states and error boundaries

### SEO
- ✅ Sitemap and robots.txt
- ✅ Open Graph and Twitter Cards
- ✅ Structured data (Organization, SoftwareApplication, FAQ)
- ✅ Meta tags for all pages

### Performance
- ✅ Static page generation
- ✅ Image optimization (WebP, AVIF)
- ✅ Code splitting and tree shaking
- ✅ Bundle size optimization

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Environment Variables

See `.env.example` for all available environment variables.

Required:
- `NEXT_PUBLIC_SITE_URL` - Production site URL

Optional:
- Email service API keys (for contact form)
- Newsletter service API keys
- Analytics tracking IDs

## Deployment

The site is optimized for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## TODO

- [ ] Add real email service integration (SendGrid/Resend)
- [ ] Add real newsletter service (Mailchimp/ConvertKit)
- [ ] Replace placeholder images/logos
- [ ] Add YouTube video to demo modal
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Add blog (optional)
- [ ] Add documentation (optional)

## License

Proprietary - All rights reserved
