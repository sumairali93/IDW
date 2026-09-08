import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { NAV } from "../../data/nav.js";
import { SERVICES } from "../../data/services.js";
import { SITE } from "../../config.js";
import Button from "../ui/Button.jsx";
import Logo from "./Logo.jsx";

const GROUP_ORDER = ["Connectivity", "Managed Services", "Address Services"];
const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

/* Desktop "Services" dropdown mega-menu — a storm-fibre glass console. Opens on
   hover and on focus/keyboard; closes on blur-out or Escape. Each service is a
   hover-lit card (electric border + aurora-hex icon + sliding arrow); a footer
   rail links to the full services page and direct contact. Entrance animates
   with Framer Motion, collapsing to an instant show under reduced motion. */
function ServicesMenu({ active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timer = useRef(null);
  const reduce = useReducedMotion();

  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <Link
        to="/services"
        aria-haspopup="true"
        aria-expanded={open}
        className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors hover:text-ink ${
          active || open ? "text-ink" : "text-grey"
        }`}
      >
        Services
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`text-electric transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        {/* aurora active/hover underline */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-[image:var(--gradient-aurora)] transition-transform duration-300 ${
            active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Services"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute right-0 top-[calc(100%+14px)] w-[min(680px,calc(100vw-3rem))] overflow-hidden rounded-xl border border-glass-edge bg-navy-deep/95 shadow-menu backdrop-blur-xl"
          >
            {/* aurora top hairline */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)]" />
            {/* soft header glow */}
            <span aria-hidden="true" className="header-glow pointer-events-none absolute inset-0" />

            <div className="relative p-5">
              {GROUP_ORDER.filter((g) => SERVICES.some((s) => s.group === g)).map((g) => (
                <div key={g} className="mb-4 last:mb-0">
                  {/* group label with a fibre-dash lead-in */}
                  <div className="mb-2 flex items-center gap-2.5 px-2">
                    <span aria-hidden="true" className="h-px w-5 bg-[image:var(--gradient-aurora)]" />
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cyan">
                      {g}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SERVICES.filter((s) => s.group === g).map((s) => {
                      const Icon = s.icon;
                      const to = s.link || `/services?tab=${s.id}`;
                      return (
                        <Link
                          key={s.id}
                          to={to}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                          className="group/item relative flex items-start gap-3 overflow-hidden rounded-xl border border-transparent px-3 py-2.5 transition-[background-color,border-color] duration-200 hover:border-electric/30 hover:bg-electric/[0.06]"
                        >
                          {/* aurora hexagon icon — matches the storm-fibre hub language */}
                          <span className="relative mt-0.5 grid h-9 w-9 shrink-0 place-items-center">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-0 shadow-glow transition-opacity duration-200 group-hover/item:opacity-100"
                              style={{ clipPath: HEX }}
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 border border-line bg-electric/[0.10] transition-opacity duration-200 group-hover/item:opacity-0"
                              style={{ clipPath: HEX }}
                            />
                            <span className="absolute inset-[2px] grid place-items-center bg-navy-deep opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" style={{ clipPath: HEX }} />
                            <Icon size={17} aria-hidden="true" className="relative text-electric" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-tight text-ink">
                              {s.title}
                              <ArrowRight
                                size={13}
                                aria-hidden="true"
                                className="shrink-0 -translate-x-1 text-electric opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              />
                            </span>
                            <span className="mt-0.5 block text-[12px] leading-snug text-grey">
                              {s.tagline}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* footer rail — full services page + direct contact */}
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-line-soft px-2 pt-4">
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className="group/all inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-electric"
                >
                  View all services
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="text-electric transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                  />
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-[12.5px] text-grey transition-colors hover:text-electric"
                >
                  <Mail size={14} aria-hidden="true" className="text-electric" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobServices, setMobServices] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    setMobServices(false);
  };

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMobServices(false);
  }, [pathname]);

  const servicesActive = pathname === "/services";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-glass-edge bg-navy-deep/85 shadow-glass backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[90rem] items-center justify-between gap-4 px-6">
        <span className="hidden shrink-0 sm:block">
          <Logo markH={48} onClick={close} />
        </span>
        <span className="block shrink-0 sm:hidden">
          <Logo markH={38} withTagline={false} onClick={close} />
        </span>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5" aria-label="Primary">
          {NAV.map((n) =>
            n.to === "/services" ? (
              <ServicesMenu key="services" active={servicesActive} />
            ) : (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {({ isActive }) => (
                  <span
                    className={`group relative inline-flex whitespace-nowrap rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors hover:text-ink ${
                      isActive ? "text-ink" : "text-grey"
                    }`}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-[image:var(--gradient-aurora)] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* Mobile toggle — icon crossfades/rotates between menu and close */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2 grid h-11 w-11 place-items-center rounded-lg border border-transparent text-ink transition-colors hover:border-electric/30 hover:bg-electric/[0.06] lg:hidden"
        >
          <Menu
            size={24}
            aria-hidden="true"
            className={`absolute transition-all duration-300 ${open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
          />
          <X
            size={24}
            aria-hidden="true"
            className={`absolute text-electric transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative overflow-hidden border-t border-glass-edge bg-navy-deep/95 backdrop-blur-xl lg:hidden"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-aurora)] opacity-70" />
            <div className="px-6 pb-7 pt-3">
              {NAV.map((n, i) =>
                n.to === "/services" ? (
                  <MobileNavRow key="services" index={i} reduce={reduce}>
                    <div className="border-b border-line-soft">
                      <div className="flex items-center justify-between">
                        <NavLink
                          to="/services"
                          onClick={close}
                          className={({ isActive }) =>
                            `group flex items-center gap-3 py-[15px] text-[16px] font-medium ${
                              isActive ? "text-electric" : "text-ink"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span
                                aria-hidden="true"
                                className={`h-5 w-px rounded-full bg-[image:var(--gradient-aurora)] transition-opacity duration-300 ${
                                  isActive ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              Services
                            </>
                          )}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => setMobServices((v) => !v)}
                          aria-expanded={mobServices}
                          aria-controls="mobile-services"
                          aria-label="Toggle services list"
                          className="grid h-11 w-11 place-items-center rounded-lg text-grey transition-colors hover:text-electric"
                        >
                          <ChevronDown
                            size={20}
                            aria-hidden="true"
                            className={`text-electric transition-transform duration-300 ${mobServices ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobServices && (
                          <motion.div
                            id="mobile-services"
                            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-1 border-l border-line-soft pb-3 pl-4">
                              {GROUP_ORDER.filter((g) => SERVICES.some((s) => s.group === g)).map((g) => (
                                <div key={g} className="mb-1">
                                  <div className="flex items-center gap-2 pt-3">
                                    <span aria-hidden="true" className="h-px w-4 bg-[image:var(--gradient-aurora)]" />
                                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cyan">
                                      {g}
                                    </p>
                                  </div>
                                  {SERVICES.filter((s) => s.group === g).map((s) => {
                                    const Icon = s.icon;
                                    return (
                                      <Link
                                        key={s.id}
                                        to={s.link || `/services?tab=${s.id}`}
                                        onClick={close}
                                        className="group flex items-center gap-3 rounded-xl py-2.5 pl-1 text-[14.5px] text-grey transition-colors hover:text-ink"
                                      >
                                        <span className="relative grid h-8 w-8 shrink-0 place-items-center">
                                          <span aria-hidden="true" className="absolute inset-0 border border-line bg-electric/[0.10] transition-colors group-hover:border-electric/40" style={{ clipPath: HEX }} />
                                          <Icon size={15} aria-hidden="true" className="relative text-electric" />
                                        </span>
                                        {s.title}
                                      </Link>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </MobileNavRow>
                ) : (
                  <MobileNavRow key={n.to} index={i} reduce={reduce}>
                    <NavLink
                      to={n.to}
                      end={n.end}
                      onClick={close}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 border-b border-line-soft py-[15px] text-[16px] font-medium ${
                          isActive ? "text-electric" : "text-ink"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`h-5 w-px rounded-full bg-[image:var(--gradient-aurora)] transition-opacity duration-300 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {n.label}
                        </>
                      )}
                    </NavLink>
                  </MobileNavRow>
                )
              )}
              <div className="mt-5">
                <Button to="/contact" onClick={close}>
                  Discuss Requirements
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* Staggered fade-in for each mobile nav row — collapses to a plain render under
   reduced motion. Keeps the row markup flat so borders stay flush. */
function MobileNavRow({ children, index, reduce }) {
  if (reduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
