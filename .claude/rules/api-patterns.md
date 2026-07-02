# TelcoNow — API Patterns Rules

> Read this file before fetching data, handling errors, writing hooks, or creating tests.
> All data-fetching follows these patterns exactly — no exceptions.

---

## Stub data

During training, all API calls are served from stub JSON files.
Stubs live in `/stubs/` and are served via Next.js API routes in `src/app/api/stub/`.

| Component | Stub file | API route |
|-----------|-----------|-----------|
| Plan summary card | `/stubs/account.json` | `GET /api/stub/account` |
| Data usage meter | `/stubs/usage.json` | `GET /api/stub/usage` |
| Billing overview | `/stubs/billing.json` | `GET /api/stub/billing` |
| Recent activity feed | `/stubs/activity.json` | `GET /api/stub/activity` |
| Support tickets | `/stubs/tickets.json` | `GET /api/stub/tickets` |
| Usage history chart | `/stubs/usage-history.json` | `GET /api/stub/usage-history` |
| Add-ons & extras | `/stubs/addons.json` | `GET /api/stub/addons` |

**Do not hardcode stub data inside components.**
Always fetch from the API route — this mirrors real-world behaviour
and means switching from stub to real API requires changing one line.

---

## API route pattern

Every stub API route follows this exact pattern:

```ts
// src/app/api/stub/usage/route.ts
import { NextResponse } from 'next/server'
import data from '@/stubs/usage.json'

export async function GET() {
  return NextResponse.json(data)
}
```

Never add logic to stub routes. They return the JSON as-is.

---

## Data fetching pattern

Use a custom hook per data type. Never fetch inside a component directly.

```ts
// src/hooks/useUsage.ts
import { useState, useEffect } from 'react'
import type { UsageData } from '@/types/usage'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: UsageData }

export function useUsage(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch('/api/stub/usage')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: UsageData) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch(err => {
        if (!cancelled) setState({ status: 'error', message: err.message })
      })

    return () => { cancelled = true }
  }, [])

  return state
}
```

**Why this pattern:**
- Status union (`loading | error | success`) forces exhaustive handling in the component
- `cancelled` flag prevents state updates on unmounted components
- Hook is independently testable without mounting a component

---

## Component consumption pattern

Every data-fetching component handles all three states explicitly.
Missing any state is a bug — not a "nice to have."

```tsx
// src/components/dashboard/UsageMeter.tsx
import { useUsage } from '@/hooks/useUsage'
import { UsageMeterSkeleton } from './UsageMeterSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'

export function UsageMeter() {
  const state = useUsage()

  if (state.status === 'loading') return <UsageMeterSkeleton />
  if (state.status === 'error')   return <ErrorState message={state.message} onRetry={() => window.location.reload()} />

  const { usedGB, totalGB, cycleEndDate, overageRate } = state.data

  // derive values here — not in the hook
  const percentUsed = Math.round((usedGB / totalGB) * 100)
  const daysRemaining = Math.ceil(
    (new Date(cycleEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      {/* render with derived values */}
    </div>
  )
}
```

---

## TypeScript types

Every stub has a corresponding type in `src/types/`.
Define the type before writing the hook or component.

```ts
// src/types/usage.ts
export interface UsageData {
  usedGB: number
  totalGB: number
  cycleStartDate: string   // ISO date string: "2026-06-01"
  cycleEndDate: string     // ISO date string: "2026-06-30"
  overageRate: number      // per MB, e.g. 0.02
}
```

**Rules:**
- No `any` — ever
- Date fields are always ISO strings from the API — parse them in the component
- Monetary values are always numbers (dollars) — format them in the component with `Intl.NumberFormat`
- Array responses are always typed as `SomeType[]` — never `unknown[]`

---

## Error state component

Reusable — lives at `src/components/ui/ErrorState.tsx`.
Check registry before rebuilding.

```tsx
interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

// Renders: error icon + "Something went wrong" + optional message + optional retry button
// Never renders a blank div or null on error
```

---

## Derived values rule

**Derive in the component, not in the hook.**

The hook's job is to fetch and type the raw data.
The component's job is to compute what it needs for display.

```ts
// ✅ correct — derived in component
const percentUsed = Math.round((usedGB / totalGB) * 100)

// ❌ wrong — derived in hook
// The hook should not know what the component needs to display
```

This keeps hooks reusable across components that may need different derived values
from the same data.

---

## Testing pattern

Every hook gets a unit test. Every component gets a render test for each state.

```ts
// src/hooks/useUsage.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useUsage } from './useUsage'

// Mock fetch globally in test setup

describe('useUsage', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useUsage())
    expect(result.current.status).toBe('loading')
  })

  it('returns success state with data on successful fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ usedGB: 38.4, totalGB: 50, ... })
    })
    const { result } = renderHook(() => useUsage())
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('returns error state on failed fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    const { result } = renderHook(() => useUsage())
    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})
```

---

## What NOT to do

- Never `fetch()` directly inside a component — always use a hook
- Never return `null` or render nothing on error — always use `<ErrorState />`
- Never render nothing on loading — always use a skeleton
- Never use `useEffect` with an empty dependency array and no cleanup — always handle cancellation
- Never store derived values in state — compute them from the fetched data inline
- Never format dates or currency in hooks — format in the component

---

*Owner: Tech Lead*
*Reference stubs: `/stubs/*.json`*
*Reference types: `src/types/*.ts`*
