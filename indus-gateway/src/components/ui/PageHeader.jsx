import Eyebrow from "./Eyebrow.jsx";
import Reveal from "./Reveal.jsx";
import NetworkBackdrop from "./NetworkBackdrop.jsx";

/* PageHeader — interior page hero with eyebrow, title, optional subtitle. */
export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-[140px]">
      <div
        aria-hidden="true"
        className="header-glow absolute inset-0"
      />
      <NetworkBackdrop />
      <div className="relative mx-auto w-full max-w-[90rem] px-6">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="m-0 max-w-[800px] text-[clamp(32px,5vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.12}>
            <p className="mt-[22px] max-w-[640px] text-[18px] leading-relaxed text-grey">
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
