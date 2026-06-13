/**
 * The three seismic-wave families and their particle motion: P-waves
 * (longitudinal compressions, fastest), S-waves (transverse, blocked by liquid),
 * and L/surface waves (rolling along the surface, slowest but most destructive).
 * Static SVG, server component.
 */
export default function EslSeismicWaveTypes() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 210"
        className="w-full"
        role="img"
        aria-label="Three seismic wave types. P-waves are longitudinal: particles compress and stretch along the direction of travel; they are fastest and travel through solids, liquids and gases. S-waves are transverse: particles move up and down at right angles to travel; they are slower and cannot pass through liquids. L or surface waves roll along the ground surface, are the slowest, and cause the most destruction."
      >
        {/* P wave: compressions */}
        <text x="10" y="30" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">P-wave</text>
        <text x="10" y="41" className="fill-slate-500" fontSize="6.5">longitudinal · fastest · through all</text>
        {Array.from({ length: 22 }).map((_, i) => {
          const dense = i % 6 < 2;
          const x = 150 + i * 11 + (dense ? 0 : 2);
          return <line key={i} x1={x} y1="22" x2={x} y2="46" className="stroke-indigo-500" strokeWidth={dense ? 2.2 : 1} />;
        })}
        <path d="M 150 56 L 400 56" className="stroke-slate-400" strokeWidth="0.8" markerEnd="url(#warr)" />

        {/* S wave: transverse */}
        <text x="10" y="100" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">S-wave</text>
        <text x="10" y="111" className="fill-slate-500" fontSize="6.5">transverse · NOT through liquid</text>
        <path d="M 150 100 Q 175 78 200 100 T 250 100 T 300 100 T 350 100 T 400 100" className="fill-none stroke-rose-500" strokeWidth="2" />
        <path d="M 150 116 L 400 116" className="stroke-slate-400" strokeWidth="0.8" markerEnd="url(#warr)" />

        {/* L wave: surface rolling */}
        <text x="10" y="170" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">L-wave</text>
        <text x="10" y="181" className="fill-slate-500" fontSize="6.5">surface · slowest · most destructive</text>
        <path d="M 150 168 q 12 -14 25 0 q 12 14 25 0 q 12 -14 25 0 q 12 14 25 0 q 12 -14 25 0 q 12 14 25 0 q 12 -14 25 0 q 12 14 25 0" className="fill-none stroke-amber-600" strokeWidth="2.4" />
        <text x="280" y="204" textAnchor="middle" className="fill-slate-500" fontSize="6.5">rolls along the ground surface</text>

        <defs>
          <marker id="warr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-400" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
