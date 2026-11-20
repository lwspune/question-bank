/**
 * Static figure: the maximum relative error of a product of powers (concept
 * jpunit-power-rule), on the concept's worked example Q = A³B²/√C with
 * percentage errors 0.5%, 1.5% and 2% in A, B and C.
 * Each measured error (grey) is multiplied by the size of its power (coloured):
 *   A: 3 × 0.5 = 1.5%, B: 2 × 1.5 = 3%, C: ½ × 2 = 1%.
 * C sits in the denominator and its error is still ADDED (the trap), so the
 * three join end to end: 1.5 + 3 + 1 = 5.5%. Bars to scale.
 * Pinned by tests/notes-w2-15.test.ts. Server component.
 */

export type Factor = { symbol: string; power: number; percent: number; inDenominator: boolean; powerText: string };

export const FACTORS: readonly Factor[] = [
  { symbol: "A", power: 3, percent: 0.5, inDenominator: false, powerText: "3" },
  { symbol: "B", power: 2, percent: 1.5, inDenominator: false, powerText: "2" },
  { symbol: "C", power: 0.5, percent: 2, inDenominator: true, powerText: "½" },
];

/** One factor's share of the maximum percentage error: |power| × its error. */
export function contribution(f: Factor): number {
  return Math.abs(f.power) * f.percent;
}

/** Maximum percentage error: every contribution added, denominator or not. */
export function maxPercentError(fs: readonly Factor[] = FACTORS): number {
  return fs.reduce((s, f) => s + contribution(f), 0);
}

// Geometry: viewBox units per percent.
export const PER_PCT = 36;
export const BAR_X = 98;
const ROW_Y = [56, 98, 140] as const;
const TOTAL_Y = 196;
const COLOURS = [
  { bar: "fill-sky-500 dark:fill-sky-400", text: "fill-sky-700 dark:fill-sky-300" },
  { bar: "fill-violet-500 dark:fill-violet-400", text: "fill-violet-700 dark:fill-violet-300" },
  { bar: "fill-amber-500 dark:fill-amber-400", text: "fill-amber-700 dark:fill-amber-300" },
] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Left edge of each segment in the joined total bar. */
export function stackStarts(fs: readonly Factor[] = FACTORS): number[] {
  return fs.map((_, i) => r2(BAR_X + fs.slice(0, i).reduce((s, f) => s + contribution(f) * PER_PCT, 0)));
}

const fmt = (n: number) => String(r2(n));

export default function JeeErrorPowers() {
  const total = maxPercentError();
  const starts = stackStarts();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · each error times its power, all added
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="Bars to scale for Q equals A cubed times B squared over the square root of C. A's 0.5 percent error times 3 gives 1.5 percent. B's 1.5 percent times 2 gives 3 percent. C's 2 percent times one half gives 1 percent, added even though C is in the denominator. Joined end to end the maximum error is 5.5 percent."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          Q = A³B² / √C
        </text>

        {FACTORS.map((f, i) => {
          const y = ROW_Y[i];
          const c = COLOURS[i];
          return (
            <g key={f.symbol}>
              <text x={10} y={y - 4} className="fill-foreground text-[11px] font-semibold">
                {f.symbol}: {fmt(f.percent)}%
              </text>
              <text x={10} y={y + 11} className="fill-muted-foreground text-[10px]">
                × {f.powerText}
              </text>
              {f.inDenominator && (
                <text x={BAR_X} y={y + 21} className="fill-amber-700 text-[9.5px] font-semibold dark:fill-amber-300">
                  C is below the line: still added
                </text>
              )}
              {/* measured error */}
              <rect x={BAR_X} y={y - 13} width={r2(f.percent * PER_PCT)} height={7} className="fill-slate-400 dark:fill-slate-500" />
              {/* its contribution */}
              <rect x={BAR_X} y={y - 3} width={r2(contribution(f) * PER_PCT)} height={11} className={c.bar} />
              <text x={BAR_X + r2(contribution(f) * PER_PCT) + 5} y={y + 6} className={`text-[11px] font-semibold tabular-nums ${c.text}`}>
                {fmt(contribution(f))}%
              </text>
            </g>
          );
        })}

        {/* Total, joined end to end */}
        <line x1={8} y1={TOTAL_Y - 24} x2={312} y2={TOTAL_Y - 24} className="stroke-border" />
        <text x={10} y={TOTAL_Y + 3} className="fill-foreground text-[11px] font-semibold">
          maximum
        </text>
        {FACTORS.map((f, i) => {
          const w = r2(contribution(f) * PER_PCT);
          const x = starts[i];
          return (
            <g key={f.symbol}>
              <rect x={x} y={TOTAL_Y - 7} width={w} height={14} className={COLOURS[i].bar} />
              <line x1={x} y1={TOTAL_Y - 7} x2={x} y2={TOTAL_Y + 7} strokeWidth={1.2} className="stroke-background" />
            </g>
          );
        })}
        <text x={BAR_X} y={TOTAL_Y + 22} className="fill-foreground text-[11px] font-semibold tabular-nums">
          1.5 + 3 + 1 = {fmt(total)}%
        </text>
        <text x={BAR_X} y={TOTAL_Y - 12} className="fill-muted-foreground text-[9px]">
          grey: error measured · colour: after the power
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A power multiplies its factor&apos;s error: a cube counts 3, a square root ½. The error of C is added even though C is below the line;
        subtracting it would give too small an answer.
      </p>
    </div>
  );
}
