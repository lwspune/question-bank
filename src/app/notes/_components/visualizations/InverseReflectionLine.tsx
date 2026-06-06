/**
 * f and its inverse f⁻¹ are mirror images across the line y = x. Shown with
 * f(x)=2x (steep) and f⁻¹(x)=x/2 (shallow), reflected over the dashed y=x.
 * Static server-component SVG.
 */
export default function InverseReflectionLine() {
  const W = 280;
  const H = 280;
  const o = 30; // padding / origin offset from bottom-left
  const span = 220; // drawing span
  const ox = o;
  const oy = H - o;

  // map graph coords (0..4) to svg
  const sx = (x: number) => ox + (x / 4) * span;
  const sy = (y: number) => oy - (y / 4) * span;

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="The graph of f(x)=2x and its inverse x/2 are reflections of each other across the dashed line y equals x">
        {/* axes */}
        <line x1={ox} y1={oy} x2={W - 8} y2={oy} className="stroke-slate-400" strokeWidth="0.9" />
        <line x1={ox} y1={oy} x2={ox} y2={8} className="stroke-slate-400" strokeWidth="0.9" />

        {/* y = x mirror line */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(4)} y2={sy(4)} className="stroke-slate-400" strokeWidth="1.2" strokeDasharray="5 4" />
        <text x={sx(3.6)} y={sy(3.6) - 6} className="fill-slate-500" fontSize="10">y = x</text>

        {/* f(x) = 2x  (clipped at y=4 → x=2) */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(2)} y2={sy(4)} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2.4" />
        <text x={sx(2) + 2} y={sy(4) + 4} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" fontWeight="600">f: 2x</text>

        {/* f⁻¹(x) = x/2  (at x=4 → y=2) */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(4)} y2={sy(2)} className="stroke-violet-600 dark:stroke-violet-300" strokeWidth="2.4" />
        <text x={sx(4) - 4} y={sy(2) - 6} className="fill-violet-700 dark:fill-violet-300" fontSize="11" fontWeight="600" textAnchor="end">f⁻¹: x/2</text>

        {/* mirror points (1,2) ↔ (2,1) */}
        <circle cx={sx(1)} cy={sy(2)} r={3.5} className="fill-indigo-600 dark:fill-indigo-300" />
        <circle cx={sx(2)} cy={sy(1)} r={3.5} className="fill-violet-600 dark:fill-violet-300" />

        <text x={W / 2} y={H - 4} className="fill-indigo-700 dark:fill-indigo-300" fontSize="10" textAnchor="middle">(a, b) on f ⟺ (b, a) on f⁻¹</text>
      </svg>
    </div>
  );
}
