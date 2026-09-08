import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSeo } from "../../utils/seo.js";

/*
 * PageShell wraps every page:
 *  - sets per-route SEO (title / description / canonical)
 *  - scrolls to top on mount
 *  - applies a subtle enter/exit transition (disabled when the
 *    user prefers reduced motion)
 */
export default function PageShell({ seoKey, children }) {
  useSeo(seoKey);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (reduce) return <main>{children}</main>;

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
