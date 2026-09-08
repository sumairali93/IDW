import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "./Eyebrow.jsx";

/*
 * InteriorHero — shared shell for the interior-page heroes (Services, IPv4,
 * Contact). Left column = eyebrow + title (optional aurora-gradient accent
 * tail) + subhead + actions; right column = a page-specific fibre `visual`
 * passed as children. Keeps the storm-fibre ambience + entrance motion in one
 * place so every interior hero feels like one system, while each page ships a
 * DISTINCT visual so they don't read as copy-paste. Dark band; the page's
 * first Section draws the seam beneath it.
 *
 * About uses its own richer AboutHero (the flagship); this covers the rest.
 * Token-driven, reduced-motion gated, decorative layers aria-hidden.
 */
export default function InteriorHero({ eyebrow, title, accent, sub, actions, children }) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
      };
  const frame = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
      };

  return (
    <section className="relative overflow-hidden pb-16 pt-[132px]">
      <div aria-hidden="true" className="header-glow absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.12] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[640px]">
          <motion.div variants={item}>
            <Eyebrow theme="dark">{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="m-0 text-[clamp(32px,5vw,52px)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-ink"
          >
            {title}
            {accent && (
              <>
                {" "}
                <span className="bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent">
                  {accent}
                </span>
              </>
            )}
          </motion.h1>

          {sub && (
            <motion.p
              variants={item}
              className="mt-[22px] max-w-[600px] text-[clamp(16px,2vw,18px)] leading-relaxed text-grey"
            >
              {sub}
            </motion.p>
          )}

          {actions && (
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
              {actions}
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={frame} initial="hidden" animate="show" className="relative w-full">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
