# Story: Blog Section

**Story ID:** TN-007
**Component:** `BlogSection.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Blog Cards"
**Stub data:** Contentful: BlogPost (no stub API — data source is Contentful)

---

## Story

As a visitor on the TelcoNow homepage
I want to see recent blog articles
So that I can discover content and engage further with TelcoNow

---

## Acceptance criteria

### Happy path

```
Given blog posts are available from Contentful
When the blog section renders
Then display the eyebrow label "Blog"
And display the section heading "From the TelcoNow blog"
And display a "View all articles →" link aligned to the right of the heading row
And display three blog cards in a row
And each card displays: a coloured top accent bar, a category badge, title, excerpt (2-line clamp), author name, date, and "Read more →" link
```

```
Given a visitor clicks "Read more →" on a card
When the link is clicked
Then navigate to that blog post's detail page
⚠ Uncertain: blog post route pattern — confirm before building
```

```
Given a visitor clicks "View all articles →"
When the link is clicked
Then navigate to the blog listing page
⚠ Uncertain: blog listing route — confirm before building
```

### Loading state

```
Given the component is fetching blog posts from Contentful
Then display three skeleton cards matching the blog card layout
And do not show a spinner
```

### Error state

```
Given Contentful returns an error or no posts are available
Then display an error message: "Unable to load articles right now."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given Contentful returns fewer than three posts
Then display only the posts available — do not render empty card placeholders
```

```
Given a blog post has no category
Then omit the category badge — do not render an empty badge
⚠ Uncertain: whether category is a required Contentful field — confirm with content model
```

---

## Out of scope

- Pagination or infinite scroll
- Blog post filtering by category on the homepage
- Full blog listing page (separate story required)

---

## Notes for developer

- Data source is Contentful, not a stub API — see `.claude/brief/contentful.md` for fetch patterns
- `SectionHeader` molecule is already in the registry — import it, do not rebuild
- Category badge uses `Badge` atom with `variant="purple"`
- "Read more →" uses `Link` atom with `variant="arrow"`
