# Indus Gateway — Website (Vite + React)

Vendor-neutral connectivity aggregator site. "Building the Digital Highway."

## Stack
Vite 6 · React 18 · React Router DOM 6 · Tailwind CSS v4 (`@tailwindcss/vite`,
tokens in `src/index.css`) · Framer Motion · lucide-react.

## Commands
```bash
npm install

     # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the built dist/
```

## Pages / routes (final, simplified)
/  ·  /about  ·  /services  ·  /ipv4-leasing  ·  /contact
(Business Model, Customers, Ecosystem removed. Unknown paths redirect to /.)

## Logo
- Files live in `/public`: `igw-mark.png` (transparent glowing iGW mark) and
  `igw-logo.png` (full transparent logo, for light backgrounds / print).
- On the dark site the navbar and footer use the **mark image + a live-text
  wordmark** ("INDUS GATEWAY" + tagline). This keeps full contrast on navy and
  stays crisp at any size — the logo file's printed wordmark is dark-on-white
  and would not read on a navy background.
- To swap the logo later, replace `public/igw-mark.png` (transparent PNG,
  roughly 2:1 wide). The `Logo` component (`src/components/layout/Logo.jsx`)
  controls height via the `markH` prop (navbar 48px desktop / 38px mobile,
  footer 46px).

## Colour system (IGW palette, in `src/index.css`)
Deep navy #06101E · corporate navy #0A1A2F · IGW blue #0057A8 ·
electric blue #00AEEF (primary accent) · cyan #41DFFF (glow) ·
soft white #EEF6FF · muted grey #8EA3B8.

## Review flags
`src/config.js` → `SHOW_REVIEW_FLAGS` (default **false**). When false the
`ReviewFlag` component renders nothing, so internal approval notes never reach
the public UI. The full sign-off list is `APPROVAL_NOTES` in the same file —
internal only, never rendered.

## Forms
Contact and IPv4 forms are **front-end only** — they validate and show a
success state but send nothing (no backend). Add a backend + privacy policy
before real launch.

## Deep-linking (production)
Uses `BrowserRouter`. On a static host, direct hits to e.g. `/ipv4-leasing`
need a rewrite rule serving `index.html` (SPA fallback) or they 404. Configure
on your host (Nginx/Netlify/Vercel/Cloudflare) or switch to `HashRouter`.

## Pre-launch approval checklist
1. SECP registration wording.
2. PTA / service-line authorisation (transit + inter-city licensing).
3. APNIC / internet number resource status claims.
4. Cloud partner / reseller status (kept generic).
5. CDN relationship claims (category-level only).
6. Partner / provider names or logos (currently none).
7. NOC / monitoring model (no 24x7 claim yet).
8. SLA / performance guarantees (none stated).
9. Pricing / margin terms (none disclosed).
10–12. IPv4 — availability, route acceptance, RIR/transfer & broker status.
13. Legal / financial advisory wording.
14. Exact office address (withheld).
15. Form backend + privacy policy (forms are placeholders).
