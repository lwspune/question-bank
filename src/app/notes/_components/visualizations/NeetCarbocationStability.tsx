/**
 * Static figure: why 3° > 2° > 1° > methyl for carbocations (concept
 * nchoc-carbocation, with the +I note of nchoc-effects).
 * Top: the ladder, most stable at the top. Each row shows the ion, its class,
 * its α-hydrogens as dots (one group of three for each CH₃ joined to the
 * positive carbon) and the count the concept gives: (CH₃)₃C⁺ 9, (CH₃)₂CH⁺ 6,
 * CH₃CH₂⁺ 3, CH₃⁺ 0. More α-H, more hyperconjugation, more stable. The same
 * CH₃ groups also push electrons by their +I effect (nchoc-effects: "A methyl
 * group on a carbocation helps it by its +I effect and by hyperconjugation").
 * Bottom: hyperconjugation in CH₃CH₂⁺, the filled C-H σ bond of the α-carbon
 * feeding its electrons into the empty p orbital of the positive carbon.
 * Pinned by tests/notes-neet-visuals-pc.test.ts. Server component.
 */

export type Ion = {
  formula: string;
  cls: string;
  /** H atoms on each carbon joined to the positive carbon. */
  alphaCarbonH: readonly number[];
};

/** The ladder, most stable first: the concept's four ions. */
export const LADDER: readonly Ion[] = [
  { formula: "(CH₃)₃C⁺", cls: "3°", alphaCarbonH: [3, 3, 3] },
  { formula: "(CH₃)₂CH⁺", cls: "2°", alphaCarbonH: [3, 3] },
  { formula: "CH₃CH₂⁺", cls: "1°", alphaCarbonH: [3] },
  { formula: "CH₃⁺", cls: "methyl", alphaCarbonH: [] },
];

/** α-hydrogens: H atoms on the carbons joined to the positive carbon (its own H never count). */
export function alphaHydrogens(alphaCarbonH: readonly number[]): number {
  return alphaCarbonH.reduce((s, h) => s + h, 0);
}

/** Alkyl (CH₃) groups on the positive carbon, each pushing electrons (+I). */
export function alkylGroups(ion: Ion): number {
  return ion.alphaCarbonH.length;
}

const ROW_Y = [52, 88, 124, 160] as const;
const DOT_X0 = 160;
const DOT_STEP = 7;
const GROUP_GAP = 6;

const dotX = (g: number, k: number) => DOT_X0 + g * (3 * DOT_STEP + GROUP_GAP) + k * DOT_STEP;

export default function NeetCarbocationStability() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the carbocation stability ladder
      </p>
      <svg
        viewBox="0 0 320 274"
        className="block h-auto w-full"
        role="img"
        aria-label="Four carbocations, most stable at the top. Tertiary (CH3)3C+ has 9 alpha hydrogens and three methyl groups. Secondary (CH3)2CH+ has 6 and two methyl groups. Primary CH3CH2+ has 3 and one methyl group. The methyl cation CH3+ has none. More alpha hydrogens means more hyperconjugation and a more stable ion; each methyl group also pushes electrons by its +I effect. Below, in CH3CH2+ the filled C-H sigma bond of the next carbon feeds electrons into the empty p orbital of the positive carbon."
      >
        {/* Column heads */}
        <g className="fill-muted-foreground text-[10px]">
          <text x={26} y={24}>class</text>
          <text x={76} y={24}>ion</text>
          <text x={DOT_X0 - 3} y={24}>α-H</text>
          <text x={244} y={24}>count</text>
        </g>
        <line x1={22} y1={30} x2={314} y2={30} className="stroke-border" />

        {/* More-stable arrow */}
        <line x1={12} y1={166} x2={12} y2={44} strokeWidth={1.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <polygon points="12,38 8,47 16,47" className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={8} y={106} transform="rotate(-90 8 106)" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          more stable
        </text>

        {LADDER.map((ion, row) => {
          const y = ROW_Y[row];
          const n = alphaHydrogens(ion.alphaCarbonH);
          const m = alkylGroups(ion);
          return (
            <g key={ion.formula}>
              <text x={26} y={y + 4} className="fill-foreground text-[11px] font-bold">
                {ion.cls}
              </text>
              <text x={76} y={y + 4} className="fill-foreground font-serif text-[12px] font-semibold">
                {ion.formula}
              </text>
              {n === 0 ? (
                <text x={DOT_X0 - 3} y={y + 4} className="fill-muted-foreground text-[10px]">
                  none
                </text>
              ) : (
                ion.alphaCarbonH.map((h, g) =>
                  Array.from({ length: h }, (_, k) => (
                    <circle key={`${g}-${k}`} cx={dotX(g, k)} cy={y} r={3} className="fill-amber-500 dark:fill-amber-400" />
                  )),
                )
              )}
              <text x={244} y={y - 4} className="fill-foreground text-[11px] font-semibold tabular-nums">
                {n} α-H
              </text>
              <text x={244} y={y + 10} className="fill-muted-foreground text-[10px] tabular-nums">
                {m === 0 ? "no CH₃" : `${m} CH₃, +I`}
              </text>
            </g>
          );
        })}

        <line x1={10} y1={180} x2={314} y2={180} className="stroke-border" />
        <text x={160} y={196} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Hyperconjugation in CH₃CH₂⁺
        </text>

        {/* Empty p orbital on the positive carbon */}
        <ellipse cx={198} cy={222} rx={6} ry={10} fill="none" strokeDasharray="3 2" className="stroke-sky-600 dark:stroke-sky-400" />
        <ellipse cx={198} cy={258} rx={6} ry={10} fill="none" strokeDasharray="3 2" className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={198} y={244} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          C⁺
        </text>
        <line x1={208} y1={236} x2={221} y2={229} className="stroke-foreground" />
        <line x1={208} y1={243} x2={221} y2={250} className="stroke-foreground" />
        <text x={223} y={231} className="fill-foreground text-[10px]">
          H
        </text>
        <text x={223} y={256} className="fill-foreground text-[10px]">
          H
        </text>
        <text x={210} y={216} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          empty p orbital
        </text>

        {/* The α-carbon and its three H */}
        <text x={146} y={244} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          C
        </text>
        <line x1={153} y1={240} x2={188} y2={240} className="stroke-foreground" />
        <line x1={146} y1={232} x2={146} y2={218} strokeWidth={2.5} className="stroke-amber-500 dark:stroke-amber-400" />
        <text x={146} y={214} textAnchor="middle" className="fill-foreground text-[10px]">
          H
        </text>
        <line x1={139} y1={240} x2={128} y2={240} className="stroke-foreground" />
        <text x={124} y={243.5} textAnchor="end" className="fill-foreground text-[10px]">
          H
        </text>
        <line x1={146} y1={247} x2={146} y2={258} className="stroke-foreground" />
        <text x={146} y={268} textAnchor="middle" className="fill-foreground text-[10px]">
          H
        </text>
        <text x={136} y={222} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          filled C-H σ
        </text>
        {/* Electrons lean from the C-H bond into the empty p orbital */}
        <path d="M 150 222 Q 168 204 186 218" fill="none" strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
        <polygon points="190,221 181,219.5 186,213" className="fill-rose-600 dark:fill-rose-400" />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each dot is one α-hydrogen. An α-hydrogen sits on a carbon joined to the positive carbon; an H on the positive carbon itself does not count. Each C-H bond of an α-carbon can
        lean its electrons into the empty p orbital, so more α-hydrogens spread the charge more: 9 &gt; 6 &gt; 3 &gt; 0 gives 3° &gt; 2° &gt; 1° &gt; methyl.
        The CH₃ groups also push electrons by their +I effect.
      </p>
    </div>
  );
}
