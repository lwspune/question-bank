/**
 * Earth's two motions: ROTATION on its tilted axis (gives day and night) and
 * REVOLUTION around the Sun on a tilted axis (gives the seasons). The day/night
 * terminator and the 23.5-degree axial tilt are shown. Static SVG, server
 * component.
 */
export default function EisRotationRevolution() {
  const sunX = 70;
  const sunY = 110;
  const earthX = 320;
  const earthY = 110;
  const r = 56;
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 240"
        className="w-full"
        role="img"
        aria-label="Earth lit by the Sun. The Earth spins on its own tilted axis, which is rotation and produces day and night: the half facing the Sun has day, the half facing away has night, and the boundary is the terminator. The Earth also moves around the Sun, which is revolution. Because the axis is tilted about 23.5 degrees and stays pointed the same way, different parts of the Earth lean toward the Sun at different times of the year, producing the seasons."
      >
        {/* Sun */}
        <circle cx={sunX} cy={sunY} r="30" className="fill-amber-300 stroke-amber-600" strokeWidth="1.5" />
        <text x={sunX} y={sunY + 3} textAnchor="middle" className="fill-amber-800" fontSize="9" fontWeight="700">Sun</text>

        {/* sun rays toward earth */}
        {[-26, 0, 26].map((dy) => (
          <line
            key={dy}
            x1={sunX + 32}
            y1={sunY + dy}
            x2={earthX - r - 6}
            y2={earthY + dy * 0.7}
            className="stroke-amber-400"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
        ))}

        {/* Earth: day side (toward Sun = left) lit, night side dark */}
        <defs>
          <clipPath id="eisEarthClip">
            <circle cx={earthX} cy={earthY} r={r} />
          </clipPath>
        </defs>
        <g clipPath="url(#eisEarthClip)">
          <rect x={earthX - r} y={earthY - r} width={r} height={2 * r} className="fill-sky-200 dark:fill-sky-800/70" />
          <rect x={earthX} y={earthY - r} width={r} height={2 * r} className="fill-slate-700 dark:fill-slate-900" />
        </g>
        <circle cx={earthX} cy={earthY} r={r} className="fill-none stroke-slate-500" strokeWidth="1.5" />

        {/* terminator (day/night boundary) */}
        <line x1={earthX} y1={earthY - r} x2={earthX} y2={earthY + r} className="stroke-slate-400" strokeWidth="1" strokeDasharray="3 3" />
        <text x={earthX - r + 4} y={earthY - r - 6} className="fill-sky-700 dark:fill-sky-300" fontSize="8" fontWeight="600">Day</text>
        <text x={earthX + r - 22} y={earthY - r - 6} className="fill-slate-600 dark:fill-slate-300" fontSize="8" fontWeight="600">Night</text>
        <text x={earthX + 6} y={earthY + r + 14} textAnchor="middle" className="fill-slate-500" fontSize="6.5">terminator</text>

        {/* tilted axis (23.5 deg) through the Earth */}
        <line
          x1={earthX - 24}
          y1={earthY + r + 16}
          x2={earthX + 24}
          y2={earthY - r - 16}
          className="stroke-rose-600"
          strokeWidth="1.6"
        />
        <text x={earthX + 30} y={earthY - r - 8} className="fill-rose-700 dark:fill-rose-300" fontSize="7.5" fontWeight="600">axis tilt 23.5 deg</text>

        {/* spin arrow */}
        <path d={`M ${earthX - 14} ${earthY - r - 4} a 14 6 0 1 0 28 0`} className="fill-none stroke-indigo-600" strokeWidth="1.3" />
        <path d={`M ${earthX + 14} ${earthY - r - 4} l -4 -4 m 4 4 l -5 1`} className="stroke-indigo-600" strokeWidth="1.3" fill="none" />
        <text x={earthX} y={earthY - r - 22} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="7.5" fontWeight="600">rotation (spin)</text>

        {/* revolution orbit arrow */}
        <path d="M 110 200 q 110 30 220 0" className="fill-none stroke-emerald-600" strokeWidth="1.3" strokeDasharray="5 3" />
        <path d="M 330 200 l -7 -3 m 7 3 l -5 5" className="stroke-emerald-600" strokeWidth="1.3" fill="none" />
        <text x="220" y="232" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="8" fontWeight="600">revolution around the Sun (one year) gives seasons</text>

        <text x="20" y="28" className="fill-slate-500" fontSize="8" fontWeight="600">Rotation gives DAY and NIGHT. Revolution + tilt gives SEASONS.</text>
      </svg>
    </div>
  );
}
