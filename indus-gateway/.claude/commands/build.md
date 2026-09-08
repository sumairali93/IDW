---
description: Implement a feature or fix per your prompt — design-system compliant, verified with a build
argument-hint: <what to build or fix, and where>
---

# Implement / fix — Indus Gateway

Implement the request below end-to-end, obeying every project rule. This is the
counterpart to `/review`: `/review` finds issues, `/build` makes changes.

## Request
$ARGUMENTS

## Process
1. **Understand & locate.** Read `CLAUDE.md` (rules, tokens, layout invariant, band-theme, visual principles) and `src/index.css` (token source of truth). Find the target file(s) and read 2–3 sibling components to match conventions. For homepage work, consult `docs/design-reference/homepage-spec.md` + the `screenshots/` mockups.
2. **Plan briefly.** If the task is 3+ steps, track it with tasks. If genuinely ambiguous, ask ONE round of clarifying questions; otherwise proceed with sensible defaults and state assumptions.
3. **Implement**, honoring the HARD RULES:
   - No hardcoded colors/shadows/radii — token utilities only; new token → add to `@theme` in `src/index.css` first.
   - `electric` is the only strong accent; `cyan` = glow only.
   - Mobile-first, zero overflow at 360/768/1024/1280/1440; `clamp()` type; `text-balance` headings.
   - Motion gated by `useReducedMotion()` (JS) + reduced-motion block (CSS).
   - Semantic + accessible (aria, 44px targets, AA contrast, keep `:focus-visible`).
   - Content-driven components read from `src/data/`; don't hardcode copy.
   - Don't fabricate approval-gated claims (`src/config.js` APPROVAL_NOTES) — keep placeholders clearly placeholder.
   - Prefer editing existing files; no unrequested refactors, no comments unless a non-obvious *why*.
   - **Do not touch the Hero section's right-side (`ConnectivityHub` / `StormWave`) unless the request explicitly targets it** — it's a locked, hand-tuned design.
4. **Verify.** Run `npm run build`; fix until it compiles and new token utilities emit. State plainly that visual correctness needs the user's eyes (no browser here).
5. **Summarize.** What changed (file:line), why, any assumptions, any placeholder/approval-gated content introduced, and what the user should eyeball. Do NOT commit unless asked.
