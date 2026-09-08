import { BandThemeContext } from "./theme.js";

/* Section — consistent vertical rhythm + max-width container, band-aware.
 *
 * `theme` (preferred):
 *   "dark"   — base navy (default)
 *   "paper"  — light/editorial band (cool off-white); flips text context
 *   "aurora" — gradient panel; text stays light
 * `band`  — subtle raised dark panel (dark rhythm separator)
 * `seam`  — "top" | "bottom" | "both" adds an aurora gradient rule where a
 *           dark and light band meet (§6, §3.5).
 *
 * Legacy `light` prop is mapped to theme="paper" for back-compat with
 * existing call sites; prefer `theme` going forward.
 */
export default function Section({
  children,
  id,
  theme,
  band = false,
  light = false,
  seam,
  className = "",
}) {
  const resolved = theme || (light ? "paper" : "dark");

  const bg =
    resolved === "paper"
      ? "bg-paper text-ink-invert"
      : resolved === "aurora"
      ? "text-ink"
      : band
      ? "border-y border-line bg-panel/35"
      : "";

  const showTop = seam === "top" || seam === "both";
  const showBottom = seam === "bottom" || seam === "both";

  return (
    <BandThemeContext.Provider value={resolved}>
      <section
        id={id}
        className={`relative py-[clamp(72px,10vw,140px)] ${bg} ${className}`}
      >
        {showTop && (
          <span aria-hidden="true" className="aurora-seam absolute inset-x-0 top-0" />
        )}
        <div className="mx-auto w-full max-w-[90rem] px-6">{children}</div>
        {showBottom && (
          <span aria-hidden="true" className="aurora-seam absolute inset-x-0 bottom-0" />
        )}
      </section>
    </BandThemeContext.Provider>
  );
}
