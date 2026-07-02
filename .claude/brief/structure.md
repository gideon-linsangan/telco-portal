# Project Structure

All source code lives under `src/`. The `@/*` path alias resolves to `./src/*`.

```
/src
  /app
    /(public)             # Unauthenticated routes
      /page.tsx           # Homepage (Contentful + stub fallback)
      /login/page.tsx     # Login form (useActionState + Server Action)
    /(dashboard)          # Auth-gated routes
      /layout.tsx         # Calls verifySession() — redirects to /login if no session
      /dashboard/page.tsx # Dashboard home
      /loading.tsx        # Skeleton loading state
      /error.tsx          # Error boundary with retry
    /actions/auth.ts      # login + logout Server Actions ('use server')
    /api/                 # 7 stub API routes (account, billing, usage, usage-history, activity, tickets, addons)
    /globals.css          # Tailwind v4 @theme tokens (brand colours, shadows, font)
    /layout.tsx           # Root layout — Inter font via next/font/google
  /components
    /ui                   # Button, Card, Badge, ProgressBar, Toggle
    /layout               # Header, Footer, DashboardSidebar
    /dashboard            # AccountCard, BillingCard, UsageMeter, UsageHistoryChart, ActivityFeed, TicketsCard, AddonsCard
    /homepage             # HeroSection, FeatureGrid, StatBar, PricingSection, PromoBanner, BlogSection
  /lib
    /session.ts           # jose JWT: encrypt, decrypt, createSession, deleteSession, getSession
    /dal.ts               # verifySession() with React cache()
    /contentful.ts        # Contentful client + typed fetch helpers + stub fallbacks
  /types
    /session.ts           # SessionPayload interface
    /dashboard.ts         # Account, Billing, Usage, UsageHistoryEntry, ActivityItem, Ticket, Addon
    /contentful.ts        # HomepageHero, FeatureBlock, SeoMeta, StatBlock, PricingPlan, PromoBanner, BlogPost
  /stubs                  # 13 stub JSON files (7 dashboard + 6 homepage)

/proxy.ts                 # Route protection — Node.js runtime (NOT Edge)
/tsconfig.json            # @/* → ./src/*
/next.config.ts
/.env.local               # Local secrets — never commit
```

## Key conventions

- No `middleware.ts` — route protection is handled by `proxy.ts` at the project root
- No `src/lib/auth.ts` — auth logic lives in `src/app/actions/auth.ts` (Server Actions)
- Stubs are imported as JSON modules (not read from disk at runtime)