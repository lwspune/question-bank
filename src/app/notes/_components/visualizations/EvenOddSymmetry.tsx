/**
 * Side-by-side contrast of even symmetry (mirror across the y-axis, e.g. x²)
 * and odd symmetry (half-turn about the origin, e.g. x³). Static SVG.
 */
export default function EvenOddSymmetry() {
  const panelW = 160;
  const H = 200;
  const oy = 110;
  const u = 26;

  // even: y = x^2 (scaled), x in [-2,2]
  const evenPts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -2 + (4 * i) / 40;
    const y = x * x * 0.5;
    evenPts.push(`${panelW / 2 + x * u},${oy - y * u}`);
  }
  // odd: y = x^3 / 3, x in [-1.7,1.7]
  const oddPts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -1.7 + (3.4 * i) / 40;
    const y = (x * x * x) / 3;
    oddPts.push(`${panelW / 2 + x * u},${oy - y * u}`);
  }

  const Axes = ({ dx }: { dx: number }) => (
    <>
      <line x1={dx + 14} y1={oy} x2={dx + panelW - 14} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
      <line x1={dx + panelW / 2} y1={20} x2={dx + panelW / 2} y2={H - 24} className="stroke-slate-400" strokeWidth="0.8" />
    </>
  );

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${panelW * 2} ${H}`} className="w-full" role="img" aria-label="Left: even function x squared, symmetric about the y-axis. Right: odd function x cubed, symmetric about the origin.">
        {/* even panel */}
        <g>
          <Axes dx={0} />
          <polyline points={evenPts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <text x={panelW / 2} y={18} className="fill-indigo-900 dark:fill-indigo-100" fontSize="11" fontWeight="600" textAnchor="middle">Even: f(−x)=f(x)</text>
          <text x={panelW / 2} y={H - 6} className="fill-indigo-700 dark:fill-indigo-300" fontSize="9.5" textAnchor="middle">mirror across y-axis</text>
        </g>
        {/* odd panel */}
        <g transform={`translate(${panelW},0)`}>
          <Axes dx={0} />
          <polyline points={oddPts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <circle cx={panelW / 2} cy={oy} r={2.5} className="fill-rose-500" />
          <text x={panelW / 2} y={18} className="fill-indigo-900 dark:fill-indigo-100" fontSize="11" fontWeight="600" textAnchor="middle">Odd: f(−x)=−f(x)</text>
          <text x={panelW / 2} y={H - 6} className="fill-indigo-700 dark:fill-indigo-300" fontSize="9.5" textAnchor="middle">half-turn about origin</text>
        </g>
      </svg>
    </div>
  );
}
