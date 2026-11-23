/**
 * Static figure: in a spinning rigid body every point turns through the same
 * angle in the same time, but points farther out move faster
 * (concept sscfkmmo-rotation).
 *
 * Two points on one radius of a wheel: A at distance r from the axis, B on
 * the rim at 2r. Both turn through the same angle, so both have the same
 * angular velocity; by v = (angular velocity) × r, B's linear speed is twice
 * A's, and B's path in the same time is twice as long. Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export const WHEEL = { x: 92, y: 116, rim: 80 } as const;
export const TURN_DEG = 55;

export type RotPoint = { name: string; radius: number; distance: string; speed: string };

export const ROT_POINTS: readonly RotPoint[] = [
  { name: "A", radius: WHEEL.rim / 2, distance: "r", speed: "v" },
  { name: "B", radius: WHEEL.rim, distance: "2r", speed: "2v" },
];

/** Linear speed for an angular velocity and a distance from the axis. */
export function linearSpeed(omega: number, r: number): number {
  return omega * r;
}

/** Length of the arc a point at distance r covers while turning through deg degrees. */
export function arcLength(r: number, deg: number): number {
  return (r * deg * Math.PI) / 180;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function pt(r: number, deg: number) {
  const t = (deg * Math.PI) / 180;
  return { x: r2(WHEEL.x + r * Math.cos(t)), y: r2(WHEEL.y - r * Math.sin(t)) };
}

/** Arrow head at the end of the arc of radius r, pointing the way the wheel turns (anticlockwise). */
function arcHead(r: number, deg: number): string {
  const t = (deg * Math.PI) / 180;
  const tip = pt(r, deg);
  const ux = -Math.sin(t);
  const uy = -Math.cos(t);
  const bx = tip.x - ux * 8;
  const by = tip.y - uy * 8;
  return `${tip.x},${tip.y} ${r2(bx - uy * 4)},${r2(by + ux * 4)} ${r2(bx + uy * 4)},${r2(by - ux * 4)}`;
}

export default function SscRigidRotation() {
  const end = pt(WHEEL.rim, TURN_DEG);
  const startRim = pt(WHEEL.rim, 0);
  const angleArc = pt(18, TURN_DEG);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · same angle, different speed
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="A spinning wheel with two points on one radius: A halfway out at distance r and B on the rim at distance 2r. In the same time both turn through the same angle, so they have the same angular velocity. B's path is twice as long as A's, so B's linear speed is twice A's: v equals angular velocity times r."
      >
        <circle cx={WHEEL.x} cy={WHEEL.y} r={WHEEL.rim} className="fill-muted stroke-foreground" strokeWidth={1.4} />
        <circle cx={WHEEL.x} cy={WHEEL.y} r={3} className="fill-foreground" />
        <text x={WHEEL.x - 6} y={WHEEL.y + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          axis
        </text>

        {/* the radius before (dashed) and after the turn */}
        <line x1={WHEEL.x} y1={WHEEL.y} x2={startRim.x} y2={startRim.y} className="stroke-muted-foreground" strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={WHEEL.x} y1={WHEEL.y} x2={end.x} y2={end.y} className="stroke-foreground" strokeWidth={1.4} />
        <path d={`M ${WHEEL.x + 18} ${WHEEL.y} A 18 18 0 0 0 ${angleArc.x} ${angleArc.y}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
        <text x={WHEEL.x + 22} y={WHEEL.y - 6} className="fill-indigo-700 text-[10px] font-bold dark:fill-indigo-300">
          θ
        </text>

        {ROT_POINTS.map((p, i) => {
          const a = pt(p.radius, 0);
          const b = pt(p.radius, TURN_DEG);
          const stroke = i === 0 ? "stroke-sky-600 dark:stroke-sky-400" : "stroke-rose-600 dark:stroke-rose-400";
          const fill = i === 0 ? "fill-sky-600 dark:fill-sky-400" : "fill-rose-600 dark:fill-rose-400";
          return (
            <g key={p.name}>
              <path d={`M ${a.x} ${a.y} A ${p.radius} ${p.radius} 0 0 0 ${b.x} ${b.y}`} fill="none" className={stroke} strokeWidth={2.4} />
              <polygon points={arcHead(p.radius, TURN_DEG)} className={fill} />
              <circle cx={a.x} cy={a.y} r={3} className="fill-background stroke-muted-foreground" strokeWidth={1} />
              <circle cx={b.x} cy={b.y} r={4} className={fill} />
              <text x={i === 0 ? b.x - 8 : b.x + 8} y={b.y - 6} textAnchor={i === 0 ? "end" : "start"} className={`${fill} text-[11px] font-bold`}>
                {p.name}
              </text>
            </g>
          );
        })}

        {/* facts */}
        <text x={188} y={36} className="fill-foreground text-[11px] font-bold">
          Same angle θ
        </text>
        <text x={188} y={49} className="fill-foreground text-[10px]">
          in the same time:
        </text>
        <text x={188} y={62} className="fill-foreground text-[10px]">
          same angular velocity ω
        </text>
        <text x={188} y={88} className="fill-foreground text-[11px] font-bold">
          v = ω × r
        </text>
        <text x={188} y={110} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          A, at {ROT_POINTS[0].distance}: speed {ROT_POINTS[0].speed}
        </text>
        <text x={188} y={124} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          B, at {ROT_POINTS[1].distance}: speed {ROT_POINTS[1].speed}
        </text>
        <text x={188} y={150} className="fill-muted-foreground text-[10px]">
          B&apos;s path is twice as
        </text>
        <text x={188} y={163} className="fill-muted-foreground text-[10px]">
          long in the same time
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Angular velocity is the same everywhere in a rigid body. Only the linear speed grows with distance from the axis, so
        the rim moves fastest.
      </p>
    </div>
  );
}
