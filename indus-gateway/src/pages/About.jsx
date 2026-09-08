import { Fragment } from "react";
import {
  ShieldCheck,
  Scale,
  Layers,
  Workflow,
  GitBranch,
  MapPin,
  Plug,
  Globe2,
  Building2,
  Server,
} from "lucide-react";

import PageShell from "../components/layout/PageShell.jsx";
import AboutHero from "../components/sections/AboutHero.jsx";
import Section from "../components/ui/Section.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import ReviewFlag from "../components/ui/ReviewFlag.jsx";
import CTA from "../components/ui/CTA.jsx";

const H2 = "m-0 text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink";

const BLOCKS = [
  { icon: ShieldCheck, t: "Pakistan-registered technology company", d: "Indus Gateway (Private) Limited is registered with SECP and operates under Pakistan's corporate and regulatory rules." },
  { icon: Scale, t: "Vendor-neutral by design", d: "We're not tied to any single carrier or platform. Our recommendations follow your needs, not one provider's sales targets." },
  { icon: Layers, t: "No infrastructure of our own", d: "We don't own carrier infrastructure. We source it, coordinate it, and manage it across providers on your behalf." },
  { icon: Workflow, t: "Managed service capabilities", d: "Procurement, setup coordination, monitoring, escalation, and reporting — all delivered as one service." },
  { icon: GitBranch, t: "Technical expertise", d: "Routing and BGP knowledge, network design, backup planning, and commercial comparison, all in one team." },
  { icon: MapPin, t: "Local accountability", d: "One accountable point of contact in the local market, with a good understanding of local regulations." },
];

const GLANCE = [
  [Scale, "Model", "Vendor-neutral, no infrastructure of our own"],
  [Workflow, "Roles", "Connectivity aggregator and managed intermediary"],
  [MapPin, "Focus", "Pakistan market and inter-city connectivity"],
  [ShieldCheck, "Approach", "Regulation-aware, locally accountable"],
];

// Identity markers — the three facts that define the business idea.
const IDENTITY = [
  { icon: Building2, k: "Registered", v: "SECP, Pakistan" },
  { icon: Scale, k: "Neutrality", v: "No carrier ties" },
  { icon: Server, k: "Infrastructure", v: "Sourced, not owned" },
];

const GOVERNANCE = [
  {
    icon: GitBranch,
    t: "Routing registry hygiene & BGP management",
    d: "Accurate IRR records and disciplined BGP policy, so your prefixes are seen and trusted across the global routing table.",
  },
  {
    icon: ShieldCheck,
    t: "RPKI route-origin authorization",
    d: "Cryptographically signed ROAs that prevent route hijacks and keep origin validation clean.",
  },
  {
    icon: Plug,
    t: "Peering readiness & interconnection",
    d: "Interconnection and peering prepared to community norms, so traffic takes the shortest, most resilient path.",
  },
  {
    icon: Globe2,
    t: "Responsible address-space stewardship",
    d: "Internet number resources managed to regional-registry policy — allocation, documentation, and lifecycle.",
  },
];

export default function About() {
  return (
    <PageShell seoKey="about">
      <AboutHero />

      {/* Company overview — PAPER band (seam under the dark header). Premium
          editorial two-column: the positioning statement + identity markers on
          the left; an elevated "at a glance" panel that frames the core business
          idea (demand → IGW → supply) on the right. */}
      <Section theme="paper" seam="top">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Company Overview</Eyebrow>
            <h2 className="m-0 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.14] tracking-[-0.02em] text-balance text-ink-invert">
              The accountable layer between the networks you need and the providers who{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                supply them.
              </span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-slate">
              Indus Gateway is a Pakistan-registered technology company working as a vendor-neutral
              network intermediary and connectivity aggregator. We sit between organisations that
              need internet and network connectivity and the providers that supply it — connectivity,
              cloud access, interconnection, bandwidth, and related services.
            </p>
            <p className="mt-[18px] text-[17px] leading-[1.75] text-slate">
              We don't own physical infrastructure. Instead, we handle provider selection,
              technical advice, procurement, routing expertise, monitoring, and performance
              reporting — so you get simplified vendor management through one accountable
              partner.
            </p>

            {/* Identity markers — the three facts that define the model */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {IDENTITY.map(({ icon: Icon, k, v }) => (
                <div
                  key={k}
                  className="rounded-xl border border-paper-line bg-paper-raised px-4 py-[15px] shadow-paper"
                >
                  <span className="mb-3 grid h-9 w-9 place-items-center rounded-[10px] border border-electric/25 bg-electric/[0.08]">
                    <Icon size={17} aria-hidden="true" className="text-electric" />
                  </span>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-dim">
                    {k}
                  </div>
                  <div className="mt-1 text-[14.5px] font-semibold leading-snug text-ink-invert">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* At-a-glance — elevated panel with a subtle aurora wash + the core
              demand → IGW → supply flow, then the fact rows. */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-8 h-52 w-52 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.1] blur-3xl"
              />
              <Card hover={false} className="relative overflow-hidden">
                {/* core business idea, as a compact flow */}
                <div className="flex items-center gap-2 rounded-xl border border-paper-line bg-paper-sunk px-4 py-3.5">
                  {[
                    { icon: Building2, l: "Who needs it" },
                    { icon: Layers, l: "Indus Gateway" },
                    { icon: Server, l: "Who supplies it" },
                  ].map(({ icon: Icon, l }, i, arr) => (
                    <Fragment key={l}>
                      <div className="flex shrink-0 flex-col items-center gap-1.5 text-center">
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-[10px] border ${
                            i === 1
                              ? "border-electric/40 bg-electric/[0.12]"
                              : "border-paper-line bg-paper-raised"
                          }`}
                        >
                          <Icon size={16} aria-hidden="true" className="text-electric" />
                        </span>
                        <span className="text-[10.5px] font-medium leading-tight text-slate">
                          {l}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" className="h-px flex-1 bg-electric/30" />
                      )}
                    </Fragment>
                  ))}
                </div>

                <p className="mb-[18px] mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-electric">
                  At a glance
                </p>
                {GLANCE.map(([Icon, k, v], i) => (
                  <div
                    key={k}
                    className={`flex items-start gap-3 py-[13px] ${
                      i < GLANCE.length - 1 ? "border-b border-paper-line" : ""
                    }`}
                  >
                    <Icon size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
                    <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <span className="text-[13.5px] text-slate-dim">{k}</span>
                      <span className="text-right text-[13.5px] font-medium text-ink-invert">{v}</span>
                    </div>
                  </div>
                ))}
                <ReviewFlag>
                  SECP registration reference, service-line authorizations, and regulatory
                  requirements to be confirmed before publication.
                </ReviewFlag>
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Differentiator blocks — PAPER band (continues the light rhythm) */}
      <Section theme="paper" className="pt-0">
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.t} delay={i * 0.05}>
                <Card>
                  <span className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-[11px] border border-electric/25 bg-electric/[0.08]">
                    <Icon size={22} aria-hidden="true" className="text-electric" />
                  </span>
                  <h3 className="m-0 mb-2 font-display text-[17px] font-semibold text-ink-invert">
                    {b.t}
                  </h3>
                  <p className="m-0 text-[14px] leading-relaxed text-slate">{b.d}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Network Governance — DARK band (seam over the paper blocks). Premium
          layout: ambient net-grid + aurora wash, a left narrative column with
          community-standard chips, and a right column of richer pillar cards
          (icon + title + description) that read as the technical backbone. */}
      <Section theme="dark" band seam="top" className="overflow-hidden">
        <div aria-hidden="true" className="net-grid-overlay pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.08] blur-3xl"
        />
        <div className="relative grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Network Governance</Eyebrow>
            <h2 className={H2}>
              Routing done properly, resources managed{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                responsibly.
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-grey">
              Good connectivity depends on disciplined routing. Our technical work covers internet
              number resource management, keeping routing registries accurate, BGP routing,
              peering readiness, and RPKI route-origin authorization — following the practices set
              by the regional internet community.
            </p>

            {/* community-standard chips — level-only, approval-safe */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["IRR-accurate", "RPKI-signed", "Peering-ready", "Policy-aware"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-pill border border-electric/25 bg-electric/[0.08] px-3.5 py-[7px] text-[12.5px] font-medium text-grey"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  {c}
                </span>
              ))}
            </div>
            <ReviewFlag>
              Internet number resource management and APNIC-related status: confirm before
              publishing.
            </ReviewFlag>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {GOVERNANCE.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.t}
                    className="group relative overflow-hidden rounded-xl border border-glass-edge bg-glass-dark p-5 shadow-glass backdrop-blur-xl transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-electric/45"
                  >
                    {/* top fibre hairline accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)] opacity-60"
                    />
                    <span className="grid h-[42px] w-[42px] place-items-center rounded-[11px] border border-electric/30 bg-electric/[0.1]">
                      <Icon size={20} aria-hidden="true" className="text-electric" />
                    </span>
                    <h3 className="mb-1.5 mt-4 font-display text-[15.5px] font-semibold leading-snug text-ink">
                      {g.t}
                    </h3>
                    <p className="m-0 text-[13.5px] leading-relaxed text-grey">{g.d}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Section>

      <CTA />
    </PageShell>
  );
}
