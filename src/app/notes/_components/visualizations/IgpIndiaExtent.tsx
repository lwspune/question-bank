/**
 * India's locational extent: the latitudinal span (~8 N to 37 N, Tropic of
 * Cancer through the middle), the longitudinal span (~68 E to 97 E ~ 30 deg ~
 * 2 hours of sun-time), and the Standard Meridian (82.5 E) that fixes one
 * clock for the whole country. Schematic box, static SVG, server component.
 */
export default function IgpIndiaExtent() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 280"
        className="w-full"
        role="img"
        aria-label="India's extent shown as a box. North-south it spans about 8 degrees North to 37 degrees North, with the Tropic of Cancer at 23.5 North running through the middle. East-west it spans about 68 degrees East to 97 degrees East, roughly 30 degrees of longitude, which equals about two hours of sun-time, so sunrise reaches the eastern edge about two hours before the western edge. The Standard Meridian at 82.5 degrees East fixes a single clock for the whole country."
      >
        {/* extent box */}
        <rect x="70" y="40" width="280" height="190" rx="4" className="fill-emerald-50/60 stroke-emerald-700 dark:fill-emerald-950/30" strokeWidth="1.6" />

        {/* latitude labels (left) */}
        <text x="62" y="44" textAnchor="end" className="fill-slate-600 dark:fill-slate-200" fontSize="8">37 N</text>
        <text x="62" y="233" textAnchor="end" className="fill-slate-600 dark:fill-slate-200" fontSize="8">8 N</text>

        {/* Tropic of Cancer */}
        <line x1="70" y1="150" x2="350" y2="150" className="stroke-amber-600" strokeWidth="1.3" strokeDasharray="5 3" />
        <text x="356" y="153" className="fill-amber-700 dark:fill-amber-400" fontSize="7.5">Tropic of Cancer (23.5 N)</text>

        {/* longitude labels (top) */}
        <text x="70" y="32" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">68 E</text>
        <text x="350" y="32" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">97 E</text>

        {/* Standard Meridian 82.5 E — at ~ (82.5-68)/(97-68)=0.5 -> x = 70 + 0.5*280 = 210 */}
        <line x1="210" y1="40" x2="210" y2="230" className="stroke-indigo-600" strokeWidth="1.6" />
        <text x="210" y="248" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="8" fontWeight="600">Standard Meridian 82.5 E (IST)</text>

        {/* sun arrows: rises east first */}
        <text x="338" y="58" textAnchor="end" className="fill-rose-600 dark:fill-rose-400" fontSize="7.5" fontWeight="600">sunrise here first</text>
        <text x="82" y="58" className="fill-slate-500" fontSize="7.5">~2 hours later</text>
        <path d="M 330 64 L 90 64" className="stroke-rose-500" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#exarr)" />

        <text x="210" y="270" textAnchor="middle" className="fill-slate-500" fontSize="8">~30 deg of longitude = ~2 hours of sun-time (east to west)</text>

        <defs>
          <marker id="exarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
