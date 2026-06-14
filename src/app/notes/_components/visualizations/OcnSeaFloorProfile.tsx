/**
 * Cross-section profile of the ocean floor from the shoreline outward:
 * continental shelf, continental slope, continental rise, the deep abyssal
 * plain, an oceanic trench at a subduction edge, and a mid-ocean ridge rising
 * from the basin floor. Static SVG, server component.
 */
export default function OcnSeaFloorProfile() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 230"
        className="w-full"
        role="img"
        aria-label="A profile of the ocean floor from land on the left to deep ocean on the right. A gently sloping continental shelf runs out from the coast, then drops steeply down the continental slope, eases onto the continental rise, and flattens into the broad deep abyssal plain. A narrow, very deep oceanic trench cuts into the floor, and a mid-ocean ridge rises from the abyssal plain. The sea surface is at the top."
      >
        {/* sea body */}
        <rect x="0" y="0" width="560" height="200" className="fill-sky-200/50 dark:fill-sky-950/30" />
        <text x="280" y="16" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="8" fontWeight="600">SEA SURFACE</text>

        {/* land block (left) */}
        <polygon points="0,90 70,90 70,200 0,200" className="fill-amber-200/80 stroke-amber-700 dark:fill-amber-900/50" strokeWidth="1" />
        <text x="32" y="80" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="7.5" fontWeight="600">LAND</text>

        {/* ocean floor profile */}
        <path
          d="M 70 110 L 150 122 L 200 175 L 240 188 L 300 190 L 360 190 L 380 215 L 400 190 L 440 190 Q 470 190 485 150 Q 500 190 530 190 L 560 190 L 560 200 L 70 200 Z"
          className="fill-stone-300/80 stroke-stone-600 dark:fill-stone-700/60"
          strokeWidth="1.4"
        />

        {/* labels with leader lines */}
        <text x="110" y="104" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6.5" fontWeight="700">Continental shelf</text>
        <text x="110" y="113" textAnchor="middle" className="fill-slate-500" fontSize="5.5">shallow, gentle</text>

        <text x="178" y="143" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6.5" fontWeight="700">Slope</text>

        <text x="225" y="200" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6" fontWeight="700">Rise</text>

        <text x="320" y="178" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="6.5" fontWeight="700">Abyssal plain</text>
        <text x="320" y="186" textAnchor="middle" className="fill-slate-500" fontSize="5.5">deep, flat floor</text>

        {/* trench */}
        <line x1="380" y1="215" x2="420" y2="228" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="430" y="226" className="fill-slate-700 dark:fill-slate-200" fontSize="6.5" fontWeight="700">Oceanic trench (deepest)</text>

        {/* ridge */}
        <line x1="485" y1="150" x2="495" y2="118" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="498" y="118" className="fill-slate-700 dark:fill-slate-200" fontSize="6.5" fontWeight="700">Mid-ocean ridge</text>
      </svg>
    </div>
  );
}
