# Indus Gateway — Project Guide for Claude Code

Vendor-neutral network aggregator marketing site. Audience: enterprise / ISP /
government / cloud decision-makers. Tone: confident, modern, futuristic —
**never** flashy, consumer-y, or generic-SaaS.

Aesthetic: **storm-fibre / digital-highway** — premium dark-navy + electric-blue,
with alternating dark ("navy") and light ("paper") bands for section rhythm.

## Stack

- React 18 (**JSX, not TypeScript**) · Vite 6 · React Router DOM 6
- Tailwind CSS v4 via `@tailwindcss/vite` — tokens live in the `@theme` block of `src/index.css`
- Framer Motion 12 (`motion`, `useReducedMotion`, `AnimatePresence`)
- lucide-react icons · Fonts: **Sora** (`font-display`, headings), **IBM Plex Sans** (`font-body`, body)
- Build check: `npm run build` (no headless browser here — visual verification needs the user's eyes; say so).

## Where things live

- `src/index.css` — **single source of truth** for all tokens, decorative utilities, keyframes, reduced-motion block. Read it before styling anything.
- `src/components/ui/` — primitives (Button, Card, Section, Eyebrow, PageHeader, Reveal, StormWave, ConnectivityHub…)
- `src/components/sections/` — page sections (Hero, Stats, LeadForm, TrustStrip…)
- `src/components/layout/` — chrome (Navbar, Footer, Logo, PageShell, StickyCTA)
- `src/pages/` — routes (Home, About, Services, IPv4Leasing, Contact)
- `src/data/` — **content lives here, not in components.** Sections read copy/icons from data files.
- `docs/design-reference/` — **`homepage-spec.md`** (approved section sequence, exact copy, reviewer scorecard from the client feedback doc) + `screenshots/` (client mockups; `00-homepage-master-mockup.jpg` is the definitive full-page reference). **Consult before building or altering any homepage section.**
- `docs/AI-WORKFLOW.md` — onboarding guide for new contributors: the `/build`, `/review`, `/ui` commands and how this AI setup fits together. Point new users here.
- `docs/` — `ui-ux-redesign-proposal.md`, `futuristic-redesign-blueprint.md` (design rationale)
- `.claude/skills/ui/SKILL.md` — the `/ui` component-generator skill (full rules)
- `AGENTS.md` + `opencode.json` — mirror these rules for opencode/other agents; keep them in sync if this file's rules change.

## HARD RULES (non-negotiable)

1. **No hardcoded colors, shadows, or radii. Ever.** No hex, no `rgba(...)`, no `bg-[#...]`, no `shadow-[...]`. Use token utilities (`bg-navy`, `text-electric`, `border-line`, `shadow-glow`, `rounded-md`…). Need a tint? Token alpha: `bg-hover/10`, `border-electric/15`. Need a genuinely new token? Add it to the `@theme` block first, then reference it.
2. **`electric` (#00aeef) is the ONLY strong accent.** `cyan` (#41dfff) is for glow/decoration ONLY. No new accent hues — no purple, no green, no stray teal. (A minty-teal glow was caught & fixed once — stay strict.)
3. **Mobile-first, zero horizontal overflow** at 360 / 768 / 1024 / 1280 / 1440. Fluid type via `clamp()`, responsive grids, `text-balance` on headings.
4. **All motion respects `prefers-reduced-motion`.** JS: `useReducedMotion()` → collapse variants to no-op. CSS: every decorative animation MUST be listed in the `@media (prefers-reduced-motion: reduce)` block in `src/index.css`.
5. **Accessible.** Semantic HTML, `aria-hidden` on decorative elements, `aria-label` where needed, 44px touch targets, WCAG AA contrast. `text-grey` is AA on dark; `text-grey-dim` is for de-emphasized meta only. Don't remove the global `:focus-visible`.
6. **No unapproved content.** Named clients/partners, testimonials, exact SLA/coverage/regulatory claims (SECP/PTA/APNIC) need sign-off (`src/config.js` `APPROVAL_NOTES`). Flag any placeholder content in your summary.

## Design tokens (source: `src/index.css` — re-read before use)

**Surfaces (dark):** `navy` (page bg) · `navy-deep` (deepest) · `panel`/`panel2` (raised) · `surface` (alt band)
**Surfaces (paper/light band):** `paper` (bg) · `paper-raised` (cards) · `paper-sunk` (inputs) · `paper-line` (hairlines)
**Brand blues:** `blue` (#0057a8) · `blue-deep` · `electric` (#00aeef, primary) · `cyan` (#41dfff, glow only)
**Text (dark bands):** `ink` (headings/primary) · `grey` (body, AA) · `grey-dim` (meta)
**Text (paper bands):** `ink-invert` (headings = navy) · `slate` (body, AA) · `slate-dim` (meta, AA)
**Lines/hover:** `line`, `line-soft`, `hover` (base for `/10` tints)
**Gradients:** `--gradient-aurora` (blue-deep→electric→cyan, the ONLY gradient recipe) · `--gradient-fiber`
**Radius scale:** `sm`=10px · `md`=16px (buttons/chips/cards default here) · `lg`=22px · `xl`=30px (image frames) · `2xl`=40px (hero panels) · `pill`=9999px (buttons are pill)
**Shadows:** `shadow-glow` (electric-derived) · `shadow-card` · `shadow-menu` · `shadow-elevate` · `shadow-glass` (frosted) · `shadow-paper` (cards on light)
**Motion easing:** `--ease-out-soft` `cubic-bezier(0.2,0.7,0.2,1)` · `--ease-spring` (subtle hover overshoot) · durations `--dur-fast/base/slow`

## Band-theme system (important)

`<Section theme="dark|paper|aurora">` sets a `BandThemeContext` (`src/components/ui/theme.js`).
Theme-aware primitives (Button ghost/outline, Card, Eyebrow) auto-adapt to the band — **don't pass theme props at every call site**; wrap in the right `<Section>`. Any primitive can still override with its own explicit `theme`/`variant`. `Section` also provides the `max-w-[90rem] px-6` container.

## Layout invariant

**All page content aligns to the header's left/right edges.** Every top-level content container uses `max-w-[90rem]` + `px-6` (Section, Hero, PageHeader, StatRow, Navbar, Footer). Don't remove `px-6` — content will overflow the header line on 14" laptops. When adding a full-width section, keep the inner content in a `max-w-[90rem] px-6` wrapper.

## Decorative utilities (in `src/index.css` — reuse, don't reinvent)

`.fiber-glow` · `.header-glow` · `.net-grid-overlay` · `.fiber-flow` · `.marquee-track` · `.fiber-link-base`/`.fiber-link-flow` (hub links) · `.fiber-node` (link-end light dot) · `.hub-ring` (pulse) · `.storm-*` (backdrop mesh) · `.storm-wave-dot`/`.storm-wave-svg` (bottom wave) · `.aurora-seam` (dark↔light band seam). All token-driven and reduced-motion-gated.

## Signature hero visuals

- **`ConnectivityHub.jsx`** — the spider/network diagram: providers (left rail) + clients (right rail) as legs, the glowing IGW hexagon as body, fibre links between. Geometry is **measured in real pixels** via `useLayoutEffect` + `ResizeObserver` (NOT a stretched `%`/`preserveAspectRatio="none"` grid — that made attach points drift off the hex). Legs attach exactly on the hex outline via `hexFan`, with a `.fiber-node` light at both ends.
- **`StormWave.jsx`** — static isometric "deep-ocean" dot-matrix wave at the hero bottom. See lighting principles below.

## Visual-design principles (learned the hard way this project)

These are *why* the hero visuals look right — apply them to any new lighting/depth/ambience work:

- **Model light as subtraction, not addition.** Don't add glow layers on top of everything. Define brightness as a **falloff from a source** (`exp(-distance²)`) that everything else *multiplies*. Near the source glows; far sinks to dark — for free. Shimmer/crest detail should **modulate within** the lit pool (multiplicative), never add its own uniform edge-to-edge glow.
- **Match the light source to where the emitter actually sits.** The hexagon hub is in the hero's *right* column, so the wave's light peak is biased right (`LIGHT_BIAS`), and falloff is **asymmetric** (tighter on the side that should go dark).
- **Don't draw a background shape to fake a medium — any explicit shape has an edge, and an edge reads as a "separate div."** To make an effect feel *part of* the scene, remove the background fill and let the element field's own brightness **dissolve into the page bg** at every boundary. The absence of a boundary is the effect.
- **Perfect math reads as artificial.** A single pure sine looks mechanical. Layer **several octaves** (different wavelength, amplitude, phase, drift) and normalize — irregularity is what reads as natural (ocean swell, organic motion).
- **Perf on dense SVG:** one glow pass on the parent (`.storm-wave-svg` filter + `contain: paint`), never a per-element `drop-shadow` over thousands of nodes. Bake static values (opacity/size/color) into geometry at module load rather than animating them.

## Working style in this repo

- Read the token file + 2–3 sibling components before writing — consistency beats novelty.
- Prefer editing existing files; wire content into `src/data/` for content-driven components.
- Default to **no comments**; only explain a non-obvious *why*.
- `npm run build` to confirm it compiles + new token utilities emit. State plainly that visual correctness needs the user's eyes (no browser here).
- When a fix isn't landing, question the assumption ("add another layer") rather than repeating the approach — often the win is *removing* a layer and letting geometry speak.
