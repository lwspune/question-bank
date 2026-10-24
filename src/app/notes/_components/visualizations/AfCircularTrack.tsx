/**
 * Two runners on a 600 m circular track at 5 m/s and 3 m/s, drawn twice:
 * running opposite ways and running the same way.
 *
 * Opposite ways, the two together cover 8 m each second and meet when they
 * have covered one lap between them: 600 / 8 = 75 s. The same way, the faster
 * gains 2 m each second and meets the slower only after gaining a whole lap:
 * 600 / 2 = 300 s. It is the worked example of the concept it sits on (AFCAT
 * Speed, Time and Distance, "The first meeting: opposite ways or the same
 * way"), so the picture and the arithmetic below it match number for number.
 *
 * Why this concept earns a diagram: the whole page turns on one spatial fact,
 * that a closed track makes the runners meet after a lap of combined or gained
 * distance rather than a fixed gap, and the two circles show that at a glance.
 *
 * Server component, static 2-D.
 */
const R = 70;
const LAP = 600;
const FAST = 5;
const SLOW = 3;

function pt(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/** Arc from deg0 to deg1; clockwise on screen when deg1 > deg0. */
function arc(cx: number, cy: number, r: number, deg0: number, deg1: number) {
  const p0 = pt(cx, cy, r, deg0);
  const p1 = pt(cx, cy, r, deg1);
  const sweep = deg1 > deg0 ? 1 : 0;
  const large = Math.abs(deg1 - deg0) > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

/** Arrowhead at the end of an arc, pointing along the direction of travel. */
function head(cx: number, cy: number, r: number, deg: number, clockwise: boolean) {
  const a = (deg * Math.PI) / 180;
  const end = pt(cx, cy, r, deg);
  const dir = clockwise ? { x: -Math.sin(a), y: Math.cos(a) } : { x: Math.sin(a), y: -Math.cos(a) };
  const n = { x: Math.cos(a), y: Math.sin(a) };
  const tip = { x: end.x + 9 * dir.x, y: end.y + 9 * dir.y };
  const b1 = { x: end.x + 5 * n.x, y: end.y + 5 * n.y };
  const b2 = { x: end.x - 5 * n.x, y: end.y - 5 * n.y };
  return `${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${b1.x.toFixed(1)},${b1.y.toFixed(1)} ${b2.x.toFixed(1)},${b2.y.toFixed(1)}`;
}

const FAST_CLS = "fill-indigo-500 dark:fill-indigo-400";
const FAST_STROKE = "stroke-indigo-500 dark:stroke-indigo-400";
const SLOW_CLS = "fill-emerald-500 dark:fill-emerald-400";
const SLOW_STROKE = "stroke-emerald-500 dark:stroke-emerald-400";

function Track({ cx, cy, opposite }: { cx: number; cy: number; opposite: boolean }) {
  const start = pt(cx, cy, R, -90);
  const slowEnd = opposite ? -160 : -45;
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="6" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" className="fill-slate-600 dark:fill-slate-300">
        {LAP} m lap
      </text>
      {/* the faster runner, clockwise, on the outside */}
      <path d={arc(cx, cy, R + 13, -82, 0)} fill="none" className={FAST_STROKE} strokeWidth="2.4" />
      <polygon points={head(cx, cy, R + 13, 0, true)} className={FAST_CLS} />
      {/* the slower runner, on the inside */}
      <path d={arc(cx, cy, R - 13, opposite ? -98 : -82, slowEnd)} fill="none" className={SLOW_STROKE} strokeWidth="2.4" />
      <polygon points={head(cx, cy, R - 13, slowEnd, !opposite)} className={SLOW_CLS} />
      {/* the shared start */}
      <circle cx={start.x} cy={start.y} r="5" className="fill-slate-800 dark:fill-slate-100" />
      <text x={start.x - 12} y={start.y - 14} textAnchor="end" fontSize="11" className="fill-slate-600 dark:fill-slate-300">
        start
      </text>
    </g>
  );
}

export default function AfCircularTrack() {
  const leftX = 135;
  const rightX = 395;
  const cy = 120;
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 530 280"
        className="w-full"
        role="img"
        aria-label="Two copies of a 600 metre circular track with two runners leaving the same start at 5 and 3 metres per second. On the left they run opposite ways, together covering 8 metres each second, so they meet after 600 divided by 8, which is 75 seconds. On the right they run the same way, the faster gaining 2 metres each second, so they meet only after a whole lap is gained, 600 divided by 2, which is 300 seconds."
      >
        <text x={leftX} y={16} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Opposite ways
        </text>
        <text x={rightX} y={16} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Same way
        </text>

        <Track cx={leftX} cy={cy} opposite />
        <Track cx={rightX} cy={cy} opposite={false} />

        <text x={leftX} y={232} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          together {FAST} + {SLOW} = {FAST + SLOW} m each second
        </text>
        <text x={leftX} y={254} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          meet after {LAP} ÷ {FAST + SLOW} = {LAP / (FAST + SLOW)} s
        </text>
        <text x={rightX} y={232} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          faster gains {FAST} − {SLOW} = {FAST - SLOW} m each second
        </text>
        <text x={rightX} y={254} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          meet after {LAP} ÷ {FAST - SLOW} = {LAP / (FAST - SLOW)} s
        </text>

        {/* key */}
        <rect x={190} y={266} width={10} height={10} className={FAST_CLS} />
        <text x={204} y={275} fontSize="11" className="fill-slate-700 dark:fill-slate-200">
          {FAST} m/s
        </text>
        <rect x={270} y={266} width={10} height={10} className={SLOW_CLS} />
        <text x={284} y={275} fontSize="11" className="fill-slate-700 dark:fill-slate-200">
          {SLOW} m/s
        </text>
      </svg>
    </div>
  );
}
