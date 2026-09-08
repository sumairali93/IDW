import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBandTheme, isPaper } from "./theme.js";

/*
 * Button — renders as a router <Link> (to), an <a> (href), or a <button>.
 * Pill-shaped to match the redesign; `primary` carries a circular arrow
 * chip on the right. `ghost`/`outline` are band-aware (adapt to paper vs
 * dark) unless an explicit `theme` prop overrides the Section context.
 * Hover/tap use a spring; both collapse to no-op under reduced-motion.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  icon: Icon = ArrowRight,
  type = "button",
  theme,
  className = "",
  ...rest
}) {
  const band = useBandTheme(theme);
  const paper = isPaper(band);
  const reduce = useReducedMotion();

  const ghost = paper
    ? "bg-transparent text-ink-invert border border-paper-line hover:border-electric/60"
    : "bg-transparent text-ink border border-line hover:border-electric/60";

  const variants = {
    primary: "bg-electric text-navy-deep border border-electric hover:shadow-glow",
    ghost,
    outline:
      "bg-transparent text-electric border border-electric/40 hover:border-electric/70 hover:bg-electric/[0.06]",
  };

  const isPrimary = variant === "primary";
  const classes = `group inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill px-5 py-3 min-h-[44px] text-[14.5px] font-semibold tracking-tight transition-colors ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {Icon &&
        (isPrimary ? (
          <span
            aria-hidden="true"
            className="grid h-6 w-6 place-items-center rounded-full bg-navy-deep/15 transition-transform group-hover:translate-x-0.5"
          >
            <Icon size={15} />
          </span>
        ) : (
          <Icon
            size={17}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        ))}
    </>
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { y: 0, scale: 0.98 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
      };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...rest}>
          {content}
        </Link>
      </motion.div>
    );
  }
  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
