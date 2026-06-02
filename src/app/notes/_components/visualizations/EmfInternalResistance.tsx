/**
 * A real cell — EMF ε with internal resistance r inside the dashed boundary —
 * driving current I through an external resistance R. Terminal voltage
 * V = ε − Ir is marked across the terminals.
 *
 * Server component — static.
 */
export default function EmfInternalResistance() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 240"
        className="w-full"
        role="img"
        aria-label="A cell of EMF epsilon with internal resistance r driving current through an external resistance R, with terminal voltage marked"
      >
        <defs>
          <marker id="emf-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* dashed cell boundary */}
        <rect x={40} y={60} width={200} height={120} rx={8} className="fill-amber-500/5 stroke-amber-600/70 dark:stroke-amber-400/70" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x={140} y={52} textAnchor="middle" fontSize="12" className="fill-amber-700 dark:fill-amber-300">real cell</text>

        {/* battery symbol (EMF) */}
        <line x1={90} y1={100} x2={90} y2={140} className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="3" />
        <line x1={110} y1={110} x2={110} y2={130} className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="6" />
        <text x={100} y={92} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-slate-800 dark:fill-slate-100">ε</text>

        {/* internal resistance r */}
        <line x1={110} y1={120} x2={150} y2={120} className="stroke-slate-500" strokeWidth="2" />
        <rect x={150} y={108} width={50} height={24} rx={4} className="fill-rose-500/15 stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" />
        <text x={175} y={124} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">r</text>

        {/* terminals + external circuit */}
        <line x1={90} y1={120} x2={90} y2={200} className="stroke-slate-500" strokeWidth="2" />
        <line x1={90} y1={200} x2={420} y2={200} className="stroke-slate-500" strokeWidth="2" markerEnd="url(#emf-arrow)" />
        <line x1={200} y1={120} x2={300} y2={120} className="stroke-slate-500" strokeWidth="2" />
        <line x1={300} y1={120} x2={300} y2={200} className="stroke-slate-500" strokeWidth="2" />

        {/* external R */}
        <rect x={268} y={140} width={64} height={28} rx={4} className="fill-indigo-500/15 stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />
        <text x={300} y={159} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-800 dark:fill-indigo-200">R</text>

        {/* current label */}
        <text x={250} y={193} textAnchor="middle" fontSize="12" className="fill-indigo-700 dark:fill-indigo-300">I = ε / (R + r)</text>

        {/* terminal voltage bracket */}
        <text x={430} y={150} fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">V = ε − Ir</text>
        <text x={430} y={168} fontSize="11" className="fill-slate-500">(terminal voltage)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Some EMF is lost across the internal resistance r, so the terminal
        voltage V = ε − Ir is a little less than the EMF whenever current flows.
      </p>
    </div>
  );
}
