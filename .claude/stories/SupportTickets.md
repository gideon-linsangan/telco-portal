# Story: Support Tickets

**Story ID:** TN-015
**Component:** `SupportTickets.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Support Tickets"
**Stub data:** `/stubs/tickets.json` via `GET /api/tickets`

---

## Story

As an authenticated TelcoNow customer
I want to see my open and resolved support tickets
So that I can track the status of my support requests

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When SupportTickets renders with data from GET /api/tickets
Then display each ticket with its ID, subject, and status Badge
And display a priority Badge for each ticket
And display the date the ticket was last updated, formatted as a readable date
And display open tickets before resolved tickets
⚠ Uncertain: whether the API returns tickets pre-sorted — confirm before building
```

```
Given a ticket has status "open"
Then display Badge variant="warning" for status
```

```
Given a ticket has status "resolved"
Then display Badge variant="success" for status
```

```
Given a ticket has priority "medium"
Then display Badge variant="neutral" for priority
⚠ Uncertain: full priority → badge variant mapping — confirm against design file
```

### Loading state

```
Given the component is fetching from GET /api/tickets
Then display a skeleton loader with rows matching the ticket item layout
And do not show a spinner
```

### Error state

```
Given GET /api/tickets returns an error
Then display an error message: "Unable to load support tickets."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given there are no tickets
Then display a message indicating no support tickets
⚠ Uncertain: exact empty-state copy — confirm against design file
```

---

## Out of scope

- Creating a new support ticket from this card
- Viewing ticket detail or conversation thread

---

## Notes for developer

- `createdAt` and `updatedAt` are ISO datetime strings — format with `Intl.DateTimeFormat` in the component
- Badge variant mapping for priority and status should be derived in the component, not the hook
- Use `CardHeader` molecule for the card title row — already in registry
