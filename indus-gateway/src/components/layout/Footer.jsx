import { Link } from "react-router-dom";
import { Mail, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { NAV } from "../../data/nav.js";
import { SERVICES } from "../../data/services.js";
import { SITE } from "../../config.js";
import Logo from "./Logo.jsx";

const flink =
  "group flex min-h-[40px] w-fit items-center gap-1.5 text-left text-[14px] text-grey transition-colors hover:text-electric";

function ColHead({ children }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-electric">
      <span aria-hidden="true" className="h-px w-4 bg-electric/50" />
      {children}
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-glass-edge bg-navy-deep pt-[60px]">
      {/* aurora seam capping the footer, matching the band-transition language */}
      <div aria-hidden="true" className="aurora-seam absolute inset-x-0 top-0 opacity-60" />
      {/* Editorial backdrop — fibre glow + network grid (image-ready:
          drop a scrimmed <img> here once licensed art is sourced, §11). */}
      <div aria-hidden="true" className="fiber-glow absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="net-grid-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[90rem] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="max-w-[340px]">
            <Logo markH={46} to={null} withTagline={false} />
            <p className="mt-5 text-[13.5px] leading-relaxed text-grey">
              Vendor-neutral network intermediary and connectivity aggregator. Sourcing,
              coordinating, monitoring, and optimising connectivity through a single accountable
              layer.
            </p>
          </div>

          <nav aria-label="Quick links">
            <ColHead>Quick Links</ColHead>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={flink}>
                {n.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Services">
            <ColHead>Services</ColHead>
            {SERVICES.map((s) => (
              <Link key={s.id} to={s.link || `/services?tab=${s.id}`} className={flink}>
                {s.title}
              </Link>
            ))}
          </nav>

          <div>
            <ColHead>Contact</ColHead>
            <a href={`mailto:${SITE.email}`} className={flink}>
              <Mail size={15} aria-hidden="true" className="shrink-0 text-electric" />
              {SITE.email}
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
            <a
              href={`https://${SITE.website}`}
              target="_blank"
              rel="noreferrer"
              className={flink}
            >
              <Globe size={15} aria-hidden="true" className="shrink-0 text-electric" />
              {SITE.website}
            </a>
            <span className="flex min-h-[40px] items-center gap-1.5 text-[13px] text-grey-dim">
              <MapPin size={15} aria-hidden="true" className="shrink-0 text-electric/70" />
              Pakistan-registered technology company
            </span>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-4 border-t border-glass-edge py-7 pb-24 lg:pb-7">
          <p className="m-0 max-w-[640px] text-[12.5px] leading-relaxed text-grey">
            © {year} {SITE.legalName}. {SITE.tagline}. Operating within Pakistan's corporate and
            regulatory framework. Service-line authorizations and regulatory requirements are
            confirmed as part of formal engagement.
          </p>
        </div>
      </div>
    </footer>
  );
}
