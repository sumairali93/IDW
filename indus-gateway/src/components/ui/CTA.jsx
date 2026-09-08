import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import Button from "./Button.jsx";
import { ArrowUpRight } from "lucide-react";

/* CTA — closing call-to-action, rendered as an aurora-bordered glass panel
 * (§8.10) to match the homepage CTA. Aurora border via gradient-padding
 * wrapper → inner dark panel; text stays light (ink/grey) on the panel.
 *
 * Ambience is deliberately STRUCTURED and edge-biased — a masked net-grid, a
 * soft aurora wash top-right, and a single fibre hairline seam — so the copy
 * always sits on a clean, premium surface (the old dense random node-mesh
 * crossed straight through the headline and read as messy/childish). */
export default function CTA({
  eyebrow = "Next step",
  title = "Let's map your connectivity requirements.",
  body = "Tell us what you're trying to achieve. We'll bring the options, the comparison, and a single point of accountability.",
  primaryLabel = "Discuss Connectivity Requirements",
  primaryTo = "/contact",
  secondaryLabel = "Explore services",
  secondaryTo = "/services",
}) {
  return (
    <Section theme="dark">
      <Reveal>
        <div className="rounded-2xl bg-[image:var(--gradient-aurora)] p-px shadow-glass">
          <div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-to-br from-blue-deep to-navy p-[clamp(40px,6vw,76px)] text-center">
            {/* structured ambience — never crosses the copy */}
            <span
              aria-hidden="true"
              className="net-grid-overlay pointer-events-none absolute inset-0 opacity-50"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-aurora)] opacity-[0.14] blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-electric/10 blur-3xl"
            />
            {/* a single fibre seam across the top — signature, not chaotic */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-[image:var(--gradient-fiber)]"
            />

            <div className="relative">
              <p className="mb-5 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-cyan">
                <span aria-hidden="true" className="h-px w-6 bg-cyan/60" />
                {eyebrow}
                <span aria-hidden="true" className="h-px w-6 bg-cyan/60" />
              </p>
              <h2 className="mx-auto m-0 max-w-[680px] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink">
                {title}
              </h2>
              <p className="mx-auto mt-[18px] max-w-[540px] text-[17px] leading-relaxed text-grey">
                {body}
              </p>
              <div className="mx-auto mt-9 flex max-w-[420px] flex-col items-stretch gap-3.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <Button to={primaryTo} className="w-full justify-center sm:w-auto">
                  {primaryLabel}
                </Button>
                <Button
                  to={secondaryTo}
                  variant="ghost"
                  icon={ArrowUpRight}
                  className="w-full justify-center sm:w-auto"
                >
                  {secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
