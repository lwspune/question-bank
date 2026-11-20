/**
 * Static figure: why the indicator depends on which partner is strong
 * (concept jceq-indicators). Two titration curves, each with the two
 * indicators' working ranges from the concept's table drawn as bands:
 * phenolphthalein pH 8.3 to 10, methyl orange pH 3.1 to 4.4.
 *
 * Top: a weak acid with a strong base. The equivalence point is above 7 and
 * the steep jump runs through the phenolphthalein band.
 * Bottom: a strong acid added to a weak base (the self-check: ammonia with
 * HCl). The curve falls slowly through the buffer region to an acidic
 * equivalence point, and the jump runs through the methyl orange band.
 *
 * The curves are worked out, not sketched: 25 mL of a 0.1 M weak acid (or
 * weak base) with K = 1.8 × 10⁻⁵, titrated with 0.1 M strong base (or acid),
 * pH from the charge balance by bisection. Equivalence at 25 mL: pH 8.72 and
 * pH 5.28. Pinned by tests/notes-w2-15.test.ts. Server component.
 */

export const KW = 1e-14;
/** Model titration: weak partner's K, both concentrations (M), starting volume (mL). */
export const MODEL = { K: 1.8e-5, C: 0.1, V0: 25 } as const;
/** The concept's working ranges (pH). */
export const BANDS = {
  phenolphthalein: { lo: 8.3, hi: 10 },
  methylOrange: { lo: 3.1, hi: 4.4 },
} as const;

/** Bisection on pH for a charge balance f(H) that increases with [H⁺]. */
function solvePh(f: (h: number) => number): number {
  let lo = -2; // pH
  let hi = 16;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    // Higher pH means lower [H⁺], so f falls as pH rises.
    if (f(10 ** -mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** pH after v mL of 0.1 M strong base is added to the weak acid. */
export function phWeakAcid(v: number, m: { K: number; C: number; V0: number } = MODEL): number {
  const total = m.V0 + v;
  const ca = (m.C * m.V0) / total;
  const na = (m.C * v) / total;
  return solvePh((h) => na + h - KW / h - (ca * m.K) / (m.K + h));
}

/** pH after v mL of 0.1 M strong acid is added to the weak base. */
export function phWeakBase(v: number, m: { K: number; C: number; V0: number } = MODEL): number {
  const total = m.V0 + v;
  const cb = (m.C * m.V0) / total;
  const cl = (m.C * v) / total;
  const kbh = KW / m.K;
  return solvePh((h) => h + (cb * h) / (h + kbh) - KW / h - cl);
}

/** Equivalence volume (mL): equal moles of acid and base. */
export const V_EQ = MODEL.V0;

/** Volumes at which the curves are sampled: dense near equivalence. */
export function sampleVolumes(): number[] {
  const vs: number[] = [];
  for (let v = 0; v <= 50; v += 0.5) vs.push(v);
  for (let v = 24; v <= 26; v += 0.05) vs.push(Math.round(v * 100) / 100);
  return Array.from(new Set(vs)).sort((a, b) => a - b);
}

// Geometry: two panels, pH 0 to 14 up the side, 0 to 50 mL across.
export const PANEL = { x0: 44, x1: 300, h: 112 } as const;
const TOPS = [30, 182] as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (v: number) => r2(PANEL.x0 + (v / 50) * (PANEL.x1 - PANEL.x0));
const py = (top: number, ph: number) => r2(top + PANEL.h - (ph / 14) * PANEL.h);

function Panel({
  top,
  title,
  xLabel,
  ph,
  eqLabel,
  fits,
}: {
  top: number;
  title: string;
  xLabel: string;
  ph: (v: number) => number;
  eqLabel: string;
  fits: "phenolphthalein" | "methylOrange";
}) {
  const pts = sampleVolumes()
    .map((v) => `${px(v)},${py(top, ph(v))}`)
    .join(" ");
  const eqPh = ph(V_EQ);
  const pp = BANDS.phenolphthalein;
  const mo = BANDS.methylOrange;
  const bottom = top + PANEL.h;
  return (
    <g>
      <text x={PANEL.x0} y={top - 8} className="fill-foreground text-[11px] font-semibold">
        {title}
      </text>
      {/* Indicator bands */}
      <rect x={PANEL.x0} y={py(top, pp.hi)} width={PANEL.x1 - PANEL.x0} height={r2(py(top, pp.lo) - py(top, pp.hi))} className="fill-pink-300/45 dark:fill-pink-800/35" />
      <rect x={PANEL.x0} y={py(top, mo.hi)} width={PANEL.x1 - PANEL.x0} height={r2(py(top, mo.lo) - py(top, mo.hi))} className="fill-orange-300/45 dark:fill-orange-800/35" />
      <text x={PANEL.x1 - 2} y={py(top, pp.hi) + 9} textAnchor="end" className={`text-[9px] font-semibold ${fits === "phenolphthalein" ? "fill-pink-700 dark:fill-pink-300" : "fill-muted-foreground"}`}>
        phenolphthalein {fits === "phenolphthalein" ? "(fits)" : "(misses)"}
      </text>
      <text x={PANEL.x1 - 2} y={py(top, mo.hi) + 9} textAnchor="end" className={`text-[9px] font-semibold ${fits === "methylOrange" ? "fill-orange-700 dark:fill-orange-300" : "fill-muted-foreground"}`}>
        methyl orange {fits === "methylOrange" ? "(fits)" : "(misses)"}
      </text>
      {/* pH 7 */}
      <line x1={PANEL.x0} y1={py(top, 7)} x2={PANEL.x1} y2={py(top, 7)} strokeDasharray="3 3" className="stroke-muted-foreground" />
      {/* Axes */}
      <line x1={PANEL.x0} y1={bottom} x2={PANEL.x1} y2={bottom} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={PANEL.x0} y1={top} x2={PANEL.x0} y2={bottom} strokeWidth={1.2} className="stroke-foreground" />
      {[0, 7, 14].map((t) => (
        <text key={t} x={PANEL.x0 - 5} y={py(top, t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
          {t}
        </text>
      ))}
      <text x={PANEL.x0 - 24} y={py(top, 7) + 3.5} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        pH
      </text>
      {[0, 25, 50].map((t) => (
        <text key={t} x={px(t)} y={bottom + 11} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
          {t}
        </text>
      ))}
      <text x={px(37.5)} y={bottom + 11} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        {xLabel}
      </text>
      {/* Curve and equivalence point */}
      <polyline points={pts} fill="none" strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />
      <circle cx={px(V_EQ)} cy={py(top, eqPh)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
      <text x={px(V_EQ) - 6} y={py(top, eqPh) + 3.5} textAnchor="end" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-300">
        {eqLabel}
      </text>
    </g>
  );
}

export default function JeeIndicatorChoice() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which indicator lies on the jump
      </p>
      <svg
        viewBox="0 0 320 318"
        className="block h-auto w-full"
        role="img"
        aria-label="Two titration curves of pH against volume added, with the phenolphthalein band at pH 8.3 to 10 and the methyl orange band at pH 3.1 to 4.4. Top, a weak acid with a strong base: the equivalence point is above 7 and the steep jump passes through the phenolphthalein band. Bottom, a strong acid added to a weak base: the curve falls slowly through a buffer region to an equivalence point below 7, and the jump passes through the methyl orange band."
      >
        <Panel top={TOPS[0]} title="Weak acid, strong base added" xLabel="mL of base" ph={(v) => phWeakAcid(v)} eqLabel="equivalence above 7" fits="phenolphthalein" />
        <Panel top={TOPS[1]} title="Weak base, strong acid added" xLabel="mL of acid" ph={(v) => phWeakBase(v)} eqLabel="equivalence below 7" fits="methylOrange" />
        <text x={px(9)} y={py(TOPS[1], phWeakBase(9)) - 7} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          buffer region
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        An indicator changes colour over about two pH units. It gives a sharp end point only if that range lies on the steep jump. Strong acid
        with strong base: the jump is long, so either works. Weak acid with weak base: no sharp jump, so neither does. Curves worked out for 0.1 M
        solutions.
      </p>
    </div>
  );
}
