import { Activity, AlertTriangle, CheckCircle2, Gauge, Wrench } from "lucide-react";
import Reveal from "../ui/Reveal.jsx";
import Button from "../ui/Button.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";

/* Simplified node positions roughly tracing Pakistan's major
   connectivity hubs (Karachi, Lahore, Islamabad, Peshawar, Quetta,
   Faisalabad, Multan) — illustrative, not geographically precise. */
const NODES = [
  { x: 60, y: 210, label: "Karachi" },
  { x: 95, y: 150, label: "Hyderabad" },
  { x: 140, y: 90, label: "Multan" },
  { x: 170, y: 55, label: "Lahore" },
  { x: 150, y: 20, label: "Islamabad" },
  { x: 90, y: 30, label: "Peshawar" },
  { x: 55, y: 80, label: "Quetta" },
];
const LINKS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [2, 6],
];

/* Status is conveyed by icon + label, not hue — electric-only brand rule.
   Degraded reads strongest (solid electric fill), maintenance/resolved
   step down in emphasis via alpha tints of the same accent. */
const ALERTS = [
  { tone: "degraded", icon: AlertTriangle, text: "Karachi–Lahore link", status: "Degraded" },
  { tone: "maintenance", icon: Wrench, text: "Islamabad node", status: "Maintenance" },
  { tone: "resolved", icon: CheckCircle2, text: "Peshawar circuit", status: "Resolved" },
];

const TONE = {
  degraded: "border-electric/45 bg-electric/[0.14] text-electric",
  maintenance: "border-electric/25 bg-electric/[0.07] text-cyan",
  resolved: "border-glass-edge bg-glass-dark text-grey",
};

const PORTAL_BENEFITS = [
  "Real-time circuit status",
  "Utilization & performance metrics",
  "Incident tracking",
  "SLA reports",
  "Billing & invoices",
  "Single login. Everything in one place.",
];

/*
 * NetworkOperations — "Always On, Always Watching" NOC section.
 * New component matching the marketing-approved visual mockup
 * (PDF page 9 image). This section did not exist in the earlier
 * text-only rebuild and was missed entirely in the first pass.
 *
 * The network map and stats are illustrative UI, not a live feed —
 * no real monitoring data is wired in. Treat as a visual mockup of
 * the capability, not a functional dashboard.
 */
export default function NetworkOperations() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-navy-deep to-navy">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.3fr_1fr]">
        {/* Left: copy */}
        <div className="p-[clamp(28px,4vw,40px)]">
          <Reveal>
            <Eyebrow>24/7 Network Operations Centre</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="m-0 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
              Always On. Always Watching.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[14.5px] leading-relaxed text-grey">
              Our NOC monitors your entire connectivity ecosystem round-the-clock, supporting
              uptime and performance across coordinated circuits.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-6 space-y-3">
              {[
                "Real-time monitoring & alerting",
                "Incident detection & escalation",
                "Performance analytics & reporting",
                "SLA compliance & documentation",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13.5px] text-ink">
                  <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7">
              <Button to="/services">Explore NOC Services</Button>
            </div>
          </Reveal>
        </div>

        {/* Centre: stylised map + stats */}
        <div className="border-y border-line/60 bg-navy-deep/60 p-[clamp(20px,3vw,28px)] lg:border-x lg:border-y-0">
          <Reveal delay={0.1}>
            <p className="m-0 mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-cyan">
              Network Overview
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { k: "99.98%", v: "Circuit Availability" },
                { k: "126", v: "Active Circuits" },
                { k: "3", v: "Active Alerts" },
                { k: "2", v: "Incidents Today" },
              ].map((s) => (
                <div key={s.v} className="rounded-lg border border-line bg-panel/50 px-2.5 py-2.5 text-center">
                  <div className="font-display text-[15px] font-semibold text-ink">{s.k}</div>
                  <div className="mt-0.5 text-[9.5px] leading-tight text-grey-dim">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-4 rounded-xl border border-line bg-navy-deep/70 p-3">
              <svg viewBox="0 0 220 240" className="mx-auto h-[200px] w-full max-w-[200px]" aria-hidden="true">
                {LINKS.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={NODES[a].x}
                    y1={NODES[a].y}
                    x2={NODES[b].x}
                    y2={NODES[b].y}
                    stroke="var(--color-electric)"
                    strokeWidth="1"
                    className="net-link"
                    opacity="0.45"
                  />
                ))}
                {NODES.map((n, i) => (
                  <circle
                    key={i}
                    cx={n.x}
                    cy={n.y}
                    r="4"
                    fill="var(--color-cyan)"
                    className="net-node"
                  />
                ))}
              </svg>
              <p className="m-0 text-center text-[10px] uppercase tracking-[0.14em] text-grey-dim">
                Illustrative network map
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-4 space-y-2">
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-grey-dim">
                Recent Alerts
              </p>
              {ALERTS.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.text}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-[12px] ${TONE[a.tone]}`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} aria-hidden="true" />
                      {a.text}
                    </span>
                    <span className="font-semibold">{a.status}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Right: portal benefits */}
        <div className="p-[clamp(28px,4vw,40px)]">
          <Reveal delay={0.1}>
            <Eyebrow>Client Portal Benefits</Eyebrow>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-2 space-y-3">
              {PORTAL_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-ink">
                  <Gauge size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7">
              <Button to="/contact" variant="ghost" icon={Activity}>
                See Portal Demo
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
