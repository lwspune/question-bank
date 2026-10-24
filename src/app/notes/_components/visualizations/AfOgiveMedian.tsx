/**
 * A less than ogive with the median read off at half the total frequency.
 *
 * The data are the worked example of the concept it sits on (AFCAT Statistics,
 * "The ogive and reading the median"): classes 0-10, 10-20, 20-30 and 30-40 with
 * frequencies 4, 10, 16 and 10. The cumulative frequencies 4, 14, 30 and 40 are
 * plotted at the upper class boundaries and joined. A dashed line goes across
 * from N/2 = 20 to the curve and down to the axis at 23.75, the median, so the
 * picture and the arithmetic below it match number for number.
 *
 * Why this concept earns the chapter's only diagram: reading a median from an
 * ogive is a movement on a graph (up, across, down), and the plotting rule (upper
 * boundary, not mid-point) is easiest to see on the axes. The chapter's other
 * concepts are formulas on numbers and have no spatial picture.
 *
 * Server component, static 2-D.
 */
export default function AfOgiveMedian() {
  const x0 = 70; // x = 0
  const y0 = 250; // cumulative frequency 0
  const sx = 10; // px per unit of x
  const sy = 5; // px per unit of cumulative frequency
  const px = (x: number) => x0 + x * sx;
  const py = (c: number) => y0 - c * sy;

  const points: Array<[number, number]> = [
    [0, 0],
    [10, 4],
    [20, 14],
    [30, 30],
    [40, 40],
  ];
  const path = points.map(([x, c]) => `${px(x)},${py(c)}`).join(" ");
  const half = 20;
  const median = 23.75;
  const ticks = [0, 10, 20, 30, 40];

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 300"
        className="w-full"
        role="img"
        aria-label="A less than ogive. The cumulative frequencies 4, 14, 30 and 40 are plotted at the upper class boundaries 10, 20, 30 and 40, starting from zero, and joined. A dashed line runs across from half the total frequency, 20, to the curve and then down to the horizontal axis at 23.75, which is the median."
      >
        {/* axes */}
        <line x1={x0} y1={y0} x2={px(42)} y2={y0} strokeWidth="1.5" className="stroke-slate-500 dark:stroke-slate-400" />
        <line x1={x0} y1={y0} x2={x0} y2={py(43)} strokeWidth="1.5" className="stroke-slate-500 dark:stroke-slate-400" />

        {/* ticks and tick labels */}
        {ticks.map((t) => (
          <g key={`x${t}`}>
            <line x1={px(t)} y1={y0} x2={px(t)} y2={y0 + 5} strokeWidth="1" className="stroke-slate-500 dark:stroke-slate-400" />
            <text x={px(t)} y={y0 + 18} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
              {t}
            </text>
          </g>
        ))}
        {ticks.map((t) => (
          <g key={`y${t}`}>
            <line x1={x0 - 5} y1={py(t)} x2={x0} y2={py(t)} strokeWidth="1" className="stroke-slate-500 dark:stroke-slate-400" />
            <text x={x0 - 9} y={py(t) + 4} textAnchor="end" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
              {t}
            </text>
          </g>
        ))}

        {/* axis titles */}
        <text x={px(20)} y={y0 + 40} textAnchor="middle" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          Upper class boundary
        </text>
        <text
          x={18}
          y={py(20)}
          textAnchor="middle"
          fontSize="13"
          transform={`rotate(-90 18 ${py(20)})`}
          className="fill-slate-700 dark:fill-slate-200"
        >
          Cumulative frequency
        </text>

        {/* reading the median: across from N/2, then down */}
        <polyline
          points={`${x0},${py(half)} ${px(median)},${py(half)} ${px(median)},${y0}`}
          fill="none"
          strokeWidth="2"
          strokeDasharray="6 5"
          className="stroke-amber-500 dark:stroke-amber-400"
        />

        {/* the ogive */}
        <polyline points={path} fill="none" strokeWidth="3" className="stroke-indigo-500 dark:stroke-indigo-400" />
        {points.map(([x, c]) => (
          <circle key={`p${x}`} cx={px(x)} cy={py(c)} r="5" className="fill-indigo-500 dark:fill-indigo-400" />
        ))}
        {points.slice(1).map(([x, c]) => (
          <text key={`l${x}`} x={px(x) - 10} y={py(c) - 10} textAnchor="end" fontSize="12" className="fill-indigo-700 dark:fill-indigo-300">
            ({x}, {c})
          </text>
        ))}

        {/* labels for the reading */}
        <text x={x0 + 8} y={py(half) - 8} fontSize="13" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          N/2 = 20
        </text>
        <text x={px(median) + 8} y={y0 - 10} fontSize="13" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          Median 23.75
        </text>
      </svg>
    </div>
  );
}
