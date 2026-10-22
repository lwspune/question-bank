/**
 * The angle of depression from a cliff top equals the angle of elevation from
 * the boat: a cliff 75 m high, a boat 75√3 m (about 130 m) from its foot, and
 * the 30° angle drawn at both ends of the line of sight.
 *
 * It is the worked example of the concept it sits on (AFCAT Heights and
 * Distances, "The angle of depression"), so the picture and the arithmetic
 * below it match number for number.
 *
 * Why this concept earns a diagram: the one idea the page turns on is where
 * the angle goes. The horizontal through the eye and the ground are parallel,
 * so the depression at the top reappears as the elevation at the boat, and a
 * picture shows that at a glance where words take a paragraph.
 *
 * Server component, static 2-D. Drawn to scale (2.2 px per metre).
 */
export default function AfAngleOfDepression() {
  const groundY = 220;
  const footX = 80;
  const topY = groundY - 165; // 75 m
  const boatX = footX + 286; // 75√3 m
  const r = 40;
  const c30 = Math.cos(Math.PI / 6);
  const s30 = Math.sin(Math.PI / 6);

  const line = "stroke-slate-500 dark:stroke-slate-300";
  const label = "fill-slate-700 dark:fill-slate-200";

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 270"
        className="w-full"
        role="img"
        aria-label="A cliff 75 metres high with a boat on the water 75 root 3 metres, about 130 metres, from its foot. A dashed horizontal line runs out from the cliff top. The line of sight from the top down to the boat makes an angle of depression of 30 degrees with that horizontal, and the same line makes an angle of elevation of 30 degrees with the water at the boat."
      >
        {/* ground and water */}
        <line x1={20} y1={groundY} x2={500} y2={groundY} className={line} strokeWidth="1.6" />

        {/* cliff */}
        <rect x={footX - 40} y={topY} width={40} height={groundY - topY} className="fill-slate-300 dark:fill-slate-600" />
        <line x1={footX} y1={topY} x2={footX} y2={groundY} className="stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="2.4" />
        <text x={footX - 48} y={(topY + groundY) / 2} textAnchor="end" fontSize="13" className={label}>
          75 m
        </text>

        {/* horizontal through the eye */}
        <line x1={footX} y1={topY} x2={480} y2={topY} className={line} strokeWidth="1.4" strokeDasharray="6 5" />
        <text x={470} y={topY - 8} textAnchor="end" fontSize="12" className={label}>
          horizontal
        </text>

        {/* line of sight */}
        <line x1={footX} y1={topY} x2={boatX} y2={groundY} className="stroke-sky-500 dark:stroke-sky-400" strokeWidth="2" />
        <text x={(footX + boatX) / 2 + 14} y={(topY + groundY) / 2 - 6} fontSize="12" className={label}>
          line of sight
        </text>

        {/* angle of depression at the top */}
        <path
          d={`M ${footX + r} ${topY} A ${r} ${r} 0 0 1 ${footX + r * c30} ${topY + r * s30}`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2"
        />
        <text x={footX + r + 8} y={topY + 18} fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">
          30°
        </text>

        {/* angle of elevation at the boat */}
        <path
          d={`M ${boatX - r} ${groundY} A ${r} ${r} 0 0 1 ${boatX - r * c30} ${groundY - r * s30}`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2"
        />
        <text x={boatX - r - 34} y={groundY - 6} fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">
          30°
        </text>

        {/* boat */}
        <path d={`M ${boatX - 14} ${groundY - 8} L ${boatX + 14} ${groundY - 8} L ${boatX + 8} ${groundY} L ${boatX - 8} ${groundY} Z`} className="fill-indigo-500 dark:fill-indigo-400" />

        {/* distance */}
        <line x1={footX} y1={groundY + 18} x2={boatX} y2={groundY + 18} className={line} strokeWidth="1.4" />
        <line x1={footX} y1={groundY + 12} x2={footX} y2={groundY + 24} className={line} strokeWidth="1.4" />
        <line x1={boatX} y1={groundY + 12} x2={boatX} y2={groundY + 24} className={line} strokeWidth="1.4" />
        <text x={(footX + boatX) / 2} y={groundY + 40} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          75 cot 30° = 75√3 m, about 130 m
        </text>
      </svg>
    </div>
  );
}
