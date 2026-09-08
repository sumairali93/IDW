# Indus Gateway — Futuristic Redesign Blueprint

**Status:** Finalized — 4 directional decisions locked (see §0). Ready for implementation.
**Date:** 2026-07-31
**Purpose:** A complete, self-contained design specification an engineer or LLM can implement against with no further context. It defines the visual language, tokens, layout system, component specs, page breakdowns, responsiveness, motion, imagery, and a phased build plan.
**Source inputs:** Client feedback deck, homepage-flow mockup (reference image #1), airy/editorial inspiration board — Vsolar/Nirosolar solar-energy site (reference image #2), and the live build (`src/` — React 18 + Vite 6 + Tailwind v4).

> **Read first:** `src/index.css` is the single source of truth for tokens. Everything in this doc that adds a color/shadow/radius/font MUST be added to the `@theme` block there before use. **No hardcoded hex, `rgba()`, `bg-[#...]`, or `shadow-[...]` in components — ever.** Tints use token alpha (`bg-electric/10`, `border-line`).

---

## 0. Locked decisions (confirmed with stakeholder — 2026-07-31)

These four directional choices are **settled**. The rest of this document is written to them.

| # | Decision | Choice | Implication |
|---|---|---|---|
| 1 | **Band theme** | **Alternating light + dark** | Reintroduce cool-paper light bands (Problem, Services, USP, Stats/Testimonials) between dark network sections. Requires the new light-theme token family (§3.2) and AA re-verification on paper. Matches the inspiration's airiness. |
| 2 | **Imagery** | **Real photography** | Cinematic datacenter / city-connectivity / enterprise photos with navy scrims for text legibility. Assets must be **licensed**; use clearly-marked placeholders until sourced (§11, §13). Cool-toned only — no warm/solar content. |
| 3 | **Scope** | **Full site in one go** | Home + About + Services + IPv4 Leasing + Contact all redesigned together for consistency. Roadmap Phase 4 (§14) is in-scope, not deferred. |
| 4 | **Copy** | **Keep existing copy verbatim** | Visual redesign only. Reuse all current text (H1, subhead, service taglines) from `src/data/`. No outcome-led rewrite this pass. Regulatory/approval-gated wording untouched (§13). |

> **Note on decision #4 vs. the feedback deck:** the deck flagged copy as jargon-led. That is explicitly **out of scope** for this redesign per stakeholder direction — revisit as a separate content pass later.

---

## 1. The one-sentence vision

> Take the **airy, editorial, image-forward layout** of the inspiration board (generous whitespace, rounded photographic frames, bento card grids, floating glass stat pills, alternating light/dark bands) and render it in Indus Gateway's **"storm-fibre / digital-highway"** identity — dark-navy core, electric-blue spine, glassmorphic depth, and precise fibre-flow motion — so it reads as a **premium 2030-grade enterprise infrastructure brand**, not a product concept page.

**Audience:** executive + technical decision-makers at enterprises, ISPs, government bodies, cloud businesses. Tone: confident, modern, futuristic. Never neon-everywhere, never consumer-playful, never generic SaaS.

**What "one level up" means concretely** (vs. the flat inspiration board):
- Photographic frames get a **glass + glow bezel** and subtle animated fibre routes, not just a plain rounded image.
- Cards are **frosted glass** with depth layers, not flat panels.
- Stat pills **float** over imagery with backdrop blur and a live-status dot.
- Section transitions use **aurora gradient seams** (blue→electric→cyan) instead of hard color breaks.
- Motion is **purposeful and physics-based** (spring, parallax-lite), always `prefers-reduced-motion`-gated.

---

## 2. Design principles

1. **Air is a feature.** Whitespace is the biggest gap between the current schematic look and the inspiration. Increase section padding, gutter, and line-height. Let headlines breathe.
2. **Alternating rhythm.** Dark (navy) → light (paper) → dark, punctuated. Not all-dark. Light bands carry proof/photography; dark bands carry the futuristic network story.
3. **Image-forward (real photography).** Every major section earns a real, licensed photograph (cinematic, cool-toned — datacenter/city/enterprise). No more all-vector schematics. Rendered network visuals are supporting decoration only, not the primary imagery.
4. **Glass + depth.** Frosted panels, layered shadows, glow bezels. Depth replaces flatness.
5. **One accent spine.** Electric `#00aeef` is the only strong accent; cyan `#41dfff` is glow/decoration only. Aurora gradients only span blue→electric→cyan. **No purple, green, or new hues in chrome.**
6. **Motion with restraint.** Fibre-flow, reveal-on-scroll, spring hovers, subtle parallax. GPU-only (`transform`/`opacity`). Everything collapses under reduced-motion.
7. **Proof over claims.** Stats, testimonials, logos, badges — surfaced, not buried. (Named logos/quotes stay placeholder until sign-off — see §13.)
8. **Token discipline is non-negotiable.** If a value isn't a token, it doesn't ship.

---

## 3. Color system (expanded, still brand-locked)

The current palette stays. We **add a light-theme surface family** (for airy bands) and a **controlled aurora/glass set**. All new values below go into the `@theme` block of `src/index.css`.

### 3.1 Keep (existing dark core — do not change)
```
--color-navy:       #0a1a2f   /* page bg */
--color-navy-deep:  #06101e   /* deepest */
--color-panel:      #0f2238   /* raised */
--color-panel2:     #112a45   /* raised alt */
--color-surface:    #0c1c30   /* dark alt band */
--color-blue:       #0057a8   /* IGW blue */
--color-blue-deep:  #073a66
--color-electric:   #00aeef   /* PRIMARY accent */
--color-cyan:       #41dfff   /* glow only */
--color-grey:       #a6b8ca   /* body, AA on dark */
--color-grey-dim:   #7e91a4   /* meta only */
--color-ink:        #eef6ff   /* headings/primary on dark */
--color-line:       rgba(90,150,210,0.16)
--color-line-soft:  rgba(90,150,210,0.09)
--color-hover:      #5a96d2
```

### 3.2 ADD — light-theme surface family (for airy/editorial bands)
The inspiration's light sections are near-white with a cool, faintly blue-grey cast — not pure white (which would feel clinical). Use a **cool paper** tone so light bands still feel part of the same cold-fibre brand.
```
--color-paper:        #eef3f8   /* light band bg (cool off-white) */
--color-paper-raised: #f7fafc   /* cards on light bands (slightly lighter than bg) */
--color-paper-sunk:   #e4ecf3   /* inset wells / input fields on light bands */
--color-paper-line:   rgba(10,26,47,0.10)   /* hairline rules on light bands */
--color-ink-invert:   #0a1a2f   /* headings on light bands (= navy) */
--color-slate:        #46586b   /* body text on light bands, AA on paper */
--color-slate-dim:    #6b7c8d   /* meta on light bands */
```
> **Contrast check (must verify):** `--color-slate` on `--color-paper` and `--color-ink-invert` on `--color-paper` must both pass WCAG AA (≥4.5:1 for body, ≥3:1 for large headings). Adjust darkness if the validator fails.

### 3.3 ADD — aurora gradient + glass tokens
```
/* Aurora seam / hero wash — ONLY blue→electric→cyan */
--gradient-aurora:  linear-gradient(120deg,
                      var(--color-blue-deep) 0%,
                      var(--color-electric) 55%,
                      var(--color-cyan) 100%);
--gradient-fiber:   linear-gradient(90deg,
                      transparent,
                      color-mix(in srgb, var(--color-cyan) 55%, transparent),
                      transparent);

/* Glass surfaces (frosted) — used with backdrop-blur */
--color-glass-dark:  color-mix(in srgb, var(--color-panel) 55%, transparent);
--color-glass-light: color-mix(in srgb, #ffffff 62%, transparent);
--color-glass-edge:  color-mix(in srgb, var(--color-electric) 22%, transparent);
```

### 3.4 Accent policy (strict)
- **Strong accent:** `electric` only. CTAs, active states, key icons, focus ring.
- **Glow/decoration:** `cyan` only. Fibre-flow, node pulses, gradient tail, status dots.
- **Gradients:** only the aurora ramp (blue→electric→cyan). No other multi-hue gradients.
- **Amber/green/purple:** banned in chrome. Reserve semantic green/red strictly for form validation states if needed (add as `--color-success`/`--color-danger` only when a form ships).

### 3.5 Band assignment (which sections are light vs dark)
| Section | Theme | Rationale |
|---|---|---|
| Hero | **Dark** + aurora wash + imagery | Signature futuristic moment |
| Trust strip | Dark (seam under hero) | Continuity |
| Problem → Simplify | **Light (paper)** | Airy before/after, high legibility |
| Services (bento) | **Light (paper)** | Image-forward cards pop on light |
| How We Work | Dark | Network-story moment, fibre timeline |
| USP | **Light (paper)** | Benefit clarity |
| Industries | Dark + photography | Cinematic audience imagery |
| IPv4 / Value | Dark (aurora panel) | Premium highlight |
| Stats + Testimonials | **Light (paper)** | Proof reads best on light |
| Governance | Dark | Trust anchors on authority-dark |
| Final CTA + Lead form | Dark (aurora panel) | Strong close |
| Footer | **Navy-deep** + image bg | Editorial newsletter-style close |

---

## 4. Typography

Fonts stay: **Sora** (`font-display`, headings), **IBM Plex Sans** (`font-body`, body). The inspiration uses a tight, confident display face — Sora already fits.

### 4.1 Type scale (fluid, `clamp()`)
| Token/role | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Display / Hero H1 | `clamp(34px, 6.5vw, 72px)` | 600 | `-0.03em` | 1.02 |
| H2 (section) | `clamp(28px, 4vw, 46px)` | 600 | `-0.02em` | 1.1 |
| H3 (card title) | `clamp(18px, 2vw, 21px)` | 600 | `-0.01em` | 1.2 |
| Eyebrow | `12.5px` | 600 | `0.14em` uppercase | 1 |
| Body lg | `clamp(16px, 2vw, 19px)` | 400 | `0` | 1.65 |
| Body | `15px` | 400 | `0` | 1.6 |
| Meta / caption | `13px` | 500 | `0.01em` | 1.4 |
| Stat number | `clamp(32px, 5vw, 56px)` | 700 | `-0.02em` | 1 |

**Rules:** `text-balance` on all headings. Max line length ~68ch for body. Headings on dark use `text-ink`; on light use `text-ink-invert`. Body on dark `text-grey`; on light `text-slate`.

---

## 5. Spacing, radius, elevation, motion tokens

### 5.1 Spacing rhythm (more air than current)
- Section vertical padding: `clamp(72px, 10vw, 140px)` (up from current `64–120`).
- Container max-width: keep `1180–1200px`; add a wide `1320px` variant for bento/hero.
- Grid gutter: `clamp(16px, 2vw, 28px)`.
- Content max line: `640px` for paragraphs.

### 5.2 ADD — radius tokens
```
--radius-sm:  10px
--radius-md:  16px
--radius-lg:  22px   /* default card */
--radius-xl:  30px   /* image frames, bento tiles */
--radius-2xl: 40px   /* hero/aurora panels */
--radius-pill: 9999px
```

### 5.3 Elevation (keep + extend)
```
--shadow-glow:    0 10px 30px color-mix(in srgb, var(--color-electric) 22%, transparent)   /* keep */
--shadow-card:    0 18px 40px rgba(6,16,30,0.45)   /* keep */
--shadow-menu:    0 24px 60px rgba(6,16,30,0.55)   /* keep */
--shadow-elevate: 0 4px 14px rgba(10,26,47,0.35)   /* keep */
/* ADD */
--shadow-glass:   0 8px 32px rgba(6,16,30,0.38), inset 0 1px 0 color-mix(in srgb,#ffffff 8%, transparent)
--shadow-float:   0 24px 70px rgba(6,16,30,0.50)   /* floating stat pills over imagery */
--shadow-paper:   0 12px 34px rgba(10,26,47,0.10)  /* cards on LIGHT bands (soft, not heavy) */
```

### 5.4 Motion tokens
```
--ease-out-soft: cubic-bezier(0.2,0.7,0.2,1)   /* keep */
--ease-spring:   cubic-bezier(0.34,1.56,0.64,1) /* subtle overshoot for hovers */
--dur-fast:  180ms
--dur-base:  320ms
--dur-slow:  600ms
```

---

## 6. Layout & grid system

- **Mobile-first, 12-col mental model** implemented with Tailwind responsive grid utilities.
- **Breakpoints:** verify zero horizontal overflow at **360 / 390 / 768 / 1024 / 1280 / 1440**.
- **Bento layout** (new signature pattern for Services + proof): a grid where one tile spans 2×2 (a large image/feature tile) and neighbors are 1×1 text/stat tiles. Use CSS grid `grid-template-columns` + `grid-column`/`grid-row` spans; collapse to single column on mobile.
- **Rounded image frames:** every hero/section image sits in a `--radius-xl` frame with `--shadow-glass` and a 1px `--color-glass-edge` inner border, plus a soft aurora glow behind it.
- **Section seams:** between a dark and a light band, add a thin aurora seam (a 1–2px gradient rule or a soft glow transition), not a hard cut.

---

## 7. Component specifications

For each component: what to build, tokens to use, states, responsiveness, motion, a11y. Build primitives in `src/components/ui/`, sections in `src/components/sections/`, chrome in `src/components/layout/`.

### 7.1 Button (`ui/Button.jsx` — evolve existing)
- **Shape:** pill (`rounded-pill`) to match inspiration, with a **circular arrow chip** on the right (icon inside a small `rounded-full` bg-electric circle) for primary.
- **Variants:**
  - `primary` — `bg-electric text-navy-deep`, hover `shadow-glow` + spring `y:-2`.
  - `ghost` — transparent, `border-line`, `text-ink` (dark bands) / `text-ink-invert` (light bands via a `theme` prop).
  - `outline` — electric outline, subtle `bg-electric/6` on hover.
- **Touch target ≥ 44px.** Motion via Framer `whileHover`/`whileTap`, spring easing. Reduced-motion → no transform.

### 7.2 Glass Card (`ui/Card.jsx` — evolve; add `variant`)
- **`variant="glass"`** (default on dark): `bg-glass-dark`, `backdrop-blur-xl`, `border-glass-edge`, `shadow-glass`; hover lifts `-4px`, border → `electric/45`, adds `shadow-card`.
- **`variant="paper"`** (light bands): `bg-paper-raised`, `border-paper-line`, `shadow-paper`, text uses `ink-invert`/`slate`; hover soft lift.
- **`variant="image"`**: full-bleed image top, content below; or overlay content on image with a bottom scrim gradient (navy-deep → transparent). Rounded `--radius-xl`.
- Consistent internal padding `clamp(20px, 3vw, 32px)`. All hover transitions `--dur-base --ease-spring`.

### 7.3 Floating Stat Pill (`ui/StatPill.jsx` — NEW)
- A frosted pill/tile that floats over imagery (inspiration's "610 W", "700"): `bg-glass-light` or `bg-glass-dark` per context, `backdrop-blur`, `shadow-float`, `rounded-xl`.
- Contains: big stat number (`font-display`, stat scale), label (`meta`), optional live dot (`bg-electric` with `net-glow`) or a circular progress ring drawn with SVG stroke in electric.
- Positioned absolutely at a frame corner on desktop; on mobile, reflows into a static row below the image.

### 7.4 Eyebrow (`ui/Eyebrow.jsx` — keep)
- Small uppercase label above H2 ("More Energy More Savings" equivalent). On dark: `text-cyan`; on light: `text-electric`. Optional leading short rule/line.

### 7.5 Hero (`sections/Hero.jsx` — major rework) — see §8.1

### 7.6 Bento Services Grid (`sections/Services*` — NEW layout) — see §8.3

### 7.7 Testimonial Carousel (`sections/Testimonials.jsx` — rework)
- Large glass card: quote, avatar (placeholder), name/role/company (placeholder — flag as unapproved), and **prev/next circular arrow buttons** bottom-right (matches inspiration).
- Swipeable on touch; arrows on desktop. Auto-advance optional, pause on hover, disabled under reduced-motion.

### 7.8 Fibre Timeline (`sections/HowWeWork.jsx` — rework)
- Desktop: horizontal 7-step timeline with an **animated fibre-flow line** connecting nodes (reuse `.fiber-flow` / `.net-link`). Each node is a glass chip.
- Mobile: **vertical stepper** with the fibre line running down the left, nodes as glass dots.

### 7.9 Navbar (`layout/Navbar.jsx` — polish)
- Transparent over hero; on scroll, becomes `bg-glass-dark` + `backdrop-blur` + `shadow-menu` + hairline `border-line`. Sticky.
- Dropdowns as glass menus. Mobile: full-height glass drawer, 44px targets, focus trap.
- Primary CTA ("Request Consultation") always visible as pill button.

### 7.10 Footer (`layout/Footer.jsx` — editorial rework)
- Newsletter-style close over a **dark cityscape/fibre image** (navy-deep scrim), matching inspiration's footer. Columns: Services / Industries / Resources / Company + contact. Social row. Legal line.

### 7.11 Section (`ui/Section.jsx` — extend)
- Add explicit `theme` prop: `"dark"` (navy) | `"paper"` (light) | `"aurora"` (gradient panel). Applies correct bg + text-color context + seam. Keep max-width container + fluid padding from §5.1.

### 7.12 Sticky mobile CTA (`layout/StickyCTA.jsx` — keep/polish)
- Appears after hero scroll on mobile; single primary pill; respects safe-area inset.

---

## 8. Page-by-page breakdown

### 8.1 Home — Hero (Section 1) — DARK, signature moment
- **Layout:** left column = eyebrow pill ("Building the Digital Highway") + H1 + subhead + dual CTA; right column (desktop) = a **rounded photographic/rendered frame** of a network/datacenter/fibre visual, with **1–2 floating stat pills** (e.g. "99.99% uptime", "Tier-1 & Tier-2 providers", "Cities covered").
- **Copy:** keep H1 **"One Partner. Every Network."** with "Every Network." in the aurora gradient text. Keep the approved subhead paragraph verbatim (the main heading text the user supplied).
- **Background:** `fiber-glow` + `net-grid-overlay` + refined `NetworkBackdrop` (slower, subtler). Aurora wash top-right.
- **Motion:** staggered reveal (existing), parallax-lite on the image frame (≤8px), fibre-flow on backdrop lines. All reduced-motion gated.
- **Mobile:** image frame moves below the copy; stat pills reflow into a row; H1 wraps cleanly.

### 8.2 Problem Statement (Section 2) — PAPER
- **"Procurement is broken → We simplify it"** as a clean **before/after** on light: left = pain list (muted slate, small ✕ marks), right = simplified list (electric ✓). Two glass-paper cards side by side; stack on mobile. High whitespace.

### 8.3 Services / What We Do (Section 3) — PAPER, **BENTO**
- Convert the 5 service cards into a **bento grid**: one large 2×2 image feature tile (lead service, e.g. Managed Network Operations, with a real image + short outcome copy) + four 1×1 paper cards (icon, outcome-led title, one-line detail, "Learn More →").
- Outcome-led copy first line, technical second. Data stays in `src/data/services.js`.
- Mobile: single column, image tile first.

### 8.4 How We Work (Section 4) — DARK
- Fibre timeline per §7.8. Steps from `src/data/howWeWork.js`.

### 8.5 USP / Why Choose IG (Section 5) — PAPER
- 3 benefit cards (paper variant), icon in a soft electric well, benefit-led title + one line. From `src/data/usp.js`.

### 8.6 Industries / Who We Serve (Section 6) — DARK + photography
- 4 **image cards** (enterprise, ISPs/carriers, government, cloud-native). Overlay title + one line on a scrimmed photo; hover reveals a "View solutions →" link. From `src/data/industries.js`. Photography must be real/licensed or clearly flagged placeholder.

### 8.7 IPv4 / Value Additions (Section 7) — AURORA PANEL (dark)
- Keep the current split highlight but upgrade the panel to an **aurora-bordered glass panel** with a small "What we coordinate" checklist card. Deep BGP/RPKI jargon stays on the IPv4 page.

### 8.8 Stats + Testimonials (Section 8) — PAPER
- **Stat row** (uptime %, providers aggregated, cities, response time) as floating-style paper stat tiles.
- **Testimonial carousel** per §7.7 (placeholder quotes/names — flagged).

### 8.9 Governance & Compliance — DARK
- Raise prominence of SECP / PTA / APNIC / SLA badges as glass chips in a clean row. Copy stays pending legal sign-off.

### 8.10 Final CTA + Lead Capture (Section 9) — AURORA PANEL (dark)
- Left: headline + reassurance copy + single primary CTA. Right: **inline lead form** (name, work email, requirement) — front-end only, no backend. One unambiguous primary action.

### 8.11 Footer — NAVY-DEEP + image
- Editorial newsletter close per §7.10.

### 8.12 Other pages (apply same system — **in scope this pass**, decision #3)
- **About:** dark hero, story band (paper), values (bento), partner-tier cards (placeholder), team cards (placeholder), governance recap (dark). Follow the same alternating light/dark rhythm as Home.
- **Services:** hero + per-service deep sections (alternating bands), each with an image frame + capability list.
- **IPv4 Leasing:** hero + explainer + pricing/comparison table (stacks on mobile) + BGP/RPKI detail + lead form.
- **Contact:** split layout — form (paper card) + contact details/map placeholder; sticky CTA off on this page.
- Every page uses the shared `PageHeader`/`PageShell`, the same tokens, and the same band rhythm.

---

## 9. Responsiveness spec

- **Breakpoints to verify:** 360, 390, 768, 1024, 1280, 1440. **Zero horizontal overflow at every one.**
- **Bento & timelines collapse:** bento → single column; horizontal timeline → vertical stepper; multi-col tables → stacked cards.
- **Floating stat pills** reflow to a static row under their image on < 768px.
- **Type** fluid via `clamp()`; headings `text-balance`; test wrapping on 360px.
- **Nav** → glass drawer < 1024px, 44px targets, focus trap, body scroll lock.
- **Images:** `loading="lazy"`, correct `width`/`height` to avoid CLS, modern formats (WebP/AVIF), responsive `sizes`. The design is image-heavy — budget for it.
- **Touch targets ≥ 44px**; hover-only affordances must have a tap equivalent.

---

## 10. Motion & interaction spec

- **Library:** Framer Motion 12 (`motion`, `useReducedMotion`, `AnimatePresence`).
- **Reveal on scroll:** fade+rise (`opacity 0→1`, `y 18→0`), `--dur-slow --ease-out-soft`, staggered per group (existing `Reveal`).
- **Hover:** cards lift `-4px`, buttons `y:-2` with `--ease-spring`; borders → electric.
- **Fibre-flow:** continuous subtle sweep on hero backdrop + timeline line (existing `.fiber-flow`), slow (~3.5s).
- **Parallax-lite:** hero image frame ≤ 8px translate on scroll; never janky.
- **Carousel:** slide/spring transitions, pause on hover.
- **Reduced motion (mandatory):** `useReducedMotion()` collapses all JS variants to no-op; all decorative CSS animations already gated in the `@media (prefers-reduced-motion: reduce)` block — add any new ones there.

---

## 11. Imagery & assets

- **Style:** cinematic, cool-toned — fibre-optic close-ups, datacenter halls, city-at-dusk connectivity, abstract network topology, subtle 3D renders. Avoid stocky "handshake/office" clichés and warm/solar tones (the inspiration is solar; **do not copy its content, only its layout**).
- **Treatment:** rounded `--radius-xl` frames, glass edge, aurora glow behind, optional navy-deep scrim for text overlay legibility.
- **Sourcing (decision #2 — real photography):** must be **properly licensed** (stock license or original). Generated imagery is acceptable only as an interim placeholder, never as the shipped asset. Until final assets are approved, use **clearly-marked placeholders** and flag them in the PR summary. Optimize all images (WebP/AVIF, lazy-load).
- **Placeholder handling:** where a real photo isn't yet sourced, render a token-styled placeholder frame (aurora-glow bezel + a "placeholder image" label), not a broken/empty box — so layout is reviewable before assets land.
- **Icons:** lucide-react only, consistent stroke, electric or slate per band.

---

## 12. Accessibility (gate checks)

- Semantic HTML; one `<h1>` per page; logical heading order.
- WCAG AA contrast on **both** themes — verify `slate/paper` and `grey/navy` pairings.
- Visible `:focus-visible` (electric ring) — already global, never remove.
- `aria-hidden` on decorative glows/backdrops; `aria-label` on icon-only controls; carousel arrows labeled.
- Respect `prefers-reduced-motion` everywhere.
- Forms: labels tied to inputs, error text announced, 44px controls.

---

## 13. Content & approval gates (do not ship un-signed-off)

Per `src/config.js` `APPROVAL_NOTES` and README:
- **Named client/partner logos & testimonials** → placeholder + flagged until approved.
- **Regulatory wording** (SECP / PTA / APNIC / SLA / uptime figures) → keep as-is pending legal.
- **Forms** → front-end only (no backend) until one exists.
- Any new placeholder copy must be obviously placeholder and called out in the PR summary.

---

## 14. Phased implementation roadmap

**Phase 0 — Tokens & foundation** (`src/index.css`)
1. Add light-theme family (§3.2), aurora/glass tokens (§3.3), radius (§5.2), extra shadows (§5.3), motion tokens (§5.4).
2. Verify all new light-on-paper / dark-on-navy pairings pass AA.
3. Add any new decorative animations to the reduced-motion block.

**Phase 1 — Primitives** (`src/components/ui/`)
4. Evolve `Button` (pill + arrow chip + theme-aware), `Card` (glass/paper/image variants), `Section` (theme prop + seams), `Eyebrow` (theme-aware). Add `StatPill`.

**Phase 2 — Hero + chrome**
5. Rework `Hero` (§8.1) with image frame + floating stat pills + refined backdrop.
6. Polish `Navbar` (scroll-glass), `Footer` (editorial image close), `StickyCTA`.

**Phase 3 — Home sections**
7. Problem (paper before/after), Services (bento), How We Work (fibre timeline), USP (paper cards), Industries (image cards), IPv4 (aurora panel), Stats + Testimonials (carousel), Governance (glass chips), Final CTA + Lead form.

**Phase 4 — Other pages**
8. Apply the system to About, Services, IPv4 Leasing, Contact.

**Phase 5 — Responsive + motion + a11y pass**
9. Audit all breakpoints (§9), verify reduced-motion parity, run contrast checks, lazy-load images.

**Phase 6 — Verify & ship**
10. `npm run build` (confirm token utilities emit), dev-server visual check desktop + mobile, then commit.

---

## 15. Definition of done (per component & overall)

- [ ] No hardcoded color/shadow/radius — tokens only.
- [ ] Electric is the only strong accent; gradients are aurora-only.
- [ ] Responsive at 360/390/768/1024/1280/1440 with zero overflow.
- [ ] Reduced-motion parity verified.
- [ ] AA contrast on both light and dark bands.
- [ ] 44px touch targets; focus-visible intact.
- [ ] Content-driven from `src/data/`; no hardcoded copy in components.
- [ ] Placeholder/approval-gated content flagged.
- [ ] `npm run build` passes; visual check done.

---

### Appendix A — Quick token cheat-sheet for implementers
```
DARK band:   bg-navy / bg-surface   text-ink / text-grey   card=glass
LIGHT band:  bg-paper               text-ink-invert / text-slate   card=paper
AURORA panel: --gradient-aurora border, glass inner, text-ink
Accent:      electric (strong), cyan (glow only)
Radius:      cards rounded-lg(22), frames rounded-xl(30), panels rounded-2xl(40), pills rounded-pill
Shadow:      glass on dark cards, paper on light cards, float on stat pills, glow on primary hover
Motion:      reveal (ease-out-soft, dur-slow), hover (ease-spring), fibre-flow (3.5s), all reduced-motion gated
```
