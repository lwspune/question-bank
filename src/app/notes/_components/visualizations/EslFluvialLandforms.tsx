/**
 * A river's long profile from mountain to sea, with the signature landform of
 * each course: V-shaped valleys and gorges in the youthful upper course,
 * meanders and oxbow lakes in the mature middle course, and a delta where it
 * deposits its load at the sea. Static SVG, server component.
 */
export default function EslFluvialLandforms() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 200"
        className="w-full"
        role="img"
        aria-label="A river from source to sea. In the steep upper course it erodes V-shaped valleys, gorges and canyons. In the gentler middle course it swings into meanders, some of which are cut off to form oxbow lakes. At the mouth, in the lower course, it deposits its sediment to build a delta. Sea on the right."
      >
        {/* mountains */}
        <polygon points="10,150 60,40 110,150" className="fill-slate-300/70 stroke-slate-600 dark:fill-slate-700/50" strokeWidth="1" />
        <text x="60" y="34" textAnchor="middle" className="fill-slate-500" fontSize="7">source (mountains)</text>

        {/* sea */}
        <rect x="470" y="60" width="70" height="120" className="fill-sky-300/60 stroke-sky-700 dark:fill-sky-900/40" strokeWidth="1" />
        <text x="505" y="120" textAnchor="middle" className="fill-slate-600 dark:fill-slate-200" fontSize="8" fontWeight="600">SEA</text>

        {/* river course */}
        <path
          d="M 60 130 L 130 150 Q 175 160 200 150 Q 250 168 290 150 Q 330 134 360 150 Q 400 168 440 150 L 470 150"
          className="fill-none stroke-blue-600"
          strokeWidth="3"
        />

        {/* upper course label: V-valley / gorge */}
        <text x="120" y="180" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Upper course</text>
        <text x="120" y="191" textAnchor="middle" className="fill-slate-500" fontSize="6.5">V-valley · gorge · canyon (erosion)</text>

        {/* middle course: meander + oxbow */}
        <path d="M 300 132 Q 312 118 324 132 Q 316 142 300 132" className="fill-none stroke-blue-500" strokeWidth="1.6" />
        <text x="300" y="110" textAnchor="middle" className="fill-slate-500" fontSize="6.5">oxbow lake</text>
        <text x="300" y="180" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Middle course</text>
        <text x="300" y="191" textAnchor="middle" className="fill-slate-500" fontSize="6.5">meanders · oxbow lakes</text>

        {/* delta */}
        <polygon points="445,140 470,150 445,160 452,150" className="fill-amber-300/80 stroke-amber-700" strokeWidth="0.8" />
        <text x="440" y="180" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.5" fontWeight="700">Lower course</text>
        <text x="440" y="191" textAnchor="middle" className="fill-slate-500" fontSize="6.5">delta · levee (deposition)</text>
      </svg>
    </div>
  );
}
