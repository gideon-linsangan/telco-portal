# Story: Site Footer

**Story ID:** TN-002
**Component:** `SiteFooter.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Footer"

---

## Story

As a visitor to the TelcoNow website
I want to see a footer with navigation links and legal information
So that I can find secondary pages and understand who operates the site

---

## Acceptance criteria

### Happy path

```
Given a visitor is on any public page
When the page loads
Then display the TelcoNow wordmark in the footer
And display the tagline "Fast. Simple. Yours."
And display four columns of links:
  - Column 1 (Brand): tagline and brand description — no links
  - Column 2 (Plans): Starter, Plus, Pro, Business
  - Column 3 (Support): Help centre, Contact us, Coverage map, FAQs
  - Column 4 (Legal): Privacy policy, Terms, Accessibility
And the footer background is dark (neutral.ink: #0F0F1A)
And column headings use the label text style (uppercase, text-neutral-slate)
And links use the muted Link variant (text-neutral-slate, hover: text-white)
```

```
Given a visitor hovers over a footer link
When hovering
Then the link colour transitions to white
```

```
Given the page bottom bar renders
Then display "© 2026 TelcoNow Pty Ltd" on the left
And display "All prices include GST" on the right
And a top border separates the bottom bar from the link columns
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the footer renders immediately with the page
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given a footer link is clicked
Then navigate to the correct destination page
⚠ Uncertain: destination routes for each footer link — confirm before building
```

---

## Out of scope

- Social media icons or links
- Newsletter signup
- Authenticated footer variations

---

## Notes for developer

- No data fetching — static render only
- Use `Link` atom with `variant="muted"` for all footer links
- Column headings use `Text` atom with `variant="label"` and `color="slate"`
- Wordmark matches the SiteHeader wordmark — "Telco" white, "Now" in `text-brand-light`
