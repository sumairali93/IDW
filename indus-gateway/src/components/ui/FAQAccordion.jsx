import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useBandTheme, isPaper } from "./theme.js";

/*
 * FAQAccordion — single-open disclosure list, storm-fibre styled. Each row is a
 * card that "lights up" when open: an aurora top hairline, an aurora-filled
 * index node, and a fibre divider (electric base + streaming packet) between the
 * question and its answer, so an opened item reads as a live node on the wire.
 * The answer height animates smoothly (Framer Motion), collapsing to an opacity
 * fade under prefers-reduced-motion. Band-aware — raised paper surfaces + inked
 * text on paper bands, frosted glass on dark bands. Each trigger exposes
 * aria-expanded + aria-controls; the panel is a region labelled by its trigger.
 */
export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const paper = isPaper(useBandTheme());
  const reduce = useReducedMotion();

  const qColor = paper ? "text-ink-invert" : "text-ink";
  const aColor = paper ? "text-slate" : "text-grey";

  return (
    <div className="grid gap-3.5">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;

        const itemBorder = isOpen
          ? "border-electric/40"
          : paper
          ? "border-paper-line hover:border-electric/30"
          : "border-glass-edge hover:border-electric/30";
        const itemBg = paper
          ? isOpen
            ? "bg-paper-raised shadow-paper"
            : "bg-paper-raised/60"
          : isOpen
          ? "bg-glass-dark backdrop-blur-xl shadow-glass"
          : "bg-navy-deep/40";

        return (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border transition-[border-color,background-color] duration-300 ${itemBorder} ${itemBg}`}
          >
            {/* aurora top hairline — only lit on the open row */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)] transition-opacity duration-300 ${
                isOpen ? "opacity-70" : "opacity-0"
              }`}
            />
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 px-[22px] py-[18px] text-left"
              >
                {/* index node — aurora hexagon-glow when open, quiet chip when closed */}
                <span
                  aria-hidden="true"
                  className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-[10px] text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                    isOpen
                      ? "border-transparent bg-[image:var(--gradient-aurora)] text-navy-deep shadow-glow"
                      : `border ${
                          paper ? "border-paper-line" : "border-line"
                        } text-electric`
                  } ${isOpen ? "" : "border"}`}
                >
                  {`0${i + 1}`}
                </span>

                <span className={`flex-1 text-[15.5px] font-semibold leading-snug ${qColor}`}>
                  {f.q}
                </span>

                {/* toggle — a plus that rotates into a minus (× → −) when open */}
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    isOpen
                      ? "border-electric/50 bg-electric/[0.12]"
                      : paper
                      ? "border-paper-line group-hover:border-electric/40"
                      : "border-line group-hover:border-electric/40"
                  }`}
                >
                  <Plus
                    size={16}
                    className={`text-electric transition-transform duration-300 ${
                      isOpen ? "rotate-[135deg]" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-[22px] pb-[22px]">
                    {/* fibre divider — electric base with a streaming cyan sweep */}
                    <div aria-hidden="true" className="relative mb-4 ml-12 h-px">
                      <span className="absolute inset-0 bg-electric/25" />
                      <span className="fiber-flow absolute inset-x-0 top-0 h-px" />
                    </div>
                    <p className={`m-0 pl-12 text-[14.5px] leading-relaxed ${aColor}`}>
                      {f.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
