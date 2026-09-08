import {
  Network,
  Cable,
  Cloud,
  Activity,
  Settings2,
  Boxes,
  Mail,
  Globe2,
  MapPin,
  Search,
  Route,
} from "lucide-react";

/*
 * HeroVisuals — the per-page fibre graphics for the interior heroes. All three
 * share the storm-fibre language (aurora hexagon hub, pulse rings, streaming
 * fibre + light-nodes) so the site reads as ONE system, but each page gets a
 * DISTINCT composition so they never look copy-pasted:
 *   • ServicesVisual — one hub radiating OUT to six service-line nodes.
 *   • IPv4Visual     — a horizontal two-sided exchange (hold ⇄ need) through the hub.
 *   • ContactVisual  — three channels CONVERGING to one point of accountability.
 *
 * Strictly token-driven (electric primary, cyan glow, navy surfaces, aurora
 * gradient — no other hues) and built only from existing reduced-motion-gated
 * utilities (.fiber-link-base/.fiber-link-flow/.fiber-flow/.fiber-node/.hub-ring).
 * Every decorative element is aria-hidden. Labels are level-only (approval-safe).
 */

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

/* Reusable aurora hexagon hub with pulse rings + IGW mark. */
function HexHub({ size = 104, label = "Indus Gateway", sub }) {
  return (
    <div className="relative grid place-items-center">
      <span
        aria-hidden="true"
        className="hub-ring pointer-events-none absolute rounded-full border border-electric/30"
        style={{ width: size * 1.2, height: size * 1.2 }}
      />
      <span
        aria-hidden="true"
        className="hub-ring hub-ring-2 pointer-events-none absolute rounded-full border border-cyan/25"
        style={{ width: size * 1.2, height: size * 1.2 }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-electric/10 blur-2xl"
        style={{ width: size * 1.5, height: size * 1.5 }}
      />
      <div className="relative grid place-items-center" style={{ width: size, height: size }}>
        <span aria-hidden="true" className="hub-ring absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-40" style={{ clipPath: HEX }} />
        <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
        <div className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
          <div aria-hidden="true" className="fiber-glow absolute inset-0 opacity-80" />
          <img
            src="/igw-mark.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="relative select-none"
            style={{ height: size * 0.3 }}
          />
        </div>
      </div>
      {label && (
        <p className="relative mt-3 font-display text-[14px] font-semibold leading-none text-ink">{label}</p>
      )}
      {sub && (
        <p className="relative mt-1.5 max-w-[240px] text-center text-[11.5px] leading-snug text-grey">{sub}</p>
      )}
    </div>
  );
}

/* Small glass icon-tile used as a node on the rails. */
function NodeTile({ icon: Icon, label, className = "", style }) {
  return (
    <div className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 ${className}`} style={style}>
      <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-electric/30 bg-glass-dark shadow-glass backdrop-blur-xl">
        <Icon size={18} aria-hidden="true" className="text-electric" />
      </span>
      <span className="whitespace-nowrap text-[10.5px] font-medium text-grey">{label}</span>
    </div>
  );
}

/* ---------- Services: one accountable hub, six connected service lines ----------
   Six nodes sit on a shared orbit ring at regular hexagon vertices; a faint
   hexagon outline links adjacent nodes (they're "connected as one") while live
   fibre spokes stream from the hub to each. The orbit + outline turn a plain
   spoke diagram into a premium operations system. */
const SERVICE_NODES = [
  { icon: Network, label: "Transit", x: 50, y: 15 },
  { icon: Cable, label: "Inter-city", x: 80.4, y: 32.5 },
  { icon: Cloud, label: "Cloud", x: 80.4, y: 67.5 },
  { icon: Activity, label: "Managed", x: 50, y: 85 },
  { icon: Settings2, label: "Advisory", x: 19.6, y: 67.5 },
  { icon: Boxes, label: "IPv4", x: 19.6, y: 32.5 },
];

const SERVICE_RING = SERVICE_NODES.map((n) => `${n.x},${n.y}`).join(" ");

export function ServicesVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.16] blur-3xl"
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {/* orbit ring the nodes rest on */}
        <circle cx="50" cy="50" r="35" fill="none" stroke="var(--color-electric)" strokeWidth="0.4" opacity="0.28" vectorEffect="non-scaling-stroke" />
        {/* hexagon outline linking adjacent service lines — "connected as one" */}
        <polygon
          points={SERVICE_RING}
          fill="none"
          stroke="var(--color-electric)"
          strokeWidth="0.5"
          strokeDasharray="1.5 3"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
        {/* radial fibre spokes (hub → each node) */}
        {SERVICE_NODES.map((n, i) => (
          <g key={n.label}>
            <line x1="50" y1="50" x2={n.x} y2={n.y} className="fiber-link-base" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <line
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              className="fiber-link-flow"
              strokeWidth="1.7"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </g>
        ))}
      </svg>

      {/* node-end light dots */}
      {SERVICE_NODES.map((n, i) => (
        <span
          key={`dot-${n.label}`}
          aria-hidden="true"
          className="fiber-node absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.18}s` }}
        />
      ))}
      {SERVICE_NODES.map((n) => (
        <NodeTile key={`tile-${n.label}`} icon={n.icon} label={n.label} style={{ left: `${n.x}%`, top: `${n.y}%` }} />
      ))}

      {/* centre hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <HexHub size={104} label={null} />
      </div>
    </div>
  );
}

/* ---------- IPv4: a live address-block allocation console ----------
   The core IPv4 idea, made specific to THIS page: IGW takes held address space
   and turns it into verified, routed, leased capacity. A grid of address cells
   moves through idle → verified → routed states (a scan sweep reads as live
   processing), anchored by the IGW mark, over a Source → Verify → Route →
   Manage lifecycle rail. Unlike the other heroes, this couldn't be swapped onto
   another page — it's an address-space story, not a generic hub diagram.

   The CIDR shown (203.0.113.0/24) is TEST-NET-3, the RFC 5737 documentation
   range — an explicit example, never a claim of held/available space. */
const IPV4_STAGES = [
  { icon: Boxes, label: "Source" },
  { icon: Search, label: "Verify" },
  { icon: Route, label: "Route" },
  { icon: Activity, label: "Manage" },
];

const IPV4_LEGEND = [
  { key: "idle", label: "Held", cls: "border border-line bg-panel/50" },
  { key: "verified", label: "Verified", cls: "border border-electric/45 bg-electric/15" },
  { key: "routed", label: "Routed", cls: "border border-cyan/50 bg-cyan/20 ipv4-cell-routed" },
];

const IPV4_GRID_COLS = 12;
const IPV4_GRID_ROWS = 7;
const IPV4_CELLS = IPV4_GRID_COLS * IPV4_GRID_ROWS;

/* Deterministic pseudo-random state per cell — a fixed hash (no Math.random),
   so every render is identical and organic-looking rather than striped. */
function ipv4CellClass(i) {
  const v = ((i * 2654435761) >>> 0) % 100;
  if (v < 26) return IPV4_LEGEND[2].cls; // routed
  if (v < 52) return IPV4_LEGEND[1].cls; // verified
  return IPV4_LEGEND[0].cls; // held/idle
}

export function IPv4Visual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[300px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.15] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-glass-edge bg-glass-dark p-5 shadow-glass backdrop-blur-xl">
        {/* console header: IGW mark + CIDR + live badge */}
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="relative grid h-11 w-11 shrink-0 place-items-center">
            <span className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
            <span className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
              <img src="/igw-mark.png" alt="" draggable="false" className="h-3 w-auto select-none" />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[13.5px] font-semibold leading-none text-ink">IPv4 Allocation</p>
            <p className="mt-1 font-mono text-[12px] leading-none text-cyan">203.0.113.0 / 24</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-electric/25 bg-electric/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan">
            <span aria-hidden="true" className="fiber-node h-1.5 w-1.5 rounded-full bg-cyan" />
            Live
          </span>
        </div>

        {/* address-block grid — cells across their lifecycle states */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${IPV4_GRID_COLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: IPV4_CELLS }, (_, i) => (
              <span key={i} className={`aspect-square rounded-[3px] ${ipv4CellClass(i)}`} />
            ))}
          </div>
          {/* scan sweep — reads as live verification/routing passing over the block */}
          <span
            aria-hidden="true"
            className="fiber-flow pointer-events-none absolute inset-0 rounded-[3px]"
          />
        </div>

        {/* legend */}
        <div className="mt-4 flex items-center gap-4">
          {IPV4_LEGEND.map((l) => (
            <span key={l.key} className="flex items-center gap-1.5 text-[11px] text-grey">
              <span aria-hidden="true" className={`h-3 w-3 rounded-[3px] ${l.cls}`} />
              {l.label}
            </span>
          ))}
        </div>

        {/* lifecycle rail: Source → Verify → Route → Manage */}
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          {IPV4_STAGES.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex flex-1 items-center gap-1.5">
              <div className="flex flex-col items-center gap-1.5">
                <span className="grid h-9 w-9 place-items-center rounded-[11px] border border-electric/30 bg-electric/[0.1]">
                  <Icon size={16} aria-hidden="true" className="text-electric" />
                </span>
                <span className="whitespace-nowrap text-[10.5px] font-medium text-grey">{label}</span>
              </div>
              {i < IPV4_STAGES.length - 1 && (
                <div className="relative -mt-4 h-[2px] flex-1">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-electric/25" />
                  <span aria-hidden="true" className="fiber-flow absolute inset-0 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* caption — the core business idea, stated once */}
      <p className="relative mx-auto mt-5 max-w-[320px] text-center text-[12px] leading-snug text-grey">
        Held address space, verified and routed into leased capacity — coordinated end to end.
      </p>
    </div>
  );
}

/* ---------- Contact: three channels converging to one accountable point ---------- */
const CHANNELS = [
  { icon: Mail, label: "Email", y: 18 },
  { icon: Globe2, label: "Website", y: 50 },
  { icon: MapPin, label: "Local presence", y: 82 },
];

/*
 * Geometry note: the SVG uses preserveAspectRatio="none" over viewBox 0 0 100 100,
 * so SVG (x,y) and HTML (left%, top%) map to the exact same pixel — that's how the
 * fibre endpoints and the shining nodes stay locked together. Coordinates below
 * are the single source: paths, origin dots, and the port dot all read them.
 *   • NODE_X — channel tile centre; fibres start here, exiting horizontally.
 *   • PORT   — one shared gate on the chip's left edge; all three strands meet here.
 */
const CONTACT_NODE_X = 15;
const CONTACT_HUB_X = 80;
const CONTACT_HUB_Y = 50;
const CONTACT_PORT_X = 69;
const CONTACT_C1_X = 42; // early control: horizontal exit from the card
const CONTACT_C2_X = 60; // late control: horizontal, hub-level approach into the chip

/* Single-point convergence, crossing-free: each strand leaves its card HORIZONTALLY
   (c1 level with the origin) and approaches the shared port HORIZONTALLY (c2 level
   with the hub). Both controls keep the y monotonic between origin and hub, so the
   top strand stays above / the bottom below — they only meet at the port. */
function contactPath(y) {
  return `M ${CONTACT_NODE_X} ${y} C ${CONTACT_C1_X} ${y}, ${CONTACT_C2_X} ${CONTACT_HUB_Y}, ${CONTACT_PORT_X} ${CONTACT_HUB_Y}`;
}

export function ContactVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px]">
      <div
        aria-hidden="true"
        className="absolute right-4 top-1/2 h-[240px] w-[240px] -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.16] blur-3xl"
      />

      {/* section caption — pinned to the top of the visual */}
      <p className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric/80">
        <span aria-hidden="true" className="h-px w-4 bg-electric/50" />
        One point of accountability
        <span aria-hidden="true" className="h-px w-4 bg-electric/50" />
      </p>
      {/* converging fibres: each channel → the hex's left vertex (the port) */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {CHANNELS.map((c, i) => {
          const d = contactPath(c.y);
          return (
            <g key={c.label}>
              <path d={d} fill="none" className="fiber-link-base" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <path d={d} fill="none" className="fiber-link-flow" strokeWidth="1.7" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          );
        })}
      </svg>

      {/* channel nodes — icon tile anchored at c.y; label floats below it (absolute)
          so it never shifts the tile's centre off the fibre origin. */}
      {CHANNELS.map((c) => (
        <div
          key={c.label}
          className="absolute grid h-10 w-10 place-items-center rounded-[12px] border border-electric/30 bg-glass-dark shadow-glass backdrop-blur-xl"
          style={{ left: `${CONTACT_NODE_X}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <c.icon size={17} aria-hidden="true" className="text-electric" />
          <span className="absolute left-1/2 top-[calc(100%+5px)] -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-grey">
            {c.label}
          </span>
        </div>
      ))}

      {/* origin shining dots — sit at each tile's right edge, level with the tile
          centre (same c.y the fibre path starts from). */}
      {CHANNELS.map((c, i) => (
        <span
          key={`o-${c.label}`}
          aria-hidden="true"
          className="fiber-node absolute h-1.5 w-1.5 rounded-full bg-cyan"
          style={{ left: `${CONTACT_NODE_X + 5}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)", animationDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* convergence port — the single bright node where all three strands meet the chip */}
      <span
        aria-hidden="true"
        className="fiber-node absolute h-2.5 w-2.5 rounded-full bg-cyan shadow-glow"
        style={{ left: `${CONTACT_PORT_X}%`, top: `${CONTACT_HUB_Y}%`, transform: "translate(-50%, -50%)", animationDelay: "0.4s" }}
      />

      {/* single accountable hub */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${CONTACT_HUB_X}%`, top: `${CONTACT_HUB_Y}%` }}>
        <HexHub size={92} label={null} />
      </div>
    </div>
  );
}
