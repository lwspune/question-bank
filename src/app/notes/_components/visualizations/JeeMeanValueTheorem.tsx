/**
 * Static figure: the mean value theorem and Rolle's theorem side by side
 * (concept jaod-rolle), each drawn with the concept's own example.
 *
 * Left, the worked example: f(x) = x² on [1, 3]. The chord from (1, 1) to
 * (3, 9) has slope (9 − 1)/(3 − 1) = 4, and f′(c) = 2c = 4 gives c = 2: the
 * tangent at (2, 4), y = 4x − 4, is parallel to the chord y = 4x − 3.
 * Right, the self-check: f(x) = x² − 4x on [0, 4]. f(0) = f(4) = 0, the chord
 * is flat, and f′(c) = 2c − 4 = 0 gives c = 2: the tangent at (2, −4) is flat
 * too. Rolle's theorem is the mean value theorem with a level chord.
 * Server component. Pinned by tests/notes-jee-visuals-maths.test.ts.
 */

type Panel = {
  f: (x: number) => number;
  df: (x: number) => number;
  a: number;
  b: number;
  /** Half the length (in x) of the tangent drawn at c. */
  run: number;
  /** The plotting window. */
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export const MVT_PANEL: Panel = { f: (x) => x * x, df: (x) => 2 * x, a: 1, b: 3, run: 0.9, xMin: 0, xMax: 3.5, yMin: -1, yMax: 11 };
export const ROLLE_PANEL: Panel = { f: (x) => x * x - 4 * x, df: (x) => 2 * x - 4, a: 0, b: 4, run: 1.6, xMin: -0.5, xMax: 4.5, yMin: -5.5, yMax: 2.5 };

/** Slope of the chord from (a, f(a)) to (b, f(b)). */
export const chordSlope = (p: Panel) => (p.f(p.b) - p.f(p.a)) / (p.b - p.a);

/**
 * The point c in (a, b) with f′(c) equal to the chord's slope, found by
 * bisection on f′(x) − slope (f′ is increasing for both examples).
 */
export function mvtPoint(p: Panel): number {
  const m = chordSlope(p);
  let lo = p.a;
  let hi = p.b;
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    if (p.df(mid) < m) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// Each panel is 148 wide and 150 tall.
const W = 148;
const H = 150;
const r2 = (n: number) => Math.round(n * 100) / 100;

function PanelPlot({ p, x0, y0, title, lines }: { p: Panel; x0: number; y0: number; title: string; lines: string[] }) {
  const sx = (x: number) => r2(x0 + ((x - p.xMin) / (p.xMax - p.xMin)) * W);
  const sy = (y: number) => r2(y0 + ((p.yMax - y) / (p.yMax - p.yMin)) * H);
  const c = mvtPoint(p);
  const m = chordSlope(p);
  const fc = p.f(c);
  const curve = Array.from({ length: 41 }, (_, k) => {
    const x = p.xMin + ((p.xMax - p.xMin) * k) / 40;
    return { x, y: p.f(x) };
  })
    .filter((q) => q.y >= p.yMin && q.y <= p.yMax)
    .map((q) => `${sx(q.x)},${sy(q.y)}`)
    .join(" ");
  // The tangent at c, over p.run either side, kept inside the window.
  let t0 = Math.max(c - p.run, p.xMin);
  let t1 = Math.min(c + p.run, p.xMax);
  if (m !== 0) {
    const xs = [c + (p.yMin - fc) / m, c + (p.yMax - fc) / m].sort((u, v) => u - v);
    t0 = Math.max(t0, xs[0]);
    t1 = Math.min(t1, xs[1]);
  }
  return (
    <g>
      <text x={x0 + W / 2} y={y0 - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {title}
      </text>
      {/* Axes */}
      <line x1={sx(p.xMin)} y1={sy(0)} x2={sx(p.xMax)} y2={sy(0)} className="stroke-border" />
      <line x1={sx(0)} y1={sy(p.yMin)} x2={sx(0)} y2={sy(p.yMax)} className="stroke-border" />

      {/* The curve */}
      <polyline points={curve} fill="none" strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />

      {/* The chord and the tangent at c */}
      <line x1={sx(p.a)} y1={sy(p.f(p.a))} x2={sx(p.b)} y2={sy(p.f(p.b))} strokeWidth={1.5} strokeDasharray="5 3" className="stroke-rose-600 dark:stroke-rose-400" />
      <line x1={sx(t0)} y1={sy(fc + m * (t0 - c))} x2={sx(t1)} y2={sy(fc + m * (t1 - c))} strokeWidth={2} className="stroke-emerald-600 dark:stroke-emerald-400" />

      {/* c on the x-axis */}
      <line x1={sx(c)} y1={sy(fc)} x2={sx(c)} y2={sy(0)} strokeWidth={1} strokeDasharray="2 2" className="stroke-muted-foreground" />
      <circle cx={sx(c)} cy={sy(fc)} r={3.5} className="fill-emerald-600 dark:fill-emerald-400" />

      {/* End points */}
      {[p.a, p.b].map((x) => (
        <circle key={x} cx={sx(x)} cy={sy(p.f(x))} r={3} className="fill-rose-600 dark:fill-rose-400" />
      ))}

      {/* The working */}
      <g className="text-[10px] tabular-nums">
        {lines.map((l, i) => (
          <text key={l} x={x0 + W / 2} y={y0 + H + 16 + i * 14} textAnchor="middle" className={i === lines.length - 1 ? "fill-emerald-700 font-semibold dark:fill-emerald-300" : "fill-foreground"}>
            {l}
          </text>
        ))}
      </g>
    </g>
  );
}

export default function JeeMeanValueTheorem() {
  const L = { x0: 8, y0: 22 };
  const R = { x0: 166, y0: 22 };
  const sxL = (x: number) => r2(L.x0 + ((x - MVT_PANEL.xMin) / (MVT_PANEL.xMax - MVT_PANEL.xMin)) * W);
  const syL = (y: number) => r2(L.y0 + ((MVT_PANEL.yMax - y) / (MVT_PANEL.yMax - MVT_PANEL.yMin)) * H);
  const sxR = (x: number) => r2(R.x0 + ((x - ROLLE_PANEL.xMin) / (ROLLE_PANEL.xMax - ROLLE_PANEL.xMin)) * W);
  const syR = (y: number) => r2(R.y0 + ((ROLLE_PANEL.yMax - y) / (ROLLE_PANEL.yMax - ROLLE_PANEL.yMin)) * H);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a tangent parallel to the chord
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: y = x² on [1, 3]; the chord from (1, 1) to (3, 9) has slope 4 and the tangent at x = 2 is parallel to it. Right: y = x² − 4x on [0, 4]; the ends are level at 0 and the tangent at x = 2 is flat."
      >
        <PanelPlot
          p={MVT_PANEL}
          x0={L.x0}
          y0={L.y0}
          title="Mean value theorem"
          lines={["f(x) = x² on [1, 3]", "chord slope 8/2 = 4", "2c = 4, c = 2"]}
        />
        <PanelPlot
          p={ROLLE_PANEL}
          x0={R.x0}
          y0={R.y0}
          title="Rolle's theorem"
          lines={["f(x) = x² − 4x on [0, 4]", "f(0) = f(4) = 0, chord flat", "2c − 4 = 0, c = 2"]}
        />

        {/* Point labels, left panel */}
        <g className="text-[9px] tabular-nums">
          <text x={sxL(1) - 5} y={syL(1) - 3} textAnchor="end" className="fill-rose-700 dark:fill-rose-300">
            (1, 1)
          </text>
          <text x={sxL(3) - 5} y={syL(9) - 2} textAnchor="end" className="fill-rose-700 dark:fill-rose-300">
            (3, 9)
          </text>
          <text x={sxL(2) + 5} y={syL(4) + 11} className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            (2, 4)
          </text>
          <text x={sxL(2)} y={syL(0) + 10} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            c = 2
          </text>
          <text x={sxL(1)} y={syL(0) + 10} textAnchor="middle" className="fill-muted-foreground">
            a = 1
          </text>
          <text x={sxL(3)} y={syL(0) + 10} textAnchor="middle" className="fill-muted-foreground">
            b = 3
          </text>
        </g>

        {/* Point labels, right panel */}
        <g className="text-[9px] tabular-nums">
          <text x={sxR(0) + 3} y={syR(0) - 5} className="fill-muted-foreground">
            a = 0
          </text>
          <text x={sxR(4) - 3} y={syR(0) - 5} textAnchor="end" className="fill-muted-foreground">
            b = 4
          </text>
          <text x={sxR(2)} y={syR(0) - 5} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            c = 2
          </text>
          <text x={sxR(2)} y={syR(-4) + 13} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            (2, −4)
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The dashed line is the chord from (a, f(a)) to (b, f(b)); the solid line is the tangent at c, with the same slope. On the right
        f(a) = f(b), so the chord is level and the tangent at c is level too: f′(c) = 0. Both theorems promise c strictly between a
        and b, for a function continuous on [a, b] and differentiable inside it.
      </p>
    </div>
  );
}
