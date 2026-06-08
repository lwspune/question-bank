/**
 * The greatest-integer (floor) function ⌊x⌋ as a staircase: constant on each
 * [n, n+1), jumping by 1 at every integer. Its integral is a sum of rectangle
 * areas, so the integral splits at the integers. Static SVG.
 */
export default function DefintGreatestIntegerArea() {
  const baseY = 120;
  const x0 = 30;
  const unit = 44; // px per unit on x
  const h = 26; // px per integer step
  // steps for x in [0,4): value n on [n, n+1)
  const steps = [0, 1, 2, 3];
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 240 150" className="w-full" role="img" aria-label="A staircase graph of the floor function: it is flat at height n on each interval from n to n plus one, jumping up by one at every integer; the shaded rectangles are the pieces of its integral.">
        <line x1={x0} y1={baseY} x2={222} y2={baseY} className="stroke-slate-400" strokeWidth="1.2" />
        <line x1={x0} y1={baseY + 6} x2={x0} y2={18} className="stroke-slate-400" strokeWidth="1.2" />
        {steps.map((n) => {
          const xL = x0 + n * unit;
          const xR = x0 + (n + 1) * unit;
          const y = baseY - n * h;
          return (
            <g key={n}>
              {n > 0 && (
                <rect x={xL} y={y} width={unit} height={n * h} className="fill-indigo-400/20 stroke-none" />
              )}
              <line x1={xL} y1={y} x2={xR} y2={y} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
              <circle cx={xL} cy={y} r={2.5} className="fill-indigo-600" />
              <text x={x0 + n * unit} y={baseY + 13} textAnchor="middle" className="fill-slate-500" fontSize="9">{n}</text>
              {n > 0 && (
                <text x={xL + unit / 2} y={y - 4} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-200" fontSize="8">{n}</text>
              )}
            </g>
          );
        })}
        <text x={x0 + 4 * unit} y={baseY + 13} textAnchor="middle" className="fill-slate-500" fontSize="9">4</text>
        <text x={50} y={20} className="fill-slate-600 dark:fill-slate-300" fontSize="9">y = ⌊x⌋ — split the integral at each integer</text>
      </svg>
    </div>
  );
}
