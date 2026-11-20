/**
 * Static figure: counting P–OH and P–H in the three phosphorus oxoacids
 * (concept jcpb-p-oxoacid-basicity). Each acid is drawn as phosphorus with one
 * P=O and three other groups, from the concept's structures:
 *   H₃PO₂ = H₂P(O)(OH): two P–H, one P–OH, monobasic, reducing.
 *   H₃PO₃ = HP(O)(OH)₂: one P–H, two P–OH, dibasic, reducing.
 *   H₃PO₄ = P(O)(OH)₃: no P–H, three P–OH, tribasic, not reducing.
 * The hydrogen on oxygen is the one that ionises; the hydrogen on phosphorus
 * stays and makes the acid a reducing agent. The note repeats the worked
 * example: one NaOH per P–OH, so 25 mL of 0.1 M H₃PO₃ takes 25 mL of 0.2 M
 * NaOH and H₃PO₂ takes 12.5 mL. Pinned by tests/notes-w2-15.test.ts.
 * Server component.
 */

export type Group = "H" | "OH";

export type Oxoacid = {
  formula: string;
  name: string;
  /** The three groups other than P=O: left, right, below. */
  groups: readonly [Group, Group, Group];
};

export const OXOACIDS: readonly Oxoacid[] = [
  { formula: "H₃PO₂", name: "hypophosphorous", groups: ["H", "H", "OH"] },
  { formula: "H₃PO₃", name: "phosphorous", groups: ["H", "OH", "OH"] },
  { formula: "H₃PO₄", name: "orthophosphoric", groups: ["OH", "OH", "OH"] },
];

/** Basicity = number of P–OH groups. */
export function basicity(a: Oxoacid): number {
  return a.groups.filter((g) => g === "OH").length;
}

/** Non-ionisable hydrogens = number of P–H bonds. */
export function phBonds(a: Oxoacid): number {
  return a.groups.filter((g) => g === "H").length;
}

/** A P–H bond makes the acid reducing. */
export function isReducing(a: Oxoacid): boolean {
  return phBonds(a) > 0;
}

/** Hydrogen atoms in the formula: one per group of either kind. */
export function hydrogens(a: Oxoacid): number {
  return a.groups.length;
}

/** Oxygen atoms: the P=O plus one per OH. */
export function oxygens(a: Oxoacid): number {
  return 1 + basicity(a);
}

/** mL of NaOH (molarity cB) that neutralises vA mL of acid (molarity cA): one NaOH per P–OH. */
export function naohVolume(a: Oxoacid, vA: number, cA: number, cB: number): number {
  return (basicity(a) * vA * cA) / cB;
}

const BASICITY_WORD = ["none", "monobasic", "dibasic", "tribasic"] as const;

export const COL_X = [55, 160, 265] as const;
const PY = 86;
const ARM = 30;

function GroupLabel({ x, y, g, side }: { x: number; y: number; g: Group; side: "left" | "right" | "below" }) {
  if (g === "H") {
    return (
      <text x={x} y={y + 4} textAnchor="middle" className="fill-rose-600 text-[12px] font-bold dark:fill-rose-400">
        H
      </text>
    );
  }
  // OH written outward from P: HO on the left, OH on the right and below.
  return (
    <text x={x} y={y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
      {side === "left" ? (
        <>
          <tspan className="fill-emerald-600 font-bold dark:fill-emerald-400">H</tspan>O
        </>
      ) : (
        <>
          O<tspan className="fill-emerald-600 font-bold dark:fill-emerald-400">H</tspan>
        </>
      )}
    </text>
  );
}

function Structure({ a, cx }: { a: Oxoacid; cx: number }) {
  const [left, right, below] = a.groups;
  const gap = 9;
  return (
    <g>
      <text x={cx} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {a.formula}
      </text>
      <text x={cx} y={29} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        {a.name}
      </text>
      {/* P=O */}
      <line x1={cx - 2} y1={PY - gap} x2={cx - 2} y2={PY - ARM + 7} strokeWidth={1.4} className="stroke-foreground" />
      <line x1={cx + 2} y1={PY - gap} x2={cx + 2} y2={PY - ARM + 7} strokeWidth={1.4} className="stroke-foreground" />
      <text x={cx} y={PY - ARM + 3} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        O
      </text>
      {/* Three single bonds */}
      <line x1={cx - gap} y1={PY} x2={cx - ARM + 10} y2={PY} strokeWidth={1.4} className="stroke-foreground" />
      <line x1={cx + gap} y1={PY} x2={cx + ARM - 10} y2={PY} strokeWidth={1.4} className="stroke-foreground" />
      <line x1={cx} y1={PY + gap} x2={cx} y2={PY + ARM - 9} strokeWidth={1.4} className="stroke-foreground" />
      <text x={cx} y={PY + 4.5} textAnchor="middle" className="fill-indigo-700 text-[13px] font-bold dark:fill-indigo-300">
        P
      </text>
      <GroupLabel x={cx - ARM - 2} y={PY} g={left} side="left" />
      <GroupLabel x={cx + ARM + 2} y={PY} g={right} side="right" />
      <GroupLabel x={cx} y={PY + ARM} g={below} side="below" />

      {/* Counts */}
      <text x={cx} y={146} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300 tabular-nums">
        P–OH: {basicity(a)}
      </text>
      <text x={cx} y={159} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {BASICITY_WORD[basicity(a)]}
      </text>
      <text x={cx} y={178} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300 tabular-nums">
        P–H: {phBonds(a)}
      </text>
      <text x={cx} y={191} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {isReducing(a) ? "reducing" : "not reducing"}
      </text>
    </g>
  );
}

export default function JeePhosphorusOxoacids() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which hydrogens ionise in the phosphorus acids
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Structures of three phosphorus oxoacids, each with one P=O. H3PO2 has two P-H and one P-OH: monobasic and reducing. H3PO3 has one P-H and two P-OH: dibasic and reducing. H3PO4 has three P-OH and no P-H: tribasic and not reducing. Hydrogens on oxygen ionise; hydrogens on phosphorus do not."
      >
        {OXOACIDS.map((a, i) => (
          <Structure key={a.formula} a={a} cx={COL_X[i]} />
        ))}
        <line x1={14} y1={133} x2={306} y2={133} className="stroke-border" />
        <text x={160} y={208} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
          <tspan className="fill-emerald-700 font-semibold dark:fill-emerald-300">H on O</tspan> ionises.{" "}
          <tspan className="fill-rose-700 font-semibold dark:fill-rose-300">H on P</tspan> stays, and makes the acid reducing.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Count P–OH for the basicity and ignore P–H. One NaOH per P–OH: 25 mL of 0.1 M H₃PO₃ takes 25 mL of 0.2 M NaOH, while H₃PO₂ takes
        only 12.5 mL.
      </p>
    </div>
  );
}
