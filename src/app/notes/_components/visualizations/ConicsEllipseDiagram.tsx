/**
 * The ellipse x²/a² + y²/b² = 1 (a > b): centre at the origin, semi-major axis a
 * along x, semi-minor axis b along y, foci at (±c, 0) with c² = a² − b², and the
 * defining property PF₁ + PF₂ = 2a. Static SVG.
 */
export default function ConicsEllipseDiagram() {
  const ox = 145, oy = 100, a = 110, b = 64; // pixel semi-axes
  const c = Math.sqrt(a * a - b * b);
  // a point P on the ellipse + the two focal radii
  const Pang = -0.9;
  const P = { x: ox + a * Math.cos(Pang), y: oy - b * Math.sin(Pang) };
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 290 200" className="w-full" role="img" aria-label="An ellipse centred at the origin with semi-major axis a along the x-axis, semi-minor axis b along the y-axis, and two foci on the x-axis. A point P is joined to both foci, illustrating that the two focal distances add to 2a.">
        <line x1={ox - a - 12} y1={oy} x2={ox + a + 12} y2={oy} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.7" />
        <line x1={ox} y1={oy - b - 12} x2={ox} y2={oy + b + 12} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.7" />
        <ellipse cx={ox} cy={oy} rx={a} ry={b} className="fill-indigo-500/10 stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* foci */}
        <circle cx={ox - c} cy={oy} r={3.2} className="fill-rose-500" />
        <circle cx={ox + c} cy={oy} r={3.2} className="fill-rose-500" />
        <text x={ox - c} y={oy + 15} className="fill-rose-600 dark:fill-rose-300" fontSize="8.5" textAnchor="middle">F₁(−c,0)</text>
        <text x={ox + c} y={oy + 15} className="fill-rose-600 dark:fill-rose-300" fontSize="8.5" textAnchor="middle">F₂(c,0)</text>
        {/* focal radii to P */}
        <line x1={ox - c} y1={oy} x2={P.x} y2={P.y} className="stroke-emerald-500" strokeWidth="1.2" />
        <line x1={ox + c} y1={oy} x2={P.x} y2={P.y} className="stroke-emerald-500" strokeWidth="1.2" />
        <circle cx={P.x} cy={P.y} r={3} className="fill-emerald-600" />
        <text x={P.x + 4} y={P.y + 12} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5">P</text>
        {/* axis labels */}
        <text x={ox + a / 2} y={oy - 4} className="fill-slate-500" fontSize="9">a</text>
        <text x={ox + 4} y={oy - b / 2} className="fill-slate-500" fontSize="9">b</text>
        <text x={70} y={194} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5">PF₁ + PF₂ = 2a · c² = a² − b²</text>
      </svg>
    </div>
  );
}
