/**
 * Static figure: the combined average of two groups sits nearer the bigger
 * group (concept ssc2avcc-combined). The concept's worked example: section A
 * has 30 students averaging 60 and section B has 20 averaging 70; the total
 * is 1800 + 1400 = 3200 and the average of all 50 is 64. The concept's trap
 * names the wrong answer, 65, the middle of the two averages, so it is drawn
 * dashed and marked wrong. Bar heights show the group sizes. Server
 * component. Pinned by tests/notes-w2-05.test.ts.
 */

/** The worked example. */
export const GROUPS = [
  { name: "A", n: 30, avg: 60 },
  { name: "B", n: 20, avg: 70 },
] as const;

export const combinedTotal = (gs: readonly { n: number; avg: number }[]) => gs.reduce((s, g) => s + g.n * g.avg, 0);
export const combinedCount = (gs: readonly { n: number }[]) => gs.reduce((s, g) => s + g.n, 0);
export const combinedAverage = (gs: readonly { n: number; avg: number }[]) => combinedTotal(gs) / combinedCount(gs);
/** The trap: the middle of the two averages. */
export const middleOfAverages = (gs: readonly { avg: number }[]) => gs.reduce((s, g) => s + g.avg, 0) / gs.length;

// Geometry (viewBox units): the number line runs 55 to 75.
export const MIN = 55;
export const MAX = 75;
export const AXIS_Y = 150;
export const PX_PER_MARK = 13;
export const BAR_PER_STUDENT = 3;
export const vx = (v: number) => 30 + (v - MIN) * PX_PER_MARK;

const BAR_W = 18;

export default function SscT2CombinedAverage() {
  const [a, b] = GROUPS;
  const all = combinedAverage(GROUPS);
  const mid = middleOfAverages(GROUPS);
  const ticks = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the bigger group pulls the average
      </p>
      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label="A number line from 55 to 75. Section A, 30 students, stands at its average 60 with a tall bar; section B, 20 students, stands at 70 with a shorter bar. The average of all 50 students is 64, nearer A, the bigger group. The middle of the two averages, 65, is marked dashed as the wrong answer."
      >
        {/* The wrong answer: the middle of the two averages */}
        <line x1={vx(mid)} y1={30} x2={vx(mid)} y2={AXIS_Y} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-muted-foreground" />
        <text x={vx(mid)} y={22} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          65 = middle of 60 and 70: wrong
        </text>

        {/* The two groups */}
        <rect x={vx(a.avg) - BAR_W / 2} y={AXIS_Y - a.n * BAR_PER_STUDENT} width={BAR_W} height={a.n * BAR_PER_STUDENT} className="fill-indigo-400 dark:fill-indigo-500" />
        <text x={vx(a.avg)} y={AXIS_Y - a.n * BAR_PER_STUDENT - 18} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          A: 30 students
        </text>
        <text x={vx(a.avg)} y={AXIS_Y - a.n * BAR_PER_STUDENT - 6} textAnchor="middle" className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
          average 60
        </text>
        <rect x={vx(b.avg) - BAR_W / 2} y={AXIS_Y - b.n * BAR_PER_STUDENT} width={BAR_W} height={b.n * BAR_PER_STUDENT} className="fill-amber-300 dark:fill-amber-500" />
        <text x={vx(b.avg)} y={AXIS_Y - b.n * BAR_PER_STUDENT - 18} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          B: 20 students
        </text>
        <text x={vx(b.avg)} y={AXIS_Y - b.n * BAR_PER_STUDENT - 6} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          average 70
        </text>

        {/* Number line */}
        <line x1={vx(MIN)} y1={AXIS_Y} x2={vx(MAX)} y2={AXIS_Y} strokeWidth={1.4} className="stroke-foreground" />
        {ticks.map((t) => (
          <line key={t} x1={vx(t)} y1={AXIS_Y} x2={vx(t)} y2={AXIS_Y + (t % 5 === 0 ? 6 : 3)} strokeWidth={1} className="stroke-foreground" />
        ))}
        {ticks
          .filter((t) => t % 5 === 0)
          .map((t) => (
            <text key={t} x={vx(t)} y={AXIS_Y + 17} textAnchor="middle" className="fill-foreground text-[10px]">
              {t}
            </text>
          ))}

        {/* The combined average */}
        <line x1={vx(all)} y1={AXIS_Y} x2={vx(all)} y2={AXIS_Y + 22} strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points={`${vx(all)},${AXIS_Y + 22} ${vx(all) - 6},${AXIS_Y + 32} ${vx(all) + 6},${AXIS_Y + 32}`} className="fill-rose-600 dark:fill-rose-400" />
        <text x={vx(all)} y={AXIS_Y + 45} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          all 50 students: 64
        </text>

        <text x={160} y={214} textAnchor="middle" className="fill-foreground text-[10px]">
          Total = 30 × 60 + 20 × 70 = 1800 + 1400 = 3200
        </text>
        <text x={160} y={229} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Average = 3200 ÷ 50 = 64, nearer the bigger group
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Add the totals and the counts, never the averages. Section A has 30 students at 60 and section B 20 at 70: the 50 together
        average 64, not 65, because the bigger group pulls the combined average towards its own.
      </p>
    </div>
  );
}
