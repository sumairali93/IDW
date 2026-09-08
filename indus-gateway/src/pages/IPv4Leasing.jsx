import {
  Check,
  Layers,
  ShieldAlert,
  Network,
  Search,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  Mail,
  HelpCircle,
} from "lucide-react";

import PageShell from "../components/layout/PageShell.jsx";
import InteriorHero from "../components/ui/InteriorHero.jsx";
import { IPv4Visual } from "../components/ui/HeroVisuals.jsx";
import Section from "../components/ui/Section.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import FAQAccordion from "../components/ui/FAQAccordion.jsx";
import CTA from "../components/ui/CTA.jsx";
import ProcessFlow from "../components/sections/ProcessFlow.jsx";
import IPv4Form from "../components/sections/IPv4Form.jsx";
import {
  IPV4_LESSEES,
  IPV4_LESSORS,
  IPV4_GOVERNANCE,
  IPV4_PROCESS,
  IPV4_FAQS,
  IPV4_DISCLAIMER,
  IPV4_BLOCKS,
  IPV4_AUDIENCES,
  IPV4_SCOPE,
  IPV4_COORDINATION,
  IPV4_GOVERNANCE_PILLARS,
} from "../data/ipv4Leasing.js";
import { SITE } from "../config.js";

const H2 = "m-0 text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink";
const H2L = "m-0 text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink-invert"; // paper-band heading

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

/* Audience card on the dark Buyer/Seller band — a directional glass panel.
 * `side="need"` (seekers, flow points INTO the coordination layer) or
 * `side="hold"` (holders, flow points into it from the other direction). The
 * icon header + directional chip + two-column capability grid make each side
 * read as one party feeding the shared layer, not a lone checklist. */
function AudienceCard({ data, icon: Icon, side }) {
  const need = side === "need";
  const Dir = need ? ArrowRight : ArrowLeft;
  return (
    <div className="group relative h-full overflow-hidden rounded-lg border border-glass-edge bg-glass-dark p-[clamp(20px,3vw,30px)] shadow-glass backdrop-blur-xl transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-electric/45">
      {/* top fibre hairline accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)] opacity-60"
      />
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] border border-electric/30 bg-electric/[0.1]">
          <Icon size={22} aria-hidden="true" className="text-electric" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 font-display text-[19px] font-semibold leading-snug text-ink">
            {data.title}
          </h3>
          <p className="mt-1 text-[13.5px] text-cyan">{data.subtitle}</p>
        </div>
      </div>

      {/* directional chip — which way this party relates to the layer */}
      <div className="mt-5 inline-flex items-center gap-2 rounded-pill border border-electric/25 bg-electric/[0.08] px-3.5 py-[7px] text-[12px] font-semibold uppercase tracking-[0.12em] text-grey">
        {need ? "Needs address space" : "Holds address space"}
        <Dir size={14} aria-hidden="true" className="text-electric" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-[11px] sm:grid-cols-2">
        {data.items.map((it) => (
          <div key={it} className="flex items-start gap-2.5">
            <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
            <span className="text-[14px] leading-snug text-grey">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* A thin party rail (top = holders, bottom = seekers) framing the coordination
 * plane in the Managed Intermediary Model — a glass-light chip on the paper band. */
function PartyRail({ label, note, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-paper-line bg-paper-sunk px-5 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border border-electric/25 bg-electric/[0.08]">
        <Icon size={17} aria-hidden="true" className="text-electric" />
      </span>
      <div className="min-w-0">
        <p className="m-0 font-display text-[14px] font-semibold leading-none text-ink-invert">{label}</p>
        <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.14em] text-slate-dim">{note}</p>
      </div>
    </div>
  );
}

/* Vertical fibre strand connecting a party rail to the coordination plane — a
 * faint electric base with a streaming cyan packet (reduced-motion gated). */
function PlaneLink() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-7 w-px">
      <span className="absolute inset-0 bg-electric/40" />
      <span className="fiber-packet-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-glow" />
    </div>
  );
}

export default function IPv4Leasing() {
  return (
    <PageShell seoKey="ipv4">
      <InteriorHero
        eyebrow="IPv4 Leasing & Address Brokerage"
        title="Structured IPv4 leasing for networks, platforms, and"
        accent="address holders."
        sub="Indus Gateway helps organisations lease, source, verify, and manage IPv4 address space — built for ISPs, hosting providers, cloud platforms, enterprises, and verified resource holders."
        actions={
          <>
            <Button href="#ipv4-enquiry">Request IPv4 Leasing Support</Button>
            <Button href="#ipv4-enquiry" variant="ghost">
              Discuss Address-Space Requirements
            </Button>
          </>
        }
      >
        <IPv4Visual />
      </InteriorHero>

      {/* Overview — PAPER band (seam under the dark header). Premium editorial
          two-column: a positioning headline + approved paragraph, the audiences
          that rely on IPv4, and the coordination scope on the left; an elevated
          address-block reference panel (CIDR sizes with relative prefix-scale
          bars) on the right — turning four flat tiles into a scannable
          address-space reference. */}
      <Section theme="paper" seam="top" className="overflow-hidden">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="m-0 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.14] tracking-[-0.02em] text-balance text-ink-invert">
              A finite resource, sourced and managed through{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                one accountable layer.
              </span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-slate">
              IPv4 address space remains a critical resource for ISPs, hosting providers, cloud
              platforms, data centres, VPN providers, content platforms, enterprise networks, and
              digital infrastructure operators. Indus Gateway supports structured sourcing,
              verification, documentation coordination, routing readiness, and ongoing lease
              management.
            </p>

            {/* who relies on IPv4 — audience chips */}
            <div className="mt-8">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-dim">
                Who relies on it
              </p>
              <div className="flex flex-wrap gap-2">
                {IPV4_AUDIENCES.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-pill border border-paper-line bg-paper-raised px-3.5 py-[7px] text-[13px] font-medium text-ink-invert shadow-paper"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-electric" />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* coordination scope — the managed layer, as a stepped rail */}
            <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2.5">
              {IPV4_SCOPE.map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="text-[13.5px] font-medium text-electric">{s}</span>
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-electric/40" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Address-block reference panel — relative prefix-scale bars. */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-8 h-52 w-52 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.1] blur-3xl"
              />
              <Card hover={false} className="relative overflow-hidden">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[11px] border border-electric/25 bg-electric/[0.08]">
                    <Network size={18} aria-hidden="true" className="text-electric" />
                  </span>
                  <div>
                    <p className="m-0 font-display text-[15px] font-semibold leading-none text-ink-invert">
                      Address-block reference
                    </p>
                    <p className="mt-1.5 text-[12px] leading-none text-slate-dim">
                      Common CIDR sizes — illustrative, not inventory
                    </p>
                  </div>
                </div>

                {IPV4_BLOCKS.map((b, i) => (
                  <div
                    key={b.size}
                    className={`py-[15px] ${
                      i < IPV4_BLOCKS.length - 1 ? "border-b border-paper-line" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[17px] font-semibold text-ink-invert">
                        {b.size}
                      </span>
                      <span className="text-[13.5px] font-medium text-slate">{b.hosts}</span>
                    </div>
                    {/* relative prefix-scale bar (256 → 2,048 addresses) */}
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-pill bg-paper-sunk">
                      <span
                        aria-hidden="true"
                        className="block h-full rounded-pill bg-[image:var(--gradient-aurora)]"
                        style={{ width: `${(256 << i) / 2048 * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 text-[12px] text-slate-dim">{b.note}</div>
                  </div>
                ))}
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Two audiences, one coordination layer — DARK band (seam over the paper
          overview). The section name is literal now: seekers and holders sit on
          either side, with the IGW hexagon coordination spine BETWEEN them, so
          the "one layer in the middle" idea is shown, not just stated. Fibre
          links stream from each side into the hub. */}
      <Section theme="dark" band seam="top" className="overflow-hidden">
        <div aria-hidden="true" className="net-grid-overlay pointer-events-none absolute inset-0" />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Two Audiences, One Coordination Layer</Eyebrow>
        </Reveal>
        <Reveal delay={0.06} className="relative mx-auto max-w-2xl text-center">
          <h2 className={H2}>
            Whether you need address space or{" "}
            <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
              hold it.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-relaxed text-grey">
            Both sides connect through the same accountable layer — Indus Gateway coordinates
            verification, documentation, routing readiness, and lifecycle between them.
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 items-stretch gap-6 pb-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:pb-10">
          <Reveal>
            <AudienceCard data={IPV4_LESSEES} icon={Search} side="need" />
          </Reveal>

          {/* central coordination spine — the IGW hub both sides feed into.
              A visible electric strand connects the cards THROUGH the hub:
              vertical when stacked (mobile), horizontal when side-by-side (lg).
              Labels are in normal flow on mobile (so they never overlap the
              next card) and absolute-below on lg (so they don't drag the hex
              off the horizontal line). */}
          <Reveal delay={0.08} className="flex items-center justify-center py-2 lg:py-0">
            <div className="relative flex flex-col items-center lg:block">
              {/* MOBILE connector — vertical, anchored to the whole cell so it
                  reaches BOTH cards: -top-6/-bottom-6 bleed exactly the row gap
                  (gap-6) into the space above and below. Runs behind the hex
                  (opaque centre) and label. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -bottom-6 left-1/2 w-px -translate-x-1/2 bg-electric/50 lg:hidden"
              />
              <span
                aria-hidden="true"
                className="fiber-packet-y pointer-events-none absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-glow lg:hidden"
              />

              <div className="relative grid place-items-center">
                {/* DESKTOP connector — horizontal, anchored to the hex so it stays
                    on the hex centreline: -left-8/-right-8 bleed exactly the
                    column gap (gap-8) to each card edge, never onto the cards. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-8 -right-8 top-1/2 hidden h-px -translate-y-1/2 bg-electric/50 lg:block"
                />
                <span
                  aria-hidden="true"
                  className="fiber-flow pointer-events-none absolute -left-8 -right-8 top-1/2 hidden h-[3px] -translate-y-1/2 lg:block"
                />

                <span
                  aria-hidden="true"
                  className="hub-ring pointer-events-none absolute h-24 w-24 rounded-full border border-electric/30"
                />
                <span
                  aria-hidden="true"
                  className="hub-ring hub-ring-2 pointer-events-none absolute h-24 w-24 rounded-full border border-cyan/25"
                />
                <div className="relative grid h-20 w-20 place-items-center">
                  <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
                  <span className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
                    <Layers size={26} aria-hidden="true" className="text-electric" />
                  </span>
                </div>
              </div>

              {/* labels — in flow on mobile; absolute-below on lg so the hex stays centred on the line */}
              <div className="relative z-10 mt-5 rounded-lg border border-electric/20 bg-navy-deep/80 px-3.5 py-2 shadow-glass backdrop-blur-sm lg:absolute lg:left-1/2 lg:top-full lg:mt-0 lg:-translate-x-1/2 lg:pt-3">
                <p className="whitespace-nowrap text-center font-display text-[13px] font-semibold leading-none text-ink">
                  Indus Gateway
                </p>
                <p className="mt-1.5 whitespace-nowrap text-center text-[11px] uppercase tracking-[0.16em] text-cyan">
                  Coordination layer
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <AudienceCard data={IPV4_LESSORS} icon={Warehouse} side="hold" />
          </Reveal>
        </div>
      </Section>

      {/* Managed intermediary model — PAPER band (seam over the dark split).
          A literal control-plane: the two parties are thin rails top and bottom,
          Indus Gateway is the active coordination plane BETWEEN them, exposing
          the five managed functions. Vertical fibre strands run holder → plane →
          seeker, so "the layer in the middle" is shown, not just stated. */}
      <Section theme="paper" seam="top" className="overflow-hidden">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Managed Intermediary Model</Eyebrow>
            <h2 className={`${H2L} text-balance`}>
              One accountable layer,{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                in the middle.
              </span>
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-slate">
              Indus Gateway acts as the managed coordination layer between IPv4 resource holders and
              organisations requiring address space — coordinating documentation, technical
              readiness, routing support, governance, and ongoing operational management.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-electric/20 bg-electric/[0.06] px-5 py-4">
              <Layers size={20} aria-hidden="true" className="shrink-0 text-electric" />
              <span className="text-[14.5px] leading-snug text-ink-invert">
                One accountable layer for verification, documentation, routing, and lifecycle.
              </span>
            </div>
          </Reveal>

          {/* Control-plane diagram */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.08] blur-3xl"
              />

              {/* top party rail — resource holders */}
              <PartyRail label="IPv4 Resource Holders" note="Hold address space" icon={Warehouse} />

              {/* vertical fibre strand: holders → plane */}
              <PlaneLink />

              {/* the coordination plane — Indus Gateway, the active middle layer */}
              <div className="relative overflow-hidden rounded-xl border border-electric/30 bg-paper-raised shadow-paper">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />
                <div className="flex items-center gap-3 border-b border-paper-line px-5 py-3.5">
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center">
                    <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
                    <span className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
                      <Layers size={16} aria-hidden="true" className="text-electric" />
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-display text-[14.5px] font-semibold leading-none text-ink-invert">
                      Indus Gateway
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-electric">
                      Coordination layer
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 divide-y divide-paper-line sm:grid-cols-2 sm:divide-y-0">
                  {IPV4_COORDINATION.map((c, i) => {
                    const Icon = c.icon;
                    const fullRow = i === IPV4_COORDINATION.length - 1 && IPV4_COORDINATION.length % 2 !== 0;
                    return (
                      <div
                        key={c.label}
                        className={[
                          "flex items-start gap-3 px-5 py-[15px]",
                          fullRow ? "sm:col-span-2" : "",
                          i % 2 === 0 && !fullRow ? "sm:border-r sm:border-paper-line" : "",
                          i >= 2 ? "sm:border-t sm:border-paper-line" : "",
                        ].join(" ")}
                      >
                        <Icon size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
                        <div className="min-w-0">
                          <p className="m-0 text-[14px] font-semibold leading-snug text-ink-invert">{c.label}</p>
                          <p className="mt-1 text-[12.5px] leading-snug text-slate-dim">{c.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* vertical fibre strand: plane → seekers */}
              <PlaneLink />

              {/* bottom party rail — organisations needing space */}
              <PartyRail label="Organisations Needing Space" note="Need address space" icon={Search} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Process — DARK band (seam over the paper intermediary model) */}
      <Section theme="dark" band seam="top">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Eyebrow className="justify-center">Process</Eyebrow>
          <h2 className={H2}>From requirement to ongoing management.</h2>
        </Reveal>
        <ProcessFlow steps={IPV4_PROCESS} />
      </Section>

      {/* Technical governance — PAPER band (seam over the dark process). The
          headline's three pillars (policy-aware · registry-clean · route-ready)
          become the structure: three ledger columns, each pillar heading its
          own stack of governed controls with a one-line scope note. Turns a flat
          7-tile grid into a readiness ledger that mirrors the promise. */}
      <Section theme="paper" seam="top">
        <div className="mx-auto max-w-[680px] text-center">
          <Reveal>
            <Eyebrow className="justify-center">Technical Governance</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={`${H2L} text-balance`}>
              Policy-aware, registry-clean,{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                route-ready.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 text-[16.5px] leading-relaxed text-slate">
              Every arrangement is coordinated against three governance pillars — so address space is
              handled cleanly, authorized correctly, and ready to route.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {IPV4_GOVERNANCE_PILLARS.map((pillar, pi) => {
            const controls = IPV4_GOVERNANCE.filter((g) => g.pillar === pillar);
            return (
              <Reveal key={pillar} delay={pi * 0.08}>
                <div className="relative h-full overflow-hidden rounded-xl border border-paper-line bg-paper-raised shadow-paper">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)] opacity-70" />
                  <div className="flex items-center gap-3 border-b border-paper-line px-5 py-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-electric/30 bg-electric/[0.1] text-[11px] font-bold tabular-nums text-electric">
                      {`0${pi + 1}`}
                    </span>
                    <p className="m-0 font-display text-[15px] font-semibold leading-none text-ink-invert">
                      {pillar}
                    </p>
                  </div>
                  <div className="divide-y divide-paper-line">
                    {controls.map((g) => {
                      const Icon = g.icon;
                      return (
                        <div key={g.label} className="flex items-start gap-3 px-5 py-[15px]">
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-electric/20 bg-electric/[0.06]">
                            <Icon size={16} aria-hidden="true" className="text-electric" />
                          </span>
                          <div className="min-w-0">
                            <p className="m-0 text-[14px] font-semibold leading-snug text-ink-invert">{g.label}</p>
                            <p className="mt-1 text-[12.5px] leading-snug text-slate-dim">{g.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* IPv4 enquiry form — DARK band (seam over the paper governance). The
          left rail restates the dual-audience promise (need ⇄ hold) and the
          coordinated response path, with a direct contact fallback; the form is
          a premium glass console. Both sides read as one accountable intake. */}
      <Section id="ipv4-enquiry" theme="dark" band seam="top" className="overflow-hidden">
        <div aria-hidden="true" className="header-glow pointer-events-none absolute inset-0" />
        <div className="relative grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>IPv4 Enquiry</Eyebrow>
            <h2 className={`${H2} text-balance`}>
              Tell us what you need —{" "}
              <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                or what you hold.
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-grey">
              Whether you are sourcing IPv4 capacity or have unused address space to lease, send the
              details and we will coordinate verification, documentation, and routing readiness.
            </p>

            {/* the two paths into the same intake */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Search, title: "You need space", note: "Sourcing, verification, routing" },
                { icon: Warehouse, title: "You hold space", note: "Screening, documentation, lifecycle" },
              ].map((p) => (
                <div key={p.title} className="flex items-start gap-3 rounded-xl border border-glass-edge bg-glass-dark px-4 py-3.5 shadow-glass backdrop-blur-xl">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border border-electric/25 bg-electric/[0.08]">
                    <p.icon size={17} aria-hidden="true" className="text-electric" />
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-[14px] font-semibold leading-snug text-ink">{p.title}</p>
                    <p className="mt-1 text-[12.5px] leading-snug text-grey">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* coordinated response path — restates the process, no timing claim */}
            <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2">
              {["Verify", "Coordinate", "Route", "Manage"].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2.5">
                  <span
                    className="fiber-text-shimmer text-[13.5px] font-medium"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    {s}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight size={14} aria-hidden="true" className="text-electric/50" />
                  )}
                </div>
              ))}
            </div>

            {/* direct-contact fallback */}
            <a
              href={`mailto:${SITE.email}`}
              className="mt-7 inline-flex items-center gap-2.5 text-[14px] text-grey transition-colors hover:text-electric"
            >
              <Mail size={16} aria-hidden="true" className="text-electric" />
              Prefer email? {SITE.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <IPv4Form />
          </Reveal>
        </div>
      </Section>

      {/* FAQ — PAPER band (seam over the dark enquiry form). Premium two-column:
          a sticky left rail (heading, framing line, question count + direct
          contact) and the animated disclosure list on the right, so the section
          reads as a support console rather than a centred FAQ block. */}
      <Section theme="paper" seam="top">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* left rail — sticky on desktop */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className={`${H2L} text-balance`}>
                IPv4 leasing,{" "}
                <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                  answered.
                </span>
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-slate">
                Common questions on eligibility, verification, routing, and how leasing differs
                from transfer — coordinated through one accountable layer.
              </p>
            </Reveal>

            {/* question count + direct-contact prompt */}
            <Reveal delay={0.08}>
              <div className="mt-8 rounded-2xl border border-paper-line bg-paper-raised p-6 shadow-paper">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center">
                    <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
                    <span className="absolute inset-[2px] grid place-items-center bg-paper-raised" style={{ clipPath: HEX }}>
                      <HelpCircle size={18} aria-hidden="true" className="text-electric" />
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 font-display text-[15px] font-semibold leading-none text-ink-invert">
                      Still have a question?
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-none text-slate-dim">
                      {IPV4_FAQS.length} answered below — or ask us directly
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-5 inline-flex items-center gap-2.5 text-[14px] font-medium text-electric transition-colors hover:text-blue"
                >
                  <Mail size={16} aria-hidden="true" />
                  {SITE.email}
                </a>
              </div>
            </Reveal>
          </div>

          {/* right — animated disclosure list */}
          <Reveal delay={0.1}>
            <FAQAccordion items={IPV4_FAQS} />
          </Reveal>
        </div>

        {/* Compliance disclaimer — electric-toned notice (no off-brand amber) */}
        <Reveal>
          <div className="mt-12 flex items-start gap-3.5 rounded-2xl border border-electric/25 bg-electric/[0.06] px-6 py-5">
            <ShieldAlert size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
            <div>
              <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-electric">
                Compliance
              </p>
              <p className="m-0 text-[14px] leading-relaxed text-slate">{IPV4_DISCLAIMER}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTA
        title="Lease, source, or monetise IPv4 — with one coordination partner."
        body="Tell us whether you need address space or hold unused capacity. We coordinate verification, documentation, routing readiness, and lifecycle management."
        primaryLabel="Request IPv4 Leasing Support"
      />
    </PageShell>
  );
}
