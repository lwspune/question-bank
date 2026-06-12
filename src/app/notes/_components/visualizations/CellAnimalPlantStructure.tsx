/**
 * Animal vs plant cell, side by side. The animal cell has only a membrane;
 * the plant cell adds a rigid cell wall (outer line), a large central vacuole
 * and chloroplasts. Static SVG — the spatial contrast is the teaching point.
 */
export default function CellAnimalPlantStructure() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 360 200" className="w-full" role="img" aria-label="Animal cell versus plant cell. The animal cell is round with only a cell membrane as its boundary, a central nucleus and scattered mitochondria. The plant cell is rectangular with TWO boundaries — an outer cell wall and an inner cell membrane — plus a large central vacuole and green chloroplasts. Both have a nucleus, membrane and mitochondria; only the plant has a wall, central vacuole and chloroplasts.">
        {/* Animal cell */}
        <text x="90" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Animal cell</text>
        <ellipse cx="90" cy="110" rx="76" ry="66" className="fill-rose-50/70 stroke-rose-500 dark:fill-rose-950/30" strokeWidth="2" />
        <text x="90" y="190" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8" fontWeight="600">Cell membrane only (no wall)</text>
        <circle cx="90" cy="104" r="20" className="fill-indigo-200/80 stroke-indigo-600 dark:fill-indigo-800/50" strokeWidth="1.5" />
        <text x="90" y="107" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="600">Nucleus</text>
        <ellipse cx="52" cy="70" rx="11" ry="6" className="fill-amber-200/80 stroke-amber-600 dark:fill-amber-800/50" strokeWidth="1" />
        <ellipse cx="128" cy="138" rx="11" ry="6" className="fill-amber-200/80 stroke-amber-600 dark:fill-amber-800/50" strokeWidth="1" />
        <text x="52" y="58" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="6.5">mitochondria</text>

        {/* Plant cell */}
        <text x="270" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Plant cell</text>
        <rect x="198" y="40" width="144" height="138" rx="6" className="fill-emerald-50/40 stroke-emerald-700 dark:fill-emerald-950/30" strokeWidth="3" />
        <rect x="205" y="47" width="130" height="124" rx="4" className="fill-emerald-50/60 stroke-emerald-500 dark:fill-emerald-950/40" strokeWidth="1.5" />
        <text x="270" y="190" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="8" fontWeight="600">Cell wall (outer) + membrane (inner)</text>
        <rect x="224" y="66" width="92" height="86" rx="6" className="fill-sky-100/60 stroke-sky-500 dark:fill-sky-900/30" strokeWidth="1.3" />
        <text x="270" y="112" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="7.5" fontWeight="600">Central vacuole</text>
        <circle cx="232" cy="58" r="13" className="fill-indigo-200/80 stroke-indigo-600 dark:fill-indigo-800/50" strokeWidth="1.4" />
        <text x="232" y="61" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6">Nucleus</text>
        <ellipse cx="312" cy="60" rx="10" ry="6" className="fill-green-300/80 stroke-green-700 dark:fill-green-800/50" strokeWidth="1" />
        <text x="312" y="48" textAnchor="middle" className="fill-green-700 dark:fill-green-300" fontSize="6.5">chloroplast</text>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-500">
        Both have a membrane, nucleus and mitochondria. Only the plant cell adds a wall, a central vacuole and chloroplasts.
      </p>
    </div>
  );
}
