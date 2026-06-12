/**
 * The three tonicity outcomes for a cell, side by side: hypotonic (water in →
 * swells/bursts), isotonic (no net change), hypertonic (water out → shrinks /
 * plasmolyses). Arrows show the net direction of water flow. Static SVG.
 */
export default function CellOsmosisTonicity() {
  const panels = [
    {
      label: "Hypotonic",
      sub: "more water outside",
      effect: "Water IN — swells / bursts",
      r: 34,
      cls: "fill-sky-200/70 stroke-sky-600 dark:fill-sky-800/40",
      arrowIn: true,
    },
    {
      label: "Isotonic",
      sub: "balanced",
      effect: "No net change",
      r: 26,
      cls: "fill-emerald-200/70 stroke-emerald-600 dark:fill-emerald-800/40",
      arrowIn: null,
    },
    {
      label: "Hypertonic",
      sub: "more solute outside",
      effect: "Water OUT — shrinks / plasmolysis",
      r: 17,
      cls: "fill-rose-200/70 stroke-rose-600 dark:fill-rose-800/40",
      arrowIn: false,
    },
  ];
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 360 150" className="w-full" role="img" aria-label="Three tonicity outcomes. In a hypotonic solution (more water outside), water moves into the cell and it swells and may burst. In an isotonic solution, water movement is balanced and the cell is unchanged. In a hypertonic solution (more solute outside), water moves out and the cell shrinks — in a plant cell this is plasmolysis.">
        {panels.map((p, i) => {
          const cx = 64 + i * 116;
          const cy = 62;
          return (
            <g key={p.label}>
              {/* beaker */}
              <rect x={cx - 48} y={20} width="96" height="84" rx="6" className="fill-slate-100/40 stroke-slate-400 dark:fill-slate-800/20" strokeWidth="1.2" />
              {/* cell */}
              <circle cx={cx} cy={cy} r={p.r} className={p.cls} strokeWidth="1.8" />
              {/* arrows */}
              {p.arrowIn === true && (
                <>
                  <line x1={cx - 44} y1={cy} x2={cx - p.r - 4} y2={cy} className="stroke-sky-600" strokeWidth="1.6" markerEnd="url(#cell-osmo-arrow)" />
                  <line x1={cx + 44} y1={cy} x2={cx + p.r + 4} y2={cy} className="stroke-sky-600" strokeWidth="1.6" markerEnd="url(#cell-osmo-arrow)" />
                </>
              )}
              {p.arrowIn === false && (
                <>
                  <line x1={cx - p.r - 4} y1={cy} x2={cx - 44} y2={cy} className="stroke-rose-600" strokeWidth="1.6" markerEnd="url(#cell-osmo-arrow)" />
                  <line x1={cx + p.r + 4} y1={cy} x2={cx + 44} y2={cy} className="stroke-rose-600" strokeWidth="1.6" markerEnd="url(#cell-osmo-arrow)" />
                </>
              )}
              <text x={cx} y={118} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">{p.label}</text>
              <text x={cx} y={129} textAnchor="middle" className="fill-slate-500" fontSize="6.5">{p.sub}</text>
              <text x={cx} y={141} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">{p.effect}</text>
            </g>
          );
        })}
        <defs>
          <marker id="cell-osmo-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-600" />
          </marker>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-500">
        Water moves toward the more concentrated (lower-water) side.
      </p>
    </div>
  );
}
