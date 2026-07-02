# Pages

## Homepage `/`

Public marketing page. Data comes from Contentful, with automatic stub fallback.

**Stub fallback:** When Contentful is unconfigured or a content type doesn't exist yet, each section falls back to its stub file in `src/stubs/`. No code change needed — `src/lib/contentful.ts` handles this automatically via `try/catch`.

- Hero section (`src/stubs/hero.json`)
- Stat bar (`src/stubs/stats.json`)
- Feature blocks 3-up grid (`src/stubs/features.json`)
- Pricing section (`src/stubs/plans.json`)
- Promo banner (`src/stubs/banner.json`)
- Blog section — 3 most recent posts (`src/stubs/posts.json`)
- Static Footer (hardcoded, not Contentful-driven)

## Login `/login`

- `'use client'` component
- Email + password form using `useActionState(login, undefined)`
- Calls the `login` Server Action from `src/app/actions/auth.ts`
- Shows inline error on failure ("Invalid email or password")
- Redirects to `/dashboard` on success
- No "remember me", no OAuth providers

### ⚠️ Open question

The login design has "Forgot password?" and "Get started" links with `href="#"` (no destination).
Not yet decided whether these route to placeholder pages, are disabled, or are out of scope. Flag before wiring these up.

## Dashboard `/dashboard`

Authenticated customer portal. Requires a valid session — `proxy.ts` redirects to `/login` if none.

**Data flow:** `src/app/(dashboard)/dashboard/page.tsx` fetches all 7 API routes in parallel (`Promise.all`) and passes typed data to dashboard card components.

### Mock data files → routes (confirmed)

| File | Route | Component | Notes |
|---|---|---|---|
| `account.json` | `/api/account` | `AccountCard` | `name`/`accountNumber` from session, not this file |
| `billing.json` | `/api/billing` | `BillingCard` | Next/last payment, payment method |
| `usage.json` | `/api/usage` | `UsageMeter` | Route adds server-calculated `percentUsed`/`daysRemaining` |
| `usage-history.json` | `/api/usage-history` | `UsageHistoryChart` | 6 months of usage + cost |
| `activity.json` | `/api/activity` | `ActivityFeed` | Payment amounts shown as absolute `$` values |
| `tickets.json` | `/api/tickets` | `TicketsCard` | Open/resolved tickets with status + priority badges |
| `addons.json` | `/api/addons` | `AddonsCard` | Toggle is UI-only — see below |

### Add-on toggle (confirmed: UI-only)

`addons.json` has an `active` boolean per add-on. **Confirmed: UI-only** — no API call, no persistence. Toggling updates local `useState` only; refreshing resets to the stub value. No `PATCH`/`POST` route needed.