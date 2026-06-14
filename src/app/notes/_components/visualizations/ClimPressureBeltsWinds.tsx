/**
 * Global pressure belts and planetary winds shown on a pole-to-pole strip:
 * the equatorial low (doldrums), the subtropical highs near 30 degrees, the
 * subpolar lows near 60 degrees and the polar highs — with the trade winds and
 * westerlies blowing out of the subtropical highs toward the lows. Static SVG,
 * server component.
 */
export default function ClimPressureBeltsWinds() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 280"
        className="w-full"
        role="img"
        aria-label="The global pressure belts from the North Pole to the South Pole. At the equator is a low-pressure belt called the doldrums where hot air rises. Near thirty degrees north and south are subtropical high-pressure belts where air sinks. Near sixty degrees are subpolar low-pressure belts, and at the poles are polar highs. Winds blow out of the subtropical highs: trade winds blow toward the equatorial low and westerlies blow toward the subpolar lows."
      >
        {/* vertical axis with latitude bands */}
        <line x1="120" y1="20" x2="120" y2="260" className="stroke-slate-400" strokeWidth="1" />

        {/* belts as coloured bars: H = high (blue), L = low (red) */}
        {/* Polar high N */}
        <rect x="90" y="24" width="60" height="20" className="fill-sky-300/70 stroke-sky-700" strokeWidth="0.8" />
        <text x="200" y="38" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Polar High (90 N)</text>
        {/* Subpolar low N */}
        <rect x="90" y="64" width="60" height="20" className="fill-rose-300/70 stroke-rose-700" strokeWidth="0.8" />
        <text x="200" y="78" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Subpolar Low (60 N)</text>
        {/* Subtropical high N */}
        <rect x="90" y="104" width="60" height="20" className="fill-sky-300/70 stroke-sky-700" strokeWidth="0.8" />
        <text x="200" y="118" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Subtropical High (30 N)</text>
        {/* Equatorial low */}
        <rect x="90" y="138" width="60" height="22" className="fill-rose-400/80 stroke-rose-700" strokeWidth="0.8" />
        <text x="200" y="153" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="700">Equatorial Low (doldrums)</text>
        {/* Subtropical high S */}
        <rect x="90" y="174" width="60" height="20" className="fill-sky-300/70 stroke-sky-700" strokeWidth="0.8" />
        <text x="200" y="188" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Subtropical High (30 S)</text>
        {/* Subpolar low S */}
        <rect x="90" y="214" width="60" height="20" className="fill-rose-300/70 stroke-rose-700" strokeWidth="0.8" />
        <text x="200" y="228" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Subpolar Low (60 S)</text>
        {/* Polar high S */}
        <rect x="90" y="246" width="60" height="14" className="fill-sky-300/70 stroke-sky-700" strokeWidth="0.8" />
        <text x="200" y="257" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Polar High (90 S)</text>

        {/* wind arrows out of subtropical high N */}
        <path d="M 80 116 L 60 132" className="stroke-emerald-600" strokeWidth="1.6" markerEnd="url(#parr)" />
        <text x="20" y="138" className="fill-emerald-700 dark:fill-emerald-400" fontSize="7" fontWeight="600">Trades</text>
        <path d="M 80 112 L 62 94" className="stroke-amber-600" strokeWidth="1.6" markerEnd="url(#parr)" />
        <text x="14" y="90" className="fill-amber-700 dark:fill-amber-400" fontSize="7" fontWeight="600">Westerlies</text>

        {/* wind arrows out of subtropical high S */}
        <path d="M 80 182 L 60 166" className="stroke-emerald-600" strokeWidth="1.6" markerEnd="url(#parr)" />
        <text x="20" y="170" className="fill-emerald-700 dark:fill-emerald-400" fontSize="7" fontWeight="600">Trades</text>
        <path d="M 80 186 L 62 204" className="stroke-amber-600" strokeWidth="1.6" markerEnd="url(#parr)" />
        <text x="14" y="212" className="fill-amber-700 dark:fill-amber-400" fontSize="7" fontWeight="600">Westerlies</text>

        <text x="118" y="14" textAnchor="middle" className="fill-slate-500" fontSize="7">N Pole</text>
        <text x="118" y="274" textAnchor="middle" className="fill-slate-500" fontSize="7">S Pole</text>

        <defs>
          <marker id="parr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
