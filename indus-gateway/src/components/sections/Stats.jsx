import Reveal from "../ui/Reveal.jsx";
import { STATS } from "../../data/stats.js";

/*
 * Stats — headline credibility figures on a PAPER band (§8.8). Four
 * floating-style paper tiles that stack 2-up on mobile and 4-up from
 * `sm`. Values are placeholders (see data/stats.js) pending confirmed
 * claims.
 */
export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-paper-line bg-paper-raised p-6 shadow-paper transition duration-[--dur-base] ease-[--ease-out-soft] hover:-translate-y-1 hover:border-electric/30 hover:shadow-card sm:p-8">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-[--dur-base] ease-[--ease-out-soft] group-hover:scale-x-100"
              style={{ background: "var(--gradient-aurora)" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-electric/[0.07] opacity-0 blur-2xl transition-opacity duration-[--dur-slow] group-hover:opacity-100"
            />
            <div className="relative font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-none tracking-[-0.02em] text-ink-invert">
              {s.value}
              <span className="text-electric">{s.suffix}</span>
            </div>
            <p className="relative mt-4 border-t border-paper-line pt-4 text-[12.5px] leading-snug text-slate">
              {s.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
