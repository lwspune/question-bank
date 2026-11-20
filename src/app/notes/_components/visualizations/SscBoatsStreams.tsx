/**
 * Static figure: downstream and upstream speeds as arrows (concept
 * ssctdbt-speeds), with the concept's worked example: a boat that goes 42 km
 * downstream in 3 hours and 42 km upstream in 7 hours, so D = 14 km/h and
 * U = 6 km/h, the boat b = (D + U) ÷ 2 = 10 km/h and the stream
 * s = (D − U) ÷ 2 = 4 km/h. Downstream the boat's arrow b and the stream's
 * arrow s point the same way and add to D = b + s; upstream they point
 * opposite ways and leave U = b − s. Arrow lengths are to scale (13 units per
 * km/h). Server component. Pinned by tests/notes-ssc-visuals.test.ts.
 */

/** The worked example. */
export const TRIP = { km: 42, downHours: 3, upHours: 7 } as const;
export const D = TRIP.km / TRIP.downHours;
export const U = TRIP.km / TRIP.upHours;
export const boatSpeed = (down: number, up: number) => (down + up) / 2;
export const streamSpeed = (down: number, up: number) => (down - up) / 2;
export const B_SPEED = boatSpeed(D, U);
export const S_SPEED = streamSpeed(D, U);

// Geometry (viewBox units).
export const PX_PER_KMH = 13;
export const DOWN_START = 56;
export const UP_START = 262;

const BOAT = "stroke-indigo-600 dark:stroke-indigo-400";
const BOAT_FILL = "fill-indigo-600 dark:fill-indigo-400";
const STREAM = "stroke-sky-600 dark:stroke-sky-400";
const STREAM_FILL = "fill-sky-600 dark:fill-sky-400";

/** A horizontal arrow from x1 to x2 at height y. */
function Arrow({ x1, x2, y, stroke, fill, w = 3 }: { x1: number; x2: number; y: number; stroke: string; fill: string; w?: number }) {
  const dir = x2 > x1 ? 1 : -1;
  const base = x2 - dir * 8;
  return (
    <g>
      <line x1={x1} y1={y} x2={base} y2={y} strokeWidth={w} className={stroke} />
      <polygon points={`${x2},${y} ${base},${y - 5} ${base},${y + 5}`} className={fill} />
    </g>
  );
}

/** A small boat at x, nose pointing `dir`. */
function Boat({ x, y, dir }: { x: number; y: number; dir: 1 | -1 }) {
  const n = dir * 14;
  return (
    <polygon
      points={`${x - n},${y - 5} ${x + n},${y - 5} ${x + n - dir * 6},${y + 5} ${x - n + dir * 2},${y + 5}`}
      strokeWidth={1.2}
      className="fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300"
    />
  );
}

function Brace({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="stroke-foreground" strokeWidth={1}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y} />
    </g>
  );
}

export default function SscBoatsStreams() {
  const k = PX_PER_KMH;
  const dB = DOWN_START + B_SPEED * k;
  const dEnd = dB + S_SPEED * k;
  const uB = UP_START - B_SPEED * k;
  const uEnd = uB + S_SPEED * k;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · with the stream and against it
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="A river flowing to the right at s = 4 km/h. Top: a boat going downstream, to the right. Its own speed b = 10 km/h and the stream's 4 km/h point the same way and add: D = b + s = 14 km/h. Bottom: a boat going upstream, to the left. Its speed of 10 km/h points left and the stream's 4 km/h points right, leaving U = b − s = 6 km/h. Below: 42 km in 3 hours gives D = 14, in 7 hours gives U = 6, so b = (14 + 6) ÷ 2 = 10 and s = (14 − 6) ÷ 2 = 4."
      >
        {/* The river */}
        <rect x={0} y={4} width={320} height={176} rx={6} className="fill-sky-100/70 dark:fill-sky-950/50" />
        <Arrow x1={190} x2={242} y={18} stroke={STREAM} fill={STREAM_FILL} w={2} />
        <text x={186} y={22} textAnchor="end" className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
          stream s = 4 km/h
        </text>

        {/* Downstream */}
        <text x={8} y={44} className="fill-foreground text-[10.5px] font-semibold">
          Downstream (with the stream)
        </text>
        <Boat x={30} y={66} dir={1} />
        <Arrow x1={DOWN_START} x2={dB} y={66} stroke={BOAT} fill={BOAT_FILL} />
        <Arrow x1={dB} x2={dEnd} y={66} stroke={STREAM} fill={STREAM_FILL} />
        <text x={(DOWN_START + dB) / 2} y={59} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          b = 10
        </text>
        <text x={(dB + dEnd) / 2} y={59} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          s = 4
        </text>
        <Brace x1={DOWN_START} x2={dEnd} y={80} />
        <text x={(DOWN_START + dEnd) / 2} y={94} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          D = b + s = 10 + 4 = 14 km/h
        </text>

        {/* Upstream */}
        <text x={8} y={118} className="fill-foreground text-[10.5px] font-semibold">
          Upstream (against the stream)
        </text>
        <Boat x={288} y={140} dir={-1} />
        <Arrow x1={UP_START} x2={uB} y={140} stroke={BOAT} fill={BOAT_FILL} />
        <Arrow x1={uB} x2={uEnd} y={150} stroke={STREAM} fill={STREAM_FILL} />
        <text x={(UP_START + uB) / 2} y={133} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          b = 10
        </text>
        <text x={uB - 4} y={154} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          s = 4
        </text>
        <Brace x1={uEnd} x2={UP_START} y={162} />
        <text x={(uEnd + UP_START) / 2} y={175} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          U = b − s = 10 − 4 = 6 km/h
        </text>

        {/* The worked example */}
        <text x={160} y={200} textAnchor="middle" className="fill-foreground text-[10px]">
          42 km in 3 h: D = 14. 42 km in 7 h: U = 6.
        </text>
        <text x={160} y={216} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          b = (D + U) ÷ 2 = 10 km/h, s = (D − U) ÷ 2 = 4 km/h
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Arrow lengths are to scale. b is the boat&apos;s speed in still water and s the stream&apos;s. Downstream the river carries the boat,
        so the speeds add; upstream it pushes back, so the stream&apos;s speed is taken away.
      </p>
    </div>
  );
}
