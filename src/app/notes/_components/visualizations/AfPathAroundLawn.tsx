/**
 * A lawn 30 m by 18 m with a path 3 m wide all round it, outside.
 *
 * The path adds its width at both ends of each side, so the outer rectangle is
 * 36 m by 24 m. The path's area is the outer rectangle less the lawn:
 * 864 less 540, which is 324 square metres. It is the worked example of the concept it
 * sits on (AFCAT Area and Perimeter, "Fencing, flooring, tiles and paths"), so
 * the picture and the arithmetic below it match number for number.
 *
 * Why this concept earns one of the chapter's two diagrams: the commonest slip
 * on path questions is adding the width once instead of twice, and a drawing of
 * the band shows the width on both sides at a glance.
 *
 * Server component, static 2-D, drawn to scale (10 px to the metre).
 */
export default function AfPathAroundLawn() {
  const s = 10;
  const ox = 80;
  const oy = 34;
  const w = 3 * s;
  const outerW = 36 * s;
  const outerH = 24 * s;

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 320"
        className="w-full"
        role="img"
        aria-label="A rectangular lawn 30 metres by 18 metres, with a path 3 metres wide running all round it on the outside. Together they make an outer rectangle 36 metres by 24 metres. The outer rectangle is 864 square metres and the lawn 540, so the path is 324 square metres."
      >
        {/* path band (outer rectangle) */}
        <rect
          x={ox}
          y={oy}
          width={outerW}
          height={outerH}
          className="fill-amber-300 stroke-slate-600 dark:fill-amber-500 dark:stroke-slate-300"
          fillOpacity="0.55"
          strokeWidth="1.5"
        />
        {/* lawn */}
        <rect
          x={ox + w}
          y={oy + w}
          width={outerW - 2 * w}
          height={outerH - 2 * w}
          className="fill-emerald-500 stroke-slate-600 dark:fill-emerald-400 dark:stroke-slate-300"
          fillOpacity="0.8"
          strokeWidth="1.5"
        />
        <text x={ox + outerW / 2} y={oy + outerH / 2 - 6} textAnchor="middle" fontSize="15" fontWeight="600" className="fill-white">
          Lawn 30 m × 18 m
        </text>
        <text x={ox + outerW / 2} y={oy + outerH / 2 + 16} textAnchor="middle" fontSize="13" className="fill-white">
          540 m²
        </text>

        {/* lawn dimensions, inside the lawn edges */}
        <text x={ox + outerW / 2} y={oy + w + 18} textAnchor="middle" fontSize="12" className="fill-white">
          30 m
        </text>
        <text x={ox + w + 10} y={oy + outerH / 2 + 4} textAnchor="start" fontSize="12" className="fill-white">
          18 m
        </text>

        {/* path width, on the band at both ends */}
        <text x={ox + w / 2} y={oy + 20} textAnchor="middle" fontSize="11" className="fill-slate-800 dark:fill-slate-900">
          3
        </text>
        <text x={ox + outerW - w / 2} y={oy + 20} textAnchor="middle" fontSize="11" className="fill-slate-800 dark:fill-slate-900">
          3
        </text>
        <text x={ox + outerW / 2} y={oy + outerH - 10} textAnchor="middle" fontSize="11" className="fill-slate-800 dark:fill-slate-900">
          path 3 m wide on every side
        </text>

        {/* outer dimensions */}
        <line x1={ox} y1={oy - 12} x2={ox + outerW} y2={oy - 12} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={ox} y1={oy - 18} x2={ox} y2={oy - 6} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={ox + outerW} y1={oy - 18} x2={ox + outerW} y2={oy - 6} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <text x={ox + outerW / 2} y={oy - 18} textAnchor="middle" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          3 + 30 + 3 = 36 m
        </text>
        <line x1={ox - 12} y1={oy} x2={ox - 12} y2={oy + outerH} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={ox - 18} y1={oy} x2={ox - 6} y2={oy} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={ox - 18} y1={oy + outerH} x2={ox - 6} y2={oy + outerH} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <text
          x={ox - 22}
          y={oy + outerH / 2}
          textAnchor="middle"
          fontSize="13"
          transform={`rotate(-90 ${ox - 22} ${oy + outerH / 2})`}
          className="fill-slate-700 dark:fill-slate-200"
        >
          24 m
        </text>

        {/* the subtraction */}
        <text x={ox + outerW / 2} y={oy + outerH + 30} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          Path = 36 × 24 − 30 × 18 = 864 − 540 = 324 m²
        </text>
      </svg>
    </div>
  );
}
