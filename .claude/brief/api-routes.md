# API Routes

- Live under `/app/api/`
- Always return typed JSON responses

## Error Shape

```ts
{ error: string; status: number }
```

## Rules

- Auth-protected routes must validate the session at the top of the handler — do not rely on middleware alone
- No direct Contentful calls from API routes — use helpers from `/lib/contentful.ts`

## Routes

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/validate` | GET | No | Reads JWT cookie, returns 200 or 401 |
| `/api/account` | GET | Yes | Plan summary — from `account.json`. Adds `accountNumber` (see `/brief/auth.md`) |
| `/api/billing` | GET | Yes | Billing overview — from `billing.json` |
| `/api/usage` | GET | Yes | Data usage meter — from `usage.json`, plus server-calculated `percentUsed` and `daysRemaining` (see note below) |
| `/api/usage-history` | GET | Yes | Usage history chart — from `usage-history.json` |
| `/api/activity` | GET | Yes | Recent activity feed — from `activity.json` |
| `/api/tickets` | GET | Yes | Support tickets — from `tickets.json` |
| `/api/addons` | GET | Yes | Add-ons & extras — from `addons.json`. Toggle is UI-only, no `PATCH`/`POST` route needed (see `/brief/pages.md`) |

**Decision confirmed:** separate routes per resource, not one combined `/api/account` endpoint.

### `/api/usage` — derived fields

`usage.json` only contains raw fields (`usedGB`, `totalGB`, `cycleStartDate`, `cycleEndDate`,
`overageRate`). The design shows "% used" and "days remaining," which are not stub fields — they
must be calculated. **Confirmed: calculated server-side**, so the route response includes:

```ts
{
  usedGB: number
  totalGB: number
  cycleStartDate: string
  cycleEndDate: string
  overageRate: number
  percentUsed: number      // calculated: usedGB / totalGB * 100
  daysRemaining: number      // calculated: cycleEndDate - today, server-side at request time
}
```

`daysRemaining` depends on the current date, so it cannot be a static stub value — it's computed at
request time, not stored. **Confirmed: uses server time** (the Vercel serverless function's clock),
not the client's local timezone.
