/**
 * Static figure: the same gap measured against two different bases (concept
 * sscppba-base). The concept's worked example: Rahul earns 25% more than
 * Sumit. With Sumit = 100, Rahul = 125. The gap of 25 is 25% of Sumit's 100,
 * but only 25 ÷ 125 = 20% of Rahul's 125. Drawn as bars of 25-sized blocks:
 * Sumit 4 blocks, Rahul 5. Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example: Sumit is the base 100, Rahul is 25% more. */
export const BASE_EXAMPLE = { base: 100, r: 25 } as const;

/** 'A is r% more than B': A = B(1 + r/100). */
export const moreThan = (b: number, r: number) => b * (1 + r / 100);
/** Turned around, B is less than A by r/(100 + r) × 100 per cent. */
export const lessByPercent = (r: number) => (r / (100 + r)) * 100;
/** 'A is r% less than B' makes B more than A by r/(100 − r) × 100 per cent. */
export const moreByPercent = (r: number) => (r / (100 - r)) * 100;

export const SUMIT = BASE_EXAMPLE.base;
export const RAHUL = moreThan(SUMIT, BASE_EXAMPLE.r);
export const GAP = RAHUL - SUMIT;
export const BLOCK = 25;
export const SUMIT_BLOCKS = SUMIT / BLOCK;
export const RAHUL_BLOCKS = RAHUL / BLOCK;

// Geometry (viewBox units): 2 units per 1 of pay.
export const PX_PER_UNIT = 2;
export const BAR_X = 56;
const BAR_H = 28;
const SUMIT_Y = 36;
const RAHUL_Y = 98;

const BLOCK_CLS = "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/70 dark:stroke-sky-400";
const GAP_CLS = "fill-amber-200/90 stroke-amber-600 dark:fill-amber-900/70 dark:stroke-amber-400";

function Bar({ y, blocks, gapLast }: { y: number; blocks: number; gapLast: boolean }) {
  const w = BLOCK * PX_PER_UNIT;
  return (
    <g>
      {Array.from({ length: blocks }, (_, i) => {
        const isGap = gapLast && i === blocks - 1;
        return (
          <g key={i}>
            <rect x={BAR_X + i * w} y={y} width={w} height={BAR_H} strokeWidth={1.2} className={isGap ? GAP_CLS : BLOCK_CLS} />
            <text
              x={BAR_X + i * w + w / 2}
              y={y + BAR_H / 2 + 4}
              textAnchor="middle"
              className={isGap ? "fill-amber-800 text-[10px] font-semibold dark:fill-amber-200" : "fill-sky-900 text-[10px] dark:fill-sky-100"}
            >
              25
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function SscMoreThanBase() {
  const sumitEnd = BAR_X + SUMIT * PX_PER_UNIT;
  const rahulEnd = BAR_X + RAHUL * PX_PER_UNIT;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one gap, two different bases
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Two bars made of blocks of 25. Sumit's bar is 4 blocks, 100. Rahul's bar is 5 blocks, 125, and its last block is the gap of 25. Rahul is more than Sumit by 25 out of Sumit's 100, which is 25 per cent. Sumit is less than Rahul by 25 out of Rahul's 125, which is 20 per cent."
      >
        <text x={BAR_X - 6} y={SUMIT_Y + BAR_H / 2 + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Sumit
        </text>
        <text x={BAR_X - 6} y={RAHUL_Y + BAR_H / 2 + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Rahul
        </text>
        <Bar y={SUMIT_Y} blocks={SUMIT_BLOCKS} gapLast={false} />
        <Bar y={RAHUL_Y} blocks={RAHUL_BLOCKS} gapLast />

        <text x={sumitEnd + 6} y={SUMIT_Y + BAR_H / 2 + 4} className="fill-foreground text-[11px] font-semibold">
          100
        </text>
        <text x={rahulEnd} y={RAHUL_Y - 6} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          125
        </text>
        <line x1={sumitEnd} y1={SUMIT_Y + BAR_H} x2={sumitEnd} y2={RAHUL_Y} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-muted-foreground" />
        <text x={(sumitEnd + rahulEnd) / 2} y={RAHUL_Y + BAR_H + 14} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          gap 25
        </text>

        <text x={160} y={174} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Rahul is more by 25 out of Sumit&apos;s 100 = 25%
        </text>
        <text x={160} y={192} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Sumit is less by 25 out of Rahul&apos;s 125 = 20%
        </text>
        <text x={160} y={214} textAnchor="middle" className="fill-indigo-700 text-[10.5px] font-semibold dark:fill-indigo-300">
          A rise of ¼ is undone by a fall of ⅕
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Call Sumit&apos;s pay 100, so Rahul&apos;s is 125. The gap is the same 25 both ways, but the base is the number after
        &quot;than&quot;: 100 one way, 125 the other. So 25% more turns into 20% less, not 25% less.
      </p>
    </div>
  );
}
