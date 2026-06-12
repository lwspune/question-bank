/**
 * Double fertilisation in an angiosperm: one pollen tube delivers two male
 * gametes (each n). One fuses with the egg (n) to give a 2n zygote; the other
 * fuses with the diploid secondary nucleus (2n) to give the 3n endosperm.
 * Static SVG schematic showing the two fusions and the resulting ploidies.
 */
export default function ReproDoubleFertilisation() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 340 200"
        className="w-full"
        role="img"
        aria-label="Double fertilisation: a pollen tube brings two male gametes, each haploid n. One male gamete fuses with the haploid egg to form a diploid 2n zygote. The other male gamete fuses with the diploid 2n secondary nucleus to form the triploid 3n endosperm."
      >
        {/* pollen tube delivering 2 gametes (left) */}
        <text x="48" y="18" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="9" fontWeight="600">2 male gametes</text>
        <circle cx="36" cy="40" r="11" className="fill-indigo-300/80 stroke-indigo-700 dark:fill-indigo-800/50" strokeWidth="1.4" />
        <text x="36" y="43" textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-100" fontSize="8" fontWeight="700">n</text>
        <circle cx="36" cy="130" r="11" className="fill-indigo-300/80 stroke-indigo-700 dark:fill-indigo-800/50" strokeWidth="1.4" />
        <text x="36" y="133" textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-100" fontSize="8" fontWeight="700">n</text>

        {/* egg (top centre) */}
        <circle cx="150" cy="40" r="13" className="fill-rose-200/80 stroke-rose-600 dark:fill-rose-900/40" strokeWidth="1.4" />
        <text x="150" y="43" textAnchor="middle" className="fill-rose-800 dark:fill-rose-200" fontSize="8" fontWeight="700">egg</text>
        <text x="150" y="20" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8">n</text>

        {/* secondary nucleus (bottom centre) */}
        <circle cx="150" cy="130" r="15" className="fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/40" strokeWidth="1.4" />
        <text x="150" y="127" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200" fontSize="6.6" fontWeight="700">secondary</text>
        <text x="150" y="136" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200" fontSize="6.6" fontWeight="700">nucleus</text>
        <text x="150" y="108" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="8">2n</text>

        {/* fusion arrows */}
        <line x1="48" y1="40" x2="135" y2="40" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#repro-df-arrow)" />
        <line x1="48" y1="130" x2="133" y2="130" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#repro-df-arrow)" />

        {/* products (right) */}
        <line x1="166" y1="40" x2="232" y2="40" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#repro-df-arrow)" />
        <rect x="236" y="24" width="96" height="34" rx="7" className="fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/30" strokeWidth="1.6" />
        <text x="284" y="38" textAnchor="middle" className="fill-rose-800 dark:fill-rose-200" fontSize="9" fontWeight="700">Zygote (2n)</text>
        <text x="284" y="50" textAnchor="middle" className="fill-slate-500" fontSize="7">→ embryo</text>

        <line x1="166" y1="130" x2="232" y2="130" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#repro-df-arrow)" />
        <rect x="236" y="114" width="96" height="34" rx="7" className="fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/30" strokeWidth="1.6" />
        <text x="284" y="128" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200" fontSize="9" fontWeight="700">Endosperm (3n)</text>
        <text x="284" y="140" textAnchor="middle" className="fill-slate-500" fontSize="7">→ feeds embryo</text>

        {/* fusion labels */}
        <text x="92" y="34" textAnchor="middle" className="fill-slate-500" fontSize="6.6">n + n</text>
        <text x="90" y="124" textAnchor="middle" className="fill-slate-500" fontSize="6.6">n + 2n</text>

        <text x="170" y="190" textAnchor="middle" className="fill-slate-500" fontSize="8">Both gametes fuse — syngamy (2n zygote) + triple fusion (3n endosperm)</text>

        <defs>
          <marker id="repro-df-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
