/**
 * Static figure: the path of blood through the heart, and the number of heart
 * chambers, in the words of the SSC concept "Heart, kidney, tissues and
 * antibodies" (sscbhpsy-circulation).
 *
 * - Blood flow: right atrium, right ventricle, lungs, left atrium, left
 *   ventricle, body (the six stops, numbered in that order).
 * - Heart chambers: fish 2, amphibians and most reptiles 3, birds and mammals 4.
 *
 * The heart is drawn from the front, as in a textbook, so its right side is on
 * the reader's left; the note under the picture says so.
 *
 * Data exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type Box = { x: number; y: number; w: number; h: number };
export type Stop = { n: number; name: string; box: Box; heart: boolean };

const RA: Box = { x: 56, y: 58, w: 100, h: 52 };
const LA: Box = { x: 164, y: 58, w: 100, h: 52 };
const RV: Box = { x: 56, y: 114, w: 100, h: 60 };
const LV: Box = { x: 164, y: 114, w: 100, h: 60 };
const LUNGS: Box = { x: 110, y: 6, w: 100, h: 28 };
const BODY: Box = { x: 110, y: 196, w: 100, h: 28 };

/** The concept's order of blood flow. */
export const STOPS: readonly Stop[] = [
  { n: 1, name: "Right atrium", box: RA, heart: true },
  { n: 2, name: "Right ventricle", box: RV, heart: true },
  { n: 3, name: "Lungs", box: LUNGS, heart: false },
  { n: 4, name: "Left atrium", box: LA, heart: true },
  { n: 5, name: "Left ventricle", box: LV, heart: true },
  { n: 6, name: "Body", box: BODY, heart: false },
];

/** One arrow from each stop to the next (five links; the concept's list ends at the body). */
export const LINKS: readonly { from: number; to: number; points: readonly [number, number][] }[] = [
  { from: 1, to: 2, points: [[106, 86], [106, 132]] },
  { from: 2, to: 3, points: [[56, 150], [34, 150], [34, 20], [108, 20]] },
  { from: 3, to: 4, points: [[210, 20], [288, 20], [288, 84], [266, 84]] },
  { from: 4, to: 5, points: [[214, 86], [214, 132]] },
  { from: 5, to: 6, points: [[264, 150], [288, 150], [288, 210], [212, 210]] },
];

/** Label baseline: atria and the two places near the top, ventricles low (the arrow from each atrium needs the room). */
export function labelY(s: Stop): number {
  return s.box.y + (s.name.endsWith("ventricle") ? 40 : 18);
}

export type ChamberCount = { chambers: number; animals: readonly string[] };
export const CHAMBER_COUNTS: readonly ChamberCount[] = [
  { chambers: 2, animals: ["fish"] },
  { chambers: 3, animals: ["amphibians,", "most reptiles"] },
  { chambers: 4, animals: ["birds and", "mammals"] },
];

const CHAMBER = "fill-rose-50 stroke-rose-700 dark:fill-rose-950/40 dark:stroke-rose-300";
const PLACE = "fill-sky-50 stroke-sky-700 dark:fill-sky-950/40 dark:stroke-sky-300";
const FLOW = "fill-none stroke-foreground";

export default function SscBloodFlow() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the path of blood
      </p>
      <svg
        viewBox="0 0 320 290"
        className="block h-auto w-full"
        role="img"
        aria-label="Blood flows from the right atrium to the right ventricle, then to the lungs, then to the left atrium, the left ventricle and the body. Below: fish have 2 heart chambers, amphibians and most reptiles 3, birds and mammals 4."
      >
        <defs>
          <marker id="ssc-blood-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
          </marker>
        </defs>
        {STOPS.map((s) => (
          <g key={s.n}>
            <rect x={s.box.x} y={s.box.y} width={s.box.w} height={s.box.h} rx={s.heart ? 12 : 8} strokeWidth={1.5} className={s.heart ? CHAMBER : PLACE} />
            <text x={s.box.x + s.box.w / 2} y={labelY(s)} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {`${s.n} ${s.name}`}
            </text>
          </g>
        ))}
        {LINKS.map((l) => (
          <polyline
            key={`${l.from}-${l.to}`}
            points={l.points.map(([x, y]) => `${x},${y}`).join(" ")}
            strokeWidth={1.5}
            markerEnd="url(#ssc-blood-arrow)"
            className={FLOW}
          />
        ))}
        {CHAMBER_COUNTS.map((c, i) => {
          const x = 10 + i * 102;
          return (
            <g key={c.chambers}>
              <rect x={x} y={238} width={96} height={48} rx={6} strokeWidth={1} className="fill-card stroke-border" />
              <text x={x + 48} y={252} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {`${c.chambers} chambers`}
              </text>
              {c.animals.map((a, k) => (
                <text key={a} x={x + 48} y={265 + k * 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  {a}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The heart is drawn from the front, so its right side is on your left.
      </p>
    </div>
  );
}
