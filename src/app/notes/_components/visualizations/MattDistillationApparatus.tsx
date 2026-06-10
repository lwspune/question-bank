/**
 * Simple distillation apparatus: a flask of the mixture is heated, the more
 * volatile component boils off, its vapour passes through a water-cooled
 * condenser, condenses back to liquid, and collects in the receiver. Used to
 * separate a liquid from a dissolved solid, or two liquids with different
 * boiling points (fractional distillation). Static SVG.
 */
export default function MattDistillationApparatus() {
  const glass = "fill-none stroke-slate-500 dark:stroke-slate-300";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="Simple distillation apparatus. A flask of the mixture is heated by a flame; the more volatile liquid boils, its vapour rises and passes through a water-cooled condenser where it cools back to liquid, then drips into the receiver flask. The dissolved solid or higher-boiling liquid stays behind in the flask.">
        <text x="160" y="15" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Distillation</text>
        {/* distillation flask */}
        <path d="M40 70 L40 92 A26 26 0 1 0 78 92 L78 70 Z" className={glass} strokeWidth="1.5" />
        <path d="M44 104 A22 22 0 0 0 74 104 Z" className="fill-sky-300/60 stroke-sky-500 dark:fill-sky-800/40" strokeWidth="1" />
        <text x="59" y="120" textAnchor="middle" className="fill-sky-700 dark:fill-sky-200" fontSize="7.5">mixture</text>
        {/* thermometer */}
        <line x1="59" y1="70" x2="59" y2="44" className="stroke-rose-500" strokeWidth="1.6" />
        <circle cx="59" cy="42" r="2.5" className="fill-rose-500" />
        <text x="59" y="36" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="7">thermometer</text>
        {/* flame */}
        <path d="M52 150 Q59 136 66 150 Q59 144 52 150 Z" className="fill-orange-500 stroke-orange-600" strokeWidth="0.8" />
        <text x="59" y="164" textAnchor="middle" className="fill-orange-600 dark:fill-orange-300" fontSize="7.5">heat</text>
        {/* delivery tube to condenser */}
        <path d="M78 78 L120 78 L150 110" className={glass} strokeWidth="1.5" />
        {/* condenser (double wall, slanted) */}
        <line x1="118" y1="72" x2="206" y2="128" className={glass} strokeWidth="1.5" />
        <line x1="126" y1="62" x2="214" y2="118" className={glass} strokeWidth="1.5" />
        <line x1="118" y1="72" x2="126" y2="62" className={glass} strokeWidth="1.2" />
        <line x1="206" y1="128" x2="214" y2="118" className={glass} strokeWidth="1.2" />
        <text x="150" y="78" textAnchor="middle" className="fill-slate-500" fontSize="7.5" transform="rotate(32 150 88)">condenser (cold water)</text>
        <text x="120" y="58" className="fill-sky-600 dark:fill-sky-300" fontSize="7">water in</text>
        <text x="206" y="138" className="fill-sky-600 dark:fill-sky-300" fontSize="7">water out</text>
        {/* receiver */}
        <path d="M214 124 L236 150 L236 170 L268 170 L268 150 L290 124 Z" className={glass} strokeWidth="1.5" />
        <path d="M240 158 L264 158 L264 168 L240 168 Z" className="fill-emerald-300/60 stroke-emerald-500 dark:fill-emerald-800/40" strokeWidth="1" />
        <text x="252" y="186" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-200" fontSize="7.5">distillate (pure)</text>
      </svg>
    </div>
  );
}
