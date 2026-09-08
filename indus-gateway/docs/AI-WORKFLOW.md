# Working with AI on this project — a guide for new contributors

This repo is set up so AI coding agents (**Claude Code** and **opencode**) already
know the Indus Gateway design system, brand rules, and approved homepage content.
You don't have to re-explain any of it — the setup loads automatically. This guide
explains what's wired up and how to use it to build components, ship features, and
review changes.

---

## TL;DR — the two commands you'll use most

| Command | Use it to… | Edits files? |
|---------|-----------|--------------|
| `/build <what you want>` | Implement a feature or fix a bug, fully design-system compliant | ✅ yes |
| `/review <target>` | Audit a page/section/component against the rules, spec & a11y | ❌ no (reports only) |

Examples:
```
/build add an FAQ accordion section to the Services page
/build the footer social icons are misaligned on mobile — fix them
/review home page
/review src/components/sections/LeadForm.jsx accessibility
```

Type `/build` finds and changes code; `/review` only tells you what's wrong so
you can decide. A common loop: `/build …` → `/review` the result → `/build` the fixes.

---

## What's already loaded (so you don't repeat yourself)

When an agent starts, it automatically reads these. You never need to paste them.

| File | What it gives the agent |
|------|------------------------|
| `CLAUDE.md` (root) | Claude Code's always-on brief: hard rules, full token list, layout invariant, band-theme system, file map, visual-design principles. |
| `AGENTS.md` (root) | Same rules for **opencode** and other agents. |
| `opencode.json` | Tells opencode to load `AGENTS.md`, `CLAUDE.md`, the spec, and the `/ui` skill. |
| `src/index.css` | The single source of truth for every color, shadow, radius, and animation token. |
| `docs/design-reference/homepage-spec.md` | The approved homepage section sequence, exact copy, and the client's feedback scorecard. |
| `docs/design-reference/screenshots/` | The client's mockups. `00-homepage-master-mockup.jpg` is the definitive full-page reference. |
| `.claude/skills/ui/SKILL.md` | The `/ui` component-generator skill (deep design rules + examples). |

**If you change a rule, change it in both `CLAUDE.md` and `AGENTS.md`** so both tools stay in sync.

---

## The `/ui` skill — for designing brand-new visuals

`/ui <description>` is a specialized generator for creating new components/pages
that match the storm-fibre / digital-highway aesthetic. It reads the tokens and
sibling components first, then produces a token-compliant React component.

```
/ui build a pricing comparison table for the IPv4 leasing page
/ui add a coverage-map section to the homepage with animated fibre routes
/ui design an FAQ accordion, token-driven and reduced-motion-safe
```

Rule of thumb:
- **`/ui`** — a genuinely new visual/component from a design description.
- **`/build`** — implement or fix a feature (may create or edit anything).
- **`/review`** — check existing work.

---

## The rules every agent follows (and you should too)

These are non-negotiable and enforced by the setup. Knowing them helps you write
better prompts and spot when something's off.

1. **No hardcoded colors, shadows, or radii.** Everything uses design tokens from
   `src/index.css` (`bg-navy`, `text-electric`, `rounded-md`, `shadow-glow`…).
   Tints use token alpha (`bg-hover/10`). New token? It gets added to the `@theme`
   block first, then used.
2. **`electric` (#00aeef) is the only strong accent.** `cyan` is glow/decoration
   only. No other accent hues.
3. **Mobile-first, no horizontal overflow** at 360 / 768 / 1024 / 1280 / 1440.
4. **All motion respects `prefers-reduced-motion`.**
5. **Accessible** — semantic HTML, ARIA on decorative/interactive elements, 44px
   touch targets, WCAG AA contrast.
6. **No unapproved content.** Named clients/partners, testimonials, and regulatory
   claims (SECP / PTA / APNIC) are approval-gated — see `src/config.js`
   `APPROVAL_NOTES`. Placeholders stay clearly labeled.
7. **Layout invariant** — all page content sits in a `max-w-[90rem] px-6` container
   (usually via `<Section>`) so it aligns with the header edges.

---

## How the code is organized

```
src/
  index.css              ← design tokens (READ THIS FIRST for any styling)
  config.js              ← approval gates, site constants
  components/
    ui/                  ← primitives (Button, Card, Section, Eyebrow, …)
    sections/            ← page sections (Hero, ProblemStatement, LeadForm, …)
    layout/              ← chrome (Navbar, Footer, Logo, PageShell)
  pages/                 ← routes (Home, About, Services, IPv4Leasing, Contact)
  data/                  ← ALL copy & content (components read from here)
docs/
  design-reference/      ← homepage spec + client mockup screenshots
  AI-WORKFLOW.md         ← this file
.claude/
  skills/ui/SKILL.md     ← the /ui skill
  commands/              ← /build and /review
```

Key idea: **content lives in `src/data/`, not inside components.** A section
component maps over a data file. To change wording, edit the data file.

The site alternates **dark ("navy") and light ("paper") bands** for rhythm. Wrap a
section in `<Section theme="dark|paper|aurora">` and theme-aware primitives
(Button, Card, Eyebrow) adapt automatically — you don't pass theme to each one.

---

## Tech stack (quick reference)

- **React 18 (JSX — not TypeScript)** · Vite 6 · React Router 6
- **Tailwind CSS v4** — tokens in the `@theme` block of `src/index.css`
- **Framer Motion 12** (`useReducedMotion` for accessible animation)
- **lucide-react** icons · **Sora** (headings) + **IBM Plex Sans** (body)

Run locally:
```
npm install
npm run dev      # local dev server
npm run build    # production build — agents use this to verify changes compile
```

---

## Writing good prompts

- **Be specific about location:** "add X to the Services page" beats "add X".
- **Say build vs. fix vs. review** — or just use the matching command.
- **Trust the setup:** you don't need to specify colors, fonts, or spacing — the
  agent uses the tokens. Do specify *intent* ("make it feel more premium", "match
  the mockup's spacing").
- **For homepage work**, the agent already has the approved copy and mockups; you
  can say "match the spec" and it will.
- **The agent can't see the browser.** It verifies the build compiles, but visual
  correctness needs your eyes — it will tell you what to check. Reload and confirm.

---

## Things the agents intentionally won't do

- Invent brand colors or use non-token values.
- Fabricate client names, partner logos, testimonials, or regulatory claims.
- Touch the Hero's right-side visual (`ConnectivityHub` / `StormWave`) unless you
  explicitly ask — it's hand-tuned and locked.
- Commit or push changes unless you ask them to.

---

## Getting help

- Design rationale: `docs/ui-ux-redesign-proposal.md`, `docs/futuristic-redesign-blueprint.md`
- Approved homepage content: `docs/design-reference/homepage-spec.md`
- All tokens: the `@theme` block in `src/index.css`
- What needs sign-off: `src/config.js` `APPROVAL_NOTES`
