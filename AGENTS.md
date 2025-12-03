# Repository Guidelines

## Project Structure & Module Organization
- Primary code lives in `apps/website` (Next.js 15 App Router, TypeScript, Tailwind).
- `app/(marketing)` holds public pages; `app/api` contains contact/newsletter endpoints; `app/blog` renders Markdown posts from `content/blog`.
- `components/ui`, `components/marketing`, and `components/layout` contain reusable building blocks; prefer importing via the `@/` alias.
- `config/` stores site metadata/pricing config; `public/` holds static assets; `supabase/migrations` is reserved for database changes if enabled.

## Setup, Build, Test, and Development Commands
- Install: `cd apps/website && npm install` (Node 18+).
- Dev server: `npm run dev` (hot reload at `http://localhost:3000`).
- Lint: `npm run lint` (Next.js core-web-vitals rules).
- Production build/type-check: `npm run build`.
- Serve built output: `npm start` after a successful build.

## Coding Style & Naming Conventions
- TypeScript is `strict`; use functional components and add `"use client"` only where client-side hooks/state are needed.
- Indentation is 2 spaces; formatting follows Next.js/ESLint defaults (no semicolons, double quotes).
- File names are kebab-case (`hero-section.tsx`); exported React components and hooks are PascalCase (`HeroSection`, `useFeatureFlag`).
- Prefer path aliases (`@/components/...`, `@/lib/...`) over relative `../../` imports; keep Tailwind classes readable and grouped by layout → color → effects.
- Reuse existing UI primitives in `components/ui` before adding new ones to keep styling consistent.

## Testing Guidelines
- No automated test suite exists yet; run `npm run lint` and `npm run build` before opening a PR to catch type and ESLint regressions.
- Add targeted tests when introducing logic-heavy utilities or API handlers; colocate as `*.test.ts`/`*.test.tsx` near the source or in a `__tests__` folder.
- Manually smoke-test key flows (home, pricing, enterprise contact form, downloads) after changes to shared layout/components.

## Commit & Pull Request Guidelines
- Commit messages follow a lightweight conventional style seen in history (`feat: ...`, `fix: ...`, `chore: ...`); keep scopes descriptive.
- PRs should include: a concise summary, linked issue/task reference, screenshots for UI changes (desktop + mobile), and notes on any environment variable additions.
- Ensure builds pass locally and lint warnings are resolved; mention manual test steps taken in the PR description.

## Environment & Configuration
- Copy `.env.example` to `.env.local` inside `apps/website`; required keys include `NEXT_PUBLIC_SITE_URL`, Supabase, and Stripe secrets.
- Keep secrets out of commits; prefer provider dashboards or Vercel project settings for production values.
- If adding migrations or new env keys, document expected defaults in `SETUP.md` and update `.env.example`.
