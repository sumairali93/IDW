---
description: Audit a page/section/component against the design system, spec, and a11y — report findings, don't edit
argument-hint: <page|section|component or path> [what to focus on]
allowed-tools: Read, Grep, Glob, Bash(npm run build:*), Bash(npm run lint:*), Bash(git status:*), Bash(git diff:*)
---

# Design & code review — Indus Gateway

Review the target below **read-only**. Do NOT edit files. Produce a findings
report the user can act on. If the user asks to fix afterwards, that's `/build`.

## Target
$ARGUMENTS

(If no target is given, review the current git working-tree changes:
`git status` + `git diff`, and infer which sections/components changed.)

## Load context first
1. Read `CLAUDE.md` (or `AGENTS.md`) — the hard rules, tokens, layout invariant, band-theme, visual principles.
2. Read `src/index.css` — the token source of truth.
3. If the target is a homepage section, read `docs/design-reference/homepage-spec.md` and the matching `docs/design-reference/screenshots/` (the `00-…master` mockup is definitive).
4. Read the target file(s) + 2–3 sibling components for convention baseline.

## Check every item and cite `file:line`
- **Token compliance** — NO hardcoded hex / `rgba()` / `bg-[#...]` / `shadow-[...]` / arbitrary radii. Flag each. (Note: `shadow-[0_0_Npx_var(--color-…)]` glow halos are the one tolerated arbitrary-shadow pattern — call out but don't treat as blocking.)
- **Accent policy** — `electric` is the only strong accent; `cyan` glow/decoration only. Flag any other hue.
- **Spec fidelity** (homepage) — section present, correct sequence, approved copy verbatim, CTAs correct. Note drift from `homepage-spec.md`.
- **Responsive** — mobile-first, no horizontal overflow at 360/768/1024/1280/1440; `clamp()` type; `text-balance` on headings.
- **Layout invariant** — top-level content in `max-w-[90rem] px-6` (via `<Section>`); aligns to header edges.
- **Motion** — `useReducedMotion()` in JS; every decorative CSS animation listed in the reduced-motion block of `src/index.css`.
- **Accessibility** — semantic HTML, `aria-hidden` on decorative nodes, `aria-label` where needed, 44px touch targets, AA contrast (`text-grey`/`slate` = AA body; `-dim` = meta only), `:focus-visible` intact.
- **Content approval** — any named client/partner, testimonial, SLA/coverage/regulatory (SECP/PTA/APNIC) claim must be hedged per `src/config.js` APPROVAL_NOTES. Flag unhedged claims.
- **Consistency** — matches sibling-component patterns; content lives in `src/data/` not hardcoded.
- **Correctness** — run `npm run build`; report any failure.

## Output format
Group findings by severity. For each: `severity · file:line · what's wrong · why it violates a rule · suggested fix`.
- **Blocker** — breaks a HARD RULE, build, or a11y.
- **Should-fix** — spec/copy drift, responsive risk, inconsistency.
- **Nit** — polish.
End with a one-line verdict and, if clean, say so explicitly. Note anything needing the user's eyes (no browser here).
