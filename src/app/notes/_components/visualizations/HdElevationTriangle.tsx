/**
 * The right triangle of sight: a vertical height h, a horizontal base d, and a
 * slanted line of sight to the top making the angle of elevation θ at the
 * observer. tan θ = h / d ties the two legs together. Static SVG.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function HdElevationTriangle() {
  const W = 320;
  const H = 190;
  // Triangle corners in svg space.
  const ox = 48; // observer (right angle is at the base, under the top)
  const baseY = 150; // ground line
  const towerX = 250; // foot of the vertical object
  const topY = 44; // top of the vertical object

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A right triangle. The observer stands at the left on the ground. A vertical object of height h stands at the right. The horizontal base d is the ground distance from the observer to the foot of the object. The slanted line of sight from the observer to the top of the object makes the angle of elevation theta with the ground. tan theta equals h over d."
      >
        {/* ground line */}
        <line x1={ox - 10} y1={baseY} x2={towerX + 26} y2={baseY} className="stroke-slate-400" strokeWidth="1" />

        {/* base d */}
        <line x1={ox} y1={baseY} x2={towerX} y2={baseY} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* vertical height h */}
        <line x1={towerX} y1={baseY} x2={towerX} y2={topY} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* line of sight (hypotenuse) */}
        <line x1={ox} y1={baseY} x2={towerX} y2={topY} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" strokeDasharray="5 3" />

        {/* right-angle square at the foot */}
        <path d={`M ${towerX - 12} ${baseY} L ${towerX - 12} ${baseY - 12} L ${towerX} ${baseY - 12}`} className="fill-none stroke-slate-400" strokeWidth="1" />

        {/* angle arc at observer */}
        <path d={`M ${ox + 28} ${baseY} A 28 28 0 0 0 ${ox + 26.5} ${baseY - 9.5}`} className="fill-none stroke-amber-500" strokeWidth="1.6" />

        {/* observer dot */}
        <circle cx={ox} cy={baseY} r={3.4} className="fill-slate-600 dark:fill-slate-300" />

        {/* labels */}
        <text x={ox + 34} y={baseY - 6} className="fill-amber-700 dark:fill-amber-300" fontSize="12" fontWeight="600">θ</text>
        <text x={(ox + towerX) / 2} y={baseY + 16} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" fontWeight="600" textAnchor="middle">d</text>
        <text x={towerX + 8} y={(baseY + topY) / 2} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" fontWeight="600">h</text>
        <text x={(ox + towerX) / 2 - 18} y={(baseY + topY) / 2 - 6} className="fill-emerald-700 dark:fill-emerald-400" fontSize="9.5" textAnchor="middle">line of sight</text>
        <text x={ox - 6} y={baseY + 16} className="fill-slate-500" fontSize="9" textAnchor="middle">observer</text>
        <text x={W / 2} y={H - 6} className="fill-slate-500" fontSize="10" textAnchor="middle">tan θ = h / d</text>
      </svg>
    </div>
  );
}
