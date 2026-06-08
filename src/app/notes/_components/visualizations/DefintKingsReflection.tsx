/**
 * King's property: f(x) on [0, a] and its reflection f(a−x) are mirror images
 * about the midpoint x = a/2, so they enclose the same area. Adding the two is
 * the "2I" trick. Static SVG.
 */
export default function DefintKingsReflection() {
  const baseY = 130;
  const x0 = 30;
  const a = 240;
  const mid = (x0 + a) / 2;
  const f = (x: number) => baseY - (20 + 70 * ((x - x0) / (a - x0)) ** 2); // increasing curve
  const refl = (x: number) => f(a - (x - x0) + x0); // f(a-x) reflected sample
  const fp: string[] = [];
  const rp: string[] = [];
  for (let x = x0; x <= a; x += 6) {
    fp.push(`${x},${f(x).toFixed(1)}`);
    rp.push(`${x},${refl(x).toFixed(1)}`);
  }
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 280 165" className="w-full" role="img" aria-label="A curve f of x and its reflection f of a minus x are mirror images about the vertical line at x equals a over 2; they enclose equal areas, which is King's property.">
        <line x1={x0} y1={baseY} x2={258} y2={baseY} className="stroke-slate-400" strokeWidth="1.2" />
        <line x1={x0} y1={baseY + 6} x2={x0} y2={20} className="stroke-slate-400" strokeWidth="1.2" />
        {/* mirror line */}
        <line x1={mid} y1={baseY} x2={mid} y2={28} className="stroke-rose-400" strokeWidth="1" strokeDasharray="4 3" />
        <text x={mid} y={24} textAnchor="middle" className="fill-rose-500" fontSize="9">x = a/2</text>
        {/* f(x) */}
        <polyline points={fp.join(" ")} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.2" />
        {/* f(a-x) */}
        <polyline points={rp.join(" ")} className="fill-none stroke-emerald-600 dark:stroke-emerald-300" strokeWidth="2.2" strokeDasharray="5 3" />
        <text x={a - 6} y={f(a) - 6} textAnchor="end" className="fill-indigo-700 dark:fill-indigo-200" fontSize="10">f(x)</text>
        <text x={x0 + 6} y={refl(x0) - 6} className="fill-emerald-700 dark:fill-emerald-200" fontSize="10">f(a−x)</text>
        <text x={x0} y={baseY + 14} className="fill-slate-600 dark:fill-slate-300" fontSize="10">0</text>
        <text x={a} y={baseY + 14} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="10">a</text>
        <text x={144} y={158} textAnchor="middle" className="fill-slate-500" fontSize="9">equal areas → I = ∫f(x)dx = ∫f(a−x)dx</text>
      </svg>
    </div>
  );
}
