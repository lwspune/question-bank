/**
 * A cone 16 cm tall with base radius 8 cm, cut parallel to its base 4 cm below
 * the tip, drawn as a side view.
 *
 * The small cone on top is a scaled copy of the whole with k = 4/16 = 1/4, so
 * its radius is 8/4 = 2, its curved surface 1/16 of the whole and its volume
 * 1/64. The frustum below keeps 63/64 of the volume. It is the worked example
 * of the concept it sits on (AFCAT Surface Area and Volume, "A cone cut
 * parallel to its base"), so the picture and the arithmetic match number for
 * number.
 *
 * Why this concept earns a diagram: the whole method is seeing that the top
 * piece is the same shape as the full cone, and two similar triangles sharing
 * the tip show that at a glance.
 *
 * Server component, static 2-D.
 */
const U = 15; // px per cm
const APEX = { x: 150, y: 30 };
const BASE_Y = APEX.y + 16 * U;
const CUT_Y = APEX.y + 4 * U;
const R = 8 * U;
const r = 2 * U;

export default function AfConeCut() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 310"
        className="w-full"
        role="img"
        aria-label="Side view of a cone 16 cm tall with base radius 8 cm. A cut parallel to the base, 4 cm below the tip, takes off a small cone of radius 2 cm. The small cone is the whole cone scaled by one quarter, so it has one sixteenth of the curved surface and one sixty-fourth of the volume. The frustum left below keeps sixty-three sixty-fourths of the volume."
      >
        {/* frustum */}
        <polygon
          points={`${APEX.x - r},${CUT_Y} ${APEX.x + r},${CUT_Y} ${APEX.x + R},${BASE_Y} ${APEX.x - R},${BASE_Y}`}
          className="fill-indigo-500 dark:fill-indigo-400"
          fillOpacity="0.25"
        />
        <ellipse cx={APEX.x} cy={BASE_Y} rx={R} ry={16} className="fill-indigo-500 stroke-slate-600 dark:fill-indigo-400 dark:stroke-slate-300" fillOpacity="0.3" strokeWidth="2" />

        {/* small cone on top */}
        <polygon
          points={`${APEX.x},${APEX.y} ${APEX.x + r},${CUT_Y} ${APEX.x - r},${CUT_Y}`}
          className="fill-sky-500 dark:fill-sky-400"
          fillOpacity="0.6"
        />
        <ellipse cx={APEX.x} cy={CUT_Y} rx={r} ry={5} className="fill-sky-500 stroke-slate-600 dark:fill-sky-400 dark:stroke-slate-300" fillOpacity="0.7" strokeWidth="1.5" />

        {/* outline */}
        <line x1={APEX.x} y1={APEX.y} x2={APEX.x - R} y2={BASE_Y} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2" />
        <line x1={APEX.x} y1={APEX.y} x2={APEX.x + R} y2={BASE_Y} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2" />

        {/* axis */}
        <line x1={APEX.x} y1={APEX.y} x2={APEX.x} y2={BASE_Y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" strokeDasharray="5 5" />

        {/* radii */}
        <line x1={APEX.x} y1={CUT_Y} x2={APEX.x + r} y2={CUT_Y} className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="2.5" />
        <line x1={APEX.x} y1={BASE_Y} x2={APEX.x + R} y2={BASE_Y} className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="2.5" />
        <text x={APEX.x + r + 8} y={CUT_Y + 4} fontSize="13" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          r = 2
        </text>
        <text x={APEX.x + R / 2} y={BASE_Y - 8} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          R = 8
        </text>

        {/* heights */}
        <text x={APEX.x - 10} y={(APEX.y + CUT_Y) / 2 + 5} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          4
        </text>
        <line x1={10} y1={APEX.y} x2={10} y2={BASE_Y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" />
        <line x1={4} y1={APEX.y} x2={16} y2={APEX.y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" />
        <line x1={4} y1={BASE_Y} x2={16} y2={BASE_Y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" />
        <text x={18} y={(APEX.y + BASE_Y) / 2} fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          16
        </text>

        {/* working */}
        <text x={320} y={90} fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Same shape, scale k = 4 ÷ 16 = 1/4
        </text>
        <rect x={320} y={108} width={12} height={12} className="fill-sky-500 dark:fill-sky-400" />
        <text x={338} y={119} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          top cone: radius 8 × 1/4 = 2
        </text>
        <text x={338} y={139} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          curved surface k² = 1/16, volume k³ = 1/64
        </text>
        <rect x={320} y={154} width={12} height={12} className="fill-indigo-500 dark:fill-indigo-400" fillOpacity="0.5" />
        <text x={338} y={165} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          frustum: 1 − 1/64 = 63/64 of the volume
        </text>
      </svg>
    </div>
  );
}
