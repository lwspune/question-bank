/**
 * Static figure: work by a force that varies with position is the signed area
 * between its F–x graph and the x-axis (concept jpwep-force-integral).
 *
 * Two panels, both the concept's own forces:
 * - Left, the worked example: F = 6x² − 4x N from x = 1 m to x = 3 m. The area
 *   is [2x³ − 2x²] from 1 to 3 = 36 − 0 = 36 J. (F(1) = 2 N, F(3) = 42 N.)
 * - Right, the practice item: 10 N from x = 0 to 2 m, then −5 N from 2 to 4 m.
 *   The part above the axis is +20 J, the part below −10 J, so W = 10 J, not 30 J.
 * Values pinned by tests/notes-jee-visuals-phys-a.test.ts. Server component.
 */

/** The worked example's force, in newtons (x in metres). */
export function exampleForce(x: number): number {
  return 6 * x * x - 4 * x;
}

/** Its integral, 2x³ − 2x², so W from a to b is antiderivative(b) − antiderivative(a). */
export function exampleAntiderivative(x: number): number {
  return 2 * x ** 3 - 2 * x * x;
}

/** The worked example's limits, in metres. */
export const EXAMPLE_RANGE = { from: 1, to: 3 } as const;

export const EXAMPLE_WORK = exampleAntiderivative(EXAMPLE_RANGE.to) - exampleAntiderivative(EXAMPLE_RANGE.from);

/** The practice item's force: 10 N on 0 to 2 m, −5 N on 2 to 4 m. */
export const STEP_PIECES: readonly { from: number; to: number; F: number }[] = [
  { from: 0, to: 2, F: 10 },
  { from: 2, to: 4, F: -5 },
];

/** Signed area of each piece (F × width), in J. */
export const STEP_AREAS = STEP_PIECES.map((p) => p.F * (p.to - p.from));

/** Total work of the step force: the signed areas added. */
export const STEP_WORK = STEP_AREAS.reduce((s, a) => s + a, 0);

const r2 = (n: number) => Math.round(n * 100) / 100;

// Left panel: x from 0 to 3 m, F from −5 to 45 N.
export const LEFT = { x0: 36, x1: 150, y0: 40, y1: 160, xMax: 3, fMin: -5, fMax: 45 } as const;
// Right panel: x from 0 to 4 m, F from −8 to 12 N.
export const RIGHT = { x0: 196, x1: 308, y0: 40, y1: 160, xMax: 4, fMin: -8, fMax: 12 } as const;

type Panel = typeof LEFT | typeof RIGHT;
const sx = (p: Panel, x: number) => r2(p.x0 + (x / p.xMax) * (p.x1 - p.x0));
const sy = (p: Panel, F: number) => r2(p.y1 - ((F - p.fMin) / (p.fMax - p.fMin)) * (p.y1 - p.y0));

/** Polyline points of F = 6x² − 4x over [a, b]. */
export function exampleCurve(a: number, b: number, samples = 60): { x: number; F: number }[] {
  const out: { x: number; F: number }[] = [];
  for (let k = 0; k <= samples; k++) {
    const x = a + ((b - a) * k) / samples;
    out.push({ x, F: exampleForce(x) });
  }
  return out;
}

function AxisFrame({ p, ticks, fTicks }: { p: Panel; ticks: number[]; fTicks: number[] }) {
  const zero = sy(p, 0);
  return (
    <g>
      {fTicks.map((F) => (
        <g key={F}>
          <line x1={p.x0} y1={sy(p, F)} x2={p.x1} y2={sy(p, F)} strokeDasharray="2 3" className="stroke-border" />
          <text x={p.x0 - 4} y={sy(p, F) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {F < 0 ? `−${-F}` : F}
          </text>
        </g>
      ))}
      <line x1={p.x0} y1={p.y0 - 4} x2={p.x0} y2={p.y1} className="stroke-muted-foreground" />
      <line x1={p.x0} y1={zero} x2={p.x1 + 4} y2={zero} strokeWidth={1.2} className="stroke-muted-foreground" />
      {ticks.map((x) => (
        <text key={x} x={sx(p, x)} y={Math.max(zero, p.y1) + 11} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {x}
        </text>
      ))}
      <text x={p.x1 + 6} y={zero + 3.5} className="fill-muted-foreground text-[10px]">
        x
      </text>
      <text x={p.x0 - 4} y={p.y0 - 8} className="fill-muted-foreground text-[10px]">
        F (N)
      </text>
    </g>
  );
}

const POS_FILL = "fill-emerald-500/30 dark:fill-emerald-400/25";
const POS_TEXT = "fill-emerald-700 dark:fill-emerald-300";
const NEG_FILL = "fill-rose-500/30 dark:fill-rose-400/25";
const NEG_TEXT = "fill-rose-700 dark:fill-rose-300";
const CURVE = "stroke-indigo-600 dark:stroke-indigo-400";

export default function JeeForceDisplacementArea() {
  const curve = exampleCurve(0, 3)
    .map((q) => `${sx(LEFT, q.x)},${sy(LEFT, q.F)}`)
    .join(" ");
  const shaded = [
    `${sx(LEFT, 1)},${sy(LEFT, 0)}`,
    ...exampleCurve(1, 3).map((q) => `${sx(LEFT, q.x)},${sy(LEFT, q.F)}`),
    `${sx(LEFT, 3)},${sy(LEFT, 0)}`,
  ].join(" ");
  const [up, down] = STEP_PIECES;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · work as the area under a force against position graph
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: the force 6 x squared minus 4 x newtons against x; the area under it from x = 1 to 3 metres is shaded and equals 36 joules. Right: a force of 10 newtons from 0 to 2 metres, area plus 20 joules above the axis, then minus 5 newtons from 2 to 4 metres, area minus 10 joules below it, so the work is 10 joules."
      >
        {/* Left: the worked example */}
        <AxisFrame p={LEFT} ticks={[0, 1, 2, 3]} fTicks={[20, 40]} />
        <polygon points={shaded} className={POS_FILL} />
        <polyline points={curve} fill="none" strokeWidth={2.2} strokeLinejoin="round" className={CURVE} />
        {[1, 3].map((x) => (
          <line key={x} x1={sx(LEFT, x)} y1={sy(LEFT, 0)} x2={sx(LEFT, x)} y2={sy(LEFT, exampleForce(x))} strokeDasharray="3 2" className="stroke-muted-foreground" />
        ))}
        <circle cx={sx(LEFT, 3)} cy={sy(LEFT, 42)} r={2.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={sx(LEFT, 3) - 4} y={sy(LEFT, 42) - 4} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300 tabular-nums">
          42 N
        </text>
        <text x={sx(LEFT, 1) - 2} y={sy(LEFT, 2) - 5} textAnchor="end" className="fill-indigo-700 text-[10px] dark:fill-indigo-300 tabular-nums">
          2 N
        </text>
        <text x={sx(LEFT, 2.35)} y={sy(LEFT, 8)} textAnchor="middle" className={`${POS_TEXT} text-[11px] font-semibold tabular-nums`}>
          +36 J
        </text>
        <text x={(LEFT.x0 + LEFT.x1) / 2} y={186} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          F = 6x² − 4x
        </text>
        <text x={(LEFT.x0 + LEFT.x1) / 2} y={200} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          x = 1 to 3 m: W = 36 J
        </text>

        {/* Right: the practice item, area above and below the axis */}
        <AxisFrame p={RIGHT} ticks={[0, 2, 4]} fTicks={[-5, 10]} />
        <rect
          x={sx(RIGHT, up.from)}
          y={sy(RIGHT, up.F)}
          width={r2(sx(RIGHT, up.to) - sx(RIGHT, up.from))}
          height={r2(sy(RIGHT, 0) - sy(RIGHT, up.F))}
          className={POS_FILL}
        />
        <rect
          x={sx(RIGHT, down.from)}
          y={sy(RIGHT, 0)}
          width={r2(sx(RIGHT, down.to) - sx(RIGHT, down.from))}
          height={r2(sy(RIGHT, down.F) - sy(RIGHT, 0))}
          className={NEG_FILL}
        />
        <polyline
          points={[
            `${sx(RIGHT, 0)},${sy(RIGHT, 10)}`,
            `${sx(RIGHT, 2)},${sy(RIGHT, 10)}`,
            `${sx(RIGHT, 2)},${sy(RIGHT, -5)}`,
            `${sx(RIGHT, 4)},${sy(RIGHT, -5)}`,
          ].join(" ")}
          fill="none"
          strokeWidth={2.2}
          className={CURVE}
        />
        <text x={sx(RIGHT, 1)} y={sy(RIGHT, 4.2)} textAnchor="middle" className={`${POS_TEXT} text-[11px] font-semibold tabular-nums`}>
          +20 J
        </text>
        <text x={sx(RIGHT, 3)} y={sy(RIGHT, -2.4) + 3} textAnchor="middle" className={`${NEG_TEXT} text-[11px] font-semibold tabular-nums`}>
          −10 J
        </text>
        <text x={(RIGHT.x0 + RIGHT.x1) / 2} y={186} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          10 N, then −5 N
        </text>
        <text x={(RIGHT.x0 + RIGHT.x1) / 2} y={200} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          W = 20 − 10 = 10 J
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Each thin strip under the graph is F dx, so the work is the area between the graph and the x-axis. Left: ∫(6x² − 4x) dx from 1 to 3 = [2x³
        − 2x²] = 36 − 0 = 36 J. Right: area above the axis is positive work, area below it is a force opposing the motion and counts negative, so
        the total is 10 J, not 30 J.
      </p>
    </div>
  );
}
