/**
 * Prokaryote vs eukaryote, side by side. The prokaryote has free-floating
 * naked DNA (the nucleoid) and no membrane-bound organelles; the eukaryote
 * has a true membrane-bound nucleus and organelles like the mitochondrion.
 * Static SVG.
 */
export default function CellProkaryoteEukaryote() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 360 200" className="w-full" role="img" aria-label="Prokaryotic cell versus eukaryotic cell. The prokaryote is small with its DNA floating free as a tangled loop called the nucleoid, no membrane-bound nucleus and no organelles. The eukaryote is larger with a true membrane-bound nucleus and organelles such as the mitochondrion. Both have a cell wall, plasma membrane and ribosomes.">
        {/* Prokaryote */}
        <text x="86" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Prokaryote</text>
        <rect x="20" y="64" width="132" height="84" rx="42" className="fill-amber-50/50 stroke-amber-700 dark:fill-amber-950/30" strokeWidth="2.6" />
        <rect x="26" y="70" width="120" height="72" rx="36" className="fill-amber-50/40 stroke-amber-500 dark:fill-amber-950/20" strokeWidth="1.2" />
        {/* nucleoid — tangled DNA loop */}
        <path d="M60 106 q12 -16 26 0 q14 16 28 0 q-12 16 -28 0 q-14 -16 -26 0 Z" className="fill-none stroke-rose-600" strokeWidth="2" />
        <text x="86" y="100" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="6.5" fontWeight="600">Nucleoid</text>
        <text x="86" y="132" textAnchor="middle" className="fill-slate-500" fontSize="6">naked, circular DNA</text>
        <circle cx="44" cy="86" r="2.2" className="fill-slate-500" />
        <circle cx="124" cy="124" r="2.2" className="fill-slate-500" />
        <text x="86" y="170" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="7" fontWeight="600">No nucleus, no organelles</text>

        {/* Eukaryote */}
        <text x="272" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Eukaryote</text>
        <ellipse cx="272" cy="104" rx="78" ry="62" className="fill-indigo-50/50 stroke-indigo-600 dark:fill-indigo-950/30" strokeWidth="2.4" />
        <circle cx="272" cy="100" r="26" className="fill-indigo-200/80 stroke-indigo-700 dark:fill-indigo-800/50" strokeWidth="1.8" />
        <text x="272" y="103" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7" fontWeight="600">Nucleus</text>
        <ellipse cx="222" cy="80" rx="13" ry="7" className="fill-rose-200/80 stroke-rose-600 dark:fill-rose-800/50" strokeWidth="1.2" />
        <text x="222" y="66" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="6">mitochondrion</text>
        <text x="272" y="178" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="7" fontWeight="600">Membrane-bound nucleus + organelles</text>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-500">
        Both have a wall, membrane and ribosomes. Only the eukaryote has a true nucleus and membrane-bound organelles.
      </p>
    </div>
  );
}
