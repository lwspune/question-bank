"use client";

import { useMemo, useState } from "react";

/**
 * Interactive: the probability mass function of B(n, p) drawn as a bar
 * chart, with button groups for n and p. The bars P(X = k) redraw live and
 * a dashed line marks the mean np. Pedagogical aim: a binomial distribution
 * is a SHAPE — symmetric at p = 0.5, skewed when p is small or large, and
 * always centred on its mean np.
 */

const N_OPTIONS = [4, 8, 12, 20] as const;
const P_OPTIONS = [0.2, 0.5, 0.8] as const;

const W = 360;
const H = 240;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 30;

/** nCk via a multiplicative loop — exact and overflow-safe for n ≤ 20. */
function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - i + 1)) / i;
  return c;
}

function pmf(n: number, p: number): number[] {
  const out: number[] = [];
  for (let k = 0; k <= n; k++) {
    out.push(choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
  }
  return out;
}

export default function BinomialPmfInteractive() {
  const [n, setN] = useState<number>(8);
  const [p, setP] = useState<number>(0.5);

  const bars = useMemo(() => pmf(n, p), [n, p]);
  const maxP = Math.max(...bars, 1e-6);
  const mean = n * p;

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const slot = innerW / (n + 1);
  const barW = Math.max(2, slot * 0.74);

  const xOf = (k: number) => PAD_L + slot * (k + 0.5);
  const showLabel = (k: number) => n <= 12 || k % 5 === 0 || k === n;

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · change n and p, watch the distribution reshape
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Binomial probability mass function bar chart with adjustable n and p"
      >
        {/* axes */}
        <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />

        {/* mean line */}
        {(() => {
          const mx = xOf(mean);
          return (
            <g>
              <line
                x1={mx}
                x2={mx}
                y1={PAD_T - 2}
                y2={H - PAD_B}
                stroke="currentColor"
                strokeDasharray="4 3"
                className="text-foreground/70"
              />
              <text x={mx} y={PAD_T - 5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                mean = {Number(mean.toFixed(1))}
              </text>
            </g>
          );
        })()}

        {/* bars */}
        {bars.map((prob, k) => {
          const barH = (prob / maxP) * innerH;
          const x = xOf(k) - barW / 2;
          const y = H - PAD_B - barH;
          return (
            <g key={k}>
              <rect x={x} y={y} width={barW} height={barH} className="fill-indigo-600/80 dark:fill-indigo-400/80" />
              {showLabel(k) && (
                <text x={xOf(k)} y={H - PAD_B + 14} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  {k}
                </text>
              )}
            </g>
          );
        })}

        <text x={PAD_L - 4} y={PAD_T + 6} textAnchor="end" className="fill-muted-foreground text-[9px]">
          P
        </text>
        <text x={(PAD_L + W - PAD_R) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          number of successes k
        </text>
      </svg>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 font-medium text-foreground">trials n:</span>
          {N_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setN(v)}
              aria-pressed={n === v}
              className={
                "rounded-md px-2.5 py-1 font-medium tabular-nums transition-colors " +
                (n === v
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "border border-input bg-background text-foreground hover:bg-accent")
              }
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 font-medium text-foreground">p:</span>
          {P_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setP(v)}
              aria-pressed={p === v}
              className={
                "rounded-md px-2.5 py-1 font-medium tabular-nums transition-colors " +
                (p === v
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "border border-input bg-background text-foreground hover:bg-accent")
              }
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        At p = 0.5 the bars are symmetric about the centre. Push p to 0.2 and the
        peak slides left (few successes likely); push it to 0.8 and it slides
        right. The dashed line always sits at the mean np — raising n stretches
        the distribution and moves that centre.
      </p>
    </div>
  );
}
