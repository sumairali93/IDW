# Indus Gateway — Agent Instructions

Shared instructions for AI coding agents (opencode, and any tool that reads
`AGENTS.md`). Claude Code additionally reads `CLAUDE.md`, which contains the same
rules plus more detail — **if you can read `CLAUDE.md`, treat it as the fuller
version of this file.**

## What this project is

Marketing site for a **vendor-neutral network connectivity aggregator** (Indus
Gateway). Audience: enterprise / ISP / government / cloud decision-makers. Tone:
confident, modern, futuristic — **never** flashy, consumer-y, or generic-SaaS.
Aesthetic: **storm-fibre / digital-highway** — premium dark-navy + electric-blue,
alternating dark ("navy") and light ("paper") bands for section rhythm.

## Stack

React 18 (**JSX, not TypeScript**) · Vite 6 · React Router 6 · Tailwind CSS v4
(tokens in the `@theme` block of `src/index.css`) · Framer Motion 12 ·
lucide-react · Fonts: Sora (headings), IBM Plex Sans (body). Build: `npm run build`.

## HARD RULES (non-negotiable)

1. **No hardcoded colors, shadows, or radii.** No hex, `rgba()`, `bg-[#...]`,
   `shadow-[...]`. Use token utilities (`bg-navy`, `text-electric`, `border-line`,
   `shadow-glow`, `rounded-md`…). Tints via token alpha (`bg-hover/10`). New token?
   Add to the `@theme` block in `src/index.css` first, then reference it.
2. **`electric` (#00aeef) is the ONLY strong accent.** `cyan` (#41dfff) = glow/
   decoration only. No new accent hues (no purple/green/stray-teal).
3. **Mobile-first, zero horizontal overflow** at 360/768/1024/1280/1440. `clamp()`
   type, responsive grids, `text-balance` headings.
4. **All motion respects `prefers-reduced-motion`.** JS: `useReducedMotion()`.
   CSS: list every decorative animation in the reduced-motion block of `src/index.css`.
5. **Accessible.** Semantic HTML, `aria-hidden` on decorative elements, 44px touch
   targets, WCAG AA. `text-grey`/`slate` = AA body; `-dim` variants = meta only.
   Don't remove the global `:focus-visible`.
6. **No unapproved content.** Named clients/partners, testimonials, exact SLA/
   coverage/regulatory claims (SECP/PTA/APNIC) need sign-off (`src/config.js`
   `APPROVAL_NOTES`). Flag placeholders in your summary.

## Layout invariant

All page content aligns to the header's left/right edges: every top-level
container uses `max-w-[90rem]` + `px-6` (via `<Section>` or directly). Don't drop
`px-6` — content overflows the header line on 14" laptops.

## Band-theme system

`<Section theme="dark|paper|aurora">` sets `BandThemeContext`
(`src/components/ui/theme.js`); theme-aware primitives (Button/Card/Eyebrow)
auto-adapt. Wrap content in the right `<Section>` instead of passing theme props
everywhere. `Section` also provides the `max-w-[90rem] px-6` container.

## Where things live

- `src/index.css` — **single source of truth** for tokens, decorative utilities,
  keyframes, reduced-motion block. Read before styling.
- `src/components/{ui,sections,layout}/` · `src/pages/` · `src/data/` (content —
  components read copy/icons from here, don't hardcode).
- `docs/design-reference/` — **homepage-spec.md** (approved section sequence,
  copy, reviewer scorecard) + `screenshots/` (client mockups; `00-…` is the
  master full-page reference). Consult before building/altering homepage sections.
- `docs/AI-WORKFLOW.md` — onboarding guide: the `/build`, `/review`, `/ui`
  commands and how this AI setup fits together. Point new contributors here.

## Visual-design principles (learned on this project)

For any lighting / depth / ambience work:
- **Light is subtraction, not addition.** Define brightness as a falloff from a
  source (`exp(-distance²)`) that everything multiplies; shimmer/detail *modulates
  within* the lit pool, never adds uniform edge-to-edge glow.
- **Match the light to where the emitter sits;** bias + make falloff asymmetric.
- **Don't draw a background shape to fake a medium** — any explicit shape has an
  edge that reads as a "separate div." Let the element field's own brightness
  dissolve into the page bg. Absence of a boundary IS the effect.
- **Perfect math reads as artificial** — layer several sine octaves for organic
  waves/motion.
- **Dense SVG perf:** one glow pass on the parent (`contain: paint`), bake static
  values into geometry at load; don't per-element drop-shadow thousands of nodes.

## Working style

Read the token file + 2–3 sibling components before writing — consistency beats
novelty. Prefer editing existing files; wire content into `src/data/`. Default to
no comments (only non-obvious *why*). `npm run build` to confirm compilation;
state plainly that visual correctness needs the user's eyes (no browser here).
When a fix isn't landing, question the assumption ("add another layer") — often
the win is *removing* a layer and letting geometry speak.

## `/ui` skill

The design-system component generator lives at `.claude/skills/ui/SKILL.md` (full
rules + examples). Follow it when generating new components.
