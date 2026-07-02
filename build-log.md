# Build Log

## Setup checklist

- [x] `npm run dev` running locally
- [x] Vercel URL live
- [x] `.env.local` has Contentful keys
- [x] `tailwind.config.ts` has brand tokens
- [x] `component-registry.md` copied to `src/ui/`

## TN-004 — TrustBar

- [x] `src/components/TrustBar.tsx` — stat strip between hero and features
- Data: imported directly from `src/stubs/stats.json` (Server Component)
- 3 stats in a horizontal row, divided by `divide-x`, white background, `border-b`
- Value: `Text variant="metric" color="brand-signature"`, Label: `Text variant="label" color="slate"`

## TN-005 — PlansSection

- [x] `src/app/api/plans/route.ts` — stub passthrough
- [x] `src/types/plans.ts` — `Plan` interface
- [x] `src/hooks/usePlans.ts` — status-union hook with cancellation
- [x] `src/components/ui/ErrorState.tsx` — reusable error state (message + retry)
- [x] `src/components/PlansSection.tsx` — `'use client'`, 3-column grid
- Loading: three `PlanCardSkeleton` placeholders; Error: `ErrorState` with reload retry
- Featured plan (`brand.deep` background) visually elevated; `Badge variant="purple"` for label

## TN-006 — PromoBanner

- [x] `src/components/PromoBanner.tsx` — static Server Component, 17 lines JSX
- Data: imported directly from `src/stubs/banner.json`
- Full-width `bg-brand-signature` strip with heading, body, white CTA button

## TN-007 — FeatureBlocks

- [x] `src/components/FeatureBlocks.tsx` — Server Component, 3-column card grid
- Data: imported directly from `src/stubs/features.json`
- Cards follow standard card pattern; emoji icon, h3 title, body copy

## TN-008 — BlogSection

- [x] `src/components/BlogSection.tsx` — Server Component, 3-column card grid
- Data: imported directly from `src/stubs/posts.json`
- Cards are `NextLink` wrappers; date formatted with `Intl.DateTimeFormat`; category `Badge variant="neutral"`
- Hover: `border-brand-signature/40`, title shifts to `text-brand-signature`

## TN-009 — Homepage wired

- [x] `src/app/page.tsx` — assembles all 7 homepage sections in order:
  SiteHeader → HeroSection → TrustBar → FeatureBlocks → PlansSection → PromoBanner → BlogSection → SiteFooter

## Contentful integration

- [x] `src/types/contentful.ts` — typed interfaces for all 7 content models (HeroData, FeatureBlock, StatBlock, PricingPlan, PromoBanner, BlogPost, SeoMeta)
- [x] `src/lib/contentful.ts` — Management API client (CFPAT) with per-content-type stub fallback; `cache: 'no-store'` on every fetch
- [x] Content types and entries seeded in Contentful space `pjbi9mgz7500` (ATCP Training - Space 1)
- [x] `src/app/page.tsx` rewritten as async Server Component; `export const dynamic = 'force-dynamic'` to prevent static prerender
- [x] All homepage components converted to accept typed data props (no more direct stub imports or client-side hooks)
- [x] `PlansSection` converted from `'use client'` hook pattern to Server Component receiving `data` prop
- [x] Vercel env vars set: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_TOKEN` (CFPAT)
- [x] BOM (`U+FEFF`) stripped from both env vars at read time — root cause of silent fallback-to-stub on Vercel
- [x] Console logging added to `src/lib/contentful.ts` — logs source (Contentful ✓ or stub fallback) and any errors per content type
- **Confirmed live on Vercel:** all 6 content types served from Contentful (verified via `vercel logs`)
- **Note:** `CONTENTFUL_DELIVERY_TOKEN` env var holds a CFPAT — do not replace with a Delivery API token; other team members rely on it

## Auth — Login page + session (TN-LoginPanel)

- [x] `src/app/actions/auth.ts` — `login` and `logout` Server Actions; stub user `user@telconow.com.au` / `password123`
- [x] `src/lib/session.ts` — `createSession`, `deleteSession`, `getSession` via `jose` JWT (HS256, 7-day expiry, httpOnly cookie)
- [x] `src/lib/dal.ts` — `verifySession()` wrapped in React `cache()`; redirects to `/login` if no session
- [x] `src/types/session.ts` — `SessionPayload` interface
- [x] `src/app/login/page.tsx` — split-panel layout (45% brand-deep / 55% white); `useActionState` form; show/hide password toggle; inline error; "Forgot password?" + "Get started →" links
- [x] `proxy.ts` — route protection at Node.js level; protects `/dashboard`, public-only `/login`
- [x] `SESSION_SECRET` set in `.env.local` and Vercel production env vars
- **Fix:** `text-white/92` → `text-white/90` on bullet text (92 not in Tailwind v3 opacity scale → generated no CSS in production build)

## Dashboard (TN-009 through TN-018)

- [x] `src/stubs/` — all 7 stub JSON files created (account, usage, billing, activity, tickets, usage-history, addons); written without UTF-8 BOM
- [x] `src/types/` — AccountData, UsageData, BillingData, ActivityItem, Ticket, UsageMonth/UsageHistoryData, Addon types
- [x] `src/hooks/` — useAccount, useUsage, useBilling, useActivity, useTickets, useUsageHistory, useAddons; all follow loading|error|success union with cancellation flags
- [x] `src/app/dashboard/layout.tsx` — AppShell: verifySession() + Sidebar + brand-ghost main area
- [x] `src/components/dashboard/Sidebar.tsx` — 240px brand-deep sidebar; wordmark + "MY ACCOUNT" subtitle; SidebarNav (client); UserChip + Log out footer
- [x] `src/components/dashboard/SidebarNav.tsx` — `'use client'`; usePathname() active state; 6 nav items with inline SVGs; logout form action
- [x] `src/app/dashboard/page.tsx` — dynamic greeting (morning/afternoon/evening), date + bill countdown, 12-col grid
- [x] `PlanSummaryCard` (col-span-4) — plan name, account number, cost/renewal/contract/status badge
- [x] `UsageMeterCard` (col-span-8) — ProgressBar, 3 StatTiles (Remaining/Cycle/Overage rate), warning at ≥80%
- [x] `BillingCard` (col-span-4) — next payment metric, last payment badge, payment method, billing history link
- [x] `ActivityFeed` (col-span-8) — 4 items with type icons, amounts (null → "—"), status badges, "View all →" header link
- [x] `UsageHistoryChart` (col-span-12) — pure CSS bar chart; at-cap bar in brand-light; current month dashed/ghost; 50GB cap line
- [x] `SupportTickets` (col-span-4) — status (open/resolved) + priority (low/medium/high) badges; empty state
- [x] `AddOnsCard` (col-span-4) — local toggle state from stub active field; price + billing cycle
- [x] `UpgradeBanner` (col-span-4) — dark brand-deep card; warning badge; decorative SVG rings; Upgrade now CTA
- **Deployed to Vercel:** `https://project-ih51i.vercel.app/dashboard`
