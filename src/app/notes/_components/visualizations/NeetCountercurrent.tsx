/**
 * Static figure: the counter current mechanism of the kidney, in the words of
 * the NEET concept "The counter current mechanism" (nzoex-countercurrent) and
 * its neighbour on Henle's loop (nzoex-tubules).
 *
 * - Henle's loop (filtrate) and the vasa recta (blood), each with its two limbs
 *   flowing in opposite directions: the counter currents.
 * - The medullary interstitium shaded darker towards the inner medulla: its
 *   osmolarity rises from 300 mOsmol L⁻¹ in the cortex to about 1200 mOsmol L⁻¹
 *   in the inner medulla (the only two values the concept gives).
 * - Water leaves the descending limb (permeable to water, almost impermeable to
 *   electrolytes); NaCl leaves the ascending limb (impermeable to water) and
 *   passes to the descending limb of the vasa recta; the ascending portion of the
 *   vasa recta returns NaCl to the interstitium; urea enters the thin segment of
 *   the ascending limb and leaves the collecting duct; water leaves the
 *   collecting duct.
 *
 * The data are exported and pinned by tests/notes-neet-visuals-bio-b.test.ts.
 * Server component, no client state.
 */

/** The concept's two values, in its own unit. */
export const GRADIENT = { cortex: 300, innerMedulla: 1200, unit: "mOsmol L⁻¹" } as const;

export type TubeId = "henle-desc" | "henle-asc" | "vr-desc" | "vr-asc" | "cd";

export type Tube = {
  id: TubeId;
  /** Name drawn beside the tube. */
  name: string;
  x: number;
  /** Direction of flow inside it (down = from cortex towards the inner medulla). */
  flow: "down" | "up";
};

export const TUBES: readonly Tube[] = [
  { id: "henle-desc", name: "descending limb", x: 96, flow: "down" },
  { id: "henle-asc", name: "ascending limb", x: 146, flow: "up" },
  { id: "vr-desc", name: "descending limb", x: 196, flow: "down" },
  { id: "vr-asc", name: "ascending portion", x: 240, flow: "up" },
  { id: "cd", name: "collecting duct", x: 288, flow: "down" },
];

/** What each limb of Henle's loop lets through, as the concept states it. */
export const LIMB_PERMEABILITY = {
  "henle-desc": { water: "permeable", electrolytes: "almost impermeable", filtrate: "concentrated" },
  "henle-asc": { water: "impermeable", electrolytes: "move out actively or passively", filtrate: "diluted" },
} as const;

export type Exchange = {
  what: "H₂O" | "NaCl" | "urea";
  from: TubeId | "interstitium";
  to: TubeId | "interstitium";
  /** The arrow runs from x1 to x2 at height y; the head is at x2. */
  x1: number;
  x2: number;
  y: number;
};

export const EXCHANGES: readonly Exchange[] = [
  { what: "H₂O", from: "henle-desc", to: "interstitium", x1: 89, x2: 70, y: 185 },
  { what: "NaCl", from: "henle-asc", to: "vr-desc", x1: 153, x2: 189, y: 170 },
  { what: "urea", from: "interstitium", to: "henle-asc", x1: 180, x2: 153, y: 212 },
  { what: "NaCl", from: "vr-asc", to: "interstitium", x1: 247, x2: 272, y: 200 },
  { what: "H₂O", from: "cd", to: "interstitium", x1: 281, x2: 262, y: 150 },
  { what: "urea", from: "cd", to: "interstitium", x1: 281, x2: 262, y: 238 },
];

/** The medulla: shaded in bands, darker (higher osmolarity) towards the inner medulla. */
export const MEDULLA_TOP = 80;
export const MEDULLA_BOTTOM = 262;
export const BAND_COUNT = 7;
export function bandOpacity(i: number): number {
  return Math.round((0.06 + (i * 0.36) / (BAND_COUNT - 1)) * 100) / 100;
}

const TOP = 40;
const LOOP_BOTTOM = 215;
const VR_BOTTOM = 218;

const TUBE_OUTER = "stroke-sky-600 dark:stroke-sky-400";
const TUBE_INNER = "stroke-sky-50 dark:stroke-sky-950";
const VESSEL_OUTER = "stroke-rose-600 dark:stroke-rose-400";
const VESSEL_INNER = "stroke-rose-50 dark:stroke-rose-950";
const LABEL = "fill-foreground text-[10px]";
const SMALL = "fill-muted-foreground text-[10px]";

const ARROW_TONE: Record<Exchange["what"], { line: string; text: string }> = {
  "H₂O": { line: "stroke-sky-700 fill-sky-700 dark:stroke-sky-300 dark:fill-sky-300", text: "fill-sky-700 dark:fill-sky-300" },
  NaCl: { line: "stroke-amber-700 fill-amber-700 dark:stroke-amber-300 dark:fill-amber-300", text: "fill-amber-700 dark:fill-amber-300" },
  urea: { line: "stroke-violet-700 fill-violet-700 dark:stroke-violet-300 dark:fill-violet-300", text: "fill-violet-700 dark:fill-violet-300" },
};

function FlowMark({ x, y, flow, tone }: { x: number; y: number; flow: "down" | "up"; tone: string }) {
  const d = flow === "down" ? 1 : -1;
  return <polygon points={`${x - 3},${y - 3 * d} ${x + 3},${y - 3 * d} ${x},${y + 3 * d}`} className={tone} />;
}

function TubePath({ d, outer, inner }: { d: string; outer: string; inner: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} strokeWidth={13} className={outer} />
      <path d={d} strokeWidth={8.5} className={inner} />
    </g>
  );
}

export default function NeetCountercurrent() {
  const henleD = `M 96 ${TOP} L 96 ${LOOP_BOTTOM} A 25 25 0 0 0 146 ${LOOP_BOTTOM} L 146 ${TOP}`;
  const vrD = `M 196 ${TOP} L 196 ${VR_BOTTOM} A 22 22 0 0 0 240 ${VR_BOTTOM} L 240 ${TOP}`;
  const bandH = (MEDULLA_BOTTOM - MEDULLA_TOP) / BAND_COUNT;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the counter current mechanism
      </p>
      <svg
        viewBox="0 0 320 266"
        className="block h-auto w-full"
        role="img"
        aria-label="Henle's loop and the vasa recta side by side in the kidney medulla, each with two limbs flowing in opposite directions. The medullary interstitium gets more concentrated from 300 mOsmol per litre in the cortex to about 1200 in the inner medulla. Water leaves the descending limb, NaCl leaves the ascending limb and passes to the vasa recta, urea enters the ascending limb and leaves the collecting duct."
      >
        {/* Cortex and the medullary interstitium, shaded darker inwards. */}
        <rect x={0} y={32} width={320} height={MEDULLA_TOP - 32} className="fill-amber-400 dark:fill-amber-500" fillOpacity={0.03} />
        {Array.from({ length: BAND_COUNT }, (_, i) => (
          <rect
            key={i}
            x={0}
            y={MEDULLA_TOP + i * bandH}
            width={320}
            height={bandH + 0.5}
            className="fill-amber-400 dark:fill-amber-500"
            fillOpacity={bandOpacity(i)}
          />
        ))}
        <line x1={0} y1={MEDULLA_TOP} x2={320} y2={MEDULLA_TOP} strokeWidth={1} strokeDasharray="4 3" className="stroke-muted-foreground" />

        {/* The gradient's two values. */}
        <text x={4} y={46} className="fill-foreground text-[10px] font-semibold">Cortex</text>
        <text x={4} y={58} className={LABEL}>{GRADIENT.cortex}</text>
        <text x={4} y={70} className={SMALL}>{GRADIENT.unit}</text>
        <text x={4} y={222} className="fill-foreground text-[10px] font-semibold">Inner medulla</text>
        <text x={4} y={234} className={LABEL}>about {GRADIENT.innerMedulla}</text>
        <text x={4} y={246} className={SMALL}>{GRADIENT.unit}</text>
        <line x1={14} y1={92} x2={14} y2={196} strokeWidth={1.5} className="stroke-amber-700 dark:stroke-amber-300" />
        <polygon points="10,194 18,194 14,202" className="fill-amber-700 dark:fill-amber-300" />
        <text x={30} y={147} textAnchor="middle" transform="rotate(-90 30 147)" className="fill-amber-800 text-[10px] dark:fill-amber-200">
          osmolarity rises
        </text>

        {/* Names. */}
        <text x={121} y={12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Henle&apos;s loop</text>
        <text x={121} y={24} textAnchor="middle" className={SMALL}>(filtrate)</text>
        <text x={218} y={12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Vasa recta</text>
        <text x={218} y={24} textAnchor="middle" className={SMALL}>(blood)</text>
        <text x={288} y={12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Collecting</text>
        <text x={288} y={24} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">duct</text>

        {/* The tubes. */}
        <TubePath d={henleD} outer={TUBE_OUTER} inner={TUBE_INNER} />
        <TubePath d={vrD} outer={VESSEL_OUTER} inner={VESSEL_INNER} />
        <TubePath d={`M 288 ${TOP} L 288 258`} outer={TUBE_OUTER} inner={TUBE_INNER} />

        {/* Flow inside each tube: opposite in the two limbs of each loop. */}
        {TUBES.flatMap((t) =>
          [70, 130].map((y) => (
            <FlowMark
              key={`${t.id}-${y}`}
              x={t.x}
              y={y}
              flow={t.flow}
              tone={t.id.startsWith("vr") ? "fill-rose-600 dark:fill-rose-400" : "fill-sky-600 dark:fill-sky-400"}
            />
          )),
        )}

        {/* Limb names along the tubes. */}
        <text x={86} y={125} textAnchor="middle" transform="rotate(-90 86 125)" className={LABEL}>descending limb</text>
        <text x={164} y={110} textAnchor="middle" transform="rotate(-90 164 110)" className={LABEL}>ascending limb</text>
        <text x={187} y={110} textAnchor="middle" transform="rotate(-90 187 110)" className={LABEL}>descending limb</text>
        <text x={258} y={110} textAnchor="middle" transform="rotate(-90 258 110)" className={LABEL}>ascending portion</text>

        {/* What crosses into and out of the interstitium. */}
        {EXCHANGES.map((e) => {
          const dir = Math.sign(e.x2 - e.x1);
          const tone = ARROW_TONE[e.what];
          return (
            <g key={`${e.what}-${e.from}-${e.to}`}>
              <line x1={e.x1} y1={e.y} x2={e.x2 - dir * 4} y2={e.y} strokeWidth={1.5} className={tone.line} />
              <polygon
                points={`${e.x2},${e.y} ${e.x2 - dir * 6},${e.y - 3.5} ${e.x2 - dir * 6},${e.y + 3.5}`}
                className={tone.line}
                strokeWidth={0}
              />
              <text x={(e.x1 + e.x2) / 2} y={e.y - 5} textAnchor="middle" className={`${tone.text} text-[10px] font-semibold`}>
                {e.what}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
        <li>
          <span className="font-semibold text-foreground">Descending limb:</span> permeable to water, almost
          impermeable to electrolytes, so the filtrate gets concentrated.
        </li>
        <li>
          <span className="font-semibold text-foreground">Ascending limb:</span> impermeable to water; electrolytes
          move out actively or passively, so the filtrate gets diluted.
        </li>
        <li>
          The gradient is made mainly by NaCl and urea. NaCl from the ascending limb passes to the descending limb of
          the vasa recta and is returned to the interstitium by its ascending portion; urea enters the thin segment of
          the ascending limb and is carried back by the collecting tubule.
        </li>
      </ul>
    </div>
  );
}
