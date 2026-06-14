/**
 * Vertical cross-section of the five atmospheric layers from the surface upward:
 * troposphere (weather), stratosphere (ozone), mesosphere (coldest, meteors),
 * thermosphere (hottest, ionosphere/aurora) and exosphere. The temperature
 * profile kinks at each boundary — falling in the troposphere, rising in the
 * stratosphere, falling in the mesosphere, rising in the thermosphere. Static
 * SVG, server component.
 */
export default function ClimAtmosphereLayers() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 320"
        className="w-full"
        role="img"
        aria-label="Cross-section of the atmosphere from the ground up. The lowest layer is the troposphere where all weather occurs and temperature falls with height. Above it the stratosphere holds the ozone layer that absorbs ultraviolet, and temperature rises with height. Next the mesosphere is the coldest layer where meteors burn up. Above that the thermosphere is the hottest layer and contains the ionosphere that reflects radio waves and where auroras glow. The outermost wispy layer is the exosphere fading into space."
      >
        {/* layer bands, bottom to top */}
        <rect x="40" y="250" width="240" height="50" className="fill-sky-200/70 stroke-sky-700 dark:fill-sky-900/40" strokeWidth="1" />
        <rect x="40" y="200" width="240" height="50" className="fill-emerald-200/70 stroke-emerald-700 dark:fill-emerald-900/40" strokeWidth="1" />
        <rect x="40" y="150" width="240" height="50" className="fill-indigo-200/70 stroke-indigo-700 dark:fill-indigo-900/40" strokeWidth="1" />
        <rect x="40" y="90" width="240" height="60" className="fill-rose-300/70 stroke-rose-700 dark:fill-rose-900/50" strokeWidth="1" />
        <rect x="40" y="50" width="240" height="40" className="fill-violet-200/60 stroke-violet-700 dark:fill-violet-900/40" strokeWidth="1" />

        {/* ground */}
        <rect x="40" y="300" width="240" height="8" className="fill-amber-700/70" />

        {/* layer labels */}
        <text x="160" y="278" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Troposphere</text>
        <text x="160" y="290" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">all weather; temp falls</text>
        <text x="160" y="228" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Stratosphere</text>
        <text x="160" y="240" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">OZONE; temp rises</text>
        <text x="160" y="178" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Mesosphere</text>
        <text x="160" y="190" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">COLDEST; meteors burn</text>
        <text x="160" y="118" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Thermosphere</text>
        <text x="160" y="130" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="6.5">HOTTEST; ionosphere, aurora</text>
        <text x="160" y="74" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Exosphere</text>
        <text x="160" y="84" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">fades into space</text>

        {/* boundary names on the left */}
        <text x="36" y="252" textAnchor="end" className="fill-slate-500" fontSize="6.5">Tropopause</text>
        <text x="36" y="202" textAnchor="end" className="fill-slate-500" fontSize="6.5">Stratopause</text>
        <text x="36" y="152" textAnchor="end" className="fill-slate-500" fontSize="6.5">Mesopause</text>

        {/* temperature profile (kinks) on the right */}
        <text x="360" y="44" textAnchor="middle" className="fill-slate-500" fontSize="7" fontWeight="600">Temperature</text>
        <polyline
          points="300,300 330,250 305,200 355,150 320,90 360,50"
          className="fill-none stroke-orange-600"
          strokeWidth="2"
        />
        <text x="300" y="312" className="fill-slate-500" fontSize="6">cold</text>
        <text x="360" y="312" className="fill-slate-500" fontSize="6">warm</text>
      </svg>
    </div>
  );
}
