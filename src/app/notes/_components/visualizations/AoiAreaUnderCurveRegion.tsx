/**
 * The area bounded by a curve y = f(x), the x-axis, and the two vertical
 * lines x = a and x = b is the shaded region — exactly the definite integral
 * ∫ₐᵇ f(x) dx. Static SVG, one panel.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function AoiAreaUnderCurveRegion() {
  const W = 320;
  const H = 200;
  const ox = 40; // y-axis x in svg space
  const oy = 162; // x-axis y in svg space
  const u = 26; // px per math unit
  const a = 0.32; // parabola steepness

  // Curve y = a·x² + 1 sampled in math-x over [0, 8].
  const fy = (x: number) => a * x * x + 1;

  const xa = 2; // left limit (math units)
  const xb = 6; // right limit (math units)

  // Curve polyline across the whole visible range.
  const curve: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = (8 * i) / 80;
    curve.push(`${ox + x * u},${oy - fy(x) * u}`);
  }

  // Shaded region: x-axis from xa to xb, up the curve, back down.
  const region: string[] = [];
  region.push(`${ox + xa * u},${oy}`);
  for (let i = 0; i <= 60; i++) {
    const x = xa + ((xb - xa) * i) / 60;
    region.push(`${ox + x * u},${oy - fy(x) * u}`);
  }
  region.push(`${ox + xb * u},${oy}`);

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A curve y equals f of x with the region beneath it shaded between the vertical lines x equals a and x equals b, down to the x-axis. The shaded area equals the definite integral of f from a to b."
      >
        {/* axes */}
        <line x1={ox} y1={18} x2={ox} y2={oy} className="stroke-slate-400" strokeWidth="1" />
        <line x1={ox} y1={oy} x2={W - 10} y2={oy} className="stroke-slate-400" strokeWidth="1" />

        {/* shaded region */}
        <polygon points={region.join(" ")} className="fill-indigo-400/30 dark:fill-indigo-400/20" />

        {/* limit lines */}
        <line
          x1={ox + xa * u}
          y1={oy}
          x2={ox + xa * u}
          y2={oy - fy(xa) * u}
          className="stroke-indigo-500"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <line
          x1={ox + xb * u}
          y1={oy}
          x2={ox + xb * u}
          y2={oy - fy(xb) * u}
          className="stroke-indigo-500"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* curve */}
        <polyline points={curve.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />

        {/* labels */}
        <text x={ox + xa * u} y={oy + 14} className="fill-slate-600 dark:fill-slate-300" fontSize="11" textAnchor="middle">
          a
        </text>
        <text x={ox + xb * u} y={oy + 14} className="fill-slate-600 dark:fill-slate-300" fontSize="11" textAnchor="middle">
          b
        </text>
        <text x={ox + 8 * u - 4} y={oy - fy(8) * u + 2} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="end">
          y = f(x)
        </text>
        <text
          x={ox + ((xa + xb) / 2) * u}
          y={oy - 18}
          className="fill-indigo-700 dark:fill-indigo-200"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          area = ∫ f dx
        </text>
      </svg>
    </div>
  );
}
