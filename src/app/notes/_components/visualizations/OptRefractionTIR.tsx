/**
 * Refraction and total internal reflection — three rays leaving a point in a
 * denser medium (glass, below the boundary) at increasing angles of
 * incidence. Ray 1 refracts (bends away from the normal) into the rarer
 * medium. Ray 2 grazes the surface at exactly the critical angle. Ray 3,
 * past the critical angle, is totally internally reflected back into the
 * dense medium.
 *
 * Server component — static 2-D.
 */
export default function OptRefractionTIR() {
  const bx = 280; // x of the point on the boundary
  const by = 150; // boundary line y
  const depth = 95; // how deep the source sits below the boundary

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Refraction and total internal reflection — rays from a dense medium refracting, grazing at the critical angle, and being totally internally reflected past it"
      >
        <defs>
          <marker id="tir-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* rarer medium (top) + denser medium (bottom) tint */}
        <rect x={40} y={40} width={480} height={by - 40} className="fill-sky-100/40 dark:fill-sky-900/20" />
        <rect x={40} y={by} width={480} height={110} className="fill-indigo-100/50 dark:fill-indigo-900/30" />
        <text x={56} y={62} fontSize="11" className="fill-sky-800 dark:fill-sky-200">rarer medium (air)</text>
        <text x={56} y={by + 100} fontSize="11" className="fill-indigo-800 dark:fill-indigo-200">denser medium (glass)</text>

        {/* boundary + normal */}
        <line x1={40} y1={by} x2={520} y2={by} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2" />
        <line x1={bx} y1={50} x2={bx} y2={250} className="stroke-indigo-300/70" strokeWidth="1" strokeDasharray="4 4" />
        <text x={bx + 6} y={62} fontSize="10" className="fill-indigo-700 dark:fill-indigo-300">normal</text>

        {/* source point in the dense medium */}
        <circle cx={bx} cy={by + depth} r={3.5} className="fill-amber-600 dark:fill-amber-400" />

        {/* Ray 1: small incidence, refracts away from normal */}
        <line x1={bx} y1={by + depth} x2={bx - 55} y2={by} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <line x1={bx} y1={by} x2={bx + 95} y2={by - 70} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <text x={bx + 96} y={by - 74} fontSize="10" className="fill-emerald-700 dark:fill-emerald-300">refracts</text>

        {/* Ray 2: at the critical angle, grazes along the surface */}
        <line x1={bx} y1={by + depth} x2={bx - 95} y2={by} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <line x1={bx} y1={by} x2={bx + 120} y2={by} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <text x={bx + 122} y={by - 6} fontSize="10" className="fill-indigo-700 dark:fill-indigo-300">grazes (i = critical angle)</text>

        {/* Ray 3: past critical angle, totally internally reflected */}
        <line x1={bx} y1={by + depth} x2={bx - 130} y2={by + 22} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <line x1={bx} y1={by + 22} x2={bx + 130} y2={by + 22} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.8" markerEnd="url(#tir-arrow)" />
        <text x={bx + 132} y={by + 26} fontSize="10" className="fill-rose-700 dark:fill-rose-300">total internal reflection</text>

        <text x={280} y={285} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">Past the critical angle, all the light reflects back into the denser medium</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        TIR happens only when light goes from a denser to a rarer medium and the
        angle of incidence exceeds the critical angle. It powers optical fibres
        and the desert mirage.
      </p>
    </div>
  );
}
