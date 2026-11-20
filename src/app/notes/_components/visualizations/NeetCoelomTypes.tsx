/**
 * Static figure: three body plans in cross-section, in the words of the NEET
 * concept "The coelom" (nzoak-coelom).
 *
 * - Acoelomate (Platyhelminthes): the body cavity is absent; the layers touch.
 * - Pseudocoelomate (Aschelminthes): a body cavity, but the mesoderm is only in
 *   scattered pouches between the ectoderm and the endoderm (none round the
 *   gut, as the concept's trap describes).
 * - Coelomate (Annelida, and the others the concept lists): the body cavity is
 *   lined by mesoderm all round.
 *
 * Each section is drawn as rings from the body wall in to the gut. Data
 * exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type Layer = "ectoderm" | "mesoderm" | "endoderm" | "cavity" | "gut";
/** A ring from radius `r` inward to the next ring's radius. */
export type Ring = { r: number; layer: Layer };

export type BodyPlan = {
  name: "Acoelomate" | "Pseudocoelomate" | "Coelomate";
  phylum: string;
  cavity: string;
  note: string;
  /** Rings, outermost first. */
  rings: readonly Ring[];
  /** Mesoderm pouches (pseudocoelomate only), as angles in degrees. */
  pouches: readonly number[];
};

export const OUTER_R = 42;
export const ECTO_IN = 36;
export const ENDO_OUT = 16;
export const GUT_R = 10;
/** The pouches sit just inside the ectoderm. */
export const POUCH_R = 31;
export const POUCH_SIZE = 5;

export const BODY_PLANS: readonly BodyPlan[] = [
  {
    name: "Acoelomate",
    phylum: "Platyhelminthes",
    cavity: "no body cavity",
    note: "layers touch",
    rings: [
      { r: OUTER_R, layer: "ectoderm" },
      { r: ECTO_IN, layer: "mesoderm" },
      { r: ENDO_OUT, layer: "endoderm" },
      { r: GUT_R, layer: "gut" },
    ],
    pouches: [],
  },
  {
    name: "Pseudocoelomate",
    phylum: "Aschelminthes",
    cavity: "pseudocoelom",
    note: "mesoderm in pouches",
    rings: [
      { r: OUTER_R, layer: "ectoderm" },
      { r: ECTO_IN, layer: "cavity" },
      { r: ENDO_OUT, layer: "endoderm" },
      { r: GUT_R, layer: "gut" },
    ],
    pouches: [20, 110, 200, 290],
  },
  {
    name: "Coelomate",
    phylum: "e.g. Annelida",
    cavity: "true coelom",
    note: "lined by mesoderm",
    rings: [
      { r: OUTER_R, layer: "ectoderm" },
      { r: ECTO_IN, layer: "mesoderm" },
      { r: 30, layer: "cavity" },
      { r: 22, layer: "mesoderm" },
      { r: ENDO_OUT, layer: "endoderm" },
      { r: GUT_R, layer: "gut" },
    ],
    pouches: [],
  },
];

/** Does the body cavity exist, and which layers touch it on each side? */
export function cavityNeighbours(p: BodyPlan): { outer: Layer; inner: Layer } | null {
  const i = p.rings.findIndex((r) => r.layer === "cavity");
  if (i < 0) return null;
  return { outer: p.rings[i - 1].layer, inner: p.rings[i + 1].layer };
}

export function pouchCenter(cx: number, cy: number, deg: number): { x: number; y: number } {
  const a = (deg * Math.PI) / 180;
  return { x: Math.round((cx + POUCH_R * Math.cos(a)) * 100) / 100, y: Math.round((cy + POUCH_R * Math.sin(a)) * 100) / 100 };
}

const FILL: Record<Layer, string> = {
  ectoderm: "fill-sky-300 stroke-sky-700 dark:fill-sky-700 dark:stroke-sky-300",
  mesoderm: "fill-rose-300 stroke-rose-700 dark:fill-rose-800 dark:stroke-rose-300",
  endoderm: "fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300",
  cavity: "fill-white stroke-muted-foreground dark:fill-slate-900",
  gut: "fill-muted stroke-muted-foreground",
};

export const LEGEND: readonly Layer[] = ["ectoderm", "mesoderm", "endoderm"];
const CX = [54, 160, 266];
const CY = 84;

export default function NeetCoelomTypes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three kinds of body cavity
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="Three cross-sections from the body wall in to the gut. Acoelomate, Platyhelminthes: ectoderm, mesoderm and endoderm touch, with no body cavity. Pseudocoelomate, Aschelminthes: a body cavity, the pseudocoelom, with mesoderm only in scattered pouches. Coelomate, for example Annelida: a true coelom lined by mesoderm on both sides."
      >
        {BODY_PLANS.map((p, i) => {
          const cx = CX[i];
          return (
            <g key={p.name}>
              <text x={cx} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {p.name}
              </text>
              <text x={cx} y={27} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {p.phylum}
              </text>
              {p.rings.map((r) => (
                <circle key={r.r} cx={cx} cy={CY} r={r.r} strokeWidth={1} className={FILL[r.layer]} />
              ))}
              {p.pouches.map((d) => {
                const c = pouchCenter(cx, CY, d);
                return <circle key={d} cx={c.x} cy={c.y} r={POUCH_SIZE} strokeWidth={1} className={FILL.mesoderm} />;
              })}
              <text x={cx} y={CY + 3} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                gut
              </text>
              <text x={cx} y={146} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {p.cavity}
              </text>
              <text x={cx} y={159} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {p.note}
              </text>
            </g>
          );
        })}
        {LEGEND.map((l, i) => {
          const x = 30 + i * 96;
          return (
            <g key={l}>
              <rect x={x} y={176} width={12} height={12} rx={2} strokeWidth={1} className={FILL[l]} />
              <text x={x + 17} y={186} className="fill-foreground text-[10px]">
                {l[0].toUpperCase() + l.slice(1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
