/**
 * A north-to-south cross-section of the Indian mainland's four great
 * physiographic divisions: the high Himalayas in the north, the flat
 * Northern Plains built of river alluvium, the old rigid Peninsular Plateau
 * fringed by the Ghats, and the narrow Coastal Plains at the sea. Static SVG,
 * server component.
 */
export default function IgpPhysiographicCrossSection() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 200"
        className="w-full"
        role="img"
        aria-label="North-to-south profile of India's physiographic divisions. In the far north the Himalayas rise as tall folded peaks. South of them lie the flat Northern Plains, a low belt of river-deposited alluvium. South of the plains rises the Peninsular Plateau, an old rigid block of higher land edged by the Western and Eastern Ghats. At the very edge by the sea are the narrow Coastal Plains."
      >
        {/* baseline / sea level */}
        <line x1="20" y1="165" x2="540" y2="165" className="stroke-slate-400" strokeWidth="1" />

        {/* Himalayas - tall folded peaks (north, left) */}
        <path
          d="M 30 165 L 70 60 L 95 95 L 120 40 L 150 100 L 180 70 L 205 165 Z"
          className="fill-amber-300/70 stroke-amber-700 dark:fill-amber-900/50"
          strokeWidth="1.2"
        />
        <text x="118" y="120" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">Himalayas</text>
        <text x="118" y="132" textAnchor="middle" className="fill-slate-500" fontSize="6.5">young fold mountains</text>

        {/* Northern Plains - flat low alluvial belt */}
        <rect x="205" y="155" width="105" height="10" className="fill-lime-300/70 stroke-lime-700 dark:fill-lime-900/50" strokeWidth="1" />
        <text x="257" y="145" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Northern Plains</text>
        <text x="257" y="186" textAnchor="middle" className="fill-slate-500" fontSize="6.5">flat river alluvium</text>

        {/* Peninsular Plateau - rigid raised block with Ghats */}
        <path
          d="M 310 165 L 325 110 L 360 105 L 460 110 L 490 130 L 500 165 Z"
          className="fill-rose-300/70 stroke-rose-700 dark:fill-rose-900/50"
          strokeWidth="1.2"
        />
        <text x="405" y="135" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Peninsular Plateau</text>
        <text x="405" y="148" textAnchor="middle" className="fill-slate-500" fontSize="6.5">old rigid block · Ghats on the edges</text>
        <text x="320" y="103" textAnchor="middle" className="fill-slate-500" fontSize="6">W. Ghats</text>
        <text x="492" y="123" textAnchor="middle" className="fill-slate-500" fontSize="6">E. Ghats</text>

        {/* Coastal Plains - narrow strip at sea */}
        <rect x="500" y="160" width="35" height="5" className="fill-sky-300/80 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1" />
        <text x="517" y="180" textAnchor="middle" className="fill-slate-500" fontSize="6">Coastal</text>
        <text x="517" y="189" textAnchor="middle" className="fill-slate-500" fontSize="6">Plains</text>

        <text x="280" y="14" textAnchor="middle" className="fill-slate-500" fontSize="8">NORTH to SOUTH profile</text>
      </svg>
    </div>
  );
}
