import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import PageShell from "../components/layout/PageShell.jsx";
import InteriorHero from "../components/ui/InteriorHero.jsx";
import { ServicesVisual } from "../components/ui/HeroVisuals.jsx";
import Section from "../components/ui/Section.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import ReviewFlag from "../components/ui/ReviewFlag.jsx";
import CTA from "../components/ui/CTA.jsx";
import { SERVICES } from "../data/services.js";

const VALID = SERVICES.map((s) => s.id);

export default function Services() {
  const [params, setParams] = useSearchParams();
  const initial = VALID.includes(params.get("tab")) ? params.get("tab") : SERVICES[0].id;
  const [active, setActive] = useState(initial);

  // Sync tab when the ?tab= param changes (e.g. a dropdown click while
  // already on this page).
  useEffect(() => {
    const t = params.get("tab");
    if (t && VALID.includes(t) && t !== active) setActive(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const selectTab = (id) => {
    setActive(id);
    setParams({ tab: id }, { replace: true });
  };

  const reduce = useReducedMotion();
  const activeIndex = SERVICES.findIndex((s) => s.id === active);
  const svc = SERVICES[activeIndex];
  const Icon = svc.icon;
  const railRef = useRef(null);

  const scrollRail = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: reduce ? "auto" : "smooth" });
  };

  // Keep the active tab in view whenever it changes (click, ?tab= sync, etc.)
  useEffect(() => {
    const el = railRef.current?.querySelector(`#tab-${active}`);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active, reduce]);

  return (
    <PageShell seoKey="services">
      <InteriorHero
        eyebrow="Services"
        title="Connectivity, sourced and managed"
        accent="as one."
        sub="Six connected service lines — transit, inter-city links, cloud access, managed operations, advisory, and IPv4 leasing. All delivered through one vendor-neutral partner, so you deal with a single team, not six."
        actions={
          <>
            <Button to="/contact">Request Consultation</Button>
            <Button href="#services-explorer" variant="ghost">
              Explore Service Lines
            </Button>
          </>
        }
      >
        <ServicesVisual />
      </InteriorHero>

      {/* Service explorer — PAPER band (seam under the dark header). One
          vendor-neutral partner, six connected service lines: a premium tab
          rail (edge-faded, scroll-snap) selects the line; the panel below
          animates in with its detail + capabilities. */}
      <Section id="services-explorer" theme="paper" seam="top">
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow className="justify-center">Service Explorer</Eyebrow>
          <h2 className="m-0 text-[clamp(26px,3.6vw,40px)] font-semibold leading-[1.14] tracking-[-0.02em] text-balance text-ink-invert">
            Six connected service lines,{" "}
            <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
              one accountable partner.
            </span>
          </h2>
          <p className="mx-auto mt-4 text-[16.5px] leading-relaxed text-slate">
            Select a line to see what it covers, the business value, and who it helps — all
            sourced, coordinated, and managed through a single vendor-neutral team.
          </p>
        </div>

        {/* Tab rail — edge-faded horizontal scroller with scroll-snap + arrows.
            Side padding reserves a gutter for the arrow buttons so they never
            sit on top of the pills themselves. */}
        <div className="relative mt-10 px-0 sm:px-11">
          <div
            ref={railRef}
            role="tablist"
            aria-label="Service lines"
            className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s, i) => {
              const TabIcon = s.icon;
              const selected = active === s.id;
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(s.id)}
                  className={`group relative inline-flex min-h-[52px] shrink-0 snap-start items-center gap-2.5 whitespace-nowrap rounded-pill border px-[18px] py-3 text-[14.5px] font-semibold transition-colors duration-[320ms] ${
                    selected
                      ? "border-transparent text-ink-invert"
                      : "border-paper-line bg-paper-raised text-slate hover:-translate-y-0.5 hover:border-electric/40"
                  }`}
                >
                  {/* fluid indicator — a single shared element that flows from
                      the old tab to the new one (layoutId morph + spring). */}
                  {selected && (
                    <motion.span
                      aria-hidden="true"
                      layoutId="tab-fluid"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32, mass: 0.9 }
                      }
                      className="absolute inset-0 rounded-pill border border-electric bg-electric/[0.12] shadow-glow"
                    />
                  )}
                  <span
                    className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-bold tabular-nums transition-colors ${
                      selected
                        ? "border-electric/40 bg-electric/15 text-electric"
                        : "border-paper-line bg-paper-sunk text-slate-dim"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <TabIcon size={17} aria-hidden="true" className={`relative z-10 ${selected ? "text-electric" : "text-slate-dim"}`} />
                  <span className="relative z-10">{s.title}</span>
                </button>
              );
            })}
          </div>
          {/* fade edges — signal more content without a raw scrollbar */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-11 bg-gradient-to-r from-paper to-transparent sm:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-11 bg-gradient-to-l from-paper to-transparent sm:block" />

          {/* scroll arrows — sit in the reserved side gutter, never over the pills */}
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label="Scroll service tabs left"
            className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-paper-line bg-paper-raised text-slate shadow-paper transition-colors hover:border-electric/40 hover:text-electric sm:grid"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label="Scroll service tabs right"
            className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-paper-line bg-paper-raised text-slate shadow-paper transition-colors hover:border-electric/40 hover:text-electric sm:grid"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* active-line meta strip */}
        <div className="mt-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-dim">
          <span className="text-electric">{svc.group}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-paper-line" />
          <span className="tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Panel */}
        <motion.div
          key={svc.id}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          role="tabpanel"
          id={`panel-${svc.id}`}
          aria-labelledby={`tab-${svc.id}`}
          className="mt-6 grid grid-cols-1 items-start gap-14 lg:grid-cols-2"
        >
          <div>
            <span className="mb-[22px] grid h-[56px] w-[56px] place-items-center rounded-[14px] border border-electric/25 bg-electric/[0.08]">
              <Icon size={28} aria-hidden="true" className="text-electric" />
            </span>
            <h2 className="m-0 text-[clamp(26px,3.5vw,38px)] font-semibold tracking-[-0.02em] text-ink-invert">
              {svc.title}
            </h2>
            <p className="mt-2.5 text-[16px] font-medium text-electric">{svc.tagline}</p>
            <p className="mt-[18px] text-[16.5px] leading-relaxed text-slate">{svc.summary}</p>

            <div className="mt-[22px] rounded-xl border border-electric/20 bg-electric/[0.06] px-5 py-[18px]">
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-electric">
                Business value
              </p>
              <p className="m-0 text-[15px] leading-relaxed text-ink-invert">{svc.value}</p>
            </div>

            {svc.flag && <ReviewFlag>{svc.flag}</ReviewFlag>}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/contact">Discuss {svc.title}</Button>
              {svc.link && (
                <Button to={svc.link} variant="ghost" icon={ArrowUpRight}>
                  Learn more
                </Button>
              )}
            </div>
          </div>

          <div>
            <Card hover={false}>
              <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-electric">
                Key capabilities
              </p>
              {svc.capabilities.map((c, i) => (
                <div
                  key={c}
                  className={`flex items-start gap-3 py-[11px] ${
                    i < svc.capabilities.length - 1 ? "border-b border-paper-line" : ""
                  }`}
                >
                  <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
                  <span className="text-[14.5px] leading-snug text-ink-invert">{c}</span>
                </div>
              ))}
            </Card>

            <Card hover={false} className="mt-4">
              <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-dim">
                Who it helps
              </p>
              <div className="flex flex-wrap gap-2">
                {svc.who.map((w) => (
                  <span
                    key={w}
                    className="rounded-full border border-electric/20 bg-electric/[0.06] px-3.5 py-[7px] text-[13px] text-ink-invert"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </Section>

      <CTA />
    </PageShell>
  );
}
