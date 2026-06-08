/**
 * Integrating |f|: the part of f below the x-axis is folded up to become
 * positive area. The dashed curve is the original f (going negative); the
 * solid curve is |f|, all above the axis. Split at the zero. Static SVG.
 */
export default function DefintAbsoluteValueFold() {
  const W = 260;
  const H = 160;
  const x0 = 20;
  const axisY = 85;
  // f(x) = a parabola crossing zero at the middle: dips below then comes up
  const root = 130;
  const f = (x: number) => axisY + 55 * Math.sin((Math.PI * (x - x0)) / 110); // dips below on left? adjust
  const fOrig: string[] = [];
  const fAbs: string[] = [];
  for (let x = x0; x <= 240; x += 5) {
    const y = f(x);
    fOrig.push(`${x},${y.toFixed(1)}`);
    // |f|: reflect below-axis points up
    const yAbs = y > axisY ? axisY - (y - axisY) : y;
    fAbs.push(`${x},${yAbs.toFixed(1)}`);
  }
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The curve f of x dips below the x-axis; for the integral of its absolute value, that below-axis part is folded up above the axis so all the area counts positively. Split the integral at the zero crossing.">
        <line x1={x0} y1={axisY} x2={246} y2={axisY} className="stroke-slate-400" strokeWidth="1.2" />
        {/* original f (dashed, dips below) */}
        <polyline points={fOrig.join(" ")} className="fill-none stroke-slate-400" strokeWidth="1.6" strokeDasharray="4 3" />
        {/* |f| solid */}
        <polyline points={fAbs.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />
        {/* zero crossing */}
        <circle cx={root} cy={axisY} r={3} className="fill-rose-500" />
        <line x1={root} y1={axisY - 50} x2={root} y2={axisY + 50} className="stroke-rose-300" strokeWidth="1" strokeDasharray="3 2" />
        <text x={root} y={axisY + 62} textAnchor="middle" className="fill-rose-500" fontSize="9">split here (f = 0)</text>
        <text x={60} y={axisY - 40} className="fill-indigo-700 dark:fill-indigo-200" fontSize="10">|f(x)|</text>
        <text x={170} y={axisY + 42} className="fill-slate-500" fontSize="9">f &lt; 0 here →</text>
        <text x={170} y={axisY + 54} className="fill-slate-500" fontSize="9">folded up</text>
      </svg>
    </div>
  );
}
