/**
 * Static: the PMF of B(10, 0.4) with the mean np = 4 marked as a vertical
 * line and the ±σ spread (σ = √(npq) = √2.4 ≈ 1.55) shown as a shaded band.
 * Pedagogical aim: the mean np is the centre of mass of the distribution
 * and the standard deviation √(npq) measures how tightly the bars cluster
 * around it — and σ² = npq is always smaller than the mean (since q < 1).
 *
 * Server component (no client interactivity).
 */

const W = 360;
const H = 232;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 24;
const PAD_B = 28;

const N = 10;
const P = 0.4;
const MEAN = N * P; // 4
const SIGMA = Math.sqrt(N * P * (1 - P)); // √2.4 ≈ 1.549

function choose(n: number, k: number): number {
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - i + 1)) / i;
  return c;
}

const BARS = Array.from(
  { length: N + 1 },
  (_, k) => choose(N, k) * Math.pow(P, k) * Math.pow(1 - P, N - k)
);

export default function BinomialMeanSpread() {
  const maxP = Math.max(...BARS);
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const slot = innerW / (N + 1);
  const barW = slot * 0.74;
  const xOf = (k: number) => PAD_L + slot * (k + 0.5);

  const bandX1 = xOf(MEAN - SIGMA);
  const bandX2 = xOf(MEAN + SIGMA);
  const meanX = xOf(MEAN);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · mean np at the centre, spread √(npq)
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Binomial PMF for n equals 10 and p equals 0.4 with mean and standard-deviation band marked"
      >
        {/* ±σ band */}
        <rect x={bandX1} y={PAD_T} width={bandX2 - bandX1} height={H - PAD_B - PAD_T} className="fill-indigo-400/20" />

        <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="currentColor" className="text-muted-foreground/40" />

        {/* bars */}
        {BARS.map((prob, k) => {
          const barH = (prob / maxP) * innerH;
          const x = xOf(k) - barW / 2;
          const y = H - PAD_B - barH;
          return (
            <g key={k}>
              <rect x={x} y={y} width={barW} height={barH} className="fill-indigo-600/80 dark:fill-indigo-400/80" />
              <text x={xOf(k)} y={H - PAD_B + 13} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {k}
              </text>
            </g>
          );
        })}

        {/* mean line */}
        <line x1={meanX} x2={meanX} y1={PAD_T - 6} y2={H - PAD_B} stroke="currentColor" strokeDasharray="4 3" className="text-foreground/80" />
        <text x={meanX} y={PAD_T - 9} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          mean = np = 4
        </text>
        <text x={(bandX1 + bandX2) / 2} y={H - PAD_B - 4} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[9px] font-medium">
          ±σ
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        For B(10, 0.4): mean np = 4 (the dashed centre), variance npq = 2.4, so
        σ = √2.4 ≈ 1.55 (the shaded band). Notice σ² = 2.4 is less than the mean
        4 — the variance npq is always below the mean np because q &lt; 1, a
        quick sanity check on any answer.
      </p>
    </div>
  );
}
