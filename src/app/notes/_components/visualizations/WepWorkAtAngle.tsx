/**
 * Work done by a force at an angle — a box on a horizontal floor pulled by a
 * force F at angle theta above the horizontal. The displacement d is along the
 * floor; only the horizontal component F cos(theta) does work, while the
 * vertical component F sin(theta) does none (perpendicular to motion).
 *
 * Server component — static 2-D.
 */
export default function WepWorkAtAngle() {
  const floorY = 210;
  const boxX = 120;
  const boxW = 70;
  const boxH = 50;
  const boxTop = floorY - boxH;
  const cornerX = boxX + boxW; // top-right corner of the box (force origin)
  const cornerY = boxTop;

  // force vector at ~35 degrees above horizontal
  const Fx = 130;
  const Fy = -91; // upward in SVG coordinates
  const tipX = cornerX + Fx;
  const tipY = cornerY + Fy;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 460 300"
        className="w-full"
        role="img"
        aria-label="A box on the floor pulled by a force at an angle, showing the horizontal component does work and the vertical component does not"
      >
        <defs>
          <marker id="wep-fa-arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="wep-fa-grey" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
          <marker id="wep-fa-disp" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* floor */}
        <line x1="20" y1={floorY} x2="440" y2={floorY} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" />

        {/* the box */}
        <rect x={boxX} y={boxTop} width={boxW} height={boxH} className="fill-indigo-200/50 stroke-indigo-700 dark:fill-indigo-800/40 dark:stroke-indigo-300" strokeWidth="2" />

        {/* applied force F at angle theta */}
        <line x1={cornerX} y1={cornerY} x2={tipX} y2={tipY} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="3" markerEnd="url(#wep-fa-arrow)" />
        <text x={tipX + 6} y={tipY - 2} fontSize="16" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">F</text>

        {/* horizontal component F cos theta (does work) */}
        <line x1={cornerX} y1={cornerY} x2={tipX} y2={cornerY} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.4" strokeDasharray="6 3" markerEnd="url(#wep-fa-disp)" />
        <text x={cornerX + Fx / 2} y={cornerY - 8} textAnchor="middle" fontSize="13" className="fill-emerald-700 dark:fill-emerald-300">F cos θ</text>

        {/* vertical component F sin theta (does no work) */}
        <line x1={tipX} y1={cornerY} x2={tipX} y2={tipY} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#wep-fa-grey)" />
        <text x={tipX + 8} y={(cornerY + tipY) / 2} fontSize="13" className="fill-slate-600 dark:fill-slate-400">F sin θ</text>

        {/* angle theta arc at the corner */}
        <path d={`M ${cornerX + 34} ${cornerY} A 34 34 0 0 0 ${cornerX + 28} ${cornerY - 19}`} className="fill-none stroke-indigo-500" strokeWidth="1.6" />
        <text x={cornerX + 42} y={cornerY - 12} fontSize="14" className="fill-indigo-700 dark:fill-indigo-300">θ</text>

        {/* displacement d along the floor */}
        <line x1={boxX} y1={floorY + 24} x2={boxX + 180} y2={floorY + 24} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.4" markerEnd="url(#wep-fa-disp)" />
        <text x={boxX + 90} y={floorY + 42} textAnchor="middle" fontSize="13" className="fill-emerald-700 dark:fill-emerald-300">displacement d</text>

        <text x="230" y="285" textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">Only F cos θ is along d, so W = F d cos θ</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Work counts only the part of the force along the displacement. The
        vertical component F sin θ is perpendicular to motion and does no work.
      </p>
    </div>
  );
}
