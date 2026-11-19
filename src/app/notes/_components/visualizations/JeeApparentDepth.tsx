/**
 * Static figure: apparent depth (concept jpray-apparent-depth). A coin lies
 * under 12 cm of water (μ = 4/3), the concept's first practice item. Rays from
 * it bend away from the normal as they leave the water; traced back, they meet
 * at the image, raised to d/μ = 9 cm below the surface, a normal shift of
 * d(1 − 1/μ) = 3 cm.
 *
 * The rays are drawn to scale with Snell's law (sin r = μ sin i), leaving the
 * coin 2 cm either side of the normal (i ≈ 9.5°, r ≈ 12.7°). Near the normal
 * the traced-back rays meet at d/μ; these two meet 8.9 cm down, within 0.1 cm
 * of it, which is why the formula holds only for viewing near the normal.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts. Server component.
 */

/** The practice item: depth in cm, refractive index of water. */
export const DEPTH_EXAMPLE = { d: 12, mu: 4 / 3 } as const;

export const apparentDepth = (d: number, mu: number) => d / mu;
export const normalShift = (d: number, mu: number) => d * (1 - 1 / mu);

/** Apparent depth of a stack of layers: each layer's d/μ, added. */
export const layeredApparentDepth = (layers: readonly { d: number; mu: number }[]) => layers.reduce((s, l) => s + l.d / l.mu, 0);

/** Angle in air (radians) of a ray leaving the water at angle i (radians): sin r = μ sin i. */
export const refractedAngle = (i: number, mu: number) => Math.asin(mu * Math.sin(i));

/** Ray from the object, leaving the surface `offset` cm from the normal: the angles, and the depth where it appears to come from. */
export function tracedRay(offset: number, d = DEPTH_EXAMPLE.d, mu = DEPTH_EXAMPLE.mu) {
  const i = Math.atan(offset / d);
  const r = refractedAngle(i, mu);
  return { i, r, tracedDepth: offset / Math.tan(r) };
}

/** Horizontal distance (cm) of the drawn rays from the normal where they leave the water. */
export const RAY_OFFSET = 2;

// Geometry (viewBox units): 12 per cm.
const UNIT = 12;
export const SURFACE_Y = 64;
const NORMAL_X = 120;
const TOP_Y = 22;
const r2 = (n: number) => Math.round(n * 100) / 100;
const depthY = (cm: number) => r2(SURFACE_Y + cm * UNIT);

function Head({ x, y, deg, cls }: { x: number; y: number; deg: number; cls: string }) {
  return <polygon points="0,0 -8,-4 -8,4" transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(deg)})`} className={cls} />;
}

function DimLine({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} strokeWidth={1.2} className="stroke-foreground" />
    </g>
  );
}

export default function JeeApparentDepth() {
  const { d, mu } = DEPTH_EXAMPLE;
  const app = Math.round(apparentDepth(d, mu) * 100) / 100;
  const shift = Math.round(normalShift(d, mu) * 100) / 100;
  const ray = tracedRay(RAY_OFFSET);
  const objY = depthY(d);
  const imgY = depthY(app);
  const tracedY = depthY(ray.tracedDepth);
  const off = RAY_OFFSET * UNIT;
  const rise = SURFACE_Y - TOP_Y;
  const spread = rise * Math.tan(ray.r);
  const headDeg = (side: 1 | -1) => (Math.atan2(-rise, side * spread) * 180) / Math.PI;
  const RAY = "stroke-amber-600 dark:stroke-amber-400";
  const RAY_FILL = "fill-amber-600 dark:fill-amber-400";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · why a coin under water looks raised
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="A coin under 12 centimetres of water seen from straight above. Rays from it bend away from the normal as they leave the water, and traced back they seem to come from a point 9 centimetres down: the coin appears raised by 3 centimetres."
      >
        <text x={NORMAL_X} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          seen from straight above
        </text>

        {/* Water */}
        <rect x={10} y={SURFACE_Y} width={300} height={objY - SURFACE_Y + 6} className="fill-sky-100 dark:fill-sky-950/60" />
        <line x1={10} y1={SURFACE_Y} x2={310} y2={SURFACE_Y} strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={16} y={56} className="fill-muted-foreground text-[10px]">
          air
        </text>
        <text x={16} y={80} className="fill-sky-800 text-[10px] dark:fill-sky-300">
          water, μ = 4/3
        </text>

        {/* The normal through the coin */}
        <line x1={NORMAL_X} y1={TOP_Y} x2={NORMAL_X} y2={objY} strokeDasharray="3 3" className="stroke-muted-foreground" />

        {/* Rays: coin to surface, then bent away from the normal */}
        {([-1, 1] as const).map((side) => {
          const sx = NORMAL_X + side * off;
          const ex = r2(sx + side * spread);
          return (
            <g key={side}>
              <line x1={NORMAL_X} y1={objY} x2={sx} y2={SURFACE_Y} strokeWidth={1.8} className={RAY} />
              <line x1={sx} y1={SURFACE_Y} x2={ex} y2={TOP_Y} strokeWidth={1.8} className={RAY} />
              <Head x={ex} y={TOP_Y} deg={headDeg(side)} cls={RAY_FILL} />
              <line x1={sx} y1={SURFACE_Y} x2={NORMAL_X} y2={tracedY} strokeDasharray="3 3" strokeWidth={1.2} className={RAY} />
            </g>
          );
        })}
        <line x1={NORMAL_X} y1={objY} x2={NORMAL_X} y2={TOP_Y + 4} strokeWidth={1.8} className={RAY} />
        <Head x={NORMAL_X} y={TOP_Y} deg={-90} cls={RAY_FILL} />

        {/* The normal where the right ray leaves */}
        <line x1={NORMAL_X + off} y1={SURFACE_Y - 22} x2={NORMAL_X + off} y2={SURFACE_Y + 22} strokeDasharray="2 2" className="stroke-muted-foreground" />
        <text x={166} y={36} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          bends away from the normal
        </text>

        {/* Coin and image */}
        <ellipse cx={NORMAL_X} cy={objY} rx={9} ry={3} className="fill-amber-500 dark:fill-amber-400" />
        <text x={NORMAL_X + 12} y={objY + 2} className="fill-foreground text-[11px] font-semibold">
          O
        </text>
        <circle cx={NORMAL_X} cy={imgY} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={NORMAL_X - 9} y={imgY + 4} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          I
        </text>

        {/* Depths */}
        <line x1={NORMAL_X} y1={imgY} x2={236} y2={imgY} strokeDasharray="2 3" className="stroke-indigo-400 dark:stroke-indigo-500" />
        <line x1={NORMAL_X} y1={objY} x2={296} y2={objY} strokeDasharray="2 3" className="stroke-muted-foreground" />
        <DimLine x={232} y1={SURFACE_Y} y2={imgY} />
        <text x={226} y={122} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          apparent {app} cm
        </text>
        <DimLine x={292} y1={SURFACE_Y} y2={objY} />
        <text x={286} y={196} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          real {d} cm
        </text>
        <DimLine x={70} y1={imgY} y2={objY} />
        <text x={64} y={194} textAnchor="end" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          shift {shift} cm
        </text>
      </svg>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        Apparent depth = d/μ = 12 ÷ 4/3 = {app} cm; shift = d(1 − 1/μ) = {shift} cm
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        O is the coin, I its image. Rays leaving the water bend away from the normal, so the eye traces them back to I, higher than O. The rays
        are drawn to scale; viewed near the normal they meet at d/μ. With μ = 4/3 the shift is d/4 and the apparent depth 3d/4, so read which one
        a question gives. For layers, add each layer&apos;s d/μ: 8 cm of water over 6 cm of glass (μ = 1.5) looks 6 + 4 = 10 cm deep.
      </p>
    </div>
  );
}
