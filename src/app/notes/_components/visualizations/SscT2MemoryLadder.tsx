/**
 * Static figure: the memory ladder (concept ssc2chwhw-memory). From the top:
 * registers (inside the CPU), cache (between the CPU and main memory), main
 * memory (RAM) and storage (disks, drives). Higher rungs are faster and
 * smaller; lower rungs are bigger. RAM forgets its data when the power goes
 * off; storage keeps it.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type Rung = { name: string; note: string; power: "forgets" | "keeps" | "" };

/** Top (fastest, smallest) first. */
export const LADDER: readonly Rung[] = [
  { name: "Registers", note: "inside the CPU", power: "" },
  { name: "Cache", note: "between the CPU and RAM", power: "" },
  { name: "Main memory (RAM)", note: "talks directly to the CPU", power: "forgets" },
  { name: "Storage", note: "disks, SSD, pen drive", power: "keeps" },
];

export const rungOf = (name: string) => LADDER.findIndex((r) => r.name.startsWith(name));

const TOP_Y = 14;
const ROW_H = 50;
const CX = 160;
const halfWidth = (i: number) => 46 + i * 24;

const FILLS = [
  "fill-sky-200 stroke-sky-600 dark:fill-sky-900 dark:stroke-sky-400",
  "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400",
  "fill-indigo-100 stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-400",
  "fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400",
] as const;

export default function SscT2MemoryLadder() {
  const bottom = TOP_Y + (LADDER.length - 1) * ROW_H; // arrows stop above the widest rung
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the memory ladder
      </p>
      <svg
        viewBox="0 0 320 246"
        className="block h-auto w-full"
        role="img"
        aria-label="A ladder of memory, narrow at the top and wide at the bottom. From the top: registers, inside the CPU; cache, between the CPU and RAM; main memory or RAM, which forgets its data when the power goes off; storage such as disks, SSD and pen drives, which keeps its data. Higher rungs are faster, lower rungs are bigger."
      >
        {LADDER.map((r, i) => {
          const y = TOP_Y + i * ROW_H;
          const tw = halfWidth(i);
          const bw = halfWidth(i + 1);
          return (
            <g key={r.name}>
              <polygon
                points={`${CX - tw},${y} ${CX + tw},${y} ${CX + bw},${y + ROW_H - 4} ${CX - bw},${y + ROW_H - 4}`}
                strokeWidth={1.2}
                className={FILLS[i]}
              />
              <text x={CX} y={y + 17} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {r.name}
              </text>
              <text x={CX} y={y + 29} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {r.note}
              </text>
              {r.power ? (
                <text
                  x={CX}
                  y={y + 41}
                  textAnchor="middle"
                  className={`text-[10px] font-semibold ${r.power === "forgets" ? "fill-rose-700 dark:fill-rose-300" : "fill-emerald-700 dark:fill-emerald-300"}`}
                >
                  {r.power === "forgets" ? "forgets when power goes off" : "keeps data without power"}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* faster up the left, bigger down the right */}
        <line x1={12} y1={bottom - 8} x2={12} y2={TOP_Y + 10} strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <polygon points={`12,${TOP_Y + 2} 8,${TOP_Y + 10} 16,${TOP_Y + 10}`} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={20} y={TOP_Y + 14} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          faster
        </text>
        <line x1={308} y1={TOP_Y + 2} x2={308} y2={bottom - 16} strokeWidth={1.5} className="stroke-amber-600 dark:stroke-amber-400" />
        <polygon points={`308,${bottom - 8} 304,${bottom - 16} 312,${bottom - 16}`} className="fill-amber-600 dark:fill-amber-400" />
        <text x={300} y={TOP_Y + 14} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          bigger
        </text>

        <text x={160} y={238} textAnchor="middle" className="fill-foreground text-[11px]">
          Cache is faster than RAM; RAM is faster than storage.
        </text>
      </svg>
    </div>
  );
}
