/**
 * Whittaker's five-kingdom classification as a branching tree, split on the
 * two defining axes the NDA tests: cell type (prokaryote vs eukaryote) and
 * cellularity / nutrition. Monera is the lone prokaryote kingdom; the other
 * four are eukaryotes. Static SVG, server component.
 */
export default function BiodivFiveKingdoms() {
  const kingdoms = [
    { label: "Monera", sub: "Prokaryote · unicellular", cls: "fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/40" },
    { label: "Protista", sub: "Eukaryote · unicellular", cls: "fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/40" },
    { label: "Fungi", sub: "Eukaryote · saprophyte", cls: "fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-900/40" },
    { label: "Plantae", sub: "Eukaryote · autotroph", cls: "fill-lime-100/70 stroke-lime-600 dark:fill-lime-900/40" },
    { label: "Animalia", sub: "Eukaryote · heterotroph", cls: "fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/40" },
  ];
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 480 200"
        className="w-full"
        role="img"
        aria-label="Whittaker's five kingdoms branch from all living organisms. Monera is the only prokaryote kingdom and is unicellular. Protista, Fungi, Plantae and Animalia are eukaryotes: Protista is unicellular, Fungi are saprophytic decomposers, Plantae are autotrophs that photosynthesise, and Animalia are heterotrophs."
      >
        {/* root */}
        <rect x="180" y="6" width="120" height="26" rx="6" className="fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/40" strokeWidth="1.6" />
        <text x="240" y="23" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9.5" fontWeight="600">Living organisms</text>

        {kingdoms.map((k, i) => {
          const x = 6 + i * 94;
          const y = 120;
          return (
            <g key={k.label}>
              <line x1="240" y1="32" x2={x + 44} y2={y} className="stroke-slate-400" strokeWidth="1.4" />
              <rect x={x} y={y} width="88" height="44" rx="6" className={k.cls} strokeWidth="1.6" />
              <text x={x + 44} y={y + 18} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9.5" fontWeight="700">{k.label}</text>
              <text x={x + 44} y={y + 32} textAnchor="middle" className="fill-slate-500 dark:fill-slate-300" fontSize="6.6">{k.sub}</text>
            </g>
          );
        })}
        <text x="240" y="192" textAnchor="middle" className="fill-slate-500" fontSize="8">Monera = the only prokaryote kingdom; the other four are all eukaryotes</text>
      </svg>
    </div>
  );
}
