/**
 * Pascal's principle — a hydraulic press. A small force on the small piston
 * (area A1) produces a large force on the big piston (area A2) because the
 * pressure F/A is the same throughout the enclosed liquid: F1/A1 = F2/A2.
 *
 * Server component — static 2-D.
 */
export default function PascalHydraulicPress() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="A hydraulic press: a small force on a narrow piston lifts a large load on a wide piston through an enclosed liquid"
      >
        <defs>
          <marker id="pa-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* enclosed liquid — U-shaped vessel */}
        <path
          d="M 110 130 L 110 250 L 450 250 L 450 110 L 390 110 L 390 200 L 170 200 L 170 130 Z"
          className="fill-sky-400/25 stroke-sky-700 dark:stroke-sky-300"
          strokeWidth="2"
        />

        {/* small piston (left, narrow) */}
        <rect x={110} y={118} width={60} height={14} className="fill-slate-500/60 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />
        <line x1={140} y1={70} x2={140} y2={114} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.6" markerEnd="url(#pa-arrow)" />
        <text x={140} y={62} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">F₁ (small)</text>
        <text x={140} y={150} textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-200">A₁</text>

        {/* big piston (right, wide) */}
        <rect x={390} y={98} width={60} height={14} className="fill-slate-500/60 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />
        {/* load on top */}
        <rect x={400} y={56} width={40} height={38} className="fill-amber-400/40 stroke-amber-700 dark:stroke-amber-300" strokeWidth="1.5" />
        <line x1={420} y1={50} x2={420} y2={20} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.6" markerEnd="url(#pa-arrow)" />
        <text x={420} y={16} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">F₂ (large)</text>
        <text x={420} y={132} textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-200">A₂</text>

        <text x={280} y={290} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">Same pressure everywhere: F₁/A₁ = F₂/A₂</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Pressure applied to an enclosed liquid is transmitted undiminished to every
        point. A wider output piston multiplies the force by the area ratio A₂/A₁.
      </p>
    </div>
  );
}
