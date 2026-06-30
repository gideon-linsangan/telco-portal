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
