/*
 * NetworkBackdrop — decorative "storm-fibre" node/link mesh.
 *
 * Each link renders twice: a faint static base strand plus a bright cyan
 * dash that streams along it, reading as data packets flowing across the
 * fabric. Strokes use vectorEffect="non-scaling-stroke" so both the line
 * weight and the dash pattern stay crisp instead of being smeared by the
 * preserveAspectRatio="none" stretch (the old mesh looked static precisely
 * because the dashes were stretched into invisibility). The whole mesh
 * drifts slowly for an organic, alive feel. Purely ornamental → aria-hidden,
 * non-interactive, and every animation freezes under prefers-reduced-motion.
 */
const SPARSE = {
  nodes: [
    [15, 30],
    [40, 65],
    [65, 25],
    [85, 60],
    [50, 45],
  ],
  links: [
    [0, 4],
    [4, 1],
    [4, 2],
    [2, 3],
    [1, 3],
  ],
};

const DENSE = {
  nodes: [
    [12, 22],
    [28, 60],
    [44, 18],
    [60, 70],
    [76, 34],
    [88, 64],
    [20, 84],
    [70, 12],
    [50, 44],
    [34, 38],
    [66, 52],
    [90, 22],
  ],
  links: [
    [0, 8],
    [8, 1],
    [8, 4],
    [8, 3],
    [2, 8],
    [4, 5],
    [1, 6],
    [4, 7],
    [3, 5],
    [0, 9],
    [9, 2],
    [9, 8],
    [8, 10],
    [10, 4],
    [10, 5],
    [7, 11],
    [11, 4],
  ],
};

export default function NetworkBackdrop({ dense = false, className = "" }) {
  const { nodes, links } = dense ? DENSE : SPARSE;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`storm-drift pointer-events-none absolute inset-0 h-full w-full opacity-60 ${className}`}
    >
      {links.map(([a, b], i) => {
        const x1 = nodes[a][0];
        const y1 = nodes[a][1];
        const x2 = nodes[b][0];
        const y2 = nodes[b][1];
        return (
          <g key={`l-${i}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="storm-link-base"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="storm-link-flow"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${(i % 5) * 0.5}s` }}
            />
          </g>
        );
      })}
      {nodes.map(([x, y], i) => (
        <g key={`n-${i}`}>
          <circle
            cx={x}
            cy={y}
            r="0.55"
            fill="var(--color-cyan)"
            className="storm-node"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
          <circle
            cx={x}
            cy={y}
            r="1.6"
            fill="none"
            stroke="var(--color-electric)"
            strokeWidth="0.12"
            className="net-pulse"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
