/**
 * Still: pKb of the ethyl amines, ammonia and aniline (concept
 * jcamine-basicity-aliphatic), the concept's own values: (C₂H₅)₂NH 3.00,
 * (C₂H₅)₃N 3.25, C₂H₅NH₂ 3.29, NH₃ 4.75, aniline 9.38. Shorter bar, stronger
 * base; under the bars, the water order against the gas-phase order.
 *
 * `PkBars` is the shared bar chart, also used by NeetAmineBasicity and
 * NeetPhenolAcidity. Server component, pure SVG. Pinned by
 * tests/notes-w2-03.test.ts.
 */
import type { ReactNode } from "react";

export type PkTone = "main" | "ref" | "weak";
export type PkRow = { label: string; value: number; tag?: string; tone: PkTone };

export const ETHYL_ROWS: readonly PkRow[] = [
  { label: "(C₂H₅)₂NH", value: 3.0, tag: "2°", tone: "main" },
  { label: "(C₂H₅)₃N", value: 3.25, tag: "3°", tone: "main" },
  { label: "C₂H₅NH₂", value: 3.29, tag: "1°", tone: "main" },
  { label: "NH₃", value: 4.75, tone: "ref" },
  { label: "aniline", value: 9.38, tone: "weak" },
];

const BAR_CLS: Record<PkTone, string> = {
  main: "fill-sky-500 dark:fill-sky-400",
  ref: "fill-slate-400 dark:fill-slate-500",
  weak: "fill-amber-500 dark:fill-amber-400",
};

export const PK_LAYOUT = { x0: 104, width: 180, top: 30, row: 22, bar: 13 } as const;

/** Bar length for a value on a 0 to `max` scale. */
export function barLength(value: number, max: number): number {
  return Math.round((value / max) * PK_LAYOUT.width * 10) / 10;
}

/** True when the rows run from smallest to largest value. */
export function isAscending(rows: readonly PkRow[]): boolean {
  return rows.every((r, i) => i === 0 || rows[i - 1].value <= r.value);
}

export function PkBars({
  title,
  label,
  quantity,
  max,
  ticks,
  rows,
  footer,
  height,
  digits = 2,
  children,
}: {
  title: string;
  label: string;
  quantity: string;
  max: number;
  ticks: readonly number[];
  rows: readonly PkRow[];
  footer: readonly string[];
  height: number;
  /** Decimals printed for each value, as the concept gives them. */
  digits?: number;
  children?: ReactNode;
}) {
  const L = PK_LAYOUT;
  const axisY = L.top + rows.length * L.row + 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{title}</p>
      <svg viewBox={`0 0 320 ${height}`} className="block h-auto w-full" role="img" aria-label={label}>
        <text x={L.x0} y={16} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {quantity}
        </text>
        {ticks.map((t) => {
          const x = L.x0 + barLength(t, max);
          return (
            <g key={t}>
              <line x1={x} y1={L.top - 6} x2={x} y2={axisY} strokeWidth={0.6} className="stroke-border" />
              <text x={x} y={axisY + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
                {t}
              </text>
            </g>
          );
        })}
        {rows.map((r, i) => {
          const y = L.top + i * L.row;
          const w = barLength(r.value, max);
          return (
            <g key={r.label}>
              <text x={L.x0 - 6} y={y + 10} textAnchor="end" className="fill-foreground text-[11px]">
                {r.label}
              </text>
              {r.tag && (
                <text x={6} y={y + 10} className="fill-muted-foreground text-[10px]">
                  {r.tag}
                </text>
              )}
              <rect x={L.x0} y={y} width={w} height={L.bar} rx={2} className={BAR_CLS[r.tone]} />
              <text x={L.x0 + w + 4} y={y + 10} className="fill-foreground text-[10px] font-semibold tabular-nums">
                {r.value.toFixed(digits)}
              </text>
            </g>
          );
        })}
        {footer.map((f, i) => (
          <text key={f} x={6} y={axisY + 30 + i * 15} className={`${i === 0 ? "fill-foreground font-semibold" : "fill-muted-foreground"} text-[10px]`}>
            {f}
          </text>
        ))}
        {children}
      </svg>
    </div>
  );
}

export default function JeeAmineBasicity() {
  return (
    <PkBars
      title="Diagram · basic strength of the ethyl amines in water"
      label="Bar chart of pKb, smaller meaning a stronger base: diethylamine 3.00, triethylamine 3.25, ethylamine 3.29, ammonia 4.75, aniline 9.38. In water the order is diethylamine, triethylamine, ethylamine, ammonia; in the gas phase it is 3 degree, 2 degree, 1 degree, ammonia."
      quantity="pKb: shorter bar, stronger base"
      max={10}
      ticks={[0, 2, 4, 6, 8, 10]}
      rows={ETHYL_ROWS}
      footer={["water: (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃", "gas phase, alkyl push only: 3° > 2° > 1° > NH₃"] as const}
      height={196}
    />
  );
}
