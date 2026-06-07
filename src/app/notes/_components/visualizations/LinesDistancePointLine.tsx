/**
 * Perpendicular distance from a point to a line: the shortest segment from P
 * meets the line at a right angle, length |ax₀+by₀+c|/√(a²+b²). Static SVG.
 */
export default function LinesDistancePointLine() {
  const W = 260;
  const H = 180;
  // line: from (20,150) to (240,70) (slope ~ -0.36)
  const x1 = 20,
    y1 = 150,
    x2 = 240,
    y2 = 70;
  // point P above the line
  const px = 120,
    py = 55;
  // foot of perpendicular (approx, projection of P onto the line)
  const dx = x2 - x1,
    dy = y2 - y1;
  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const fx = x1 + t * dx,
    fy = y1 + t * dy;

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="A point P and a line; the perpendicular dropped from P meets the line at a right angle, and its length is the distance from the point to the line.">
        <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        <line x1={px} y1={py} x2={fx} y2={fy} className="stroke-rose-500" strokeWidth="1.8" strokeDasharray="4 3" />
        <circle cx={px} cy={py} r={3.5} className="fill-rose-500" />
        <circle cx={fx} cy={fy} r={2.5} className="fill-slate-600 dark:fill-slate-300" />
        {/* right-angle tick at foot */}
        <rect x={fx - 4} y={fy - 4} width="8" height="8" className="fill-none stroke-slate-500" strokeWidth="0.9" transform={`rotate(-20 ${fx} ${fy})`} />
        <text x={px + 6} y={py - 2} className="fill-rose-600 dark:fill-rose-300" fontSize="11" fontWeight="600">P(x₀,y₀)</text>
        <text x={x2 - 70} y={y2 - 6} className="fill-slate-500" fontSize="9">ax+by+c=0</text>
        <text x={(px + fx) / 2 + 6} y={(py + fy) / 2} className="fill-rose-600 dark:fill-rose-300" fontSize="9">d</text>
        <text x={W / 2} y={H - 4} className="fill-slate-500" fontSize="9" textAnchor="middle">d = |ax₀+by₀+c| / √(a²+b²)</text>
      </svg>
    </div>
  );
}
