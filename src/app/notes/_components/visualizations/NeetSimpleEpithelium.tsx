/**
 * Static figure: the simple epithelia side by side, in the words of the NEET
 * concept "Epithelial tissue and glands" (nzoso-epithelium).
 *
 * - Squamous: flattened cells; walls of blood vessels and air sacs of lungs;
 *   a diffusion boundary.
 * - Cuboidal: cube-like cells; ducts of glands and tubular parts of nephrons;
 *   secretion and absorption.
 * - Columnar: tall, slender cells with their nuclei at the base; lines the
 *   stomach and intestine; secretion and absorption.
 * - Ciliated: columnar (or cuboidal) cells with cilia on the free surface;
 *   bronchioles and Fallopian tubes; moves particles or mucus in one direction.
 *
 * Each is one layer of cells (simple epithelium). Data exported and pinned by
 * tests/notes-w2-07.test.ts. Server component.
 */

export type Epithelium = {
  name: "Squamous" | "Cuboidal" | "Columnar" | "Ciliated";
  shape: string;
  where: readonly string[];
  job: string;
  cells: number;
  cellW: number;
  cellH: number;
  /** Nucleus centre, measured up from the base of the cell. */
  nucleusUp: number;
  cilia: boolean;
};

export const EPITHELIA: readonly Epithelium[] = [
  {
    name: "Squamous",
    shape: "flattened cells",
    where: ["walls of blood vessels,", "air sacs of lungs"],
    job: "diffusion boundary",
    cells: 4,
    cellW: 32,
    cellH: 9,
    nucleusUp: 4.5,
    cilia: false,
  },
  {
    name: "Cuboidal",
    shape: "cube-like cells",
    where: ["ducts of glands,", "tubular parts of nephrons"],
    job: "secretion, absorption",
    cells: 4,
    cellW: 30,
    cellH: 30,
    nucleusUp: 15,
    cilia: false,
  },
  {
    name: "Columnar",
    shape: "tall, nuclei at the base",
    where: ["lines the stomach", "and intestine"],
    job: "secretion, absorption",
    cells: 5,
    cellW: 22,
    cellH: 44,
    nucleusUp: 9,
    cilia: false,
  },
  {
    name: "Ciliated",
    shape: "cilia on the free surface",
    where: ["bronchioles,", "Fallopian tubes"],
    job: "move mucus in one direction",
    cells: 5,
    cellW: 22,
    cellH: 38,
    nucleusUp: 9,
    cilia: true,
  },
];

export const PANEL_W = 154;
export const PANEL_H = 122;
export const CILIA_PER_CELL = 4;
export const CILIUM_LEN = 6;
const BASE = 76;

export function panelOrigin(i: number): { x: number; y: number } {
  return { x: 4 + (i % 2) * (PANEL_W + 4), y: Math.floor(i / 2) * PANEL_H };
}

const CELL = "fill-pink-100 stroke-pink-700 dark:fill-pink-950/50 dark:stroke-pink-300";
const NUCLEUS = "fill-violet-500 dark:fill-violet-400";

function Cells({ e, x0, y0 }: { e: Epithelium; x0: number; y0: number }) {
  const total = e.cells * e.cellW;
  const left = x0 + (PANEL_W - total) / 2;
  const top = y0 + BASE - e.cellH;
  return (
    <g>
      {Array.from({ length: e.cells }, (_, k) => {
        const x = left + k * e.cellW;
        const ny = y0 + BASE - e.nucleusUp;
        return (
          <g key={k}>
            <rect x={x} y={top} width={e.cellW} height={e.cellH} strokeWidth={1} className={CELL} />
            {e.name === "Squamous" ? (
              <ellipse cx={x + e.cellW / 2} cy={ny} rx={6} ry={2.2} className={NUCLEUS} />
            ) : e.name === "Cuboidal" ? (
              <circle cx={x + e.cellW / 2} cy={ny} r={5} className={NUCLEUS} />
            ) : (
              <ellipse cx={x + e.cellW / 2} cy={ny} rx={4} ry={5} className={NUCLEUS} />
            )}
            {e.cilia &&
              Array.from({ length: CILIA_PER_CELL }, (_, c) => {
                const cx = x + ((c + 0.5) * e.cellW) / CILIA_PER_CELL;
                return <line key={c} x1={cx} y1={top} x2={cx + 1.5} y2={top - CILIUM_LEN} strokeWidth={1} className="stroke-pink-700 dark:stroke-pink-300" />;
              })}
          </g>
        );
      })}
    </g>
  );
}

export default function NeetSimpleEpithelium() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · simple epithelium, one layer of cells
      </p>
      <svg
        viewBox={`0 0 320 ${PANEL_H * 2}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Four kinds of simple epithelium, each a single layer of cells. Squamous: flattened cells, in the walls of blood vessels and air sacs of lungs, a diffusion boundary. Cuboidal: cube-like cells, in ducts of glands and tubular parts of nephrons, for secretion and absorption. Columnar: tall cells with nuclei at the base, lining the stomach and intestine. Ciliated: cells with cilia on the free surface, in bronchioles and Fallopian tubes, moving mucus in one direction."
      >
        {EPITHELIA.map((e, i) => {
          const o = panelOrigin(i);
          const cx = o.x + PANEL_W / 2;
          return (
            <g key={e.name}>
              <text x={cx} y={o.y + 13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {e.name}
              </text>
              <text x={cx} y={o.y + 25} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {e.shape}
              </text>
              <Cells e={e} x0={o.x} y0={o.y} />
              {e.where.map((w, k) => (
                <text key={w} x={cx} y={o.y + 90 + k * 12} textAnchor="middle" className="fill-foreground text-[10px]">
                  {w}
                </text>
              ))}
              <text x={cx} y={o.y + 114} textAnchor="middle" className="fill-emerald-800 text-[10px] dark:fill-emerald-200">
                {e.job}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
