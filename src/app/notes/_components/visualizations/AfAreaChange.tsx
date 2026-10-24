/**
 * A rectangle whose length grows by 30% and breadth by 10%, drawn to show where
 * the 43% extra area comes from.
 *
 * The original rectangle counts as 100 units of area. Stretching the length by
 * 30% adds a strip of 30 units on the right; raising the breadth by 10% adds a
 * strip of 10 units on top; the corner where the two strips meet adds
 * 30% of 10, which is 3 units. It is the worked example of the concept it sits
 * on (AFCAT Percentage, "When a quantity is a product"), so the picture and the
 * arithmetic below it match number for number.
 *
 * Why this concept earns the chapter's only diagram: the corner piece is the
 * ab/100 term of the successive-change formula, and a picture shows why it is
 * there when adding the two percentages leaves it out. The chapter's other
 * concepts are arithmetic on factors and have no spatial picture.
 *
 * Server component, static 2-D.
 */
export default function AfAreaChange() {
  const x0 = 60;
  const y0 = 40;
  const w = 300; // original length
  const h = 150; // original breadth
  const dw = w * 0.3; // length grows 30%
  const dh = h * 0.1 * 2; // breadth grows 10%, drawn at double scale so the strip is readable
  const top = y0;
  const baseTop = y0 + dh;

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 280"
        className="w-full"
        role="img"
        aria-label="A rectangle of 100 units of area. Increasing its length by 30 percent adds a strip of 30 units on the right. Increasing its breadth by 10 percent adds a strip of 10 units on top. The corner where both strips meet adds 3 units. The new area is 100 plus 30 plus 10 plus 3, which is 143 units, an increase of 43 percent."
      >
        {/* original rectangle */}
        <rect
          x={x0}
          y={baseTop}
          width={w}
          height={h}
          className="fill-indigo-500 stroke-white dark:fill-indigo-400 dark:stroke-slate-900"
          strokeWidth="2"
          fillOpacity="0.85"
        />
        <text x={x0 + w / 2} y={baseTop + h / 2} textAnchor="middle" fontSize="14" className="fill-white">
          Original area 100
        </text>

        {/* strip from the longer length */}
        <rect
          x={x0 + w}
          y={baseTop}
          width={dw}
          height={h}
          className="fill-sky-500 stroke-white dark:fill-sky-400 dark:stroke-slate-900"
          strokeWidth="2"
          fillOpacity="0.85"
        />
        <text x={x0 + w + dw / 2} y={baseTop + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-white">
          30
        </text>

        {/* strip from the higher breadth */}
        <rect
          x={x0}
          y={top}
          width={w}
          height={dh}
          className="fill-emerald-500 stroke-white dark:fill-emerald-400 dark:stroke-slate-900"
          strokeWidth="2"
          fillOpacity="0.85"
        />
        <text x={x0 + w / 2} y={top + dh / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-white">
          10
        </text>

        {/* the corner: 30% of 10 */}
        <rect
          x={x0 + w}
          y={top}
          width={dw}
          height={dh}
          className="fill-amber-500 stroke-white dark:fill-amber-400 dark:stroke-slate-900"
          strokeWidth="2"
          fillOpacity="0.9"
        />
        <text x={x0 + w + dw / 2} y={top + dh / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-slate-900">
          3
        </text>

        {/* dimension labels */}
        <text x={x0 + w / 2} y={baseTop + h + 22} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          length
        </text>
        <text x={x0 + w + dw / 2} y={baseTop + h + 22} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          +30%
        </text>
        <text x={x0 - 10} y={baseTop + h / 2} textAnchor="end" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          breadth
        </text>
        <text x={x0 - 10} y={top + dh / 2 + 4} textAnchor="end" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          +10%
        </text>

        <text x={260} y={baseTop + h + 46} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          New area 100 + 30 + 10 + 3 = 143, so 43% more
        </text>
      </svg>
    </div>
  );
}
