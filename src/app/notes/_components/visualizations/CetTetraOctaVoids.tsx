/**
 * Diagram: the two kinds of void in close packing (concept cetss-counting-voids).
 * A tetrahedral void is the hole capped by 4 spheres (three in a layer, one on
 * top); an octahedral void is ringed by 6. N close-packed spheres leave 2N
 * tetrahedral and N octahedral voids, 3N in all. Tetrahedral is the SMALLER
 * hole and the MORE numerous (radius ratio 0.225 against 0.414).
 *
 * Numbers: the concept's worked example, 0.5 mol of an hcp metal:
 * N = 3.011 × 10²³, so 3.011 × 10²³ octahedral and 6.022 × 10²³ tetrahedral.
 * Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */

export const AVOGADRO = 6.022e23;

/** Voids per close-packed sphere. */
export const VOIDS_PER_ATOM = { tetrahedral: 2, octahedral: 1 } as const;

/** Spheres around each kind of void. */
export const SPHERES_AROUND = { tetrahedral: 4, octahedral: 6 } as const;

/** Largest sphere that fits each void, as a fraction of the packed sphere's radius. */
export const RADIUS_RATIO = {
  tetrahedral: Math.sqrt(3 / 2) - 1,
  octahedral: Math.SQRT2 - 1,
} as const;

/** Void counts for N close-packed particles. */
export function voidCounts(n: number): { tetrahedral: number; octahedral: number; total: number } {
  return { tetrahedral: 2 * n, octahedral: n, total: 3 * n };
}

/** The worked example: 0.5 mol of a metal packed in hcp. */
export const VOID_EXAMPLE = { mol: 0.5 } as const;
export const EXAMPLE_N = VOID_EXAMPLE.mol * AVOGADRO;

/** Atoms in an fcc (ccp) unit cell, and its voids. */
export const FCC_ATOMS = 4;

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** A number in the concept's style, e.g. 3.011 × 10²³ (four significant figures). */
export function sci(x: number): string {
  const exp = Math.floor(Math.log10(Math.abs(x)));
  const mant = (x / 10 ** exp).toFixed(3);
  return `${mant} × 10${String(exp)
    .split("")
    .map((c) => SUP[c])
    .join("")}`;
}

type Pt = { x: number; y: number };

/** Sphere centres around each void, relative to the void's panel centre (a slight view from above). */
export const TETRA_SPHERES: readonly Pt[] = [
  { x: 8, y: 8 }, // back of the bottom layer
  { x: -36, y: 28 },
  { x: 36, y: 28 },
  { x: -2, y: -38 }, // the sphere on top
];
export const OCTA_SPHERES: readonly Pt[] = [
  { x: -12, y: -18 }, // back of the middle square
  { x: 0, y: -46 }, // top
  { x: -40, y: 6 },
  { x: 40, y: -6 },
  { x: 12, y: 18 },
  { x: 0, y: 46 }, // bottom
];

/** Where the hole is: the centre of the spheres around it. */
export function centroid(pts: readonly Pt[]): Pt {
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  };
}

const R = 13;
const TETRA_C = { x: 80, y: 74 };
const OCTA_C = { x: 240, y: 74 };

function Cluster({ c, spheres, edges }: { c: Pt; spheres: readonly Pt[]; edges: readonly [number, number][] }) {
  const hole = centroid(spheres);
  return (
    <g>
      {edges.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={c.x + spheres[i].x}
          y1={c.y + spheres[i].y}
          x2={c.x + spheres[j].x}
          y2={c.y + spheres[j].y}
          strokeDasharray="3 2"
          strokeWidth={1}
          className="stroke-muted-foreground"
        />
      ))}
      {spheres.map((p, i) => (
        <circle
          key={i}
          cx={c.x + p.x}
          cy={c.y + p.y}
          r={R}
          strokeWidth={1}
          fillOpacity={0.55}
          className="fill-sky-300 stroke-sky-700 dark:fill-sky-700 dark:stroke-sky-300"
        />
      ))}
      <circle cx={c.x + hole.x} cy={c.y + hole.y} r={4.5} className="fill-rose-600 dark:fill-rose-400" />
    </g>
  );
}

export default function CetTetraOctaVoids() {
  const n = EXAMPLE_N;
  const v = voidCounts(n);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · tetrahedral and octahedral voids
      </p>
      <svg
        viewBox="0 0 320 280"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: a tetrahedral void, the hole between 4 spheres, three in a layer and one on top. Right: an octahedral void, the hole ringed by 6 spheres. N close-packed spheres leave 2N tetrahedral voids and N octahedral voids. For 0.5 mol, N is 3.011 times 10 to the 23, so there are 6.022 times 10 to the 23 tetrahedral and 3.011 times 10 to the 23 octahedral voids."
      >
        <Cluster
          c={TETRA_C}
          spheres={TETRA_SPHERES}
          edges={[
            [0, 1],
            [0, 2],
            [1, 2],
            [3, 0],
            [3, 1],
            [3, 2],
          ]}
        />
        <Cluster
          c={OCTA_C}
          spheres={OCTA_SPHERES}
          edges={[
            [2, 0],
            [0, 3],
            [3, 4],
            [4, 2],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 0],
            [5, 2],
            [5, 3],
            [5, 4],
            [5, 0],
          ]}
        />

        {/* Labels under each void */}
        <text x={TETRA_C.x} y={146} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Tetrahedral void
        </text>
        <text x={TETRA_C.x} y={160} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {SPHERES_AROUND.tetrahedral} spheres around it
        </text>
        <text x={TETRA_C.x} y={174} textAnchor="middle" className="fill-foreground text-[10px]">
          smaller hole (0.225 r)
        </text>
        <text x={TETRA_C.x} y={190} textAnchor="middle" className="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
          2 per atom: 2N
        </text>

        <text x={OCTA_C.x} y={146} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Octahedral void
        </text>
        <text x={OCTA_C.x} y={160} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {SPHERES_AROUND.octahedral} spheres around it
        </text>
        <text x={OCTA_C.x} y={174} textAnchor="middle" className="fill-foreground text-[10px]">
          larger hole (0.414 r)
        </text>
        <text x={OCTA_C.x} y={190} textAnchor="middle" className="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
          1 per atom: N
        </text>

        {/* The worked count */}
        <rect x={8} y={202} width={304} height={70} rx={6} className="fill-background stroke-border" />
        <text x={18} y={218} className="fill-foreground text-[10px] font-semibold">
          0.5 mol, hcp: N = 0.5 × 6.022 × 10²³ = {sci(n)}
        </text>
        <text x={18} y={233} className="fill-foreground text-[10px]">
          tetrahedral: 2N = {sci(v.tetrahedral)}
        </text>
        <text x={18} y={247} className="fill-foreground text-[10px]">
          octahedral: N = {sci(v.octahedral)}
        </text>
        <text x={18} y={263} className="fill-muted-foreground text-[10px]">
          fcc cell, {FCC_ATOMS} atoms: {voidCounts(FCC_ATOMS).tetrahedral} tetrahedral, {voidCounts(FCC_ATOMS).octahedral} octahedral voids
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Red dot: the void. Spheres are drawn smaller than in real packing so the hole shows; in the crystal they touch.
      </p>
    </div>
  );
}
