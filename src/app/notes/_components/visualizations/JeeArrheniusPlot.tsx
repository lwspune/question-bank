/**
 * Static figure: the Arrhenius plot of the concept's worked example
 * (jckin-arrhenius-read): log k = 12.5 − 9000 K/T, k in s⁻¹.
 *
 * - log k against 1/T is a straight line: slope −Ea/2.303R = −9000 K,
 *   intercept log A = 12.5.
 * - Solid where it is measured (303 K to 400 K), dashed where it is extended
 *   back to 1/T = 0 to read the intercept.
 * - A slope triangle: Δ(1/T) = 0.6 × 10⁻³ K⁻¹, Δlog k = −5.4, so the slope is
 *   −9000 K, and Ea = 2.303 × 8.314 × 9000 ≈ 172 kJ mol⁻¹; A = 10¹²·⁵ =
 *   3.16 × 10¹² s⁻¹.
 *
 * Server component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

/** The worked example: log k = LOG_A − SLOPE_K / T. */
export const ARRHENIUS = { logA: 12.5, slopeK: 9000 } as const;
export const R = 8.314;

/** log k at a given 1/T, with 1/T in units of 10⁻³ K⁻¹. */
export function logK(invTmilli: number): number {
  return ARRHENIUS.logA - (ARRHENIUS.slopeK * invTmilli) / 1000;
}

/** Ea in J mol⁻¹ from the base-10 slope: Ea = 2.303 R × slope. */
export function activationEnergy(slopeK = ARRHENIUS.slopeK): number {
  return 2.303 * R * slopeK;
}

/** A = 10^(log A), in s⁻¹. */
export function preExponential(logA = ARRHENIUS.logA): number {
  return Math.pow(10, logA);
}

/** Measured range of 1/T (10⁻³ K⁻¹): 400 K and 303 K. */
export const MEASURED = { from: 2.5, to: 3.3 } as const;
/** The slope triangle's two 1/T values. */
export const TRIANGLE = { from: 2.6, to: 3.2 } as const;

/** T in kelvin for a 1/T in 10⁻³ K⁻¹. */
export function kelvin(invTmilli: number): number {
  return 1000 / invTmilli;
}

// Geometry (viewBox units).
export const PLOT = { x0: 46, x1: 300, y0: 196, y1: 30 } as const;
export const X_AXIS = { max: 3.6 } as const;
export const Y_AXIS = { min: -20, max: 15 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(PLOT.x0 + (x / X_AXIS.max) * (PLOT.x1 - PLOT.x0));
const py = (y: number) => r2(PLOT.y0 - ((y - Y_AXIS.min) / (Y_AXIS.max - Y_AXIS.min)) * (PLOT.y0 - PLOT.y1));

const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1).replace("-", "−");

export default function JeeArrheniusPlot() {
  const dLog = logK(TRIANGLE.to) - logK(TRIANGLE.from);
  const dInv = TRIANGLE.to - TRIANGLE.from;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading the activation energy from an Arrhenius plot
      </p>

      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="Plot of log k against 1 over T for log k equals 12.5 minus 9000 kelvin over T. A straight line, measured between 303 and 400 kelvin and extended as a dashed line back to 1 over T equal to zero, where it meets the axis at log A equal to 12.5. A slope triangle: a change of 0.6 times 10 to the minus 3 in 1 over T gives a change of minus 5.4 in log k, so the slope is minus 9000 kelvin, which is minus Ea over 2.303 R."
      >
        {/* Grid and axes */}
        {[-20, -10, 0, 10].map((v) => (
          <g key={v}>
            <line x1={PLOT.x0} y1={py(v)} x2={PLOT.x1} y2={py(v)} className="stroke-border" strokeWidth={v === 0 ? 1 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {String(v).replace("-", "−")}
            </text>
          </g>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 8} className="stroke-muted-foreground" />
        <text x={4} y={PLOT.y1 - 14} className="fill-muted-foreground text-[10px]">
          log k
        </text>
        {[0, 1, 2, 3].map((v) => (
          <text key={v} x={px(v)} y={PLOT.y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}
          </text>
        ))}
        <text x={PLOT.x1} y={PLOT.y0 + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
          1/T (10⁻³ K⁻¹)
        </text>

        {/* Extended part, back to 1/T = 0 */}
        <line
          x1={px(0)}
          y1={py(logK(0))}
          x2={px(MEASURED.from)}
          y2={py(logK(MEASURED.from))}
          strokeWidth={1.8}
          strokeDasharray="5 4"
          className="stroke-indigo-600 dark:stroke-indigo-400"
        />
        {/* Measured part */}
        <line
          x1={px(MEASURED.from)}
          y1={py(logK(MEASURED.from))}
          x2={px(MEASURED.to)}
          y2={py(logK(MEASURED.to))}
          strokeWidth={3}
          className="stroke-indigo-600 dark:stroke-indigo-400"
        />
        <text x={px(2.15)} y={py(-4)} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          measured: 303 to 400 K
        </text>
        <text x={px(0.62)} y={py(9)} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
          extended to 1/T = 0
        </text>

        {/* Intercept */}
        <circle cx={px(0)} cy={py(logK(0))} r={3.5} className="fill-amber-600 dark:fill-amber-400" />
        <text x={px(0) + 7} y={py(logK(0)) - 5} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          intercept: log A = 12.5
        </text>

        {/* Slope triangle */}
        <g className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={1.4} fill="none">
          <line x1={px(TRIANGLE.from)} y1={py(logK(TRIANGLE.from))} x2={px(TRIANGLE.to)} y2={py(logK(TRIANGLE.from))} />
          <line x1={px(TRIANGLE.to)} y1={py(logK(TRIANGLE.from))} x2={px(TRIANGLE.to)} y2={py(logK(TRIANGLE.to))} />
        </g>
        <text
          x={(px(TRIANGLE.from) + px(TRIANGLE.to)) / 2}
          y={py(logK(TRIANGLE.from)) - 4}
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums"
        >
          {dInv.toFixed(1)} × 10⁻³
        </text>
        <text
          x={px(TRIANGLE.to) + 4}
          y={(py(logK(TRIANGLE.from)) + py(logK(TRIANGLE.to))) / 2 + 3.5}
          className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums"
        >
          {fmt1(dLog)}
        </text>

        {/* Reading the slope */}
        <g className="fill-foreground text-[10px] tabular-nums">
          <text x={px(0.1)} y={py(-9.5)} className="font-semibold">
            slope = −Eₐ/2.303R
          </text>
          <text x={px(0.1)} y={py(-12.3)}>
            = −5.4 ÷ (0.6 × 10⁻³) = −9000 K
          </text>
          <text x={px(0.1)} y={py(-15.1)}>
            Eₐ = 2.303 × 8.314 × 9000 J mol⁻¹
          </text>
          <text x={px(0.1)} y={py(-17.9)} className="font-semibold">
            ≈ 172 kJ mol⁻¹
          </text>
        </g>
      </svg>

      <p className="mt-2 text-sm text-foreground tabular-nums">
        log k = 12.5 − 9000 K/T is a straight line in 1/T. Its slope, −9000 K, is −Eₐ/2.303R, so Eₐ ≈ 172 kJ mol⁻¹. Its intercept is
        log A = 12.5, so A = 10<sup>12.5</sup> = 3.16 × 10¹² s⁻¹.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        With ln k instead of log k the slope is −Eₐ/R, with no 2.303. Read the axis label before you use the slope.
      </p>
    </div>
  );
}
