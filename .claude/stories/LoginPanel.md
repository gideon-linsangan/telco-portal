# Story: Login Panel

**Story ID:** TN-008
**Component:** `LoginPanel.tsx`
**Design reference:** `TelcoNow Login.dc.html` → "Login form"

---

## Story

As a TelcoNow customer
I want to log in with my email and password
So that I can access my account dashboard

---

## Acceptance criteria

### Happy path

```
Given a visitor navigates to /login
When the page loads
Then display an email field and a password field
And display a "Log in" submit button
And display a "Forgot password?" link and a "Get started" link
⚠ Uncertain: exact CTA labels — confirm against design file
```

```
Given the user enters valid credentials (user@telconow.com.au / password123)
When the form is submitted
Then call the login Server Action via useActionState
And redirect to /dashboard on success
```

```
Given the user is already authenticated
When they navigate to /login
Then redirect to /dashboard without showing the form
```

### Loading state

```
Given the form has been submitted and the Server Action is pending
Then disable the submit button
And show a pending visual state on the button
And do not show a spinner overlay
```

### Error state

```
Given the user submits incorrect credentials
When the Server Action returns an error
Then display the message "Invalid email or password" inline beneath the form
And keep all form fields populated
And do not navigate away
```

### Edge cases

```
Given the user submits with an empty email or password
Then prevent submission and show browser-native or inline validation
⚠ Uncertain: whether custom inline validation is required — confirm before building
```

---

## Out of scope

- "Forgot password?" and "Get started" links — destinations not yet decided (see pages brief open question)
- OAuth or social login providers
- "Remember me" toggle

---

## Notes for developer

- Component must be `'use client'` — uses `useActionState(login, undefined)` from React
- `login` Server Action lives at `src/app/actions/auth.ts`
- On success: Server Action handles redirect to `/dashboard`
- On failure: action returns `{ error: string }` — render inline, not as a toast
- Password field uses `Input` atom with `suffix` prop for show/hide toggle
- Use `FormField` molecule for each field — already in registry
