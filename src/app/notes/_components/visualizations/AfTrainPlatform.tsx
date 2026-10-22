/**
 * A 200 m train crossing a 300 m platform at 90 km/h (25 m/s), drawn at the
 * moment it starts and the moment it finishes.
 *
 * At the start the front of the train is level with the near end of the
 * platform; at the finish the rear of the train has just left the far end. In
 * between, the front has moved the platform's length and then the train's own
 * length: 200 + 300 = 500 m, which at 25 m/s takes 20 s. It is the worked
 * example of the concept it sits on (AFCAT Speed, Time and Distance, "Crossing
 * a platform or a bridge"), so the picture and the arithmetic match.
 *
 * Why this concept earns a diagram: the one mistake on the page is leaving out
 * the train's own length, and two snapshots of the train make that length
 * visible as part of the distance the front travels.
 *
 * Server component, static 2-D.
 */
const TRAIN = 200;
const PLATFORM = 300;
const SPEED = 25;
const SCALE = 0.8;

export default function AfTrainPlatform() {
  const x0 = 30;
  const trainW = TRAIN * SCALE;
  const platW = PLATFORM * SCALE;
  const platX = x0 + trainW;
  const platEnd = platX + platW;
  const startY = 46;
  const endY = 96;
  const carH = 22;
  const platY = 132;
  const total = TRAIN + PLATFORM;

  const cars = (left: number, y: number, dashed: boolean) =>
    Array.from({ length: 4 }, (_, i) => (
      <rect
        key={`${left}-${i}`}
        x={left + (i * trainW) / 4 + 1.5}
        y={y}
        width={trainW / 4 - 3}
        height={carH}
        rx="3"
        className={dashed ? "fill-indigo-200 stroke-indigo-500 dark:fill-indigo-900 dark:stroke-indigo-300" : "fill-indigo-500 stroke-indigo-600 dark:fill-indigo-400 dark:stroke-indigo-300"}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "4 3" : undefined}
      />
    ));

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 620 230"
        className="w-full"
        role="img"
        aria-label="A 200 metre train and a 300 metre platform. At the start the front of the train is at the near end of the platform. At the finish the rear of the train has just left the far end. The front has moved 200 plus 300, which is 500 metres, and at 25 metres per second that takes 20 seconds."
      >
        {/* the train at the start, front at the near end of the platform */}
        {cars(x0, startY, false)}
        <text x={x0} y={startY - 8} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          start: front at the platform
        </text>

        {/* the train at the finish, rear at the far end */}
        {cars(platEnd, endY, true)}
        <text x={platEnd + trainW} y={endY - 8} textAnchor="end" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          finish: rear leaves the platform
        </text>

        {/* the platform */}
        <rect x={platX} y={platY} width={platW} height={14} className="fill-slate-300 dark:fill-slate-600" />
        <text x={platX + platW / 2} y={platY + 30} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          platform {PLATFORM} m
        </text>
        <text x={x0 + trainW / 2} y={startY + carH + 16} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          train {TRAIN} m
        </text>

        {/* how far the front moves */}
        <line x1={platX} y1={190} x2={platEnd + trainW} y2={190} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={platX} y1={184} x2={platX} y2={196} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={platEnd + trainW} y1={184} x2={platEnd + trainW} y2={196} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={platX} y1={startY + carH} x2={platX} y2={184} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={platEnd + trainW} y1={endY + carH} x2={platEnd + trainW} y2={184} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1" strokeDasharray="3 3" />
        <text x={(platX + platEnd + trainW) / 2} y={214} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
          the front moves {PLATFORM} + {TRAIN} = {total} m, so {total} ÷ {SPEED} = {total / SPEED} s
        </text>
      </svg>
    </div>
  );
}
