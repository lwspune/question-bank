/**
 * Static figure: two observers on opposite sides of a tower (concept
 * sschdtw-opposite), drawn to scale with the concept's worked example: a 60 m
 * tower whose top is seen at α = 30° from one side and β = 60° from the other.
 * Each distance is h ÷ tan of its angle (60√3 m and 20√3 m), the foot lies
 * between the observers, so the gap is their sum, 80√3 m (about 138.6 m).
 * The formula is written in the concept's own form, h ÷ tan α + h ÷ tan β.
 * Server component. Pinned by tests/notes-ssc-visuals.test.ts.
 */

/** The worked example. */
export const TOWER = { h: 60, alpha: 30, beta: 60 } as const;

const rad = (deg: number) => (deg * Math.PI) / 180;
/** Distance from the foot at an angle of elevation θ: h ÷ tan θ. */
export const distanceAt = (h: number, deg: number) => h / Math.tan(rad(deg));
/** Opposite sides: the gap is the sum of the two distances. */
export const gapOpposite = (h: number, alpha: number, beta: number) => distanceAt(h, alpha) + distanceAt(h, beta);

// Geometry (viewBox units): drawn to scale.
export const PX_PER_M = 1.9;
export const GROUND_Y = 150;
export const LEFT_X = 26;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const FOOT_X = r2(LEFT_X + distanceAt(TOWER.h, TOWER.alpha) * PX_PER_M);
export const RIGHT_X = r2(FOOT_X + distanceAt(TOWER.h, TOWER.beta) * PX_PER_M);
export const TOP_Y = r2(GROUND_Y - TOWER.h * PX_PER_M);

/** An angle arc at (x, GROUND_Y) from the ground to the sight line, opening toward `dir`. */
function arc(x: number, deg: number, dir: 1 | -1, r: number) {
  const ex = r2(x + dir * r * Math.cos(rad(deg)));
  const ey = r2(GROUND_Y - r * Math.sin(rad(deg)));
  return `M ${x + dir * r} ${GROUND_Y} A ${r} ${r} 0 0 ${dir === 1 ? 0 : 1} ${ex} ${ey}`;
}

function Dim({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="stroke-muted-foreground" strokeWidth={1}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
    </g>
  );
}

export default function SscTowerTwoObservers() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two observers on opposite sides of a tower
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="A 60 metre tower stands between two observers on level ground. From the left observer the angle of elevation of the top is 30 degrees, from the right observer 60 degrees. The left observer is h divided by tan 30 degrees, 60 root 3 metres, from the foot; the right observer is h divided by tan 60 degrees, 20 root 3 metres, from the foot. The gap between them is the sum, 80 root 3 metres, about 138.6 metres."
      >
        {/* Ground and tower */}
        <line x1={8} y1={GROUND_Y} x2={312} y2={GROUND_Y} strokeWidth={1.5} className="stroke-foreground" />
        <rect x={FOOT_X - 4} y={TOP_Y} width={8} height={r2(GROUND_Y - TOP_Y)} className="fill-slate-400 dark:fill-slate-500" />
        <text x={FOOT_X - 8} y={98} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          h = 60 m
        </text>

        {/* Sight lines */}
        <line x1={LEFT_X} y1={GROUND_Y} x2={FOOT_X} y2={TOP_Y} strokeDasharray="5 3" strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
        <line x1={RIGHT_X} y1={GROUND_Y} x2={FOOT_X} y2={TOP_Y} strokeDasharray="5 3" strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />

        {/* Angles */}
        <path d={arc(LEFT_X, TOWER.alpha, 1, 34)} fill="none" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={LEFT_X + 40} y={GROUND_Y - 6} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          α = 30°
        </text>
        <path d={arc(RIGHT_X, TOWER.beta, -1, 20)} fill="none" strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={RIGHT_X - 21} y={GROUND_Y - 20} textAnchor="end" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          β = 60°
        </text>

        {/* Observers and the foot */}
        <circle cx={LEFT_X} cy={GROUND_Y} r={3} className="fill-foreground" />
        <circle cx={RIGHT_X} cy={GROUND_Y} r={3} className="fill-foreground" />
        <text x={FOOT_X} y={GROUND_Y + 11} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          foot
        </text>

        {/* The two distances */}
        <Dim x1={LEFT_X} x2={FOOT_X} y={GROUND_Y + 18} />
        <text x={(LEFT_X + FOOT_X) / 2} y={GROUND_Y + 31} textAnchor="middle" className="fill-foreground text-[10px]">
          h ÷ tan α = 60 ÷ tan 30°
        </text>
        <text x={(LEFT_X + FOOT_X) / 2} y={GROUND_Y + 43} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          = 60√3 m
        </text>
        <Dim x1={FOOT_X} x2={RIGHT_X} y={GROUND_Y + 18} />
        <text x={(FOOT_X + RIGHT_X) / 2} y={GROUND_Y + 31} textAnchor="middle" className="fill-foreground text-[10px]">
          h ÷ tan β
        </text>
        <text x={(FOOT_X + RIGHT_X) / 2} y={GROUND_Y + 43} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          = 20√3 m
        </text>

        {/* The gap */}
        <Dim x1={LEFT_X} x2={RIGHT_X} y={GROUND_Y + 53} />
        <text x={(LEFT_X + RIGHT_X) / 2} y={GROUND_Y + 69} textAnchor="middle" className="fill-indigo-700 text-[10.5px] font-semibold dark:fill-indigo-300">
          gap = 60√3 + 20√3 = 80√3 ≈ 138.6 m
        </text>

        <text x={8} y={16} className="fill-foreground text-[10px]">
          gap = h ÷ tan α + h ÷ tan β
        </text>
        <text x={8} y={29} className="fill-muted-foreground text-[10px]">
          The foot is between them: add.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Drawn to scale. Each observer&apos;s distance from the foot is the height divided by the tan of their angle: 60√3 m at 30° and
        20√3 m at 60°. On opposite sides the foot lies between them, so the distances add. Subtract only when both stand on the same side.
      </p>
    </div>
  );
}
