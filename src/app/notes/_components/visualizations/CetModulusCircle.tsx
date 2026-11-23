/**
 * Static figure: |z − a| = r is a circle, centre a, radius r (concept
 * cetcn-circle-from-modulus-condition), drawn with the concept's worked
 * example |z − 2 − 3i| = 4: |z − (2 + 3i)| = 4, the points at distance 4
 * from 2 + 3i, so centre (2, 3) and radius 4, (x − 2)² + (y − 3)² = 16.
 * A sample point z on the circle carries the radius; the four points due
 * east, north, west and south of the centre are labelled, each at distance 4.
 * Server component. Pinned by tests/notes-cet-visuals-maths.test.ts.
 */

/** The concept's worked example: centre a = 2 + 3i, radius 4. */
export const CIRCLE = { cx: 2, cy: 3, r: 4 } as const;

/** |z − a| for z = x + iy. */
export const distanceFromCentre = (x: number, y: number) => Math.hypot(x - CIRCLE.cx, y - CIRCLE.cy);

/** The Cartesian form's left side minus right side, (x − 2)² + (y − 3)² − 16. */
export const cartesian = (x: number, y: number) => (x - CIRCLE.cx) ** 2 + (y - CIRCLE.cy) ** 2 - CIRCLE.r ** 2;

/** The labelled points on the circle: east, north, west, south of the centre. */
export const COMPASS_POINTS = [
  { x: 6, y: 3, label: "6 + 3i" },
  { x: 2, y: 7, label: "2 + 7i" },
  { x: -2, y: 3, label: "−2 + 3i" },
  { x: 2, y: -1, label: "2 − i" },
] as const;

/** The sample point z, at 135° from the centre. */
export const SAMPLE_ANGLE = (3 * Math.PI) / 4;

// Plot geometry (viewBox units): x from −3 to 7, y from −2 to 8.
export const PLOT = { left: 20, top: 20, unit: 18, xMin: -3, xMax: 7, yMin: -2, yMax: 8 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (x: number) => r2(PLOT.left + (x - PLOT.xMin) * PLOT.unit);
export const py = (y: number) => r2(PLOT.top + (PLOT.yMax - y) * PLOT.unit);

const LABEL_AT = [
  { dx: 5, dy: -5, anchor: "start" },
  { dx: 6, dy: -5, anchor: "start" },
  { dx: 5, dy: 12, anchor: "start" },
  { dx: 6, dy: 12, anchor: "start" },
] as const;

export default function CetModulusCircle() {
  const z = { x: CIRCLE.cx + CIRCLE.r * Math.cos(SAMPLE_ANGLE), y: CIRCLE.cy + CIRCLE.r * Math.sin(SAMPLE_ANGLE) };
  const ticks = [-2, 2, 4, 6];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a modulus condition as a circle in the Argand plane
      </p>
      <svg
        viewBox="0 0 320 230"
        className="block h-auto w-full"
        role="img"
        aria-label="Argand plane with the circle |z − 2 − 3i| = 4: centre 2 + 3i, radius 4, passing through 6 + 3i, 2 + 7i, −2 + 3i and 2 − i."
      >
        {/* Grid */}
        {Array.from({ length: PLOT.xMax - PLOT.xMin + 1 }, (_, k) => PLOT.xMin + k).map((x) => (
          <line key={`v${x}`} x1={px(x)} y1={py(PLOT.yMin)} x2={px(x)} y2={py(PLOT.yMax)} className="stroke-border" strokeWidth={0.5} />
        ))}
        {Array.from({ length: PLOT.yMax - PLOT.yMin + 1 }, (_, k) => PLOT.yMin + k).map((y) => (
          <line key={`h${y}`} x1={px(PLOT.xMin)} y1={py(y)} x2={px(PLOT.xMax)} y2={py(y)} className="stroke-border" strokeWidth={0.5} />
        ))}
        {/* Axes */}
        <line x1={px(PLOT.xMin)} y1={py(0)} x2={px(PLOT.xMax)} y2={py(0)} className="stroke-muted-foreground" />
        <line x1={px(0)} y1={py(PLOT.yMin)} x2={px(0)} y2={py(PLOT.yMax)} className="stroke-muted-foreground" />
        {ticks.map((t) => (
          <text key={`x${t}`} x={px(t)} y={py(0) + 10} textAnchor="middle" className="fill-muted-foreground text-[8px] tabular-nums">
            {t < 0 ? `−${-t}` : t}
          </text>
        ))}
        {[2, 4, 6].map((t) => (
          <text key={`y${t}`} x={px(0) - 3} y={py(t) + 3} textAnchor="end" className="fill-muted-foreground text-[8px] tabular-nums">
            {t < 0 ? `−${-t}` : t}
          </text>
        ))}
        <text x={px(PLOT.xMax) - 2} y={py(0) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          Re
        </text>
        <text x={px(0) + 4} y={py(PLOT.yMax) + 10} className="fill-muted-foreground text-[10px]">
          Im
        </text>

        {/* The circle */}
        <circle cx={px(CIRCLE.cx)} cy={py(CIRCLE.cy)} r={CIRCLE.r * PLOT.unit} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* Radius to the sample point z */}
        <line x1={px(CIRCLE.cx)} y1={py(CIRCLE.cy)} x2={px(z.x)} y2={py(z.y)} strokeWidth={1.8} className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={px((CIRCLE.cx + z.x) / 2) + 6} y={py((CIRCLE.cy + z.y) / 2) + 2} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          4
        </text>
        <circle cx={px(z.x)} cy={py(z.y)} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <text x={px(z.x) - 6} y={py(z.y) - 5} textAnchor="end" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          z
        </text>

        {/* The four compass points, each 4 from the centre */}
        {COMPASS_POINTS.map((p, i) => {
          const l = LABEL_AT[i];
          return (
            <g key={p.label}>
              <circle cx={px(p.x)} cy={py(p.y)} r={2.5} className="fill-indigo-600 dark:fill-indigo-400" />
              <text x={px(p.x) + l.dx} y={py(p.y) + l.dy} textAnchor={l.anchor} className="fill-indigo-700 text-[9px] tabular-nums dark:fill-indigo-300">
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Centre */}
        <circle cx={px(CIRCLE.cx)} cy={py(CIRCLE.cy)} r={3.5} className="fill-foreground" />
        <text x={px(CIRCLE.cx) + 6} y={py(CIRCLE.cy) + 12} className="fill-foreground text-[10px] font-semibold">
          a = 2 + 3i
        </text>

        {/* The reading */}
        <g className="text-[11px] tabular-nums">
          <text x={208} y={30} className="fill-foreground font-semibold">
            |z − 2 − 3i| = 4
          </text>
          <text x={208} y={48} className="fill-muted-foreground">
            = |z − (2 + 3i)|
          </text>
          <text x={208} y={68} className="fill-foreground">
            centre (2, 3)
          </text>
          <text x={208} y={86} className="fill-foreground">
            radius 4
          </text>
        </g>
        <text x={160} y={222} textAnchor="middle" className="fill-foreground text-[11px] tabular-nums">
          (x − 2)² + (y − 3)² = 16
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        |z − a| is the distance from z to the point a. Keeping it fixed at 4 traces every point 4 away from 2 + 3i: a circle. Read the
        centre off the sign: |z − 2 − 3i| is |z − (2 + 3i)|, centred at 2 + 3i, just as |z + 1| = |z − (−1)| is centred at −1, not at +1.
      </p>
    </div>
  );
}
