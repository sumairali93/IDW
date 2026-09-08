import { useLayoutEffect, useRef, useState } from "react";
import { UPSTREAM_PROVIDERS, CLIENT_SEGMENTS } from "../../data/connectivity.js";

/*
 * ConnectivityHub — the hero's signature visual. Renders the business model as
 * a spider/network graph: upstream providers (left) and clients (right) are the
 * legs, the glowing IGW hexagon is the body/head, and fibre links are the legs
 * connecting them. Each leg attaches EXACTLY on the hexagon's outline with a
 * shining cyan light-node at both ends (card side + hex side).
 *
 * Why measured pixels (not a stretched % grid): the hexagon is a fixed-size
 * element, so drawing the links in a `preserveAspectRatio="none"` 0–100 grid
 * made the hub-side attach points drift off the hex body as the container
 * changed aspect ratio (top/bottom legs floated outside it). Here we measure
 * the container with a ResizeObserver and compute all geometry in real px, so
 * every leg lands on the hex perimeter at any size. All motion is CSS
 * (.fiber-link-flow / .fiber-node / .hub-ring), reduced-motion gated. aria-hidden.
 */

const HEX_SIZE = 150; // must match <Hub size={...}>
const COL_W = 0.28; // rail column width as a fraction of the container
const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

// Hexagon vertices relative to its centre (derived from the HEX clip fractions).
const S = HEX_SIZE;
const HV = {
  tl: { x: (0.25 - 0.5) * S, y: (0.03 - 0.5) * S },
  l: { x: -0.5 * S, y: 0 },
  bl: { x: (0.25 - 0.5) * S, y: (0.97 - 0.5) * S },
  tr: { x: (0.75 - 0.5) * S, y: (0.03 - 0.5) * S },
  r: { x: 0.5 * S, y: 0 },
  br: { x: (0.75 - 0.5) * S, y: (0.97 - 0.5) * S },
};

// Point at fraction f∈[0,1] along a two-segment path a→mid→b (equal segments).
function twoSeg(a, mid, b, f) {
  if (f <= 0.5) {
    const t = f / 0.5;
    return { x: a.x + (mid.x - a.x) * t, y: a.y + (mid.y - a.y) * t };
  }
  const t = (f - 0.5) / 0.5;
  return { x: mid.x + (b.x - mid.x) * t, y: mid.y + (b.y - mid.y) * t };
}
// n attach points fanned along one flank of the hex, hugging its outline
// (kept off the sharp corners via the 0.16–0.84 clamp).
function hexFan(a, mid, b, n) {
  const lo = 0.16,
    hi = 0.84;
  if (n === 1) return [mid];
  return Array.from({ length: n }, (_, i) => twoSeg(a, mid, b, lo + ((hi - lo) * i) / (n - 1)));
}
// Even vertical centres for n full-height cards in a column of height h.
function cardYs(n, h) {
  return Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * h);
}

const LEFT_N = UPSTREAM_PROVIDERS.length;
const RIGHT_N = CLIENT_SEGMENTS.length;

// Build every leg's path + both endpoints in pixel space for the measured size.
function buildLegs(w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const leftX = COL_W * w; // right edge of the left column
  const rightX = (1 - COL_W) * w; // left edge of the right column

  const leftHub = hexFan(HV.tl, HV.l, HV.bl, LEFT_N).map((p) => ({ x: cx + p.x, y: cy + p.y }));
  const rightHub = hexFan(HV.tr, HV.r, HV.br, RIGHT_N).map((p) => ({ x: cx + p.x, y: cy + p.y }));
  const leftCardYs = cardYs(LEFT_N, h);
  const rightCardYs = cardYs(RIGHT_N, h);

  const legs = [];
  leftCardYs.forEach((y, i) => {
    const a = { x: leftX, y };
    const b = leftHub[i];
    const c = (b.x - a.x) * 0.45;
    legs.push({ d: `M ${a.x} ${a.y} C ${a.x + c} ${a.y} ${b.x - c} ${b.y} ${b.x} ${b.y}`, a, b, i });
  });
  rightCardYs.forEach((y, i) => {
    const a = { x: rightX, y };
    const b = rightHub[i];
    const c = (a.x - b.x) * 0.45;
    legs.push({ d: `M ${b.x} ${b.y} C ${b.x + c} ${b.y} ${a.x - c} ${a.y} ${a.x} ${a.y}`, a, b, i: i + LEFT_N });
  });
  return legs;
}

// Rail card — icon-first, left-aligned on BOTH sides. `flex-1` makes every card
// in a column share the height equally, so fewer cards ⇒ taller cards.
function Chip({ icon: Icon, label }) {
  return (
    <div className="group flex min-h-0 flex-1 items-center gap-2.5 rounded-md border border-electric/25 bg-panel/80 px-3.5 shadow-glass backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-electric/60 hover:shadow-glow">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-electric/30 bg-electric/[0.14]">
        <Icon size={17} aria-hidden="true" className="text-electric" />
      </span>
      <span className="text-[13px] font-semibold leading-tight text-ink">{label}</span>
    </div>
  );
}

/* Glowing hexagon hub with the IGW mark + radiating pulse rings — the spider "body". */
function Hub({ size = HEX_SIZE }) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <span aria-hidden="true" className="hub-ring absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-40" style={{ clipPath: HEX }} />
      <span aria-hidden="true" className="hub-ring hub-ring-2 absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-40" style={{ clipPath: HEX }} />
      <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)]" style={{ clipPath: HEX }} />
      <div className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
        <div aria-hidden="true" className="fiber-glow absolute inset-0 opacity-80" />
        <div className="relative flex flex-col items-center gap-1.5">
          <img src="/igw-mark.png" alt="" aria-hidden="true" draggable="false" style={{ height: size * 0.32 }} className="w-auto select-none" />
          <span className="whitespace-nowrap font-display font-bold uppercase leading-none tracking-[0.05em] text-ink" style={{ fontSize: size * 0.076 }}>
            Indus Gateway
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ConnectivityHub() {
  const wrapRef = useRef(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setDim({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const legs = dim.w > 0 ? buildLegs(dim.w, dim.h) : [];

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      {/* ---------- Tablet & up: full spider diagram (fibre leg to every card).
           Shown from md (768px) so tablets get the connected hub, not the
           stacked stubs — matches the "connects on both sides" desktop look. */}
      <div className="relative hidden w-full md:block">
        {/* Rail headings — each centred over its own card column. */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric/80" style={{ width: `${COL_W * 100}%` }}>
            Upstream Providers
          </span>
          <span className="text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric/80" style={{ width: `${COL_W * 100}%` }}>
            Our Clients
          </span>
        </div>

        <div ref={wrapRef} className="relative h-[clamp(360px,32vw,440px)] w-full">
          {/* Aurora glow behind the hub */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-aurora)] opacity-25 blur-3xl" />

          {/* Spider-leg fibre links — drawn in exact pixel space (viewBox == the
              measured box), so every leg meets the hexagon outline precisely. */}
          {dim.w > 0 && (
            <svg aria-hidden="true" viewBox={`0 0 ${dim.w} ${dim.h}`} className="absolute inset-0 h-full w-full overflow-visible">
              {legs.map((leg) => (
                <g key={`leg-${leg.i}`}>
                  <path d={leg.d} fill="none" className="fiber-link-base" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                  <path d={leg.d} fill="none" className="fiber-link-flow" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${(leg.i % 6) * 0.16}s` }} />
                </g>
              ))}
            </svg>
          )}

          {/* Shining light-node at BOTH ends of every leg (card side + hex side). */}
          {legs.flatMap((leg) => [
            <span key={`na-${leg.i}`} aria-hidden="true" className="fiber-node absolute z-[5] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" style={{ left: leg.a.x, top: leg.a.y, animationDelay: `${(leg.i % 6) * 0.2}s` }} />,
            <span key={`nb-${leg.i}`} aria-hidden="true" className="fiber-node absolute z-[5] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" style={{ left: leg.b.x, top: leg.b.y, animationDelay: `${0.5 + (leg.i % 6) * 0.2}s` }} />,
          ])}

          {/* Centre hub — the spider body/head */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <Hub size={HEX_SIZE} />
          </div>

          {/* Left rail column — 6 cards, full height, 0.5rem gap */}
          <div className="absolute inset-y-0 left-0 z-10 flex flex-col gap-2" style={{ width: `${COL_W * 100}%` }}>
            {UPSTREAM_PROVIDERS.map((p) => (
              <Chip key={p.label} icon={p.icon} label={p.label} />
            ))}
          </div>

          {/* Right rail column — 4 cards, same width & full height as the left one. */}
          <div className="absolute inset-y-0 right-0 z-10 flex flex-col gap-2" style={{ width: `${COL_W * 100}%` }}>
            {CLIENT_SEGMENTS.map((c) => (
              <Chip key={c.label} icon={c.icon} label={c.label} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Mobile only (<768px): stacked, hub between two chip grids ---------- */}
      <div className="md:hidden">
        <p className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric/80">
          Upstream Providers
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {UPSTREAM_PROVIDERS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label} className="flex items-center gap-2.5 rounded-md border border-electric/25 bg-panel/80 px-3 py-2.5 shadow-glass backdrop-blur-xl">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-electric/30 bg-electric/[0.14]">
                  <Icon size={17} aria-hidden="true" className="text-electric" />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-ink">{p.label}</span>
              </div>
            );
          })}
        </div>

        {/* Vertical fibre flow down to the hub. Each connector is a solid fibre
            that lands ON the hex (no fade-out) with a shining cyan node at both
            ends AND a bright packet streaming down it — the same "live data
            flowing into/out of the gateway" motion as the desktop spider legs
            (.fiber-link-flow), so the stacked layout no longer feels static. */}
        <div className="relative my-4 flex flex-col items-center">
          {/* inbound fibre: providers grid → hub */}
          <span aria-hidden="true" className="relative h-8 w-[2px] bg-gradient-to-b from-electric/40 to-electric">
            <span className="fiber-packet-y absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-glow" />
            <span className="fiber-node absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan" />
            <span className="fiber-node absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan" style={{ animationDelay: "0.5s" }} />
          </span>
          <Hub size={112} />
          {/* short outbound stub: hub → clients junction (keeps the flow
              continuous from the hex into the fork below) */}
          <span aria-hidden="true" className="relative h-4 w-[2px] bg-gradient-to-b from-electric to-electric/60">
            <span className="fiber-packet-y absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-glow" style={{ animationDelay: "0.9s" }} />
            <span className="fiber-node absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan" />
          </span>
        </div>

        <p className="mb-2 text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-electric/80">
          Our Clients
        </p>

        {/* Fork fibre: the gateway fans OUT into its two lead client segments, so
            the outbound flow spreads into the cards (Enterprises + ISPs & Carriers)
            instead of dissolving into the wave. Two curved branches land on the
            column centres (25% / 75%), each carrying a streaming packet
            (.fiber-link-flow) with a light node at the fork origin and both ends. */}
        <div className="relative mb-1 h-9 w-full">
          <svg
            viewBox="0 0 300 36"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path d="M150 0 C 150 20 75 14 75 36" fill="none" className="fiber-link-base" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <path d="M150 0 C 150 20 75 14 75 36" fill="none" className="fiber-link-flow" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d="M150 0 C 150 20 225 14 225 36" fill="none" className="fiber-link-base" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <path d="M150 0 C 150 20 225 14 225 36" fill="none" className="fiber-link-flow" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ animationDelay: "0.5s" }} />
          </svg>
          <span aria-hidden="true" className="fiber-node absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" />
          <span aria-hidden="true" className="fiber-node absolute left-1/4 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" style={{ animationDelay: "0.5s" }} />
          <span aria-hidden="true" className="fiber-node absolute left-3/4 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CLIENT_SEGMENTS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="flex items-center gap-2.5 rounded-md border border-electric/25 bg-panel/80 px-3 py-2.5 shadow-glass backdrop-blur-xl">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-electric/30 bg-electric/[0.14]">
                  <Icon size={17} aria-hidden="true" className="text-electric" />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-ink">{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
