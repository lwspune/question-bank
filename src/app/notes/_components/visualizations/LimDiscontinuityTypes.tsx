/**
 * Three flavours of discontinuity, side by side: removable (a hole),
 * jump (two levels), and oscillatory (sin(1/x) near 0). Static SVG.
 */
export default function LimDiscontinuityTypes() {
  const pw = 150;
  const H = 170;
  const oy = 95;
  const u = 26;

  // oscillatory: sin(1/x) for x in a small band right of 0
  const osc: string[] = [];
  for (let i = 1; i <= 90; i++) {
    const x = 0.06 + (1.7 * i) / 90;
    const y = Math.sin(1 / x);
    osc.push(`${pw / 2 + x * u},${oy - y * 26}`);
  }

  const Axes = () => (
    <>
      <line x1={14} y1={oy} x2={pw - 10} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
      <line x1={pw / 2} y1={16} x2={pw / 2} y2={H - 22} className="stroke-slate-400" strokeWidth="0.8" />
    </>
  );

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${pw * 3} ${H}`} className="w-full" role="img" aria-label="Three discontinuities: removable (a single missing point on an otherwise smooth line), jump (the left and right pieces sit at different heights), and oscillatory (sin of one over x oscillates infinitely near zero).">
        {/* removable */}
        <g>
          <Axes />
          <line x1={pw / 2 - 50} y1={oy - 40} x2={pw / 2 + 50} y2={oy + 20} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <circle cx={pw / 2} cy={oy - 10} r={4} className="fill-white stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
          <text x={pw / 2} y={14} className="fill-indigo-900 dark:fill-indigo-100" fontSize="10.5" fontWeight="600" textAnchor="middle">Removable</text>
          <text x={pw / 2} y={H - 6} className="fill-slate-500" fontSize="8.5" textAnchor="middle">limit exists, ≠ f(a)</text>
        </g>
        {/* jump */}
        <g transform={`translate(${pw},0)`}>
          <Axes />
          <line x1={pw / 2 - 50} y1={oy + 18} x2={pw / 2} y2={oy + 18} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <line x1={pw / 2} y1={oy - 24} x2={pw / 2 + 50} y2={oy - 24} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
          <circle cx={pw / 2} cy={oy + 18} r={3} className="fill-indigo-600 dark:fill-indigo-300" />
          <circle cx={pw / 2} cy={oy - 24} r={3.5} className="fill-white stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
          <text x={pw / 2} y={14} className="fill-indigo-900 dark:fill-indigo-100" fontSize="10.5" fontWeight="600" textAnchor="middle">Jump</text>
          <text x={pw / 2} y={H - 6} className="fill-slate-500" fontSize="8.5" textAnchor="middle">LHL ≠ RHL</text>
        </g>
        {/* oscillatory */}
        <g transform={`translate(${pw * 2},0)`}>
          <Axes />
          <polyline points={osc.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="1.6" />
          <text x={pw / 2} y={14} className="fill-indigo-900 dark:fill-indigo-100" fontSize="10.5" fontWeight="600" textAnchor="middle">Oscillatory</text>
          <text x={pw / 2} y={H - 6} className="fill-slate-500" fontSize="8.5" textAnchor="middle">sin(1/x): no limit</text>
        </g>
      </svg>
    </div>
  );
}
