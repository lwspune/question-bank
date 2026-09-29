/**
 * A right triangle ABC, right-angled at A, with the altitude AD dropped to the hypotenuse BC.
 * The two small triangles ABD and ADC are shaded: both are similar to ABC and to each other,
 * which is where every result on the page comes from — p² = mn, AB² = m·BC, AC² = n·BC,
 * and p = AB·AC ÷ BC.
 *
 * Why this gets a diagram: the altitude to the hypotenuse is the most repeated right-triangle
 * move in CDS Triangles (27 questions), and the commonest slip is pairing a leg with the wrong
 * piece of the hypotenuse. The picture shows which piece touches which leg.
 *
 * Coordinates: B(40,220), C(380,220), D(130,220); A(130,70) so that AD² = BD·DC (150² = 90·250),
 * which puts A on the circle with diameter BC and makes the angle at A exactly 90°.
 *
 * Server component — static 2-D, no interaction.
 */
export default function CdsAltitudeHypotenuse() {
  const A = { x: 130, y: 70 };
  const B = { x: 40, y: 220 };
  const C = { x: 380, y: 220 };
  const D = { x: 130, y: 220 };
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 260"
        className="w-full"
        role="img"
        aria-label="A right triangle ABC with the right angle at A and the hypotenuse BC along the bottom. A perpendicular AD is dropped from A to BC. It splits BC into BD, labelled m, next to B, and DC, labelled n, next to C. The altitude AD is labelled p. The two smaller triangles ABD and ADC are shaded in different colours; each is similar to the whole triangle."
      >
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y}`} className="fill-sky-200/60 dark:fill-sky-800/40" />
        <polygon points={`${A.x},${A.y} ${D.x},${D.y} ${C.x},${C.y}`} className="fill-emerald-200/50 dark:fill-emerald-800/30" />
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          className="stroke-slate-700 dark:stroke-slate-300"
          strokeWidth="2"
        />
        <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" strokeDasharray="6 4" />

        {/* right angle at A */}
        <path d="M 122.8 82 L 134.8 89.2 L 142 77.2" fill="none" className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.5" />
        {/* right angle at D */}
        <path d={`M ${D.x} ${D.y - 14} L ${D.x + 14} ${D.y - 14} L ${D.x + 14} ${D.y}`} fill="none" className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.5" />

        <text x={A.x - 6} y={A.y - 10} className="fill-slate-800 text-[15px] font-semibold dark:fill-slate-100">A</text>
        <text x={B.x - 16} y={B.y + 6} className="fill-slate-800 text-[15px] font-semibold dark:fill-slate-100">B</text>
        <text x={C.x + 6} y={C.y + 6} className="fill-slate-800 text-[15px] font-semibold dark:fill-slate-100">C</text>
        <text x={D.x - 5} y={D.y + 20} className="fill-slate-800 text-[15px] font-semibold dark:fill-slate-100">D</text>

        <text x={D.x + 8} y={150} className="fill-indigo-700 text-[15px] font-semibold dark:fill-indigo-300">p</text>
        <text x={82} y={D.y + 34} className="fill-sky-700 text-[15px] font-semibold dark:fill-sky-300">m</text>
        <text x={250} y={D.y + 34} className="fill-emerald-700 text-[15px] font-semibold dark:fill-emerald-300">n</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        p² = mn. AB² = m × BC and AC² = n × BC. p = AB × AC ÷ BC.
      </p>
    </div>
  );
}
