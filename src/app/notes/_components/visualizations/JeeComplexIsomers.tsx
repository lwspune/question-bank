/**
 * Static figure: stereoisomers of octahedral complexes (concepts
 * jccoord-geometrical and jccoord-optical), using the concept's own examples.
 *
 * - [Co(NH₃)₄Cl₂]⁺, MA₄B₂: cis (Cl–Co–Cl 90°) and trans (180°).
 * - [Co(NH₃)₃Cl₃], MA₃B₃: fac (the three Cl on one face, all Cl–Co–Cl 90°)
 *   and mer (along a meridian: 90° and 180°).
 * - [Co(en)₃]³⁺, M(AA)₃: three chelate rings, each spanning two cis
 *   positions. No geometrical isomers, but the complex and its mirror image
 *   cannot be laid on each other: an optical pair.
 *
 * Positions are the octahedron's six vertices ±x, ±y, ±z (z up, x towards
 * the reader). The exported 3D data lets the test check every angle and the
 * chirality by trying all 24 rotations of the octahedron.
 *
 * Server component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

export type Vertex = "+x" | "-x" | "+y" | "-y" | "+z" | "-z";

export const VECTORS: Record<Vertex, readonly [number, number, number]> = {
  "+x": [1, 0, 0],
  "-x": [-1, 0, 0],
  "+y": [0, 1, 0],
  "-y": [0, -1, 0],
  "+z": [0, 0, 1],
  "-z": [0, 0, -1],
};

export const ALL_VERTICES: readonly Vertex[] = ["+x", "-x", "+y", "-y", "+z", "-z"];

/** B (Cl) positions in each geometrical isomer; every other vertex is A (NH₃). */
export const ISOMERS = {
  cis: ["+z", "+y"],
  trans: ["+z", "-z"],
  fac: ["+x", "+y", "+z"],
  mer: ["+z", "-z", "+y"],
} as const satisfies Record<string, readonly Vertex[]>;

/** The three en rings of [Co(en)₃]³⁺, each joining two donor N atoms. */
export const EN_RINGS: readonly (readonly [Vertex, Vertex])[] = [
  ["+z", "-x"],
  ["+y", "-z"],
  ["-y", "+x"],
];

/** Angle at the metal between two positions, in degrees. */
export function bondAngle(a: Vertex, b: Vertex): number {
  const u = VECTORS[a];
  const v = VECTORS[b];
  const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  return Math.round((Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI);
}

/** Every B–M–B angle in an isomer, sorted. */
export function bAngles(bs: readonly Vertex[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) out.push(bondAngle(bs[i], bs[j]));
  return out.sort((p, q) => p - q);
}

// Projection: 2D offset of each vertex from the metal, and which are at the back.
export const PROJ: Record<Vertex, { u: number; v: number }> = {
  "+x": { u: -13, v: 10 },
  "-x": { u: 13, v: -10 },
  "+y": { u: 30, v: 0 },
  "-y": { u: -30, v: 0 },
  "+z": { u: 0, v: -30 },
  "-z": { u: 0, v: 30 },
};
const BACK: Vertex = "-x";

const EDGES: readonly (readonly [Vertex, Vertex])[] = [
  ["+x", "+y"],
  ["+y", "-x"],
  ["-x", "-y"],
  ["-y", "+x"],
  ...(["+x", "-x", "+y", "-y"] as const).flatMap((e) => [
    ["+z", e] as const,
    ["-z", e] as const,
  ]),
];

const r2 = (n: number) => Math.round(n * 100) / 100;

function pos(cx: number, cy: number, p: Vertex, mirror: boolean) {
  return { x: r2(cx + (mirror ? -1 : 1) * PROJ[p].u), y: r2(cy + PROJ[p].v) };
}

/** Draw order: back vertex first, the front one (+x) last. */
const DRAW_ORDER: readonly Vertex[] = ["-x", "+z", "-y", "+y", "-z", "+x"];

function Octahedron({
  cx,
  cy,
  bs = [],
  rings = [],
  mirror = false,
}: {
  cx: number;
  cy: number;
  bs?: readonly Vertex[];
  rings?: readonly (readonly [Vertex, Vertex])[];
  mirror?: boolean;
}) {
  const P = (v: Vertex) => pos(cx, cy, v, mirror);
  const donor = rings.length > 0;
  return (
    <g>
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={P(a).x} y1={P(a).y} x2={P(b).x} y2={P(b).y} strokeWidth={0.7} className="stroke-border" />
      ))}
      {ALL_VERTICES.map((v) => (
        <line
          key={v}
          x1={cx}
          y1={cy}
          x2={P(v).x}
          y2={P(v).y}
          strokeWidth={1.4}
          strokeDasharray={v === BACK ? "2.5 2" : undefined}
          className="stroke-muted-foreground"
        />
      ))}
      {rings.map(([a, b], i) => {
        const pa = P(a);
        const pb = P(b);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2;
        const qx = r2(mx + (mx - cx) * 0.95);
        const qy = r2(my + (my - cy) * 0.95);
        return (
          <path
            key={i}
            d={`M${pa.x},${pa.y} Q${qx},${qy} ${pb.x},${pb.y}`}
            fill="none"
            strokeWidth={2.4}
            className="stroke-sky-600 dark:stroke-sky-400"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={8.5} className="fill-indigo-600 dark:fill-indigo-500" />
      <text x={cx} y={cy + 3.5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
        Co
      </text>
      {DRAW_ORDER.map((v) => {
        const p = P(v);
        if (donor) {
          return (
            <g key={v}>
              <circle cx={p.x} cy={p.y} r={6} className="fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400" strokeWidth={1.2} />
              <text x={p.x} y={p.y + 3.2} textAnchor="middle" className="fill-sky-800 text-[8.5px] font-semibold dark:fill-sky-200">
                N
              </text>
            </g>
          );
        }
        const isB = bs.includes(v);
        return (
          <g key={v}>
            <circle
              cx={p.x}
              cy={p.y}
              r={7}
              strokeWidth={1.2}
              className={
                isB
                  ? "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-800 dark:stroke-emerald-300"
                  : "fill-muted stroke-muted-foreground"
              }
            />
            <text
              x={p.x}
              y={p.y + 3.5}
              textAnchor="middle"
              className={`${isB ? "fill-emerald-900 dark:fill-emerald-100" : "fill-foreground"} text-[10px] font-semibold`}
            >
              {isB ? "B" : "A"}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Caption({ x, y, name, detail }: { x: number; y: number; name: string; detail: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="fill-foreground text-[10px]">
      <tspan className="font-semibold">{name}</tspan>: {detail}
    </text>
  );
}

export const ROW_Y = [62, 172, 282] as const;

export default function JeeComplexIsomers() {
  const deg = (bs: readonly Vertex[]) => [...new Set(bAngles(bs))].map((a) => `${a}°`).join(" and ");
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · geometrical and optical isomers of octahedral complexes
      </p>

      <svg
        viewBox="0 0 320 338"
        className="block h-auto w-full"
        role="img"
        aria-label="Three rows of octahedra. Row 1, [Co(NH3)4Cl2]+: cis, with the two chlorides 90 degrees apart, and trans, 180 degrees apart. Row 2, [Co(NH3)3Cl3]: fac, the three chlorides on one face, all 90 degrees apart, and mer, along a meridian, 90 and 180 degrees. Row 3, [Co(en)3]3+: three en rings each spanning two cis positions, drawn with its mirror image; the two cannot be laid on each other, an optical pair."
      >
        {/* Row 1: MA4B2 */}
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          [Co(NH₃)₄Cl₂]⁺, MA₄B₂ (A = NH₃, B = Cl)
        </text>
        <Octahedron cx={80} cy={ROW_Y[0]} bs={ISOMERS.cis} />
        <Octahedron cx={240} cy={ROW_Y[0]} bs={ISOMERS.trans} />
        <Caption x={80} y={ROW_Y[0] + 50} name="cis" detail={`Cl–Co–Cl ${deg(ISOMERS.cis)}`} />
        <Caption x={240} y={ROW_Y[0] + 50} name="trans" detail={`Cl–Co–Cl ${deg(ISOMERS.trans)}`} />


        {/* Row 2: MA3B3 */}
        <text x={160} y={ROW_Y[1] - 46} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          [Co(NH₃)₃Cl₃], MA₃B₃
        </text>
        <Octahedron cx={80} cy={ROW_Y[1]} bs={ISOMERS.fac} />
        <Octahedron cx={240} cy={ROW_Y[1]} bs={ISOMERS.mer} />
        <Caption x={80} y={ROW_Y[1] + 50} name="fac" detail={`one face, all ${deg(ISOMERS.fac)}`} />
        <Caption x={240} y={ROW_Y[1] + 50} name="mer" detail={deg(ISOMERS.mer)} />


        {/* Row 3: M(AA)3 and its mirror image */}
        <text x={160} y={ROW_Y[2] - 46} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          [Co(en)₃]³⁺, M(AA)₃: an optical pair
        </text>
        <Octahedron cx={92} cy={ROW_Y[2]} rings={EN_RINGS} />
        <Octahedron cx={228} cy={ROW_Y[2]} rings={EN_RINGS} mirror />
        <line x1={160} y1={ROW_Y[2] - 36} x2={160} y2={ROW_Y[2] + 34} strokeWidth={1.2} strokeDasharray="4 3" className="stroke-muted-foreground" />
        <text x={164} y={ROW_Y[2] - 26} className="fill-muted-foreground text-[10px]">
          mirror
        </text>
        <text x={160} y={ROW_Y[2] + 50} textAnchor="middle" className="fill-foreground text-[10px]">
          not superimposable: two optical isomers
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground">
        cis and trans, and fac and mer, are geometrical isomers: which ligands are next to each other (90°) and which are opposite
        (180°). All four have a mirror plane, so none is optically active.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Blue arcs: the three en rings, each joining two N atoms in cis positions. With no mirror plane, [Co(en)₃]³⁺ and its mirror
        image are a left- and right-handed pair. Dashed bond: the position at the back.
      </p>
    </div>
  );
}
