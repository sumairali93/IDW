import Reveal from "../ui/Reveal.jsx";
import { useBandTheme, isPaper } from "../ui/theme.js";

/*
 * ProcessFlow — a storm-fibre "signal pipeline": aurora hexagon nodes carrying
 * the icon, wired node-to-node by a live fibre rail (electric base + streaming
 * packet). Horizontal on desktop, a vertical strand when stacked, so the run of
 * steps reads as one flowing process, not a row of disconnected tiles.
 *
 * Reused by the business-model and IPv4 pages. `steps` items: { icon, step,
 * text }. `compact` hides the descriptions. Band-aware node/text colours.
 */
const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

export default function ProcessFlow({ steps, compact = false }) {
  const paper = isPaper(useBandTheme());
  const innerBg = paper ? "bg-paper-raised" : "bg-navy-deep";
  const stepColor = paper ? "text-ink-invert" : "text-ink";
  const textColor = paper ? "text-slate" : "text-grey";
  const railBase = paper ? "bg-electric/25" : "bg-electric/40";

  const HexNode = ({ icon: Icon }) => (
    <span className="relative grid h-[60px] w-[60px] place-items-center">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow"
        style={{ clipPath: HEX }}
      />
      <span
        className={`absolute inset-[2px] grid place-items-center ${innerBg}`}
        style={{ clipPath: HEX }}
      >
        <Icon size={22} aria-hidden="true" className="text-electric" />
      </span>
    </span>
  );

  return (
    <div className="relative mt-12">
      {/* DESKTOP — horizontal fibre pipeline */}
      <div
        className="hidden lg:grid lg:gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
      >
        {steps.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.08} className="relative">
            <div className="relative flex justify-center">
              {/* fibre rail: this node centre → next node centre */}
              {i < steps.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-[30px] z-[1] h-px w-full -translate-y-1/2 ${railBase}`}
                  />
                  <span
                    aria-hidden="true"
                    className="fiber-flow absolute left-1/2 top-[30px] z-[1] h-[3px] w-full -translate-y-1/2"
                  />
                </>
              )}
              <span className="relative z-[2]">
                <HexNode icon={p.icon} />
              </span>
            </div>
            <div className="mt-4 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-electric">
                {`0${i + 1}`}
              </div>
              <div className={`mt-[5px] font-display text-[16px] font-semibold leading-tight ${stepColor}`}>
                {p.step}
              </div>
              {!compact && <p className={`mt-2 text-[13.5px] leading-snug ${textColor}`}>{p.text}</p>}
            </div>
          </Reveal>
        ))}
      </div>

      {/* MOBILE / TABLET — vertical fibre pipeline */}
      <div className="lg:hidden">
        {steps.map((p, i) => {
          const last = i === steps.length - 1;
          return (
            <Reveal key={p.step} delay={i * 0.06} className="relative flex gap-4 pb-7 last:pb-0">
              {/* vertical fibre strand down to the next node */}
              {!last && (
                <span aria-hidden="true" className="absolute bottom-0 left-[30px] top-[60px] w-px -translate-x-1/2">
                  <span className={`absolute inset-0 ${railBase}`} />
                  <span className="fiber-packet-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-glow" />
                </span>
              )}
              <div className="relative z-[2] shrink-0">
                <HexNode icon={p.icon} />
              </div>
              <div className="pt-1.5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-electric">
                  {`0${i + 1}`}
                </div>
                <div className={`mt-1 font-display text-[16px] font-semibold leading-tight ${stepColor}`}>
                  {p.step}
                </div>
                {!compact && <p className={`mt-1.5 text-[13.5px] leading-snug ${textColor}`}>{p.text}</p>}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
