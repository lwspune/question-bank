/**
 * A definite integral as the signed area under a curve between x = a and
 * x = b: the shaded region is what ∫f(x)dx measures. Static SVG.
 */
export default function DefintAreaRegion() {
  // curve y = a smooth hump on a 0..260 x, 0..120 value canvas
  const W = 280;
  const H = 170;
  const x0 = 30;
  const baseY = 135;
  const a = 70;
  const b = 210;
  // sample the curve f(x) = 60*sin(pi*(x-x0)/240)+20 over [x0, 260]
  const f = (x: number) => baseY - (55 * Math.sin((Math.PI * (x - x0)) / 230) + 18);
  const pts: string[] = [];
  for (let x = x0; x <= 260; x += 5) pts.push(`${x},${f(x).toFixed(1)}`);
  // shaded region between a and b
  const shade: string[] = [`${a},${baseY}`];
  for (let x = a; x <= b; x += 5) shade.push(`${x},${f(x).toFixed(1)}`);
  shade.push(`${b},${baseY}`);
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="A curve y equals f of x with the region between x equals a and x equals b shaded; this shaded area is the value of the definite integral from a to b.">
        {/* axes */}
        <line x1={x0} y1={baseY} x2={268} y2={baseY} className="stroke-slate-400" strokeWidth="1.2" />
        <line x1={x0} y1={baseY + 6} x2={x0} y2={20} className="stroke-slate-400" strokeWidth="1.2" />
        {/* shaded area */}
        <polygon points={shade.join(" ")} className="fill-indigo-400/25 stroke-none" />
        {/* curve */}
        <polyline points={pts.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* limit lines */}
        <line x1={a} y1={baseY} x2={a} y2={f(a)} className="stroke-slate-500" strokeWidth="1" strokeDasharray="3 2" />
        <line x1={b} y1={baseY} x2={b} y2={f(b)} className="stroke-slate-500" strokeWidth="1" strokeDasharray="3 2" />
        <text x={a} y={baseY + 14} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="11">a</text>
        <text x={b} y={baseY + 14} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="11">b</text>
        <text x={(a + b) / 2} y={baseY - 28} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-200" fontSize="12" fontWeight="600">∫ f dx</text>
        <text x={250} y={f(250) - 8} className="fill-indigo-600 dark:fill-indigo-300" fontSize="10">y = f(x)</text>
      </svg>
    </div>
  );
}
