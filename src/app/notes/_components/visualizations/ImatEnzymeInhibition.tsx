/**
 * Static figure: rate against substrate concentration with no inhibitor, a
 * competitive inhibitor and a non-competitive inhibitor, exactly as the IMAT
 * concept imat-bmo-inhibition describes them:
 *
 * - competitive: Vmax unchanged, Km higher (the curve rises more slowly but
 *   reaches the same plateau: more substrate overcomes it);
 * - non-competitive: Vmax lower, Km unchanged (it levels off lower; more
 *   substrate does not help).
 *
 * Each curve is v = Vmax[S]/(Km + [S]) with the values in CURVES, exported
 * and pinned by tests/notes-imat-visuals-biometab.test.ts. Server component.
 */

export type InhibitionCurve = {
  id: "none" | "competitive" | "noncompetitive";
  label: string;
  vmax: number;
  km: number;
  stroke: string;
  text: string;
  dash?: string;
};

export const CURVES: readonly InhibitionCurve[] = [
  { id: "none", label: "no inhibitor", vmax: 100, km: 2, stroke: "stroke-indigo-600 dark:stroke-indigo-400", text: "fill-indigo-700 dark:fill-indigo-300" },
  { id: "competitive", label: "competitive", vmax: 100, km: 6, stroke: "stroke-amber-600 dark:stroke-amber-400", text: "fill-amber-700 dark:fill-amber-300", dash: "7 4" },
  { id: "noncompetitive", label: "non-competitive", vmax: 50, km: 2, stroke: "stroke-rose-600 dark:stroke-rose-400", text: "fill-rose-700 dark:fill-rose-300", dash: "2 3" },
];

export const S_MAX = 30;

export function rate(c: Pick<InhibitionCurve, "vmax" | "km">, s: number): number {
  return (c.vmax * s) / (c.km + s);
}

const W = 320;
const H = 200;
const PL = 36;
const PR = 84; // room for the curve labels on the right
const PT = 16;
const PB = 32;
const BASE = H - PB;
const PLOT_H = BASE - PT;
const V_MAX_AXIS = 110;
const x = (s: number) => PL + (s / S_MAX) * (W - PL - PR);
const y = (v: number) => BASE - (v / V_MAX_AXIS) * PLOT_H;

function points(c: InhibitionCurve, n = 100): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const s = (S_MAX * i) / n;
    pts.push(`${x(s).toFixed(1)},${y(rate(c, s)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ImatEnzymeInhibition() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · competitive and non-competitive inhibition
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Rate against substrate concentration: with a competitive inhibitor the curve rises more slowly but approaches the same Vmax; with a non-competitive inhibitor it levels off at a lower Vmax"
      >
        <line x1={PL} y1={PT} x2={PL} y2={BASE} className="stroke-muted-foreground/60" />
        <line x1={PL} y1={BASE} x2={x(S_MAX)} y2={BASE} className="stroke-muted-foreground/60" />
        <text x={x(S_MAX)} y={BASE + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          substrate concentration [S]
        </text>
        <text x={PL - 5} y={PT + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          rate
        </text>

        {/* The two plateaus. */}
        {[100, 50].map((v) => (
          <line key={v} x1={PL} y1={y(v)} x2={x(S_MAX)} y2={y(v)} strokeDasharray="3 3" className="stroke-muted-foreground/50" />
        ))}
        <text x={PL - 5} y={y(100) + 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
          Vmax
        </text>
        <text x={x(S_MAX)} y={y(50) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          lower Vmax
        </text>

        {CURVES.map((c) => (
          <polyline key={c.id} points={points(c)} fill="none" strokeWidth={2.5} strokeDasharray={c.dash} strokeLinejoin="round" className={c.stroke} />
        ))}
        {CURVES.map((c) => (
          <text key={`l-${c.id}`} x={x(S_MAX) + 4} y={y(rate(c, S_MAX)) + 4} className={`${c.text} text-[10px] font-semibold`}>
            {c.label}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Competitive: the inhibitor sits in the active site, so more substrate wins it back. Vmax is the same, Km is
        higher. Non-competitive: it binds another site and changes the active site&apos;s shape, so more substrate
        does not help. Vmax is lower (here half), Km is the same. Both lower the rate.
      </p>
    </div>
  );
}
