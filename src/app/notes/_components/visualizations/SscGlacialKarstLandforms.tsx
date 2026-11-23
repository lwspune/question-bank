/**
 * Static figure: the ice and limestone-cave landforms of concept
 * sscgeslf-landforms, as simple labelled sketches.
 *
 * Ice: a tributary glacier cuts less deep, so its valley is left as a hanging
 * valley high above the main valley; the ridge ends are cut back into
 * truncated spurs; till is an unsorted mix of clay, sand and boulders dropped
 * straight from ice. Limestone cave: a stalactite hangs down from the roof, a
 * stalagmite rises up from the floor where water drips, and where the two meet
 * they form a pillar. Only these forms: the concept's river and wind forms
 * belong to other pictures. Values pinned by tests/notes-ssc-visuals-gk.test.ts.
 * Server component, no client state.
 */

export type Landform = { name: string; agent: "ice" | "dripping water"; fact: string };

export const ICE_FORMS: readonly Landform[] = [
  { name: "Hanging valley", agent: "ice", fact: "a tributary glacier cut less deep" },
  { name: "Truncated spur", agent: "ice", fact: "ridge end cut back" },
  { name: "Till", agent: "ice", fact: "unsorted mix of clay, sand and boulders" },
];

export const CAVE_FORMS: readonly Landform[] = [
  { name: "Stalactite", agent: "dripping water", fact: "hangs down from the roof" },
  { name: "Stalagmite", agent: "dripping water", fact: "rises up from the floor" },
  { name: "Pillar", agent: "dripping water", fact: "the two meet" },
];

/** Glacier sketch: the hanging valley's floor sits far above the main valley's floor (smaller y is higher). */
export const VALLEY = { hangingFloorY: 66, mainFloorY: 130 } as const;

const CAVE_TOP = 156;
/** Cave sketch heights (SVG y, smaller is higher). */
export const CAVE = {
  roofY: CAVE_TOP + 34,
  floorY: CAVE_TOP + 118,
  stalactiteTipY: CAVE_TOP + 66,
  stalagmiteTipY: CAVE_TOP + 90,
} as const;

const ROCK = "fill-stone-300 stroke-stone-600 dark:fill-stone-700 dark:stroke-stone-400";
const LIME = "fill-stone-100 stroke-stone-500 dark:fill-stone-500 dark:stroke-stone-300";

function IcePanel() {
  const h = VALLEY.hangingFloorY;
  const m = VALLEY.mainFloorY;
  const ground =
    `M 8 50 L 20 50 C 26 62 30 ${h} 38 ${h} L 70 ${h} C 84 ${h + 20} 96 ${m - 4} 124 ${m} L 206 ${m} ` +
    `C 232 ${m - 4} 240 ${m - 40} 246 60 L 312 58 L 312 150 L 8 150 Z`;
  const till = [
    [148, m - 4],
    [154, m - 7],
    [160, m - 4],
    [166, m - 8],
    [172, m - 5],
    [158, m - 10],
  ] as const;
  return (
    <g>
      <text x={8} y={14} className="fill-foreground text-[11px] font-bold">
        Ice (glaciers)
      </text>
      <path d={ground} className={ROCK} strokeWidth={1.2} />
      {/* the cut-back face of the spur */}
      <path d={`M 206 ${m} C 232 ${m - 4} 240 ${m - 40} 246 60`} fill="none" className="stroke-violet-600 dark:stroke-violet-400" strokeWidth={3} />
      <path d={`M 142 ${m} Q 160 ${m - 16} 178 ${m} Z`} className="fill-amber-200 stroke-amber-700 dark:fill-amber-800 dark:stroke-amber-400" strokeWidth={1} />
      {till.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} className="fill-amber-900 dark:fill-amber-200" />
      ))}

      <text x={8} y={28} className="fill-sky-800 text-[10px] dark:fill-sky-300">
        <tspan className="font-bold">{ICE_FORMS[0].name}:</tspan> floor left high
      </text>
      <text x={8} y={40} className="fill-sky-800 text-[10px] dark:fill-sky-300">
        ({ICE_FORMS[0].fact})
      </text>
      <line x1={54} y1={44} x2={54} y2={62} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1} />
      <text x={160} y={86} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        main valley
      </text>
      <text x={160} y={99} textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        {ICE_FORMS[2].name}: unsorted mix of
      </text>
      <text x={160} y={110} textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        clay, sand and boulders
      </text>
      <line x1={160} y1={113} x2={160} y2={120} className="stroke-amber-700 dark:stroke-amber-400" strokeWidth={1} />
      <text x={312} y={28} textAnchor="end" className="fill-violet-800 text-[10px] font-bold dark:fill-violet-300">
        {ICE_FORMS[1].name}:
      </text>
      <text x={312} y={40} textAnchor="end" className="fill-violet-800 text-[10px] dark:fill-violet-300">
        {ICE_FORMS[1].fact}
      </text>
      <line x1={262} y1={44} x2={243} y2={84} className="stroke-violet-600 dark:stroke-violet-400" strokeWidth={1} />
    </g>
  );
}

function CavePanel() {
  const t = CAVE_TOP;
  const { roofY, floorY, stalactiteTipY, stalagmiteTipY } = CAVE;
  return (
    <g>
      <text x={8} y={t + 14} className="fill-foreground text-[11px] font-bold">
        Limestone cave
      </text>
      <rect x={8} y={t + 20} width={304} height={roofY - t - 20} className={ROCK} strokeWidth={1} />
      <rect x={8} y={floorY} width={304} height={14} className={ROCK} strokeWidth={1} />

      {/* stalactite, drips, stalagmite */}
      <polygon points={`30,${roofY} 50,${roofY} 40,${stalactiteTipY}`} className={LIME} strokeWidth={1} />
      {[t + 73, t + 81].map((y) => (
        <ellipse key={y} cx={40} cy={y} rx={1.8} ry={2.6} className="fill-sky-500 dark:fill-sky-400" />
      ))}
      <polygon points={`26,${floorY} 54,${floorY} 40,${stalagmiteTipY}`} className={LIME} strokeWidth={1} />

      <text x={62} y={t + 50} className="fill-foreground text-[10px] font-bold">
        {CAVE_FORMS[0].name}
      </text>
      <text x={62} y={t + 62} className="fill-muted-foreground text-[10px]">
        {CAVE_FORMS[0].fact}
      </text>
      <text x={62} y={t + 88} className="fill-foreground text-[10px] font-bold">
        {CAVE_FORMS[1].name}
      </text>
      <text x={62} y={t + 100} className="fill-muted-foreground text-[10px]">
        {CAVE_FORMS[1].fact}
      </text>
      <text x={62} y={t + 112} className="fill-muted-foreground text-[10px]">
        where water drips
      </text>

      {/* pillar */}
      <path
        d={`M 238 ${roofY} L 262 ${roofY} L 254 ${t + 76} L 264 ${floorY} L 236 ${floorY} L 246 ${t + 76} Z`}
        className={LIME}
        strokeWidth={1}
      />
      <text x={232} y={t + 76} textAnchor="end" className="fill-foreground text-[10px] font-bold">
        {CAVE_FORMS[2].name}:
      </text>
      <text x={232} y={t + 88} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {CAVE_FORMS[2].fact}
      </text>
    </g>
  );
}

export default function SscGlacialKarstLandforms() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · landforms made by ice and in limestone caves
      </p>
      <svg
        viewBox="0 0 320 294"
        className="block h-auto w-full"
        role="img"
        aria-label="Top, ice: a hanging valley whose floor is left high above the main valley, because a tributary glacier cut less deep; a truncated spur, the ridge end cut back; and till, an unsorted heap of clay, sand and boulders, on the main valley floor. Bottom, a limestone cave: a stalactite hangs down from the roof, water drips from it, and a stalagmite rises up from the floor below; to the right, where the two meet they form a pillar."
      >
        <IcePanel />
        <line x1={8} y1={CAVE_TOP - 2} x2={312} y2={CAVE_TOP - 2} className="stroke-border" strokeWidth={1} />
        <CavePanel />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Stalactite down from the roof, stalagmite up from the floor. A tributary glacier cuts less deep, so its valley is left hanging
        high above the main valley.
      </p>
    </div>
  );
}
