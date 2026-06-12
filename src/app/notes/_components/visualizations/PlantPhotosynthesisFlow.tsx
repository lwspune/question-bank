/**
 * Photosynthesis as a two-stage flow inside the chloroplast: the light reaction
 * (in the thylakoid) splits water and makes ATP/NADPH + releases O2, then the
 * dark reaction (Calvin cycle, in the stroma) fixes CO2 into glucose. Static SVG.
 */
export default function PlantPhotosynthesisFlow() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 340 200"
        className="w-full"
        role="img"
        aria-label="Photosynthesis inside the chloroplast in two stages. The light reaction in the thylakoid uses light to split water into hydrogen, electrons and oxygen, releasing oxygen and making ATP and NADPH. The dark reaction (Calvin cycle) in the stroma uses carbon dioxide plus that ATP and NADPH to make glucose."
      >
        {/* chloroplast outline */}
        <rect x="8" y="14" width="324" height="172" rx="40" className="fill-emerald-50/60 stroke-emerald-600 dark:fill-emerald-950/30" strokeWidth="1.6" />
        <text x="170" y="30" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="9" fontWeight="700">Chloroplast</text>

        {/* light reaction box */}
        <rect x="26" y="46" width="130" height="118" rx="10" className="fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/30" strokeWidth="1.5" />
        <text x="91" y="62" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="8.5" fontWeight="700">Light reaction</text>
        <text x="91" y="74" textAnchor="middle" className="fill-slate-500" fontSize="7">(thylakoid)</text>
        <text x="91" y="92" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">Light + H₂O</text>
        <text x="91" y="106" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">→ splits water</text>
        <text x="91" y="124" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8" fontWeight="700">releases O₂ ↑</text>
        <text x="91" y="140" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">makes ATP +</text>
        <text x="91" y="152" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">NADPH</text>

        {/* arrow */}
        <line x1="158" y1="105" x2="182" y2="105" className="stroke-slate-500" strokeWidth="1.8" markerEnd="url(#plant-photo-arrow)" />
        <text x="170" y="98" textAnchor="middle" className="fill-slate-500" fontSize="6.5">ATP/NADPH</text>

        {/* dark reaction box */}
        <rect x="184" y="46" width="130" height="118" rx="10" className="fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/30" strokeWidth="1.5" />
        <text x="249" y="62" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="8.5" fontWeight="700">Dark reaction</text>
        <text x="249" y="74" textAnchor="middle" className="fill-slate-500" fontSize="7">(stroma · Calvin cycle)</text>
        <text x="249" y="92" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">CO₂ fixed</text>
        <text x="249" y="106" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">using ATP +</text>
        <text x="249" y="118" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8">NADPH</text>
        <text x="249" y="138" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5" fontWeight="700">→ glucose</text>
        <text x="249" y="152" textAnchor="middle" className="fill-slate-500" fontSize="7">(no light needed)</text>

        <defs>
          <marker id="plant-photo-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
        <text x="170" y="180" textAnchor="middle" className="fill-slate-500" fontSize="7.5">6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</text>
      </svg>
    </div>
  );
}
