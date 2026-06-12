/**
 * The plasma membrane as a fluid mosaic: a phospholipid bilayer (round heads
 * facing the watery sides, tails inward) with proteins embedded across it and
 * cholesterol wedged between the lipids. Static SVG.
 */
export default function CellFluidMosaicMembrane() {
  // build the two rows of phospholipids
  const n = 16;
  const xs = Array.from({ length: n }, (_, i) => 16 + i * 18);
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 312 150" className="w-full" role="img" aria-label="The cell membrane is a fluid mosaic: a double layer (bilayer) of phospholipids with round heads facing the water on the outside and inside, and tails pointing inward. Proteins are embedded across the bilayer, and cholesterol molecules sit between the phospholipids to control fluidity.">
        <text x="156" y="14" textAnchor="middle" className="fill-slate-500" fontSize="9">Outside the cell (watery)</text>
        {/* upper leaflet: heads up, tails down */}
        {xs.map((x) => (
          <g key={`up-${x}`}>
            <circle cx={x} cy={32} r="6" className="fill-sky-300/80 stroke-sky-600 dark:fill-sky-700/60" strokeWidth="1" />
            <line x1={x - 2.5} y1={38} x2={x - 2.5} y2={68} className="stroke-amber-500/80" strokeWidth="1.4" />
            <line x1={x + 2.5} y1={38} x2={x + 2.5} y2={68} className="stroke-amber-500/80" strokeWidth="1.4" />
          </g>
        ))}
        {/* lower leaflet: heads down, tails up */}
        {xs.map((x) => (
          <g key={`dn-${x}`}>
            <line x1={x - 2.5} y1={72} x2={x - 2.5} y2={102} className="stroke-amber-500/80" strokeWidth="1.4" />
            <line x1={x + 2.5} y1={72} x2={x + 2.5} y2={102} className="stroke-amber-500/80" strokeWidth="1.4" />
            <circle cx={x} cy={108} r="6" className="fill-sky-300/80 stroke-sky-600 dark:fill-sky-700/60" strokeWidth="1" />
          </g>
        ))}
        {/* an embedded protein spanning the bilayer */}
        <rect x="96" y="22" width="30" height="96" rx="10" className="fill-rose-200/80 stroke-rose-600 dark:fill-rose-800/50" strokeWidth="1.4" />
        <text x="111" y="73" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="600">Protein</text>
        {/* cholesterol between lipids */}
        <rect x="206" y="52" width="9" height="36" rx="3" className="fill-emerald-300/80 stroke-emerald-600 dark:fill-emerald-700/60" strokeWidth="1.2" />
        <text x="248" y="73" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="7.5" fontWeight="600">Cholesterol</text>
        <line x1="220" y1="70" x2="232" y2="70" className="stroke-emerald-600" strokeWidth="1" />
        <text x="156" y="136" textAnchor="middle" className="fill-slate-500" fontSize="9">Inside the cell (cytoplasm)</text>
        <text x="40" y="73" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="7" fontWeight="600">tails</text>
        <text x="22" y="32" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="7" fontWeight="600">head</text>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-500">
        Phospholipid bilayer + embedded proteins + cholesterol = the fluid mosaic.
      </p>
    </div>
  );
}
