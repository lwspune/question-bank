/**
 * The four reaction shapes the NDA tests, as schematic equations: combination
 * (A + B -> AB), decomposition (AB -> A + B), displacement (A + BC -> AC + B),
 * and double displacement (AB + CD -> AD + CB). The shape of the equation, not
 * the specific chemicals, is what the bank asks you to classify. Static SVG.
 */
export default function RxnReactionTypes() {
  const rows = [
    { label: "Combination", lhs: ["A", "+", "B"], rhs: ["AB"] },
    { label: "Decomposition", lhs: ["AB"], rhs: ["A", "+", "B"] },
    { label: "Displacement", lhs: ["A", "+", "BC"], rhs: ["AC", "+", "B"] },
    { label: "Double displacement", lhs: ["AB", "+", "CD"], rhs: ["AD", "+", "CB"] },
  ];
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="The four reaction shapes. Combination: A plus B gives AB. Decomposition: AB breaks into A plus B. Displacement: A plus BC gives AC plus B. Double displacement: AB plus CD gives AD plus CB. The shape of the equation is what you classify.">
        <text x="160" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">The four reaction shapes</text>
        <defs>
          <marker id="rxnArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500 dark:fill-slate-300" /></marker>
        </defs>
        {rows.map((r, i) => {
          const y = 44 + i * 42;
          return (
            <g key={r.label}>
              <text x="16" y={y + 4} className="fill-indigo-600 dark:fill-indigo-300" fontSize="9" fontWeight="600">{r.label}</text>
              {/* LHS */}
              {r.lhs.map((t, j) => (
                <text key={`l${j}`} x={130 + j * 22} y={y + 4} textAnchor="middle" className={t === "+" ? "fill-slate-400" : "fill-slate-700 dark:fill-slate-100"} fontSize="12" fontWeight={t === "+" ? 400 : 700}>{t}</text>
              ))}
              {/* arrow */}
              <line x1={130 + r.lhs.length * 22 - 6} y1={y} x2={130 + r.lhs.length * 22 + 16} y2={y} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.3" markerEnd="url(#rxnArrow)" />
              {/* RHS */}
              {r.rhs.map((t, j) => (
                <text key={`r${j}`} x={130 + r.lhs.length * 22 + 34 + j * 24} y={y + 4} textAnchor="middle" className={t === "+" ? "fill-slate-400" : "fill-rose-600 dark:fill-rose-300"} fontSize="12" fontWeight={t === "+" ? 400 : 700}>{t}</text>
              ))}
            </g>
          );
        })}
        <text x="160" y="202" textAnchor="middle" className="fill-slate-500" fontSize="8">Classify by the SHAPE — same atoms, rearranged differently.</text>
      </svg>
    </div>
  );
}
