import { useBandTheme, isPaper } from "./theme.js";

/* Card — surface primitive with band-aware variants.
 *
 *   variant="glass" — frosted dark card (default on dark bands): translucent
 *                     panel + backdrop-blur + glass edge + glass shadow.
 *   variant="paper" — light-band card: raised paper surface, hairline border,
 *                     soft paper shadow, inverted text context.
 *   variant="image" — full-bleed media card; children own the layout/scrim.
 *
 * If no variant is passed, it's inferred from the surrounding <Section>
 * theme (paper band → paper card, otherwise glass). The legacy `light`
 * prop maps to variant="paper".
 */
export default function Card({
  children,
  className = "",
  hover = true,
  variant,
  light = false,
  as: Tag = "div",
  ...rest
}) {
  const band = useBandTheme();
  const resolved =
    variant || (light || isPaper(band) ? "paper" : "glass");

  const base =
    resolved === "image" ? "h-full" : "h-full p-[clamp(20px,3vw,32px)]";

  const surface =
    resolved === "paper"
      ? "rounded-lg border border-paper-line bg-paper-raised text-ink-invert shadow-paper"
      : resolved === "image"
      ? "rounded-xl border border-glass-edge overflow-hidden shadow-glass"
      : "rounded-lg border border-glass-edge bg-glass-dark backdrop-blur-xl shadow-glass";

  const hoverCls = !hover
    ? ""
    : resolved === "paper"
    ? "transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-card"
    : "transition-[transform,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-electric/45 hover:shadow-card";

  return (
    <Tag className={`${base} ${surface} ${hoverCls} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
