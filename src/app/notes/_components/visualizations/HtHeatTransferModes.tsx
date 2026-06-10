/**
 * The three modes of heat transfer shown side by side: conduction (heat
 * passing molecule-to-molecule along a solid rod), convection (a circulating
 * current in a heated fluid), and radiation (straight rays from a hot source
 * crossing empty space). Reinforces "only radiation needs no medium".
 *
 * Server component — static 2-D.
 */
export default function HtHeatTransferModes() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 660 240"
        className="w-full"
        role="img"
        aria-label="Three modes of heat transfer: conduction along a solid rod, convection currents in a heated fluid, and radiation rays across empty space"
      >
        <defs>
          <marker id="ht-arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* ---- Conduction ---- */}
        <text x="100" y="24" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-indigo-800 dark:fill-indigo-200">Conduction</text>
        {/* flame */}
        <path d="M30 150 q8 -22 16 0 q8 -18 0 16 q-8 8 -16 0 q-8 -18 0 -16 z" className="fill-rose-500/70" />
        {/* rod */}
        <rect x="46" y="120" width="120" height="22" rx="4" className="fill-slate-400/40 stroke-slate-500" strokeWidth="1.5" />
        {/* molecules vibrating in place */}
        {[60, 85, 110, 135, 158].map((x) => (
          <circle key={x} cx={x} cy={131} r="5" className="fill-indigo-500/70" />
        ))}
        {/* heat-flow arrow along rod */}
        <line x1="56" y1="155" x2="160" y2="155" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" markerEnd="url(#ht-arr)" />
        <text x="100" y="186" textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-300">solid — molecules vibrate in place</text>
        <text x="100" y="202" textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-300">needs a medium</text>

        {/* ---- Convection ---- */}
        <text x="330" y="24" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-indigo-800 dark:fill-indigo-200">Convection</text>
        {/* container of fluid */}
        <rect x="278" y="60" width="104" height="100" rx="4" className="fill-sky-400/20 stroke-sky-600" strokeWidth="1.5" />
        {/* circulation loop: up the middle, down the sides */}
        <path d="M330 150 C 360 110, 360 90, 330 70" className="fill-none stroke-rose-500/80" strokeWidth="2" markerEnd="url(#ht-arr)" />
        <path d="M330 70 C 300 90, 300 110, 330 150" className="fill-none stroke-sky-600/80" strokeWidth="2" markerEnd="url(#ht-arr)" />
        {/* flame under container */}
        <path d="M322 178 q8 -22 16 0 q8 -18 0 16 q-8 8 -16 0 q-8 -18 0 -16 z" className="fill-rose-500/70" />
        <text x="330" y="200" textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-300">fluid rises hot, sinks cool</text>

        {/* ---- Radiation ---- */}
        <text x="560" y="24" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-indigo-800 dark:fill-indigo-200">Radiation</text>
        {/* sun */}
        <circle cx="510" cy="110" r="22" className="fill-amber-400/80 stroke-amber-600" strokeWidth="1.5" />
        {/* straight rays to a body */}
        {[-18, 0, 18].map((dy) => (
          <line key={dy} x1="534" y1={110 + dy * 0.6} x2="600" y2={110 + dy} className="stroke-rose-500/80" strokeWidth="2" markerEnd="url(#ht-arr)" />
        ))}
        {/* receiving body */}
        <rect x="604" y="92" width="20" height="36" rx="3" className="fill-slate-500/40 stroke-slate-600" strokeWidth="1.5" />
        <text x="560" y="186" textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-300">EM waves — no medium needed</text>
        <text x="560" y="202" textAnchor="middle" fontSize="11" className="fill-slate-700 dark:fill-slate-300">travels at speed of light</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Conduction and convection both require matter to carry the heat; only
        radiation crosses a vacuum, which is how the Sun warms the Earth.
      </p>
    </div>
  );
}
