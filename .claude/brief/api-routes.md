# API Routes

- Live under `src/app/api/`
- Always return typed JSON responses
- Stubs imported as JSON modules from `@/stubs/*.json` (resolves to `src/stubs/`)

## Error Shape

```ts
{ error: string }
```

No `status` field in the body — HTTP status code only.

## Rules

- Auth-protected routes must validate the session at the top of the handler via `verifySession()` from `@/lib/dal` — do not rely on `proxy.ts` alone
- No direct Contentful calls from API routes — use helpers from `@/lib/contentful.ts`

## Routes

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/account` | GET | Yes | Plan summary — from `account.json`. Adds `accountNumber` from session (see `brief/auth.md`) |
| `/api/billing` | GET | Yes | Billing overview — from `billing.json` |
| `/api/usage` | GET | Yes | Data usage meter — from `usage.json`, plus server-calculated `percentUsed` and `daysRemaining` (see note below) |
| `/api/usage-history` | GET | Yes | Usage history chart — from `usage-history.json` |
| `/api/activity` | GET | Yes | Recent activity feed — from `activity.json` |
| `/api/tickets` | GET | Yes | Support tickets — from `tickets.json` |
| `/api/addons` | GET | Yes | Add-ons & extras — from `addons.json`. Toggle is UI-only, no `PATCH`/`POST` route needed |

**Decision confirmed:** separate routes per resource, not one combined endpoint.

### `/api/usage` — derived fields

`usage.json` only contains raw fields (`usedGB`, `totalGB`, `cycleStartDate`, `cycleEndDate`, `overageRate`). The route response adds:

```ts
{
  usedGB: number
  totalGB: number
  cycleStartDate: string
  cycleEndDate: string
  overageRate: number
  percentUsed: number      // calculated: usedGB / totalGB * 100
  daysRemaining: number    // calculated: cycleEndDate - today, server-side at request time
}
```

`daysRemaining` uses the Vercel serverless function's clock (server time), not the client's local timezone.