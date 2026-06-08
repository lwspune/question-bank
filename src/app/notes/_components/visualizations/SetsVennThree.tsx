/**
 * Three-set Venn diagram with all seven disjoint regions labelled — the three
 * "only" regions, the three pairwise-only regions, and the central all-three
 * region. The backbone of inclusion-exclusion and survey word problems. Static.
 */
export default function SetsVennThree() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 240" className="w-full" role="img" aria-label="Three overlapping circles A, B and C forming seven regions: only A, only B, only C, each pair overlap (A and B only, B and C only, A and C only), and the central region in all three.">
        <circle cx="120" cy="100" r="70" className="fill-indigo-400/15 stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        <circle cx="180" cy="100" r="70" className="fill-rose-400/15 stroke-rose-600 dark:stroke-rose-300" strokeWidth="2" />
        <circle cx="150" cy="152" r="70" className="fill-emerald-400/15 stroke-emerald-600 dark:stroke-emerald-300" strokeWidth="2" />
        {/* set labels */}
        <text x="74" y="56" className="fill-indigo-700 dark:fill-indigo-200" fontSize="14" fontWeight="700">A</text>
        <text x="214" y="56" className="fill-rose-700 dark:fill-rose-200" fontSize="14" fontWeight="700">B</text>
        <text x="150" y="218" className="fill-emerald-700 dark:fill-emerald-200" fontSize="14" fontWeight="700">C</text>
        {/* only-regions */}
        <text x="92" y="92" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="9">only A</text>
        <text x="208" y="92" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="9">only B</text>
        <text x="150" y="186" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="9">only C</text>
        {/* pairwise-only */}
        <text x="150" y="80" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">A∩B only</text>
        <text x="112" y="146" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">A∩C</text>
        <text x="188" y="146" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">B∩C</text>
        {/* centre */}
        <text x="150" y="120" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="8" fontWeight="700">all 3</text>
      </svg>
    </div>
  );
}
