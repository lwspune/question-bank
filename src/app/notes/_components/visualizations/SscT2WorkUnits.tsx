/**
 * Static figure: a job counted in units, day by day (concept ssc2twwr-units).
 * The concept's worked example: A takes 12 days and B 18, so the job is
 * LCM(12, 18) = 36 units, A does 3 a day and B 2. They work together for 4
 * days (4 × 5 = 20 units), then A leaves and B does the other 16 units in
 * 16 ÷ 2 = 8 days. Each cell of the bar is one unit, coloured by who does it,
 * and the thick lines mark the end of each day. Server component. Pinned by
 * tests/notes-w2-05.test.ts.
 */

/** The worked example. */
export const JOB = { aDays: 12, bDays: 18, together: 4 } as const;

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
export const lcm = (x: number, y: number) => (x * y) / gcd(x, y);

export const TOTAL = lcm(JOB.aDays, JOB.bDays);
export const A_RATE = TOTAL / JOB.aDays;
export const B_RATE = TOTAL / JOB.bDays;
export const DONE_TOGETHER = JOB.together * (A_RATE + B_RATE);
export const LEFT_FOR_B = TOTAL - DONE_TOGETHER;
export const B_ALONE_DAYS = LEFT_FOR_B / B_RATE;

/** Who does each unit, in order: A's then B's units each shared day, then B's alone. */
export function unitWorkers(): ("A" | "B")[] {
  const out: ("A" | "B")[] = [];
  for (let d = 0; d < JOB.together; d++) {
    for (let i = 0; i < A_RATE; i++) out.push("A");
    for (let i = 0; i < B_RATE; i++) out.push("B");
  }
  for (let d = 0; d < B_ALONE_DAYS; d++) for (let i = 0; i < B_RATE; i++) out.push("B");
  return out;
}

/** The unit count at the end of each day: 5, 10, 15, 20, then 22, 24, ... 36. */
export function dayEnds(): number[] {
  const ends: number[] = [];
  let u = 0;
  for (let d = 0; d < JOB.together; d++) ends.push((u += A_RATE + B_RATE));
  for (let d = 0; d < B_ALONE_DAYS; d++) ends.push((u += B_RATE));
  return ends;
}

// Geometry (viewBox units).
export const BAR_X = 34;
export const CELL_W = 7.5;
const BAR_Y = 76;
const BAR_H = 34;
const r2 = (n: number) => Math.round(n * 100) / 100;
const ux = (u: number) => r2(BAR_X + u * CELL_W);

const A_CELL = "fill-indigo-400 dark:fill-indigo-500";
const B_CELL = "fill-amber-300 dark:fill-amber-500";

export default function SscT2WorkUnits() {
  const workers = unitWorkers();
  const ends = dayEnds();
  const mid = ux(DONE_TOGETHER);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the whole job as 36 units
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="A bar of 36 units, the whole job, the LCM of 12 and 18 days. A does 3 units a day and B does 2. For the first 4 days they work together, 5 units a day, 20 units in all. Then A leaves and B does the other 16 units alone, 2 a day, in 8 days."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Job = LCM of 12 and 18 = 36 units
        </text>
        <text x={160} y={34} textAnchor="middle" className="fill-foreground text-[10px]">
          A: 36 ÷ 12 = 3 a day. B: 36 ÷ 18 = 2 a day.
        </text>

        {/* Day numbers */}
        <text x={BAR_X - 4} y={BAR_Y - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">
          day
        </text>
        {ends.map((end, i) => {
          const start = i === 0 ? 0 : ends[i - 1];
          return (
            <text key={i} x={r2((ux(start) + ux(end)) / 2)} y={BAR_Y - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {i + 1}
            </text>
          );
        })}

        {/* One cell per unit */}
        {workers.map((w, i) => (
          <rect key={i} x={ux(i)} y={BAR_Y} width={CELL_W} height={BAR_H} className={w === "A" ? A_CELL : B_CELL} />
        ))}
        {workers.map((_, i) => (
          <line key={i} x1={ux(i)} y1={BAR_Y} x2={ux(i)} y2={BAR_Y + BAR_H} strokeWidth={0.5} className="stroke-background" />
        ))}
        {[0, ...ends].map((e) => (
          <line key={e} x1={ux(e)} y1={BAR_Y - 2} x2={ux(e)} y2={BAR_Y + BAR_H + 2} strokeWidth={1.6} className="stroke-foreground" />
        ))}
        <rect x={BAR_X} y={BAR_Y} width={TOTAL * CELL_W} height={BAR_H} fill="none" strokeWidth={1.4} className="stroke-foreground" />

        {/* Brackets */}
        <path d={`M ${ux(0)} ${BAR_Y + BAR_H + 8} v 5 H ${mid - 1} v -5`} fill="none" strokeWidth={1.2} className="stroke-foreground" />
        <path d={`M ${mid + 1} ${BAR_Y + BAR_H + 8} v 5 H ${ux(TOTAL)} v -5`} fill="none" strokeWidth={1.2} className="stroke-foreground" />
        <text x={r2((ux(0) + mid) / 2)} y={BAR_Y + BAR_H + 27} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          together, 4 days
        </text>
        <text x={r2((ux(0) + mid) / 2)} y={BAR_Y + BAR_H + 40} textAnchor="middle" className="fill-foreground text-[10px]">
          4 × (3 + 2) = 20 units
        </text>
        <text x={r2((mid + ux(TOTAL)) / 2)} y={BAR_Y + BAR_H + 27} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          B alone, 8 days
        </text>
        <text x={r2((mid + ux(TOTAL)) / 2)} y={BAR_Y + BAR_H + 40} textAnchor="middle" className="fill-foreground text-[10px]">
          16 ÷ 2 = 8
        </text>

        {/* Legend */}
        <rect x={84} y={176} width={10} height={10} className={A_CELL} />
        <text x={98} y={185} className="fill-foreground text-[10px]">
          A&apos;s units
        </text>
        <rect x={180} y={176} width={10} height={10} className={B_CELL} />
        <text x={194} y={185} className="fill-foreground text-[10px]">
          B&apos;s units
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Give the job 36 units, the LCM of 12 and 18, and each worker does a whole number a day: A 3, B 2. Together for 4 days they do
        20 units; the 16 left take B alone 8 days. Each cell is one unit; the thick lines mark the end of each day.
      </p>
    </div>
  );
}
