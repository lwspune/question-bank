/**
 * Static figure: the eleven VSEPR shapes of the concept's table, one small
 * panel each, grouped in rows by the number of electron domains round the
 * central atom (2 to 6). Each panel draws the bonded atoms and the lone pairs,
 * names the shape, gives the bond angle exactly as the table words it, and
 * lists the table's example molecules.
 *
 * Bonds in the page plane are plain lines, a bond towards the reader is a
 * wedge, a bond going away is dashed. Lone pairs are lobes with two dots.
 *
 * Pedagogical aim: see that the shape is named from the ATOMS, while the lone
 * pairs still take up room (ammonia is pyramidal, water is bent). Pinned by
 * tests/notes-imat-visuals-chem1.test.ts. Server component, no client state.
 */

export type Depth = "plane" | "front" | "back";

/** One electron domain: a direction on the page (y down) and what sits there. */
export type Domain = { dx: number; dy: number; depth: Depth; lone: boolean };

export type VseprShape = {
  domains: number;
  lonePairs: number;
  /** Shape name, split into lines that fit a panel. */
  name: readonly string[];
  /** Bond angle, worded exactly as the concept's table. */
  angle: string;
  /** Example molecules from the table, in Unicode. */
  examples: string;
  dirs: readonly Domain[];
};

const at = (dx: number, dy: number, depth: Depth = "plane"): Domain => ({ dx, dy, depth, lone: false });
const lp = (dx: number, dy: number, depth: Depth = "plane"): Domain => ({ dx, dy, depth, lone: true });

/** Two atoms below the centre, `deg` degrees apart (drawn to the true angle). */
function pairBelow(deg: number): Domain[] {
  const h = (deg / 2) * (Math.PI / 180);
  return [at(-Math.sin(h), Math.cos(h)), at(Math.sin(h), Math.cos(h))];
}

// The tetrahedral set of four directions, as textbooks draw it.
const TET = { up: [0, -1], left: [-0.94, 0.34], front: [0.6, 0.62], back: [0.92, 0.1] } as const;
// The trigonal bipyramid and octahedron: axial up and down, the rest equatorial.
const EQ = { left: [-1, 0.12], front: [0.58, 0.5], back: [0.68, -0.32] } as const;
const OCT = { front: [-0.55, 0.45], back: [0.55, -0.45] } as const;

export const VSEPR_SHAPES: readonly VseprShape[] = [
  { domains: 2, lonePairs: 0, name: ["Linear"], angle: "180°", examples: "BeCl₂, CO₂, C₂H₂", dirs: [at(-1, 0), at(1, 0)] },
  {
    domains: 3,
    lonePairs: 0,
    name: ["Trigonal planar"],
    angle: "120°",
    examples: "BF₃, SO₃, CO₃²⁻",
    dirs: [at(0, -1), ...pairBelow(120)],
  },
  { domains: 3, lonePairs: 1, name: ["Bent"], angle: "just under 120°", examples: "SO₂, O₃", dirs: [lp(0, -1), ...pairBelow(117)] },
  {
    domains: 4,
    lonePairs: 0,
    name: ["Tetrahedral"],
    angle: "109.5°",
    examples: "CH₄, NH₄⁺, SO₄²⁻",
    dirs: [at(...TET.up), at(...TET.left), at(...TET.front, "front"), at(...TET.back, "back")],
  },
  {
    domains: 4,
    lonePairs: 1,
    name: ["Trigonal", "pyramidal"],
    angle: "about 107°",
    examples: "NH₃, PCl₃, H₃O⁺",
    dirs: [lp(...TET.up), at(...TET.left), at(...TET.front, "front"), at(...TET.back, "back")],
  },
  {
    domains: 4,
    lonePairs: 2,
    name: ["Bent"],
    angle: "about 104.5°",
    examples: "H₂O, H₂S",
    dirs: [lp(-0.62, -0.78), lp(0.62, -0.78), ...pairBelow(104.5)],
  },
  {
    domains: 5,
    lonePairs: 0,
    name: ["Trigonal", "bipyramidal"],
    angle: "120° and 90°",
    examples: "PCl₅",
    dirs: [at(0, -1), at(0, 1), at(...EQ.left), at(...EQ.front, "front"), at(...EQ.back, "back")],
  },
  {
    domains: 5,
    lonePairs: 1,
    name: ["Seesaw"],
    angle: "below 120° and 90°",
    examples: "SF₄",
    dirs: [at(0, -1), at(0, 1), lp(...EQ.left), at(...EQ.front, "front"), at(...EQ.back, "back")],
  },
  {
    domains: 5,
    lonePairs: 2,
    name: ["T-shaped"],
    angle: "about 90°",
    examples: "ClF₃",
    dirs: [at(0, -1), at(0, 1), at(...EQ.left), lp(...EQ.front, "front"), lp(...EQ.back, "back")],
  },
  {
    domains: 6,
    lonePairs: 0,
    name: ["Octahedral"],
    angle: "90°",
    examples: "SF₆",
    dirs: [at(0, -1), at(0, 1), at(-1, 0), at(1, 0), at(...OCT.front, "front"), at(...OCT.back, "back")],
  },
  {
    domains: 6,
    lonePairs: 2,
    name: ["Square planar"],
    angle: "90°",
    examples: "XeF₄",
    dirs: [lp(0, -1), lp(0, 1), at(-1, 0), at(1, 0), at(...OCT.front, "front"), at(...OCT.back, "back")],
  },
];

/** Angle in degrees between two drawn directions. */
export function drawnAngle(a: Domain, b: Domain): number {
  const dot = a.dx * b.dx + a.dy * b.dy;
  return (Math.acos(dot / (Math.hypot(a.dx, a.dy) * Math.hypot(b.dx, b.dy))) * 180) / Math.PI;
}

// Layout (viewBox units).
const W = 320;
const TOP = 34;
const ROW_HEAD = 14;
const PANEL_H = 112;
const ROW_H = ROW_HEAD + PANEL_H + 4;
const PANEL_W = 104;
const COL = 108;
const BOND = 23;

const ROWS = [2, 3, 4, 5, 6] as const;
const H = TOP + ROWS.length * ROW_H;

const r1 = (n: number) => Math.round(n * 10) / 10;

function Bond({ cx, cy, d }: { cx: number; cy: number; d: Domain }) {
  const len = Math.hypot(d.dx, d.dy);
  const ux = d.dx / len;
  const uy = d.dy / len;
  const ex = cx + ux * BOND;
  const ey = cy + uy * BOND;
  if (d.depth === "front") {
    // A wedge: narrow at the centre, wide at the atom.
    const px = -uy * 3.2;
    const py = ux * 3.2;
    return (
      <polygon
        points={`${r1(cx)},${r1(cy)} ${r1(ex + px)},${r1(ey + py)} ${r1(ex - px)},${r1(ey - py)}`}
        className="fill-slate-600 dark:fill-slate-300"
      />
    );
  }
  return (
    <line
      x1={cx}
      y1={cy}
      x2={r1(ex)}
      y2={r1(ey)}
      className="stroke-slate-600 dark:stroke-slate-300"
      strokeWidth={1.8}
      strokeDasharray={d.depth === "back" ? "2.5 2" : undefined}
    />
  );
}

function LonePair({ cx, cy, d }: { cx: number; cy: number; d: Domain }) {
  const len = Math.hypot(d.dx, d.dy);
  const ux = d.dx / len;
  const uy = d.dy / len;
  const mx = cx + ux * 13;
  const my = cy + uy * 13;
  const deg = (Math.atan2(uy, ux) * 180) / Math.PI;
  return (
    <g transform={`translate(${r1(mx)} ${r1(my)}) rotate(${r1(deg)})`}>
      <ellipse cx={0} cy={0} rx={8.5} ry={5} className="fill-amber-200/70 stroke-amber-600 dark:fill-amber-500/25 dark:stroke-amber-400" strokeWidth={1} />
      <circle cx={0} cy={-2} r={1.4} className="fill-amber-800 dark:fill-amber-200" />
      <circle cx={0} cy={2} r={1.4} className="fill-amber-800 dark:fill-amber-200" />
    </g>
  );
}

function Panel({ shape, x, y }: { shape: VseprShape; x: number; y: number }) {
  const cx = x + PANEL_W / 2;
  const cy = y + 54;
  return (
    <g>
      <rect x={x} y={y} width={PANEL_W} height={PANEL_H} rx={6} className="fill-background/60 stroke-border" />
      {shape.name.map((line, i) => (
        <text key={line} x={cx} y={y + 12 + i * 11} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          {line}
        </text>
      ))}
      {shape.dirs.filter((d) => d.lone).map((d, i) => (
        <LonePair key={`lp${i}`} cx={cx} cy={cy} d={d} />
      ))}
      {shape.dirs.filter((d) => !d.lone && d.depth === "back").map((d, i) => (
        <Bond key={`b${i}`} cx={cx} cy={cy} d={d} />
      ))}
      {shape.dirs.filter((d) => !d.lone && d.depth !== "back").map((d, i) => (
        <Bond key={`f${i}`} cx={cx} cy={cy} d={d} />
      ))}
      {shape.dirs
        .filter((d) => !d.lone)
        .map((d, i) => {
          const len = Math.hypot(d.dx, d.dy);
          return (
            <circle
              key={`a${i}`}
              cx={r1(cx + (d.dx / len) * BOND)}
              cy={r1(cy + (d.dy / len) * BOND)}
              r={4.5}
              className="fill-sky-500 stroke-background dark:fill-sky-400"
              strokeWidth={1}
            />
          );
        })}
      <circle cx={cx} cy={cy} r={6} className="fill-indigo-600 stroke-background dark:fill-indigo-400" strokeWidth={1} />
      <text x={cx} y={y + 95} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        {shape.angle}
      </text>
      <text x={cx} y={y + 107} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {shape.examples}
      </text>
    </g>
  );
}

export default function ImatVseprShapes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the VSEPR shapes and their bond angles
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Eleven molecular shapes, grouped by the number of electron domains round the central atom. Two domains: linear, 180 degrees. Three: trigonal planar, 120 degrees; bent with one lone pair, just under 120. Four: tetrahedral, 109.5; trigonal pyramidal with one lone pair, about 107; bent with two lone pairs, about 104.5. Five: trigonal bipyramidal, 120 and 90; seesaw, one lone pair; T-shaped, two lone pairs, about 90. Six: octahedral, 90; square planar with two lone pairs opposite each other, 90."
      >
        {/* Key */}
        <circle cx={10} cy={12} r={4.5} className="fill-sky-500 dark:fill-sky-400" />
        <text x={18} y={15.5} className="fill-muted-foreground text-[10px]">
          bonded atom
        </text>
        <LonePair cx={80} cy={12} d={{ dx: 1, dy: 0, depth: "plane", lone: true }} />
        <text x={108} y={15.5} className="fill-muted-foreground text-[10px]">
          lone pair
        </text>
        <polygon points="160,12 178,8.8 178,15.2" className="fill-slate-600 dark:fill-slate-300" />
        <text x={182} y={15.5} className="fill-muted-foreground text-[10px]">
          towards you
        </text>
        <line x1={244} y1={12} x2={262} y2={12} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth={1.8} strokeDasharray="2.5 2" />
        <text x={266} y={15.5} className="fill-muted-foreground text-[10px]">
          away
        </text>

        {ROWS.map((n, r) => {
          const y = TOP + r * ROW_H;
          const shapes = VSEPR_SHAPES.filter((s) => s.domains === n);
          return (
            <g key={n}>
              <text x={2} y={y + 10} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
                {n} electron domains
              </text>
              <line x1={100} y1={y + 6.5} x2={W - 2} y2={y + 6.5} className="stroke-indigo-200 dark:stroke-indigo-900/60" />
              {shapes.map((s, c) => (
                <Panel key={`${s.domains}-${s.lonePairs}`} shape={s} x={2 + c * COL} y={y + ROW_HEAD} />
              ))}
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Count the electron domains round the central atom (bonds and lone pairs), then name the shape from the atoms only.
        Each lone pair pushes harder than a bond pair and closes the angle by about 2 to 3°: CH₄ 109.5°, NH₃ about 107°,
        H₂O about 104.5°. With five domains the lone pairs take equatorial positions; with six, two lone pairs sit
        opposite each other.
      </p>
    </div>
  );
}
