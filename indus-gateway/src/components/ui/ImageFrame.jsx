import { ImageIcon } from "lucide-react";

/*
 * ImageFrame — rounded media frame with a glass edge + aurora glow bezel
 * (§6, §11). Until real licensed photography is sourced (decision #2),
 * pass no `src` and it renders a clearly-marked placeholder instead of a
 * broken box, so layout stays reviewable.
 *
 *   src / alt — when src is provided, renders a real <img> (lazy, async).
 *   label     — caption shown on the placeholder (e.g. "Datacenter hall").
 *   ratio     — aspect-ratio utility class (default 4/3).
 *   children  — overlay content (e.g. floating StatPills), positioned by
 *               the caller; the frame itself is `relative`.
 */
export default function ImageFrame({
  src,
  alt = "",
  label = "Placeholder image",
  ratio = "aspect-[4/3]",
  className = "",
  children,
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Aurora glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[40px] bg-[image:var(--gradient-aurora)] opacity-20 blur-2xl"
      />
      {/* Aurora bezel → inner frame */}
      <div className="rounded-xl bg-[image:var(--gradient-aurora)] p-px shadow-glass">
        <div
          className={`relative ${ratio} overflow-hidden rounded-[calc(var(--radius-xl)-1px)] border border-glass-edge bg-glass-dark backdrop-blur-xl`}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="net-grid-overlay absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-2 text-grey-dim">
                <ImageIcon size={30} aria-hidden="true" />
                <span className="text-[12px] font-medium uppercase tracking-[0.16em]">
                  {label}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
