# Story: Plans Section

**Story ID:** TN-005
**Component:** `PlansSection.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Plans"
**Stub data:** Contentful: Plan (no stub API — data source is Contentful)

---

## Story

As a visitor on the TelcoNow homepage
I want to see the available plans with pricing and features
So that I can compare options and choose one that suits me

---

## Acceptance criteria

### Happy path

```
Given plans are available from Contentful
When the plans section renders
Then display the eyebrow label "Pricing"
And display the section heading "Simple, honest pricing."
And display three plan cards in a row: Starter, Plus, Pro
And each card displays: plan name, price per month, short description, feature list with tick icons, and a CTA button
```

```
Given the "Plus" plan is marked as featured in Contentful
When the section renders
Then display the "Plus" card with a "Most popular" badge above it
And the featured card has a brand-signature border and is elevated above the other two cards
And the featured card CTA uses the primary button variant
And non-featured card CTAs use the ghost-purple button variant
```

```
Given a visitor clicks a plan CTA button (e.g. "Get Starter")
When clicked
Then navigate to the sign-up or plan detail page for that plan
⚠ Uncertain: exact destination route per plan — confirm before building
```

### Loading state

```
Given the component is fetching plans from Contentful
Then display three skeleton cards matching the plan card layout
And do not show a spinner
```

### Error state

```
Given Contentful returns an error or no plans are available
Then display an error message: "Unable to load plans right now."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given Contentful returns fewer than three plans
Then render only the available plan cards — do not fill empty slots
```

```
Given no plan is marked as featured
Then render all cards at the same height with the ghost-purple CTA variant
⚠ Uncertain: whether featured is a required Contentful field — confirm with content model
```

---

## Out of scope

- Plan comparison table
- Monthly/annual billing toggle
- Business plan variant (separate page)

---

## Notes for developer

- Data source is Contentful, not a stub API — see `.claude/brief/contentful.md` for fetch patterns
- `SectionHeader` molecule is already in the registry — import it, do not rebuild
- Tick icons are inline SVGs — extract to `/public/icons/check.svg`
- "Most popular" badge uses `Badge` atom with `variant="purple"`
