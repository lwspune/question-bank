/**
 * Simplified nephron: blood is filtered at Bowman's capsule (around the
 * glomerulus); the filtrate runs through the tubule (PCT, loop of Henle,
 * DCT) where useful substances are reabsorbed; the rest becomes urine in
 * the collecting duct. Static SVG.
 */
export default function HpNephronSchematic() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 200" className="w-full" role="img" aria-label="A nephron: blood is filtered at Bowman's capsule surrounding the glomerulus, the filtrate travels through the coiled tubule and loop of Henle where substances are reabsorbed, and the remaining fluid passes into the collecting duct as urine.">
        {/* Bowman's capsule + glomerulus */}
        <circle cx="62" cy="60" r="26" className="fill-rose-100/60 stroke-rose-500 dark:fill-rose-900/30" strokeWidth="1.8" />
        <circle cx="62" cy="60" r="13" className="fill-rose-400/60 stroke-rose-600" strokeWidth="1.4" />
        <text x="62" y="22" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="9.5" fontWeight="600">Bowman&rsquo;s capsule</text>
        <text x="62" y="100" textAnchor="middle" className="fill-slate-500" fontSize="8">(filtration)</text>
        {/* tubule path */}
        <path d="M 88 60 C 130 50, 130 90, 150 90 C 180 90, 150 150, 185 150 C 215 150, 215 100, 235 100"
          className="fill-none stroke-indigo-500" strokeWidth="3" />
        <text x="150" y="74" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="9">Tubule</text>
        <text x="172" y="170" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="8">loop of Henle</text>
        <text x="150" y="120" textAnchor="middle" className="fill-slate-500" fontSize="8">(reabsorption)</text>
        {/* collecting duct */}
        <rect x="232" y="95" width="16" height="80" rx="4" className="fill-amber-200/60 stroke-amber-600 dark:fill-amber-900/30" strokeWidth="1.6" />
        <text x="240" y="190" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="8.5">Urine</text>
      </svg>
    </div>
  );
}
