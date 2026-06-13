/**
 * Seismic shadow zones: the liquid outer core refracts P-waves (leaving a
 * 105°–145° P shadow) and completely blocks S-waves (leaving an S shadow
 * everywhere beyond ~105°). The S-shadow's existence proves the outer core is
 * liquid. Static SVG, server component.
 */
export default function EslSeismicShadowZones() {
  const cx = 150;
  const cy = 150;
  const rEarth = 120;
  const rCore = 60;
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 300"
        className="w-full"
        role="img"
        aria-label="An earthquake at the top of the Earth sends P and S waves through the interior. The liquid outer core bends P-waves, creating a P-wave shadow zone between 105 and 145 degrees from the epicentre. The outer core blocks S-waves entirely, so an S-wave shadow covers everything beyond about 105 degrees — a far larger area. Because only a liquid can block S-waves like this, the S-wave shadow proves the outer core is liquid."
      >
        {/* Earth + core */}
        <circle cx={cx} cy={cy} r={rEarth} className="fill-amber-100/60 stroke-amber-700 dark:fill-amber-900/30" strokeWidth="1.4" />
        <circle cx={cx} cy={cy} r={rCore} className="fill-rose-300/70 stroke-rose-700 dark:fill-rose-900/50" strokeWidth="1.2" />
        <text x={cx} y={cy + 3} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7" fontWeight="600">liquid</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7" fontWeight="600">outer core</text>

        {/* epicentre at top */}
        <circle cx={cx} cy={cy - rEarth} r="4" className="fill-indigo-600 stroke-indigo-800" strokeWidth="1" />
        <text x={cx + 8} y={cy - rEarth - 4} className="fill-slate-600 dark:fill-slate-200" fontSize="7.5" fontWeight="600">quake</text>

        {/* simple ray fan from epicentre */}
        {[20, 45, 70, 95, 125, 160, 200, 235, 290, 315, 340].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const tx = cx + rEarth * Math.sin(a);
          const ty = cy - rEarth * Math.cos(a);
          const blocked = deg >= 105 && deg <= 255; // far side region
          return (
            <line
              key={deg}
              x1={cx}
              y1={cy - rEarth}
              x2={tx}
              y2={ty}
              className={blocked ? "stroke-slate-300/60" : "stroke-emerald-500/70"}
              strokeWidth="1"
              strokeDasharray={blocked ? "2 3" : undefined}
            />
          );
        })}

        {/* shadow band labels on the right */}
        <text x="300" y="120" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="700">P-wave shadow</text>
        <text x="300" y="131" className="fill-slate-500" fontSize="7">105°–145° belt</text>
        <text x="300" y="180" className="fill-slate-700 dark:fill-slate-200" fontSize="8" fontWeight="700">S-wave shadow</text>
        <text x="300" y="191" className="fill-slate-500" fontSize="7">everything beyond ~105°</text>
        <text x="300" y="202" className="fill-slate-500" fontSize="7">(the LARGER shadow)</text>

        <text x="210" y="288" textAnchor="middle" className="fill-slate-500" fontSize="7.5">S-waves cannot cross the liquid core → proves it is liquid</text>
      </svg>
    </div>
  );
}
