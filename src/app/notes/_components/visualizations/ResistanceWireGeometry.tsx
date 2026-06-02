/**
 * Resistance and geometry — R = ρL/A. A short, thick wire (low resistance)
 * vs a long, thin wire (high resistance), same material. Reinforces R ∝ L and
 * R ∝ 1/A.
 *
 * Server component — static.
 */
export default function ResistanceWireGeometry() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 230"
        className="w-full"
        role="img"
        aria-label="A short thick wire with low resistance compared to a long thin wire with high resistance"
      >
        {/* short, thick wire */}
        <rect x={70} y={40} width={180} height={40} rx={6} className="fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
        <line x1={70} y1={100} x2={250} y2={100} className="stroke-slate-400" strokeWidth="1" />
        <text x={160} y={116} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">length L</text>
        <text x={40} y={64} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-300">area</text>
        <text x={40} y={77} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-300">A</text>
        <text x={160} y={28} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">short + thick → LOW R</text>

        {/* long, thin wire */}
        <rect x={70} y={150} width={420} height={16} rx={4} className="fill-rose-500/25 stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" />
        <line x1={70} y1={184} x2={490} y2={184} className="stroke-slate-400" strokeWidth="1" />
        <text x={280} y={200} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">length 2L (thinner area A/2)</text>
        <text x={280} y={140} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">long + thin → HIGH R</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        R = ρL/A — resistance grows with length and falls with cross-sectional
        area. Stretching keeps volume fixed: longer ⟹ thinner ⟹ R ∝ L².
      </p>
    </div>
  );
}
