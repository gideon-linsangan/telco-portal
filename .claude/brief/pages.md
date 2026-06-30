# Pages

## Homepage `/`

Public marketing page. Content driven by Contentful.

- Hero section (headline, subheadline, CTA button → `/login`)
- Feature blocks (3-up grid)
- Footer with links

## Login `/login`

- Email + password form
- Calls NextAuth `signIn('credentials', ...)`
- Shows inline error on failure ("Invalid email or password")
- Redirects to `/dashboard` on success
- No "remember me", no OAuth providers for now

### ⚠️ Open question

The login design has "Forgot password?" and "Get started" links with `href="#"` (no destination).
Not yet decided whether these route to placeholder pages, are disabled, or are out of scope for now.
Flag before wiring these up.

## Dashboard `/dashboard`

Authenticated customer portal. Shows account summary for the logged-in user.

**Sections:**
- Account overview (name, account number, plan name)
- Current bill (amount due, due date, pay now CTA — UI only, no payment flow)
- Data usage (progress bar — mock data for now)
- Quick links (View bills, Manage plan, Contact support — links only, pages TBD)

**Data source:** Separate API routes per resource — see `/brief/api-routes.md` for the full list
(`/api/account`, `/api/billing`, `/api/usage`, `/api/usage-history`, `/api/activity`,
`/api/tickets`, `/api/addons`). No external billing API yet — all stubbed with realistic fake data.

### Mock data files → routes (confirmed)

| File | Route | Feeds | Notes |
|---|---|---|---|
| `account.json` | `/api/account` | Plan summary card | `name`/`accountNumber` come from session, not this file — see `/brief/auth.md` |
| `billing.json` | `/api/billing` | Billing overview card | Next/last payment, payment method |
| `usage.json` | `/api/usage` | Data usage meter | Route adds server-calculated `percentUsed`/`daysRemaining` — see below |
| `usage-history.json` | `/api/usage-history` | Usage history chart | 6 months of usage + cost |
| `activity.json` | `/api/activity` | Recent activity feed | Payment, topup, plan change, addon events |
| `tickets.json` | `/api/tickets` | Support tickets card | Open/resolved tickets |
| `addons.json` | `/api/addons` | Add-ons & extras card | Toggle is UI-only — see below |

### Derived values (confirmed: server-side)

The dashboard design shows "% used" and "days remaining," which aren't raw fields in `usage.json`.
**Confirmed:** `/api/usage` calculates and returns `percentUsed` and `daysRemaining` server-side at
request time (`daysRemaining` depends on the current date, so it can't be a static stub value).
See `/brief/api-routes.md` for the exact response shape.

### Add-on toggle (confirmed: UI-only)

`addons.json` has an `active` boolean per add-on, and the design shows toggle switches. **Confirmed:
UI-only** — no API call, no persistence. Toggling updates local component state only; refreshing the
page resets it to the stub value. No `PATCH`/`POST` route needed for add-ons.
