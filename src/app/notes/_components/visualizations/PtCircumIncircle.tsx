/**
 * Every triangle has a circumcircle (radius R, through all three vertices, centre
 * O) and an incircle (radius r, tangent to all three sides, centre I). R = abc/4Δ
 * and r = Δ/s. Static SVG with both circles drawn on one triangle.
 */
export default function PtCircumIncircle() {
  // triangle chosen so both circles sit cleanly inside the viewBox
  const A = { x: 70, y: 150 };
  const B = { x: 220, y: 150 };
  const C = { x: 175, y: 40 };
  // circumcircle (approx) centre + radius for this triangle
  const O = { x: 145, y: 118 }, R = 78;
  // incircle (approx)
  const I = { x: 158, y: 118 }, r = 30;
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 290 210" className="w-full" role="img" aria-label="A triangle with its circumcircle (radius R, passing through all three vertices) and its incircle (radius r, touching all three sides).">
        <circle cx={O.x} cy={O.y} r={R} className="fill-none stroke-sky-400" strokeWidth="1.3" strokeDasharray="4 3" />
        <circle cx={I.x} cy={I.y} r={r} className="fill-emerald-400/10 stroke-emerald-500" strokeWidth="1.3" />
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        <circle cx={O.x} cy={O.y} r={2.5} className="fill-sky-600" />
        <circle cx={I.x} cy={I.y} r={2.5} className="fill-emerald-600" />
        <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} className="stroke-sky-400" strokeWidth="0.9" />
        <text x={O.x - 26} y={O.y + 2} className="fill-sky-700 dark:fill-sky-300" fontSize="10">O, R</text>
        <text x={I.x + 4} y={I.y + 14} className="fill-emerald-700 dark:fill-emerald-300" fontSize="10">I, r</text>
        <text x={A.x - 12} y={A.y + 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="12">A</text>
        <text x={B.x + 5} y={B.y + 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="12">B</text>
        <text x={C.x - 3} y={C.y - 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="12">C</text>
        <text x={70} y={198} className="fill-slate-500" fontSize="8.5">circumradius R = abc/4Δ · inradius r = Δ/s</text>
      </svg>
    </div>
  );
}
