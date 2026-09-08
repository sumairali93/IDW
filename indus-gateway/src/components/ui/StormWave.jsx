/*
 * StormWave — a STATIC, isometric-3D "deep-ocean" dot-matrix wave hugging the
 * bottom of the hero. A DENSE grid of dots sits on a depth-skewed (isometric)
 * plane and is displaced by a rolling sine surface carrying exactly FIVE
 * wavelengths across the width. Brightness and dot size are baked in from the
 * crest height, so the shimmer is frozen (no travelling sweep) — a still,
 * glinting swell, not a flat 2D ribbon.
 *
 * "Deep ocean": many depth rows with a steep falloff so far rows sink into the
 * navy, and troughs go near-black between the lit crests.
 *
 * "Point-light spill": the wave is lit like a real bulb — the glowing hexagon
 * hub sits above the top-CENTRE of the field, so brightness is governed by an
 * inverse-distance falloff from that point. Dots directly under the hub glow;
 * brightness decays radially with distance, and the far edges / deep rows sink
 * to near-black — exactly as a lamp only lights what is near it. The crest
 * shimmer only MODULATES within the lit pool (multiplicative), it does not add
 * its own uniform glow. Geometry is deterministic (pure Math.sin), computed
 * once at module load. Decorative → aria-hidden.
 */

const COLS = 340; // dots across the width — very dense, near-continuous surface
const ROWS = 46; // depth rows (front → back) — deep-ocean thickness
const DX = 1.16; // world spacing across (tight, keeps overall width ~same)
const WAVELENGTHS = 5; // crests across the width (5 up + 5 down)
const AMP = 5.4; // wave height
const SKEW_X = 0.36; // isometric horizontal shift per depth row
const RISE = 0.56; // isometric vertical rise per depth row
const TWO_PI = Math.PI * 2;

const WORLD_W = COLS * DX;

// ---- Pass 1: build the raw isometric dot field (no lighting yet) ----
const RAW = [];
let minX = Infinity,
  maxX = -Infinity,
  minY = Infinity,
  maxY = -Infinity;

// Sum of the octave amplitudes below — used to normalise the surface to [-1,1].
const SURF_NORM = 0.62 + 0.26 + 0.16;

for (let j = 0; j <= ROWS; j += 1) {
  for (let i = 0; i <= COLS; i += 1) {
    const worldX = i * DX;
    const u = i / COLS;
    const v = j / ROWS;
    // Ocean swell = several sine octaves of different wavelength, amplitude and
    // depth-drift layered together, so the surface is irregular and organic
    // rather than a single perfect (artificial) ripple. Each octave also drifts
    // along depth at its own rate → wavefronts that curve into the distance.
    const p1 = u * WAVELENGTHS * TWO_PI + v * 1.15 * TWO_PI;
    const p2 = u * WAVELENGTHS * 1.93 * TWO_PI - v * 0.7 * TWO_PI + 1.3;
    const p3 = u * WAVELENGTHS * 0.47 * TWO_PI + v * 0.45 * TWO_PI + 2.1;
    const surf = (0.62 * Math.sin(p1) + 0.26 * Math.sin(p2) + 0.16 * Math.sin(p3)) / SURF_NORM;
    const h = AMP * surf;
    // Sharpen crests / deepen troughs (near-black valleys) for the ocean look.
    const crest = Math.pow((surf + 1) / 2, 1.6);

    // Isometric projection: deeper rows shift right and rise up.
    const sx = worldX + j * SKEW_X;
    const sy = -h - j * RISE;

    // Horizontal edge fade so the field dissolves into the dark at both ends.
    const edge = Math.min(1, worldX / 90, (WORLD_W - worldX) / 90);

    RAW.push({ sx, sy, crest, edge });
    if (sx < minX) minX = sx;
    if (sx > maxX) maxX = sx;
    if (sy < minY) minY = sy;
    if (sy > maxY) maxY = sy;
  }
}

// ---- Point light: the hexagon hub, above the top-centre of the field ----
// The hub lives in the hero's RIGHT column (right of page-centre), so the lamp
// is biased right of the field midpoint — otherwise its peak lands left of the
// chip and the left side over-brightens.
const LIGHT_BIAS = 0.64; // 0.5 = field centre, 1 = far right
const FIELD_W = maxX - minX;
const FIELD_H = maxY - minY;
const LIGHT_SX = minX + FIELD_W * LIGHT_BIAS; // under the hub (right of centre)
const LIGHT_SY = minY - FIELD_H * 0.35; // slightly ABOVE the crest line
// Falloff radii. Horizontal is ASYMMETRIC: much tighter to the LEFT of the lamp
// so the left flank sinks into the dark, gentler to the right toward the chip.
const RADIUS_X_L = FIELD_W * 0.15; // left of the lamp — sharp drop-off
const RADIUS_X_R = FIELD_W * 0.28; // right of the lamp
const RADIUS_Y = FIELD_H * 1.05;

// ---- Pass 2: apply the radial light law to every dot ----
const DOTS = RAW.map(({ sx, sy, crest, edge }) => {
  const rx = sx < LIGHT_SX ? RADIUS_X_L : RADIUS_X_R;
  const dxN = (sx - LIGHT_SX) / rx;
  const dyN = (sy - LIGHT_SY) / RADIUS_Y;
  const light = Math.exp(-(dxN * dxN + dyN * dyN)); // 1 under the hub → 0 far away

  // Underwater depth tint: dots outside the lit pool stay faintly visible as the
  // water body itself (not pure black), so the whole field reads as ONE volume
  // of water with the wave rippling inside it — not a lit shape on empty space.
  // The floor itself falls off horizontally with the light so the field dissolves
  // into the navy at the sides rather than forming a visible dim rectangle.
  const ambient = (0.05 + 0.09 * light) * (1 - 0.4 * dyN * dyN);
  // Brightness = ambient water + the lamp pool, then the crest shimmer MODULATES
  // it so ridges glint and troughs stay dark WITHIN the lit area.
  const o = Math.max(0.02, Math.min(1, (ambient + 0.86 * light) * (0.34 + 0.66 * crest) * edge));
  // Lit crest dots pop a little larger — a subtle specular cue near the lamp.
  const r = 0.3 + 0.22 * crest + 0.42 * light * crest;
  // Colour shift: bright cyan under the lamp, sinking to deep blue in the dark —
  // the tell-tale colour gradient of looking down through water.
  const fill = light > 0.32 ? "var(--color-cyan)" : light > 0.1 ? "var(--color-electric)" : "var(--color-blue)";
  return { x: sx, y: sy, o, r, fill };
});

const PAD = 1.5;
const VB = `${minX - PAD} ${minY - PAD} ${maxX - minX + PAD * 2} ${maxY - minY + PAD * 2}`;

export default function StormWave({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={VB}
      preserveAspectRatio="xMidYMax slice"
      className={`storm-wave-svg pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(120px,22vh,240px)] w-full opacity-90 ${className}`}
    >
      {DOTS.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.fill}
          className="storm-wave-dot"
          style={{ "--o": d.o }}
        />
      ))}
    </svg>
  );
}
