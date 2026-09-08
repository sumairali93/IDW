import {
  Network,
  Cable,
  Cloud,
  Activity,
  Settings2,
  Boxes,
  Gauge,
} from "lucide-react";

/* Service lines. `flag` holds internal approval text (rendered only
   when SHOW_REVIEW_FLAGS is true). */
export const SERVICES = [
  {
    id: "transit",
    group: "Connectivity",
    icon: Network,
    title: "Transit Aggregation",
    tagline: "Multi-provider upstream access, coordinated as one.",
    summary:
      "We connect you to multiple IP transit providers, compare pricing and performance on your behalf, and manage the relationship — so you get better deals without negotiating with each provider yourself.",
    value:
      "More provider options, stronger pricing power, and one team handling routing design and support issues for you.",
    who: ["ISPs & regional carriers", "Content & digital platforms", "Scaling enterprises"],
    capabilities: [
      "IP transit sourcing across multiple upstream categories",
      "Demand-led commercial comparison and negotiation support",
      "BGP configuration support and multi-homing design",
      "Traffic engineering and route optimisation",
      "SLA visibility and escalation management",
      "Monthly performance reporting",
    ],
  },
  {
    id: "intercity",
    group: "Connectivity",
    icon: Cable,
    title: "Inter-City Connectivity",
    tagline: "Private links between sites, cities, and facilities.",
    summary:
      "We connect your offices, branches, and data centres across major Pakistani cities with private links — comparing providers so you're not locked into one option.",
    value:
      "Fewer contracts to manage, backup links built in, and one team handling delivery and faults.",
    who: ["Multi-site enterprises", "Data-centre dependent businesses", "Public sector bodies"],
    capabilities: [
      "Leased line and circuit coordination",
      "Dark fiber options where available",
      "MPLS circuits and SD-WAN overlays",
      "Last-mile aggregation and provider comparison",
      "Redundancy architecture across paths",
      "Consolidated operational coordination",
    ],
  },
  {
    id: "cloud",
    group: "Connectivity",
    icon: Cloud,
    title: "Cloud Connectivity",
    tagline: "Private paths to major public cloud platforms.",
    summary:
      "We set up private, direct connections to major public cloud platforms — faster and more secure than routing through the public internet.",
    value:
      "More reliable cloud access with backup routing built in, monitored on your behalf.",
    who: ["Cloud-native businesses", "Enterprises with hybrid estates", "Platform operators"],
    capabilities: [
      "Dedicated private connectivity to major public cloud platforms",
      "BGP configuration and failover design",
      "Multi-cloud routing architecture",
      "Reduced latency variability vs. default internet paths",
      "Ongoing monitoring and visibility",
    ],
    flag: "Official cloud partner / reseller status not claimed. Cloud-provider naming and any partner status: confirm before publishing.",
  },
  {
    id: "dia",
    group: "Connectivity",
    icon: Gauge,
    title: "Dedicated Internet Access",
    tagline: "A private, uncontended fiber link straight to the internet.",
    summary:
      "Dedicated Internet Access (DIA) is a private, direct fiber line just for you — not shared with other customers, so your performance stays steady, unlike standard broadband.",
    value:
      "A private line sized to what you need, fully managed by us — different from inter-city links, which connect your own offices to each other rather than to the internet.",
    who: ["Enterprises & head offices", "Hosting & platform operators", "Mission-critical sites"],
    capabilities: [
      "Dedicated, uncontended fiber access (1:1 contention)",
      "Committed bandwidth sized to requirement",
      "Static IP allocation and routing support",
      "Redundant / failover path design where available",
      "Performance visibility and escalation management",
      "Monthly availability and utilisation reporting",
    ],
    flag: "DIA contention ratio, committed bandwidth, availability, and any performance figures are operating intent — confirm deliverability and remove any uptime guarantee wording before publishing.",
  },
  {
    id: "managed",
    group: "Managed Services",
    icon: Activity,
    title: "Managed Network Operations",
    tagline: "Monitoring, escalation, and a single view of service.",
    summary:
      "We watch your network circuits, catch problems early, deal with the providers directly, and send you one combined report — so you manage results, not vendors.",
    value:
      "One team responsible for every provider, with full visibility and one monthly performance report.",
    who: ["Multi-vendor enterprises", "ISPs reducing ops burden", "Governance-driven organisations"],
    capabilities: [
      "Proactive monitoring and circuit visibility",
      "Incident detection and fault escalation",
      "Provider coordination and client communication",
      "Circuit utilisation, latency, and availability history",
      "Incident tracking and billing visibility where applicable",
      "Monthly SLA and performance reporting",
    ],
    flag: "Described as a monitoring-and-escalation operating model. 24/7 NOC / staffed coverage hours: confirm before publishing.",
  },
  {
    id: "professional",
    group: "Managed Services",
    icon: Settings2,
    title: "Professional Services",
    tagline: "Design, audit, and connectivity transformation.",
    summary:
      "We review, redesign, and upgrade your network setup — spotting gaps in your backup systems, negotiating with vendors on your behalf, and planning migrations.",
    value:
      "Independent advice that lowers risk and cost, without pushing you toward any one vendor's agenda.",
    who: ["Enterprises in transition", "Organisations reviewing contracts", "Teams modernising WAN"],
    capabilities: [
      "Network design, audit, and infrastructure assessment",
      "Redundancy gap analysis and cost-optimisation review",
      "Vendor negotiation support and carrier contract / SLA review",
      "Migration planning and provider transitions",
      "Capacity upgrades and MPLS-to-SD-WAN migration",
      "End-to-end connectivity transformation projects",
    ],
  },
  {
    id: "ipv4",
    group: "Address Services",
    icon: Boxes,
    title: "IPv4 Leasing & Address Brokerage",
    tagline: "Structured address-space sourcing and managed lease coordination.",
    summary:
      "We help you lease the IPv4 addresses you need, or earn from addresses you're not using — handling verification, paperwork, and ongoing management either way.",
    value:
      "One trusted go-between for IPv4 leasing, covering verification, documentation, and routing setup for both sides.",
    who: ["ISPs & hosting providers", "Cloud & platform operators", "Verified resource holders"],
    capabilities: [
      "IPv4 sourcing and lease coordination",
      "Resource-holder verification workflows",
      "LOA and authorization documentation coordination",
      "BGP readiness support",
      "RPKI / ROA coordination where applicable",
      "WHOIS and abuse contact alignment",
      "Lease renewal and termination coordination",
      "Responsible address-space stewardship",
    ],
    link: "/ipv4-leasing",
    flag: "IPv4 leasing, transfer, routing, RIR status, broker status, and policy-related claims require approval before public launch.",
  },
];
