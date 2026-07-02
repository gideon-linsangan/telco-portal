# Story: Plan Summary Card

**Story ID:** TN-011
**Component:** `PlanSummaryCard.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Plan Summary"
**Stub data:** `/stubs/account.json` via `GET /api/account`

---

## Story

As an authenticated TelcoNow customer
I want to see my current plan details at a glance
So that I know what I'm paying for and when it renews

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When PlanSummaryCard renders with data from GET /api/account
Then display the plan name (e.g. "Plus")
And display the monthly cost formatted as AUD (e.g. "$65/mo")
And display the data allowance (e.g. "50GB")
And display the renewal date formatted as a readable date (e.g. "15 Jul 2026")
And display the contract type (e.g. "No lock-in")
And display the account status as a Badge (status: "active" → Badge variant="success")
And display the account number from the session (e.g. "TN-000001") — not from the API response
And display the customer name from the session — not from the API response
```

```
Given the account status is "active"
Then display Badge variant="success" with label "Active"
```

### Loading state

```
Given the component is fetching from GET /api/account
Then display a skeleton loader matching the card layout
And do not show a spinner
```

### Error state

```
Given GET /api/account returns an error
Then display an error message: "Unable to load plan details."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the account status is not "active"
Then display the appropriate Badge variant for the status
⚠ Uncertain: which non-active statuses are possible — confirm with stub / API spec
```

---

## Out of scope

- Plan change or upgrade flow (separate story)
- Billing history (BillingCard story)

---

## Notes for developer

- `name` and `accountNumber` come from the session via `verifySession()` — do not use the API response fields for these
- `renewalDate` is an ISO date string — format with `Intl.DateTimeFormat` in the component
- `monthlyCost` is a number — format with `Intl.NumberFormat` in the component, not in the hook
- Use `CardHeader` molecule for the card title row — already in registry
- Use `KeyValueRow` molecule for plan detail rows — already in registry
