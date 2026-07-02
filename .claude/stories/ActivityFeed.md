# Story: Activity Feed

**Story ID:** TN-014
**Component:** `ActivityFeed.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Recent Activity"
**Stub data:** `/stubs/activity.json` via `GET /api/activity`

---

## Story

As an authenticated TelcoNow customer
I want to see a list of my recent account activity
So that I can track payments, plan changes, and add-on purchases

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When ActivityFeed renders with data from GET /api/activity
Then display each activity item with its description and timestamp
And display amounts as absolute dollar values (e.g. "$65.00") — never negative
And display a Badge for each item's status (e.g. "completed" → Badge variant="success", "pending" → Badge variant="purple")
And display activity items in reverse-chronological order (most recent first)
⚠ Uncertain: whether the API returns items pre-sorted — confirm before building
```

```
Given an activity item has a null amount (e.g. plan_change type)
Then omit the amount — do not render "$0.00" or a blank amount column
```

```
Given an activity item has status "completed"
Then display Badge variant="success"
```

```
Given an activity item has status "pending"
Then display Badge variant="purple"
```

### Loading state

```
Given the component is fetching from GET /api/activity
Then display a skeleton loader with rows matching the activity item layout
And do not show a spinner
```

### Error state

```
Given GET /api/activity returns an error
Then display an error message: "Unable to load recent activity."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the activity list is empty
Then display a message indicating no recent activity
⚠ Uncertain: exact empty-state copy — confirm against design file
```

---

## Out of scope

- Pagination or load-more for older activity
- Filtering by activity type

---

## Notes for developer

- `amount` values are negative in the stub (outgoing payments) — display as absolute value with `Math.abs()`, formatted with `Intl.NumberFormat` as AUD
- `timestamp` is an ISO datetime string — format with `Intl.DateTimeFormat` in the component
- `amount: null` is valid — guard before rendering
- Derive display badge variant from `status` in the component, not in the hook
