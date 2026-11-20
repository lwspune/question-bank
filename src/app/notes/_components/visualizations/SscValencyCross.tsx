/**
 * Static figure: crossing the valencies to write a formula
 * (concept ssccbbo-valency).
 *
 * The concept's two cases: Al (3) and O (2) cross to Al₂O₃, whose charges
 * balance as 2 × 3 = 6 and 3 × 2 = 6 (the self-check); Mg (2) and OH (1)
 * cross to Mg(OH)₂ (the definition). Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export type CrossCase = {
  left: string;
  leftValency: number;
  right: string;
  rightValency: number;
  /** The formula as written, with the 1 left out and a group in brackets. */
  formula: string;
};

export const CROSS_CASES: readonly CrossCase[] = [
  { left: "Al", leftValency: 3, right: "O", rightValency: 2, formula: "Al₂O₃" },
  { left: "Mg", leftValency: 2, right: "OH", rightValency: 1, formula: "Mg(OH)₂" },
];

/** Each takes the other's valency as its count. */
export function crossCounts(c: CrossCase): { left: number; right: number } {
  return { left: c.rightValency, right: c.leftValency };
}

const PANEL_W = 148;
const SYM_Y = 70;
const COUNT_Y = 132;

/** A filled arrow head at (x2, y2) pointing along the line from (x1, y1). */
export function arrowHead(x1: number, y1: number, x2: number, y2: number, len = 8, half = 4): string {
  const d = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / d;
  const uy = (y2 - y1) / d;
  const bx = x2 - ux * len;
  const by = y2 - uy * len;
  const r = (n: number) => Math.round(n * 100) / 100;
  return `${r(x2)},${r(y2)} ${r(bx - uy * half)},${r(by + ux * half)} ${r(bx + uy * half)},${r(by - ux * half)}`;
}

export default function SscValencyCross() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · crossing the valencies
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Two worked formulas. Aluminium has valency 3 and oxygen valency 2; each takes the other's number, giving Al2O3, and the charges balance: 2 times 3 is 6 and 3 times 2 is 6. Magnesium has valency 2 and hydroxide valency 1; crossing gives Mg(OH)2."
      >
        {CROSS_CASES.map((c, i) => {
          const ox = 8 + i * (PANEL_W + 8);
          const lx = ox + 40;
          const rx = ox + 106;
          const n = crossCounts(c);
          return (
            <g key={c.formula}>
              <rect x={ox} y={8} width={PANEL_W} height={196} rx={8} className="fill-background stroke-border" strokeWidth={1} />
              <text x={ox + PANEL_W / 2} y={28} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                valencies
              </text>
              <text x={lx} y={SYM_Y - 22} textAnchor="middle" className="fill-rose-700 text-[12px] font-bold dark:fill-rose-300">
                {c.leftValency}
              </text>
              <text x={rx} y={SYM_Y - 22} textAnchor="middle" className="fill-sky-700 text-[12px] font-bold dark:fill-sky-300">
                {c.rightValency}
              </text>
              <text x={lx} y={SYM_Y} textAnchor="middle" className="fill-foreground text-[16px] font-bold">
                {c.left}
              </text>
              <text x={rx} y={SYM_Y} textAnchor="middle" className="fill-foreground text-[16px] font-bold">
                {c.right}
              </text>
              {/* left valency goes down to the right symbol's count, and the right one to the left's */}
              <line x1={lx + 8} y1={SYM_Y - 26} x2={rx - 4} y2={COUNT_Y - 18} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.6} />
              <polygon points={arrowHead(lx + 8, SYM_Y - 26, rx - 2, COUNT_Y - 15)} className="fill-rose-600 dark:fill-rose-400" />
              <line x1={rx - 8} y1={SYM_Y - 26} x2={lx + 4} y2={COUNT_Y - 18} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.6} />
              <polygon points={arrowHead(rx - 8, SYM_Y - 26, lx + 2, COUNT_Y - 15)} className="fill-sky-600 dark:fill-sky-400" />
              <text x={lx} y={COUNT_Y} textAnchor="middle" className="fill-foreground text-[11px]">
                {c.left} takes {n.left}
              </text>
              <text x={rx} y={COUNT_Y} textAnchor="middle" className="fill-foreground text-[11px]">
                {c.right} takes {n.right}
              </text>
              <text x={ox + PANEL_W / 2} y={COUNT_Y + 28} textAnchor="middle" className="fill-indigo-700 text-[16px] font-bold dark:fill-indigo-300">
                {c.formula}
              </text>
              <text x={ox + PANEL_W / 2} y={COUNT_Y + 48} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                charges balance:
              </text>
              <text x={ox + PANEL_W / 2} y={COUNT_Y + 61} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {n.left} × {c.leftValency} = {n.left * c.leftValency} and {n.right} × {c.rightValency} = {n.right * c.rightValency}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each element or group takes the other&apos;s valency as its number of atoms, so the charges cancel.
      </p>
    </div>
  );
}
