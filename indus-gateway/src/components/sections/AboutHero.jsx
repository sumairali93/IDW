import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  RadioTower,
  Landmark,
  Cloud,
  Network,
  Cable,
  Share2,
  Boxes,
  Scale,
  MapPin,
  Layers,
} from "lucide-react";
import Button from "../ui/Button.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";

/*
 * AboutHero — the flagship interior hero for /about. Services, IPv4, and
 * Contact share the lighter InteriorHero shell + a per-page HeroVisuals graphic;
 * About keeps this richer bespoke version. The right-column visual makes IGW's positioning the
 * hero of the composition: MANY organisations that need connectivity (top) fan
 * IN to the ONE glowing Indus Gateway hexagon (centre), which fans OUT to the
 * MANY providers that supply it (bottom) — "many → one → many". The hexagon
 * hub, pulse rings, and streaming fibre fans reuse the homepage ConnectivityHub
 * language (.fiber-link-base/.fiber-link-flow/.fiber-node/.hub-ring), so the
 * two signature moments feel like one system.
 *
 * Strictly token-driven — electric (primary), cyan (glow), navy surfaces, the
 * aurora gradient. No other hues. All motion is reduced-motion gated via the
 * existing utilities + Framer's useReducedMotion; every decorative node is
 * aria-hidden. Copy is the approved About positioning; category chips are
 * level-only (no named carriers/partners) — approval-safe.
 */

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

const DEMAND = [
  { icon: Building2, label: "Enterprises" },
  { icon: RadioTower, label: "ISPs & Carriers" },
  { icon: Landmark, label: "Government" },
  { icon: Cloud, label: "Cloud-Native" },
];

const SUPPLY = [
  { icon: Network, label: "Tier-1 / Tier-2" },
  { icon: Cable, label: "Fiber Operators" },
  { icon: Share2, label: "IXPs" },
  { icon: Boxes, label: "CDN Partners" },
];

const PILLARS = [
  { icon: Scale, label: "Vendor-neutral" },
  { icon: Layers, label: "No infrastructure of our own" },
  { icon: MapPin, label: "Locally accountable" },
];

// Four evenly spread lanes across the fan (as % of width) — where fibres meet
// the demand/supply panels. Matches the viewBox x's 30/110/190/270 of 300.
const LANES = [10, 36.7, 63.3, 90];

function ChipRow({ items }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-panel/60 px-2.5 py-1 text-[11.5px] font-medium text-grey backdrop-blur-sm"
        >
          <Icon size={13} aria-hidden="true" className="text-electric" />
          {label}
        </span>
      ))}
    </div>
  );
}

/*
 * FanZone — the "many ⇄ one" fibre fan. dir="in": four lanes at the top
 * converge to a single point at the bottom (demand → hub). dir="out": one
 * point at the top diverges to four lanes at the bottom (hub → supply). Each
 * lane is a faint static base strand plus a streaming cyan packet-dash, with a
 * light node where every lane meets a panel and where all four meet the hub.
 */
function FanZone({ dir = "in" }) {
  const cx = 150;
  const laneX = [30, 110, 190, 270];
  const paths = laneX.map((x) =>
    dir === "in"
      ? `M ${x} 4 C ${x} 40 ${cx} 24 ${cx} 66`
      : `M ${cx} 4 C ${cx} 42 ${x} 26 ${x} 66`
  );
  const hubAtBottom = dir === "in";

  return (
    <div className="relative h-14 w-full">
      <svg
        viewBox="0 0 300 70"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {paths.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" className="fiber-link-base" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              fill="none"
              className="fiber-link-flow"
              strokeWidth="1.8"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.22 + (dir === "out" ? 0.5 : 0)}s` }}
            />
          </g>
        ))}
      </svg>

      {/* lane-end nodes where fibres meet the panel */}
      {LANES.map((l, i) => (
        <span
          key={l}
          aria-hidden="true"
          className="fiber-node absolute h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan"
          style={{ left: `${l}%`, [hubAtBottom ? "top" : "bottom"]: "2px", animationDelay: `${i * 0.2}s` }}
        />
      ))}
      {/* single hub-side convergence node */}
      <span
        aria-hidden="true"
        className="fiber-node absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-glow"
        style={{ [hubAtBottom ? "bottom" : "top"]: "0px", animationDelay: "0.4s" }}
      />
    </div>
  );
}

/* The gravitational centre — aurora hexagon hub with pulse rings + IGW mark,
   mirroring the homepage ConnectivityHub body so both signatures share a language. */
function GatewayHub() {
  return (
    <div className="relative mx-auto grid place-items-center py-1">
      {/* pulse rings — the live-hub motif */}
      <span aria-hidden="true" className="hub-ring pointer-events-none absolute h-[132px] w-[132px] rounded-full border border-electric/30" />
      <span aria-hidden="true" className="hub-ring hub-ring-2 pointer-events-none absolute h-[132px] w-[132px] rounded-full border border-cyan/25" />
      <span aria-hidden="true" className="pointer-events-none absolute h-40 w-40 rounded-full bg-electric/10 blur-2xl" />

      {/* aurora hexagon */}
      <div className="relative grid h-[112px] w-[112px] place-items-center">
        <span aria-hidden="true" className="hub-ring absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-40" style={{ clipPath: HEX }} />
        <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
        <div className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
          <div aria-hidden="true" className="fiber-glow absolute inset-0 opacity-80" />
          <img
            src="/igw-mark.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="relative h-8 w-auto select-none"
          />
        </div>
      </div>

      <p className="relative mt-3 font-display text-[15px] font-semibold leading-none text-ink">
        Indus Gateway
      </p>
      <p className="relative mt-2 max-w-[280px] text-center text-[12px] leading-snug text-grey">
        One accountable layer — sourcing, coordination, monitoring &amp; optimisation.
      </p>
    </div>
  );
}

export default function AboutHero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
      };
  const frame = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
      };

  return (
    <section className="relative overflow-hidden pb-16 pt-[132px]">
      {/* ambience — soft glow + a single aurora wash biased to the stack side. */}
      <div aria-hidden="true" className="header-glow absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.12] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[640px]">
          <motion.div variants={item}>
            <Eyebrow theme="dark">About Indus Gateway</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="m-0 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.06] tracking-[-0.025em] text-balance text-ink"
          >
            A vendor-neutral intermediary built for{" "}
            <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
              serious networks.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-[22px] max-w-[600px] text-[clamp(16px,2vw,18px)] leading-relaxed text-grey"
          >
            Indus Gateway sits between the organisations that need connectivity and the providers
            that supply it — sourcing, managing, and monitoring it all through one accountable
            partner.
          </motion.p>

          <motion.ul variants={item} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {PILLARS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 text-[13.5px] text-grey">
                <span className="grid h-6 w-6 place-items-center rounded-md border border-electric/25 bg-electric/[0.08]">
                  <Icon size={13} aria-hidden="true" className="text-electric" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
            <Button to="/contact">Request Consultation</Button>
            <Button to="/services" variant="ghost" icon={ArrowUpRight}>
              Explore Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Positioning system — many demand → one gateway → many supply */}
        <motion.div variants={frame} initial="hidden" animate="show" className="relative w-full">
          <div className="relative mx-auto w-full max-w-[460px]">
            {/* aurora wash centred on the hub */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.16] blur-3xl"
            />

            {/* Demand — the many that need connectivity */}
            <div className="relative rounded-2xl border border-glass-edge bg-glass-dark px-5 py-4 shadow-glass backdrop-blur-xl">
              <p className="mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-electric/80">
                <span aria-hidden="true" className="h-px w-4 bg-electric/50" />
                Organisations that need connectivity
              </p>
              <ChipRow items={DEMAND} />
            </div>

            <FanZone dir="in" />

            <GatewayHub />

            <FanZone dir="out" />

            {/* Supply — the many that provide it */}
            <div className="relative rounded-2xl border border-glass-edge bg-glass-dark px-5 py-4 shadow-glass backdrop-blur-xl">
              <p className="mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-electric/80">
                <span aria-hidden="true" className="h-px w-4 bg-electric/50" />
                Providers that supply it
              </p>
              <ChipRow items={SUPPLY} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
