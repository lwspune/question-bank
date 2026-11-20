/**
 * Static figure: walking along an inequality chain and reading the signs on
 * the way (concept sscrinch-read). Top: the worked example A > B ≥ C = D > E,
 * where the walk from A to E reads >, ≥, =, >: one way, with a strict sign,
 * so A > E. Bottom: the self-check P ≤ Q < R > S, where P to R reads ≤, <
 * (so P < R) but Q to S reads <, > and turns round: no relation.
 * Server component. Pinned by tests/notes-w2-08.test.ts.
 */

export type Sign = ">" | "≥" | "=" | "≤" | "<";

/**
 * The relation between the two ends of a stretch of chain, from the signs on
 * the way; null when the signs point both ways (nothing definite).
 */
export function relate(signs: readonly Sign[]): Sign | null {
  const greater = signs.some((s) => s === ">" || s === "≥");
  const less = signs.some((s) => s === "<" || s === "≤");
  if (greater && less) return null;
  const strict = signs.some((s) => s === ">" || s === "<");
  if (greater) return strict ? ">" : "≥";
  if (less) return strict ? "<" : "≤";
  return "=";
}

/** A chain: letters with the signs between them. */
export type Chain = { letters: readonly string[]; signs: readonly Sign[] };

export const TOP: Chain = { letters: ["A", "B", "C", "D", "E"], signs: [">", "≥", "=", ">"] };
export const BOTTOM: Chain = { letters: ["P", "Q", "R", "S"], signs: ["≤", "<", ">"] };

/** The signs between two letters of a chain. */
export function stretch(chain: Chain, from: string, to: string): Sign[] {
  const i = chain.letters.indexOf(from);
  const j = chain.letters.indexOf(to);
  return chain.signs.slice(Math.min(i, j), Math.max(i, j)) as Sign[];
}

// Geometry (viewBox units).
const DX = 60;
const TOP_Y = 38;
const BOTTOM_Y = 132;

function ChainRow({ chain, x0, y }: { chain: Chain; x0: number; y: number }) {
  return (
    <g>
      {chain.letters.map((l, i) => (
        <g key={l}>
          <circle cx={x0 + DX * i} cy={y - 4} r={11} className="fill-background stroke-foreground" />
          <text x={x0 + DX * i} y={y} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {l}
          </text>
        </g>
      ))}
      {chain.signs.map((s, i) => (
        <text key={i} x={x0 + DX * (i + 0.5)} y={y} textAnchor="middle" className="fill-foreground text-[13px] font-bold">
          {s}
        </text>
      ))}
    </g>
  );
}

/** A walk drawn as a bracket under (or over) the chain, ending in an arrow. */
function Walk({ x1, x2, y, up, tone }: { x1: number; x2: number; y: number; up?: boolean; tone: string }) {
  const d = up ? -8 : 8;
  return (
    <g className={tone} fill="none" strokeWidth={1.5}>
      <path d={`M ${x1} ${y} L ${x1} ${y + d} L ${x2} ${y + d} L ${x2} ${y + d / 2}`} />
      <polygon points={`${x2},${y} ${x2 - 4},${y + d / 2} ${x2 + 4},${y + d / 2}`} className="stroke-none" fill="currentColor" />
    </g>
  );
}

export default function SscInequalityChain() {
  const tx = (i: number) => 40 + DX * i;
  const bx = (i: number) => 70 + DX * i;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · walk from one letter to the other
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="Two inequality chains. Top: A greater than B, B at least C, C equal to D, D greater than E. Walking from A to E the signs are greater, at least, equal, greater: all point one way and one is strict, so A is greater than E. Bottom: P at most Q, Q less than R, R greater than S. Walking from P to R the signs are at most and less than, one way, so P is less than R. Walking from Q to S the signs are less than, then greater than: they turn round, so nothing definite can be said about Q and S."
      >
        <ChainRow chain={TOP} x0={40} y={TOP_Y} />
        <Walk x1={tx(0)} x2={tx(4)} y={TOP_Y + 12} tone="text-emerald-600 stroke-emerald-600 dark:text-emerald-400 dark:stroke-emerald-400" />
        <text x={160} y={TOP_Y + 38} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          A to E: &gt; ≥ = &gt;, one way, so A {relate(stretch(TOP, "A", "E"))} E
        </text>

        <Walk x1={bx(0)} x2={bx(2)} y={BOTTOM_Y - 18} up tone="text-emerald-600 stroke-emerald-600 dark:text-emerald-400 dark:stroke-emerald-400" />
        <text x={bx(1)} y={BOTTOM_Y - 32} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          P to R: ≤ &lt;, one way, so P {relate(stretch(BOTTOM, "P", "R"))} R
        </text>
        <ChainRow chain={BOTTOM} x0={70} y={BOTTOM_Y} />
        <Walk x1={bx(1)} x2={bx(3)} y={BOTTOM_Y + 12} tone="text-rose-600 stroke-rose-600 dark:text-rose-400 dark:stroke-rose-400" />
        <text x={160} y={BOTTOM_Y + 38} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          Q to S: &lt; then &gt;, turns round: no relation
        </text>
        <text x={160} y={190} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          An = sign never changes the direction.
        </text>
      </svg>
    </div>
  );
}
