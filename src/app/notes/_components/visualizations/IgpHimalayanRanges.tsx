/**
 * The Himalayas in parallel ranges, drawn north to south as a stepped-down
 * sequence: the Trans-Himalayas (Karakoram, Ladakh) highest in the north,
 * then the Greater Himalayas (Himadri) with the great snow peaks, then the
 * Lesser Himalayas (Himachal), then the low outermost Shiwaliks, ending in
 * the Tarai-Bhabar belt where the rivers spill onto the plains. Static SVG.
 */
export default function IgpHimalayanRanges() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 190"
        className="w-full"
        role="img"
        aria-label="The Himalayas as four parallel ranges stepping down from north to south. The Trans-Himalayas including the Karakoram and Ladakh ranges are the highest and northernmost. South of them the Greater Himalayas or Himadri carry the great snow peaks and passes like Zoji La. Next the Lesser Himalayas or Himachal. Then the low outermost Shiwalik hills. At the foot lies the Bhabar and Tarai belt where rivers reach the plains."
      >
        <line x1="20" y1="160" x2="540" y2="160" className="stroke-emerald-700" strokeWidth="1.2" />

        {/* Trans-Himalaya (highest, north/left) */}
        <path d="M 30 160 L 75 35 L 120 160 Z" className="fill-slate-300/80 stroke-slate-600 dark:fill-slate-700/60" strokeWidth="1.1" />
        <text x="75" y="150" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Trans-</text>
        <text x="75" y="160" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Himalaya</text>
        <text x="75" y="28" textAnchor="middle" className="fill-slate-500" fontSize="6">Karakoram, Ladakh</text>

        {/* Greater Himalaya / Himadri */}
        <path d="M 130 160 L 185 55 L 240 160 Z" className="fill-indigo-300/75 stroke-indigo-700 dark:fill-indigo-900/55" strokeWidth="1.1" />
        <text x="185" y="150" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Greater</text>
        <text x="185" y="160" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">(Himadri)</text>
        <text x="185" y="48" textAnchor="middle" className="fill-slate-500" fontSize="6">snow peaks · Zoji La</text>

        {/* Lesser Himalaya / Himachal */}
        <path d="M 250 160 L 300 95 L 350 160 Z" className="fill-emerald-300/75 stroke-emerald-700 dark:fill-emerald-900/55" strokeWidth="1.1" />
        <text x="300" y="150" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Lesser</text>
        <text x="300" y="160" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">(Himachal)</text>
        <text x="300" y="88" textAnchor="middle" className="fill-slate-500" fontSize="6">Pir Panjal</text>

        {/* Shiwalik (lowest) */}
        <path d="M 360 160 L 400 125 L 440 160 Z" className="fill-amber-300/75 stroke-amber-700 dark:fill-amber-900/55" strokeWidth="1.1" />
        <text x="400" y="153" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7" fontWeight="700">Shiwalik</text>
        <text x="400" y="118" textAnchor="middle" className="fill-slate-500" fontSize="6">outermost</text>

        {/* Bhabar / Tarai belt on the plain */}
        <rect x="445" y="156" width="85" height="8" className="fill-lime-300/70 stroke-lime-700 dark:fill-lime-900/50" strokeWidth="0.9" />
        <text x="487" y="150" textAnchor="middle" className="fill-slate-500" fontSize="6">Bhabar / Tarai</text>
        <text x="487" y="180" textAnchor="middle" className="fill-slate-500" fontSize="6">to the plains</text>

        <text x="75" y="178" textAnchor="middle" className="fill-slate-500" fontSize="7" fontWeight="700">NORTH</text>
        <text x="487" y="178" textAnchor="middle" className="fill-slate-500" fontSize="7" fontWeight="700">SOUTH</text>
      </svg>
    </div>
  );
}
