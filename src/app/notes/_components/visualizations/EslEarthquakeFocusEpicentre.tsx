/**
 * Earthquake geometry: the focus (hypocentre) is the rupture point underground;
 * the epicentre is the surface point directly above it; seismic waves radiate
 * outward from the focus. Static SVG, server component.
 */
export default function EslEarthquakeFocusEpicentre() {
  const focusX = 170;
  const focusY = 150;
  const epiX = 170;
  const epiY = 70;
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 380 210"
        className="w-full"
        role="img"
        aria-label="Side view of an earthquake. The focus or hypocentre is the rupture point deep underground where energy is released. The epicentre is the point on the ground surface directly above the focus, where shaking is strongest. Seismic waves spread outward in circles from the focus."
      >
        {/* ground */}
        <rect x="20" y="70" width="340" height="120" className="fill-amber-200/50 stroke-amber-700/60 dark:fill-amber-900/30" strokeWidth="1" />
        <line x1="20" y1="70" x2="360" y2="70" className="stroke-emerald-700" strokeWidth="2" />
        <text x="30" y="64" className="fill-slate-500" fontSize="7">surface</text>

        {/* radiating wavefronts from focus */}
        {[18, 34, 50, 66].map((r) => (
          <circle key={r} cx={focusX} cy={focusY} r={r} className="fill-none stroke-rose-500/50" strokeWidth="1" strokeDasharray="3 3" />
        ))}

        {/* focus */}
        <circle cx={focusX} cy={focusY} r="5" className="fill-rose-600 stroke-rose-800" strokeWidth="1" />
        <text x={focusX + 12} y={focusY + 3} className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Focus (hypocentre)</text>
        <text x={focusX + 12} y={focusY + 14} className="fill-slate-500" fontSize="6.5">energy released here, underground</text>

        {/* vertical line focus->epicentre */}
        <line x1={focusX} y1={focusY} x2={epiX} y2={epiY} className="stroke-slate-500" strokeWidth="1.2" strokeDasharray="2 2" />

        {/* epicentre */}
        <circle cx={epiX} cy={epiY} r="4.5" className="fill-indigo-600 stroke-indigo-800" strokeWidth="1" />
        <text x={epiX + 12} y={epiY - 4} className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Epicentre</text>
        <text x={epiX + 12} y={epiY + 6} className="fill-slate-500" fontSize="6.5">surface point above the focus</text>

        <text x="190" y="205" textAnchor="middle" className="fill-slate-500" fontSize="7">Shallow focus → less distance to surface → more damage</text>
      </svg>
    </div>
  );
}
