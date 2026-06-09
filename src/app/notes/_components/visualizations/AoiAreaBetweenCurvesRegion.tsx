/**
 * The area enclosed between two curves is the integral of (top − bottom)
 * between their intersection points. Here the upper curve (a line) and the
 * lower curve (a parabola) meet at two dots; the strip between them is
 * shaded. Static SVG, one panel.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function AoiAreaBetweenCurvesRegion() {
  const W = 320;
  const H = 200;
  const ox = 30; // y-axis x in svg space
  const oy = 170; // x-axis y in svg space
  const u = 34; // px per math unit

  // top curve: line y = x ; bottom curve: parabola y = x²
  const top = (x: number) => x;
  const bottom = (x: number) => x * x;

  // they meet at x = 0 and x = 1
  const xa = 0;
  const xb = 1;

  const sample = (f: (x: number) => number, x0: number, x1: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = x0 + ((x1 - x0) * i) / 60;
      pts.push(`${ox + x * u},${oy - f(x) * u}`);
    }
    return pts;
  };

  // shaded region: along top curve forward, back along bottom curve.
  const region = [
    ...sample(top, xa, xb),
    ...sample(bottom, xb, xa),
  ].join(" ");

  const lineFull = sample(top, -0.2, 1.45).join(" ");
  const paraFull = sample(bottom, -0.55, 1.45).join(" ");

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A line and a parabola crossing at two points. The region trapped between them is shaded. Its area is the integral of the top curve minus the bottom curve, taken between the two intersection points."
      >
        {/* axes */}
        <line x1={ox} y1={14} x2={ox} y2={oy + 16} className="stroke-slate-400" strokeWidth="1" />
        <line x1={6} y1={oy} x2={W - 10} y2={oy} className="stroke-slate-400" strokeWidth="1" />

        {/* shaded region between curves */}
        <polygon points={region} className="fill-indigo-400/30 dark:fill-indigo-400/20" />

        {/* the two curves */}
        <polyline points={paraFull} className="fill-none stroke-rose-500 dark:stroke-rose-300" strokeWidth="2.2" />
        <polyline points={lineFull} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />

        {/* intersection dots */}
        <circle cx={ox + xa * u} cy={oy - top(xa) * u} r={3.6} className="fill-slate-700 dark:fill-slate-200" />
        <circle cx={ox + xb * u} cy={oy - top(xb) * u} r={3.6} className="fill-slate-700 dark:fill-slate-200" />

        {/* labels */}
        <text x={ox + 1.45 * u + 2} y={oy - top(1.45) * u + 4} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="start">
          top
        </text>
        <text x={ox + 1.45 * u + 2} y={oy - bottom(1.45) * u + 4} className="fill-rose-600 dark:fill-rose-300" fontSize="11" textAnchor="start">
          bottom
        </text>
        <text
          x={ox + 0.55 * u}
          y={oy - 0.36 * u}
          className="fill-indigo-700 dark:fill-indigo-200"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          ∫(top−bottom)
        </text>
      </svg>
    </div>
  );
}
