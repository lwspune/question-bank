/**
 * A clock at 3:25 and its image in a plane mirror standing beside it, which
 * shows 8:35.
 *
 * The mirror flips the dial across the line from 12 to 6, so a hand at some
 * angle clockwise from 12 appears at the same angle anticlockwise. The minute
 * hand at 150 degrees appears at 210, which reads 35 minutes; the hour hand at
 * 102.5 appears at 257.5, between the 8 and the 9. So 11:60 - 3:25 = 8:35. It
 * is the worked example of the concept it sits on (AFCAT Clock, "The image
 * time is 11:60 minus the real time"), so the picture and the arithmetic match.
 *
 * Why this concept earns a diagram: the rule is a subtraction, but why it is a
 * subtraction from 12 hours is only obvious when the two dials stand side by
 * side with the mirror between them.
 *
 * Server component, static 2-D.
 */
const R = 82;
const CY = 125;

function pt(cx: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

const HOUR_CLS = "stroke-indigo-600 dark:stroke-indigo-400";
const MINUTE_CLS = "stroke-emerald-600 dark:stroke-emerald-400";

function Dial({ cx, hourDeg, minuteDeg, mirrored }: { cx: number; hourDeg: number; minuteDeg: number; mirrored: boolean }) {
  const hourTip = pt(cx, R * 0.55, hourDeg);
  const minuteTip = pt(cx, R * 0.85, minuteDeg);
  return (
    <g>
      <circle cx={cx} cy={CY} r={R} className="fill-white stroke-slate-400 dark:fill-slate-900 dark:stroke-slate-500" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = pt(cx, R - 9, i * 30);
        const b = pt(cx, R - 1.5, i * 30);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="2" />;
      })}
      {(mirrored ? [12, 6] : [12, 3, 6, 9]).map((n) => {
        const deg = (n % 12) * 30;
        const p = pt(cx, R - 21, deg);
        return (
          <text key={n} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
            {n}
          </text>
        );
      })}
      <line x1={cx} y1={CY} x2={hourTip.x} y2={hourTip.y} className={HOUR_CLS} strokeWidth="6" strokeLinecap="round" />
      <line x1={cx} y1={CY} x2={minuteTip.x} y2={minuteTip.y} className={MINUTE_CLS} strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={CY} r="4" className="fill-slate-800 dark:fill-slate-100" />
    </g>
  );
}

export default function AfClockMirror() {
  const leftX = 120;
  const rightX = 360;
  const hour = 3 * 30 + 25 * 0.5;
  const minute = 25 * 6;
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 480 270"
        className="w-full"
        role="img"
        aria-label="On the left a clock shows 3:25. On the right is its image in a mirror standing between them. The image swaps left and right, so a hand at some angle clockwise from 12 appears at the same angle anticlockwise, and the hands, read as on a dial without numbers, show 8:35. The real time and the image time add up to 12 hours: 11:60 minus 3:25 is 8:35."
      >
        <text x={leftX} y={20} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Real clock
        </text>
        <text x={rightX} y={20} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Mirror image
        </text>

        <Dial cx={leftX} hourDeg={hour} minuteDeg={minute} mirrored={false} />
        <Dial cx={rightX} hourDeg={360 - hour} minuteDeg={360 - minute} mirrored />

        {/* the mirror */}
        <line x1={240} y1={36} x2={240} y2={214} className="stroke-sky-500 dark:stroke-sky-400" strokeWidth="3" strokeDasharray="6 5" />
        <text x={240} y={230} textAnchor="middle" fontSize="11" className="fill-sky-700 dark:fill-sky-300">
          mirror
        </text>

        <text x={leftX} y={234} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          3:25
        </text>
        <text x={rightX} y={234} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          reads 8:35
        </text>
        <text x={240} y={258} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          11:60 − 3:25 = 8:35, and 3:25 + 8:35 = 12:00
        </text>
      </svg>
    </div>
  );
}
