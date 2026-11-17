/**
 * Static figure: the pedigree symbols of the IMAT concept
 * imat-gen-pedigree-patterns, and the family from its worked example: two
 * unaffected parents with an affected daughter and two unaffected sons. That
 * family proves the allele recessive (unaffected parents, affected child) and,
 * because the father is unaffected, rules out X-linked recessive: only
 * autosomal recessive fits.
 *
 * The family is exported and pinned by tests/notes-imat-visuals-biometab.test.ts.
 * Server component.
 */

export type Person = {
  id: string;
  sex: "male" | "female";
  affected: boolean;
  genotype: string;
  generation: 1 | 2;
  x: number;
};

export const FAMILY: readonly Person[] = [
  { id: "I-1", sex: "male", affected: false, genotype: "Aa", generation: 1, x: 130 },
  { id: "I-2", sex: "female", affected: false, genotype: "Aa", generation: 1, x: 190 },
  { id: "II-1", sex: "male", affected: false, genotype: "AA or Aa", generation: 2, x: 100 },
  { id: "II-2", sex: "female", affected: true, genotype: "aa", generation: 2, x: 160 },
  { id: "II-3", sex: "male", affected: false, genotype: "AA or Aa", generation: 2, x: 220 },
];

export const ROMAN = { 1: "I", 2: "II" } as const;

const SIZE = 22;
const GEN_Y = { 1: 126, 2: 186 } as const;

type Fill = "empty" | "full" | "half";

const STROKE = "stroke-foreground";
const FULL = "fill-foreground";
const EMPTY = "fill-background";

function PedSymbol({ sex, fill, x, y }: { sex: "male" | "female"; fill: Fill; x: number; y: number }) {
  const h = SIZE / 2;
  const base = fill === "full" ? FULL : EMPTY;
  return (
    <g>
      {sex === "male" ? (
        <rect x={x - h} y={y - h} width={SIZE} height={SIZE} className={`${base} ${STROKE}`} strokeWidth={1.5} />
      ) : (
        <circle cx={x} cy={y} r={h} className={`${base} ${STROKE}`} strokeWidth={1.5} />
      )}
      {fill === "half" &&
        (sex === "male" ? (
          <rect x={x - h} y={y - h} width={h} height={SIZE} className={FULL} />
        ) : (
          <path d={`M${x},${y - h} A${h},${h} 0 0,0 ${x},${y + h} Z`} className={FULL} />
        ))}
    </g>
  );
}

export default function ImatPedigreeSymbols() {
  const parents = FAMILY.filter((p) => p.generation === 1);
  const children = FAMILY.filter((p) => p.generation === 2);
  const midX = (parents[0].x + parents[1].x) / 2;
  const sibY = GEN_Y[2] - 26;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · pedigree symbols and an example
      </p>

      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="Pedigree key: square male, circle female, filled affected, half-filled carrier. Example: two unaffected parents, Aa and Aa, have an affected daughter, aa, and two unaffected sons: autosomal recessive"
      >
        {/* Key, row 1: the four symbols. */}
        {(
          [
            { sex: "male", fill: "empty", x: 20, label: "male" },
            { sex: "female", fill: "empty", x: 92, label: "female" },
            { sex: "male", fill: "full", x: 168, label: "affected" },
            { sex: "female", fill: "half", x: 250, label: "carrier" },
          ] as const
        ).map((k) => (
          <g key={k.label}>
            <PedSymbol sex={k.sex} fill={k.fill} x={k.x} y={22} />
            <text x={k.x + 16} y={26} className="fill-foreground text-[10px]">
              {k.label}
            </text>
          </g>
        ))}

        {/* Key, row 2: parents and children lines, generations. */}
        <line x1={14} y1={58} x2={50} y2={58} className={STROKE} strokeWidth={1.5} />
        <text x={56} y={62} className="fill-foreground text-[10px]">
          parents
        </text>
        <line x1={118} y1={50} x2={118} y2={58} className={STROKE} strokeWidth={1.5} />
        <line x1={106} y1={58} x2={130} y2={58} className={STROKE} strokeWidth={1.5} />
        <line x1={106} y1={58} x2={106} y2={66} className={STROKE} strokeWidth={1.5} />
        <line x1={130} y1={58} x2={130} y2={66} className={STROKE} strokeWidth={1.5} />
        <text x={136} y={62} className="fill-foreground text-[10px]">
          children
        </text>
        <text x={200} y={62} className="fill-foreground text-[10px]">
          I, II, III: generations
        </text>

        <line x1={4} y1={78} x2={316} y2={78} className="stroke-border" strokeWidth={1} />
        <text x={160} y={96} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Example: autosomal recessive
        </text>

        {/* Generation numbers. */}
        <text x={30} y={GEN_Y[1] + 4} className="fill-muted-foreground text-[11px] font-semibold">
          {ROMAN[1]}
        </text>
        <text x={30} y={GEN_Y[2] + 4} className="fill-muted-foreground text-[11px] font-semibold">
          {ROMAN[2]}
        </text>

        {/* Lines: parents joined, then down to the children. */}
        <line x1={parents[0].x + SIZE / 2} y1={GEN_Y[1]} x2={parents[1].x - SIZE / 2} y2={GEN_Y[1]} className={STROKE} strokeWidth={1.5} />
        <line x1={midX} y1={GEN_Y[1]} x2={midX} y2={sibY} className={STROKE} strokeWidth={1.5} />
        <line x1={children[0].x} y1={sibY} x2={children[children.length - 1].x} y2={sibY} className={STROKE} strokeWidth={1.5} />
        {children.map((c) => (
          <line key={`v-${c.id}`} x1={c.x} y1={sibY} x2={c.x} y2={GEN_Y[2] - SIZE / 2} className={STROKE} strokeWidth={1.5} />
        ))}

        {FAMILY.map((p) => (
          <PedSymbol key={p.id} sex={p.sex} fill={p.affected ? "full" : "empty"} x={p.x} y={GEN_Y[p.generation]} />
        ))}

        {/* Genotypes: parents beside, children below. */}
        <text x={parents[0].x - 16} y={GEN_Y[1] + 4} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {parents[0].genotype}
        </text>
        <text x={parents[1].x + 16} y={GEN_Y[1] + 4} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {parents[1].genotype}
        </text>
        {children.map((c) => (
          <text key={`g-${c.id}`} x={c.x} y={GEN_Y[2] + 26} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
            {c.genotype}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Two unaffected parents with an affected child: the allele is recessive, and both parents carry it (Aa). The
        father is unaffected but his daughter is affected, so it cannot be X-linked recessive. It is autosomal
        recessive.
      </p>
    </div>
  );
}
