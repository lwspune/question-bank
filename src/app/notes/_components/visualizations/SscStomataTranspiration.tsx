/**
 * Static figure: guard cells opening and closing a stoma, and transpiration
 * pulling water up the stem (concept sscbpbpl-processes).
 *
 * Exactly the concept's water facts: when water flows into the guard cells
 * they swell and the stoma opens; when they lose water it closes. Water vapour
 * lost through the stomata (transpiration) pulls water up the stem by
 * cohesion-tension. The caption carries its two other facts: fastest in dry,
 * windy weather, and wilting only when loss exceeds uptake. Values pinned by
 * tests/notes-ssc-visuals-gk.test.ts. Server component, no client state.
 */

export type StomaState = {
  name: string;
  /** Which way water moves for the guard cells. */
  water: "in" | "out";
  /** How far each guard cell bulges outward (SVG units): swollen cells bulge more. */
  bulge: number;
  /** Half-width of the pore between the cells (SVG units): 0 means shut. */
  gap: number;
  lines: readonly [string, string];
};

export const STOMA_STATES: readonly StomaState[] = [
  { name: "Stoma open", water: "in", bulge: 28, gap: 9, lines: ["water flows in,", "guard cells swell"] },
  { name: "Stoma closed", water: "out", bulge: 18, gap: 0, lines: ["guard cells lose", "water: pore shuts"] },
];

export const TRANSPIRATION = {
  fastestIn: "dry, windy weather",
  liftsSapBy: "cohesion-tension",
  wiltsWhen: "water loss is greater than uptake",
} as const;

const CX = 252;
const CELL_H = 52;
const STOMA_TOP = [36, 150];

function Stoma({ state, top }: { state: StomaState; top: number }) {
  const bot = top + CELL_H;
  const mid = top + CELL_H / 2;
  const cell = (s: number) =>
    `M ${CX} ${top} C ${CX + s * state.bulge} ${top} ${CX + s * state.bulge} ${bot} ${CX} ${bot} ` +
    `C ${CX + s * state.gap} ${bot} ${CX + s * state.gap} ${top} ${CX} ${top} Z`;
  const pore =
    `M ${CX} ${bot} C ${CX - state.gap} ${bot} ${CX - state.gap} ${top} ${CX} ${top} ` +
    `C ${CX + state.gap} ${top} ${CX + state.gap} ${bot} ${CX} ${bot} Z`;
  const inward = state.water === "in";
  return (
    <g>
      <path d={cell(-1)} className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700 dark:stroke-emerald-300" strokeWidth={1.2} />
      <path d={cell(1)} className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700 dark:stroke-emerald-300" strokeWidth={1.2} />
      {state.gap > 0 ? (
        <path d={pore} className="fill-slate-700 dark:fill-slate-900" />
      ) : (
        <line x1={CX} y1={top + 4} x2={CX} y2={bot - 4} className="stroke-slate-700 dark:stroke-slate-300" strokeWidth={1.6} />
      )}
      {[-1, 1].map((s) => {
        const near = CX + s * (state.bulge + 3);
        const far = CX + s * (state.bulge + 20);
        const [from, to] = inward ? [far, near] : [near, far];
        const dir = Math.sign(to - from);
        return (
          <g key={s}>
            <line x1={from} y1={mid} x2={to - dir * 6} y2={mid} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.6} />
            <polygon points={`${to},${mid} ${to - dir * 7},${mid - 3.5} ${to - dir * 7},${mid + 3.5}`} className="fill-sky-600 dark:fill-sky-400" />
          </g>
        );
      })}
      <text x={CX} y={bot + 16} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
        {state.name}
      </text>
      <text x={CX} y={bot + 29} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {state.lines[0]}
      </text>
      <text x={CX} y={bot + 41} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {state.lines[1]}
      </text>
    </g>
  );
}

function Plant() {
  const leaf = "fill-emerald-400 stroke-emerald-700 dark:fill-emerald-600 dark:stroke-emerald-300";
  const root = "stroke-amber-900 dark:stroke-amber-300";
  return (
    <g>
      <rect x={8} y={194} width={168} height={46} className="fill-amber-100 dark:fill-amber-950/40" />
      <line x1={8} y1={194} x2={176} y2={194} className="stroke-amber-700 dark:stroke-amber-500" strokeWidth={1.4} />
      <path d="M 60 196 L 60 230 M 60 206 Q 46 214 34 228 M 60 212 Q 74 220 84 232" fill="none" className={root} strokeWidth={1.4} />
      <text x={92} y={216} className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        roots take
      </text>
      <text x={92} y={228} className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        up water
      </text>

      <line x1={60} y1={70} x2={60} y2={196} className="stroke-emerald-700 dark:stroke-emerald-400" strokeWidth={5} />
      <path d="M 60 124 Q 36 104 12 110 Q 34 130 60 124 Z" className={leaf} strokeWidth={1} />
      <path d="M 60 98 Q 84 76 112 82 Q 88 102 60 98 Z" className={leaf} strokeWidth={1} />
      <path d="M 60 72 Q 50 52 60 36 Q 70 52 60 72 Z" className={leaf} strokeWidth={1} />

      {/* water pulled up the stem */}
      <line x1={70} y1={186} x2={70} y2={110} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={2} />
      <polygon points="70,102 66,111 74,111" className="fill-sky-600 dark:fill-sky-400" />
      <text x={78} y={140} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        water pulled
      </text>
      <text x={78} y={152} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        up the stem
      </text>
      <text x={78} y={164} className="fill-sky-800 text-[10px] dark:fill-sky-300">
        ({TRANSPIRATION.liftsSapBy})
      </text>

      {/* water vapour leaving the leaf */}
      {[92, 104].map((x) => (
        <g key={x}>
          <path d={`M ${x} 78 q 4 -5 0 -10 q -4 -5 0 -10`} fill="none" className="stroke-sky-500 dark:stroke-sky-400" strokeWidth={1.4} strokeDasharray="2 2" />
          <polygon points={`${x},52 ${x - 3},58 ${x + 3},58`} className="fill-sky-500 dark:fill-sky-400" />
        </g>
      ))}
      <text x={80} y={20} className="fill-foreground text-[10px] font-bold">
        Transpiration:
      </text>
      <text x={80} y={32} className="fill-foreground text-[10px]">
        water vapour leaves
      </text>
      <text x={80} y={44} className="fill-foreground text-[10px]">
        through the stomata
      </text>
    </g>
  );
}

export default function SscStomataTranspiration() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · stomata and transpiration
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: a plant. Water vapour leaves the leaves through the stomata, which is transpiration, and this pulls water up the stem by cohesion-tension; the roots take up water from the soil. Right: two guard cells around a stoma. When water flows into the guard cells they swell and the stoma opens. When they lose water the pore shuts and the stoma is closed."
      >
        <Plant />
        <line x1={186} y1={8} x2={186} y2={242} className="stroke-border" strokeWidth={1} />
        {STOMA_STATES.map((s, i) => (
          <Stoma key={s.name} state={s} top={STOMA_TOP[i]} />
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Transpiration is fastest in {TRANSPIRATION.fastestIn}. It wilts a plant only when {TRANSPIRATION.wiltsWhen}, not always.
      </p>
    </div>
  );
}
