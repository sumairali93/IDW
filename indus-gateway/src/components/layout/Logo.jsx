import { Link } from "react-router-dom";

/*
 * Logo — the bright iGW mark (transparent PNG) plus the wordmark
 * rendered as live text. The wordmark is text, not part of the
 * image, so it stays crisp at any size and keeps full contrast on
 * the dark navy background (the logo file's printed wordmark is
 * dark-on-white and would not read on navy).
 *
 * `markH` is the mark height in px. `withTagline` shows the strap.
 */
export default function Logo({
  markH = 46,
  withTagline = true,
  to = "/",
  onClick,
  className = "",
}) {
  const inner = (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src="/igw-mark.png"
        alt="Indus Gateway"
        style={{ height: markH }}
        className="w-auto select-none"
        draggable="false"
      />
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display font-bold tracking-tight text-ink"
          style={{ fontSize: markH * 0.36 }}>
          INDUS GATEWAY
        </span>
        {withTagline && (
          <span
            className="mt-[3px] block whitespace-nowrap font-medium uppercase tracking-[0.18em] text-cyan"
            style={{ fontSize: markH * 0.2 }}
          >
            Building the Digital Highway
          </span>
        )}
      </span>
    </span>
  );

  if (!to) return inner;
  return (
    <Link to={to} onClick={onClick} aria-label="Indus Gateway — home" className="inline-flex">
      {inner}
    </Link>
  );
}
