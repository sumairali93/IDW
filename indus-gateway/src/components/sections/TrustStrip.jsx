import { TRUST_CATEGORIES } from "../../data/trust.js";

/*
 * TrustStrip — a quiet "works across" band placed directly under the
 * hero. Uses a duplicated, auto-scrolling marquee of neutral provider
 * CATEGORIES (no unapproved brand logos). Marquee pauses on hover and
 * is disabled under prefers-reduced-motion (see index.css).
 */
export default function TrustStrip() {
  const items = [...TRUST_CATEGORIES, ...TRUST_CATEGORIES];
  return (
    <section
      aria-label="Provider categories we aggregate"
      className="border-y border-line-soft bg-navy-deep/60 py-6"
    >
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-grey-dim">
        Aggregating connectivity across
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-4 sm:gap-6">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-panel/40 px-4 py-2 text-[13px] font-medium text-grey"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_var(--color-electric)]"
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
