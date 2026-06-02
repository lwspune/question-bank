/**
 * The three means of two positive numbers, placed on a number line to make
 * the ordering AM ≥ GM ≥ HM visible at a glance. Worked for a = 4, b = 16:
 * HM = 6.4, GM = 8, AM = 10 — all sitting between a and b, in that order.
 * Static server-component SVG (no interactivity needed — the point is the
 * fixed ordering).
 */
export default function AmGmHmMeans() {
  const width = 520;
  const height = 230;
  const ox = 70;
  const lineY = 150;

  const vmin = 4;
  const vmax = 16;
  const span = 380; // px for the [vmin, vmax] range
  const x = (v: number) => ox + ((v - vmin) / (vmax - vmin)) * span;

  // a = 4, b = 16  →  HM = 6.4, GM = 8, AM = 10
  const a = 4;
  const b = 16;
  const hm = 6.4;
  const gm = 8;
  const am = 10;

  const marks = [
    { v: hm, label: "HM", val: "6.4", colour: "rose", dy: -64 },
    { v: gm, label: "GM", val: "8", colour: "emerald", dy: -94 },
    { v: am, label: "AM", val: "10", colour: "indigo", dy: -124 },
  ] as const;

  const stroke: Record<string, string> = {
    rose: "stroke-rose-500 dark:stroke-rose-400",
    emerald: "stroke-emerald-500 dark:stroke-emerald-400",
    indigo: "stroke-indigo-600 dark:stroke-indigo-300",
  };
  const fill: Record<string, string> = {
    rose: "fill-rose-600 dark:fill-rose-300",
    emerald: "fill-emerald-600 dark:fill-emerald-300",
    indigo: "fill-indigo-700 dark:fill-indigo-200",
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="The arithmetic, geometric, and harmonic means of 4 and 16 placed on a number line, showing AM is greater than GM is greater than HM"
      >
        <text x={width / 2} y={22} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          AM ≥ GM ≥ HM   (for a = 4, b = 16)
        </text>

        {/* number line */}
        <line x1={ox - 20} y1={lineY} x2={ox + span + 20} y2={lineY} className="stroke-indigo-300 dark:stroke-indigo-700" strokeWidth="1.5" />

        {/* endpoints a and b */}
        {[
          { v: a, label: "a = 4" },
          { v: b, label: "b = 16" },
        ].map((p) => (
          <g key={p.label}>
            <line x1={x(p.v)} y1={lineY - 8} x2={x(p.v)} y2={lineY + 8} className="stroke-foreground" strokeWidth="2" />
            <circle cx={x(p.v)} cy={lineY} r={3.5} className="fill-foreground" />
            <text x={x(p.v)} y={lineY + 26} className="fill-foreground" fontSize="12" fontWeight="600" textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}

        {/* the three means, each dropped from a stacked label */}
        {marks.map((m) => (
          <g key={m.label}>
            <line x1={x(m.v)} y1={lineY} x2={x(m.v)} y2={lineY + m.dy} className={stroke[m.colour]} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx={x(m.v)} cy={lineY} r={4} className={fill[m.colour]} />
            <rect x={x(m.v) - 34} y={lineY + m.dy - 16} width={68} height={20} rx={5} className="fill-background stroke-current" strokeWidth="1" />
            <text x={x(m.v)} y={lineY + m.dy - 2} className={fill[m.colour]} fontSize="12" fontWeight="700" textAnchor="middle">
              {m.label} = {m.val}
            </text>
          </g>
        ))}

        <text x={width / 2} y={height - 8} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          GM² = AM · HM   (here 8² = 10 × 6.4 = 64)
        </text>
      </svg>
    </div>
  );
}
