/**
 * A circle of radius 7 cm with the largest square inside it and the smallest
 * square round it.
 *
 * The diameter, 14 cm, is the one length all three figures share: it is the
 * inner square's diagonal and the outer square's side. So the inner square is
 * 14 squared over 2 = 98 square cm and the outer one 14 squared = 196 square
 * cm, twice as much. It is the worked example of the concept it sits on (AFCAT
 * Area and Perimeter, "Figures inscribed in one another"), so the picture and
 * the arithmetic below it match number for number.
 *
 * Why this concept earns one of the chapter's two diagrams: every inscribed
 * figure question turns on which length is shared, and taking the diameter as
 * the inner square's side is the usual slip. The drawing shows the diameter
 * lying along the inner square's diagonal.
 *
 * Server component, static 2-D.
 */
export default function AfSquareInCircle() {
  const cx = 150;
  const cy = 150;
  const r = 110;

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 300"
        className="w-full"
        role="img"
        aria-label="A circle of radius 7 centimetres drawn inside a square of side 14 centimetres, with a smaller square drawn inside the circle, its corners on the circle. The diameter of 14 centimetres is the side of the outer square and the diagonal of the inner square. The outer square is 196 square centimetres and the inner square 98."
      >
        {/* outer square: side = diameter */}
        <rect
          x={cx - r}
          y={cy - r}
          width={2 * r}
          height={2 * r}
          className="fill-sky-500 stroke-sky-700 dark:fill-sky-400 dark:stroke-sky-300"
          fillOpacity="0.18"
          strokeWidth="1.8"
        />
        {/* circle */}
        <circle cx={cx} cy={cy} r={r} className="fill-white stroke-slate-600 dark:fill-slate-900 dark:stroke-slate-300" strokeWidth="1.8" />
        {/* inner square: diagonal = diameter */}
        <polygon
          points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
          className="fill-indigo-500 stroke-indigo-700 dark:fill-indigo-400 dark:stroke-indigo-300"
          fillOpacity="0.3"
          strokeWidth="1.8"
        />
        {/* the shared diameter */}
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} className="stroke-slate-900 dark:stroke-slate-50" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx={cx} cy={cy} r={3} className="fill-slate-900 dark:fill-slate-50" />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="12" className="fill-slate-900 dark:fill-slate-50">
          14 cm
        </text>
        <text x={cx + r / 2} y={cy + 18} textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-200">
          r = 7
        </text>
        {/* outer side label */}
        <text x={cx} y={cy + r + 22} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          side 14 cm
        </text>

        {/* key */}
        <rect x={300} y={70} width={16} height={16} className="fill-sky-500 dark:fill-sky-400" fillOpacity="0.4" />
        <text x={324} y={83} fontSize="13" className="fill-slate-800 dark:fill-slate-100">
          Outer square
        </text>
        <text x={324} y={101} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          side = diameter = 14
        </text>
        <text x={324} y={119} fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          area 14 × 14 = 196 cm²
        </text>

        <rect x={300} y={160} width={16} height={16} className="fill-indigo-500 dark:fill-indigo-400" fillOpacity="0.5" />
        <text x={324} y={173} fontSize="13" className="fill-slate-800 dark:fill-slate-100">
          Inner square
        </text>
        <text x={324} y={191} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          diagonal = diameter = 14
        </text>
        <text x={324} y={209} fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          area 14 × 14 ÷ 2 = 98 cm²
        </text>
      </svg>
    </div>
  );
}
