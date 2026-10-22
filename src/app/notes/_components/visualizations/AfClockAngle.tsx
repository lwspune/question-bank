/**
 * A clock face at 3:40 with the angle between the hands marked.
 *
 * The hour hand has moved past the 3: it sits at 3 x 30 + 40 x 0.5 = 110
 * degrees from 12, while the minute hand is at 40 x 6 = 240 degrees. The arc
 * between them is 240 - 110 = 130 degrees, the same as |30h - 5.5m| =
 * |90 - 220|. It is the worked example of the concept it sits on (AFCAT Clock,
 * "The angle at any time"), so the picture and the arithmetic match number for
 * number.
 *
 * Why this concept earns a diagram: the one mistake the page exists to stop is
 * putting the hour hand on its number, and only a drawn dial shows that it has
 * crept a third of the way towards the 4.
 *
 * Server component, static 2-D.
 */
const CX = 150;
const CY = 140;
const R = 105;
const HOUR_DEG = 3 * 30 + 40 * 0.5;
const MINUTE_DEG = 40 * 6;

/** Point at `deg` degrees clockwise from 12, `r` from the centre. */
function pt(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

function arc(r: number, deg0: number, deg1: number) {
  const p0 = pt(r, deg0);
  const p1 = pt(r, deg1);
  const large = deg1 - deg0 > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

const HOUR_CLS = "stroke-indigo-600 dark:stroke-indigo-400";
const MINUTE_CLS = "stroke-emerald-600 dark:stroke-emerald-400";

export default function AfClockAngle() {
  const hourTip = pt(R * 0.55, HOUR_DEG);
  const minuteTip = pt(R * 0.85, MINUTE_DEG);
  const three = pt(R * 0.55, 90);
  const label = pt(R * 0.36, (HOUR_DEG + MINUTE_DEG) / 2);
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 470 280"
        className="w-full"
        role="img"
        aria-label="A clock face at 3:40. The hour hand is not on the 3 but a third of the way to the 4, at 110 degrees from 12. The minute hand points at the 8, at 240 degrees from 12. The angle between the hands is 240 minus 110, which is 130 degrees."
      >
        <circle cx={CX} cy={CY} r={R} className="fill-white stroke-slate-400 dark:fill-slate-900 dark:stroke-slate-500" strokeWidth="3" />
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          const a = pt(R - (major ? 10 : 5), i * 6);
          const b = pt(R - 1.5, i * 6);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="stroke-slate-500 dark:stroke-slate-400"
              strokeWidth={major ? 2 : 1}
            />
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const n = i === 0 ? 12 : i;
          const p = pt(R - 22, i * 30);
          return (
            <text key={n} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
              {n}
            </text>
          );
        })}

        {/* the angle between the hands */}
        <path d={arc(R * 0.3, HOUR_DEG, MINUTE_DEG)} fill="none" className="stroke-amber-500 dark:stroke-amber-400" strokeWidth="3" />
        <text x={label.x} y={label.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          {MINUTE_DEG - HOUR_DEG}°
        </text>

        {/* where the hour hand would be if it sat on the 3 */}
        <line x1={CX} y1={CY} x2={three.x} y2={three.y} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" strokeDasharray="4 4" />

        <line x1={CX} y1={CY} x2={hourTip.x} y2={hourTip.y} className={HOUR_CLS} strokeWidth="6" strokeLinecap="round" />
        <line x1={CX} y1={CY} x2={minuteTip.x} y2={minuteTip.y} className={MINUTE_CLS} strokeWidth="4" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="5" className="fill-slate-800 dark:fill-slate-100" />

        <text x={300} y={70} fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          At 3:40
        </text>
        <rect x={300} y={88} width={12} height={12} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={318} y={99} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          hour hand: 90 + 20 = {HOUR_DEG}°
        </text>
        <rect x={300} y={112} width={12} height={12} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={318} y={123} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          minute hand: 40 × 6 = {MINUTE_DEG}°
        </text>
        <text x={300} y={150} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          dashed line: the 3, where the
        </text>
        <text x={300} y={166} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          hour hand is NOT
        </text>
        <text x={300} y={198} fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          angle = {MINUTE_DEG} − {HOUR_DEG} = {MINUTE_DEG - HOUR_DEG}°
        </text>
      </svg>
    </div>
  );
}
