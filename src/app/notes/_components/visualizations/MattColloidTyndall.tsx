/**
 * The Tyndall effect distinguishes a colloid from a true solution. A beam of
 * light passes invisibly through a true solution (particles too small to
 * scatter it) but is scattered and made visible by the larger particles of a
 * colloid. A suspension's particles are larger still and settle on standing.
 * Static SVG.
 */
export default function MattColloidTyndall() {
  const glass = "fill-sky-100/40 stroke-slate-500 dark:fill-sky-950/30 dark:stroke-slate-300";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="The Tyndall effect. On the left, a beam of light passes through a true solution and stays invisible because the dissolved particles are too small to scatter it. On the right, the same beam passes through a colloid and becomes visible because the larger colloidal particles scatter the light.">
        <text x="160" y="15" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">The Tyndall effect</text>
        {/* LEFT: true solution — beam invisible */}
        <rect x="36" y="46" width="74" height="78" rx="3" className={glass} strokeWidth="1.4" />
        <text x="73" y="40" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9" fontWeight="600">True solution</text>
        {/* light source + faint dashed beam (not scattered) */}
        <circle cx="20" cy="85" r="5" className="fill-yellow-400 stroke-yellow-600" strokeWidth="1" />
        <line x1="26" y1="85" x2="124" y2="85" className="stroke-yellow-400/50 dark:stroke-yellow-500/40" strokeWidth="1.4" strokeDasharray="3 3" />
        <text x="73" y="140" textAnchor="middle" className="fill-slate-500" fontSize="7.5">beam NOT visible</text>
        <text x="73" y="152" textAnchor="middle" className="fill-slate-500" fontSize="7">(particles too small)</text>
        {/* RIGHT: colloid — beam visible (scattering cone) */}
        <rect x="210" y="46" width="74" height="78" rx="3" className={glass} strokeWidth="1.4" />
        <text x="247" y="40" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9" fontWeight="600">Colloid</text>
        <circle cx="194" cy="85" r="5" className="fill-yellow-400 stroke-yellow-600" strokeWidth="1" />
        {/* visible scattered beam */}
        <polygon points="200,82 200,88 296,96 296,74" className="fill-yellow-300/70 stroke-yellow-500 dark:fill-yellow-400/50" strokeWidth="0.8" />
        {/* scatter dots */}
        {[[228, 80], [244, 88], [258, 78], [270, 90], [236, 96]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" className="fill-yellow-600 dark:fill-yellow-300" />
        ))}
        <text x="247" y="140" textAnchor="middle" className="fill-amber-600 dark:fill-amber-300" fontSize="7.5" fontWeight="600">beam VISIBLE</text>
        <text x="247" y="152" textAnchor="middle" className="fill-slate-500" fontSize="7">(light is scattered)</text>
        <text x="160" y="172" textAnchor="middle" className="fill-slate-500" fontSize="8">Suspension particles are larger still and settle on standing.</text>
      </svg>
    </div>
  );
}
