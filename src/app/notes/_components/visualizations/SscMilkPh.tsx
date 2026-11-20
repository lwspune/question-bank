/**
 * Static figure: baking soda raises the pH of milk (concept ssccabac-daily).
 *
 * On the pH scale (below 7 acidic, 7 neutral, above 7 alkaline), milk sits at
 * about 6. A milkman adds a little baking soda (sodium bicarbonate, a mild
 * base) to raise its pH to slightly alkaline, just above 7, so the milk
 * sours later. The concept gives no number for "slightly alkaline", so the
 * figure shows a band just above 7, not a value. Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export const MILK = { phBefore: 6, neutral: 7 } as const;
/** The band drawn for "slightly alkaline": just above neutral. */
export const SLIGHTLY_ALKALINE = { from: 7, to: 8 } as const;

export function phSide(ph: number): "acidic" | "neutral" | "alkaline" {
  if (ph < 7) return "acidic";
  if (ph > 7) return "alkaline";
  return "neutral";
}

const X0 = 20;
const X1 = 300;
const STRIP_Y = 76;
const STRIP_H = 20;

export function phX(ph: number): number {
  return X0 + (ph / 14) * (X1 - X0);
}

export default function SscMilkPh() {
  const xBefore = phX(MILK.phBefore);
  const xAfter = (phX(SLIGHTLY_ALKALINE.from) + phX(SLIGHTLY_ALKALINE.to)) / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · baking soda raises the pH of milk
      </p>
      <svg
        viewBox="0 0 320 170"
        className="block h-auto w-full"
        role="img"
        aria-label="A pH scale from 0 to 14: below 7 acidic, 7 neutral, above 7 alkaline. Milk starts at about pH 6, on the acidic side. Adding a little baking soda raises its pH to slightly alkaline, just above 7."
      >
        <rect x={X0} y={STRIP_Y} width={phX(7) - X0} height={STRIP_H} className="fill-rose-200 dark:fill-rose-900/60" />
        <rect x={phX(7)} y={STRIP_Y} width={X1 - phX(7)} height={STRIP_H} className="fill-sky-200 dark:fill-sky-900/60" />
        <rect
          x={phX(SLIGHTLY_ALKALINE.from)}
          y={STRIP_Y}
          width={phX(SLIGHTLY_ALKALINE.to) - phX(SLIGHTLY_ALKALINE.from)}
          height={STRIP_H}
          className="fill-sky-400 dark:fill-sky-600"
        />
        <text x={(X0 + phX(7)) / 2 - 14} y={STRIP_Y + 14} textAnchor="middle" className="fill-rose-900 text-[11px] font-bold dark:fill-rose-200">
          acidic (below 7)
        </text>
        <text x={(phX(8) + X1) / 2} y={STRIP_Y + 14} textAnchor="middle" className="fill-sky-900 text-[11px] font-bold dark:fill-sky-200">
          alkaline (above 7)
        </text>
        <line x1={phX(7)} y1={STRIP_Y - 4} x2={phX(7)} y2={STRIP_Y + STRIP_H + 4} className="stroke-foreground" strokeWidth={1.6} />

        {Array.from({ length: 15 }, (_, i) => i).map((t) => (
          <g key={t}>
            <line x1={phX(t)} y1={STRIP_Y + STRIP_H} x2={phX(t)} y2={STRIP_Y + STRIP_H + 3} className="stroke-foreground" strokeWidth={1} />
            {t % 2 === 0 || t === 7 ? (
              <text x={phX(t)} y={STRIP_Y + STRIP_H + 14} textAnchor="middle" className={`text-[10px] ${t === 7 ? "fill-foreground font-bold" : "fill-muted-foreground"}`}>
                {t}
              </text>
            ) : null}
          </g>
        ))}
        <text x={phX(7)} y={STRIP_Y + STRIP_H + 27} textAnchor="middle" className="fill-foreground text-[10px]">
          neutral
        </text>

        {/* milk before, and the push after baking soda */}
        <circle cx={xBefore} cy={STRIP_Y + STRIP_H / 2} r={5} className="fill-background stroke-foreground" strokeWidth={1.6} />
        <text x={xBefore - 6} y={STRIP_Y - 30} textAnchor="end" className="fill-foreground text-[11px] font-bold">
          milk
        </text>
        <text x={xBefore - 6} y={STRIP_Y - 17} textAnchor="end" className="fill-muted-foreground text-[10px]">
          about pH {MILK.phBefore}
        </text>
        <path
          d={`M ${xBefore} ${STRIP_Y - 8} Q ${(xBefore + xAfter) / 2} ${STRIP_Y - 40} ${xAfter} ${STRIP_Y - 8}`}
          fill="none"
          className="stroke-sky-700 dark:stroke-sky-300"
          strokeWidth={1.6}
        />
        <polygon points={`${xAfter},${STRIP_Y - 2} ${xAfter - 5},${STRIP_Y - 11} ${xAfter + 4},${STRIP_Y - 10}`} className="fill-sky-700 dark:fill-sky-300" />
        <text x={xAfter + 10} y={STRIP_Y - 30} className="fill-sky-800 text-[11px] font-bold dark:fill-sky-200">
          + a little baking soda
        </text>
        <text x={xAfter + 10} y={STRIP_Y - 17} className="fill-sky-800 text-[10px] dark:fill-sky-200">
          slightly alkaline
        </text>

        <text x={160} y={STRIP_Y + STRIP_H + 52} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          The pH goes up, so the milk sours later.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Alkaline means a higher pH. Baking soda (sodium bicarbonate) is a mild base, so it raises the pH of milk, never
        lowers it.
      </p>
    </div>
  );
}
