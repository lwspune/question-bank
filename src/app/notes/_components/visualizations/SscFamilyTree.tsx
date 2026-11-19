/**
 * Static figure: a family tree drawn level by level (concept
 * sscrbrdr-generations), with the concept's two examples side by side:
 * - "P is the son of Q. Q is the daughter of R." R is two levels above P and
 *   P is male, so P is R's grandson. R's gender is never stated, so R is drawn
 *   with a dashed outline.
 * - "M is the husband of N. K is the daughter of M. L is the son of K." The
 *   couple stands on one level and shares the child K, so N is two levels
 *   above L through L's mother: N is L's maternal grandmother.
 * Signs: a square for male and a circle for female (the chapter's own
 * convention, sscrbrdr family puzzles), a double line for a married couple, a
 * bar with drops for siblings, a vertical line from parent to child.
 * Server component. Pinned by tests/notes-ssc-visuals.test.ts.
 */

export type Gender = "male" | "female" | "unknown";
export type Person = { name: string; level: number; gender: Gender };

/** Levels count down from the top row (0). */
export const LEFT_TREE: readonly Person[] = [
  { name: "R", level: 0, gender: "unknown" },
  { name: "Q", level: 1, gender: "female" },
  { name: "P", level: 2, gender: "male" },
];

export const RIGHT_TREE: readonly Person[] = [
  { name: "M", level: 0, gender: "male" },
  { name: "N", level: 0, gender: "female" },
  { name: "K", level: 1, gender: "female" },
  { name: "L", level: 2, gender: "male" },
];

/**
 * The relation word for a person `up` levels above the other (negative = below)
 * and of the given gender, as the concept lists them.
 */
export function relationWord(up: number, gender: "male" | "female"): string {
  const m = gender === "male";
  if (up === 1) return m ? "father" : "mother";
  if (up === 2) return m ? "grandfather" : "grandmother";
  if (up === 3) return m ? "great-grandfather" : "great-grandmother";
  if (up === -1) return m ? "son" : "daughter";
  if (up === -2) return m ? "grandson" : "granddaughter";
  return "";
}

const find = (tree: readonly Person[], name: string) => tree.find((p) => p.name === name)!;

/** How many levels `a` stands above `b` (negative when below). */
export const levelsAbove = (tree: readonly Person[], a: string, b: string) => find(tree, b).level - find(tree, a).level;

/** Maternal when the line from the grandparent comes down through a mother. */
export const sideThrough = (middle: Person) => (middle.gender === "female" ? "maternal" : "paternal");

// Geometry (viewBox units).
const ROW_Y = [66, 116, 166] as const;
const S = 9; // half the size of a node

const MALE = "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400";
const FEMALE = "fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400";
const LINK = "stroke-foreground";

function Node({ x, y, p }: { x: number; y: number; p: Person }) {
  return (
    <g>
      {p.gender === "female" ? (
        <circle cx={x} cy={y} r={S} strokeWidth={1.5} className={FEMALE} />
      ) : p.gender === "male" ? (
        <rect x={x - S} y={y - S} width={2 * S} height={2 * S} strokeWidth={1.5} className={MALE} />
      ) : (
        <rect x={x - S} y={y - S} width={2 * S} height={2 * S} rx={5} strokeWidth={1.5} strokeDasharray="3 2" className="fill-background stroke-muted-foreground" />
      )}
      <text x={x} y={y + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {p.name}
      </text>
    </g>
  );
}

/** A two-level span arrow beside a tree, with its count. */
function Span({ x, yFrom, yTo }: { x: number; yFrom: number; yTo: number }) {
  const down = yTo > yFrom;
  const tip = down ? yTo - 2 : yTo + 2;
  return (
    <g className="stroke-amber-600 dark:stroke-amber-400">
      <line x1={x} y1={yFrom} x2={x} y2={down ? tip - 5 : tip + 5} strokeWidth={1.5} />
      <polygon
        points={`${x},${tip} ${x - 3.5},${down ? tip - 6 : tip + 6} ${x + 3.5},${down ? tip - 6 : tip + 6}`}
        className="fill-amber-600 stroke-none dark:fill-amber-400"
      />
      <text x={x + 5} y={(yFrom + yTo) / 2 + 3} className="fill-amber-700 stroke-none text-[10px] font-semibold dark:fill-amber-300">
        2 levels
      </text>
    </g>
  );
}

export default function SscFamilyTree() {
  const [r, q, p] = LEFT_TREE;
  const [m, n, k, l] = RIGHT_TREE;
  const lx = 55;
  const mx = 190;
  const nx = 240;
  const kx = (mx + nx) / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one row per generation
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="Two family trees, one generation per row. Left: R on the top row, R's daughter Q one row down, Q's son P two rows down. P is two levels below R and male, so P is R's grandson. Right: M and N, husband and wife, on the top row, joined by a double line; their daughter K one row down; K's son L two rows down. N is two levels above L, female, through L's mother, so N is L's maternal grandmother. A key shows a square for male, a circle for female, a double line for a married couple and a bar with drops for siblings."
      >
        {/* Generation rows */}
        {ROW_Y.map((y, i) => (
          <g key={y}>
            <line x1={0} y1={y} x2={320} y2={y} strokeDasharray="2 4" className="stroke-border" />
            <text x={2} y={y - 3} className="fill-muted-foreground text-[9px]">
              level {i + 1}
            </text>
          </g>
        ))}
        <line x1={140} y1={6} x2={140} y2={204} className="stroke-border" />

        {/* Left: P is the son of Q. Q is the daughter of R. */}
        <text x={70} y={14} textAnchor="middle" className="fill-foreground text-[10px]">
          P is the son of Q.
        </text>
        <text x={70} y={27} textAnchor="middle" className="fill-foreground text-[10px]">
          Q is the daughter of R.
        </text>
        <line x1={lx} y1={ROW_Y[0] + S} x2={lx} y2={ROW_Y[1] - S} strokeWidth={1.5} className={LINK} />
        <line x1={lx} y1={ROW_Y[1] + S} x2={lx} y2={ROW_Y[2] - S} strokeWidth={1.5} className={LINK} />
        <Node x={lx} y={ROW_Y[0]} p={r} />
        <Node x={lx} y={ROW_Y[1]} p={q} />
        <Node x={lx} y={ROW_Y[2]} p={p} />
        <text x={lx - 13} y={ROW_Y[0] + 20} textAnchor="end" className="fill-muted-foreground text-[8.5px]">
          gender
        </text>
        <text x={lx - 13} y={ROW_Y[0] + 30} textAnchor="end" className="fill-muted-foreground text-[8.5px]">
          not given
        </text>
        <Span x={82} yFrom={ROW_Y[0]} yTo={ROW_Y[2]} />
        <text x={70} y={190} textAnchor="middle" className="fill-foreground text-[10px]">
          2 down, male:
        </text>
        <text x={70} y={202} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          P is R&apos;s grandson
        </text>

        {/* Right: M is the husband of N. K is the daughter of M. L is the son of K. */}
        <text x={230} y={14} textAnchor="middle" className="fill-foreground text-[10px]">
          M is the husband of N.
        </text>
        <text x={230} y={27} textAnchor="middle" className="fill-foreground text-[10px]">
          K is the daughter of M.
        </text>
        <text x={230} y={40} textAnchor="middle" className="fill-foreground text-[10px]">
          L is the son of K.
        </text>
        <line x1={mx + S} y1={ROW_Y[0] - 2} x2={nx - S} y2={ROW_Y[0] - 2} strokeWidth={1.5} className={LINK} />
        <line x1={mx + S} y1={ROW_Y[0] + 2} x2={nx - S} y2={ROW_Y[0] + 2} strokeWidth={1.5} className={LINK} />
        <line x1={kx} y1={ROW_Y[0] + 2} x2={kx} y2={ROW_Y[1] - S} strokeWidth={1.5} className={LINK} />
        <line x1={kx} y1={ROW_Y[1] + S} x2={kx} y2={ROW_Y[2] - S} strokeWidth={1.5} className={LINK} />
        <Node x={mx} y={ROW_Y[0]} p={m} />
        <Node x={nx} y={ROW_Y[0]} p={n} />
        <Node x={kx} y={ROW_Y[1]} p={k} />
        <Node x={kx} y={ROW_Y[2]} p={l} />
        <Span x={nx + 22} yFrom={ROW_Y[2]} yTo={ROW_Y[0]} />
        <text x={230} y={190} textAnchor="middle" className="fill-foreground text-[10px]">
          2 up, female, via mother K:
        </text>
        <text x={230} y={202} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          N is L&apos;s maternal grandmother
        </text>

        {/* Key */}
        <line x1={0} y1={218} x2={320} y2={218} className="stroke-border" />
        <rect x={6} y={224} width={12} height={12} strokeWidth={1.5} className={MALE} />
        <text x={22} y={234} className="fill-foreground text-[10px]">
          male
        </text>
        <circle cx={62} cy={230} r={6} strokeWidth={1.5} className={FEMALE} />
        <text x={72} y={234} className="fill-foreground text-[10px]">
          female
        </text>
        <line x1={112} y1={228} x2={130} y2={228} strokeWidth={1.5} className={LINK} />
        <line x1={112} y1={232} x2={130} y2={232} strokeWidth={1.5} className={LINK} />
        <text x={134} y={234} className="fill-foreground text-[10px]">
          married
        </text>
        <line x1={184} y1={226} x2={204} y2={226} strokeWidth={1.5} className={LINK} />
        <line x1={184} y1={226} x2={184} y2={235} strokeWidth={1.5} className={LINK} />
        <line x1={204} y1={226} x2={204} y2={235} strokeWidth={1.5} className={LINK} />
        <text x={208} y={234} className="fill-foreground text-[10px]">
          siblings
        </text>
        <line x1={258} y1={223} x2={258} y2={237} strokeWidth={1.5} className={LINK} />
        <text x={262} y={234} className="fill-foreground text-[10px]">
          parent, child
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Give each person a row. One row up is a father or mother, two rows up a grandfather or grandmother; one row down is a son or
        daughter, two rows down a grandson or granddaughter. A married couple shares one row and the children below it. Count the rows,
        then add the gender of the person asked about.
      </p>
    </div>
  );
}
