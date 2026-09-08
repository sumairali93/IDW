import { Landmark, ShieldCheck, Globe2, FileCheck2, Scale } from "lucide-react";
import Reveal from "../ui/Reveal.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";
import Section from "../ui/Section.jsx";

/*
 * Governance — homepage Section 8 per marketing-approved flow.
 *
 * Wording sourced from the ACTUAL MOCKUP IMAGE (PDF page 9 cropped),
 * NOT the text-only page 17 which had flat unhedged claims.
 * The image uses scoped/hedged language throughout:
 *   - SECP: includes registration number placeholder
 *   - PTA: "Applicable to Service Lines" — not a blanket claim
 *   - APNIC: "in progress" — explicitly not yet held
 * This is the defensible middle ground between omitting entirely
 * and claiming full authorization. Verify before launch.
 *
 * `pending` flags a not-yet-held / scoped credential — rendered as an
 * amber-free electric "in progress" chip (accent policy: no green/amber),
 * so the hedge stays honest and visually distinct from confirmed items.
 */
const POINTS = [
  { icon: Landmark, label: "SECP Registered", sub: "[0323910]", pending: false },
  { icon: ShieldCheck, label: "PTA Authorization", sub: "Applicable to Service Lines", pending: false },
  { icon: Globe2, label: "APNIC Membership", sub: "in progress", pending: true },
  { icon: FileCheck2, label: "SLA-Backed Services", sub: null, pending: false },
  { icon: Scale, label: "Governance & Compliance Focused", sub: null, pending: false },
];

export default function Governance() {
  return (
    <Section theme="dark" band seam="top">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Governance &amp; Compliance</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="m-0 text-[clamp(28px,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink">
            Trusted. Compliant. Accountable.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-grey">
            Neutral doesn&rsquo;t mean unaccountable. Every engagement runs on a
            registered, SLA-backed governance framework — so the single partner you
            hold responsible is one you can verify.
          </p>
        </Reveal>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        {POINTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.label} delay={i * 0.06} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-glass-edge bg-glass-dark p-5 shadow-glass backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-[--dur-base] ease-[--ease-out-soft] hover:-translate-y-1 hover:border-electric/45 hover:shadow-glow">
                <span
                  aria-hidden="true"
                  className="net-grid-overlay pointer-events-none absolute inset-0 opacity-30"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-electric/[0.10] opacity-0 blur-2xl transition-opacity duration-[--dur-slow] group-hover:opacity-100"
                />
                <span className="relative grid h-11 w-11 place-items-center rounded-[13px] border border-electric/20 bg-electric/[0.10] transition-[border-color,background-color] duration-[--dur-base] group-hover:border-electric/45 group-hover:bg-electric/[0.16]">
                  <Icon size={19} aria-hidden="true" className="text-electric" />
                </span>
                <div className="relative mt-auto pt-5">
                  <span className="block text-[13.5px] font-semibold leading-snug text-ink">
                    {p.label}
                  </span>
                  <div className="mt-2 flex min-h-[26px] items-start">
                    {p.sub && (
                      <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-medium ${
                          p.pending
                            ? "border border-electric/25 text-cyan"
                            : "bg-electric/[0.10] text-grey"
                        }`}
                      >
                        {p.pending && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-cyan"
                          />
                        )}
                        {p.sub}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="aurora-seam absolute inset-x-0 bottom-0 opacity-25 transition-opacity duration-[--dur-base] group-hover:opacity-70"
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
