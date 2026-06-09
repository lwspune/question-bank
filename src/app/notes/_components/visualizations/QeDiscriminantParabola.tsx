/**
 * The discriminant D = b²−4ac fixes how the parabola y = ax²+bx+c meets the
 * x-axis: D>0 → two real roots (crosses twice), D=0 → equal roots (just
 * touches), D<0 → no real roots (misses). Static SVG, three panels.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function QeDiscriminantParabola() {
  const W = 330;
  const H = 150;
  const oy = 96; // x-axis y in svg space
  const u = 22; // px per math unit
  const a = 0.62; // parabola steepness

  // One panel: upward parabola y = a·x² + vertexY centred at svg-x = cx0.
  const panel = (cx0: number, vertexY: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = -1.9 + (3.8 * i) / 60;
      const y = a * x * x + vertexY;
      pts.push(`${cx0 + x * u},${oy - y * u}`);
    }
    const roots = vertexY < 0 ? [Math.sqrt(-vertexY / a), -Math.sqrt(-vertexY / a)] : vertexY === 0 ? [0] : [];
    return { line: pts.join(" "), roots: roots.map((r) => cx0 + r * u) };
  };

  const panels = [
    { cx: 55, vy: -1.05, label: "D > 0", sub: "two real roots", dot: "fill-emerald-500", text: "fill-emerald-700 dark:fill-emerald-300" },
    { cx: 165, vy: 0, label: "D = 0", sub: "equal roots", dot: "fill-amber-500", text: "fill-amber-700 dark:fill-amber-300" },
    { cx: 275, vy: 0.95, label: "D < 0", sub: "no real roots", dot: "fill-rose-500", text: "fill-rose-700 dark:fill-rose-300" },
  ];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three parabolas. When the discriminant is positive the parabola crosses the x-axis at two points (two real roots); when it is zero the parabola just touches the axis (equal roots); when it is negative the parabola stays above the axis (no real roots)."
      >
        {panels.map((p) => {
          const { line, roots } = panel(p.cx, p.vy);
          return (
            <g key={p.label}>
              <line x1={p.cx - 46} y1={oy} x2={p.cx + 46} y2={oy} className="stroke-slate-400" strokeWidth="0.8" />
              <polyline points={line} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
              {roots.map((rx, i) => (
                <circle key={i} cx={rx} cy={oy} r={3.4} className={p.dot} />
              ))}
              <text x={p.cx} y={H - 22} className={p.text} fontSize="11" fontWeight="600" textAnchor="middle">
                {p.label}
              </text>
              <text x={p.cx} y={H - 8} className="fill-slate-500" fontSize="8.5" textAnchor="middle">
                {p.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
