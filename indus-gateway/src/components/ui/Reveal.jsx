import { motion, useReducedMotion } from "framer-motion";

/*
 * Reveal — subtle scroll-into-view fade + rise.
 * Honours prefers-reduced-motion by rendering statically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  once = true,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}
