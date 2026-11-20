/**
 * Static figure: leaf venation and leaf arrangement (concept sscbpbpl-form).
 *
 * Exactly the concept's pairs: reticulate (net) venation in dicots such as
 * tulsi, coriander and China rose; parallel venation in monocots such as maize.
 * Phyllotaxy: opposite in guava and Calotropis, alternate in China rose and
 * mustard, whorled in Alstonia. Values pinned by
 * tests/notes-ssc-visuals-gk.test.ts. Server component, no client state.
 */

export type Venation = { name: string; group: string; examples: readonly string[] };

export const VENATION: readonly Venation[] = [
  { name: "Reticulate (net)", group: "dicots", examples: ["tulsi", "coriander", "China rose"] },
  { name: "Parallel", group: "monocots", examples: ["maize"] },
];

export type Phyllotaxy = {
  name: string;
  /** Leaves drawn at each node. */
  leavesPerNode: number;
  examples: readonly string[];
  /** Angle of each leaf at a node (degrees, SVG rotation of a right-pointing leaf). */
  angles: readonly (readonly number[])[];
};

export const PHYLLOTAXY: readonly Phyllotaxy[] = [
  { name: "Alternate", leavesPerNode: 1, examples: ["China rose", "mustard"], angles: [[-20], [200], [-20]] },
  { name: "Opposite", leavesPerNode: 2, examples: ["guava", "Calotropis"], angles: [[-20, 200], [-20, 200]] },
  { name: "Whorled", leavesPerNode: 4, examples: ["Alstonia"], angles: [[-20, 200, -60, 240], [-20, 200, -60, 240]] },
];

const STEM_X = [55, 160, 265];
const STEM_TOP = 192;
const STEM_BOTTOM = 252;

function nodeYs(count: number): number[] {
  const gap = (STEM_BOTTOM - STEM_TOP - 12) / count;
  return Array.from({ length: count }, (_, i) => Math.round(STEM_TOP + 12 + gap * i + gap / 2));
}

function Leaf({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <path
      d={`M ${x} ${y} Q ${x + 12} ${y - 8} ${x + 24} ${y} Q ${x + 12} ${y + 8} ${x} ${y} Z`}
      transform={`rotate(${angle} ${x} ${y})`}
      className="fill-emerald-400 stroke-emerald-700 dark:fill-emerald-600 dark:stroke-emerald-300"
      strokeWidth={0.8}
    />
  );
}

/** Side veins of the net-veined leaf: where each leaves the midrib, and how far out it reaches (inside the outline). */
const NET_VEINS = [
  { y: 56, reach: 20 },
  { y: 72, reach: 27 },
  { y: 88, reach: 30 },
  { y: 104, reach: 27 },
];

function NetLeaf() {
  const cx = 80;
  const vein = "stroke-emerald-800 dark:stroke-emerald-200";
  /** Point `off` units out along side vein k on side s. */
  const on = (k: number, s: number, off: number) =>
    `${cx + s * off} ${(NET_VEINS[k].y - (10 * off) / NET_VEINS[k].reach).toFixed(2)}`;
  return (
    <g>
      <path
        d={`M ${cx} 28 C ${cx + 50} 50 ${cx + 50} 104 ${cx} 124 C ${cx - 50} 104 ${cx - 50} 50 ${cx} 28 Z`}
        className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700 dark:stroke-emerald-300"
        strokeWidth={1.2}
      />
      <line x1={cx} y1={30} x2={cx} y2={136} className={vein} strokeWidth={1.4} />
      {[-1, 1].map((s) =>
        NET_VEINS.map((v, k) => {
          const next = NET_VEINS[k + 1];
          const midY = next ? (v.y + next.y) / 2 - 4 : 0;
          return (
            <g key={`${s}-${v.y}`}>
              <line x1={cx} y1={v.y} x2={cx + s * v.reach} y2={v.y - 10} className={vein} strokeWidth={0.9} />
              {next !== undefined && (
                <path
                  d={`M ${on(k, s, 9)} L ${cx + s * 15} ${midY} L ${on(k + 1, s, 9)} M ${cx + s * 15} ${midY} L ${on(k + 1, s, 18)}`}
                  fill="none"
                  className={vein}
                  strokeWidth={0.6}
                />
              )}
            </g>
          );
        }),
      )}
    </g>
  );
}

/** Long veins of the maize leaf: x where each starts at the base. */
const PARALLEL_VEIN_X = [232, 236, 240, 244, 248];

function ParallelLeaf() {
  const vein = "stroke-emerald-800 dark:stroke-emerald-200";
  return (
    <g>
      <path
        d="M 240 26 C 256 50 258 100 254 128 L 226 128 C 222 100 224 50 240 26 Z"
        className="fill-emerald-300 stroke-emerald-700 dark:fill-emerald-700 dark:stroke-emerald-300"
        strokeWidth={1.2}
      />
      {PARALLEL_VEIN_X.map((x) => (
        <path key={x} d={`M ${x} 128 Q ${x + (x - 240) * 0.4} 70 240 30`} fill="none" className={vein} strokeWidth={0.9} />
      ))}
      <line x1={240} y1={128} x2={240} y2={136} className={vein} strokeWidth={1.4} />
    </g>
  );
}

export default function SscLeafVenation() {
  const [net, par] = VENATION;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · leaf venation and leaf arrangement
      </p>
      <svg
        viewBox="0 0 320 288"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: a net-veined leaf, reticulate venation, found in dicots such as tulsi, coriander and China rose, beside a maize leaf with parallel veins, as in monocots. Bottom: three stems. Alternate: one leaf at each node, as in China rose and mustard. Opposite: two leaves facing each other at a node, as in guava and Calotropis. Whorled: several leaves at a node, as in Alstonia."
      >
        <text x={8} y={14} className="fill-foreground text-[11px] font-semibold">
          Venation
        </text>
        <NetLeaf />
        <ParallelLeaf />
        <text x={80} y={150} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {net.name}
        </text>
        <text x={80} y={163} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {net.group}: {net.examples.slice(0, 2).join(", ")},
        </text>
        <text x={80} y={175} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {net.examples.slice(2).join(", ")}
        </text>
        <text x={240} y={150} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {par.name}
        </text>
        <text x={240} y={163} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {par.group}: {par.examples.join(", ")}
        </text>

        <line x1={8} y1={184} x2={312} y2={184} className="stroke-border" strokeWidth={1} />
        <text x={8} y={198} className="fill-foreground text-[11px] font-semibold">
          Leaf arrangement (phyllotaxy)
        </text>

        {PHYLLOTAXY.map((p, i) => {
          const x = STEM_X[i];
          const ys = nodeYs(p.angles.length);
          return (
            <g key={p.name}>
              <line x1={x} y1={STEM_TOP + 12} x2={x} y2={STEM_BOTTOM} className="stroke-emerald-800 dark:stroke-emerald-300" strokeWidth={2} />
              {ys.map((y, k) => (
                <g key={y}>
                  {p.angles[k].map((a) => (
                    <Leaf key={a} x={x} y={y} angle={a} />
                  ))}
                  <circle cx={x} cy={y} r={1.8} className="fill-emerald-900 dark:fill-emerald-100" />
                </g>
              ))}
              <text x={x} y={268} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
                {p.name}
              </text>
              <text x={x} y={282} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {p.examples.join(", ")}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Net veins in dicots, parallel veins in monocots. Parallel veins give vascular bundles of similar size.
      </p>
    </div>
  );
}
