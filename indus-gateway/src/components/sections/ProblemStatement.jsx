import {
  CircleDollarSign,
  FileText,
  Repeat,
  Users,
  EyeOff,
  Network,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import Reveal from "../ui/Reveal.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";

const PROBLEMS = [
  { icon: Network, label: "Multiple Carriers" },
  { icon: FileText, label: "Multiple Contracts" },
  { icon: Repeat, label: "Multiple SLAs" },
  { icon: Users, label: "Multiple Support Teams" },
  { icon: EyeOff, label: "No Visibility" },
  { icon: CircleDollarSign, label: "Complex Negotiations" },
];

const SOLUTIONS = [
  "One Partner",
  "One Contract",
  "One SLA Framework",
  "One Support Team",
  "Full Visibility",
  "Simplified & Optimized",
];

/*
 * ProblemStatement — before/after on a PAPER band (§8.2). Two framed panels:
 * left = the fragmented status quo (muted slate ✕ tiles in a sunk well);
 * right = the unified outcome (electric ✓ tiles in an accent panel). Between
 * them, a glowing IGW gateway node embodies the aggregation thesis. No
 * hardcoded red/green — contrast is carried by muted-slate vs. electric.
 */
export default function ProblemStatement() {
  return (
    <div>
      <div className="mb-11 mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">The IGW Difference</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="m-0 text-[clamp(28px,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink-invert">
            We turn procurement chaos into one-stop solution
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate">
            Sourcing connectivity across a dozen carriers means a dozen contracts,
            SLAs and support desks. We consolidate all of it into a single,
            optimized relationship.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {/* Problems panel — fragmented status quo */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-paper-line bg-paper-sunk p-5 sm:p-7">
            <h3 className="m-0 mb-5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-dim">
              <span className="h-px w-5 bg-slate-dim/50" aria-hidden="true" />
              Connectivity Procurement Is Broken
            </h3>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
              {PROBLEMS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.label} delay={i * 0.04} className="h-full">
                    <div className="group flex h-full flex-col items-center gap-2.5 rounded-xl border border-paper-line bg-paper-raised p-4 text-center transition duration-[--dur-base] ease-[--ease-out-soft] hover:-translate-y-0.5 hover:border-danger/30 hover:shadow-paper">
                      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-danger/10 transition-colors duration-[--dur-base] group-hover:bg-danger/[0.14]">
                        <Icon size={17} aria-hidden="true" className="text-danger" />
                        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-paper-raised shadow-paper">
                          <X size={9} aria-hidden="true" className="text-danger" />
                        </span>
                      </span>
                      <span className="text-[12px] font-medium leading-tight text-slate">
                        {p.label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Gateway node — the live convergence hub, sized and connected to
            read as the section's centre of gravity rather than a small
            floating icon between two heavier panels. Lines run edge-to-edge
            into the panels (no dead grey gap) and share one visual style. */}
        <Reveal delay={0.2} className="self-center">
          <div className="relative mx-auto grid place-items-center py-2">
            {/* connector line — one consistent style, spanning fully from
                panel to panel behind the hub */}
            <span
              aria-hidden="true"
              className="fiber-flow absolute -left-8 -right-8 top-1/2 hidden h-[2px] -translate-y-1/2 lg:block"
            />

            <div className="relative grid h-16 w-16 place-items-center rounded-full border border-electric/30 bg-electric/[0.1] lg:h-[72px] lg:w-[72px]">
              <ArrowRight size={26} aria-hidden="true" className="text-electric" strokeWidth={1.75} />
            </div>
            <span className="relative mt-3 hidden text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric lg:block">
              Indus Gateway
            </span>
          </div>
        </Reveal>

        {/* Solutions panel — unified outcome */}
        <Reveal delay={0.1} className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-electric/25 bg-electric/[0.06] p-5 sm:p-7">
            <span
              aria-hidden="true"
              className="net-grid-overlay pointer-events-none absolute inset-0 opacity-[0.15]"
            />
            <h3 className="relative m-0 mb-5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-electric">
              <span className="h-px w-5 bg-electric/50" aria-hidden="true" />
              We Simplify It
            </h3>
            <div className="relative grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
              {SOLUTIONS.map((s, i) => (
                <Reveal key={s} delay={0.1 + i * 0.04} className="h-full">
                  <div className="group flex h-full flex-col items-center gap-2.5 rounded-xl border border-electric/25 bg-paper-raised p-4 text-center transition duration-[--dur-base] ease-[--ease-out-soft] hover:-translate-y-0.5 hover:border-electric/50 hover:shadow-glow">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-electric/[0.16] transition-colors duration-[--dur-base] group-hover:bg-electric/[0.22]">
                      <CheckCircle2 size={17} aria-hidden="true" className="text-electric" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-ink-invert">
                      {s}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
