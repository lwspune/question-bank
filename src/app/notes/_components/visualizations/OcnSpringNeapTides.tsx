/**
 * Spring vs neap tide geometry. On the left, Sun, Earth and Moon are in a
 * straight line (syzygy — new or full Moon), so their pulls add and the tidal
 * bulges are large: a SPRING tide. On the right, the Moon is at right angles
 * to the Sun (quadrature — first/third quarter Moon), so the pulls partly
 * cancel and the bulges are small: a NEAP tide. Static SVG, server component.
 */
export default function OcnSpringNeapTides() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 240"
        className="w-full"
        role="img"
        aria-label="Two diagrams. On the left, a SPRING tide: the Sun, the Earth and the Moon lie on one straight line, so the gravitational pulls of the Sun and Moon add together and the ocean is stretched into large high tides. On the right, a NEAP tide: the Moon sits at right angles to the Sun as seen from Earth, so the two pulls partly cancel and the tides are small."
      >
        {/* ---- LEFT: SPRING TIDE ---- */}
        <text x="140" y="18" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">SPRING TIDE</text>
        <text x="140" y="30" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Sun, Earth, Moon in a line (syzygy)</text>

        {/* sun */}
        <circle cx="30" cy="120" r="14" className="fill-yellow-400/90 stroke-yellow-700" strokeWidth="1" />
        <text x="30" y="145" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">Sun</text>

        {/* earth + large bulge (ellipse along the line) */}
        <ellipse cx="150" cy="120" rx="36" ry="22" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-800/50" strokeWidth="1" />
        <circle cx="150" cy="120" r="16" className="fill-emerald-400/80 stroke-emerald-700" strokeWidth="1" />
        <text x="150" y="123" textAnchor="middle" className="fill-slate-700 dark:fill-slate-900" fontSize="6.5" fontWeight="600">Earth</text>
        <text x="150" y="155" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="6.5" fontWeight="700">large bulges</text>

        {/* moon */}
        <circle cx="250" cy="120" r="8" className="fill-slate-300 stroke-slate-600 dark:fill-slate-500" strokeWidth="1" />
        <text x="250" y="142" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">Moon</text>

        {/* alignment line */}
        <line x1="44" y1="120" x2="242" y2="120" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* divider */}
        <line x1="300" y1="40" x2="300" y2="220" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />

        {/* ---- RIGHT: NEAP TIDE ---- */}
        <text x="430" y="18" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">NEAP TIDE</text>
        <text x="430" y="30" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Moon at right angles to Sun (quadrature)</text>

        {/* sun */}
        <circle cx="340" cy="130" r="14" className="fill-yellow-400/90 stroke-yellow-700" strokeWidth="1" />
        <text x="340" y="155" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">Sun</text>

        {/* earth + small bulge (smaller ellipse) */}
        <ellipse cx="450" cy="130" rx="26" ry="20" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-800/50" strokeWidth="1" />
        <circle cx="450" cy="130" r="16" className="fill-emerald-400/80 stroke-emerald-700" strokeWidth="1" />
        <text x="450" y="133" textAnchor="middle" className="fill-slate-700 dark:fill-slate-900" fontSize="6.5" fontWeight="600">Earth</text>
        <text x="450" y="168" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="6.5" fontWeight="700">small bulges</text>

        {/* moon above (right angle) */}
        <circle cx="450" cy="55" r="8" className="fill-slate-300 stroke-slate-600 dark:fill-slate-500" strokeWidth="1" />
        <text x="450" y="48" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">Moon</text>

        {/* the two pulls at right angles */}
        <line x1="354" y1="130" x2="434" y2="130" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="450" y1="65" x2="450" y2="114" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}
