/**
 * Geometric counting: from a set of points (some collinear) you choose triples
 * to make triangles — but a collinear triple is degenerate and must be
 * subtracted. Static SVG: 8 points, 3 of them collinear. */
export default function PcGeometricCounting() {
  const W = 260;
  const H = 180;
  // 3 collinear points on a line + 5 scattered
  const collinear = [
    [40, 60],
    [110, 80],
    [180, 100],
  ];
  const scattered = [
    [60, 140],
    [150, 150],
    [220, 60],
    [210, 130],
    [90, 35],
  ];
  const all = [...collinear, ...scattered];

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Eight points with three lying on one straight line; triangles are chosen as triples of points, but the three collinear points form no triangle and are subtracted.">
        {/* the collinear line */}
        <line x1={collinear[0][0]} y1={collinear[0][1]} x2={collinear[2][0]} y2={collinear[2][1]} className="stroke-rose-400" strokeWidth="1.4" strokeDasharray="4 3" />
        {/* one valid triangle for illustration */}
        <polygon points={`${scattered[0][0]},${scattered[0][1]} ${scattered[2][0]},${scattered[2][1]} ${scattered[4][0]},${scattered[4][1]}`} className="fill-indigo-200/40 stroke-indigo-500 dark:fill-indigo-400/15" strokeWidth="1.4" />
        {collinear.map(([x, y], i) => (
          <circle key={`c${i}`} cx={x} cy={y} r={4} className="fill-rose-500" />
        ))}
        {scattered.map(([x, y], i) => (
          <circle key={`s${i}`} cx={x} cy={y} r={4} className="fill-indigo-600 dark:fill-indigo-300" />
        ))}
        <text x={130} y={H - 6} className="fill-slate-500" fontSize="9" textAnchor="middle">triangles = ⁸C₃ − ³C₃ (drop the collinear triple)</text>
      </svg>
    </div>
  );
}
