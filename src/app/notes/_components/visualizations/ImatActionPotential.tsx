/**
 * Static figure: one action potential, membrane potential (mV) against time
 * (ms), with the values of the IMAT concept's table: resting about -70 mV,
 * threshold about -55 mV, peak about +30 mV, hyperpolarisation about -80 mV,
 * then back to rest. Each phase is labelled with what its ions do, in the
 * concept's words (Na⁺ floods in, K⁺ flows out, K⁺ channels slow to close).
 *
 * The trace is a monotone cubic through the key points (Fritsch-Carlson), so
 * it never overshoots them: the peak really is +30 mV and the dip really is
 * -80 mV. tests/notes-imat-visuals-physio.test.ts pins both. The times are
 * illustrative (an action potential lasts a few milliseconds); the concept
 * gives none.
 *
 * Server component, no client state.
 */

export type Pt = { t: number; v: number };

/** The concept's values, in mV. */
export const AP_VALUES = { rest: -70, threshold: -55, peak: 30, hyperpolarised: -80 } as const;

/** Key points of the trace: time in ms, potential in mV. */
export const AP_POINTS: readonly Pt[] = [
  { t: 0, v: AP_VALUES.rest },
  { t: 0.5, v: AP_VALUES.rest },
  { t: 1, v: AP_VALUES.threshold },
  { t: 1.9, v: AP_VALUES.peak },
  { t: 3, v: AP_VALUES.rest },
  { t: 3.5, v: AP_VALUES.hyperpolarised },
  { t: 4.6, v: AP_VALUES.rest },
  { t: 5, v: AP_VALUES.rest },
];

/** Fritsch-Carlson slopes for a monotone cubic Hermite through the points. */
export function monotoneSlopes(p: readonly Pt[]): number[] {
  const n = p.length;
  const d = p.slice(1).map((q, i) => (q.v - p[i].v) / (q.t - p[i].t));
  const m = p.map((_, k) => {
    if (k === 0) return d[0];
    if (k === n - 1) return d[n - 2];
    return d[k - 1] * d[k] <= 0 ? 0 : (d[k - 1] + d[k]) / 2;
  });
  for (let k = 0; k < n - 1; k++) {
    if (d[k] === 0) {
      m[k] = 0;
      m[k + 1] = 0;
      continue;
    }
    const a = m[k] / d[k];
    const b = m[k + 1] / d[k];
    const s = a * a + b * b;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      m[k] = tau * a * d[k];
      m[k + 1] = tau * b * d[k];
    }
  }
  return m;
}

/** The potential at time t on the smooth trace. */
export function potentialAt(t: number, p: readonly Pt[] = AP_POINTS): number {
  const m = monotoneSlopes(p);
  let k = 0;
  while (k < p.length - 2 && t > p[k + 1].t) k++;
  const h = p[k + 1].t - p[k].t;
  const s = (t - p[k].t) / h;
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1;
  const h10 = s ** 3 - 2 * s ** 2 + s;
  const h01 = -2 * s ** 3 + 3 * s ** 2;
  const h11 = s ** 3 - s ** 2;
  return h00 * p[k].v + h10 * h * m[k] + h01 * p[k + 1].v + h11 * h * m[k + 1];
}

// Plot geometry (viewBox 320 x 246).
const X0 = 48;
const X1 = 304;
const T_MAX = 5;
const Y_TOP = 22;
const Y_BOT = 210;
const V_MAX = 40;
const V_MIN = -105;

export const sx = (t: number) => X0 + (t / T_MAX) * (X1 - X0);
export const sy = (v: number) => Y_TOP + ((V_MAX - v) / (V_MAX - V_MIN)) * (Y_BOT - Y_TOP);

const r2 = (n: number) => Math.round(n * 100) / 100;

/** The trace as SVG cubic Beziers (exactly the Hermite curve, mapped to the plot). */
export function tracePath(p: readonly Pt[] = AP_POINTS): string {
  const m = monotoneSlopes(p);
  let d = `M ${r2(sx(p[0].t))} ${r2(sy(p[0].v))}`;
  for (let k = 0; k < p.length - 1; k++) {
    const h = p[k + 1].t - p[k].t;
    const c1 = { t: p[k].t + h / 3, v: p[k].v + (m[k] * h) / 3 };
    const c2 = { t: p[k + 1].t - h / 3, v: p[k + 1].v - (m[k + 1] * h) / 3 };
    d += ` C ${r2(sx(c1.t))} ${r2(sy(c1.v))} ${r2(sx(c2.t))} ${r2(sy(c2.v))} ${r2(sx(p[k + 1].t))} ${r2(sy(p[k + 1].v))}`;
  }
  return d;
}

const Y_TICKS = [30, 0, -55, -70, -80];
const T_TICKS = [0, 1, 2, 3, 4, 5];
const fmt = (v: number) => (v > 0 ? `+${v}` : v === 0 ? "0" : `−${-v}`);

export default function ImatActionPotential() {
  const AXIS = "stroke-muted-foreground";
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · an action potential
      </p>
      <svg
        viewBox="0 0 320 246"
        className="block h-auto w-full"
        role="img"
        aria-label="Graph of membrane potential against time: resting at minus 70 millivolts, rising past the threshold of minus 55 to a peak of plus 30 as sodium ions flood in, falling as potassium ions flow out, dipping to minus 80, then back to rest"
      >
        {/* Axes. */}
        <line x1={X0} y1={Y_TOP - 6} x2={X0} y2={Y_BOT} strokeWidth={1} className={AXIS} />
        <line x1={X0} y1={Y_BOT} x2={X1} y2={Y_BOT} strokeWidth={1} className={AXIS} />
        <text x={8} y={14} className="fill-muted-foreground text-[10px]">
          mV
        </text>
        {Y_TICKS.map((v) => (
          <g key={v}>
            <line x1={X0 - 3} y1={sy(v)} x2={X0} y2={sy(v)} strokeWidth={1} className={AXIS} />
            <text x={X0 - 5} y={sy(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {fmt(v)}
            </text>
          </g>
        ))}
        {T_TICKS.map((t) => (
          <g key={t}>
            <line x1={sx(t)} y1={Y_BOT} x2={sx(t)} y2={Y_BOT + 3} strokeWidth={1} className={AXIS} />
            <text x={sx(t)} y={Y_BOT + 14} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <text x={(X0 + X1) / 2} y={Y_BOT + 30} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          time (ms)
        </text>

        {/* 0 mV and the threshold. */}
        <line x1={X0} y1={sy(0)} x2={X1} y2={sy(0)} strokeWidth={1} strokeDasharray="2 4" className={AXIS} />
        <line x1={X0} y1={sy(AP_VALUES.threshold)} x2={X1} y2={sy(AP_VALUES.threshold)} strokeWidth={1} strokeDasharray="5 4" className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={X1} y={sy(AP_VALUES.threshold) - 4} textAnchor="end" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          threshold −55 mV
        </text>

        {/* The action potential. */}
        <path d={tracePath()} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />

        {/* Phase labels. */}
        <text x={sx(0.05)} y={sy(AP_VALUES.rest) + 14} className="fill-foreground text-[10px] font-semibold">
          Resting
        </text>
        <text x={121} y={sy(16)} textAnchor="end" className="fill-foreground text-[10px]">
          Depolarisation
        </text>
        <text x={121} y={sy(16) + 12} textAnchor="end" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          Na⁺ floods in
        </text>
        <text x={sx(2.14)} y={sy(AP_VALUES.peak) + 2} className="fill-foreground text-[10px]">
          peak +30 mV
        </text>
        <text x={171} y={sy(16)} className="fill-foreground text-[10px]">
          Repolarisation
        </text>
        <text x={171} y={sy(16) + 12} className="fill-rose-700 text-[10px] dark:fill-rose-300">
          K⁺ flows out
        </text>
        <text x={sx(3.5)} y={sy(AP_VALUES.hyperpolarised) + 16} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Hyperpolarisation (−80 mV)
        </text>
        <text x={sx(3.5)} y={sy(AP_VALUES.hyperpolarised) + 28} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          K⁺ channels slow to close
        </text>
        <text x={sx(4.95)} y={sy(AP_VALUES.rest) - 6} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          back to rest
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        All-or-nothing: a stimulus that does not reach the threshold gives no action potential, and one that does always
        gives this same size. At rest the Na⁺/K⁺ pump moves 3 Na⁺ out for every 2 K⁺ in. The times are typical, not exact.
      </p>
    </div>
  );
}
