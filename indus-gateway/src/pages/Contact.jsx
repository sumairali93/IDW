import { Mail, Globe2, MapPin } from "lucide-react";

import PageShell from "../components/layout/PageShell.jsx";
import InteriorHero from "../components/ui/InteriorHero.jsx";
import { ContactVisual } from "../components/ui/HeroVisuals.jsx";
import Section from "../components/ui/Section.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Button from "../components/ui/Button.jsx";
import ReviewFlag from "../components/ui/ReviewFlag.jsx";
import FAQAccordion from "../components/ui/FAQAccordion.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import { FAQS } from "../data/faqs.js";
import { SITE } from "../config.js";

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

const DETAILS = [
  { icon: Mail, k: "Email", v: SITE.email },
  { icon: Globe2, k: "Website", v: SITE.website },
  { icon: MapPin, k: "Operating context", v: "Pakistan-registered technology company" },
];

export default function Contact() {
  return (
    <PageShell seoKey="contact">
      <InteriorHero
        eyebrow="Contact"
        title="Start a connectivity"
        accent="conversation."
        sub="Tell us what you're trying to achieve. We'll bring the options, the comparison, and a single point of accountability."
        actions={
          <>
            <Button href={`mailto:${SITE.email}`}>Email the team</Button>
            <Button href="#contact-form" variant="ghost">
              Send a message
            </Button>
          </>
        }
      >
        <ContactVisual />
      </InteriorHero>

      {/* Form + contact details — recessed dark "well" (navy-deep, a clear step
          down from the page's navy) + aurora seam, so the hero reads as its own
          section instead of one flat dark page. The form stays dark-themed. */}
      <Section id="contact-form" theme="dark" seam="top" className="bg-navy-deep">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3.5">
              {DETAILS.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.k}
                    className="group flex items-center gap-4 rounded-2xl border border-glass-edge bg-glass-dark px-5 py-[18px] shadow-glass backdrop-blur-xl transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:border-electric/45"
                  >
                    {/* aurora hexagon badge — matches the storm-fibre hub language */}
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
                      <span aria-hidden="true" className="absolute inset-0 bg-[image:var(--gradient-aurora)] shadow-glow" style={{ clipPath: HEX }} />
                      <span className="absolute inset-[2px] grid place-items-center bg-navy-deep" style={{ clipPath: HEX }}>
                        <Icon size={18} aria-hidden="true" className="text-electric" />
                      </span>
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-grey-dim">
                        {d.k}
                      </div>
                      <div className="mt-[3px] text-[15.5px] font-medium text-ink">{d.v}</div>
                    </div>
                  </div>
                );
              })}

              {/* primary contact — aurora-accented glass card */}
              <div className="relative overflow-hidden rounded-2xl border border-electric/25 bg-glass-dark px-5 py-[18px] shadow-glass backdrop-blur-xl">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />
                <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-electric">
                  Primary contact
                </p>
                <p className="m-0 text-[15px] font-medium leading-snug text-ink">{SITE.contact}</p>
                <ReviewFlag>Exact office address withheld pending approval.</ReviewFlag>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ — PAPER band (seam over the dark contact band) */}
      <Section theme="paper" seam="top">
        <Reveal className="mx-auto max-w-[560px] text-center">
          <Eyebrow className="justify-center">FAQ</Eyebrow>
          <h2 className="m-0 text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink-invert">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-[820px]">
          <FAQAccordion items={FAQS} />
        </div>
      </Section>
    </PageShell>
  );
}
