/**
 * Gas exchange at an alveolus: a thin-walled air sac wrapped in a blood
 * capillary. Oxygen diffuses from the alveolar air into the blood; carbon
 * dioxide diffuses out. Only the alveoli exchange gas — bronchi just conduct.
 * Static SVG.
 */
export default function HpAlveolusGasExchange() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 190" className="w-full" role="img" aria-label="An alveolus wrapped by a blood capillary: oxygen diffuses from the air inside the thin-walled alveolus into the blood, while carbon dioxide diffuses from the blood into the alveolus to be breathed out.">
        {/* alveolus sac */}
        <circle cx="100" cy="95" r="62" className="fill-sky-100/50 stroke-sky-600 dark:fill-sky-950/40" strokeWidth="2" />
        <text x="100" y="95" textAnchor="middle" className="fill-sky-700 dark:fill-sky-200" fontSize="11" fontWeight="600">Alveolus</text>
        <text x="100" y="110" textAnchor="middle" className="fill-slate-500" fontSize="8">(thin wall, air)</text>
        {/* capillary wrapping right edge */}
        <path d="M 156 50 C 200 70, 200 120, 156 140" className="fill-none stroke-rose-500" strokeWidth="7" strokeLinecap="round" />
        <text x="205" y="98" className="fill-rose-600 dark:fill-rose-300" fontSize="9" fontWeight="600">Blood</text>
        <text x="205" y="111" className="fill-rose-600 dark:fill-rose-300" fontSize="9" fontWeight="600">capillary</text>
        {/* O2 in */}
        <line x1="150" y1="80" x2="178" y2="80" className="stroke-emerald-600" strokeWidth="1.8" markerEnd="url(#hp-gas-in)" />
        <text x="124" y="76" className="fill-emerald-700 dark:fill-emerald-300" fontSize="9" fontWeight="600">O&#8322;</text>
        {/* CO2 out */}
        <line x1="178" y1="112" x2="150" y2="112" className="stroke-slate-600" strokeWidth="1.8" markerEnd="url(#hp-gas-out)" />
        <text x="158" y="128" className="fill-slate-600 dark:fill-slate-300" fontSize="9" fontWeight="600">CO&#8322;</text>
        <defs>
          <marker id="hp-gas-in" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-emerald-600" />
          </marker>
          <marker id="hp-gas-out" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-600" />
          </marker>
        </defs>
        <text x="150" y="180" textAnchor="middle" className="fill-slate-500" fontSize="8">Gas exchange happens ONLY here — not in the bronchi.</text>
      </svg>
    </div>
  );
}
