/**
 * A right circular cone with its axial right triangle picked out: radius r along the base,
 * vertical height h up the axis, slant height l down the side, and the semi-vertical angle α
 * at the apex.
 *
 * Why this gets a diagram: every cone question on the page is this one triangle — Pythagoras
 * for l, sin α = r/l and cos α = h/l for the vertical-angle family, and the reminder that the
 * VOLUME uses h while the CURVED SURFACE uses l.
 *
 * Server component — static 2-D, no interaction.
 */
export default function CdsConeAnatomy() {
  const apex = { x: 210, y: 40 };
  const base = { cx: 210, cy: 250, rx: 120, ry: 28 };
  const left = { x: base.cx - base.rx, y: base.cy };
  const right = { x: base.cx + base.rx, y: base.cy };
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 310"
        className="w-full"
        role="img"
        aria-label="A cone with its apex at the top. A dashed vertical line from the apex to the centre of the base is the height h. A line from the centre of the base to its rim is the radius r. The sloping side from the apex to the rim is the slant height l. The angle at the apex between the axis and the slant side is the semi-vertical angle alpha. Radius, height and slant height form a right triangle."
      >
        {/* base ellipse: back half dashed, front half solid */}
        <path
          d={`M ${left.x} ${left.y} A ${base.rx} ${base.ry} 0 0 1 ${right.x} ${right.y}`}
          fill="none"
          className="stroke-slate-400 dark:stroke-slate-500"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <path
          d={`M ${left.x} ${left.y} A ${base.rx} ${base.ry} 0 0 0 ${right.x} ${right.y}`}
          fill="none"
          className="stroke-slate-700 dark:stroke-slate-300"
          strokeWidth="2"
        />
        {/* sides */}
        <line x1={apex.x} y1={apex.y} x2={left.x} y2={left.y} className="stroke-slate-700 dark:stroke-slate-300" strokeWidth="2" />
        <line x1={apex.x} y1={apex.y} x2={right.x} y2={right.y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="3" />
        {/* the right triangle: axis h and radius r */}
        <polygon
          points={`${apex.x},${apex.y} ${base.cx},${base.cy} ${right.x},${right.y}`}
          className="fill-sky-200/50 dark:fill-sky-800/40"
        />
        <line x1={apex.x} y1={apex.y} x2={base.cx} y2={base.cy} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" strokeDasharray="6 4" />
        <line x1={base.cx} y1={base.cy} x2={right.x} y2={right.y} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" />
        {/* right-angle mark */}
        <path d={`M ${base.cx} ${base.cy - 14} L ${base.cx + 14} ${base.cy - 14} L ${base.cx + 14} ${base.cy}`} fill="none" className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.5" />
        {/* α arc at the apex, between the axis and the right-hand side */}
        <path d={`M ${apex.x} ${apex.y + 42} A 42 42 0 0 0 ${apex.x + 21} ${apex.y + 36.5}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />
        <text x={apex.x + 6} y={apex.y + 64} className="fill-indigo-700 text-[14px] font-semibold dark:fill-indigo-300">α</text>

        <text x={base.cx - 22} y={150} className="fill-amber-700 text-[15px] font-semibold dark:fill-amber-300">h</text>
        <text x={base.cx + 52} y={base.cy + 20} className="fill-emerald-700 text-[15px] font-semibold dark:fill-emerald-300">r</text>
        <text x={292} y={140} className="fill-indigo-700 text-[15px] font-semibold dark:fill-indigo-300">l</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        l² = r² + h², sin α = r ÷ l. Volume ⅓πr²h uses h; curved surface πrl uses l.
      </p>
    </div>
  );
}
