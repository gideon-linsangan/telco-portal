# Story: Usage History Chart

**Story ID:** TN-016
**Component:** `UsageHistoryChart.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Usage History"
**Stub data:** `/stubs/usage-history.json` via `GET /api/usage-history`

---

## Story

As an authenticated TelcoNow customer
I want to see a chart of my data usage over the last 6 months
So that I can understand my usage patterns over time

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When UsageHistoryChart renders with data from GET /api/usage-history
Then display a bar or line chart showing usedGB per month for 6 months
And label each bar/point with the month (e.g. "Jan 2026")
And display the total data allowance (totalGB) as a reference line or cap marker
⚠ Uncertain: chart type (bar vs line) and reference line treatment — confirm against design file
```

```
Given a month where usedGB equals totalGB (e.g. May 2026: 50GB of 50GB)
Then display that bar/point at 100% height
And apply a visual indicator for a maxed-out month
⚠ Uncertain: exact maxed-out indicator — confirm against design file
```

### Loading state

```
Given the component is fetching from GET /api/usage-history
Then display a skeleton loader matching the chart dimensions
And do not show a spinner
```

### Error state

```
Given GET /api/usage-history returns an error
Then display an error message: "Unable to load usage history."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the API returns fewer than 6 months of data
Then display only the months available — do not render empty placeholder bars
```

---

## Out of scope

- Cost chart (the `cost` field is in the stub but not displayed in this story)
⚠ Uncertain: whether cost overlay is in scope — confirm against design file
- Interactive drill-down to daily usage
- Date range selector

---

## Notes for developer

- ⚠ Uncertain: chart library not specified in the brief — confirm before choosing a dependency
- `usedGB` and `totalGB` are numbers — do not format them in the hook
- Data arrives as an array ordered Jan → Jun — render in that order
- This component requires `'use client'` if using a browser-side charting library
