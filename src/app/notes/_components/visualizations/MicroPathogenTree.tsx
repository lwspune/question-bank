/**
 * Pathogen classification tree: the five kinds of disease-causing agent
 * (virus, bacterium, protozoan, fungus, worm) branching from a single
 * "pathogen" root, each annotated with a marquee NDA disease. Static SVG,
 * server component — pure recall scaffold for the foundation concept.
 */
export default function MicroPathogenTree() {
  const kinds = [
    { label: "Virus", disease: "AIDS, Dengue, Smallpox", cls: "fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/40" },
    { label: "Bacterium", disease: "TB, Cholera, Typhoid", cls: "fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/40" },
    { label: "Protozoan", disease: "Malaria, Sleeping sickness", cls: "fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/40" },
    { label: "Fungus", disease: "Ringworm, Athlete's foot", cls: "fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-900/40" },
    { label: "Worm", disease: "Elephantiasis, Ascariasis", cls: "fill-violet-100/70 stroke-violet-600 dark:fill-violet-900/40" },
  ];
  const rootX = 160;
  const rootY = 22;
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 280" className="w-full" role="img" aria-label="A pathogen branches into five kinds: viruses (AIDS, dengue, smallpox), bacteria (TB, cholera, typhoid), protozoans (malaria, sleeping sickness), fungi (ringworm, athlete's foot) and worms (elephantiasis, ascariasis).">
        {/* root */}
        <rect x={rootX - 38} y={rootY} width="76" height="26" rx="6" className="fill-indigo-100/80 stroke-indigo-600 dark:fill-indigo-900/50" strokeWidth="1.6" />
        <text x={rootX} y={rootY + 17} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="10" fontWeight="700">PATHOGEN</text>
        {kinds.map((k, i) => {
          const y = 70 + i * 41;
          const boxX = 24;
          return (
            <g key={k.label}>
              <line x1={rootX} y1={rootY + 26} x2={boxX + 64} y2={y + 14} className="stroke-slate-400" strokeWidth="1.2" />
              <rect x={boxX} y={y} width="80" height="28" rx="6" className={k.cls} strokeWidth="1.6" />
              <text x={boxX + 40} y={y + 18} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="600">{k.label}</text>
              <text x={boxX + 92} y={y + 18} className="fill-slate-500 dark:fill-slate-300" fontSize="8">{k.disease}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-center text-xs text-slate-500">
        Match the disease to the KIND of pathogen first — most NDA questions hinge on it.
      </p>
    </div>
  );
}
