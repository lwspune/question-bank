/**
 * Static figure: molar conductivity Λ against √c for a strong and a weak
 * electrolyte (concept cetec-kohlrausch-law, with cetec-molar-conductivity-
 * and-conductivity and cetec-degree-of-dissociation).
 *
 * - Strong (NaCl): Λ falls slowly in a straight line in √c. The line is drawn
 *   through the page's own numbers, Λ = 110 at 0.05 M (the worked example on
 *   the conductivity concept) and Λ₀ = 126 (the Kohlrausch examples), and is
 *   extrapolated to √c = 0 to read Λ₀.
 * - Weak (CH₃COOH): low Λ that shoots up at high dilution, so no straight line
 *   reaches the axis. Its Λ₀ = 390.7 comes from the ions (Kohlrausch). The
 *   curve is Λ = αΛ₀ with α from Ostwald's dilution law, Ka fixed by the
 *   page's 0.01 M value Λ = 16.5 (α = 16.5/390.7 = 0.0422).
 *
 * Server component, pure SVG. Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */

/** NaCl: limiting molar conductivity and one measured point (S cm² mol⁻¹, mol L⁻¹). */
export const STRONG = { name: "NaCl", L0: 126, c: 0.05, L: 110 } as const;

/** Acetic acid: Λ₀ from the ions and the 0.01 M point. */
export const WEAK = { name: "CH₃COOH", L0: 390.7, c: 0.01, L: 16.5 } as const;

/** Slope A of the strong electrolyte's line Λ = Λ₀ − A√c. */
export const STRONG_SLOPE = (STRONG.L0 - STRONG.L) / Math.sqrt(STRONG.c);

export function strongLambda(sqrtC: number): number {
  return STRONG.L0 - STRONG_SLOPE * sqrtC;
}

/** Degree of dissociation α = Λ/Λ₀. */
export function alpha(L: number, L0: number): number {
  return L / L0;
}

/** Ka = cα²/(1 − α) of the weak acid, from its 0.01 M point. */
export const WEAK_KA = (() => {
  const a = alpha(WEAK.L, WEAK.L0);
  return (WEAK.c * a * a) / (1 - a);
})();

/** Λ of the weak acid at concentration c = (√c)²: α solves cα² + Ka·α − Ka = 0. */
export function weakLambda(sqrtC: number): number {
  const c = sqrtC * sqrtC;
  if (c === 0) return WEAK.L0;
  const a = (-WEAK_KA + Math.sqrt(WEAK_KA * WEAK_KA + 4 * c * WEAK_KA)) / (2 * c);
  return a * WEAK.L0;
}

// Plot geometry (viewBox units).
export const X_MAX = 0.25;
export const L_MAX = 420;
export const PLOT = { x0: 44, x1: 306, y0: 184, y1: 24 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const px = (s: number) => r2(PLOT.x0 + (s / X_MAX) * (PLOT.x1 - PLOT.x0));
export const py = (L: number) => r2(PLOT.y0 - (L / L_MAX) * (PLOT.y0 - PLOT.y1));

/** Where the measured part of the strong line starts; left of it is the extrapolation. */
export const STRONG_MEASURED_FROM = 0.04;
/** The weak curve is drawn from this √c; closer to zero it is still rising. */
export const WEAK_FROM = 0.0025;

/** Points of the weak curve, spaced evenly in log √c so the steep part has detail. */
export function weakCurve(samples = 60): { s: number; L: number }[] {
  const out: { s: number; L: number }[] = [];
  const lo = Math.log(WEAK_FROM);
  const hi = Math.log(X_MAX);
  for (let k = 0; k <= samples; k++) {
    const s = Math.exp(lo + ((hi - lo) * k) / samples);
    out.push({ s, L: weakLambda(s) });
  }
  return out;
}

export default function CetMolarConductivityDilution() {
  const weakPts = weakCurve()
    .map((p) => `${px(p.s)},${py(p.L)}`)
    .join(" ");
  const tip = weakCurve()[0];
  const sStrong = Math.sqrt(STRONG.c);
  const sWeak = Math.sqrt(WEAK.c);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · molar conductivity on dilution, strong and weak
      </p>

      <svg
        viewBox="0 0 320 216"
        className="block h-auto w-full"
        role="img"
        aria-label="Molar conductivity against the square root of concentration. NaCl, a strong electrolyte, falls slowly in a straight line from 126 at zero to 110 at 0.05 M, so its limiting value is found by extending the line. Acetic acid, a weak electrolyte, stays low (16.5 at 0.01 M) and shoots up only at very high dilution towards 390.7, which cannot be read off the graph and comes from the ions."
      >
        {/* Grid and axes */}
        {[0, 100, 200, 300, 400].map((t) => (
          <g key={t}>
            <line x1={PLOT.x0} y1={py(t)} x2={PLOT.x1} y2={py(t)} className="stroke-border" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PLOT.x0 - 5} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {[0, 0.05, 0.1, 0.15, 0.2, 0.25].map((t) => (
          <text key={t} x={px(t)} y={PLOT.y0 + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1 - 4} className="stroke-muted-foreground" />
        <text x={6} y={14} className="fill-muted-foreground text-[10px]">
          Λ (S cm² mol⁻¹)
        </text>
        <text x={PLOT.x1} y={PLOT.y0 + 27} textAnchor="end" className="fill-muted-foreground text-[10px]">
          √c (c in mol L⁻¹), more dilute to the left
        </text>

        {/* Strong: measured line, then dashed back to the axis */}
        <line
          x1={px(STRONG_MEASURED_FROM)}
          y1={py(strongLambda(STRONG_MEASURED_FROM))}
          x2={px(X_MAX)}
          y2={py(strongLambda(X_MAX))}
          strokeWidth={2.5}
          className="stroke-indigo-600 dark:stroke-indigo-400"
        />
        <line
          x1={px(0)}
          y1={py(STRONG.L0)}
          x2={px(STRONG_MEASURED_FROM)}
          y2={py(strongLambda(STRONG_MEASURED_FROM))}
          strokeWidth={2}
          strokeDasharray="4 3"
          className="stroke-indigo-600 dark:stroke-indigo-400"
        />
        <circle cx={px(0)} cy={py(STRONG.L0)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(0.07)} y={py(STRONG.L0) - 10} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          Λ₀ = 126 by extending the line
        </text>
        <circle cx={px(sStrong)} cy={py(STRONG.L)} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(sStrong)} y={py(STRONG.L) + 14} textAnchor="middle" className="fill-indigo-700 text-[10px] dark:fill-indigo-300 tabular-nums">
          0.05 M: 110
        </text>
        <text x={px(0.12)} y={py(strongLambda(0.12)) + 15} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          NaCl (strong)
        </text>

        {/* Weak: the curve and its Λ₀ from the ions */}
        <polyline points={weakPts} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-rose-600 dark:stroke-rose-400" />
        <line x1={px(tip.s)} y1={py(tip.L) - 4} x2={px(0)} y2={py(WEAK.L0) + 5} strokeDasharray="1 3" className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={px(0)} cy={py(WEAK.L0)} r={3.5} strokeWidth={1.5} className="fill-background stroke-rose-600 dark:stroke-rose-400" />
        <text x={px(0) + 8} y={py(WEAK.L0) + 4} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          Λ₀ = 390.7 from the ions (Kohlrausch)
        </text>
        <text x={px(0.02)} y={py(260)} className="fill-rose-700 text-[10px] dark:fill-rose-300">
          CH₃COOH (weak) shoots up:
        </text>
        <text x={px(0.02)} y={py(260) + 12} className="fill-rose-700 text-[10px] dark:fill-rose-300">
          no straight line to extend
        </text>
        <circle cx={px(sWeak)} cy={py(WEAK.L)} r={3} className="fill-rose-600 dark:fill-rose-400" />
        <text x={px(sWeak) + 6} y={py(WEAK.L) - 6} className="fill-rose-700 text-[10px] dark:fill-rose-300 tabular-nums">
          0.01 M: 16.5
        </text>
      </svg>

      <div className="mt-2 space-y-1 text-sm">
        <p className="text-foreground">
          Weak acid: Λ₀ = λ⁰(H⁺) + λ⁰(CH₃COO⁻) = 390.7 S cm² mol⁻¹, built from strong electrolytes as Λ₀(HCl) + Λ₀(CH₃COONa) −
          Λ₀(NaCl).
        </p>
        <p className="text-muted-foreground tabular-nums">At 0.01 M: α = Λ/Λ₀ = 16.5/390.7 = 0.042, so only about 4% is ions.</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        On dilution Λ rises for both. A strong electrolyte is already fully ions, so it rises only a little, in a straight line. A
        weak one rises because more of it splits into ions (α grows), and that keeps happening until the solution is extremely
        dilute.
      </p>
    </div>
  );
}
