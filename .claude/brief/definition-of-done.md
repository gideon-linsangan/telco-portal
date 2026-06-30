# Definition of Done

A piece of work is not done until all of the following are true:

- Matches the design files (visually and behaviorally)
- TypeScript compiles with no errors (`tsc --noEmit` passes), no `any` used
- Lighthouse score 90+ on mobile
- WCAG 2.1 AA checked — keyboard nav, alt text, label associations, contrast
- Responsive across mobile → tablet → desktop
- Auth flow (where relevant) tested end to end: login, session, middleware redirect, logout
- No `.env.local` or secrets committed
- No console errors or warnings in the browser
- Loading and error states implemented where applicable (`loading.tsx`, `error.tsx`)
- Code reviewed (PR approved) before merge
- Any assumption made during the work is flagged in the PR description or in `/brief/risks.md`
