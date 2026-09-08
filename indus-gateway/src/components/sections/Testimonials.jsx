import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../ui/Card.jsx";
import { useBandTheme, isPaper } from "../ui/theme.js";
import { TESTIMONIALS } from "../../data/testimonials.js";

/*
 * Testimonials — a single large card carousel (§7.7). Prev/next circular
 * arrows bottom-right, swipe on touch, auto-advance that pauses on hover
 * and is disabled entirely under reduced-motion. Band-aware text colours.
 *
 * Placeholder quotes/roles (see data/testimonials.js) — named clients need
 * sign-off before launch.
 */
const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const band = useBandTheme();
  const paper = isPaper(band);
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (d) => setState(([i]) => [(i + d + count) % count, d]),
    [count]
  );

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reduce, paused, go]);

  const t = TESTIMONIALS[index];
  const nameColor = paper ? "text-ink-invert" : "text-ink";
  const roleColor = paper ? "text-slate" : "text-grey";
  const quoteColor = paper ? "text-ink-invert" : "text-ink";
  const counterColor = paper ? "text-slate-dim" : "text-grey-dim";
  const pad2 = (n) => String(n).padStart(2, "0");

  const variants = reduce
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
      };

  // Touch swipe
  const startX = useRef(null);
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <div
      className="relative mt-11"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <Card className="group relative flex min-h-[260px] flex-col overflow-hidden">
        {/* aurora top-bar sweep, matching the other homepage cards */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-100 opacity-70 transition-opacity duration-[--dur-base] group-hover:opacity-100"
          style={{ background: "var(--gradient-aurora)" }}
        />
        {/* oversized watermark quote glyph — futuristic depth, not decoration noise */}
        <Quote
          size={150}
          aria-hidden="true"
          strokeWidth={1}
          className="pointer-events-none absolute -right-6 -top-8 text-electric/[0.06]"
        />

        <div className="relative flex items-center justify-between">
          <Quote size={28} aria-hidden="true" className="shrink-0 text-electric/70" />
          <span className={`font-display text-[13px] font-semibold tracking-[0.14em] ${counterColor}`}>
            {pad2(index + 1)}
            <span className="opacity-50"> / {pad2(count)}</span>
          </span>
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.blockquote
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative m-0 mt-5 flex flex-1 flex-col"
          >
            <p className={`m-0 flex-1 text-[clamp(17px,2.4vw,22px)] font-medium leading-relaxed tracking-[-0.01em] text-balance ${quoteColor}`}>
              {t.quote}
            </p>
            <footer className="mt-7 flex items-center gap-3.5 border-t border-current/10 pt-5">
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-electric/20 bg-electric/[0.12] font-display text-[17px] font-semibold text-electric"
              >
                {t.name.charAt(0)}
              </span>
              <span>
                <span className={`block text-[14.5px] font-semibold not-italic ${nameColor}`}>
                  {t.name}
                </span>
                <span className={`block text-[12.5px] not-italic ${roleColor}`}>{t.role}</span>
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {/* Controls */}
        <div className="relative mt-6 flex items-center justify-between">
          {/* dots */}
          <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1} of ${count}`}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-electric" : "w-2 bg-current opacity-30 hover:opacity-60"
                }`}
              />
            ))}
          </div>
          {/* arrows */}
          <div className="flex gap-2.5">
            {[
              { d: -1, Icon: ChevronLeft, label: "Previous testimonial" },
              { d: 1, Icon: ChevronRight, label: "Next testimonial" },
            ].map(({ d, Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(d)}
                aria-label={label}
                className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                  paper
                    ? "border-paper-line hover:border-electric hover:bg-electric/[0.06]"
                    : "border-line hover:border-electric hover:bg-electric/[0.06]"
                }`}
              >
                <Icon size={18} aria-hidden="true" className="text-electric" />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
