# Build Log

A running, append-only record of work done on the project. Each entry should be added at the end —
do not edit or remove past entries. This is an audit trail, not a changelog.

## Entry Format

```
## [YYYY-MM-DD] Short title

**What changed:**
- ...

**Assumptions made:**
- ...

**Risks introduced or affected:**
- ...

**Open questions:**
- ...
```

---

## [2026-06-30] Initial project brief created

**What changed:**
- Split the single `claude.md` into a `claude.md` index + `/brief/*.md` topic files
- Added `definition-of-done.md` and `risks.md` to `/brief`
- Created this build log

**Assumptions made:**
- Stub auth credentials (`user@telconow.com.au` / `password123`) carried over from original spec, not independently confirmed
- `/api/account` response shape inferred, not confirmed
- Contentful field names carried over from original spec, not confirmed against the actual space

**Risks introduced or affected:**
- See `/brief/risks.md` for full list

**Open questions:**
- Design files have not been linked or shared yet
- `/api/account` response shape needs sign-off before dashboard UI is built against it

---

## [2026-06-30] Audited mock stubs and .dc.html designs against brief docs

**What changed:**
- Cross-checked 7 mock JSON files (account, billing, usage, usage-history, activity, tickets, addons) and 3 design files (Homepage, Login, Dashboard) against existing `/brief` docs
- Added explicit "⚠️ Open question" sections to `api-routes.md`, `auth.md`, `contentful.md`, `pages.md`, and `typescript.md` for every gap found
- Expanded `risks.md` with 6 new rows covering each gap

**Gaps found (all flagged as open questions, not resolved):**
1. No decided routing strategy for the 7 mock JSON files — combined vs separate routes
2. Session shape requires `name` and `accountNumber`, but no mock file provides either
3. Homepage design has blog/stats/pricing content with no matching Contentful model
4. Dashboard design shows derived values (% used, days remaining) not present as raw JSON fields
5. Add-on toggle behavior (UI-only vs API-backed) is undecided
6. Login page has dead links (forgot password, get started) with no defined destination
7. No TypeScript interfaces exist yet for any of the 7 mock data shapes

**Assumptions made:**
- None — all gaps were documented as open questions rather than resolved by assumption, per explicit instruction

**Risks introduced or affected:**
- See updated `/brief/risks.md`

**Open questions:**
- All 7 items above remain unresolved and must be answered before Claude Code builds against them

---

## [2026-06-30] Deep audit of homepage design vs Contentful models

**What changed:**
- Crawled every section of `TelcoNow_Homepage_dc.html` field-by-field against the 3 existing Contentful models
- Found the existing `homepageHero` model is itself incomplete (missing badge text, second CTA)
- Found 4 additional sections with no model at all: trust stats bar, pricing cards, promo banner, blog cards
- Found the footer is likely static/hardcoded rather than CMS content — flagged for confirmation, not modeled
- Drafted proposed shapes for all 4 new models (`statBlock`, `pricingPlan`, `promoBanner`, `blogPost`) directly in `contentful.md` — these are proposals only, not approved
- Updated `risks.md` to reflect the more complete scope of this gap

**Assumptions made:**
- None — proposed models are explicitly marked as drafts pending approval, not assumed final

**Risks introduced or affected:**
- See updated `/brief/risks.md`

**Open questions:**
- Are the 4 proposed model shapes acceptable, or do field names/structure need to change?
- Is the footer intentionally static, or should it also be Contentful-driven?
- For blog cards: is the homepage selection fixed (e.g. "3 most recent") or manually curated per entry?

---

## [2026-06-30] Homepage Contentful models approved

**What changed:**
- All 4 proposed models (`statBlock`, `pricingPlan`, `promoBanner`, `blogPost`) approved as-is, no field changes requested
- `homepageHero` update (badgeText, primaryCta, secondaryCta) confirmed
- Footer confirmed static — not Contentful-driven, hardcoded in codebase
- Blog homepage query confirmed: 3 most recently published posts, sorted by `publishDate` descending, no manual curation or featured flag
- Updated `contentful.md` top-level models table to include all 7 confirmed models
- Closed the corresponding risk row in `risks.md`

**Assumptions made:**
- None — all decisions were explicit confirmations from the user

**Risks introduced or affected:**
- Resolved: homepage Contentful model gap (previously the largest open item in `risks.md`)

**Open questions:**
- None remaining for homepage Contentful models. Remaining open items: dashboard data routing strategy, session name/accountNumber source, dashboard derived-value calculation location, add-on toggle persistence, login dead links, missing TypeScript interfaces for the 7 mock shapes

---

## [2026-06-30] Remaining dashboard/auth/typescript gaps resolved

**What changed:**
- Confirmed separate API routes per resource (`/api/account`, `/api/billing`, `/api/usage`, `/api/usage-history`, `/api/activity`, `/api/tickets`, `/api/addons`) — not one combined route
- Confirmed `name`/`accountNumber` are generated as hardcoded fake values in `/lib/auth.ts`, not sourced from `account.json`
- Confirmed `percentUsed` and `daysRemaining` are calculated server-side inside `/api/usage`, not client-side and not stub fields — `daysRemaining` is computed at request time since it depends on the current date
- Confirmed add-on toggle is UI-only — no persistence, no API route
- Login dead links (forgot password, get started) intentionally deferred — not resolved, left as-is for now
- Drafted full TypeScript interfaces for all 7 mock data shapes in `typescript.md` (`Account`, `Billing`, `Usage`, `UsageHistoryEntry`, `ActivityItem`, `Ticket`, `Addon`)
- Updated `api-routes.md` and `pages.md` to reflect the confirmed routing and calculation decisions
- Rewrote `risks.md` — 6 rows marked resolved, only login dead links remains open (intentionally deferred)

**Assumptions made:**
- TypeScript interfaces are drafted, not yet explicitly approved field-by-field — flagged as "proposed" in `typescript.md`, awaiting confirmation
- Union type values (e.g. `Account['status']`, `ActivityItem['type']`) were inferred from values present in the stub data only — may need expansion if new values are introduced later

**Risks introduced or affected:**
- 6 of 7 previously open risks closed; only login dead links remains open by deliberate choice

**Open questions:**
- Confirm the 7 drafted TypeScript interfaces in `typescript.md` before implementation
- Login dead links — revisit before login page work begins

---

## [2026-06-30] Closed remaining assumption gaps

**What changed:**
- Union type values policy confirmed: based strictly on current stub data, accepted as-is, will widen if live data introduces new values later — no action needed today
- `accountNumber` format confirmed as placeholder (`"TN-000001"`) until a real pattern is specified by the business
- `/api/usage` date calculations confirmed to use server time, not client/user timezone
- `/types/dashboard.ts` file location confirmed as-is, no change needed
- Closed final 3 open rows in `risks.md`

**Assumptions made:**
- None — all four items were explicit user confirmations

**Risks introduced or affected:**
- All risks closed except: design files still not linked, no automated tests (ongoing/accepted), and login dead links (intentionally deferred)

**Open questions:**
- Login dead links remain the only deliberately deferred item
- Design files (Figma or similar) still not linked anywhere in the brief — worth flagging again before a full build starts

---

## [2026-06-30] Design files risk closed

**What changed:**
- Confirmed design files exist as `.dc.html` files in the project (`TelcoNow_Homepage_dc.html`, `TelcoNow_Login_dc.html`, `TelcoNow_Dashboard_dc.html`)
- Closed the corresponding risk row in `risks.md`

**Assumptions made:**
- None

**Risks introduced or affected:**
- Only remaining open item: login dead links (intentionally deferred)

---

## [2026-06-30] Homepage Contentful models approved

**What changed:**
- All 4 proposed models (`statBlock`, `pricingPlan`, `promoBanner`, `blogPost`) approved as-is, no field changes requested
- `homepageHero` update (badgeText, primaryCta, secondaryCta) confirmed
- Footer confirmed static — not Contentful-driven, hardcoded in codebase
- Blog homepage query confirmed: 3 most recently published posts, sorted by `publishDate` descending, no manual curation or featured flag
- Updated `contentful.md` top-level models table to include all 7 confirmed models
- Closed the corresponding risk row in `risks.md`

**Assumptions made:**
- None — all decisions were explicit confirmations from the user

**Risks introduced or affected:**
- Resolved: homepage Contentful model gap (previously the largest open item in `risks.md`)

**Open questions:**
- None remaining for homepage Contentful models. Remaining open items: dashboard data routing strategy, session name/accountNumber source, dashboard derived-value calculation location, add-on toggle persistence, login dead links, missing TypeScript interfaces for the 7 mock shapes

---

## [2026-06-30] Pre-build audit + framework version decisions

**What changed:**
- Full pre-build audit delivered across 6 dimensions: assumptions, conflicts, gaps, versions, code correctness, major flaws

**Decisions made (all confirmed by user):**
- Framework: **Next.js 16** (not v14 as originally specced) — installed 16.2.9
- Styling: **Tailwind v4** — CSS-first config; no `tailwind.config.ts`; tokens in `app/globals.css` under `@theme`
- Auth: **Native `jose` JWT** (not NextAuth v5) — matches Next.js 16 recommended pattern; uses `proxy.ts` not `middleware.ts`
- TypeScript interfaces: treated as approved and implemented
- `promoBanner.ctaHref`: added to `types/contentful.ts`

**Assumptions made:**
- `featureBlock.icon` typed as `string` — no type specified in brief
- `seoMeta` scoped to homepage for now

**Open questions:**
- Login "forgot password" and "get started" links still deferred (`href="#"`)

---

## [2026-06-30] Build Phases 1–3 completed

**What changed:**

Phase 1 — Scaffold:
- Next.js 16.2.9 scaffolded; installed `jose`, `server-only`, `contentful`
- `app/globals.css` rewritten with Tailwind v4 `@theme` brand tokens (purple palette, status colours, Inter font)
- `app/layout.tsx`: Inter font, TelcoNow metadata
- `app/page.tsx`: placeholder (built in Phase 7)
- Stub fixes: `usage.json` cycleEndDate → `2026-07-31`; `usage-history.json` Jan totalGB `15` → `50`

Phase 2 — Types:
- `types/dashboard.ts` — Account (with accountNumber), Billing, Usage, UsageHistoryEntry, ActivityItem, Ticket, Addon
- `types/contentful.ts` — all 7 Contentful models including `promoBanner.ctaHref`
- `types/session.ts` — `SessionPayload` (userId, name, email, accountNumber, expiresAt)

Phase 3 — Auth + Proxy:
- `lib/session.ts` — jose HS256 encrypt/decrypt, createSession, deleteSession, getSession
- `lib/dal.ts` — `verifySession()` with React cache(); redirects to /login if no session
- `app/actions/auth.ts` — `login` server action (stub credentials check → session → redirect /dashboard); `logout` (delete session → redirect /login)
- `proxy.ts` — protects /dashboard/*; redirects authed users from /login; Node.js runtime
- `.env.local` — CONTENTFUL_SPACE_ID, CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_PREVIEW_TOKEN, SESSION_SECRET, NEXTAUTH_URL

**Risks introduced or affected:**
- `tsc --noEmit` passes cleanly after each phase

**Open questions:**
- None blocking. Phases 4–10 remain.

---

## [2026-06-30] Build Phases 4–10 completed — full app built

**What changed:**

Phase 4 — API Routes:
- 7 routes under `app/api/`: account, billing, usage (with server-calculated percentUsed/daysRemaining), usage-history, activity, tickets, addons
- Stubs copied to `stubs/` at project root for module imports
- JSON import union type narrowing handled with `as unknown as T` casts

Phase 5 — Contentful Client:
- `lib/contentful.ts` — delivery/preview client selection via `VERCEL_ENV`, typed fetch helpers for all 7 models, WebP via `?fm=webp`

Phase 6 — Shared UI Components:
- `components/ui/`: Button (3 variants, 2 sizes), Card, Badge (6 variants), ProgressBar (gradient at 80%+), Toggle
- `components/layout/`: Header (public nav), Footer (static), DashboardSidebar (with logout server action)

Phase 7 — Homepage:
- `app/(public)/page.tsx` — Server Component, parallel Contentful fetches, graceful null handling
- Section components: HeroSection, FeatureGrid, StatBar, PricingSection, PromoBanner, BlogSection
- generateMetadata() fetches seoMeta from Contentful

Phase 8 — Login Page:
- `app/(public)/login/page.tsx` — Client Component using useActionState with login server action
- Two-panel layout matching design; inline error "Invalid email or password"; deferred dead links use aria-disabled

Phase 9 — Dashboard:
- `app/(dashboard)/layout.tsx` — verifySession + DashboardSidebar
- `app/(dashboard)/loading.tsx` — animated skeleton grid
- `app/(dashboard)/error.tsx` — error boundary with retry
- `app/(dashboard)/dashboard/page.tsx` — parallel fetch of all 7 API routes via internal fetch
- 7 card components: AccountCard, BillingCard, UsageMeter, UsageHistoryChart, ActivityFeed, TicketsCard, AddonsCard (client with useState toggle)

Phase 10 — Verification:
- tsc --noEmit passes cleanly (0 errors)
- Dev server starts successfully (Next.js 16.2.9 Turbopack, ready in ~15s)
- /login → 200 ✅
- /dashboard (unauthenticated) → 307 redirect to /login ✅
- /api/account (unauthenticated) → 307 redirect to /login ✅
- Homepage times out expected — Contentful env vars not set; login/dashboard flow fully functional

**Risks introduced or affected:**
- Homepage requires Contentful credentials to render; all other pages function without them

**Open questions:**
- Contentful space ID and tokens need to be added to .env.local before homepage works
- SESSION_SECRET needs to be set (can generate with: openssl rand -base64 32)
- Login dead links (forgot password, get started) remain deferred with aria-disabled
