import { useBandTheme, isPaper } from "./theme.js";

/* Eyebrow — small uppercase label with a leading rule.
   Band-aware: cyan on dark bands (signature glow accent), electric on
   paper bands (cyan is too light to read on paper). Pass `theme` to
   override the surrounding <Section> context. Pass `className` containing
   "justify-center" to centre it — a matching rule is then added on BOTH
   sides so it stays visually balanced instead of a single left-side dash. */
export default function Eyebrow({ children, className = "", theme }) {
  const band = useBandTheme(theme);
  const accent = isPaper(band) ? "text-electric" : "text-cyan";
  const rule = isPaper(band) ? "bg-electric/50" : "bg-cyan/60";
  const centered = className.includes("justify-center");

  return (
    <div
      className={`mb-[18px] inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.22em] ${accent} ${className}`}
    >
      <span className={`h-px w-6 ${rule}`} aria-hidden="true" />
      {children}
      {centered && <span className={`h-px w-6 ${rule}`} aria-hidden="true" />}
    </div>
  );
}
