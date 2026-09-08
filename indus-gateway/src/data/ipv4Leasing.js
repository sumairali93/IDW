import {
  Search,
  FileCheck2,
  Handshake,
  FileText,
  Router,
  RefreshCw,
  ShieldCheck,
  GitBranch,
  Radio,
  ClipboardCheck,
  UserCheck,
  Recycle,
} from "lucide-react";

/* Audience-specific service lists (buyer / seller split layout). */
export const IPV4_LESSEES = {
  title: "For Organisations Seeking IPv4 Space",
  subtitle: "Buyers and lessees who need address space",
  items: [
    "IPv4 sourcing support",
    "Lease coordination",
    "Resource verification",
    "LOA / authorization document coordination",
    "Routing readiness support",
    "BGP announcement support",
    "RPKI / ROA coordination where applicable",
    "WHOIS / abuse contact coordination",
    "Ongoing lease management",
  ],
};

export const IPV4_LESSORS = {
  title: "For IPv4 Resource Holders",
  subtitle: "Holders leasing or monetising unused space",
  items: [
    "IPv4 monetisation support",
    "Lessee screening",
    "Lease documentation coordination",
    "Routing authorization coordination",
    "Abuse handling workflow",
    "Renewal and termination management",
    "Reputation protection guidance",
    "Commercial coordination support",
  ],
};

/* Technical governance checklist. Notes restate scope already covered by the
   process / FAQ / disclaimer copy — no new claims. Grouped under the three
   headline pillars (policy-aware · registry-clean · route-ready). */
export const IPV4_GOVERNANCE = [
  { icon: ShieldCheck, label: "RPKI / ROA coordination", note: "Origin validation where applicable", pillar: "Policy-aware" },
  { icon: UserCheck, label: "Resource-holder authorization", note: "Verified holder consent on file", pillar: "Policy-aware" },
  { icon: Recycle, label: "Responsible address-space stewardship", note: "Policy-aware, RIR-aligned use", pillar: "Policy-aware" },
  { icon: GitBranch, label: "Routing registry hygiene", note: "Clean, accurate registry records", pillar: "Registry-clean" },
  { icon: ClipboardCheck, label: "Documentation workflows", note: "LOA and authorization records", pillar: "Registry-clean" },
  { icon: Router, label: "BGP readiness", note: "Announcement support with the operator", pillar: "Route-ready" },
  { icon: Radio, label: "Abuse contact alignment", note: "WHOIS / abuse contact accuracy", pillar: "Route-ready" },
];

/* The three governance pillars, in headline order — used to group the ledger. */
export const IPV4_GOVERNANCE_PILLARS = ["Policy-aware", "Registry-clean", "Route-ready"];

/* Process timeline. */
export const IPV4_PROCESS = [
  { icon: Search, step: "Requirement / Resource Review", text: "We review the requirement or the resource holder's available space." },
  { icon: FileCheck2, step: "Verification", text: "We verify resources, eligibility, and registry records." },
  { icon: Handshake, step: "Commercial Coordination", text: "We coordinate commercial terms between the parties." },
  { icon: FileText, step: "Documentation", text: "We coordinate LOA, authorization, and lease documentation." },
  { icon: Router, step: "Routing Readiness", text: "We support BGP announcement, RPKI/ROA, and WHOIS alignment." },
  { icon: RefreshCw, step: "Ongoing Management", text: "We manage renewals, abuse handling, and lifecycle." },
];

export const IPV4_FAQS = [
  {
    q: "Who can lease IPv4 address space?",
    a: "Any organisation that operates a network and needs routable IPv4 addresses — ISPs, hosting providers, cloud and platform operators, data centres, and enterprises — subject to verification and applicable policy.",
  },
  {
    q: "Can IPv4 holders lease unused addresses?",
    a: "Yes, if you're a verified resource holder with unused IPv4 space, you can lease it out through a structured, documented process. We handle screening, documentation, routing authorization, and ongoing management.",
  },
  {
    q: "Does Indus Gateway verify resources before coordination?",
    a: "Yes, verification is a core step. We check resources, registry records, and resource-holder authorization before any leasing arrangement moves forward.",
  },
  {
    q: "Can Indus Gateway support BGP and RPKI/ROA coordination?",
    a: "Yes. Routing readiness — including BGP announcement support, RPKI/ROA coordination where applicable, and WHOIS/abuse contact alignment — is part of the managed coordination scope.",
  },
  {
    q: "Is IPv4 leasing the same as IPv4 transfer?",
    a: "No. Leasing is the temporary, contractual use of address space that remains registered to the resource holder. Transfer changes the registered holder and is subject to separate policy and approval processes.",
  },
  {
    q: "Are routing and acceptance guaranteed?",
    a: "No. Routing announcement and network-operator acceptance depend on third parties and applicable policy. Arrangements are subject to verification, and availability or acceptance is not guaranteed without it.",
  },
];

/* Exact safe disclaimer — do not paraphrase. */
export const IPV4_DISCLAIMER =
  "IPv4 leasing, transfer, and routing arrangements are subject to applicable RIR policies, contractual terms, resource-holder authorization, and network operator acceptance. Indus Gateway does not guarantee resource availability, route acceptance, or policy approval without verification.";

/* Who relies on IPv4 — audience chips (mirrors the approved overview copy). */
export const IPV4_AUDIENCES = [
  "ISPs",
  "Hosting providers",
  "Cloud platforms",
  "Data centres",
  "VPN providers",
  "Content platforms",
  "Enterprise networks",
];

/* Coordination scope — the managed layer, in one line (from approved copy). */
export const IPV4_SCOPE = [
  "Sourcing",
  "Verification",
  "Documentation",
  "Routing readiness",
  "Lease management",
];

/* What the coordination layer manages (mirrors the approved intermediary copy —
   every function + note restates scope already in the process/governance data,
   no new claims). Powers the Managed Intermediary Model control-plane. */
export const IPV4_COORDINATION = [
  { icon: ShieldCheck, label: "Verification", note: "Resources, eligibility, registry records" },
  { icon: FileText, label: "Documentation", note: "LOA, authorization, lease agreements" },
  { icon: Router, label: "Routing readiness", note: "BGP, RPKI / ROA, WHOIS alignment" },
  { icon: GitBranch, label: "Governance", note: "Policy-aware, registry-clean" },
  { icon: RefreshCw, label: "Lifecycle management", note: "Renewals, abuse handling, termination" },
];

/* Sample address-block cards (illustrative sizes only — not inventory). */
export const IPV4_BLOCKS = [
  { size: "/24", hosts: "256 addresses", note: "Single contiguous block" },
  { size: "/23", hosts: "512 addresses", note: "Two aggregated /24s" },
  { size: "/22", hosts: "1,024 addresses", note: "Mid-size allocation" },
  { size: "/21", hosts: "2,048 addresses", note: "Scaling deployments" },
];
