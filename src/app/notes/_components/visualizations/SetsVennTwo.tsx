/**
 * Two-set Venn diagram labelling the four regions: A only (A−B), the overlap
 * (A∩B), B only (B−A), and the outside (complement of A∪B). Static SVG.
 */
export default function SetsVennTwo() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 190" className="w-full" role="img" aria-label="Two overlapping circles A and B inside a rectangle: the left crescent is A minus B, the lens overlap is A intersection B, the right crescent is B minus A, and the region outside both circles is the complement of A union B.">
        <rect x="6" y="6" width="288" height="178" rx="6" className="fill-none stroke-slate-400" strokeWidth="1.2" />
        <text x="16" y="22" className="fill-slate-500" fontSize="10">U</text>
        {/* circles */}
        <circle cx="118" cy="96" r="64" className="fill-indigo-400/20 stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        <circle cx="182" cy="96" r="64" className="fill-rose-400/20 stroke-rose-600 dark:stroke-rose-300" strokeWidth="2" />
        <text x="70" y="40" className="fill-indigo-700 dark:fill-indigo-200" fontSize="14" fontWeight="700">A</text>
        <text x="222" y="40" className="fill-rose-700 dark:fill-rose-200" fontSize="14" fontWeight="700">B</text>
        {/* region labels */}
        <text x="80" y="100" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-200" fontSize="10">A − B</text>
        <text x="150" y="100" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="10" fontWeight="600">A ∩ B</text>
        <text x="220" y="100" textAnchor="middle" className="fill-rose-700 dark:fill-rose-200" fontSize="10">B − A</text>
        <text x="150" y="172" textAnchor="middle" className="fill-slate-500" fontSize="9">(A ∪ B)′ — outside both</text>
      </svg>
    </div>
  );
}
