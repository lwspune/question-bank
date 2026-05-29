/**
 * Static figure: a pie chart with each sector's central angle = (f/total)·360°,
 * plus a legend listing frequency, angle and percentage.
 *
 * Pedagogical aim: a pie sector's angle is a direct proportion of the whole —
 * the conversion exam questions hinge on. Server component — no client state.
 */

const CX = 124;
const CY = 130;
const R = 96;

const DATA = [
  { label: "Walk", v: 8, fill: "fill-sky-500/80", swatch: "bg-sky-500" },
  { label: "Cycle", v: 6, fill: "fill-amber-500/80", swatch: "bg-amber-500" },
  { label: "Bus", v: 4, fill: "fill-emerald-500/80", swatch: "bg-emerald-500" },
  { label: "Car", v: 2, fill: "fill-rose-500/80", swatch: "bg-rose-500" },
];
const TOTAL = DATA.reduce((a, d) => a + d.v, 0);

const polar = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const;
};

let acc = -90; // start at top
const SECTORS = DATA.map((d) => {
  const angle = (d.v / TOTAL) * 360;
  const start = acc;
  const end = acc + angle;
  acc = end;
  const [x1, y1] = polar(start, R);
  const [x2, y2] = polar(end, R);
  const large = angle > 180 ? 1 : 0;
  const path = `M${CX},${CY} L${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
  const [lx, ly] = polar((start + end) / 2, R * 0.62);
  return { ...d, angle, path, lx, ly };
});

export default function PieChartSectors() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · pie sector = (f / total) × 360°
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
        <svg viewBox="0 0 248 260" className="block h-auto w-full max-w-[220px]" role="img" aria-label="Pie chart of travel modes with each sector's central angle labelled">
          {SECTORS.map((s) => (
            <g key={s.label}>
              <path d={s.path} className={`${s.fill} stroke-background`} strokeWidth={1.5} />
              <text x={s.lx} y={s.ly} textAnchor="middle" className="fill-white text-[10px] font-semibold tabular-nums">
                {Math.round(s.angle)}°
              </text>
            </g>
          ))}
        </svg>

        <ul className="w-full space-y-1.5 text-xs">
          {SECTORS.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className={`inline-block h-3 w-3 shrink-0 rounded-sm ${s.swatch}`} aria-hidden />
              <span className="font-medium text-foreground">{s.label}</span>
              <span className="ml-auto tabular-nums text-muted-foreground">
                {s.v}/{TOTAL} → {Math.round(s.angle)}° ({Math.round((s.v / TOTAL) * 100)}%)
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Each slice&apos;s central angle is its share of 360°: Walk = 8/20 × 360° = 144°. The four angles add to
        360° and the frequencies to the total — the check most pie-chart questions turn on.
      </p>
    </div>
  );
}
