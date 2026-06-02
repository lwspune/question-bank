/**
 * The 2×2 determinant as a signed area. Columns (a, c) and (b, d) span a
 * parallelogram whose area is |ad − bc| — the geometric meaning of the
 * determinant (and why a zero determinant ⇔ the columns are parallel ⇔ zero
 * area ⇔ singular). Static server-component SVG.
 */
export default function DeterminantAsArea() {
  const width = 520;
  const height = 280;
  const ox = 90;
  const oy = 210;
  const s = 42; // px per unit

  // columns: u = (a, c) = (3, 1), v = (b, d) = (1, 2)  → det = 3·2 − 1·1 = 5
  const u = { x: 3, y: 1 };
  const v = { x: 1, y: 2 };
  const P = (x: number, y: number) => `${ox + x * s},${oy - y * s}`;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="A 2x2 determinant shown as the signed area of the parallelogram spanned by its columns">
        <defs>
          <marker id="da-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" className="fill-indigo-700 dark:fill-indigo-300" />
          </marker>
        </defs>

        <text x={width / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          det = ad − bc = area of the parallelogram
        </text>

        {/* axes */}
        <line x1={ox - 20} y1={oy} x2={width - 30} y2={oy} className="stroke-indigo-300 dark:stroke-indigo-700" strokeWidth="1" />
        <line x1={ox} y1={oy + 20} x2={ox} y2={50} className="stroke-indigo-300 dark:stroke-indigo-700" strokeWidth="1" />

        {/* parallelogram O, u, u+v, v */}
        <polygon
          points={`${P(0, 0)} ${P(u.x, u.y)} ${P(u.x + v.x, u.y + v.y)} ${P(v.x, v.y)}`}
          className="fill-indigo-400/25 stroke-indigo-500/60"
          strokeWidth="1.5"
        />
        <text x={ox + (u.x + v.x) * s / 2 - 6} y={oy - (u.y + v.y) * s / 2} className="fill-indigo-800 dark:fill-indigo-200" fontSize="13" fontWeight="700" textAnchor="middle">
          area = |det|
        </text>

        {/* column vectors */}
        <line x1={P(0, 0).split(",")[0]} y1={P(0, 0).split(",")[1]} x2={ox + u.x * s} y2={oy - u.y * s} className="stroke-indigo-700 dark:stroke-indigo-300" strokeWidth="2.5" markerEnd="url(#da-arrow)" />
        <line x1={ox} y1={oy} x2={ox + v.x * s} y2={oy - v.y * s} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#da-arrow)" />
        <text x={ox + u.x * s + 8} y={oy - u.y * s + 4} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" fontWeight="700">col 1 = (a, c)</text>
        <text x={ox + v.x * s + 8} y={oy - v.y * s - 4} className="fill-rose-700 dark:fill-rose-300" fontSize="12" fontWeight="700">col 2 = (b, d)</text>

        <circle cx={ox} cy={oy} r={3.5} className="fill-foreground" />

        <text x={width / 2} y={height - 8} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          det = 0 ⇔ columns parallel ⇔ zero area ⇔ singular (no inverse).
        </text>
      </svg>
    </div>
  );
}
