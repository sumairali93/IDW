import { AlertCircle } from "lucide-react";
import { SHOW_REVIEW_FLAGS } from "../../config.js";

/*
 * ReviewFlag — internal approval reminder.
 * Renders ONLY when SHOW_REVIEW_FLAGS is true (see src/config.js).
 * In public builds it returns null, so approval-sensitive notes
 * never reach end users while the copy stays exactly as written.
 */
export default function ReviewFlag({ children }) {
  if (!SHOW_REVIEW_FLAGS) return null;
  return (
    <div className="mt-3.5 flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/[0.08] px-3 py-2 text-[12.5px] leading-relaxed text-amber-300">
      <AlertCircle size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>
        <strong className="font-bold">Review flag — </strong>
        {children}
      </span>
    </div>
  );
}
