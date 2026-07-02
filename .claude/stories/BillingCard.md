# Story: Billing Card

**Story ID:** TN-013
**Component:** `BillingCard.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Billing"
**Stub data:** `/stubs/billing.json` via `GET /api/billing`

---

## Story

As an authenticated TelcoNow customer
I want to see my billing status and upcoming payment
So that I know when I'll be charged and how

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When BillingCard renders with data from GET /api/billing
Then display the next payment amount formatted as AUD (e.g. "$65.00")
And display the next payment date formatted as a readable date (e.g. "15 Jul 2026")
And display the last payment amount and date
And display the last payment status as a Badge (status: "paid" → Badge variant="success")
And display the payment method type and masked number (e.g. "Visa ···· 4242")
```

```
Given the last payment status is "paid"
Then display Badge variant="success"
```

### Loading state

```
Given the component is fetching from GET /api/billing
Then display a skeleton loader matching the card's key-value row layout
And do not show a spinner
```

### Error state

```
Given GET /api/billing returns an error
Then display an error message: "Unable to load billing details."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the last payment status is not "paid"
Then display the appropriate Badge variant for the status
⚠ Uncertain: which non-paid statuses are possible — confirm with API spec
```

---

## Out of scope

- Payment method update flow
- Invoice download
- Full billing history

---

## Notes for developer

- `nextPayment.date` and `lastPayment.date` are ISO date strings — format with `Intl.DateTimeFormat` in the component
- `nextPayment.amount` and `lastPayment.amount` are numbers — format with `Intl.NumberFormat` as AUD currency
- Payment method display: concatenate `type` (capitalised) + "···· " + `last4`
- Use `CardHeader` molecule for card title row — already in registry
- Use `KeyValueRow` molecule for each detail row — already in registry
