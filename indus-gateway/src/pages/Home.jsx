import { Link } from "react-router-dom";
import { ArrowUpRight, Boxes, Check, ShieldCheck, Scale, Clock, Mail } from "lucide-react";

import PageShell from "../components/layout/PageShell.jsx";
import Section from "../components/ui/Section.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { BandThemeContext } from "../components/ui/theme.js";
import Hero from "../components/sections/Hero.jsx";
import TrustStrip from "../components/sections/TrustStrip.jsx";
import ProblemStatement from "../components/sections/ProblemStatement.jsx";
import HowWeWork from "../components/sections/HowWeWork.jsx";
import LeadForm from "../components/sections/LeadForm.jsx";
import Governance from "../components/sections/Governance.jsx";

import { SERVICES } from "../data/services.js";
import { USP } from "../data/usp.js";
import { INDUSTRIES } from "../data/industries.js";
import { SITE } from "../config.js";

const CTA_ASSURANCES = [
  { icon: Scale, text: "Vendor-neutral advice — no carrier bias" },
  { icon: ShieldCheck, text: "One accountable partner, one SLA framework" },
  { icon: Clock, text: "A tailored options brief, not a sales pitch" },
];

const H2 = "m-0 text-[clamp(28px,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink";
const H2L = "m-0 text-[clamp(28px,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink-invert"; // paper-band heading
const ipv4 = SERVICES.find((s) => s.id === "ipv4");
// Bento feature tile = lead managed service; the rest fill the smaller cells.
const serviceFeature = SERVICES.find((s) => s.id === "managed") || SERVICES[0];
const serviceRest = SERVICES.filter((s) => s.id !== serviceFeature.id);
// Progressive blue tints (light → deeper) for the Service Lines cards, one
// shade per box, Transit Aggregation through IPv4 Leasing.
const SERVICE_TINTS = [
  "rgba(0, 174, 239, 0.05)",
  "rgba(0, 174, 239, 0.09)",
  "rgba(0, 174, 239, 0.13)",
  "rgba(0, 174, 239, 0.17)",
  "rgba(0, 174, 239, 0.21)",
  "rgba(0, 174, 239, 0.26)",
];

/*
 * Home — rebuilt to the 9-section flow agreed with marketing review
 * (Hero → Problem Statement → Services → How We Work → USP →
 * Industries → Value Additions (IPv4) → Governance → CTA).
 * Partner Ecosystem (logos) intentionally omitted: no named
 * partners are confirmed yet (see config.js APPROVAL_NOTES).
 */
export default function Home() {
  return (
    <PageShell seoKey="home">
      {/* 1. Hero */}
      <Hero />

      {/* Trust strip — provider categories we aggregate */}
      <TrustStrip />

      {/* 2. Problem Statement — PAPER band (seam under the dark trust strip) */}
      <Section theme="paper" seam="top">
        <ProblemStatement />
      </Section>

      {/* 3. Services (What we do) — PAPER band, BENTO grid (§8.3).
          Shares the light zone with Problem Statement above; a paper-line
          hairline divides the two same-band sections (premium light↔light rule). */}
      <Section theme="paper" className="border-t border-paper-line">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={H2L}>Comprehensive Connectivity &amp; Managed Services</h2>
          </Reveal>
        </div>
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[1fr]">
          {/* Feature tile — lead service, spans 2×2 on desktop */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <Link
              to={serviceFeature.link || `/services?tab=${serviceFeature.id}`}
              className="group block h-full"
            >
              <Card variant="image" className="relative min-h-[340px] lg:min-h-full">
                <div aria-hidden="true" className="fiber-glow absolute inset-0 opacity-70" />
                <div aria-hidden="true" className="net-grid-overlay absolute inset-0" />
                {/* oversized watermark fills the upper void */}
                <serviceFeature.icon
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-6 h-[220px] w-[220px] text-electric/[0.07]"
                  strokeWidth={1}
                />
                {/* scrim for text legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/20"
                />
                <div className="relative flex h-full flex-col p-[clamp(24px,3vw,36px)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[13px] border border-glass-edge bg-glass-dark backdrop-blur-xl">
                      <serviceFeature.icon size={26} aria-hidden="true" className="text-electric" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">
                      {serviceFeature.group}
                    </span>
                  </div>

                  <div className="mt-auto pt-8">
                    <h3 className="m-0 mb-2.5 font-display text-[clamp(22px,2.6vw,28px)] font-semibold leading-[1.15] text-ink">
                      {serviceFeature.title}
                    </h3>
                    <p className="m-0 max-w-[460px] text-[14.5px] leading-relaxed text-grey">
                      {serviceFeature.value}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {serviceFeature.capabilities.slice(0, 3).map((c) => (
                        <li
                          key={c}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-glass-dark px-3 py-1.5 text-[12px] font-medium text-grey backdrop-blur-xl"
                        >
                          <Check size={12} aria-hidden="true" className="shrink-0 text-electric" />
                          {c.split(/[—-]| and | for /)[0].trim()}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-electric">
                      Learn More
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-[--dur-base] ease-[--ease-out-soft] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </Reveal>

          {/* Remaining service cards */}
          {serviceRest.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link to={s.link || `/services?tab=${s.id}`} className="group block h-full">
                  <Card
                    className="flex flex-col"
                    style={{ background: SERVICE_TINTS[i % SERVICE_TINTS.length] }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[11px] border border-electric/25 bg-electric/[0.08] transition-colors duration-[--dur-base] group-hover:bg-electric/[0.14]">
                        <Icon size={22} aria-hidden="true" className="text-electric" />
                      </span>
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-dim">
                        {s.group}
                      </span>
                    </div>
                    <h3 className="m-0 mb-2 mt-[18px] font-display text-[19px] font-semibold leading-tight text-ink-invert">
                      {s.title}
                    </h3>
                    <p className="m-0 text-[14.5px] leading-relaxed text-slate">{s.tagline}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-electric">
                      Learn More
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-[--dur-base] ease-[--ease-out-soft] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            );
          })}

          {/* View-all tile — fills the trailing bento cells */}
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <Card className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="m-0 font-display text-[18px] font-semibold text-ink-invert">
                  Explore the full service portfolio
                </h3>
                <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-slate">
                  Connectivity, managed operations, and address services — coordinated as one.
                </p>
              </div>
              <Button to="/services" variant="outline" icon={ArrowUpRight} className="shrink-0">
                View all
              </Button>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 4. How We Work — DARK (seam over the paper Services band) */}
      <Section theme="dark" band seam="top">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">How We Work</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={H2}>A clear process, start to finish.</h2>
          </Reveal>
        </div>
        <div className="mt-11">
          <HowWeWork />
        </div>
      </Section>

      {/* 5. USP (Why clients choose IG) — PAPER band */}
      <Section theme="paper" seam="top">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Why Indus Gateway</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={H2L}>Why Clients Choose Indus Gateway</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
              One neutral gateway to the whole market — so you get independent advice,
              aggregated pricing power, and a single accountable partner instead of a
              tangle of carrier relationships.
            </p>
          </Reveal>
        </div>
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-3">
          {USP.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.06} className="h-full">
                {/* aurora border wrapper — the accent that used to be a top-only
                    bar now runs the full edge of the box (site-wide gradient) */}
                <div
                  className="h-full rounded-[22px] p-px shadow-glass transition-shadow duration-[--dur-base] hover:shadow-card"
                  style={{ background: "var(--gradient-aurora)" }}
                >
                  <Card
                    hover={false}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[21px]"
                    style={{ borderColor: "transparent" }}
                  >
                    {/* aurora corner glow — futuristic depth on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/[0.07] opacity-0 blur-2xl transition-opacity duration-[--dur-slow] group-hover:opacity-100"
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-[14px] border border-electric/20 bg-electric/[0.08] transition-[border-color,background-color] duration-[--dur-base] group-hover:border-electric/40 group-hover:bg-electric/[0.14]">
                        <Icon size={24} aria-hidden="true" className="text-electric" />
                      </span>
                      <span className="font-display text-[34px] font-semibold leading-none tracking-tight text-slate/15 transition-colors duration-[--dur-base] group-hover:text-electric/30">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="relative mt-5 border-t border-paper-line pt-5">
                      <h3 className="m-0 mb-2 font-display text-[18px] font-semibold text-ink-invert">
                        {d.title}
                      </h3>
                      <p className="m-0 text-[14px] leading-relaxed text-slate">{d.text}</p>
                    </div>
                  </Card>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 6. Industries (Who we serve) — DARK (seam over the paper USP band) */}
      <Section theme="dark" band seam="top">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Who We Serve</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={H2}>Industries</h2>
          </Reveal>
        </div>
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.06} className="h-full">
                <div className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-xl border border-glass-edge bg-glass-dark shadow-glass backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-[--dur-base] ease-[--ease-spring] hover:-translate-y-1 hover:border-electric/45 hover:shadow-glow">
                  <div
                    aria-hidden="true"
                    className="fiber-glow absolute inset-0 opacity-0 transition-opacity duration-[--dur-slow] group-hover:opacity-60"
                  />
                  <div aria-hidden="true" className="net-grid-overlay absolute inset-0 opacity-40" />
                  {/* ghost index — nodal reference */}
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-4 font-display text-[42px] font-semibold leading-none tracking-tight text-ink/[0.06] transition-colors duration-[--dur-base] group-hover:text-electric/20"
                  >
                    0{i + 1}
                  </span>

                  <div className="relative flex h-full flex-col p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-[13px] border border-glass-edge bg-navy-deep/40 backdrop-blur-xl transition-colors duration-[--dur-base] group-hover:border-electric/40">
                      <Icon size={22} aria-hidden="true" className="text-electric" />
                    </span>
                    <h3 className="m-0 mb-1.5 mt-auto pt-8 font-display text-[17px] font-semibold text-ink">
                      {d.title}
                    </h3>
                    <p className="m-0 text-[13px] leading-relaxed text-grey">{d.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-electric">
                      View solutions
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform duration-[--dur-base] ease-[--ease-out-soft] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                  {/* fibre accent seam at the base — lights up on hover */}
                  <span
                    aria-hidden="true"
                    className="aurora-seam absolute inset-x-0 bottom-0 opacity-25 transition-opacity duration-[--dur-base] group-hover:opacity-70"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 7. Value Additions — IPv4 Leasing highlight — AURORA PANEL, light variant.
          BandThemeContext is switched to "paper" for everything inside so
          Eyebrow/Button/etc pick up their light-band colours automatically. */}
      <Section theme="dark">
        <Reveal>
          {/* Aurora border via gradient padding wrapper → inner light panel */}
          <div className="rounded-2xl bg-[image:var(--gradient-aurora)] p-px shadow-glass">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-paper p-[clamp(32px,5vw,56px)]">
              <div aria-hidden="true" className="net-grid-overlay absolute inset-0 opacity-30" />
              <BandThemeContext.Provider value="paper">
                <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
                  <div>
                    <Eyebrow>IPv4 Leasing &amp; Address Brokerage</Eyebrow>
                    <h2 className={H2L}>Lease, source, or monetise IPv4 — with one coordination partner.</h2>
                    <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-slate">
                      {ipv4.summary}
                    </p>
                    {/* dual-flow: the brokerage sits between demand and supply.
                        Vertical (arrows point down) on mobile; horizontal on sm+. */}
                    <div className="mt-7 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                      <span className="inline-flex items-center gap-2 rounded-pill border border-paper-line bg-paper-sunk px-4 py-2 text-[13px] font-medium text-ink-invert">
                        <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_var(--color-electric)]" aria-hidden="true" />
                        Need addresses
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" className="ml-2.5 rotate-[135deg] text-electric sm:ml-0 sm:rotate-45" />
                      <span className="inline-flex items-center gap-2 rounded-pill border border-electric/40 bg-electric/[0.08] px-4 py-2 text-[13px] font-semibold text-ink-invert">
                        Indus Gateway
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" className="ml-2.5 rotate-[135deg] text-electric sm:ml-0" />
                      <span className="inline-flex items-center gap-2 rounded-pill border border-paper-line bg-paper-sunk px-4 py-2 text-[13px] font-medium text-ink-invert">
                        <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_var(--color-electric)]" aria-hidden="true" />
                        Hold unused space
                      </span>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3.5">
                      <Button to="/ipv4-leasing">Explore IPv4 Leasing</Button>
                      <Button to="/contact" variant="ghost" icon={ArrowUpRight}>
                        Request Support
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-paper-line bg-paper-raised shadow-paper">
                    <div className="flex items-center gap-2.5 border-b border-paper-line bg-paper-sunk px-5 py-3.5">
                      <Boxes size={18} aria-hidden="true" className="text-electric" />
                      <span className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-electric">
                        What we coordinate
                      </span>
                    </div>
                    <ul className="m-0 list-none p-5">
                      {ipv4.capabilities.slice(0, 5).map((c) => (
                        <li key={c} className="flex items-start gap-2.5 border-b border-paper-line py-2.5 last:border-0">
                          <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-electric/[0.14]">
                            <Check size={11} aria-hidden="true" className="text-electric" />
                          </span>
                          <span className="text-[13.5px] leading-snug text-ink-invert">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BandThemeContext.Provider>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 8. Governance & Compliance */}
      <Governance />

      {/* 9. Final CTA + inline lead capture — AURORA PANEL (§8.10) */}
      <Section theme="dark">
        <Reveal>
          <div className="rounded-2xl bg-[image:var(--gradient-aurora)] p-px shadow-glass">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-to-br from-blue-deep to-navy p-[clamp(32px,5vw,56px)]">
              <span
                aria-hidden="true"
                className="net-grid-overlay pointer-events-none absolute inset-0 opacity-25"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-electric/[0.12] blur-3xl"
              />
              <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                  <Eyebrow>Let&rsquo;s Talk</Eyebrow>
                  <h2 className={H2}>Ready to Simplify Your Connectivity?</h2>
                  <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-grey">
                    Tell us what you&rsquo;re trying to achieve. We&rsquo;ll bring the options, the
                    comparison, and a single point of accountability — with no vendor bias.
                  </p>

                  <ul className="mt-7 flex flex-col gap-3.5">
                    {CTA_ASSURANCES.map((a) => {
                      const Icon = a.icon;
                      return (
                        <li key={a.text} className="flex items-center gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-electric/20 bg-electric/[0.10]">
                            <Icon size={16} aria-hidden="true" className="text-electric" />
                          </span>
                          <span className="text-[14.5px] leading-snug text-grey">{a.text}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Button to="/services" variant="ghost" icon={ArrowUpRight}>
                      Explore Services
                    </Button>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="group inline-flex items-center gap-2 text-[14px] font-medium text-grey transition-colors hover:text-electric"
                    >
                      <Mail size={16} aria-hidden="true" className="text-electric" />
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
