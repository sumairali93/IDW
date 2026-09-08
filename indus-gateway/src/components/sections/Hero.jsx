import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button.jsx";
import StormWave from "../ui/StormWave.jsx";
import ConnectivityHub from "../ui/ConnectivityHub.jsx";

/*
 * Hero — signature dark moment (§8.1). Two columns on desktop: copy left,
 * the ConnectivityHub diagram right — the business model made visible
 * (upstream providers → Indus Gateway coordination layer → clients) with
 * animated fibre packet-flows. Replaces the earlier empty photo placeholder.
 *
 * Copy is verbatim-approved: H1 "One Partner. Every Network." + the
 * supplied subhead. All motion collapses under reduced-motion.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const scrollToNext = () => {
    const hero = document.getElementById("hero");
    const next = hero?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

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
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-[76px]">
      {/* fiber-optic / digital-highway glow */}
      <div aria-hidden="true" className="fiber-glow absolute inset-0" />
      {/* Aurora wash, top-right */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[image:var(--gradient-aurora)] opacity-15 blur-3xl"
      />
      {/* Storm-fibre dot-matrix wave along the bottom of the viewport */}
      <StormWave />

      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[640px]">
          <motion.h1
            variants={item}
            className="m-0 text-[clamp(34px,6.5vw,72px)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance text-ink"
          >
            One Partner.{" "}
            <span className="block bg-[image:var(--gradient-aurora)] bg-clip-text text-transparent sm:inline">
              Every Network.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-[26px] max-w-[600px] text-[clamp(16px,2vw,19px)] leading-relaxed text-grey"
          >
            Indus Gateway brings all your network connectivity together under one accountable
            partner. We help enterprises, ISPs, government bodies, and cloud businesses source,
            manage, and get more out of their network services — without being tied to a single
            vendor.
          </motion.p>

          {/* Trust figures — carried over from the old floating stat pills */}
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { v: "100%", l: "Vendor-neutral recommendations" },
              { v: "24/7", l: "Monitoring & escalation" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-[clamp(24px,3vw,30px)] font-semibold leading-none text-ink">
                  {s.v}
                </div>
                <div className="mt-1.5 text-[13px] text-grey">{s.l}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
            <Button to="/contact">Request Consultation</Button>
            <Button to="/services" variant="ghost" icon={ArrowUpRight}>
              Explore Services
            </Button>
          </motion.div>
        </motion.div>

        {/* ConnectivityHub — providers → coordination layer → clients */}
        <motion.div
          variants={frame}
          initial="hidden"
          animate="show"
          className="relative w-full"
        >
          <ConnectivityHub />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="group absolute bottom-5 left-1/2 hidden h-11 w-11 -translate-x-1/2 cursor-pointer place-items-center rounded-pill border border-line bg-electric/[0.06] text-grey-dim backdrop-blur-sm transition-[color,border-color,background-color,transform] duration-[--dur-base] ease-[--ease-out-soft] hover:-translate-x-1/2 hover:translate-y-0.5 hover:border-electric/40 hover:bg-electric/[0.12] hover:text-electric sm:grid"
      >
        <ChevronDown size={22} aria-hidden="true" className="net-bounce group-hover:[animation-play-state:paused]" />
      </button>
    </section>
  );
}
