/**
 * The four levels of protein structure as a left-to-right progression:
 * primary (a bead chain of amino acids) → secondary (a coiled helix) →
 * tertiary (one folded chain) → quaternary (several folded chains together).
 * Static SVG.
 */
export default function BiochemProteinStructureLevels() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 150"
        className="w-full"
        role="img"
        aria-label="Four levels of protein structure shown left to right: primary is a linear bead chain of amino acids joined by peptide bonds; secondary is a coiled alpha-helix; tertiary is a single folded chain; quaternary is several folded chains assembled together."
      >
        {/* PRIMARY — bead chain */}
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              {i < 4 && (
                <line x1={20 + i * 14} y1={50} x2={34 + i * 14} y2={50} className="stroke-slate-400" strokeWidth="1.5" />
              )}
              <circle cx={20 + i * 14} cy={50} r="6" className="fill-emerald-200/80 stroke-emerald-600 dark:fill-emerald-900/50" strokeWidth="1.4" />
            </g>
          ))}
          <text x={48} y={92} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="9" fontWeight="700">Primary</text>
          <text x={48} y={104} textAnchor="middle" className="fill-slate-500" fontSize="7">amino-acid sequence</text>
          <text x={48} y={114} textAnchor="middle" className="fill-slate-500" fontSize="7">(peptide bonds)</text>
        </g>

        {/* SECONDARY — helix */}
        <g>
          <path d="M138 30 q12 8 0 16 q-12 8 0 16 q12 8 0 16 q-12 8 0 16" fill="none" className="stroke-sky-600" strokeWidth="3" />
          <text x={150} y={92} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="9" fontWeight="700">Secondary</text>
          <text x={150} y={104} textAnchor="middle" className="fill-slate-500" fontSize="7">α-helix / β-sheet</text>
          <text x={150} y={114} textAnchor="middle" className="fill-slate-500" fontSize="7">(hydrogen bonds)</text>
        </g>

        {/* TERTIARY — one folded chain */}
        <g>
          <path d="M232 38 q26 -6 26 14 q0 18 -20 14 q-20 -4 -8 14 q12 16 26 6" fill="none" className="stroke-amber-600" strokeWidth="3" strokeLinecap="round" />
          <text x={250} y={92} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="9" fontWeight="700">Tertiary</text>
          <text x={250} y={104} textAnchor="middle" className="fill-slate-500" fontSize="7">3-D fold of</text>
          <text x={250} y={114} textAnchor="middle" className="fill-slate-500" fontSize="7">one chain</text>
        </g>

        {/* QUATERNARY — several folded chains */}
        <g>
          {[
            { dx: 0, dy: 0, c: "fill-rose-200/80 stroke-rose-600 dark:fill-rose-900/50" },
            { dx: 22, dy: 6, c: "fill-violet-200/80 stroke-violet-600 dark:fill-violet-900/50" },
            { dx: 6, dy: 24, c: "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/50" },
            { dx: 26, dy: 26, c: "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/50" },
          ].map((b, i) => (
            <circle key={i} cx={350 + b.dx} cy={36 + b.dy} r="11" className={b.c} strokeWidth="1.4" />
          ))}
          <text x={372} y={92} textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="9" fontWeight="700">Quaternary</text>
          <text x={372} y={104} textAnchor="middle" className="fill-slate-500" fontSize="7">several chains</text>
          <text x={372} y={114} textAnchor="middle" className="fill-slate-500" fontSize="7">(e.g. haemoglobin)</text>
        </g>

        {/* arrows between stages */}
        {[96, 192, 296].map((x, i) => (
          <line key={i} x1={x} y1={50} x2={x + 14} y2={50} className="stroke-slate-400" strokeWidth="1.5" markerEnd="url(#biochem-prot-arrow)" />
        ))}
        <defs>
          <marker id="biochem-prot-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-400" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
