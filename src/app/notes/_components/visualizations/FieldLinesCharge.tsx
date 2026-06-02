/**
 * Electric field lines of an isolated positive and negative charge — radial
 * lines pointing OUTWARD from +q and INWARD to −q. Reinforces that lines
 * start on positive charge and end on negative, and meet a sphere radially
 * (perpendicular to the surface).
 *
 * Server component — static geometry.
 */
export default function FieldLinesCharge() {
  const cx1 = 150;
  const cy = 130;
  const cx2 = 450;
  const r = 22;
  const reach = 78;
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 600 260"
        className="w-full"
        role="img"
        aria-label="Radial electric field lines pointing outward from a positive charge and inward to a negative charge"
      >
        <defs>
          <marker id="fl-out" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
          <marker id="fl-in" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
        </defs>

        {/* outward lines from +q */}
        {angles.map((a) => {
          const rad = (a * Math.PI) / 180;
          const x1 = cx1 + r * Math.cos(rad);
          const y1 = cy + r * Math.sin(rad);
          const x2 = cx1 + reach * Math.cos(rad);
          const y2 = cy + reach * Math.sin(rad);
          return (
            <line
              key={`p${a}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-rose-500/70"
              strokeWidth="1.5"
              markerEnd="url(#fl-out)"
            />
          );
        })}
        {/* inward lines to −q (arrow points toward the charge) */}
        {angles.map((a) => {
          const rad = (a * Math.PI) / 180;
          const x1 = cx2 + reach * Math.cos(rad);
          const y1 = cy + reach * Math.sin(rad);
          const x2 = cx2 + (r + 6) * Math.cos(rad);
          const y2 = cy + (r + 6) * Math.sin(rad);
          return (
            <line
              key={`n${a}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-sky-500/70"
              strokeWidth="1.5"
              markerEnd="url(#fl-in)"
            />
          );
        })}

        <circle cx={cx1} cy={cy} r={r} className="fill-rose-500/20 stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" />
        <circle cx={cx2} cy={cy} r={r} className="fill-sky-500/20 stroke-sky-600 dark:stroke-sky-400" strokeWidth="2" />
        <text x={cx1} y={cy + 6} textAnchor="middle" fontSize="22" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">+</text>
        <text x={cx2} y={cy + 7} textAnchor="middle" fontSize="26" fontWeight="700" className="fill-sky-700 dark:fill-sky-300">−</text>

        <text x={cx1} y={236} textAnchor="middle" fontSize="13" className="fill-indigo-900 dark:fill-indigo-100">Positive: lines point OUT</text>
        <text x={cx2} y={236} textAnchor="middle" fontSize="13" className="fill-indigo-900 dark:fill-indigo-100">Negative: lines point IN</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Field lines start on positive charge, end on negative, and meet a sphere
        radially (perpendicular to its surface).
      </p>
    </div>
  );
}
