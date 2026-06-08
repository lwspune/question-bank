/**
 * Solutions of dy/dt = ky: exponential growth (k > 0, rising) and exponential
 * decay (k < 0, falling toward zero), both starting at y₀. The signature shape
 * of rate-proportional-to-amount problems. Static SVG.
 */
export default function DefeqGrowthDecay() {
  const W = 260;
  const H = 160;
  const x0 = 28;
  const baseY = 130;
  const y0px = baseY - 45; // starting value y0 on the axis
  const growth: string[] = [];
  const decay: string[] = [];
  for (let px = 0; px <= 200; px += 4) {
    const t = px / 55;
    const g = baseY - 45 * Math.exp(0.55 * t);
    const d = baseY - 45 * Math.exp(-0.55 * t);
    if (g > 14) growth.push(`${x0 + px},${g.toFixed(1)}`);
    decay.push(`${x0 + px},${d.toFixed(1)}`);
  }
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Two solution curves of dy by dt equals k y, both starting at y nought: one grows exponentially when k is positive and one decays toward zero when k is negative.">
        <line x1={x0} y1={baseY} x2={240} y2={baseY} className="stroke-slate-400" strokeWidth="1.1" />
        <line x1={x0} y1={baseY + 6} x2={x0} y2={16} className="stroke-slate-400" strokeWidth="1.1" />
        {/* y0 marker */}
        <circle cx={x0} cy={y0px} r={3} className="fill-slate-600 dark:fill-slate-300" />
        <text x={x0 - 6} y={y0px + 3} textAnchor="end" className="fill-slate-500" fontSize="9">y₀</text>
        <polyline points={growth.join(" ")} className="fill-none stroke-rose-500" strokeWidth="2.2" />
        <polyline points={decay.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <text x={150} y={40} className="fill-rose-600 dark:fill-rose-300" fontSize="9">growth (k &gt; 0)</text>
        <text x={150} y={120} className="fill-indigo-700 dark:fill-indigo-200" fontSize="9">decay (k &lt; 0)</text>
        <text x={x0} y={baseY + 14} className="fill-slate-500" fontSize="9">t →</text>
        <text x={W / 2} y={H - 3} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9">dy/dt = k y  →  y = y₀ e^{"{kt}"}</text>
      </svg>
    </div>
  );
}
