# Indus Gateway — Homepage Spec & Content Reference

Source of truth extracted from the client feedback doc
(`docs/indus_gateway_webapp_feedbacks.docx`, reviewed 2026-07-31). This captures
the **approved section sequence, copy, and visual intent** so components don't
get re-litigated. Pair with the screenshots in `./screenshots/`.

> **Master mockup:** `./screenshots/00-homepage-master-mockup.jpg` is the single
> definitive full-page reference. When in doubt about layout, match it.

## Reviewer scorecard (baseline we are improving from)

Overall **5.8/10**. The site "felt more like a product concept page than a
commercial lead-generation website." Targeted lifts:

| Area | Score | Implication for our work |
|------|-------|--------------------------|
| Design | 8/10 | Strongest area — keep the enterprise dark-navy look. |
| Messaging | 5/10 | Tighten value-driven copy; less filler. |
| Trust Building | 4/10 | Governance/compliance, real proof, accountability up front. |
| Lead Generation | 4/10 | Natural lead capture, clear CTAs everywhere. |
| Conversion Optimization | 3/10 | **Lowest** — every section must drive toward a CTA. |
| Enterprise Readiness | 5/10 | Executive tone, minimal animation, real photography. |

**Look & feel direction (verbatim):** dark navy + light grey / similar Pantone
shades · clean enterprise design · real photography · minimal animations ·
executive audience (enterprises, government, banking). It's a **home page**
(exploration, multiple CTAs, broad overview) — not a single-goal landing page.

## Approved homepage section sequence

The doc's "SAMPLE LAYOUT" order. Current implementation lives in
`src/pages/Home.jsx`; deviations are noted.

1. **Hero** — headline **"One Partner. Every Network."**
   Subtext: *"Indus Gateway is a vendor-neutral connectivity aggregator and
   managed services provider that helps enterprises, ISPs, government
   organizations, and cloud-native businesses procure, manage, and optimize
   network services through a single accountable partner."*
   CTAs: **Request Consultation** (primary) · **Explore Services** (the mockup
   also shows "Talk to an Expert"). Right side = the providers→hexagon→clients
   connectivity diagram (`ConnectivityHub`). Ref: master mockup top.
2. **Problem Statement** — "Connectivity Procurement Is Broken" vs "We Simplify It"
   two-column band. Left pains: Multiple Contracts · Multiple SLAs · Multiple
   Support Teams · No Visibility · Complex Negotiations · Lengthy negotiations ·
   Increased operational burden. Right gains: One Partner · One Contract · One
   SLA Framework · One Support Team · Full Visibility · Simplified & Optimized.
   Ref: `./screenshots/01-problem-vs-simplify-band.jpg`.
3. **Services (What we do)** — "Comprehensive Connectivity & Managed Services":
   Transit Aggregation · Inter-City Connectivity · Cloud Connectivity ·
   Managed Network Operations · Professional Services. (Home uses a bento grid.)
4. **How We Work** (optional) — 7 steps: Assess · Source · Compare · Negotiate ·
   Implement · Manage · Optimize. Ref: `./screenshots/02-how-we-work-band.jpg`.
5. **USP (Why Organizations Choose Indus Gateway)** — Vendor Neutral ·
   Wholesale Buying Power · Managed Operations.
6. **Industries (Who we serve)** — Enterprises · ISPs & Carriers · Government &
   Public Sector · Cloud-Native Businesses.
7. **Partner Ecosystem (Optional) / Value Additions** — mockup shows a partner
   logo strip (Transit/Network, Cloud, IXPs, CDN). **Currently omitted** — no
   named partners are approved yet (`src/config.js` APPROVAL_NOTES). We instead
   surface the **IPv4 Leasing & Address Brokerage** value-add here. Ref:
   `./screenshots/05-ipv4-leasing-hero.jpg`.
8. **Governance & Compliance (Optional)** — "Trusted. Compliant. Accountable.":
   SECP Registered · PTA Authorized Services · APNIC Resource Management ·
   SLA-Based Service Delivery · Governance-Focused Operations. **These are
   approval-gated claims** — keep qualifiers as in the mockup ("In Progress",
   "Applicable to Service Lines").
9. **Final CTA + lead capture** — "Ready to Simplify Your Connectivity?" /
   *"Let our experts design the right connectivity strategy for your business."*
   CTAs: Request Consultation · Explore Services. Ref:
   `./screenshots/03-cta-band.jpg`. (Contact-page CTA variant: "Let's map your
   connectivity requirements.")

**Footer** — Quick Links (Home · About · Services · IPv4 Leasing · Contact),
Services list, Contact (raz@igw.com.pk · www.igw.com.pk · Pakistan-registered
technology company), tagline "Building the Digital Highway", ©2026 Indus Gateway
(Private) Limited. Ref: `./screenshots/04-footer.jpg`.

## Conversion-optimization checklist (from reviewer's "what actually matters")

Apply to any new page/section:
- Clear navigation — no confusion, no friction.
- Strong headline that grabs attention instantly.
- Value-driven body copy, not filler.
- Sections built for real user intent.
- Trust signals (governance, proof) — build instant credibility.
- A CTA that tells users exactly what to do next.
- Lead capture that feels natural, not forced.
- **Page speed + mobile responsiveness** — the reviewer's PRO TIP; even the best
  structure loses conversions if it feels slow or hard to use on mobile.

## Content approval gates (do not fabricate)

Named clients/partners, testimonials, exact SLA/coverage figures, and regulatory
claims (SECP / PTA / APNIC) require sign-off. Keep placeholders clearly
placeholder and flag them. See `src/config.js` `APPROVAL_NOTES`.
