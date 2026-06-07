/**
 * The Argand plane: a point z = a + ib, its modulus r (distance from origin)
 * and argument θ (angle from the positive real axis). Static SVG.
 */
export default function CnArgandPlane() {
  const W = 260;
  const H = 200;
  const ox = 50;
  const oy = 140;
  const ax = 150; // a = 100px
  const by = 80; // b = 60px up
  const px = ox + ax;
  const py = oy - by;

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The Argand plane: the point z = a + i b plotted with its distance r from the origin (the modulus) and the angle theta it makes with the positive real axis (the argument).">
        {/* axes */}
        <line x1={16} y1={oy} x2={W - 12} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
        <line x1={ox} y1={18} x2={ox} y2={H - 14} className="stroke-slate-400" strokeWidth="0.8" />
        <text x={W - 14} y={oy + 12} className="fill-slate-500" fontSize="9" textAnchor="end">Re</text>
        <text x={ox + 5} y={24} className="fill-slate-500" fontSize="9">Im</text>
        {/* modulus line */}
        <line x1={ox} y1={oy} x2={px} y2={py} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* projections */}
        <line x1={px} y1={py} x2={px} y2={oy} className="stroke-slate-400" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1={px} y1={py} x2={ox} y2={py} className="stroke-slate-400" strokeWidth="0.7" strokeDasharray="3 3" />
        {/* angle arc */}
        <path d={`M ${ox + 34} ${oy} A 34 34 0 0 0 ${ox + 34 * Math.cos(Math.atan2(by, ax))} ${oy - 34 * Math.sin(Math.atan2(by, ax))}`} className="fill-none stroke-rose-500" strokeWidth="1.4" />
        <text x={ox + 40} y={oy - 8} className="fill-rose-600 dark:fill-rose-300" fontSize="11" fontWeight="600">θ</text>
        {/* point */}
        <circle cx={px} cy={py} r={4} className="fill-indigo-600 dark:fill-indigo-300" />
        <text x={px + 6} y={py - 4} className="fill-indigo-900 dark:fill-indigo-100" fontSize="10" fontWeight="600">z = a + ib</text>
        <text x={(ox + px) / 2 - 6} y={(oy + py) / 2 - 4} className="fill-indigo-700 dark:fill-indigo-300" fontSize="10">r</text>
        <text x={(ox + px) / 2 - 4} y={oy + 12} className="fill-slate-500" fontSize="9">a</text>
        <text x={ox - 12} y={(oy + py) / 2} className="fill-slate-500" fontSize="9">b</text>
        <text x={W / 2} y={H - 2} className="fill-slate-500" fontSize="8.5" textAnchor="middle">r = √(a²+b²), θ = arg z</text>
      </svg>
    </div>
  );
}
