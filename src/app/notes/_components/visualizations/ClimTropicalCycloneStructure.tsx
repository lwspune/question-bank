/**
 * Plan view of a tropical cyclone: the calm central EYE, the ring of tallest
 * storm clouds (the eyewall) where winds and rain are fiercest, and the spiral
 * rain bands curving inward. The arrows show the inward, anticlockwise (Northern
 * Hemisphere) spiral. Static SVG, server component.
 */
export default function ClimTropicalCycloneStructure() {
  const cx = 150;
  const cy = 150;
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 300"
        className="w-full"
        role="img"
        aria-label="Top-down view of a tropical cyclone. At the centre is the calm, clear eye. Around the eye is the eyewall, a ring of the tallest clouds where winds and rainfall are strongest. Beyond the eyewall, spiral rain bands curve inward. In the Northern Hemisphere the winds spiral inward in an anticlockwise direction."
      >
        {/* outer storm */}
        <circle cx={cx} cy={cy} r={120} className="fill-slate-300/40 stroke-slate-500" strokeWidth="1" strokeDasharray="3 3" />
        {/* spiral bands */}
        <path d="M 150 30 A 120 120 0 0 1 270 150" className="fill-none stroke-indigo-400" strokeWidth="6" opacity="0.5" />
        <path d="M 270 150 A 120 120 0 0 1 150 270" className="fill-none stroke-indigo-400" strokeWidth="6" opacity="0.5" />
        <path d="M 60 95 A 70 70 0 0 1 200 110" className="fill-none stroke-indigo-500" strokeWidth="5" opacity="0.6" />
        {/* eyewall */}
        <circle cx={cx} cy={cy} r={48} className="fill-none stroke-rose-600" strokeWidth="7" opacity="0.75" />
        {/* eye */}
        <circle cx={cx} cy={cy} r={22} className="fill-sky-100 stroke-sky-600 dark:fill-sky-200" strokeWidth="1.5" />

        {/* inward anticlockwise arrows */}
        <path d="M 150 42 q -18 6 -22 22" className="fill-none stroke-emerald-700" strokeWidth="1.6" markerEnd="url(#carr)" />
        <path d="M 258 150 q -6 18 -22 22" className="fill-none stroke-emerald-700" strokeWidth="1.6" markerEnd="url(#carr)" />

        {/* labels */}
        <text x={cx} y={cy + 3} textAnchor="middle" className="fill-slate-700 dark:fill-slate-800" fontSize="8" fontWeight="700">Eye</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-600 dark:fill-slate-700" fontSize="5.5">calm, clear</text>

        <line x1={cx + 48} y1={cy} x2="318" y2="80" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2 2" />
        <text x="322" y="83" className="fill-rose-700 dark:fill-rose-400" fontSize="8" fontWeight="600">Eyewall</text>
        <text x="322" y="94" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">strongest winds + rain</text>

        <line x1={cx + 100} y1={cy + 30} x2="318" y2="170" className="stroke-slate-400" strokeWidth="1" strokeDasharray="2 2" />
        <text x="322" y="173" className="fill-indigo-700 dark:fill-indigo-400" fontSize="8" fontWeight="600">Spiral rain bands</text>

        <text x="322" y="240" className="fill-emerald-700 dark:fill-emerald-400" fontSize="7.5" fontWeight="600">Inward spiral</text>
        <text x="322" y="251" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">anticlockwise (N Hemisphere)</text>

        <defs>
          <marker id="carr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-emerald-700" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
