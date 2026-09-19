/**
 * Simplifying a switching circuit — the second half of the switch-circuit skill.
 *
 * Left: the printed circuit, two parallel branches (S₁ and S₂ in series) and
 * (S₁ and S₃ in series). Right: the same circuit after factoring, S₁ in series
 * with the parallel pair S₂, S₃. The algebra between them is the distributive
 * law, and the point of the picture is that a circuit redraw IS a simplification.
 *
 * This exact pair is a recurring MHT-CET item: the paper prints five circuits
 * and asks which two are equivalent, and (p∧q)∨(p∧r) with p∧(q∨r) is the
 * answer almost every time it appears.
 *
 * Server component — static.
 */
export default function LogicCircuitSimplification() {
  const wire = "stroke-slate-500";

  const switchSym = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <circle cx={x} cy={y} r={3} className="fill-slate-600 dark:fill-slate-300" />
      <line
        x1={x}
        y1={y}
        x2={x + 26}
        y2={y - 13}
        className="stroke-indigo-600 dark:stroke-indigo-400"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx={x + 34} cy={y} r={3} className="fill-slate-600 dark:fill-slate-300" />
      <text
        x={x + 17}
        y={y + 19}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="fill-indigo-800 dark:fill-indigo-200"
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 700 250"
        className="w-full"
        role="img"
        aria-label="A circuit with S1 repeated in two parallel branches redrawn as S1 in series with S2 parallel S3"
      >
        {/* ---------------- BEFORE ---------------- */}
        <text x={16} y={22} fontSize="12" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          As printed
        </text>

        <line x1={20} y1={120} x2={60} y2={120} className={wire} strokeWidth="2" />
        <line x1={60} y1={70} x2={60} y2={170} className={wire} strokeWidth="2" />

        {/* upper branch: S1 then S2 */}
        <line x1={60} y1={70} x2={78} y2={70} className={wire} strokeWidth="2" />
        {switchSym(78, 70, "S₁", "u1")}
        <line x1={112} y1={70} x2={140} y2={70} className={wire} strokeWidth="2" />
        {switchSym(140, 70, "S₂", "u2")}
        <line x1={174} y1={70} x2={210} y2={70} className={wire} strokeWidth="2" />

        {/* lower branch: S1 then S3 */}
        <line x1={60} y1={170} x2={78} y2={170} className={wire} strokeWidth="2" />
        {switchSym(78, 170, "S₁", "d1")}
        <line x1={112} y1={170} x2={140} y2={170} className={wire} strokeWidth="2" />
        {switchSym(140, 170, "S₃", "d2")}
        <line x1={174} y1={170} x2={210} y2={170} className={wire} strokeWidth="2" />

        <line x1={210} y1={70} x2={210} y2={170} className={wire} strokeWidth="2" />
        <line x1={210} y1={120} x2={250} y2={120} className={wire} strokeWidth="2" />

        <text x={135} y={215} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-slate-700 dark:fill-slate-200">
          (p ∧ q) ∨ (p ∧ r)
        </text>
        <text x={135} y={234} textAnchor="middle" fontSize="10" className="fill-slate-500">
          S₁ appears twice
        </text>

        {/* ---------------- ARROW ---------------- */}
        <line x1={278} y1={120} x2={372} y2={120} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
        <path d="M372 120 l -10 -6 l 0 12 z" className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={325} y={108} textAnchor="middle" fontSize="11" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">
          distributive
        </text>
        <text x={325} y={142} textAnchor="middle" fontSize="10" className="fill-slate-500">
          factor out S₁
        </text>

        {/* ---------------- AFTER ---------------- */}
        <text x={400} y={22} fontSize="12" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Simplified
        </text>

        <line x1={400} y1={120} x2={425} y2={120} className={wire} strokeWidth="2" />
        {switchSym(425, 120, "S₁", "s1")}
        <line x1={459} y1={120} x2={495} y2={120} className={wire} strokeWidth="2" />

        {/* parallel pair S2 / S3 */}
        <line x1={495} y1={70} x2={495} y2={170} className={wire} strokeWidth="2" />
        <line x1={495} y1={70} x2={513} y2={70} className={wire} strokeWidth="2" />
        {switchSym(513, 70, "S₂", "s2")}
        <line x1={547} y1={70} x2={585} y2={70} className={wire} strokeWidth="2" />
        <line x1={495} y1={170} x2={513} y2={170} className={wire} strokeWidth="2" />
        {switchSym(513, 170, "S₃", "s3")}
        <line x1={547} y1={170} x2={585} y2={170} className={wire} strokeWidth="2" />
        <line x1={585} y1={70} x2={585} y2={170} className={wire} strokeWidth="2" />
        <line x1={585} y1={120} x2={625} y2={120} className={wire} strokeWidth="2" />

        <text x={512} y={215} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">
          p ∧ (q ∨ r)
        </text>
        <text x={512} y={234} textAnchor="middle" fontSize="10" className="fill-slate-500">
          one switch fewer
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Both circuits are closed in exactly the same cases, so they are
        equivalent — and the right-hand one uses three switches instead of four.
        Simplify the expression first, then draw the circuit the answer describes.
      </p>
    </div>
  );
}
