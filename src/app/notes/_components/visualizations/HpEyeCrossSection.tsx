/**
 * Horizontal cross-section of the human eye: light enters through the cornea
 * (front), passes the pupil/iris and lens, and forms an image on the retina
 * (back). Labels the parts the bank tests. Static SVG.
 */
export default function HpEyeCrossSection() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 200" className="w-full" role="img" aria-label="Cross-section of the eye: light enters through the cornea at the front, passes the pupil and lens, and forms an image on the retina lining the back of the eyeball.">
        {/* eyeball */}
        <circle cx="150" cy="100" r="78" className="fill-white stroke-slate-400 dark:fill-slate-800" strokeWidth="1.6" />
        {/* retina = back inner lining (right) */}
        <path d="M 150 22 A 78 78 0 0 1 150 178" className="fill-none stroke-rose-500" strokeWidth="4" />
        <text x="244" y="104" className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="600">Retina</text>
        <text x="232" y="118" className="fill-slate-500" fontSize="8">(image forms)</text>
        {/* cornea = front bulge (left) */}
        <path d="M 72 78 A 30 30 0 0 0 72 122" className="fill-sky-100/60 stroke-sky-600 dark:fill-sky-900/30" strokeWidth="2.4" />
        <text x="6" y="70" className="fill-sky-700 dark:fill-sky-300" fontSize="10" fontWeight="600">Cornea</text>
        <text x="2" y="83" className="fill-slate-500" fontSize="8">(light enters)</text>
        {/* lens */}
        <ellipse cx="96" cy="100" rx="9" ry="26" className="fill-indigo-200/70 stroke-indigo-600 dark:fill-indigo-900/40" strokeWidth="1.6" />
        <text x="80" y="158" className="fill-indigo-700 dark:fill-indigo-300" fontSize="9">Lens</text>
        {/* iris/pupil */}
        <line x1="84" y1="66" x2="84" y2="80" className="stroke-amber-600" strokeWidth="3" />
        <line x1="84" y1="120" x2="84" y2="134" className="stroke-amber-600" strokeWidth="3" />
        <text x="40" y="150" className="fill-amber-700 dark:fill-amber-300" fontSize="8.5">Iris / pupil</text>
        {/* light ray */}
        <line x1="14" y1="100" x2="150" y2="100" className="stroke-yellow-500" strokeWidth="1.4" strokeDasharray="5 3" />
        <text x="150" y="100" className="fill-yellow-600" fontSize="8" dx="2" dy="-3">light</text>
      </svg>
    </div>
  );
}
