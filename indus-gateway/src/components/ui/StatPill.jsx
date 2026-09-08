import { useBandTheme, isPaper } from "./theme.js";

/*
 * StatPill — a frosted stat tile that floats over imagery (hero/section
 * frames) or sits inline in a stat row. Big number + label, optional live
 * status dot.
 *
 *   value  — the stat (e.g. "99.99%", "Tier-1 & 2")
 *   label  — supporting caption
 *   live   — show a pulsing electric status dot (reduced-motion safe: the
 *            pulse uses .net-node, already gated globally)
 *   theme  — override the surrounding band ("dark" | "paper")
 *   float  — absolute-position helper classes for corner placement over a
 *            frame; omit for inline/static use (reflows on mobile).
 */
export default function StatPill({
  value,
  label,
  live = false,
  theme,
  float = "",
  className = "",
}) {
  const band = useBandTheme(theme);
  const paper = isPaper(band);

  const surface = paper
    ? "bg-glass-light border-paper-line text-ink-invert"
    : "bg-glass-dark border-glass-edge text-ink";
  const labelColor = paper ? "text-slate-dim" : "text-grey-dim";

  return (
    <div
      className={`rounded-xl border ${surface} shadow-float backdrop-blur-xl px-5 py-4 ${float} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        {live && (
          <span
            aria-hidden="true"
            className="net-node h-2 w-2 shrink-0 rounded-full bg-electric shadow-[0_0_10px_var(--color-electric)]"
          />
        )}
        <span className="font-display text-[clamp(24px,3.5vw,40px)] font-bold leading-none tracking-[-0.02em]">
          {value}
        </span>
      </div>
      {label && (
        <p className={`mt-1.5 text-[13px] font-medium leading-tight ${labelColor}`}>
          {label}
        </p>
      )}
    </div>
  );
}
