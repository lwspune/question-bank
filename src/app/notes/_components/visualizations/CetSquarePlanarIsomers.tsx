/**
 * Static figure: cis and trans forms of square planar platinum complexes
 * (concept cetcc-geometric-isomerism).
 *
 * Top: MA₂B₂, [Pt(NH₃)₂Cl₂]: cisplatin (the two NH₃ side by side, 90° apart)
 * and transplatin (opposite, 180°). Bottom: the worked example, MA₂BC,
 * [Pt(NH₃)₂ClBr]: the two NH₃ adjacent or across, two isomers.
 * `geometricIsomers` counts the distinct ways to put the ligands on the four
 * corners of a square, turning and flipping allowed, and reproduces the
 * concept's formula: MA₄, MA₃B 0; MA₂B₂, MA₂BC 2; MABCD 3. Pinned by
 * tests/notes-w2-14.test.ts. Server component.
 */

/** The 8 symmetries of a square (4 turns, 4 flips), as position maps on 0..3 (N, E, S, W). */
const SYMMETRIES: readonly ((i: number) => number)[] = [0, 1, 2, 3].flatMap((k) => [
  (i: number) => (i + k) % 4,
  (i: number) => (4 - i + k) % 4,
]);

function canonical(arr: readonly string[]): string {
  let best: string | null = null;
  for (const s of SYMMETRIES) {
    const out: string[] = new Array(4);
    arr.forEach((v, i) => {
      out[s(i)] = v;
    });
    const key = out.join("|");
    if (best === null || key < best) best = key;
  }
  return best as string;
}

function permutations(arr: readonly string[]): string[][] {
  if (arr.length <= 1) return [arr.slice()];
  const out: string[][] = [];
  arr.forEach((v, i) => {
    const rest = arr.filter((_, j) => j !== i);
    for (const p of permutations(rest)) out.push([v, ...p]);
  });
  return out;
}

/** Distinct square planar arrangements of four ligands. */
export function arrangements(ligands: readonly string[]): number {
  return new Set(permutations(ligands).map(canonical)).size;
}

/** Geometric isomers: one arrangement means none. */
export function geometricIsomers(ligands: readonly string[]): number {
  const n = arrangements(ligands);
  return n === 1 ? 0 : n;
}

/** Angle at the metal between two corner positions (0..3). */
export function angleBetween(i: number, j: number): number {
  const d = Math.abs(i - j) % 4;
  return 90 * Math.min(d, 4 - d);
}

export type Panel = { form: "cis" | "trans"; tag: string; ligands: readonly [string, string, string, string] };

/** Ligands at N, E, S, W. */
export const PANELS: readonly { title: string; panels: readonly [Panel, Panel] }[] = [
  {
    title: "MA₂B₂: [Pt(NH₃)₂Cl₂]",
    panels: [
      { form: "cis", tag: "cisplatin (anticancer drug)", ligands: ["NH₃", "NH₃", "Cl", "Cl"] },
      { form: "trans", tag: "transplatin", ligands: ["NH₃", "Cl", "NH₃", "Cl"] },
    ],
  },
  {
    title: "MA₂BC: [Pt(NH₃)₂ClBr]",
    panels: [
      { form: "cis", tag: "NH₃ side by side", ligands: ["NH₃", "NH₃", "Br", "Cl"] },
      { form: "trans", tag: "NH₃ opposite", ligands: ["NH₃", "Cl", "NH₃", "Br"] },
    ],
  },
];

/** The angle between the two NH₃ in a panel. */
export function ammineAngle(p: Panel): number {
  const idx = p.ligands.map((l, i) => (l === "NH₃" ? i : -1)).filter((i) => i >= 0);
  return angleBetween(idx[0], idx[1]);
}

const LIGAND_CLASS: Record<string, string> = {
  "NH₃": "fill-sky-700 dark:fill-sky-300",
  Cl: "fill-emerald-700 dark:fill-emerald-300",
  Br: "fill-amber-700 dark:fill-amber-300",
};

const COL_X = [84, 236] as const;
const ROW_Y = [74, 206] as const;
const BOND = 24;

function Complex({ cx, cy, p }: { cx: number; cy: number; p: Panel }) {
  // N, E, S, W unit directions.
  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ];
  const nh = p.ligands.map((l, i) => (l === "NH₃" ? i : -1)).filter((i) => i >= 0);
  return (
    <g>
      {dirs.map((d, i) => (
        <line
          key={i}
          x1={cx + d.dx * 10}
          y1={cy + d.dy * 10}
          x2={cx + d.dx * BOND}
          y2={cy + d.dy * BOND}
          strokeWidth={1.6}
          className="stroke-foreground"
        />
      ))}
      {/* the two NH₃ positions joined: short for cis, across for trans */}
      <line
        x1={cx + dirs[nh[0]].dx * BOND}
        y1={cy + dirs[nh[0]].dy * BOND}
        x2={cx + dirs[nh[1]].dx * BOND}
        y2={cy + dirs[nh[1]].dy * BOND}
        strokeWidth={1}
        strokeDasharray="3 2"
        className="stroke-sky-600 dark:stroke-sky-400"
      />
      <circle cx={cx} cy={cy} r={10} className="fill-indigo-600 dark:fill-indigo-500" />
      <text x={cx} y={cy + 3.5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
        Pt
      </text>
      {p.ligands.map((l, i) => {
        const d = dirs[i];
        const x = cx + d.dx * (BOND + 4);
        const y = cy + d.dy * (BOND + 6) + (d.dy === 0 ? 4 : d.dy > 0 ? 6 : 0);
        const anchor = d.dx > 0 ? "start" : d.dx < 0 ? "end" : "middle";
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} className={`${LIGAND_CLASS[l]} text-[11px] font-semibold`}>
            {l}
          </text>
        );
      })}
    </g>
  );
}

export default function CetSquarePlanarIsomers() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · cis and trans in square planar platinum complexes
      </p>
      <svg
        viewBox="0 0 320 276"
        className="block h-auto w-full"
        role="img"
        aria-label="Four square planar platinum complexes. Top, Pt(NH3)2Cl2: cisplatin with the two ammonia ligands side by side at 90 degrees, and transplatin with them opposite at 180 degrees. Bottom, Pt(NH3)2ClBr, type MA2BC: the two ammonia ligands side by side (cis) or opposite (trans), so two isomers."
      >
        {PANELS.map((row, r) => (
          <g key={row.title}>
            <text x={160} y={ROW_Y[r] - 56} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {row.title}
            </text>
            {row.panels.map((p, c) => (
              <g key={p.form}>
                <Complex cx={COL_X[c]} cy={ROW_Y[r]} p={p} />
                <text x={COL_X[c]} y={ROW_Y[r] + 50} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                  {p.form}: NH₃ at {ammineAngle(p)}°
                </text>
                <text x={COL_X[c]} y={ROW_Y[r] + 63} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  {p.tag}
                </text>
              </g>
            ))}
          </g>
        ))}
        <line x1={160} y1={ROW_Y[0] - 40} x2={160} y2={ROW_Y[0] + 40} strokeWidth={1} className="stroke-border" />
        <line x1={160} y1={ROW_Y[1] - 40} x2={160} y2={ROW_Y[1] + 40} strokeWidth={1} className="stroke-border" />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Dashed line: joins the two NH₃. Side by side (90°) is cis, across (180°) is trans. MA₄ and MA₃B can be placed only one
        way, and MABCD three ways. A tetrahedral complex has every position next to every other, so it shows no cis and trans.
      </p>
    </div>
  );
}
