/**
 * Static: the PMF of B(8, 0.5) with the upper tail k ≥ 6 shaded. The "at
 * least 6" probability is the SUM of the shaded bars. Pedagogical aim: a
 * cumulative ("at least k" / "at most k") probability is a sum of bars —
 * use the complement only when the unshaded side has fewer terms.
 *
 * Server component (no client interactivity).
 */

const W = 360;
const H = 230;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 28;

const N = 8;
const TAIL_FROM = 6; // shade k >= 6

function choose(n: number, k: number): number {
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - i + 1)) / i;
  return c;
}

const COUNTS = Array.from({ length: N + 1 }, (_, k) => choose(N, k)); // C(8,k), total 256
const TOTAL = 256;

export default function BinomialTailShading() {
  const maxC = Math.max(...COUNTS);
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const slot = innerW / (N + 1);
  const barW = slot * 0.74;
  const xOf = (k: number) => PAD_L + slot * (k + 0.5);

  const tailSum = COUNTS.slice(TAIL_FROM).reduce((a, b) => a + b, 0); // 37

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · &quot;at least 6 heads&quot; is the shaded tail
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Binomial PMF for 8 fair coins with the k greater-or-equal 6 tail shaded"
      >
        <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />

        {COUNTS.map((c, k) => {
          const barH = (c / maxC) * innerH;
          const x = xOf(k) - barW / 2;
          const y = H - PAD_B - barH;
          const inTail = k >= TAIL_FROM;
          return (
            <g key={k}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                className={inTail ? "fill-indigo-600/80 dark:fill-indigo-400/80" : "fill-muted-foreground/25"}
              />
              <text x={xOf(k)} y={H - PAD_B + 13} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {k}
              </text>
              {inTail && (
                <text x={xOf(k)} y={y - 3} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[8px] font-medium">
                  {c}
                </text>
              )}
            </g>
          );
        })}

        <text x={(PAD_L + W - PAD_R) / 2} y={H - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          number of heads k
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Counts are C(8, k), each over a total of 2⁸ = {TOTAL}. The shaded bars
        k = 6, 7, 8 give P(X ≥ 6) = (28 + 8 + 1)/256 = {tailSum}/256. Here the
        complement P(X ≤ 5) has six terms, so summing the three-bar tail
        directly is the shorter route.
      </p>
    </div>
  );
}
