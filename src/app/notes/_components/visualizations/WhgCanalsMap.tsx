/**
 * Two great ship canals in schematic plan view. The Suez Canal cuts the Isthmus
 * of Suez to link the Mediterranean Sea to the Red Sea (a sea-level canal, NO
 * locks). The Panama Canal cuts the Isthmus of Panama to link the Atlantic Ocean
 * to the Pacific Ocean (it DOES use a lock system to lift ships over higher
 * ground). Static SVG, server component.
 */
export default function WhgCanalsMap() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 200"
        className="w-full"
        role="img"
        aria-label="Two ship canals compared in plan view. On the left, the Suez Canal is a sea-level cut through the Isthmus of Suez joining the Mediterranean Sea in the north to the Red Sea in the south, with no locks. On the right, the Panama Canal cuts the narrow Isthmus of Panama to join the Atlantic Ocean to the Pacific Ocean and uses a lock system to raise and lower ships."
      >
        {/* divider */}
        <line x1="270" y1="14" x2="270" y2="186" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4 4" />

        {/* ---- Suez (left) ---- */}
        <text x="135" y="22" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="10" fontWeight="700">Suez Canal</text>
        {/* Mediterranean (top water) */}
        <rect x="30" y="34" width="210" height="34" rx="3" className="fill-sky-300/60 stroke-sky-600 dark:fill-sky-900/40" strokeWidth="1" />
        <text x="135" y="55" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">Mediterranean Sea</text>
        {/* land */}
        <rect x="30" y="68" width="210" height="76" className="fill-amber-200/50 stroke-amber-600/60 dark:fill-amber-900/30" strokeWidth="0.8" />
        {/* the canal cut */}
        <rect x="129" y="68" width="12" height="76" className="fill-sky-400/80 stroke-sky-700" strokeWidth="0.8" />
        <text x="178" y="108" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Isthmus of Suez</text>
        {/* Red Sea (bottom water) */}
        <rect x="30" y="144" width="210" height="32" rx="3" className="fill-rose-300/50 stroke-rose-600 dark:fill-rose-900/40" strokeWidth="1" />
        <text x="135" y="164" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8">Red Sea</text>
        <text x="135" y="195" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="6.5" fontWeight="700">sea-level · NO locks · opened 1869</text>

        {/* ---- Panama (right) ---- */}
        <text x="405" y="22" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="10" fontWeight="700">Panama Canal</text>
        {/* Atlantic (left water) */}
        <rect x="300" y="40" width="48" height="100" rx="3" className="fill-sky-300/60 stroke-sky-600 dark:fill-sky-900/40" strokeWidth="1" />
        <text x="324" y="92" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="7">Atlantic</text>
        {/* land */}
        <rect x="348" y="40" width="114" height="100" className="fill-amber-200/50 stroke-amber-600/60 dark:fill-amber-900/30" strokeWidth="0.8" />
        {/* the canal cut */}
        <rect x="348" y="84" width="114" height="12" className="fill-sky-400/80 stroke-sky-700" strokeWidth="0.8" />
        {/* lock marks */}
        <line x1="384" y1="84" x2="384" y2="96" className="stroke-rose-700" strokeWidth="1.4" />
        <line x1="405" y1="84" x2="405" y2="96" className="stroke-rose-700" strokeWidth="1.4" />
        <line x1="426" y1="84" x2="426" y2="96" className="stroke-rose-700" strokeWidth="1.4" />
        <text x="405" y="78" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="6">locks</text>
        {/* Pacific (right water) */}
        <rect x="462" y="40" width="48" height="100" rx="3" className="fill-teal-300/60 stroke-teal-600 dark:fill-teal-900/40" strokeWidth="1" />
        <text x="486" y="92" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="7">Pacific</text>
        <text x="405" y="158" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Isthmus of Panama</text>
        <text x="405" y="178" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="6.5" fontWeight="700">HAS locks · opened 1914</text>
      </svg>
    </div>
  );
}
