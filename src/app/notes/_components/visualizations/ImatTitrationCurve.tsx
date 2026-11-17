/**
 * Static figure: two titration curves on one set of axes. 25.0 mL of acid
 * (0.100 mol/L) is titrated with 0.100 mol/L sodium hydroxide, so both reach
 * the equivalence point at 25.0 mL:
 * - hydrochloric acid (strong): the jump is centred on pH 7;
 * - ethanoic acid (weak, pKa 4.7, the value used on the page): the curve
 *   starts higher, rises slowly through a buffer region (pH = pKa at the
 *   half-way point, 12.5 mL), and the equivalence point is basic, pH 8.7,
 *   because sodium ethanoate is a basic salt.
 * The concept's indicator ranges are shaded across the plot: methyl orange
 * 3.1 to 4.4 and phenolphthalein 8.2 to 10.
 *
 * Every pH is computed exactly from the charge balance (H⁺ + Na⁺ = OH⁻ + anion),
 * not sketched. Pedagogical aim: pick the indicator by where the jump is, not
 * by where 7 is (the concept's trap). Pinned by
 * tests/notes-imat-visuals-chem1.test.ts. Server component, no client state.
 */

export const TITRATION = {
  acidVolume: 25.0, // mL
  acidConc: 0.1, // mol/L
  baseConc: 0.1, // mol/L of NaOH
  pKa: 4.7, // ethanoic acid
  kw: 1e-14,
} as const;

/** The concept's indicator ranges (pH). */
export const INDICATORS = {
  methylOrange: { low: 3.1, high: 4.4 },
  phenolphthalein: { low: 8.2, high: 10 },
} as const;

/** Volume of base at the equivalence point (mL). */
export const EQUIVALENCE_ML = (TITRATION.acidConc * TITRATION.acidVolume) / TITRATION.baseConc;

/**
 * pH after `vb` mL of base, for a strong acid (`ka` undefined) or a weak acid
 * with that Ka. Solves the charge balance by bisection on log[H⁺].
 */
export function phAt(vb: number, ka?: number): number {
  const { acidVolume: va, acidConc: ca, baseConc: cb, kw } = TITRATION;
  const total = va + vb;
  const acid = (ca * va) / total;
  const na = (cb * vb) / total;
  const balance = (h: number) => h + na - kw / h - (ka === undefined ? acid : (acid * ka) / (ka + h));
  let lo = -15;
  let hi = 1;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (balance(10 ** mid) > 0) hi = mid;
    else lo = mid;
  }
  return -(lo + hi) / 2;
}

export const KA_WEAK = 10 ** -TITRATION.pKa;

/** Volumes sampled for the curves: every 0.5 mL, closer near the jump. */
export function sampleVolumes(): number[] {
  const v = new Set<number>();
  for (let x = 0; x <= 50; x += 0.5) v.add(Math.round(x * 100) / 100);
  for (let x = 23; x <= 27; x += 0.05) v.add(Math.round(x * 100) / 100);
  return [...v].sort((a, b) => a - b);
}

// Plot geometry (viewBox units).
const W = 320;
const H = 226;
const PL = 34;
const PR = 306;
const PT = 12;
const PB = 190;
const X_MAX = 50;
const Y_MAX = 14;

const xOf = (v: number) => PL + (v / X_MAX) * (PR - PL);
const yOf = (ph: number) => PB - (ph / Y_MAX) * (PB - PT);
const r1 = (n: number) => Math.round(n * 10) / 10;

function curvePath(ka?: number): string {
  return sampleVolumes()
    .map((v, i) => `${i === 0 ? "M" : "L"}${r1(xOf(v))},${r1(yOf(phAt(v, ka)))}`)
    .join(" ");
}

const AXIS = "text-muted-foreground/60";

export default function ImatTitrationCurve() {
  const eqX = xOf(EQUIVALENCE_ML);
  const weakEq = phAt(EQUIVALENCE_ML, KA_WEAK);
  const half = EQUIVALENCE_ML / 2;
  const halfPh = phAt(half, KA_WEAK);
  const mo = INDICATORS.methylOrange;
  const pp = INDICATORS.phenolphthalein;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · titration curves and indicator ranges
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="pH against volume of sodium hydroxide added to 25 mL of acid. Hydrochloric acid starts at pH 1 and jumps steeply at 25 mL through pH 7. Ethanoic acid starts near pH 2.9, rises slowly through a buffer region where pH equals pKa, 4.7, at 12.5 mL, and jumps at 25 mL through pH 8.7. Methyl orange changes between pH 3.1 and 4.4; phenolphthalein between 8.2 and 10, which lies on the steep part of both curves."
      >
        {/* Indicator bands */}
        <rect x={PL} y={yOf(pp.high)} width={PR - PL} height={yOf(pp.low) - yOf(pp.high)} className="fill-fuchsia-500/15 dark:fill-fuchsia-400/15" />
        <text x={PL + 4} y={yOf(pp.high) + 10} className="fill-fuchsia-700 text-[10px] font-semibold dark:fill-fuchsia-300">
          phenolphthalein 8.2 to 10
        </text>
        <rect x={PL} y={yOf(mo.high)} width={PR - PL} height={yOf(mo.low) - yOf(mo.high)} className="fill-amber-500/20 dark:fill-amber-400/15" />
        <text x={PR - 3} y={yOf(mo.high) + 10} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          methyl orange 3.1 to 4.4
        </text>

        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((t) => (
          <g key={`y${t}`}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            {t !== 6 && t !== 8 && (
              <text x={PL - 5} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
                {t}
              </text>
            )}
          </g>
        ))}
        {[0, 10, 20, 25, 30, 40, 50].map((t) => (
          <g key={`x${t}`}>
            <line x1={xOf(t)} y1={PB} x2={xOf(t)} y2={PB + 3} stroke="currentColor" className={AXIS} />
            <text x={xOf(t)} y={PB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <text x={(PL + PR) / 2} y={H - 2} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          volume of NaOH added (mL)
        </text>
        <text x={9} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 9 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          pH
        </text>

        {/* Equivalence volume */}
        <line x1={eqX} y1={PT} x2={eqX} y2={PB} strokeDasharray="2 3" stroke="currentColor" className={AXIS} />

        {/* Buffer region of the weak acid */}
        <line x1={xOf(4)} y1={yOf(3.1)} x2={xOf(21)} y2={yOf(3.1)} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1} />
        <line x1={xOf(4)} y1={yOf(3.1)} x2={xOf(4)} y2={yOf(3.5)} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1} />
        <line x1={xOf(21)} y1={yOf(3.1)} x2={xOf(21)} y2={yOf(3.5)} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1} />
        <text x={xOf(12.5)} y={yOf(3.1) + 10} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          buffer region
        </text>

        {/* The curves */}
        <path d={curvePath()} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2} />
        <path d={curvePath(KA_WEAK)} fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} />

        {/* Curve labels */}
        <text x={xOf(3)} y={yOf(0.25)} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          strong acid (HCl)
        </text>
        <text x={xOf(30)} y={yOf(12.6) - 5} className="fill-foreground text-[10px]">
          both level off
        </text>

        {/* Half-way point: pH = pKa */}
        <line x1={xOf(half)} y1={yOf(halfPh) - 4} x2={xOf(half)} y2={yOf(5.85)} strokeDasharray="2 2" className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={xOf(half)} cy={yOf(halfPh)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={xOf(11)} y={yOf(6)} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          half-way: pH = pKa = 4.7
        </text>
        <text x={xOf(1)} y={yOf(7.3)} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          weak acid (ethanoic)
        </text>

        {/* Equivalence points */}
        <circle cx={eqX} cy={yOf(7)} r={3.5} className="fill-sky-600 stroke-background dark:fill-sky-400" strokeWidth={1} />
        <text x={eqX + 6} y={yOf(7) + 4} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          equivalence: pH 7
        </text>
        <circle cx={eqX} cy={yOf(weakEq)} r={3.5} className="fill-rose-600 stroke-background dark:fill-rose-400" strokeWidth={1} />
        <text x={eqX + 6} y={yOf(weakEq) + 4} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          equivalence: pH {weakEq.toFixed(1)}
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        25 mL of 0.10 mol/L acid with 0.10 mol/L NaOH: both reach equivalence at 25 mL. With a strong acid the salt
        (NaCl) is neutral and the jump runs from about pH 3 to 11, so either indicator works. With ethanoic acid the
        salt is basic and equivalence is at about pH 8.7: phenolphthalein (8.2 to 10) changes on the steep part, but
        methyl orange changes long before, at about 8 mL. Half-way to equivalence, pH = pKa.
      </p>
    </div>
  );
}
