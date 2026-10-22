/**
 * The alligation cross for tea at ₹120 and ₹180 a kg mixed to cost ₹140 a kg.
 *
 * The two prices sit at the top corners and the mean in the middle. Each
 * diagonal runs from a price, through the mean, to the far bottom corner, where
 * the difference between that price and the mean is written. So the cheaper tea
 * collects the dearer tea's distance from the mean (40) and the dearer tea the
 * cheaper tea's (20), and the ratio cheaper : dearer is 40 : 20 = 2 : 1. It is
 * the worked example of the concept it sits on (AFCAT Mixture and Alligation,
 * "The alligation cross"), so the picture and the arithmetic match number for
 * number.
 *
 * Why this concept earns a diagram: the one mistake the cross invites is
 * attaching each difference to the wrong side, and the crossing lines show
 * which corner each difference lands in. The chapter's other concepts are
 * arithmetic on fixed quantities and have no spatial picture.
 *
 * Server component, static 2-D.
 */
const CHEAP = 120;
const DEAR = 180;
const MEAN = 140;

export default function AfAlligationCross() {
  const left = 110;
  const right = 410;
  const top = 50;
  const mid = 120;
  const bottom = 190;
  const cx = (left + right) / 2;

  const node = "fill-white stroke-indigo-500 dark:fill-slate-900 dark:stroke-indigo-400";
  const label = "fill-slate-700 dark:fill-slate-200";
  const line = "stroke-slate-400 dark:stroke-slate-500";

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 270"
        className="w-full"
        role="img"
        aria-label="An alligation cross. Cheaper tea at 120 rupees a kilogram is at the top left and dearer tea at 180 rupees at the top right, with the mean price of 140 rupees in the middle. One diagonal runs from 180 through 140 to the bottom left, where 180 minus 140 equals 40 is written under the cheaper tea. The other runs from 120 through 140 to the bottom right, where 140 minus 120 equals 20 is written under the dearer tea. So cheaper to dearer is 40 to 20, which is 2 to 1."
      >
        {/* the two diagonals */}
        <line x1={right} y1={top} x2={left} y2={bottom} className={line} strokeWidth="2" strokeDasharray="6 4" />
        <line x1={left} y1={top} x2={right} y2={bottom} className={line} strokeWidth="2" strokeDasharray="6 4" />

        {/* top corners: the two prices */}
        <rect x={left - 70} y={top - 22} width={140} height={44} rx={8} className={node} strokeWidth="2" />
        <text x={left} y={top - 4} textAnchor="middle" fontSize="12" className={label}>
          Cheaper tea
        </text>
        <text x={left} y={top + 13} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">
          ₹{CHEAP}
        </text>

        <rect x={right - 70} y={top - 22} width={140} height={44} rx={8} className={node} strokeWidth="2" />
        <text x={right} y={top - 4} textAnchor="middle" fontSize="12" className={label}>
          Dearer tea
        </text>
        <text x={right} y={top + 13} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">
          ₹{DEAR}
        </text>

        {/* centre: the mean */}
        <rect x={cx - 60} y={mid - 20} width={120} height={40} rx={8} className="fill-amber-50 stroke-amber-500 dark:fill-amber-950 dark:stroke-amber-400" strokeWidth="2" />
        <text x={cx} y={mid - 3} textAnchor="middle" fontSize="12" className={label}>
          Mean price
        </text>
        <text x={cx} y={mid + 13} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          ₹{MEAN}
        </text>

        {/* bottom corners: the crossed differences */}
        <rect x={left - 70} y={bottom - 20} width={140} height={40} rx={8} className="fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-emerald-400" strokeWidth="2" />
        <text x={left} y={bottom + 5} textAnchor="middle" fontSize="13" className={label}>
          {DEAR} − {MEAN} = {DEAR - MEAN}
        </text>

        <rect x={right - 70} y={bottom - 20} width={140} height={40} rx={8} className="fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-emerald-400" strokeWidth="2" />
        <text x={right} y={bottom + 5} textAnchor="middle" fontSize="13" className={label}>
          {MEAN} − {CHEAP} = {MEAN - CHEAP}
        </text>

        {/* the ratio */}
        <text x={cx} y={245} textAnchor="middle" fontSize="14" fontWeight="600" className={label}>
          Cheaper : dearer = {DEAR - MEAN} : {MEAN - CHEAP} = 2 : 1
        </text>
      </svg>
    </div>
  );
}
