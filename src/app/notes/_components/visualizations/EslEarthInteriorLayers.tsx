/**
 * Cross-section of the Earth's concentric layers — crust, mantle, outer core,
 * inner core — with the named discontinuities (Moho, Gutenberg, Lehmann) marked
 * on a radial cutaway. Static SVG, server component.
 */
export default function EslEarthInteriorLayers() {
  const cx = 150;
  const cy = 150;
  // radii from surface inward
  const rCrust = 130; // surface
  const rMantle = 120; // Moho
  const rOuter = 70; // Gutenberg (mantle / outer core)
  const rInner = 32; // Lehmann (outer / inner core)
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 300"
        className="w-full"
        role="img"
        aria-label="Cutaway of the Earth showing concentric shells: a thin crust at the surface, a thick silicate mantle below it, a liquid outer core, and a solid inner core at the centre. The Mohorovicic discontinuity separates crust from mantle, the Gutenberg discontinuity separates mantle from the liquid outer core, and the Lehmann discontinuity separates the outer core from the solid inner core."
      >
        {/* layers, outer to inner */}
        <circle cx={cx} cy={cy} r={rCrust} className="fill-amber-200/70 stroke-amber-700 dark:fill-amber-900/40" strokeWidth="1.4" />
        <circle cx={cx} cy={cy} r={rMantle} className="fill-orange-300/70 stroke-orange-700 dark:fill-orange-900/50" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rOuter} className="fill-rose-400/70 stroke-rose-700 dark:fill-rose-900/60" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rInner} className="fill-yellow-300/90 stroke-yellow-700 dark:fill-yellow-700/70" strokeWidth="1" />

        {/* layer labels inside */}
        <text x={cx} y={cy + 2} textAnchor="middle" className="fill-slate-800 dark:fill-slate-900" fontSize="7.5" fontWeight="700">Inner core</text>
        <text x={cx} y={cy + 11} textAnchor="middle" className="fill-slate-800 dark:fill-slate-900" fontSize="6">SOLID Fe-Ni</text>
        <text x={cx} y={cy - 48} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Outer core</text>
        <text x={cx} y={cy - 39} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6">LIQUID Fe-Ni</text>
        <text x={cx} y={cy - 98} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Mantle</text>

        {/* leader lines + discontinuity labels on the right */}
        <line x1={cx} y1={cy - rMantle} x2="320" y2="44" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2 2" />
        <text x="324" y="47" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Moho — crust / mantle</text>
        <line x1={cx + 60} y1={cy - 35} x2="320" y2="150" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2 2" />
        <text x="324" y="153" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Gutenberg — mantle / outer core</text>
        <line x1={cx + 22} y1={cy - 24} x2="320" y2="210" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2 2" />
        <text x="324" y="213" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="600">Lehmann — outer / inner core</text>

        <text x={cx} y={cy - rCrust - 6} textAnchor="middle" className="fill-slate-500" fontSize="7.5">Crust (thin skin)</text>
        <text x="60" y="288" className="fill-slate-500" fontSize="8">Lithosphere = crust + uppermost solid mantle</text>
      </svg>
    </div>
  );
}
