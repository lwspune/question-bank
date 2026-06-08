/**
 * A one-parameter family of curves (parabolas y = c·x² for several c). The
 * arbitrary constant c labels each member; eliminating c by differentiation
 * gives the single ODE x·y' = 2y that the whole family satisfies. Static SVG.
 */
export default function DefeqFamilyOfCurves() {
  const W = 260;
  const H = 170;
  const cx = W / 2;
  const baseY = 150;
  const cs = [0.5, 1, 1.8, 3]; // parameter values
  const colors = [
    "stroke-indigo-400",
    "stroke-indigo-500",
    "stroke-rose-500",
    "stroke-emerald-500",
  ];
  // y = c x^2, drawn with x in pixels around centre, scaled
  const curve = (c: number) => {
    const pts: string[] = [];
    for (let px = -70; px <= 70; px += 4) {
      const xr = px / 45; // real x
      const yr = c * xr * xr; // real y
      const y = baseY - yr * 38;
      if (y > 14) pts.push(`${cx + px},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Several parabolas y equals c times x squared for different values of the constant c, sharing the origin; eliminating c by differentiation gives the single differential equation x times y-prime equals 2 y for the whole family.">
        {/* axes */}
        <line x1={20} y1={baseY} x2={240} y2={baseY} className="stroke-slate-400" strokeWidth="1.1" />
        <line x1={cx} y1={baseY + 6} x2={cx} y2={16} className="stroke-slate-400" strokeWidth="1.1" />
        {cs.map((c, i) => (
          <polyline key={c} points={curve(c)} className={`fill-none ${colors[i]}`} strokeWidth="2" />
        ))}
        <text x={cx + 44} y={32} className="fill-slate-600 dark:fill-slate-300" fontSize="9">y = c·x²</text>
        <text x={cx + 44} y={44} className="fill-slate-500" fontSize="8">(one curve per c)</text>
        <text x={W / 2} y={H - 4} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-200" fontSize="9" fontWeight="600">eliminate c  →  x·y′ = 2y</text>
      </svg>
    </div>
  );
}
