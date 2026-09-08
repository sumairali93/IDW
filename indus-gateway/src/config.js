/* ===============================================================
   Internal configuration & approval governance.

   SHOW_REVIEW_FLAGS controls whether the amber ReviewFlag pills
   render in the UI. Keep FALSE for any build that could be seen
   publicly. Set TRUE only for internal approval review sessions.
   =============================================================== */

export const SHOW_REVIEW_FLAGS = false;

/* ---------------------------------------------------------------
   APPROVAL_NOTES — internal only. NEVER rendered to the public UI.
   Every item must be cleared by an authorized reviewer before the
   related copy goes live. Treat IPv4 items as the highest risk.
----------------------------------------------------------------*/
export const APPROVAL_NOTES = [
  "SECP registration wording / whether a registration reference appears",
  "PTA — shown as 'PTA Authorization — Applicable to Service Lines' (hedged, matches mockup). Verify actual licence class before launch.",
  "APNIC — shown as 'APNIC Membership — in progress' (explicitly not-yet-held, matches mockup). Update wording once membership confirmed.",
  "SECP registration number shown as placeholder [0323910] — replace with verified number before launch.",
  "Cloud partner / reseller status (keep 'major public cloud platforms' generic)",
  "CDN relationship claims (category-level only, no named vendors)",
  "Any partner / provider names or logos (currently none used)",
  "NOC / monitoring operating model (no staffed-hours or 24x7 claim until confirmed)",
  "SLA / performance guarantee wording (no uptime guarantees stated)",
  "Pricing / wholesale / margin terms (none disclosed)",
  "IPv4 address availability claims",
  "IPv4 route acceptance guarantees",
  "RIR transfer / approval status",
  "IPv4 broker status",
  "Legal / financial advisory wording (intermediary is not a law or finance firm)",
  "Exact office address (withheld pending approval)",
];

export const SITE = {
  name: "Indus Gateway",
  legalName: "Indus Gateway (Private) Limited",
  tagline: "Building the Digital Highway",
  positioning: "Vendor-Neutral Network Intermediary & Connectivity Aggregator",
  email: "info@igw.com.pk",
  website: "www.igw.com.pk",
  contact: "Raz Ali",
};
