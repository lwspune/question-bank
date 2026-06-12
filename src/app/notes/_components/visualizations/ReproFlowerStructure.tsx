/**
 * Longitudinal section of a typical bisexual flower, labelling the two
 * reproductive organs the bank tests: the male stamen (anther + filament)
 * and the female carpel/pistil (stigma + style + ovary, holding the ovule).
 * Static SVG.
 */
export default function ReproFlowerStructure() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 300 220"
        className="w-full"
        role="img"
        aria-label="Section of a flower. The central female carpel has the stigma at the top, the style as the stalk, and the swollen ovary at the base holding an ovule. Beside it the male stamen has an anther on a filament. The stamen makes pollen; the stigma catches it."
      >
        {/* receptacle / base */}
        <path d="M 110 200 Q 150 214 190 200 L 178 188 L 122 188 Z" className="fill-emerald-200/60 stroke-emerald-700 dark:fill-emerald-900/40" strokeWidth="1.4" />

        {/* ----- female carpel (centre) ----- */}
        {/* ovary */}
        <ellipse cx="150" cy="166" rx="22" ry="26" className="fill-rose-200/70 stroke-rose-600 dark:fill-rose-900/40" strokeWidth="1.8" />
        {/* ovule inside ovary */}
        <circle cx="150" cy="170" r="7" className="fill-rose-400/80 stroke-rose-700" strokeWidth="1.2" />
        <text x="150" y="173" textAnchor="middle" className="fill-white" fontSize="6.5" fontWeight="700">ovule</text>
        {/* style */}
        <rect x="146" y="96" width="8" height="50" rx="3" className="fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/30" strokeWidth="1.4" />
        {/* stigma */}
        <ellipse cx="150" cy="92" rx="13" ry="7" className="fill-rose-300/80 stroke-rose-700 dark:fill-rose-800/50" strokeWidth="1.4" />

        {/* carpel labels (right) */}
        <text x="196" y="92" className="fill-rose-700 dark:fill-rose-300" fontSize="9" fontWeight="600">Stigma</text>
        <line x1="164" y1="92" x2="194" y2="90" className="stroke-rose-400" strokeWidth="1" />
        <text x="196" y="122" className="fill-rose-700 dark:fill-rose-300" fontSize="9" fontWeight="600">Style</text>
        <line x1="154" y1="120" x2="194" y2="120" className="stroke-rose-400" strokeWidth="1" />
        <text x="196" y="170" className="fill-rose-700 dark:fill-rose-300" fontSize="9" fontWeight="600">Ovary</text>
        <line x1="172" y1="166" x2="194" y2="168" className="stroke-rose-400" strokeWidth="1" />
        <text x="196" y="200" className="fill-rose-500 dark:fill-rose-400" fontSize="7.5">carpel / pistil (female)</text>

        {/* ----- male stamen (left) ----- */}
        {/* filament */}
        <rect x="86" y="110" width="6" height="60" rx="3" className="fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/30" strokeWidth="1.4" />
        {/* anther */}
        <ellipse cx="89" cy="104" rx="14" ry="9" className="fill-indigo-300/80 stroke-indigo-700 dark:fill-indigo-800/50" strokeWidth="1.6" />
        {/* pollen dots */}
        <circle cx="84" cy="102" r="1.6" className="fill-amber-500" />
        <circle cx="90" cy="106" r="1.6" className="fill-amber-500" />
        <circle cx="94" cy="101" r="1.6" className="fill-amber-500" />

        <text x="4" y="100" className="fill-indigo-700 dark:fill-indigo-300" fontSize="9" fontWeight="600">Anther</text>
        <line x1="76" y1="104" x2="36" y2="100" className="stroke-indigo-400" strokeWidth="1" />
        <text x="2" y="150" className="fill-indigo-700 dark:fill-indigo-300" fontSize="9" fontWeight="600">Filament</text>
        <line x1="86" y1="150" x2="50" y2="150" className="stroke-indigo-400" strokeWidth="1" />
        <text x="4" y="190" className="fill-indigo-500 dark:fill-indigo-400" fontSize="7.5">stamen (male)</text>

        <text x="150" y="216" textAnchor="middle" className="fill-slate-500" fontSize="7.5">Stamen makes pollen; the stigma catches it.</text>
      </svg>
    </div>
  );
}
