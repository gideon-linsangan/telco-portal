# Story: Usage Meter Card

**Story ID:** TN-012
**Component:** `UsageMeterCard.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Usage Meter"
**Stub data:** `/stubs/usage.json` via `GET /api/usage`

---

## Story

As an authenticated TelcoNow customer
I want to see how much data I've used this cycle
So that I can manage my usage before my allowance runs out

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When UsageMeterCard renders with data from GET /api/usage
Then display a progress bar showing used data as a percentage of total
And display the used amount and total (e.g. "38.4 GB of 50 GB used")
And display the number of days remaining in the billing cycle
And display the cycle end date formatted as a readable date
And display the overage rate formatted as AUD per MB (e.g. "$0.02/MB") if applicable
And display three StatTile sub-cells: used GB, remaining GB, days remaining
```

```
Given percentUsed is below 80
Then display the progress bar in bg-semantic-success
```

```
Given percentUsed is 80 or above but below 100
Then display the progress bar in bg-semantic-warning
```

```
Given percentUsed is 100 or above
Then display the progress bar in bg-semantic-error
And display overage messaging
⚠ Uncertain: exact overage message copy — confirm against design file
```

### Loading state

```
Given the component is fetching from GET /api/usage
Then display a skeleton loader matching the progress bar and stat tile layout
And do not show a spinner
```

### Error state

```
Given GET /api/usage returns an error
Then display an error message: "Unable to load usage data."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given usedGB exceeds totalGB
Then clamp the progress bar at 100% width
And show the overage error colour
```

```
Given daysRemaining is 1
Then display "1 day remaining" (singular)
```

---

## Out of scope

- Historical usage trends (UsageHistoryChart story)
- Data top-up purchase flow

---

## Notes for developer

- `percentUsed` and `daysRemaining` are calculated server-side in the API route — do not recalculate in the hook
- All display derivations (bar colour, formatted strings) happen in the component, not the hook
- `cycleEndDate` is an ISO date string — format with `Intl.DateTimeFormat` in the component
- `overageRate` is dollars per MB — format with `Intl.NumberFormat` in the component
- Use `ProgressBar` atom — already in registry; it handles colour thresholds internally
- Use `StatTile` molecule for the three sub-cells — already in registry
