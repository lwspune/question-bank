/**
 * Static: a 3-trial success/failure tree (n = 3). Every path from the root
 * to a leaf is one outcome sequence; the three leaves with exactly two
 * successes (SSF, SFS, FSS) are highlighted. Pedagogical aim: each such
 * path carries probability p²q, and there are C(3, 2) = 3 of them — which
 * is exactly the C(n, k) coefficient in the binomial formula.
 *
 * Server component (no client interactivity).
 */

const W = 360;
const H = 268;

const LEAF_Y = [20, 52, 84, 116, 148, 180, 212, 244];
const T2_Y = [36, 100, 164, 228];
const T1_Y = [68, 196];
const ROOT_Y = 132;
const X_ROOT = 12;
const X_T1 = 80;
const X_T2 = 172;
const X_LEAF = 264;

const SEQS = ["SSS", "SSF", "SFS", "SFF", "FSS", "FSF", "FFS", "FFF"];
// indices with exactly two S's
const HILITE = new Set([1, 2, 4]);

type Pt = [number, number];

const EDGES: [Pt, Pt][] = [
  // root → trial 1
  [[X_ROOT, ROOT_Y], [X_T1, T1_Y[0]]],
  [[X_ROOT, ROOT_Y], [X_T1, T1_Y[1]]],
  // trial 1 → trial 2
  [[X_T1, T1_Y[0]], [X_T2, T2_Y[0]]],
  [[X_T1, T1_Y[0]], [X_T2, T2_Y[1]]],
  [[X_T1, T1_Y[1]], [X_T2, T2_Y[2]]],
  [[X_T1, T1_Y[1]], [X_T2, T2_Y[3]]],
  // trial 2 → leaves
  [[X_T2, T2_Y[0]], [X_LEAF, LEAF_Y[0]]],
  [[X_T2, T2_Y[0]], [X_LEAF, LEAF_Y[1]]],
  [[X_T2, T2_Y[1]], [X_LEAF, LEAF_Y[2]]],
  [[X_T2, T2_Y[1]], [X_LEAF, LEAF_Y[3]]],
  [[X_T2, T2_Y[2]], [X_LEAF, LEAF_Y[4]]],
  [[X_T2, T2_Y[2]], [X_LEAF, LEAF_Y[5]]],
  [[X_T2, T2_Y[3]], [X_LEAF, LEAF_Y[6]]],
  [[X_T2, T2_Y[3]], [X_LEAF, LEAF_Y[7]]],
];

export default function BinomialCoefficientTree() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · why the coefficient is C(n, k)
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Three-trial success-failure tree with the three two-success paths highlighted"
      >
        {EDGES.map((e, i) => (
          <line
            key={i}
            x1={e[0][0]}
            y1={e[0][1]}
            x2={e[1][0]}
            y2={e[1][1]}
            stroke="currentColor"
            className="text-muted-foreground/30"
            strokeWidth={1.25}
          />
        ))}

        {/* trial column headers */}
        <text x={X_T1} y={12} textAnchor="middle" className="fill-muted-foreground text-[9px]">trial 1</text>
        <text x={X_T2} y={12} textAnchor="middle" className="fill-muted-foreground text-[9px]">trial 2</text>
        <text x={X_LEAF + 4} y={12} textAnchor="start" className="fill-muted-foreground text-[9px]">trial 3</text>

        {/* nodes */}
        <circle cx={X_ROOT} cy={ROOT_Y} r={3.5} className="fill-foreground" />
        {T1_Y.map((y, i) => (
          <circle key={`t1-${i}`} cx={X_T1} cy={y} r={3} className="fill-muted-foreground/70" />
        ))}
        {T2_Y.map((y, i) => (
          <circle key={`t2-${i}`} cx={X_T2} cy={y} r={3} className="fill-muted-foreground/70" />
        ))}

        {/* leaves */}
        {LEAF_Y.map((y, i) => {
          const on = HILITE.has(i);
          return (
            <g key={`leaf-${i}`}>
              <circle
                cx={X_LEAF}
                cy={y}
                r={on ? 4 : 3}
                className={on ? "fill-indigo-600 dark:fill-indigo-400" : "fill-muted-foreground/40"}
              />
              <text
                x={X_LEAF + 10}
                y={y + 3}
                textAnchor="start"
                className={
                  on
                    ? "fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold"
                    : "fill-muted-foreground text-[10px]"
                }
              >
                {SEQS[i]}
                {on ? "  →  p²q" : ""}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Each leaf is one ordered outcome of 3 trials; with success probability
        p and failure q, a path with 2 successes and 1 failure has probability
        p²q regardless of the order. Exactly 3 of the 8 paths have 2 successes
        — that count is C(3, 2) = 3, so P(X = 2) = C(3, 2)·p²q. In general the
        number of length-n paths with k successes is C(n, k).
      </p>
    </div>
  );
}
