/**
 * The parabola y² = 4ax: vertex at the origin, focus at (a, 0), directrix the
 * vertical line x = −a, axis along the x-axis, and the latus rectum the vertical
 * chord through the focus (length 4a). Every point is equidistant from the focus
 * and the directrix. Static SVG.
 */
export default function ConicsParabolaDiagram() {
  const ox = 120, oy = 110, u = 26, a = 1; // focus at x = a
  // y^2 = 4a x  ->  x = y^2/(4a); sample y in [-3.2, 3.2]
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const y = -3.2 + (6.4 * i) / 64;
    const x = (y * y) / (4 * a);
    pts.push(`${ox + x * u},${oy - y * u}`);
  }
  const fx = ox + a * u; // focus
  const dx = ox - a * u; // directrix
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 290 220" className="w-full" role="img" aria-label="A right-opening parabola with vertex at the origin, focus at (a, 0), directrix the vertical line x = minus a, and the latus rectum drawn as a vertical chord through the focus.">
        {/* axis */}
        <line x1={20} y1={oy} x2={270} y2={oy} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" />
        {/* directrix */}
        <line x1={dx} y1={20} x2={dx} y2={200} className="stroke-rose-400" strokeWidth="1.3" strokeDasharray="4 3" />
        <text x={dx - 4} y={16} className="fill-rose-600 dark:fill-rose-300" fontSize="9" textAnchor="middle">x = −a</text>
        {/* curve */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* latus rectum (vertical chord through focus, y = ±2a) */}
        <line x1={fx} y1={oy - 2 * a * u} x2={fx} y2={oy + 2 * a * u} className="stroke-emerald-500" strokeWidth="1.6" />
        <text x={fx + 5} y={oy - 2 * a * u + 4} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5">latus rectum = 4a</text>
        {/* focus + vertex */}
        <circle cx={fx} cy={oy} r={3.4} className="fill-rose-500" />
        <text x={fx} y={oy + 16} className="fill-rose-600 dark:fill-rose-300" fontSize="9" textAnchor="middle">F(a, 0)</text>
        <circle cx={ox} cy={oy} r={2.6} className="fill-indigo-600" />
        <text x={ox - 4} y={oy + 16} className="fill-slate-500" fontSize="8.5" textAnchor="middle">V</text>
      </svg>
    </div>
  );
}
