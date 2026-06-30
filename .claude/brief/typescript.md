# TypeScript

- Strict mode enabled (`"strict": true` in tsconfig)
- No `any` — use `unknown` and narrow, or define a proper type
- All Contentful responses must be typed — generate or maintain types in `/types/contentful.ts`
- Props interfaces defined inline for simple components, exported for shared ones

## Dashboard mock data types (proposed)

Drafted from the 7 mock JSON files plus the confirmed server-side additions to `/api/usage`. These
should live in `/types/dashboard.ts`. Confirm before implementing — not yet approved.

```ts
// account.json — GET /api/account
interface Account {
  planName: string
  planTier: 'starter' | 'plus' | 'pro'
  renewalDate: string   // ISO date
  monthlyCost: number
  status: 'active' | 'inactive' | 'suspended'
}

// billing.json — GET /api/billing
interface Billing {
  nextPayment: { date: string; amount: number }
  lastPayment: { date: string; amount: number; status: 'paid' | 'failed' | 'pending' }
  paymentMethod: { type: 'visa' | 'mastercard' | 'amex'; last4: string }
}

// usage.json — GET /api/usage (raw fields + server-calculated additions)
interface Usage {
  usedGB: number
  totalGB: number
  cycleStartDate: string
  cycleEndDate: string
  overageRate: number
  percentUsed: number     // server-calculated: usedGB / totalGB * 100
  daysRemaining: number     // server-calculated: cycleEndDate - today, at request time
}

// usage-history.json — GET /api/usage-history
interface UsageHistoryEntry {
  month: string      // e.g. "Jan 2026"
  usedGB: number
  totalGB: number
  cost: number
}
type UsageHistory = UsageHistoryEntry[]

// activity.json — GET /api/activity
interface ActivityItem {
  id: string
  type: 'payment' | 'data_topup' | 'plan_change' | 'addon'
  description: string
  timestamp: string         // ISO datetime
  amount: number | null       // null for non-monetary events like plan_change
  status: 'completed' | 'pending' | 'failed'
}
type Activity = ActivityItem[]

// tickets.json — GET /api/tickets
interface Ticket {
  id: string
  subject: string
  status: 'open' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}
type Tickets = Ticket[]

// addons.json — GET /api/addons
interface Addon {
  id: string
  name: string
  description: string
  price: number
  active: boolean    // UI-only toggle, not persisted — see /brief/pages.md
  category: 'travel' | 'data' | 'entertainment' | 'insurance'
}
type Addons = Addon[]
```

### Notes

- `amount: number | null` on `ActivityItem` — `plan_change` events have no monetary amount in the
  stub, confirmed as legitimately nullable rather than a missing-data gap.
- **Union types policy (confirmed):** union types for `type`, `status`, `priority`, `category`,
  `planTier`, `paymentMethod.type` etc. are based strictly on values present in the current stub
  data. This is accepted as-is for now — if live/real data introduces new values later, the types
  will be widened at that point. Not a blocking concern, no action needed today.
