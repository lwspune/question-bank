/**
 * Static figure: the four plant groups as a ladder, in the words of the SSC
 * concept "The four plant groups" (sscbbcpl-groups).
 *
 * - Bryophytes (mosses, liverworts): no vascular tissue; the gametophyte is
 *   the main plant.
 * - Pteridophytes (ferns, horsetails, lycophytes): the first vascular plants,
 *   no seeds.
 * - Gymnosperms (Cycas, Pinus): naked seeds in cones, no flowers.
 * - Angiosperms (rose): flowers, with seeds inside fruits.
 * - In vascular plants the sporophyte is the main plant.
 *
 * Data exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type PlantGroup = { name: string; examples: string; fact: string; mainPlant: "gametophyte" | "sporophyte" };

/** The ladder, bottom rung first (the order the concept lists them). */
export const PLANT_GROUPS: readonly PlantGroup[] = [
  { name: "Bryophytes", examples: "mosses, liverworts", fact: "no vascular tissue", mainPlant: "gametophyte" },
  { name: "Pteridophytes", examples: "ferns, horsetails, lycophytes", fact: "first vascular plants, no seeds", mainPlant: "sporophyte" },
  { name: "Gymnosperms", examples: "Cycas, Pinus", fact: "naked seeds in cones, no flowers", mainPlant: "sporophyte" },
  { name: "Angiosperms", examples: "rose", fact: "flowers; seeds inside fruits", mainPlant: "sporophyte" },
];

export const ROW_H = 50;
export const ROW_GAP = 6;
export const ROW_X = 8;
export const ROW_W = 200;
const TOP = 6;

/** Top y of a rung: the first group sits at the bottom of the ladder. */
export function rowTop(i: number): number {
  return TOP + (PLANT_GROUPS.length - 1 - i) * (ROW_H + ROW_GAP);
}

const ROW = "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400";
const BRACKET = "fill-none stroke-muted-foreground";

function Bracket({ y1, y2, lines }: { y1: number; y2: number; lines: readonly string[] }) {
  const x = ROW_X + ROW_W + 8;
  const mid = (y1 + y2) / 2;
  return (
    <g>
      <polyline points={`${x},${y1 + 4} ${x + 6},${y1 + 4} ${x + 6},${y2 - 4} ${x},${y2 - 4}`} strokeWidth={1.25} className={BRACKET} />
      {lines.map((l, k) => (
        <text
          key={k}
          x={x + 12}
          y={mid - ((lines.length - 1) * 12) / 2 + k * 12 + 4}
          className={k === 1 ? "fill-foreground text-[10px] font-semibold" : "fill-muted-foreground text-[10px]"}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

export default function SscPlantGroups() {
  const bryoTop = rowTop(0);
  const vascTop = rowTop(PLANT_GROUPS.length - 1);
  const vascBottom = rowTop(1) + ROW_H;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the plant ladder
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="The four plant groups as a ladder, from the bottom: bryophytes (mosses, liverworts) with no vascular tissue; pteridophytes (ferns, horsetails, lycophytes), the first vascular plants, with no seeds; gymnosperms (Cycas, Pinus) with naked seeds in cones and no flowers; angiosperms (rose) with flowers and seeds inside fruits. In bryophytes the main plant is the gametophyte; in the vascular plants it is the sporophyte."
      >
        {PLANT_GROUPS.map((g, i) => {
          const y = rowTop(i);
          return (
            <g key={g.name}>
              <rect x={ROW_X} y={y} width={ROW_W} height={ROW_H} rx={8} strokeWidth={1.5} className={ROW} />
              <text x={ROW_X + 10} y={y + 15} className="fill-foreground text-[11px] font-semibold">
                {g.name}
              </text>
              <text x={ROW_X + 10} y={y + 29} className="fill-muted-foreground text-[10px]">
                {g.examples}
              </text>
              <text x={ROW_X + 10} y={y + 43} className="fill-emerald-800 text-[10px] dark:fill-emerald-200">
                {g.fact}
              </text>
            </g>
          );
        })}
        <Bracket y1={vascTop} y2={vascBottom} lines={["main plant:", "sporophyte", "(vascular plants)"]} />
        <Bracket y1={bryoTop} y2={bryoTop + ROW_H} lines={["main plant:", "gametophyte"]} />
      </svg>
    </div>
  );
}
