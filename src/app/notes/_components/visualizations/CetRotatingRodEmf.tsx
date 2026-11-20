/**
 * Static figure: why a rod spinning about one end gives e = ½Bωl²
 * (concept cetp-emi-rotating-rod-disc), drawn with the concept's worked
 * example: a 0.5 m rod at 20 rad/s in a 0.4 T field perpendicular to its plane
 * of rotation.
 *
 * Each point at distance r from the pivot moves at ωr, at right angles to the
 * rod, so the speeds grow from 0 at the pivot to ωl = 10 m/s at the free end
 * (a straight line of arrow tips). The average speed is ωl/2 = 5 m/s, and
 * e = B·l·(ωl/2) = 0.4 × 0.5 × 5 = 1 V. The inset is the concept's trap: a
 * wheel's spokes are in parallel between axle and rim, so the e.m.f. is one
 * spoke's, not one spoke's times the number of spokes.
 * Server component, pure SVG. Pinned by tests/notes-w2-19.test.ts.
 */

/** The worked example. */
export const ROD = { l: 0.5, omega: 20, B: 0.4 } as const;

/** Speed (m/s) of the point at distance r (m) from the pivot. */
export const speedAt = (r: number) => ROD.omega * r;

/** Average speed along the rod: ωl/2. */
export const averageSpeed = () => (ROD.omega * ROD.l) / 2;

/** e = B·l·(average speed). */
export const emfFromAverage = () => ROD.B * ROD.l * averageSpeed();

/** e = ½Bωl², the formula. */
export const emfFormula = () => 0.5 * ROD.B * ROD.omega * ROD.l * ROD.l;

/** Points along the rod where a speed arrow is drawn, m from the pivot. */
export const ARROW_R: readonly number[] = [0.125, 0.25, 0.375, 0.5];

// Geometry (viewBox units).
export const PIVOT = { x: 26, y: 156 } as const;
/** Drawn length of the 0.5 m rod. */
export const ROD_PX = 160;
/** Arrow length per m/s. */
export const SPEED_PX = 6;
export const WHEEL = { x: 282, y: 100, r: 22, spokes: 4 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const xAt = (r: number) => r2(PIVOT.x + (r / ROD.l) * ROD_PX);
const tipY = (r: number) => r2(PIVOT.y - speedAt(r) * SPEED_PX);

const fmt = (n: number) => (Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : String(Math.round(n * 100) / 100));

export default function CetRotatingRodEmf() {
  const crosses: { x: number; y: number }[] = [];
  for (let gx = 0; gx < 6; gx++) for (let gy = 0; gy < 2; gy++) crosses.push({ x: 40 + gx * 34, y: 30 + gy * 24 });
  const end = xAt(ROD.l);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a rod spinning about one end
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="A 0.5 metre rod pivoted at one end turns at 20 radians per second in a 0.4 tesla field perpendicular to its plane. Speed arrows at right angles to the rod grow from zero at the pivot to 10 metres per second at the free end; the average is 5 metres per second at the middle, so the e.m.f. is 0.4 times 0.5 times 5, which is 1 volt. An inset wheel shows four spokes in parallel between axle and rim, so the wheel gives the e.m.f. of one spoke."
      >
        {/* Field: perpendicular to the plane of rotation */}
        {crosses.map((c) => (
          <text key={`${c.x}-${c.y}`} x={c.x} y={c.y} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            ⊗
          </text>
        ))}
        <text x={8} y={76} className="fill-muted-foreground text-[10px]">
          B = 0.4 T, perpendicular to the plane
        </text>

        {/* Line through the arrow tips: speed grows in proportion to r */}
        <line x1={PIVOT.x} y1={PIVOT.y} x2={end} y2={tipY(ROD.l)} strokeDasharray="3 3" className="stroke-sky-500 dark:stroke-sky-400" />

        {/* Speed arrows */}
        {ARROW_R.map((r) => (
          <g key={r}>
            <line x1={xAt(r)} y1={PIVOT.y} x2={xAt(r)} y2={tipY(r) + 6} strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />
            <polygon
              points={`${xAt(r)},${tipY(r)} ${xAt(r) - 4},${tipY(r) + 7} ${xAt(r) + 4},${tipY(r) + 7}`}
              className="fill-sky-600 dark:fill-sky-400"
            />
            <text x={xAt(r) + 4} y={tipY(r) + 10} className="fill-sky-700 text-[9px] tabular-nums dark:fill-sky-300">
              {fmt(speedAt(r))} m/s
            </text>
          </g>
        ))}

        {/* Average speed at the middle */}
        <circle cx={xAt(ROD.l / 2)} cy={tipY(ROD.l / 2)} r={3.5} className="fill-amber-500 dark:fill-amber-400" />
        <text x={xAt(ROD.l / 2) - 6} y={tipY(ROD.l / 2) - 6} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          average ωl/2
        </text>

        {/* The rod */}
        <line x1={PIVOT.x} y1={PIVOT.y} x2={end} y2={PIVOT.y} strokeWidth={4} strokeLinecap="round" className="stroke-foreground" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r={4.5} className="fill-background stroke-foreground" strokeWidth={1.5} />
        <text x={PIVOT.x} y={PIVOT.y + 16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          pivot
        </text>
        <text x={(PIVOT.x + end) / 2} y={PIVOT.y + 16} textAnchor="middle" className="fill-foreground text-[10px]">
          l = 0.5 m, ω = 20 rad/s
        </text>
        <text x={end} y={PIVOT.y + 16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          free end
        </text>

        {/* Inset: a wheel, spokes in parallel */}
        <circle cx={WHEEL.x} cy={WHEEL.y} r={WHEEL.r} fill="none" strokeWidth={2} className="stroke-foreground" />
        {Array.from({ length: WHEEL.spokes }, (_, i) => {
          const a = (i * 2 * Math.PI) / WHEEL.spokes + Math.PI / 4;
          return (
            <line
              key={i}
              x1={WHEEL.x}
              y1={WHEEL.y}
              x2={r2(WHEEL.x + WHEEL.r * Math.cos(a))}
              y2={r2(WHEEL.y + WHEEL.r * Math.sin(a))}
              strokeWidth={1.5}
              className="stroke-rose-600 dark:stroke-rose-400"
            />
          );
        })}
        <circle cx={WHEEL.x} cy={WHEEL.y} r={3} className="fill-foreground" />
        <text x={316} y={WHEEL.y + WHEEL.r + 14} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          spokes in parallel
        </text>
        <text x={316} y={WHEEL.y + WHEEL.r + 26} textAnchor="end" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          e = ½BωR², one spoke
        </text>

        {/* The sum */}
        <text x={160} y={200} textAnchor="middle" className="fill-foreground text-[11px] tabular-nums">
          average speed = ωl/2 = 20 × 0.5/2 = {fmt(averageSpeed())} m/s
        </text>
        <text x={160} y={218} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          e = B·l·(ωl/2) = 0.4 × 0.5 × 5 = {fmt(emfFromAverage())} V
        </text>
      </svg>
      <p className="mt-2 text-sm text-foreground">
        Every point of the rod moves at ωr, so the speed rises evenly from 0 at the pivot to ωl at the free end. Using the average speed
        ωl/2 in Blv gives e = ½Bωl².
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        A disc or a wheel is many such radii in parallel between axle and rim: more spokes carry more current, not more voltage.
      </p>
    </div>
  );
}
