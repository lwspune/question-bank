/**
 * Penetrating power of nuclear radiation — alpha stopped by paper, beta by a
 * thin aluminium sheet, gamma only attenuated by thick lead/concrete. Three
 * horizontal rays meeting three barriers of increasing stopping power.
 * Static 2-D server component.
 */
export default function RadiationPenetration() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 260"
        className="w-full"
        role="img"
        aria-label="Penetrating power: alpha rays stopped by paper, beta rays stopped by aluminium, gamma rays only reduced by thick lead"
      >
        <defs>
          <marker id="rad-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* source */}
        <circle cx="60" cy="130" r="22" className="fill-indigo-200 stroke-indigo-700 dark:fill-indigo-900 dark:stroke-indigo-300" strokeWidth="2" />
        <text x="60" y="135" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-indigo-800 dark:fill-indigo-200">src</text>

        {/* barriers */}
        {/* paper at x=190 */}
        <rect x="186" y="50" width="8" height="160" className="fill-amber-300/70 stroke-amber-700 dark:stroke-amber-400" strokeWidth="1.5" />
        <text x="190" y="40" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-amber-700 dark:fill-amber-400">Paper</text>
        {/* aluminium at x=330 */}
        <rect x="324" y="50" width="16" height="160" className="fill-slate-400/70 stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />
        <text x="332" y="40" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">Aluminium</text>
        {/* lead at x=470 */}
        <rect x="460" y="50" width="34" height="160" className="fill-zinc-600/70 stroke-zinc-800 dark:stroke-zinc-300" strokeWidth="1.5" />
        <text x="477" y="40" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-zinc-700 dark:fill-zinc-300">Lead</text>

        {/* alpha ray: stopped at paper (top) */}
        <line x1="82" y1="95" x2="184" y2="95" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="3" markerEnd="url(#rad-arrow)" />
        <text x="120" y="86" fontSize="13" fontWeight="700" className="fill-rose-700 dark:fill-rose-400">alpha</text>

        {/* beta ray: passes paper, stopped at aluminium (middle) */}
        <line x1="82" y1="130" x2="322" y2="130" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#rad-arrow)" />
        <text x="120" y="121" fontSize="13" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-400">beta</text>

        {/* gamma ray: passes paper + aluminium, only reduced by lead (bottom) */}
        <line x1="82" y1="170" x2="500" y2="170" className="stroke-violet-600 dark:stroke-violet-400" strokeWidth="2" markerEnd="url(#rad-arrow)" />
        <text x="120" y="161" fontSize="13" fontWeight="700" className="fill-violet-700 dark:fill-violet-400">gamma</text>

        <text x="280" y="240" textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          Penetrating power: gamma &gt; beta &gt; alpha (ionising power is the reverse)
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Alpha is stopped by a sheet of paper, beta by a few millimetres of
        aluminium, gamma needs thick lead or concrete. Penetration ranks gamma
        &gt; beta &gt; alpha; ionising power ranks the opposite way.
      </p>
    </div>
  );
}
