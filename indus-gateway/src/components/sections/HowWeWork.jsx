import Reveal from "../ui/Reveal.jsx";
import { HOW_WE_WORK } from "../../data/howWeWork.js";

/*
 * HowWeWork — fibre timeline (§7.8) on a DARK band.
 *   Desktop (lg+): horizontal 7-step pipeline. A layered connector (faint base
 *     rule + aurora tint + streaming cyan packets) runs behind glass node chips;
 *     each node carries a numbered badge and lifts/glows on hover.
 *   Mobile/tablet: vertical stepper with the fibre line down the left.
 * The animated line + packets are decorative and reduced-motion gated.
 */
export default function HowWeWork() {
  return (
    <>
      {/* Desktop horizontal pipeline */}
      <div className="relative hidden lg:block">
        {/* layered connector behind the node row (node centre = top-[30px]) */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[30px] h-px bg-line" />
        <div
          aria-hidden="true"
          className="aurora-seam absolute inset-x-0 top-[30px] !h-[2px] opacity-40"
        />
        <div aria-hidden="true" className="fiber-flow absolute inset-x-0 top-[30px] h-px" />

        <ol className="relative grid grid-cols-7 gap-3">
          {HOW_WE_WORK.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.step} delay={i * 0.05} as="li">
                <div className="group flex flex-col items-center text-center">
                  <span className="relative mb-4 grid h-[60px] w-[60px] place-items-center rounded-full border border-glass-edge bg-glass-dark shadow-glass backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-[--dur-base] ease-[--ease-spring] group-hover:-translate-y-1 group-hover:border-electric/60 group-hover:shadow-glow">
                    <Icon size={22} aria-hidden="true" className="text-electric" />
                    <span className="absolute -right-1 -top-1 grid h-[22px] w-[22px] place-items-center rounded-full border border-navy bg-electric text-[11px] font-bold text-navy-deep">
                      {s.step}
                    </span>
                  </span>
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan">
                    {s.title}
                  </p>
                  <p className="m-0 mt-1.5 text-[12px] leading-snug text-grey">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      {/* Mobile / tablet vertical stepper */}
      <div className="relative lg:hidden">
        {/* fibre line down the left, aligned to node centres (left-[23px]) */}
        <div aria-hidden="true" className="absolute bottom-3 left-[23px] top-3 w-px bg-line" />
        <ol className="relative flex flex-col gap-6">
          {HOW_WE_WORK.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.step} delay={i * 0.04} as="li">
                <div className="flex items-start gap-4">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-glass-edge bg-glass-dark shadow-glass backdrop-blur-xl">
                    <Icon size={19} aria-hidden="true" className="text-electric" />
                    <span className="absolute -right-1 -top-1 grid h-[20px] w-[20px] place-items-center rounded-full border border-navy bg-electric text-[10px] font-bold text-navy-deep">
                      {s.step}
                    </span>
                  </span>
                  <div className="pt-1">
                    <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-cyan">
                      {s.title}
                    </p>
                    <p className="m-0 mt-1 text-[13px] leading-snug text-grey">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </>
  );
}
