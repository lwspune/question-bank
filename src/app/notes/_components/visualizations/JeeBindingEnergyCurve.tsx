/**
 * Static figure: binding energy per nucleon against mass number A (concept
 * jpnuc-be-curve).
 *
 * The curve runs through measured values for real nuclei (MeV per nucleon,
 * rounded): ²H 1.11, ⁴He 7.07 (the spike), ¹²C 7.68, ¹⁶O 7.98, ⁵⁶Fe 8.79 (the
 * peak), ¹²⁰Sn 8.50, ²⁰⁸Pb 7.87, ²³⁸U 7.57, ²⁴⁰Pu 7.56. So, as the concept
 * says: a steep, uneven rise for light nuclei, a peak near A ≈ 56 at about
 * 8.8 MeV, a nearly flat middle (A about 30 to 170, about 8 MeV), and a slow
 * fall to about 7.6 MeV for the heaviest. Fusion moves light nuclei up the
 * left side, fission moves heavy ones up the right side. The arrow is the
 * concept's self-check: A = 240 (about 7.6 MeV) splitting into two A = 120
 * nuclei (about 8.5 MeV) rises on the curve, so energy is released.
 * Values pinned by tests/notes-jee-visuals-phys-a.test.ts. Server component.
 */

export type BePoint = { A: number; be: number; label?: string };

/** Binding energy per nucleon (MeV), measured values rounded to 0.01 MeV. */
export const BE_POINTS: readonly BePoint[] = [
  { A: 2, be: 1.11, label: "²H" },
  { A: 3, be: 2.57 },
  { A: 4, be: 7.07, label: "⁴He" },
  { A: 6, be: 5.33 },
  { A: 7, be: 5.61 },
  { A: 9, be: 6.46 },
  { A: 12, be: 7.68 },
  { A: 14, be: 7.48 },
  { A: 16, be: 7.98 },
  { A: 20, be: 8.03 },
  { A: 24, be: 8.26 },
  { A: 28, be: 8.45 },
  { A: 32, be: 8.49 },
  { A: 40, be: 8.55 },
  { A: 56, be: 8.79, label: "⁵⁶Fe" },
  { A: 84, be: 8.72 },
  { A: 100, be: 8.6 },
  { A: 120, be: 8.5, label: "¹²⁰Sn" },
  { A: 140, be: 8.38 },
  { A: 160, be: 8.23 },
  { A: 180, be: 8.04 },
  { A: 208, be: 7.87, label: "²⁰⁸Pb" },
  { A: 238, be: 7.57, label: "²³⁸U" },
  { A: 240, be: 7.56 },
];

/** BE per nucleon at mass number A, read off the curve (straight between points). */
export function beAt(A: number): number {
  const pts = BE_POINTS;
  if (A <= pts[0].A) return pts[0].be;
  for (let k = 1; k < pts.length; k++) {
    if (A <= pts[k].A) {
      const a = pts[k - 1];
      const b = pts[k];
      return a.be + ((A - a.A) / (b.A - a.A)) * (b.be - a.be);
    }
  }
  return pts[pts.length - 1].be;
}

/** The point with the highest BE per nucleon. */
export function peak(): BePoint {
  return BE_POINTS.reduce((m, p) => (p.be > m.be ? p : m));
}

/** The self-check: A = 240 splits into two A = 120 nuclei. Energy released, MeV. */
export function fissionRelease(A: number = 240): number {
  return 2 * (A / 2) * beAt(A / 2) - A * beAt(A);
}

const r2 = (n: number) => Math.round(n * 100) / 100;
export const PLOT = { x0: 40, x1: 306, y0: 34, y1: 170, aMax: 250, beMax: 10 } as const;
const px = (A: number) => r2(PLOT.x0 + (A / PLOT.aMax) * (PLOT.x1 - PLOT.x0));
const py = (be: number) => r2(PLOT.y1 - (be / PLOT.beMax) * (PLOT.y1 - PLOT.y0));

const LABEL_AT: Record<string, { dx: number; dy: number; anchor?: "start" | "middle" | "end" }> = {
  "²H": { dx: 5, dy: 4 },
  "⁴He": { dx: 18, dy: 42 },
  "⁵⁶Fe": { dx: 0, dy: -8, anchor: "middle" },
  "¹²⁰Sn": { dx: 0, dy: -8, anchor: "middle" },
  "²⁰⁸Pb": { dx: 0, dy: -8, anchor: "middle" },
  "²³⁸U": { dx: 0, dy: 14, anchor: "middle" },
};

export default function JeeBindingEnergyCurve() {
  const curve = BE_POINTS.map((p) => `${px(p.A)},${py(p.be)}`).join(" ");
  const top = peak();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · binding energy per nucleon against mass number
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Binding energy per nucleon against mass number. It rises steeply and unevenly for light nuclei, from 1.1 MeV for deuterium with a spike near 7 MeV for helium 4, peaks at about 8.8 MeV near A = 56 for iron, stays near 8 MeV from about A = 30 to 170, and falls slowly to about 7.6 MeV for uranium. Fusion moves light nuclei up the left side, fission moves heavy nuclei up the right side: A = 240 splitting into two A = 120 nuclei rises from about 7.6 to 8.5 MeV."
      >
        {/* Flat middle band */}
        <rect x={px(30)} y={PLOT.y0} width={r2(px(170) - px(30))} height={PLOT.y1 - PLOT.y0} className="fill-muted-foreground/10" />
        <text x={px(118)} y={py(6.6)} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          nearly flat
        </text>
        <text x={px(118)} y={py(6.6) + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          about 8 MeV
        </text>
        <text x={px(118)} y={py(6.6) + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          (A 30 to 170)
        </text>

        {/* Axes */}
        {[2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line x1={PLOT.x0} y1={py(v)} x2={PLOT.x1} y2={py(v)} strokeDasharray="2 3" className="stroke-border" />
            <text x={PLOT.x0 - 4} y={py(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {v}
            </text>
          </g>
        ))}
        {[0, 56, 120, 240].map((a) => (
          <text key={a} x={px(a)} y={PLOT.y1 + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {a}
          </text>
        ))}
        <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x1} y2={PLOT.y1} className="stroke-muted-foreground" />
        <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x0} y2={PLOT.y0 - 6} className="stroke-muted-foreground" />
        <text x={6} y={PLOT.y0 - 14} className="fill-muted-foreground text-[10px]">
          BE per nucleon (MeV)
        </text>
        <text x={PLOT.x1} y={PLOT.y1 + 26} textAnchor="end" className="fill-muted-foreground text-[10px]">
          mass number A
        </text>

        {/* Peak marker */}
        <line x1={px(top.A)} y1={py(top.be)} x2={px(top.A)} y2={PLOT.y1} strokeDasharray="3 3" className="stroke-indigo-500 dark:stroke-indigo-400" />

        {/* The curve */}
        <polyline points={curve} fill="none" strokeWidth={2.2} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        {BE_POINTS.filter((p) => p.label).map((p) => {
          const at = LABEL_AT[p.label!];
          return (
            <g key={p.A}>
              <circle cx={px(p.A)} cy={py(p.be)} r={2.5} className="fill-indigo-600 dark:fill-indigo-400" />
              <text x={px(p.A) + at.dx} y={py(p.be) + at.dy} textAnchor={at.anchor} className="fill-foreground text-[10px] font-semibold">
                {p.label}
              </text>
            </g>
          );
        })}
        <text x={px(top.A) + 12} y={py(top.be) - 20} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300 tabular-nums">
          peak about 8.8 MeV
        </text>
        {/* Leader from the ⁴He spike to its label */}
        <line x1={r2(px(4) + 2)} y1={r2(py(7.07) + 3)} x2={r2(px(4) + 17)} y2={r2(py(7.07) + 32)} strokeWidth={0.8} className="stroke-muted-foreground" />
        <text x={px(2) + 22} y={py(1.11) + 4} className="fill-muted-foreground text-[9px] tabular-nums">
          (1.1 MeV)
        </text>

        {/* Fission: 240 → two of 120 */}
        <circle cx={px(240)} cy={py(beAt(240))} r={3} className="fill-rose-600 dark:fill-rose-400" />
        <circle cx={px(120)} cy={py(beAt(120))} r={3} className="fill-rose-600 dark:fill-rose-400" />
        <path
          d={`M ${px(236)} ${py(7.5)} Q ${px(180)} ${py(7.0)} ${px(124)} ${py(8.35)}`}
          fill="none"
          strokeWidth={1.6}
          className="stroke-rose-600 dark:stroke-rose-400"
        />
        <polygon
          points={`${px(122)},${py(8.45)} ${r2(px(122) + 9)},${r2(py(8.45) + 1)} ${r2(px(122) + 5)},${r2(py(8.45) + 8)}`}
          className="fill-rose-600 dark:fill-rose-400"
        />
        <text x={px(195)} y={py(6.55)} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          fission
        </text>
        <text x={px(195)} y={py(6.55) + 11} textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-300 tabular-nums">
          240 → 2 × 120
        </text>

        {/* Fusion: light nuclei up the left side */}
        <text x={px(20)} y={py(2.6)} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          fusion
        </text>
        <text x={px(20)} y={py(2.6) + 11} className="fill-emerald-700 text-[9px] dark:fill-emerald-300">
          light nuclei join
        </text>
        <path d={`M ${px(11)} ${py(1.8)} L ${px(11)} ${py(5.2)}`} strokeWidth={1.6} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <polygon
          points={`${px(11)},${r2(py(5.2) - 6)} ${r2(px(11) - 4)},${r2(py(5.2) + 2)} ${r2(px(11) + 4)},${r2(py(5.2) + 2)}`}
          className="fill-emerald-600 dark:fill-emerald-400"
        />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Measured values for real nuclei. A change releases energy when the products sit higher on this curve. Split A = 240 (about 7.6 MeV per
        nucleon) into two nuclei of A = 120 (about 8.5 MeV): each nucleon gains about 0.9 MeV, so roughly 200 MeV is released. Join two light
        nuclei and they also climb toward the peak. Near A = 56 neither fission nor fusion releases energy. The middle is flat because the
        nuclear force is short ranged: each nucleon binds only to its neighbours.
      </p>
    </div>
  );
}
