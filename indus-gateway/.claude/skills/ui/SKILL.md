---
name: ui
description: Generate UI components and pages for Indus Gateway following the storm-fibre / digital-highway design system, its Tailwind v4 token set, and its React + Framer Motion stack. Invoke when the user types /ui <description>.
---

# UI Component Generator — Indus Gateway

Generate UI components and pages that match Indus Gateway's **storm-fibre / digital-highway**
enterprise design system. This is a premium dark-navy + electric-blue aesthetic for a
vendor-neutral network aggregator selling to enterprises, ISPs, government, and cloud businesses.
The audience is executive/technical decision-makers — the tone is confident, modern, futuristic,
never flashy or consumer-y.

When the user invokes `/ui <description>`, follow these steps.

## Steps

1. **Parse the request** — Extract the component/page they want, its purpose, and where it should live.
2. **Gather context** — This is mandatory, not optional:
   - Read `src/index.css` — it is the single source of truth for design tokens. Never invent a color, shadow, or radius; use the tokens defined there.
   - Read 2–3 existing components in the same family for patterns:
     - Primitives: `src/components/ui/` (Button, Card, Section, Eyebrow, Reveal, PageHeader)
     - Sections: `src/components/sections/` (Hero, Stats, Testimonials, TrustStrip, LeadForm)
     - Layout: `src/components/layout/` (Navbar, Footer, StickyCTA, PageShell)
     - Pages: `src/pages/` (Home, About, Services, IPv4Leasing, Contact)
   - Read `docs/ui-ux-redesign-proposal.md` for the design rationale and section rhythm.
   - Check `src/data/` for content data — sections read from data files, they don't hardcode copy.
3. **Research if needed** — Use WebFetch for modern network/fibre/enterprise-infra UI inspiration only if the request calls for a genuinely new visual pattern. Do not chase generic SaaS references.
4. **Generate the component** — Produce a React (JSX, not TSX) component that obeys the rules below.
5. **Create the file** — Write to the correct location (`ui/` for primitives, `sections/` for page sections, `layout/` for chrome, `pages/` for routes). Wire up new data in `src/data/` if the component is content-driven.
6. **Verify** — Run `npm run build` to confirm it compiles and that any new token utilities are emitted. For layout/responsive work, verify in a real viewport if possible. Then summarize the design decisions.

## Hard Rules (non-negotiable)

- **NO hardcoded colors, shadows, or radii.** Ever. No hex, no `rgba(...)`, no arbitrary `bg-[#...]` / `shadow-[...]`. Use the token utilities (`bg-navy`, `text-electric`, `border-line`, `shadow-glow`, `shadow-card`, etc.). If you need a tint, use token-based alpha (`bg-hover/10`, `border-electric/15`). If a genuinely new token is required, add it to the `@theme` block in `src/index.css` first, then reference it — never inline it.
- **Electric (`#00aeef`) is the ONLY strong accent.** `cyan` is for glow/decoration accents only. Do not introduce new accent hues (no purple, no green, no random gradients). This is a strict brand constraint — a stray minty-teal glow was already caught and fixed once.
- **Fully responsive, mobile-first.** Zero horizontal overflow at 360 / 768 / 1024 / 1280 / 1440. Use `clamp()` for fluid type, responsive grid columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), and `text-balance` on headings. Test that headlines wrap cleanly on narrow screens.
- **All motion respects `prefers-reduced-motion`.** In JS use Framer Motion's `useReducedMotion()` and collapse variants to no-op. Decorative CSS animations must be listed in the `@media (prefers-reduced-motion: reduce)` block in `src/index.css`.
- **Accessible.** Semantic HTML, `aria-hidden` on decorative elements, `aria-label` where needed, visible `:focus-visible` (already themed globally — don't remove it), 44px touch targets on interactive controls, WCAG AA contrast on dark panels (`text-grey` is AA; `text-grey-dim` is for de-emphasized meta only).
- **No unapproved content.** Named client/partner logos, testimonials, exact SLA/coverage/regulatory claims (SECP/PTA/APNIC) require sign-off — see `src/config.js` `APPROVAL_NOTES`. New placeholder content must be clearly placeholder and flagged in the summary. Forms are front-end only (no backend).

## Design Anti-Patterns to Avoid

- Generic SaaS look (purple gradients, Inter font, floaty rounded blobs).
- Any hardcoded color / shadow / radius — the #1 rule.
- New accent colors beyond electric-blue.
- Flashy/aggressive motion (parallax jank, bouncing, rapid flashing). Motion is subtle and purposeful.
- Consumer-grade playfulness — the audience is enterprise/executive.
- Hardcoding copy inside components when it belongs in `src/data/`.

## Tech Stack

- **Framework**: React 18 (JSX — this project does NOT use TypeScript)
- **Build**: Vite 6
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`; tokens live in the `@theme` block of `src/index.css`
- **Animation**: Framer Motion 12 (`motion`, `useReducedMotion`, `AnimatePresence`)
- **Routing**: React Router DOM 6 (`Link`, `Routes`, `useLocation`)
- **Icons**: lucide-react
- **Fonts**: Sora (`font-display`, headings), IBM Plex Sans (`font-body`, body)

## Design Tokens (source: `src/index.css` — always re-read before use)

- **Surfaces**: `navy` (page bg), `navy-deep` (deepest), `panel` / `panel2` (raised), `surface` (alt band)
- **Brand blues**: `blue` (#0057a8), `blue-deep`, `electric` (#00aeef — primary accent), `cyan` (glow only)
- **Text**: `ink` (headings/primary), `grey` (body, AA), `grey-dim` (meta)
- **Lines/hover**: `line`, `line-soft`, `hover` (base for `/10` tints)
- **Shadows**: `shadow-glow` (electric-derived), `shadow-card`, `shadow-menu`, `shadow-elevate`
- **Motion easing**: `--ease-out-soft` (`cubic-bezier(0.2,0.7,0.2,1)`)
- **Decorative utilities**: `.fiber-glow`, `.header-glow`, `.net-grid-overlay`, `.fiber-flow`, `.marquee-track`, `.net-*` — all token-driven and reduced-motion-gated

## Examples

```
/ui add a "coverage map" section to the homepage with animated fibre routes
/ui build a pricing comparison table for the IPv4 leasing page
/ui create a partner-tier cards row (placeholder data) for the About page
/ui design an FAQ accordion section, token-driven and reduced-motion-safe
```

## Quality Standards

- Read existing similar components FIRST to match conventions — consistency beats novelty.
- Prioritize correctness over speed: token compliance, responsiveness, and a11y are gate checks.
- Verify the build compiles and new token utilities are emitted before declaring done.
- Flag any placeholder content or approval-gated claims in your summary.
