/**
 * Static figure: the two ways a hormone acts on its target cell, in the words
 * of the NEET concept "How hormones act, and their chemical groups"
 * (nzocc-mechanism).
 *
 * - A protein hormone binds a membrane-bound receptor and does not enter the
 *   cell; second messengers (cyclic AMP, IP₃, Ca²⁺) regulate cell metabolism.
 * - A steroid hormone enters the cell and binds an intracellular receptor in
 *   the nucleus; the hormone-receptor complex acts on the genome and regulates
 *   gene expression.
 *
 * Data exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type Route = {
  title: string;
  entry: string;
  receptor: string;
  /** The chain from the receptor to the effect, top to bottom. */
  chain: readonly string[];
  entersCell: boolean;
};

export const ROUTES: readonly Route[] = [
  {
    title: "Protein hormone",
    entry: "does not enter the cell",
    receptor: "membrane-bound receptor",
    chain: ["second messenger", "regulates cell metabolism"],
    entersCell: false,
  },
  {
    title: "Steroid hormone",
    entry: "enters the cell",
    receptor: "intracellular receptor",
    chain: ["hormone-receptor complex", "genome", "gene expression"],
    entersCell: true,
  },
];

export const SECOND_MESSENGERS = ["cyclic AMP", "IP₃", "Ca²⁺"] as const;

export const CELL_TOP = 52;
export const CELL_BOTTOM = 204;
export const NUCLEUS = { cx: 240, cy: 138, rx: 62, ry: 62 };
/** Where each hormone binds its receptor. */
export const BIND = [
  { x: 80, y: CELL_TOP - 6 },
  { x: 240, y: 102 },
] as const;

export function insideNucleus(p: { x: number; y: number }): boolean {
  return ((p.x - NUCLEUS.cx) / NUCLEUS.rx) ** 2 + ((p.y - NUCLEUS.cy) / NUCLEUS.ry) ** 2 < 1;
}

const CELL = "fill-teal-50 stroke-teal-700 dark:fill-teal-950/40 dark:stroke-teal-300";
const NUC = "fill-violet-100 stroke-violet-700 dark:fill-violet-950/50 dark:stroke-violet-300";
const HORMONE = "fill-amber-500 stroke-amber-800 dark:fill-amber-400 dark:stroke-amber-200";
const RECEPTOR = "fill-teal-600 dark:fill-teal-400";
const T = "fill-foreground text-[10px]";
const TB = "fill-foreground text-[10px] font-semibold";
const MUTED = "fill-muted-foreground text-[10px]";

function Cup({ x, y }: { x: number; y: number }) {
  return <path d={`M ${x - 9} ${y - 4} L ${x - 9} ${y + 6} L ${x + 9} ${y + 6} L ${x + 9} ${y - 4} L ${x + 6} ${y - 4} L ${x + 6} ${y + 3} L ${x - 6} ${y + 3} L ${x - 6} ${y - 4} Z`} className={RECEPTOR} />;
}

export default function NeetHormoneAction() {
  const [a, b] = ROUTES;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two ways hormones act
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: a protein hormone binds a membrane-bound receptor and does not enter the cell; a second messenger such as cyclic AMP, IP3 or calcium ions regulates cell metabolism. Right: a steroid hormone enters the cell and binds an intracellular receptor in the nucleus; the hormone-receptor complex acts on the genome and regulates gene expression."
      >
        <defs>
          <marker id="neet-hormone-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
          </marker>
        </defs>

        {/* Left: membrane-bound receptor. */}
        <text x={80} y={13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">{a.title}</text>
        <text x={80} y={26} textAnchor="middle" className={MUTED}>{a.entry}</text>
        <rect x={10} y={CELL_TOP} width={140} height={CELL_BOTTOM - CELL_TOP} rx={14} strokeWidth={3} className={CELL} />
        <Cup x={BIND[0].x} y={CELL_TOP} />
        <circle cx={BIND[0].x} cy={BIND[0].y} r={6} strokeWidth={1} className={HORMONE} />
        <text x={92} y={44} className={MUTED}>hormone</text>
        <line x1={80} y1={64} x2={80} y2={98} strokeWidth={1.25} markerEnd="url(#neet-hormone-arrow)" className="stroke-foreground" />
        <text x={80} y={114} textAnchor="middle" className={TB}>{a.chain[0]}</text>
        <text x={80} y={127} textAnchor="middle" className={T}>{SECOND_MESSENGERS.join(", ")}</text>
        <line x1={80} y1={134} x2={80} y2={156} strokeWidth={1.25} markerEnd="url(#neet-hormone-arrow)" className="stroke-foreground" />
        <text x={80} y={172} textAnchor="middle" className={T}>regulates cell</text>
        <text x={80} y={184} textAnchor="middle" className={T}>metabolism</text>
        <text x={80} y={224} textAnchor="middle" className={TB}>{a.receptor}</text>

        {/* Right: intracellular (nuclear) receptor. */}
        <text x={240} y={13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">{b.title}</text>
        <text x={240} y={26} textAnchor="middle" className={MUTED}>{b.entry}</text>
        <rect x={170} y={CELL_TOP} width={140} height={CELL_BOTTOM - CELL_TOP} rx={14} strokeWidth={3} className={CELL} />
        <ellipse cx={NUCLEUS.cx} cy={NUCLEUS.cy} rx={NUCLEUS.rx} ry={NUCLEUS.ry} strokeWidth={1.5} className={NUC} />
        <circle cx={204} cy={40} r={6} strokeWidth={1} className={HORMONE} />
        <text x={214} y={44} className={MUTED}>hormone</text>
        <polyline points={`204,47 204,70 232,${BIND[1].y - 10}`} strokeWidth={1.25} strokeDasharray="3 2" markerEnd="url(#neet-hormone-arrow)" className="fill-none stroke-foreground" />
        <Cup x={BIND[1].x} y={BIND[1].y + 6} />
        <circle cx={BIND[1].x} cy={BIND[1].y} r={6} strokeWidth={1} className={HORMONE} />
        <text x={240} y={126} textAnchor="middle" className={TB}>hormone-receptor</text>
        <text x={240} y={138} textAnchor="middle" className={TB}>complex</text>
        <line x1={240} y1={143} x2={240} y2={155} strokeWidth={1.25} markerEnd="url(#neet-hormone-arrow)" className="stroke-foreground" />
        <text x={240} y={168} textAnchor="middle" className={T}>acts on the genome:</text>
        <text x={240} y={180} textAnchor="middle" className={T}>gene expression</text>
        <text x={240} y={194} textAnchor="middle" className={MUTED}>nucleus</text>
        <text x={240} y={224} textAnchor="middle" className={TB}>{b.receptor}</text>
      </svg>
    </div>
  );
}
