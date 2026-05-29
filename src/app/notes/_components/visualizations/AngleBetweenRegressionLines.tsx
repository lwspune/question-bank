/**
 * Static figure: the angle between the two regression lines at (x̄, ȳ), with
 * the link to r — lines merge (θ → 0) as r → ±1, splay wide as r → 0.
 *
 * Equal-aspect mapping (shared unit on both axes) so the drawn angle matches
 * the formula. Server component — no client state.
 */

const W = 320;
const H = 320;
const PAD = 28;
const DOM = 10;
const UNIT = (W - 2 * PAD) / DOM;
const sx = (x: number) => PAD + x * UNIT;
const sy = (y: number) => H - PAD - y * UNIT;

const M: [number, number] = [sx(5), sy(5)];
// screen angles of the two line directions (m = 0.5 and 1.6) at equal aspect
const a1 = Math.atan2(-0.5, 1);
const a2 = Math.atan2(-1.6, 1);
const R0 = 40;
const ARC = Array.from({ length: 12 }, (_, i) => {
  const a = a1 + ((a2 - a1) * i) / 11;
  return [M[0] + R0 * Math.cos(a), M[1] + R0 * Math.sin(a)] as const;
});
const arcPath = ARC.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
const amid = (a1 + a2) / 2;
const TH: [number, number] = [M[0] + (R0 + 16) * Math.cos(amid), M[1] + (R0 + 16) * Math.sin(amid)];

export default function AngleBetweenRegressionLines() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · angle between the regression lines
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="The angle between the two regression lines at the mean point">
        <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PAD} y1={8} x2={PAD} y2={H - PAD} stroke="currentColor" className="text-muted-foreground/40" />

        <line x1={sx(0)} y1={sy(2.5)} x2={sx(10)} y2={sy(7.5)} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
        <line x1={sx(1.875)} y1={sy(0)} x2={sx(8.125)} y2={sy(10)} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2} />

        <path d={arcPath} fill="none" stroke="currentColor" className="text-foreground/70" strokeWidth={1.5} />
        <text x={TH[0]} y={TH[1]} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">θ ≈ 31°</text>

        <circle cx={M[0]} cy={M[1]} r={4} className="fill-foreground" />
        <text x={M[0] + 6} y={M[1] + 16} className="fill-foreground text-[9px]">(x̄, ȳ)</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The lines meet at (x̄, ȳ) at angle θ, where tan θ = |(m₂ − m₁) / (1 + m₁m₂)|. As correlation strengthens
        (r → ±1) the two lines rotate together and θ → 0 — they coincide at perfect correlation. As r → 0 they
        splay apart, signalling no linear relationship.
      </p>
    </div>
  );
}
