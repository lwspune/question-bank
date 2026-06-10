/**
 * Conservation of mechanical energy on a frictionless track — a ball at three
 * positions on a hill. At the top it is all potential energy (PE); at the
 * bottom it is all kinetic energy (KE); halfway down the energy is shared. The
 * total PE + KE stays constant at every point.
 *
 * Server component — static 2-D.
 */
export default function WepEnergyConservationTrack() {
  // track: a smooth descending curve from top-left to bottom-right
  const trackPath = "M 60 70 C 130 80, 150 200, 250 215 S 380 215, 410 215";

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 460 300"
        className="w-full"
        role="img"
        aria-label="A ball rolling down a frictionless track, all potential energy at the top, shared in the middle, all kinetic energy at the bottom"
      >
        {/* ground */}
        <line x1="20" y1="240" x2="440" y2="240" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" />

        {/* the track */}
        <path d={trackPath} className="fill-none stroke-slate-500 dark:stroke-slate-400" strokeWidth="3" />

        {/* top: all PE */}
        <circle cx="60" cy="58" r="11" className="fill-indigo-500/70 stroke-indigo-700 dark:stroke-indigo-300" strokeWidth="2" />
        <text x="78" y="44" fontSize="13" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">Top</text>
        <text x="78" y="62" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">PE max, KE = 0</text>

        {/* middle: shared */}
        <circle cx="205" cy="188" r="11" className="fill-indigo-500/70 stroke-indigo-700 dark:stroke-indigo-300" strokeWidth="2" />
        <text x="120" y="150" fontSize="13" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">Middle</text>
        <text x="92" y="168" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">PE and KE shared</text>

        {/* bottom: all KE */}
        <circle cx="405" cy="203" r="11" className="fill-emerald-500/70 stroke-emerald-700 dark:stroke-emerald-300" strokeWidth="2" />
        <text x="300" y="276" fontSize="13" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">Bottom</text>
        <text x="300" y="294" fontSize="12" className="fill-emerald-900 dark:fill-emerald-100">KE max, PE = 0</text>

        {/* height marker at the top */}
        <line x1="40" y1="58" x2="40" y2="240" className="stroke-indigo-400/70" strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="26" y="155" fontSize="13" className="fill-indigo-700 dark:fill-indigo-300">h</text>

        <text x="230" y="22" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-indigo-900 dark:fill-indigo-100">PE + KE = constant everywhere (no friction)</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        As the ball descends, potential energy mgh converts into kinetic energy
        ½mv². On a frictionless track the total mechanical energy never changes.
      </p>
    </div>
  );
}
