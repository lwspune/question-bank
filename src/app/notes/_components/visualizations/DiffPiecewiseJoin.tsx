/**
 * Two pieces meeting at a join: on the left a smooth match (equal one-sided
 * slopes → differentiable), on the right a corner (slopes disagree → not
 * differentiable). Side-by-side static SVG.
 */
export default function DiffPiecewiseJoin() {
  const panelW = 160;
  const H = 190;
  const oy = 120;
  const u = 26;

  // LEFT panel — smooth join: y = x^2/2 for x<=0, y = x for x>0 ... use a
  // curve then its tangent line continuing (equal slope at 0 → smooth)
  const jx = panelW / 2;
  const smoothA: string[] = []; // parabola y=0.5x^2 on x in [-2,0]
  for (let i = 0; i <= 24; i++) {
    const x = -2 + (2 * i) / 24;
    smoothA.push(`${jx + x * u},${oy - 0.5 * x * x * u}`);
  }
  // at x=0 slope is 0; continue with a flat-ish line slope 0 → smooth match
  const smoothB = `${jx},${oy} ${jx + 2 * u},${oy}`;

  // RIGHT panel — corner: y=-x for x<0 (slope -1), y=0.5x for x>0 (slope +0.5)
  const cornerA = `${jx - 2 * u},${oy - 2 * u} ${jx},${oy}`;
  const cornerB = `${jx},${oy} ${jx + 2 * u},${oy - 1 * u}`;

  const Axes = () => (
    <>
      <line x1={14} y1={oy} x2={panelW - 14} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
      <line x1={jx} y1={18} x2={jx} y2={H - 22} className="stroke-slate-400" strokeWidth="0.8" />
    </>
  );

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${panelW * 2} ${H}`}
        className="w-full"
        role="img"
        aria-label="Left: two pieces meeting with equal slopes, a smooth join that is differentiable. Right: two pieces meeting at a corner with different slopes, not differentiable."
      >
        <g>
          <Axes />
          <polyline points={smoothA.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <polyline points={smoothB} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <circle cx={jx} cy={oy} r={3} className="fill-emerald-500" />
          <text x={panelW / 2} y={16} className="fill-emerald-700 dark:fill-emerald-300" fontSize="10.5" fontWeight="600" textAnchor="middle">LHD = RHD</text>
          <text x={panelW / 2} y={H - 6} className="fill-slate-500" fontSize="9" textAnchor="middle">smooth join → differentiable</text>
        </g>
        <g transform={`translate(${panelW},0)`}>
          <Axes />
          <polyline points={cornerA} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <polyline points={cornerB} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <circle cx={jx} cy={oy} r={3} className="fill-rose-500" />
          <text x={panelW / 2} y={16} className="fill-rose-600 dark:fill-rose-300" fontSize="10.5" fontWeight="600" textAnchor="middle">LHD ≠ RHD</text>
          <text x={panelW / 2} y={H - 6} className="fill-slate-500" fontSize="9" textAnchor="middle">corner → not differentiable</text>
        </g>
      </svg>
    </div>
  );
}
