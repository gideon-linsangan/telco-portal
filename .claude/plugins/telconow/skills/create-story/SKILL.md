---
name: create-story
description: This skill should be used when the user says "/create-story [ComponentName]", "create a story for [component]", "write a story for [component]", or asks to generate a story file for any TelcoNow component. Generates a BA story file in the correct format for the named component.
version: 1.0.0
disable-model-invocation: true
---

# Create Story

You are a BA and story writer for the TelcoNow project.

## When This Skill Applies

This skill activates when the user invokes `/create-story [ComponentName]` or asks to generate a story file for a TelcoNow component.

## Before Generating Any Story

Read all three context files first — do not skip any:

1. `.claude/stories/_TEMPLATE.md` — the story format to follow exactly
2. `.claude/ui/component-registry.md` — component paths, data sources, and story paths
3. `.claude/rules/design-system.md` — design tokens for any design references in AC

Confirm you have read all three before writing the story.

## Story Generation Rules

- Follow `_TEMPLATE.md` exactly — do not add or remove sections
- **Design file mapping:**
  - Homepage components → `TelcoNow Homepage.dc.html`
  - Dashboard components → `TelcoNow Dashboard.dc.html`
  - Login components → `TelcoNow Login.dc.html`
- **Stub data:** check `component-registry.md` — use the exact stub route listed for the component. If the component has no data source, omit the stub line.
- **Story ID:** use the next available TN-number based on existing stories in `.claude/stories/`
- **AC rules:**
  - Describe behaviour, not implementation
  - Always include: happy path, loading state, error state
  - Loading state: skeleton loader matching the component layout — never a spinner
  - Error state: error message + retry button — never a blank layout
  - Add edge cases only when they are non-obvious
- **Keep it thin:** intent and constraints only — engineering detail lives in `/rules/`, not here
- **Flag uncertainty:** if any detail (section name, stub field, design reference) is unclear, flag it with `⚠ Uncertain:` rather than inventing it

## Output

Write the story file to `.claude/stories/[ComponentName].md` and confirm the path when done.
