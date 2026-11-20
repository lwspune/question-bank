/**
 * Static figure: the three structural isomers of C₅H₁₂ with every carbon
 * marked primary, secondary, tertiary or quaternary (concept
 * cetalkane-isomers-and-carbon-types).
 *
 * A carbon's type is how many other carbons it is bonded to: 1° one, 2° two,
 * 3° three, 4° four. The types are COMPUTED from the drawn bonds, never typed
 * in, so the picture cannot disagree with the rule. Isopentane,
 * (CH₃)₂CHCH₂CH₃, has one 2° carbon and one 3°, the concept's self-check;
 * (CH₃)₄C is neopentane, 2,2-dimethylpropane. Pinned by tests/notes-w2-01.test.ts.
 * Server component.
 */

export type Skeleton = {
  name: string;
  sub: string;
  formula: string;
  atoms: readonly { x: number; y: number }[];
  bonds: readonly (readonly [number, number])[];
};

/** Atom positions are offsets from the panel centre. */
export const C5_ISOMERS: readonly Skeleton[] = [
  {
    name: "Pentane",
    sub: "straight chain",
    formula: "CH₃(CH₂)₃CH₃",
    atoms: [
      { x: -44, y: 8 },
      { x: -22, y: -8 },
      { x: 0, y: 8 },
      { x: 22, y: -8 },
      { x: 44, y: 8 },
    ],
    bonds: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Isopentane",
    sub: "one branch",
    formula: "(CH₃)₂CHCH₂CH₃",
    atoms: [
      { x: -33, y: 8 },
      { x: -11, y: -8 },
      { x: 11, y: 8 },
      { x: 33, y: -8 },
      { x: -11, y: -34 },
    ],
    bonds: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
    ],
  },
  {
    name: "Neopentane",
    sub: "2,2-dimethylpropane",
    formula: "(CH₃)₄C",
    atoms: [
      { x: 0, y: 0 },
      { x: -26, y: 0 },
      { x: 26, y: 0 },
      { x: 0, y: -26 },
      { x: 0, y: 26 },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
];

/** Type of each carbon = number of carbons bonded to it. */
export function carbonTypes(s: Skeleton): number[] {
  return s.atoms.map((_, i) => s.bonds.filter(([a, b]) => a === i || b === i).length);
}

/** How many carbons of each type (index 1 to 4). */
export function typeCounts(s: Skeleton): Record<1 | 2 | 3 | 4, number> {
  const c = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const t of carbonTypes(s)) c[t as 1 | 2 | 3 | 4]++;
  return c;
}

const TYPE_STYLE: Record<number, { circle: string; text: string }> = {
  1: { circle: "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400", text: "fill-sky-800 dark:fill-sky-200" },
  2: { circle: "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400", text: "fill-emerald-800 dark:fill-emerald-200" },
  3: { circle: "fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400", text: "fill-amber-800 dark:fill-amber-200" },
  4: { circle: "fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400", text: "fill-rose-800 dark:fill-rose-200" },
};

const COL = 320 / 3;
const CY = 76;

export default function CetPentaneCarbonTypes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the three pentane isomers and their carbon types
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="The three structural isomers of C5H12, carbons only. Pentane: two primary and three secondary carbons. Isopentane: three primary, one secondary, one tertiary. Neopentane: four primary carbons around one quaternary carbon."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          C₅H₁₂: three structural isomers (carbons only, H not drawn)
        </text>
        {C5_ISOMERS.map((s, k) => {
          const cx = Math.round((k + 0.5) * COL * 100) / 100;
          const types = carbonTypes(s);
          const counts = typeCounts(s);
          const parts = ([1, 2, 3, 4] as const).filter((t) => counts[t] > 0).map((t) => `${counts[t]} × ${t}°`);
          return (
            <g key={s.name}>
              {s.bonds.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={cx + s.atoms[a].x}
                  y1={CY + s.atoms[a].y}
                  x2={cx + s.atoms[b].x}
                  y2={CY + s.atoms[b].y}
                  className="stroke-foreground"
                  strokeWidth={1.5}
                />
              ))}
              {s.atoms.map((p, i) => (
                <g key={i}>
                  <circle cx={cx + p.x} cy={CY + p.y} r={9.5} className={TYPE_STYLE[types[i]].circle} strokeWidth={1.3} />
                  <text x={cx + p.x} y={CY + p.y + 3.5} textAnchor="middle" className={`${TYPE_STYLE[types[i]].text} text-[10px] font-bold`}>
                    {types[i]}°
                  </text>
                </g>
              ))}
              <text x={cx} y={128} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {s.name}
              </text>
              <text x={cx} y={141} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {s.sub}
              </text>
              <text x={cx} y={154} textAnchor="middle" className="fill-foreground text-[10px]">
                {s.formula}
              </text>
              <text x={cx} y={169} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
                {parts.join(", ")}
              </text>
            </g>
          );
        })}
        <text x={160} y={190} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          1°, 2°, 3°, 4°: the carbon is bonded to 1, 2, 3 or 4 other carbons
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Branching gives the isomers: three for C₅H₁₂. In isopentane the CH₂ is bonded to two carbons (2°) and the CH to three (3°). The centre
        carbon of neopentane is bonded to four (4°); its IUPAC name is 2,2-dimethylpropane.
      </p>
    </div>
  );
}
