/**
 * Static figure: double circulation, as the IMAT concept "Double circulation
 * and the main blood vessels" defines it.
 *
 * - Pulmonary circuit: right ventricle, pulmonary artery, lungs, pulmonary
 *   veins, left atrium.
 * - Systemic circuit: left ventricle, aorta, body organs, venae cavae, right
 *   atrium.
 *
 * The right side of the heart is drawn on the viewer's left, as in a textbook
 * picture of a heart facing you. Every vessel is a polyline from the box it
 * leaves to the box it enters; the boxes and paths are exported and pinned by
 * tests/notes-imat-visuals-physio.test.ts (each path really starts and ends on
 * the right boxes, arteries leave ventricles, veins enter atria, and the
 * oxygen content matches the concept's table, including the trap: the
 * pulmonary artery is the one artery with deoxygenated blood).
 *
 * Server component, no client state.
 */

export type Box = { id: string; label: readonly [string, string?]; x: number; y: number; w: number; h: number };

export const BOXES = {
  lungs: { id: "lungs", label: ["Lungs", "blood picks up O₂"], x: 96, y: 22, w: 128, h: 36 },
  body: { id: "body", label: ["Body organs", "blood gives up O₂"], x: 96, y: 246, w: 128, h: 36 },
  rightAtrium: { id: "rightAtrium", label: ["Right", "atrium"], x: 100, y: 120, w: 44, h: 36 },
  leftAtrium: { id: "leftAtrium", label: ["Left", "atrium"], x: 176, y: 120, w: 44, h: 36 },
  rightVentricle: { id: "rightVentricle", label: ["Right", "ventricle"], x: 100, y: 162, w: 58, h: 44 },
  leftVentricle: { id: "leftVentricle", label: ["Left", "ventricle"], x: 162, y: 162, w: 58, h: 44 },
} as const satisfies Record<string, Box>;

export type BoxId = keyof typeof BOXES;

export type Vessel = {
  name: string;
  kind: "artery" | "vein";
  from: BoxId;
  to: BoxId;
  oxygen: "high" | "low";
  circuit: "pulmonary" | "systemic";
  /** Polyline in viewBox units, in the direction blood flows. */
  points: readonly { x: number; y: number }[];
  /** Where the name is written. */
  labelAt: { x: number; y: number; anchor: "start" | "middle" | "end" };
};

export const VESSELS: readonly Vessel[] = [
  {
    name: "Pulmonary artery",
    kind: "artery",
    from: "rightVentricle",
    to: "lungs",
    oxygen: "low",
    circuit: "pulmonary",
    points: [
      { x: 152, y: 162 },
      { x: 152, y: 58 },
    ],
    labelAt: { x: 144, y: 90, anchor: "end" },
  },
  {
    name: "Pulmonary veins",
    kind: "vein",
    from: "lungs",
    to: "leftAtrium",
    oxygen: "high",
    circuit: "pulmonary",
    points: [
      { x: 224, y: 40 },
      { x: 254, y: 40 },
      { x: 254, y: 138 },
      { x: 220, y: 138 },
    ],
    labelAt: { x: 244, y: 90, anchor: "end" },
  },
  {
    name: "Aorta",
    kind: "artery",
    from: "leftVentricle",
    to: "body",
    oxygen: "high",
    circuit: "systemic",
    points: [
      { x: 220, y: 184 },
      { x: 284, y: 184 },
      { x: 284, y: 264 },
      { x: 224, y: 264 },
    ],
    labelAt: { x: 276, y: 226, anchor: "end" },
  },
  {
    name: "Venae cavae",
    kind: "vein",
    from: "body",
    to: "rightAtrium",
    oxygen: "low",
    circuit: "systemic",
    points: [
      { x: 96, y: 264 },
      { x: 38, y: 264 },
      { x: 38, y: 138 },
      { x: 100, y: 138 },
    ],
    labelAt: { x: 44, y: 226, anchor: "start" },
  },
];

/** True when a point lies on the border of a box (within 0.5 units). */
export function onBorder(p: { x: number; y: number }, b: Box): boolean {
  const inX = p.x >= b.x - 0.5 && p.x <= b.x + b.w + 0.5;
  const inY = p.y >= b.y - 0.5 && p.y <= b.y + b.h + 0.5;
  const onV = Math.abs(p.x - b.x) <= 0.5 || Math.abs(p.x - (b.x + b.w)) <= 0.5;
  const onH = Math.abs(p.y - b.y) <= 0.5 || Math.abs(p.y - (b.y + b.h)) <= 0.5;
  return (onV && inY) || (onH && inX);
}

/** Midpoint and direction (degrees) of a path's longest segment, for its arrowhead. */
export function arrowAt(points: readonly { x: number; y: number }[]) {
  let best = { len: -1, x: 0, y: 0, angle: 0 };
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len > best.len) best = { len, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
  }
  return best;
}

const TONE = {
  high: { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
  low: { stroke: "stroke-sky-600 dark:stroke-sky-400", fill: "fill-sky-600 dark:fill-sky-400", text: "fill-sky-700 dark:fill-sky-300" },
} as const;

const CHAMBER_TONE: Record<string, string> = {
  rightAtrium: "fill-sky-100 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400",
  rightVentricle: "fill-sky-100 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400",
  leftAtrium: "fill-rose-100 stroke-rose-600 dark:fill-rose-950/50 dark:stroke-rose-400",
  leftVentricle: "fill-rose-100 stroke-rose-600 dark:fill-rose-950/50 dark:stroke-rose-400",
  lungs: "fill-muted/40 stroke-muted-foreground",
  body: "fill-muted/40 stroke-muted-foreground",
};

export default function ImatDoubleCirculation() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · double circulation
      </p>
      <svg
        viewBox="0 0 320 300"
        className="block h-auto w-full"
        role="img"
        aria-label="Double circulation: the right ventricle pumps blood through the pulmonary artery to the lungs, it returns by the pulmonary veins to the left atrium; the left ventricle pumps it through the aorta to the body, and it returns by the venae cavae to the right atrium"
      >
        <text x={160} y={13} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Pulmonary circuit
        </text>
        <text x={160} y={296} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Systemic circuit
        </text>

        {/* Vessels under the boxes, so each line meets its box edge cleanly. */}
        {VESSELS.map((v) => {
          const a = arrowAt(v.points);
          return (
            <g key={v.name}>
              <polyline
                points={v.points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                strokeWidth={4}
                strokeLinejoin="round"
                className={TONE[v.oxygen].stroke}
              />
              <polygon
                points="7,0 -5,-6 -5,6"
                transform={`translate(${a.x} ${a.y}) rotate(${a.angle})`}
                className={TONE[v.oxygen].fill}
              />
              <text x={v.labelAt.x} y={v.labelAt.y} textAnchor={v.labelAt.anchor} className="fill-foreground text-[10px] font-semibold">
                {v.name}
              </text>
              <text x={v.labelAt.x} y={v.labelAt.y + 12} textAnchor={v.labelAt.anchor} className={`${TONE[v.oxygen].text} text-[10px]`}>
                {v.oxygen === "high" ? "oxygenated" : "deoxygenated"}
              </text>
            </g>
          );
        })}

        {(Object.values(BOXES) as Box[]).map((b) => (
          <g key={b.id}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6} strokeWidth={1.5} className={CHAMBER_TONE[b.id]} />
            <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 2} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {b.label[0]}
            </text>
            {b.label[1] && (
              <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 10} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {b.label[1]}
              </text>
            )}
          </g>
        ))}

        <text x={70} y={186} textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold">
          Heart
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Blood passes through the heart twice per circuit. Arteries carry blood away from the heart and veins towards it,
        whatever its oxygen: the pulmonary artery carries deoxygenated blood and the pulmonary veins oxygenated blood.
      </p>
    </div>
  );
}
