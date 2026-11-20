/**
 * Static figure: the four kinds of chromosome by the position of the
 * centromere, in the words of the NEET concept "Chromosome types by the
 * position of the centromere" (nboce-chromosomes).
 *
 * Each chromosome is two chromatids held together at the centromere (the
 * primary constriction), with a kinetochore disc on each side of it.
 * Metacentric: in the middle, two equal arms. Sub-metacentric: slightly away
 * from the middle, one shorter and one longer arm. Acrocentric: close to one
 * end, one extremely short arm. Telocentric: at the end (terminal).
 *
 * The data are exported and pinned by tests/notes-w2-17.test.ts.
 * Server component, no client state.
 */

export type Chromosome = {
  name: "Metacentric" | "Sub-metacentric" | "Acrocentric" | "Telocentric";
  /** The name as drawn, on one or two lines. */
  drawn: readonly string[];
  /** Where the centromere sits, in the concept's words (two short lines). */
  position: readonly [string, string];
  /** Share of the length above the centromere (0.5 = the middle, 0 = the tip). */
  f: number;
  x: number;
};

export const CHROMOSOMES: readonly Chromosome[] = [
  { name: "Metacentric", drawn: ["Metacentric"], position: ["in the", "middle"], f: 0.5, x: 80 },
  { name: "Sub-metacentric", drawn: ["Sub-", "metacentric"], position: ["slightly away", "from the middle"], f: 0.3, x: 151 },
  { name: "Acrocentric", drawn: ["Acrocentric"], position: ["close to", "one end"], f: 0.1, x: 221 },
  { name: "Telocentric", drawn: ["Telocentric"], position: ["at the end", "(terminal)"], f: 0, x: 290 },
];

export const TOP = 40;
export const LENGTH = 150;

/** Where the centromere lies on a chromosome. */
export function centromereY(c: Chromosome): number {
  return TOP + c.f * LENGTH;
}

/** The two arm lengths (shorter first), in drawing units. */
export function arms(c: Chromosome): { short: number; long: number } {
  const a = c.f * LENGTH;
  const b = LENGTH - a;
  return { short: Math.min(a, b), long: Math.max(a, b) };
}

const NECK = 3;
const ARM = "fill-sky-300 stroke-sky-700 dark:fill-sky-800 dark:stroke-sky-300";
const CENTRO = "fill-indigo-700 dark:fill-indigo-300";
const KINETO = "fill-amber-500 stroke-amber-800 dark:fill-amber-400 dark:stroke-amber-200";

function ChromosomeShape({ c }: { c: Chromosome }) {
  const cy = centromereY(c);
  const top = cy - NECK - TOP;
  const bottomStart = cy + NECK;
  const bottom = TOP + LENGTH - bottomStart;
  return (
    <g>
      {[-9, 1].map((dx) => (
        <g key={dx}>
          {top > 0 && <rect x={c.x + dx} y={TOP} width={8} height={top} rx={4} strokeWidth={1.2} className={ARM} />}
          <rect x={c.x + dx} y={bottomStart} width={8} height={bottom} rx={4} strokeWidth={1.2} className={ARM} />
        </g>
      ))}
      <rect x={c.x - 6} y={cy - NECK} width={12} height={NECK * 2} rx={2} className={CENTRO} />
      <circle cx={c.x - 11} cy={cy} r={2.5} strokeWidth={0.8} className={KINETO} />
      <circle cx={c.x + 11} cy={cy} r={2.5} strokeWidth={0.8} className={KINETO} />
      {c.drawn.map((line, k) => (
        <text key={line} x={c.x} y={208 + k * 11} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          {line}
        </text>
      ))}
      <text x={c.x} y={235} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {c.position[0]}
      </text>
      <text x={c.x} y={246} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {c.position[1]}
      </text>
    </g>
  );
}

export default function NeetCentromereTypes() {
  const meta = CHROMOSOMES[0];
  const mc = centromereY(meta);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · chromosomes by the position of the centromere
      </p>
      <svg
        viewBox="0 0 320 252"
        className="block h-auto w-full"
        role="img"
        aria-label="Four chromosomes, each two chromatids joined at the centromere with a kinetochore on each side. Metacentric: centromere in the middle, two equal arms. Sub-metacentric: slightly away from the middle. Acrocentric: close to one end, one arm extremely short. Telocentric: centromere at the very end."
      >
        <text x={160} y={20} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          centromere moves from the middle to the tip
        </text>
        {CHROMOSOMES.map((c) => (
          <ChromosomeShape key={c.name} c={c} />
        ))}

        {/* Part names, once, on the metacentric chromosome. */}
        <text x={2} y={100} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          centromere
        </text>
        <line x1={62} y1={100} x2={meta.x - 6} y2={mc - 1} strokeWidth={1} className="stroke-muted-foreground" />
        <text x={2} y={136} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          kinetochore
        </text>
        <line x1={50} y1={128} x2={meta.x - 13} y2={mc + 1} strokeWidth={1} className="stroke-muted-foreground" />
        <text x={2} y={168} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          chromatid
        </text>
        <line x1={56} y1={165} x2={meta.x - 9} y2={165} strokeWidth={1} className="stroke-muted-foreground" />
      </svg>
    </div>
  );
}
