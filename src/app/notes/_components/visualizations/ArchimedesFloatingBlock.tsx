/**
 * Archimedes / flotation — a block floats in water with a fraction submerged.
 * The submerged fraction equals the ratio of densities (rho_body / rho_fluid).
 * Two arrows: weight down (mg) and buoyant force up (equal at equilibrium),
 * which is the weight of the displaced fluid.
 *
 * Server component — static 2-D.
 */
export default function ArchimedesFloatingBlock() {
  const tankLeft = 60;
  const tankRight = 500;
  const surface = 110;
  const tankBot = 270;

  // block: 60% submerged
  const blockW = 130;
  const blockH = 110;
  const blockX = 230;
  const blockTop = surface - blockH * 0.4; // 40% above the surface
  const submergedTop = surface;

  const cx = blockX + blockW / 2;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="A block floating in water with about 60 percent of its volume submerged, weight acting down and buoyant force acting up"
      >
        <defs>
          <marker id="ar-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* water */}
        <rect x={tankLeft} y={surface} width={tankRight - tankLeft} height={tankBot - surface} className="fill-sky-400/25 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <line x1={tankLeft} y1={surface} x2={tankRight} y2={surface} className="stroke-sky-600 dark:stroke-sky-300" strokeWidth="2.4" />
        <text x={tankRight - 8} y={surface - 8} textAnchor="end" fontSize="12" className="fill-sky-800 dark:fill-sky-200">water surface</text>

        {/* submerged part (darker) */}
        <rect x={blockX} y={submergedTop} width={blockW} height={blockTop + blockH - submergedTop} className="fill-amber-600/45" />
        {/* whole block outline */}
        <rect x={blockX} y={blockTop} width={blockW} height={blockH} className="fill-amber-400/30 stroke-amber-700 dark:stroke-amber-300" strokeWidth="2" />

        {/* weight arrow (down) from centre */}
        <line x1={cx - 22} y1={blockTop + blockH / 2} x2={cx - 22} y2={blockTop + blockH / 2 + 70} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.6" markerEnd="url(#ar-arrow)" />
        <text x={cx - 30} y={blockTop + blockH / 2 + 50} textAnchor="end" fontSize="13" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">mg</text>

        {/* buoyant arrow (up) */}
        <line x1={cx + 22} y1={blockTop + blockH / 2} x2={cx + 22} y2={blockTop + blockH / 2 - 70} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.6" markerEnd="url(#ar-arrow)" />
        <text x={cx + 30} y={blockTop + blockH / 2 - 50} fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">Fb</text>

        {/* submerged-fraction label */}
        <text x={blockX + blockW / 2} y={blockTop + blockH + 22} textAnchor="middle" fontSize="11" className="fill-amber-800 dark:fill-amber-200">submerged volume = displaced water</text>

        <text x={280} y={296} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">At float: Fb = mg, and fraction submerged = rho_body / rho_water</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        A floating body sinks until the weight of water it displaces equals its own
        weight. The submerged fraction equals the density ratio rho_body / rho_water.
      </p>
    </div>
  );
}
