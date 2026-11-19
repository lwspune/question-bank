/**
 * Static figure: a first-order reaction plotted two ways (concept
 * cetkin-first-order-integrated-law), with the concept's worked example:
 * 75% complete in 40 min, so t½ = 20 min and k = 0.693/20 = 0.0347 min⁻¹.
 *
 * - Top: [A] (percent left, [A]₀ = 100) against t falls exponentially:
 *   100 → 50 → 25 → 12.5 → 6.25, one equal half-life (20 min) each time.
 * - Bottom: log[A] against t is a straight line from log 100 = 2 with slope
 *   −k/2.303 = −0.015 min⁻¹ (the concept writes the law with base-10 logs).
 *
 * Server component, pure SVG. Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */

/** The worked example: half-life in minutes, starting percent. */
export const FIRST_ORDER = { tHalf: 20, A0: 100 } as const;

/** k = 0.693/t½, in min⁻¹ (0.0347 for t½ = 20 min). */
export const K = 0.693 / FIRST_ORDER.tHalf;

/** Percent left after t minutes: [A]₀ e^(−kt), i.e. halved every t½. */
export function remaining(t: number): number {
  return FIRST_ORDER.A0 * Math.pow(0.5, t / FIRST_ORDER.tHalf);
}

/** log₁₀[A] = log[A]₀ − kt/2.303. */
export function logRemaining(t: number): number {
  return Math.log10(FIRST_ORDER.A0) - (K * t) / 2.303;
}

/** Slope of the log plot: −k/2.303, in min⁻¹. */
export const LOG_SLOPE = -K / 2.303;

/** The marked times: whole half-lives. */
export const HALF_LIFE_TIMES = [0, 20, 40, 60, 80] as const;

export const T_MAX = 80;

// Geometry (viewBox units). Two panels stacked.
export const TOP = { x0: 40, x1: 290, y0: 150, y1: 30 } as const;
export const BOTTOM = { x0: 40, x1: 290, y0: 316, y1: 210 } as const;
/** log axis range for the bottom panel. */
export const LOG_AXIS = { min: 0.6, max: 2.1 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const tx = (t: number) => r2(TOP.x0 + (t / T_MAX) * (TOP.x1 - TOP.x0));
const ty = (a: number) => r2(TOP.y0 - (a / 100) * (TOP.y0 - TOP.y1));
const by = (l: number) => r2(BOTTOM.y0 - ((l - LOG_AXIS.min) / (LOG_AXIS.max - LOG_AXIS.min)) * (BOTTOM.y0 - BOTTOM.y1));

/** Points of the exponential curve. */
export function decayCurve(samples = 80): { t: number; a: number }[] {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const t = (i / samples) * T_MAX;
    return { t, a: remaining(t) };
  });
}

function fmt(n: number): string {
  return String(Math.round(n * 1000) / 1000);
}

export default function CetFirstOrderPlot() {
  const curve = decayCurve()
    .map((p) => `${tx(p.t)},${ty(p.a)}`)
    .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a first-order reaction, plotted two ways
      </p>

      <svg
        viewBox="0 0 320 344"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: percent of A left against time falls from 100 to 50, 25, 12.5 and 6.25 at 20, 40, 60 and 80 minutes, halving every 20 minutes. Bottom: log of A against time is a straight line from 2 falling with slope minus k over 2.303, about minus 0.015 per minute."
      >
        {/* ---- Top panel: [A] against t ---- */}
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          [A] against t: equal half-lives
        </text>
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={TOP.x0} y1={ty(v)} x2={TOP.x1} y2={ty(v)} className="stroke-border" strokeWidth={v === 0 ? 1.2 : 0.6} />
            <text x={TOP.x0 - 5} y={ty(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {v}
            </text>
          </g>
        ))}
        <line x1={TOP.x0} y1={TOP.y0} x2={TOP.x0} y2={TOP.y1 - 4} className="stroke-muted-foreground" />
        <text x={4} y={TOP.y1 - 8} className="fill-muted-foreground text-[10px]">
          [A] (% left)
        </text>
        {HALF_LIFE_TIMES.map((t) => (
          <text key={t} x={tx(t)} y={TOP.y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <text x={TOP.x1} y={TOP.y0 + 24} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time t (min)
        </text>

        {/* Half-life steps */}
        {HALF_LIFE_TIMES.slice(1).map((t) => (
          <g key={t}>
            <line x1={tx(t)} y1={TOP.y0} x2={tx(t)} y2={ty(remaining(t))} strokeDasharray="3 3" className="stroke-muted-foreground" />
            <line x1={tx(t - 20)} y1={ty(remaining(t - 20))} x2={tx(t)} y2={ty(remaining(t - 20))} strokeDasharray="3 3" className="stroke-amber-600 dark:stroke-amber-400" />
            <text x={tx(t - 10)} y={ty(remaining(t - 20)) - 4} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
              t½
            </text>
          </g>
        ))}
        <polyline points={curve} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        {HALF_LIFE_TIMES.map((t) => (
          <g key={t}>
            <circle cx={tx(t)} cy={ty(remaining(t))} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
            {/* 100 is the axis tick itself; the last point is labelled to its right, the rest below-left, clear of the curve. */}
            {t > 0 && (
              <text
                x={t === T_MAX ? tx(t) + 5 : tx(t) - 5}
                y={t === T_MAX ? ty(remaining(t)) + 3.5 : ty(remaining(t)) + 12}
                textAnchor={t === T_MAX ? "start" : "end"}
                className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300 tabular-nums"
              >
                {fmt(remaining(t))}
              </text>
            )}
          </g>
        ))}

        {/* ---- Bottom panel: log[A] against t ---- */}
        <text x={160} y={BOTTOM.y1 - 22} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          log[A] against t: a straight line
        </text>
        {[1, 1.5, 2].map((v) => (
          <g key={v}>
            <line x1={BOTTOM.x0} y1={by(v)} x2={BOTTOM.x1} y2={by(v)} className="stroke-border" strokeWidth={0.6} />
            <text x={BOTTOM.x0 - 5} y={by(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        <line x1={BOTTOM.x0} y1={BOTTOM.y0} x2={BOTTOM.x1} y2={BOTTOM.y0} className="stroke-muted-foreground" />
        <line x1={BOTTOM.x0} y1={BOTTOM.y0} x2={BOTTOM.x0} y2={BOTTOM.y1 - 4} className="stroke-muted-foreground" />
        <text x={4} y={BOTTOM.y1 - 8} className="fill-muted-foreground text-[10px]">
          log[A]
        </text>
        {HALF_LIFE_TIMES.map((t) => (
          <text key={t} x={tx(t)} y={BOTTOM.y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <text x={BOTTOM.x1} y={BOTTOM.y0 + 24} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time t (min)
        </text>

        <line x1={tx(0)} y1={by(logRemaining(0))} x2={tx(T_MAX)} y2={by(logRemaining(T_MAX))} strokeWidth={2.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        {HALF_LIFE_TIMES.map((t) => (
          <circle key={t} cx={tx(t)} cy={by(logRemaining(t))} r={3} className="fill-emerald-600 dark:fill-emerald-400" />
        ))}
        <text x={tx(0) + 6} y={by(2) - 6} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          intercept log 100 = 2
        </text>
        <text x={tx(30)} y={by(logRemaining(30)) - 10} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums">
          slope = −k/2.303 = −0.015 min⁻¹
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground tabular-nums">
        75% done in 40 min is two half-lives, so t½ = 20 min and k = 0.693/20 = 0.0347 min⁻¹. 87.5% done takes three: 60 min.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        The time to halve does not depend on how much is left, so every t½ on the top curve is the same 20 min. Taking logs turns
        the curve into a line: k = −2.303 × slope.
      </p>
    </div>
  );
}
