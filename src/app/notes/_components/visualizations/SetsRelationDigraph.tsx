/**
 * A relation drawn as a directed graph on three dots, illustrating the three
 * properties: a self-loop = reflexive, a two-way arrow = symmetric, and a
 * shortcut arrow closing a two-step path = transitive. Static SVG.
 */
export default function SetsRelationDigraph() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 180" className="w-full" role="img" aria-label="Three points a, b, c with arrows: a self-loop at a marks reflexivity, a two-way arrow between a and b marks symmetry, and arrows a to b, b to c plus a shortcut a to c mark transitivity.">
        <defs>
          <marker id="sets-rel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-600 dark:fill-slate-300" />
          </marker>
        </defs>
        {/* nodes */}
        <circle cx="60" cy="120" r="6" className="fill-indigo-600" />
        <circle cx="150" cy="50" r="6" className="fill-indigo-600" />
        <circle cx="240" cy="120" r="6" className="fill-indigo-600" />
        <text x="48" y="140" className="fill-slate-700 dark:fill-slate-100" fontSize="12" fontWeight="600">a</text>
        <text x="146" y="38" className="fill-slate-700 dark:fill-slate-100" fontSize="12" fontWeight="600">b</text>
        <text x="246" y="140" className="fill-slate-700 dark:fill-slate-100" fontSize="12" fontWeight="600">c</text>
        {/* self loop at a (reflexive) */}
        <path d="M 52 112 a 12 12 0 1 1 12 -4" className="fill-none stroke-emerald-600" strokeWidth="1.8" markerEnd="url(#sets-rel-arrow)" />
        <text x="20" y="100" className="fill-emerald-700 dark:fill-emerald-300" fontSize="8">reflexive</text>
        {/* symmetric two-way a<->b */}
        <line x1="68" y1="114" x2="142" y2="58" className="stroke-rose-500" strokeWidth="1.6" markerEnd="url(#sets-rel-arrow)" />
        <line x1="142" y1="58" x2="68" y2="114" className="stroke-rose-500" strokeWidth="1.6" markerEnd="url(#sets-rel-arrow)" strokeDasharray="3 2" />
        <text x="86" y="78" className="fill-rose-600 dark:fill-rose-300" fontSize="8">symmetric</text>
        {/* transitive a->b'->? with shortcut */}
        <line x1="158" y1="56" x2="232" y2="114" className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.6" markerEnd="url(#sets-rel-arrow)" />
        <line x1="68" y1="122" x2="232" y2="122" className="stroke-indigo-500" strokeWidth="1.6" markerEnd="url(#sets-rel-arrow)" />
        <text x="150" y="138" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="8">transitive shortcut a → c</text>
        <text x="150" y="170" textAnchor="middle" className="fill-slate-500" fontSize="8">self-loop = reflexive · two-way = symmetric · shortcut = transitive</text>
      </svg>
    </div>
  );
}
