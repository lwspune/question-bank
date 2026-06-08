/**
 * Schematic of the four-chambered heart: two upper auricles (atria) and two
 * lower ventricles. Right side (blue) carries deoxygenated blood, left side
 * (red) oxygenated. Valves labelled: tricuspid (right), bicuspid (left),
 * semilunar (artery exits). Static SVG.
 */
export default function HpHeartChambers() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 230" className="w-full" role="img" aria-label="A four-chambered heart: the right auricle and right ventricle (blue, deoxygenated) on one side, the left auricle and left ventricle (red, oxygenated) on the other, with the tricuspid, bicuspid and semilunar valves labelled.">
        {/* divider */}
        <line x1="150" y1="30" x2="150" y2="210" className="stroke-slate-400" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* RIGHT side (deoxygenated, blue) — drawn on left of viewer */}
        <rect x="40" y="40" width="100" height="60" rx="10" className="fill-sky-200/70 stroke-sky-600 dark:fill-sky-900/40" strokeWidth="1.6" />
        <rect x="40" y="115" width="100" height="85" rx="10" className="fill-sky-300/70 stroke-sky-600 dark:fill-sky-800/50" strokeWidth="1.6" />
        <text x="90" y="74" textAnchor="middle" className="fill-sky-800 dark:fill-sky-200" fontSize="11" fontWeight="600">Right auricle</text>
        <text x="90" y="162" textAnchor="middle" className="fill-sky-800 dark:fill-sky-200" fontSize="11" fontWeight="600">Right</text>
        <text x="90" y="176" textAnchor="middle" className="fill-sky-800 dark:fill-sky-200" fontSize="11" fontWeight="600">ventricle</text>
        {/* LEFT side (oxygenated, red) — drawn on right of viewer */}
        <rect x="160" y="40" width="100" height="60" rx="10" className="fill-rose-200/70 stroke-rose-600 dark:fill-rose-900/40" strokeWidth="1.6" />
        <rect x="160" y="115" width="100" height="85" rx="10" className="fill-rose-300/70 stroke-rose-600 dark:fill-rose-800/50" strokeWidth="1.6" />
        <text x="210" y="74" textAnchor="middle" className="fill-rose-800 dark:fill-rose-200" fontSize="11" fontWeight="600">Left auricle</text>
        <text x="210" y="162" textAnchor="middle" className="fill-rose-800 dark:fill-rose-200" fontSize="11" fontWeight="600">Left</text>
        <text x="210" y="176" textAnchor="middle" className="fill-rose-800 dark:fill-rose-200" fontSize="11" fontWeight="600">ventricle</text>
        {/* valves */}
        <line x1="55" y1="107" x2="125" y2="107" className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="2.4" />
        <text x="90" y="120" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">Tricuspid</text>
        <line x1="175" y1="107" x2="245" y2="107" className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="2.4" />
        <text x="210" y="120" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">Bicuspid</text>
        {/* semilunar (artery exits) */}
        <line x1="78" y1="40" x2="102" y2="40" className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="2.4" />
        <line x1="198" y1="40" x2="222" y2="40" className="stroke-slate-700 dark:stroke-slate-200" strokeWidth="2.4" />
        <text x="150" y="24" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">Semilunar valves (to arteries)</text>
        <text x="90" y="222" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="8.5">deoxygenated</text>
        <text x="210" y="222" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="8.5">oxygenated (from lungs)</text>
      </svg>
    </div>
  );
}
