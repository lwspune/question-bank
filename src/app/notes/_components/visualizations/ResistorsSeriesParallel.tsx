/**
 * Series vs parallel resistor schematic — top: two resistors in series
 * (R = R₁ + R₂); bottom: two resistors in parallel (1/R = 1/R₁ + 1/R₂).
 * Box symbols for clarity at small size.
 *
 * Server component — static.
 */
export default function ResistorsSeriesParallel() {
  const box = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={64} height={26} rx={4} className="fill-indigo-500/15 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />
      <text x={x + 32} y={y + 18} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-800 dark:fill-indigo-200">{label}</text>
    </g>
  );

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 250"
        className="w-full"
        role="img"
        aria-label="Two resistors in series compared with two resistors in parallel"
      >
        {/* ---- SERIES ---- */}
        <text x={40} y={30} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">Series</text>
        <line x1={40} y1={60} x2={120} y2={60} className="stroke-slate-500" strokeWidth="2" />
        {box(120, 47, "R₁", "s1")}
        <line x1={184} y1={60} x2={264} y2={60} className="stroke-slate-500" strokeWidth="2" />
        {box(264, 47, "R₂", "s2")}
        <line x1={328} y1={60} x2={420} y2={60} className="stroke-slate-500" strokeWidth="2" />
        <text x={470} y={64} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">R₁+R₂</text>
        <text x={232} y={92} textAnchor="middle" fontSize="11" className="fill-slate-500">same current through both</text>

        {/* ---- PARALLEL ---- */}
        <text x={40} y={150} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">Parallel</text>
        <line x1={40} y1={185} x2={120} y2={185} className="stroke-slate-500" strokeWidth="2" />
        {/* split */}
        <line x1={120} y1={160} x2={120} y2={210} className="stroke-slate-500" strokeWidth="2" />
        <line x1={120} y1={160} x2={150} y2={160} className="stroke-slate-500" strokeWidth="2" />
        <line x1={120} y1={210} x2={150} y2={210} className="stroke-slate-500" strokeWidth="2" />
        {box(150, 147, "R₁", "p1")}
        {box(150, 197, "R₂", "p2")}
        <line x1={214} y1={160} x2={244} y2={160} className="stroke-slate-500" strokeWidth="2" />
        <line x1={214} y1={210} x2={244} y2={210} className="stroke-slate-500" strokeWidth="2" />
        <line x1={244} y1={160} x2={244} y2={210} className="stroke-slate-500" strokeWidth="2" />
        <line x1={244} y1={185} x2={340} y2={185} className="stroke-slate-500" strokeWidth="2" />
        <text x={430} y={189} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">R₁R₂/(R₁+R₂)</text>
        <text x={182} y={236} textAnchor="middle" fontSize="11" className="fill-slate-500">same voltage across both</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Series adds (always larger); parallel combines by reciprocals (always
        smaller than the smallest branch). Reduce a network innermost-group first.
      </p>
    </div>
  );
}
