import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/*
 * StickyCTA — a single, unambiguous primary action pinned to the
 * bottom on mobile once the user scrolls past the hero. Hidden on
 * lg+ (the navbar CTA is always visible there). Token-driven.
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-glass-edge bg-navy-deep/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        to="/contact"
        className="group flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-pill border border-electric bg-electric px-5 py-3 text-[15px] font-semibold tracking-tight text-navy-deep"
      >
        Request Consultation
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
