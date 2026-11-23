/**
 * Still: the five xenon compounds of the concept's table (nchpb-xenon), each
 * with its bond pairs and lone pairs drawn: XeF₂ 2 + 3 sp³d linear, XeF₄ 4 + 2
 * sp³d² square planar, XeF₆ 6 + 1 sp³d³ distorted octahedral, XeO₃ 3 + 1 sp³
 * pyramidal, XeOF₄ 5 + 1 sp³d² square pyramidal.
 *
 * The lone pairs come from counting, as the concept does: xenon has 8 outer
 * electrons, each F uses 1 and each double-bonded O uses 2, and what is left
 * pairs up. A double bond counts as one σ bond pair. `XENON` holds the drawn
 * positions, so the test can check the picture carries the right number of
 * atoms and lone pairs. Server component, pure SVG. Pinned by
 * tests/notes-w2-03.test.ts.
 */

type Pt = readonly [number, number];
export type Ligand = { el: "F" | "O"; at: Pt };
export type XenonCompound = {
  formula: string;
  bondPairs: number;
  lonePairs: number;
  hybrid: string;
  shape: string;
  ligands: readonly Ligand[];
  /** Lone pair lobes, as offsets from xenon. */
  lobes: readonly Pt[];
  centre: Pt;
};

const S = 18.4; // 26 cos 45°
const T = 7.1; // the same square seen at a slant
const SQUARE: readonly Pt[] = [
  [S, T],
  [-S, T],
  [-S, -T],
  [S, -T],
];

export const XENON: readonly XenonCompound[] = [
  {
    formula: "XeF₂",
    bondPairs: 2,
    lonePairs: 3,
    hybrid: "sp³d",
    shape: "linear",
    ligands: [
      { el: "F", at: [0, -26] },
      { el: "F", at: [0, 26] },
    ],
    lobes: [
      [19, 0],
      [-11, 9],
      [-11, -9],
    ],
    centre: [55, 46],
  },
  {
    formula: "XeF₄",
    bondPairs: 4,
    lonePairs: 2,
    hybrid: "sp³d²",
    shape: "square planar",
    ligands: SQUARE.map((at) => ({ el: "F" as const, at })),
    lobes: [
      [0, -17],
      [0, 17],
    ],
    centre: [160, 46],
  },
  {
    formula: "XeF₆",
    bondPairs: 6,
    lonePairs: 1,
    hybrid: "sp³d³",
    shape: "distorted octahedral",
    ligands: [{ el: "F", at: [-7, -25] }, { el: "F", at: [0, 26] }, ...SQUARE.map((at) => ({ el: "F" as const, at }))],
    lobes: [[13, -15]],
    centre: [265, 46],
  },
  {
    formula: "XeO₃",
    bondPairs: 3,
    lonePairs: 1,
    hybrid: "sp³",
    shape: "pyramidal",
    ligands: [
      { el: "O", at: [-21, 13] },
      { el: "O", at: [21, 13] },
      { el: "O", at: [4, 24] },
    ],
    lobes: [[0, -17]],
    centre: [107, 210],
  },
  {
    formula: "XeOF₄",
    bondPairs: 5,
    lonePairs: 1,
    hybrid: "sp³d²",
    shape: "square pyramidal",
    ligands: [{ el: "O", at: [0, -26] }, ...SQUARE.map((at) => ({ el: "F" as const, at }))],
    lobes: [[0, 17]],
    centre: [213, 210],
  },
];

/** Xenon's 8 outer electrons, less 1 per F and 2 per double-bonded O, in pairs. */
export function lonePairsByCount(ligands: readonly Ligand[]): number {
  const used = ligands.reduce((n, l) => n + (l.el === "F" ? 1 : 2), 0);
  return (8 - used) / 2;
}

/** Hybridisation from the number of electron pairs on xenon. */
export function hybridFor(pairs: number): string {
  return ({ 4: "sp³", 5: "sp³d", 6: "sp³d²", 7: "sp³d³" } as Record<number, string>)[pairs] ?? "?";
}

const r1 = (n: number) => Math.round(n * 10) / 10;
/** Drawing scale: the offsets above are multiplied by this. */
const K = 1.45;

function Bond({ c, at: raw, double }: { c: Pt; at: Pt; double: boolean }) {
  const at = [raw[0] * K, raw[1] * K];
  const len = Math.hypot(at[0], at[1]);
  const ux = at[0] / len;
  const uy = at[1] / len;
  const a = [c[0] + ux * 8, c[1] + uy * 8];
  const b = [c[0] + at[0] - ux * 7, c[1] + at[1] - uy * 7];
  if (!double) return <line x1={r1(a[0])} y1={r1(a[1])} x2={r1(b[0])} y2={r1(b[1])} strokeWidth={1.3} className="stroke-foreground" />;
  const px = -uy * 1.8;
  const py = ux * 1.8;
  return (
    <g strokeWidth={1.1} className="stroke-foreground">
      <line x1={r1(a[0] + px)} y1={r1(a[1] + py)} x2={r1(b[0] + px)} y2={r1(b[1] + py)} />
      <line x1={r1(a[0] - px)} y1={r1(a[1] - py)} x2={r1(b[0] - px)} y2={r1(b[1] - py)} />
    </g>
  );
}

function Lobe({ c, at: raw }: { c: Pt; at: Pt }) {
  const at = [raw[0] * K, raw[1] * K];
  const angle = (Math.atan2(at[1], at[0]) * 180) / Math.PI;
  const x = r1(c[0] + at[0]);
  const y = r1(c[1] + at[1]);
  return (
    <g transform={`translate(${x} ${y}) rotate(${r1(angle)})`}>
      <ellipse rx={8.5} ry={5.5} className="fill-amber-300/70 stroke-amber-600 dark:fill-amber-500/40 dark:stroke-amber-400" strokeWidth={0.8} />
      <circle cx={0} cy={-1.6} r={0.9} className="fill-foreground" />
      <circle cx={0} cy={1.6} r={0.9} className="fill-foreground" />
    </g>
  );
}

function Panel({ m }: { m: XenonCompound }) {
  const c = m.centre;
  return (
    <g>
      {m.ligands.map((l, i) => (
        <Bond key={`b${i}`} c={c} at={l.at} double={l.el === "O"} />
      ))}
      {m.lobes.map((at, i) => (
        <Lobe key={`l${i}`} c={c} at={at} />
      ))}
      {m.ligands.map((l, i) => (
        <text
          key={`t${i}`}
          x={r1(c[0] + l.at[0] * K)}
          y={r1(c[1] + l.at[1] * K + 3.5)}
          textAnchor="middle"
          className={`${l.el === "O" ? "fill-rose-700 dark:fill-rose-300" : "fill-sky-700 dark:fill-sky-300"} text-[11px] font-semibold`}
        >
          {l.el}
        </text>
      ))}
      <circle cx={c[0]} cy={c[1]} r={7.5} className="fill-background" />
      <text x={c[0]} y={c[1] + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        Xe
      </text>
      <text x={c[0]} y={c[1] + 58} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {m.formula}
      </text>
      <text x={c[0]} y={c[1] + 71} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {m.bondPairs} + {m.lonePairs} pairs · {m.hybrid}
      </text>
      <text x={c[0]} y={c[1] + 84} textAnchor="middle" className={`fill-indigo-700 ${m.shape.length > 14 ? "text-[9px]" : "text-[10px]"} font-semibold dark:fill-indigo-300`}>
        {m.shape}
      </text>
    </g>
  );
}

export default function NeetXenonShapes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · shapes of the xenon compounds
      </p>
      <svg
        viewBox="0 0 320 306"
        className="block h-auto w-full"
        role="img"
        aria-label="Five xenon compounds with their bond pairs and lone pairs. XeF2: 2 bond pairs, 3 lone pairs, sp3d, linear. XeF4: 4 and 2, sp3d2, square planar. XeF6: 6 and 1, sp3d3, distorted octahedral. XeO3: 3 and 1, sp3, pyramidal. XeOF4: 5 and 1, sp3d2, square pyramidal."
      >
        {XENON.map((m) => (
          <Panel key={m.formula} m={m} />
        ))}
      </svg>
      <p className="mt-2 text-sm text-foreground">
        Bond pairs + lone pairs give the hybridisation (5 pairs sp³d, 6 sp³d², 7 sp³d³); the bond pairs alone give the shape. A double bond to
        oxygen counts as one bond pair.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Shaded lobes: lone pairs on xenon. Under each: bond pairs + lone pairs. Xenon has 8 outer electrons; in XeF₄, 4 go into the Xe–F bonds
        and 4 are left, which is 2 lone pairs.
      </p>
    </div>
  );
}
