/**
 * Pressure increases with depth in a liquid column — three horizontal levels
 * marked with P = rho*g*h, the arrows growing with depth to show that deeper
 * points feel more pressure. Pressure acts in all directions (side arrows on
 * the walls) and depends only on depth + density, not on the container shape.
 *
 * Server component — static 2-D.
 */
export default function FluidPressureDepth() {
  const left = 90;
  const right = 470;
  const top = 60;
  const bot = 250;
  const levels = [
    { y: 110, label: "h₁", reach: 26 },
    { y: 170, label: "h₂", reach: 52 },
    { y: 230, label: "h₃", reach: 80 },
  ];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="A liquid column showing pressure increasing with depth, with horizontal arrows that grow larger at deeper levels"
      >
        <defs>
          <marker id="fp-arrow" markerWidth="9" markerHeight="9" refX="4" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* container walls + liquid */}
        <rect x={left} y={top} width={right - left} height={bot - top} className="fill-sky-400/25 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        {/* liquid surface */}
        <line x1={left} y1={top} x2={right} y2={top} className="stroke-sky-600 dark:stroke-sky-300" strokeWidth="2.4" />
        <text x={right - 8} y={top - 8} textAnchor="end" fontSize="12" className="fill-sky-800 dark:fill-sky-200">surface</text>

        {/* depth levels */}
        {levels.map((lv) => (
          <g key={lv.label}>
            <line x1={left} y1={lv.y} x2={right} y2={lv.y} className="stroke-indigo-400/60" strokeWidth="1" strokeDasharray="4 3" />
            {/* pressure arrows pointing left + right (acts in all directions), reach grows with depth */}
            <line x1={(left + right) / 2} y1={lv.y} x2={(left + right) / 2 - lv.reach} y2={lv.y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.4" markerEnd="url(#fp-arrow)" />
            <line x1={(left + right) / 2} y1={lv.y} x2={(left + right) / 2 + lv.reach} y2={lv.y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.4" markerEnd="url(#fp-arrow)" />
            <text x={left - 8} y={lv.y + 4} textAnchor="end" fontSize="13" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">{lv.label}</text>
          </g>
        ))}

        <text x={(left + right) / 2} y={290} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">P = rho g h  —  deeper means more pressure</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Gauge pressure depends only on depth h and density rho (P = rho g h) — not on
        the shape of the container or the area of its base. The arrows grow with depth.
      </p>
    </div>
  );
}
