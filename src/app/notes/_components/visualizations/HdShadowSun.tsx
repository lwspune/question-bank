/**
 * A vertical tower of fixed height h casts a shadow whose length depends on the
 * sun's elevation. A higher sun (steeper angle, 60°) gives a short shadow; a
 * lower sun (45°) gives a longer shadow. s = h·cot θ. Static SVG, one tower,
 * two sun positions and the two shadows they cast.
 *
 * Tailwind classes are written out in full (no string interpolation) so the
 * JIT compiler emits them.
 */
export default function HdShadowSun() {
  const W = 330;
  const H = 180;
  const baseY = 138; // ground
  const towerX = 70; // foot of the tower
  const topY = 50; // top of the tower
  const h = baseY - topY; // pixel height

  // Shadow end x = towerX + h·cot θ (cot60 ≈ 0.577, cot45 = 1).
  const shadow60 = towerX + h * 0.577;
  const shadow45 = towerX + h * 1.0;

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A vertical tower of fixed height casts two shadows. When the sun is high at 60 degrees elevation the shadow is short; when the sun is low at 45 degrees elevation the shadow is longer. Shadow length equals height times cotangent of the sun's elevation."
      >
        {/* ground */}
        <line x1={20} y1={baseY} x2={W - 12} y2={baseY} className="stroke-slate-400" strokeWidth="1" />

        {/* the two sun rays grazing the tower top to the shadow tips */}
        <line x1={towerX} y1={topY} x2={shadow60} y2={baseY} className="stroke-amber-500" strokeWidth="1.4" strokeDasharray="4 3" />
        <line x1={towerX} y1={topY} x2={shadow45} y2={baseY} className="stroke-orange-500" strokeWidth="1.4" strokeDasharray="4 3" />

        {/* sun glyphs near the start of each ray */}
        <circle cx={towerX - 14} cy={topY - 16} r={6} className="fill-amber-400" />
        <circle cx={towerX - 30} cy={topY + 4} r={6} className="fill-orange-400" />

        {/* the long (45°) shadow underneath, then the short (60°) shadow on top */}
        <line x1={towerX} y1={baseY + 5} x2={shadow45} y2={baseY + 5} className="stroke-orange-500" strokeWidth="3" />
        <line x1={towerX} y1={baseY + 5} x2={shadow60} y2={baseY + 5} className="stroke-amber-500" strokeWidth="3" />

        {/* tower */}
        <line x1={towerX} y1={baseY} x2={towerX} y2={topY} className="stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="3" />

        {/* right-angle marker at foot */}
        <path d={`M ${towerX} ${baseY - 11} L ${towerX + 11} ${baseY - 11} L ${towerX + 11} ${baseY}`} className="fill-none stroke-slate-400" strokeWidth="1" />

        {/* labels */}
        <text x={towerX - 8} y={(baseY + topY) / 2} className="fill-indigo-700 dark:fill-indigo-300" fontSize="12" fontWeight="600" textAnchor="end">h</text>
        <text x={(towerX + shadow60) / 2} y={baseY - 5} className="fill-amber-700 dark:fill-amber-300" fontSize="9" textAnchor="middle">sun 60°</text>
        <text x={(shadow60 + shadow45) / 2 + 18} y={baseY + 22} className="fill-orange-700 dark:fill-orange-300" fontSize="9" textAnchor="middle">sun 45° — longer shadow</text>
        <text x={W / 2} y={H - 5} className="fill-slate-500" fontSize="10" textAnchor="middle">s = h cot θ — lower sun, longer shadow</text>
      </svg>
    </div>
  );
}
