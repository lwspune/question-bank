/**
 * Block on a rough inclined plane. Weight mg resolves into a component along
 * the incline (mg sin θ, the driving force) and perpendicular to it
 * (mg cos θ, which sets the normal force N = mg cos θ and hence the maximum
 * friction f = μ mg cos θ). Static SVG cross-section.
 *
 * Server component — static 2-D.
 */
export default function LmfFrictionIncline() {
  // incline triangle: right angle at bottom-right
  const bx = 90; // base-left
  const by = 230; // base / ground level
  const rx = 470; // base-right (right angle here)
  const ty = 70; // apex height (top of slope at the right)

  // block sits midway up the slope
  const t = 0.46;
  const blx = bx + (rx - bx) * t;
  const bly = by + (ty - by) * t;
  // slope unit direction (up-slope)
  const dx = rx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // perpendicular (outward normal), rotate up-slope by -90
  const nx = uy;
  const ny = -ux;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Block on a rough inclined plane: weight resolves into a component down the slope and a component pressing into it"
      >
        <defs>
          <marker id="fi-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* incline */}
        <path d={`M ${bx} ${by} L ${rx} ${ty} L ${rx} ${by} Z`} className="fill-muted/40 stroke-foreground" strokeWidth="2" />
        <text x={bx + 44} y={by - 6} fontSize="13" className="fill-foreground">θ</text>

        {/* block (small rotated square) */}
        <g>
          <polygon
            points={[
              [blx + nx * 0 - ux * 22, bly + ny * 0 - uy * 22],
              [blx + nx * 0 + ux * 22, bly + ny * 0 + uy * 22],
              [blx + nx * 30 + ux * 22, bly + ny * 30 + uy * 22],
              [blx + nx * 30 - ux * 22, bly + ny * 30 - uy * 22],
            ]
              .map((p) => p.join(","))
              .join(" ")}
            className="fill-indigo-500/30 stroke-indigo-700 dark:stroke-indigo-300"
            strokeWidth="2"
          />
        </g>

        {/* block centre (slightly off the slope, in the block) */}
        {(() => {
          const ox = blx + nx * 15;
          const oy = bly + ny * 15;
          const mgLen = 78;
          const compLen = mgLen * 0.8;
          return (
            <>
              {/* weight mg straight down */}
              <line x1={ox} y1={oy} x2={ox} y2={oy + mgLen} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#fi-arrow)" />
              <text x={ox - 28} y={oy + mgLen + 4} fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">mg</text>

              {/* component along slope, down-slope = -(ux,uy) */}
              <line x1={ox} y1={oy} x2={ox - ux * compLen} y2={oy - uy * compLen} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2.5" markerEnd="url(#fi-arrow)" />
              <text x={ox - ux * compLen - 50} y={oy - uy * compLen + 16} fontSize="12" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">mg sin θ</text>

              {/* normal force N along outward normal */}
              <line x1={ox} y1={oy} x2={ox + nx * compLen} y2={oy + ny * compLen} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#fi-arrow)" />
              <text x={ox + nx * compLen + 4} y={oy + ny * compLen} fontSize="12" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">N = mg cos θ</text>

              {/* friction up-slope (opposes sliding) */}
              <line x1={ox} y1={oy} x2={ox + ux * 56} y2={oy + uy * 56} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" markerEnd="url(#fi-arrow)" />
              <text x={ox + ux * 56 + 2} y={oy + uy * 56 - 6} fontSize="12" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">f</text>
            </>
          );
        })()}

        <text x={280} y={292} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          mg sin θ drives it down; f = μN = μ mg cos θ resists.
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        On an incline, weight splits into mg sin θ (along the slope, the driving
        force) and mg cos θ (into the slope, which sets N). Maximum friction is
        μN = μ mg cos θ — it depends on the cosine component, not the full weight.
      </p>
    </div>
  );
}
