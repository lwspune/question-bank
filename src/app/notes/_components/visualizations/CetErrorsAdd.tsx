/**
 * Static figure: why the absolute errors ADD in a difference (concept
 * cetp-um-absolute-errors). The concept's own example: (82.3 ± 0.3) −
 * (38.6 ± 0.2) = 43.7 ± 0.5. Each quantity is drawn as the band of values it
 * could take, all three bands at the same scale. The largest difference takes
 * A at its highest and B at its lowest (82.6 − 38.4 = 44.2), the smallest the
 * other way round (82.0 − 38.8 = 43.2), so the difference's band is 1.0 wide:
 * 0.6 + 0.4, never 0.6 − 0.4, the concept's trap. Pinned by
 * tests/notes-w2-02.test.ts. Server component, no client state.
 */

export type Measured = { value: number; err: number };

/** The concept's example. */
export const A: Measured = { value: 82.3, err: 0.3 };
export const B: Measured = { value: 38.6, err: 0.2 };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** A − B with its error: the errors add. */
export function difference(a: Measured, b: Measured): Measured {
  return { value: round1(a.value - b.value), err: round1(a.err + b.err) };
}

/** The largest and smallest values A − B can take. */
export function extremes(a: Measured, b: Measured): { largest: number; smallest: number } {
  return {
    largest: round1(a.value + a.err - (b.value - b.err)),
    smallest: round1(a.value - a.err - (b.value + b.err)),
  };
}

/** viewBox units per unit of the measured quantity, the same on every line. */
export const UNIT_PX = 120;
export const MID_X = 160;
export const ROWS = { a: 46, b: 106, d: 168 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
export const bandX = (m: Measured) => ({ lo: r2(MID_X - m.err * UNIT_PX), hi: r2(MID_X + m.err * UNIT_PX) });

const GREEN = { fill: "fill-emerald-600 dark:fill-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" };
const RED = { fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" };

function Band({ m, y, title, loTone, hiTone }: { m: Measured; y: number; title: string; loTone: typeof GREEN; hiTone: typeof GREEN }) {
  const { lo, hi } = bandX(m);
  return (
    <g>
      <text x={MID_X} y={y - 13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
        {title}
      </text>
      <rect x={lo} y={y - 5} width={r2(hi - lo)} height={10} rx={5} className="fill-sky-500/30 dark:fill-sky-400/30" />
      <line x1={MID_X} y1={y - 7} x2={MID_X} y2={y + 7} strokeWidth={1.5} className="stroke-foreground" />
      <circle cx={lo} cy={y} r={4} className={loTone.fill} />
      <circle cx={hi} cy={y} r={4} className={hiTone.fill} />
      <text x={lo} y={y + 17} textAnchor="middle" className={`${loTone.text} text-[10px] font-semibold tabular-nums`}>
        {(m.value - m.err).toFixed(1)}
      </text>
      <text x={MID_X} y={y + 17} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
        {m.value.toFixed(1)}
      </text>
      <text x={hi} y={y + 17} textAnchor="middle" className={`${hiTone.text} text-[10px] font-semibold tabular-nums`}>
        {(m.value + m.err).toFixed(1)}
      </text>
      <text x={314} y={y + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
        width {(2 * m.err).toFixed(1)}
      </text>
    </g>
  );
}

export default function CetErrorsAdd() {
  const d = difference(A, B);
  const x = extremes(A, B);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · errors add in a difference
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="Three bands of possible values at the same scale. A is 82.3 plus or minus 0.3, from 82.0 to 82.6. B is 38.6 plus or minus 0.2, from 38.4 to 38.8. A minus B runs from 43.2, A lowest minus B highest, to 44.2, A highest minus B lowest: 43.7 plus or minus 0.5, a band as wide as the other two together."
      >
        <Band m={A} y={ROWS.a} title={`A = ${A.value} ± ${A.err}`} loTone={RED} hiTone={GREEN} />
        <Band m={B} y={ROWS.b} title={`B = ${B.value} ± ${B.err}`} loTone={GREEN} hiTone={RED} />
        <Band m={d} y={ROWS.d} title={`A − B = ${d.value} ± ${d.err}`} loTone={RED} hiTone={GREEN} />

        <text x={6} y={206} className={`${RED.text} text-[10px] font-semibold tabular-nums`}>
          smallest: 82.0 − 38.8 = {x.smallest.toFixed(1)}
        </text>
        <text x={314} y={222} textAnchor="end" className={`${GREEN.text} text-[10px] font-semibold tabular-nums`}>
          largest: 82.6 − 38.4 = {x.largest.toFixed(1)}
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        All three lines use the same scale. Green ends give the largest difference (A high, B low), red ends the smallest (A low, B high). The
        band of A − B is 0.6 + 0.4 = 1.0 wide, so its error is 0.3 + 0.2 = 0.5: errors never cancel in a difference.
      </p>
    </div>
  );
}
