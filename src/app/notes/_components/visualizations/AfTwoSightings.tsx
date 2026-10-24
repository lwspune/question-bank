/**
 * One tower seen from two points on the same side: the top at 30° from A and
 * at 60° from B, 20 m nearer. The tower is 10√3 m (about 17.3 m) tall, A is
 * 30 m from its foot and B is 10 m.
 *
 * It is the worked example of the concept it sits on (AFCAT Heights and
 * Distances, "Two points on the same side"), so the picture and the arithmetic
 * below it match number for number.
 *
 * Why this concept earns a diagram: the method is to write both distances as
 * the height times a cotangent and subtract them. The picture shows the two
 * triangles sharing one vertical side and the walk as the gap between their
 * bases, which is the whole equation.
 *
 * Server component, static 2-D. Drawn to scale (10 px per metre).
 */
export default function AfTwoSightings() {
  const groundY = 210;
  const footX = 430;
  const topY = groundY - 173.2; // 10√3 m
  const ax = footX - 300; // 30 m
  const bx = footX - 100; // 10 m
  const ra = 44;
  const rb = 30;

  const line = "stroke-slate-500 dark:stroke-slate-300";
  const label = "fill-slate-700 dark:fill-slate-200";
  const angle = "fill-emerald-700 dark:fill-emerald-300";

  const dims = [
    { x1: ax, x2: bx, text: "walked 20 m" },
    { x1: bx, x2: footX, text: "10 m" },
  ];

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 280"
        className="w-full"
        role="img"
        aria-label="A tower 10 root 3 metres tall on level ground. Point A is 30 metres from its foot and sees the top at 30 degrees. Point B is 10 metres from the foot, 20 metres nearer than A, and sees the top at 60 degrees. Both lines of sight end at the same top, so the two triangles share the tower as their vertical side."
      >
        {/* ground */}
        <line x1={20} y1={groundY} x2={500} y2={groundY} className={line} strokeWidth="1.6" />

        {/* tower */}
        <line x1={footX} y1={topY} x2={footX} y2={groundY} className="stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="4" />
        <text x={footX + 10} y={(topY + groundY) / 2} fontSize="13" className={label}>
          h = 10√3 m
        </text>

        {/* lines of sight */}
        <line x1={ax} y1={groundY} x2={footX} y2={topY} className="stroke-sky-500 dark:stroke-sky-400" strokeWidth="2" />
        <line x1={bx} y1={groundY} x2={footX} y2={topY} className="stroke-sky-500 dark:stroke-sky-400" strokeWidth="2" />

        {/* angle at A, 30 degrees */}
        <path
          d={`M ${ax + ra} ${groundY} A ${ra} ${ra} 0 0 0 ${ax + ra * Math.cos(Math.PI / 6)} ${groundY - ra * Math.sin(Math.PI / 6)}`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2"
        />
        <text x={ax + ra + 6} y={groundY - 6} fontSize="13" fontWeight="600" className={angle}>
          30°
        </text>

        {/* angle at B, 60 degrees */}
        <path
          d={`M ${bx + rb} ${groundY} A ${rb} ${rb} 0 0 0 ${bx + rb * Math.cos(Math.PI / 3)} ${groundY - rb * Math.sin(Math.PI / 3)}`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2"
        />
        <text x={bx + rb + 4} y={groundY - 14} fontSize="13" fontWeight="600" className={angle}>
          60°
        </text>

        {/* point labels */}
        <circle cx={ax} cy={groundY} r={4} className="fill-slate-700 dark:fill-slate-200" />
        <circle cx={bx} cy={groundY} r={4} className="fill-slate-700 dark:fill-slate-200" />
        <text x={ax} y={groundY - 12} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          A
        </text>
        <text x={bx - 10} y={groundY - 12} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          B
        </text>

        {/* distances below the ground */}
        {dims.map((d) => (
          <g key={d.text}>
            <line x1={d.x1 + 2} y1={groundY + 18} x2={d.x2 - 2} y2={groundY + 18} className={line} strokeWidth="1.4" />
            <line x1={d.x1 + 2} y1={groundY + 12} x2={d.x1 + 2} y2={groundY + 24} className={line} strokeWidth="1.4" />
            <line x1={d.x2 - 2} y1={groundY + 12} x2={d.x2 - 2} y2={groundY + 24} className={line} strokeWidth="1.4" />
            <text x={(d.x1 + d.x2) / 2} y={groundY + 38} textAnchor="middle" fontSize="12" className={label}>
              {d.text}
            </text>
          </g>
        ))}
        <text x={(ax + footX) / 2} y={groundY + 62} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          h cot 30° minus h cot 60° = 20 m
        </text>
      </svg>
    </div>
  );
}
