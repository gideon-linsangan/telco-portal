# Story: Add-Ons Card

**Story ID:** TN-017
**Component:** `AddOnsCard.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Add-ons & Extras"
**Stub data:** `/stubs/addons.json` via `GET /api/addons`

---

## Story

As an authenticated TelcoNow customer
I want to see and toggle my active add-ons
So that I can manage optional extras on my plan

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When AddOnsCard renders with data from GET /api/addons
Then display each add-on with its name, description, and monthly price formatted as AUD
And display a Toggle for each add-on showing its current active state
And display a Badge indicating whether the add-on is active or inactive
⚠ Uncertain: exact active/inactive badge variant — confirm against design file
```

```
Given an add-on has active: true
Then render the Toggle in the on (checked) state
```

```
Given an add-on has active: false
Then render the Toggle in the off (unchecked) state
```

```
Given a user clicks a Toggle
When the toggle state changes
Then update the local state only — do not make any API call
And do not persist the change on page refresh
```

### Loading state

```
Given the component is fetching from GET /api/addons
Then display a skeleton loader with rows matching the add-on item layout
And do not show a spinner
```

### Error state

```
Given GET /api/addons returns an error
Then display an error message: "Unable to load add-ons."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the add-ons list is empty
Then display a message indicating no add-ons are available
⚠ Uncertain: exact empty-state copy — confirm against design file
```

---

## Out of scope

- Persisting toggle changes to the server (confirmed UI-only)
- Purchasing or removing add-ons via an API call
- Filtering add-ons by category

---

## Notes for developer

- Toggle state is managed with `useState` initialised from the API response
- Refreshing the page resets all toggles to the stub values — this is correct and expected
- Component requires `'use client'` because Toggle uses `useState`
- `price` is a number — format with `Intl.NumberFormat` as AUD in the component
- Use `Toggle` atom — already in registry
- Use `CardHeader` molecule for the card title row — already in registry
