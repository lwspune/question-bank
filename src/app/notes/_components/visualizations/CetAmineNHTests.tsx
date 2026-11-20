/**
 * Static figure: the three amine tests decided by the hydrogens on nitrogen
 * (concept cetam-acylation-carbylamine-and-hinsberg).
 *
 * Ethylamine (1°, two N–H), diethylamine (2°, one N–H) and triethylamine (3°,
 * no N–H), the concept's worked example. Acylation replaces an N–H, so 1° and
 * 2° react and 3° does not. The carbylamine test needs BOTH hydrogens: only
 * the 1° amine gives the foul-smelling isocyanide. Hinsberg's reagent gives an
 * alkali-soluble sulphonamide with 1°, an insoluble one with 2°, nothing with
 * 3°. The results follow from the N–H count; pinned by tests/notes-w2-01.test.ts.
 * Server component.
 */

export type Amine = { name: string; degree: string; groups: readonly string[]; hOnN: number };

/** Three groups on nitrogen, drawn up, lower-left, lower-right. */
export const AMINES: readonly Amine[] = [
  { name: "Ethylamine", degree: "1°", groups: ["C₂H₅", "H", "H"], hOnN: 2 },
  { name: "Diethylamine", degree: "2°", groups: ["C₂H₅", "C₂H₅", "H"], hOnN: 1 },
  { name: "Triethylamine", degree: "3°", groups: ["C₂H₅", "C₂H₅", "C₂H₅"], hOnN: 0 },
];

export type TestResult = { text: string; sub?: string; reacts: boolean };

/** Acylation replaces one N–H: any amine with at least one reacts. */
export function acylation(hOnN: number): TestResult {
  return hOnN >= 1 ? { text: "reacts", sub: "amide", reacts: true } : { text: "no reaction", reacts: false };
}

/** The carbylamine test needs both hydrogens on nitrogen. */
export function carbylamine(hOnN: number): TestResult {
  return hOnN === 2 ? { text: "foul smell", sub: "isocyanide", reacts: true } : { text: "no", reacts: false };
}

/** Hinsberg's reagent: 1° soluble sulphonamide, 2° insoluble, 3° no reaction. */
export function hinsberg(hOnN: number): TestResult {
  if (hOnN === 2) return { text: "soluble in alkali", sub: "sulphonamide", reacts: true };
  if (hOnN === 1) return { text: "insoluble", sub: "sulphonamide", reacts: true };
  return { text: "no reaction", reacts: false };
}

export const TESTS = [
  { label: "Acylation, CH₃COCl", run: acylation, y: 122 },
  { label: "Carbylamine, CHCl₃ + alcoholic KOH", run: carbylamine, y: 166 },
  { label: "Hinsberg, C₆H₅SO₂Cl", run: hinsberg, y: 210 },
] as const;

export const COL_X = [56, 162, 268] as const;

const N_Y = 46;
const BONDS = [
  { dx: 0, dy: -22 },
  { dx: -24, dy: 13 },
  { dx: 24, dy: 13 },
] as const;

function AmineDrawing({ a, cx }: { a: Amine; cx: number }) {
  return (
    <g>
      {a.groups.map((g, i) => {
        const b = BONDS[i];
        const isH = g === "H";
        const end = { x: cx + b.dx, y: N_Y + b.dy };
        const lab = { x: cx + b.dx * 1.55, y: N_Y + b.dy * 1.5 };
        return (
          <g key={i}>
            <line x1={cx + b.dx * 0.32} y1={N_Y + b.dy * 0.32} x2={end.x} y2={end.y} className="stroke-foreground" strokeWidth={1.3} />
            <text
              x={lab.x}
              y={lab.y + 4}
              textAnchor="middle"
              className={isH ? "fill-sky-700 text-[12px] font-bold dark:fill-sky-300" : "fill-foreground text-[11px]"}
            >
              {g}
            </text>
          </g>
        );
      })}
      <text x={cx} y={N_Y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
        N
      </text>
      <text x={cx} y={88} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {a.name} ({a.degree})
      </text>
      <text x={cx} y={101} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
        {a.hOnN === 0 ? "no N–H" : `${a.hOnN} N–H`}
      </text>
    </g>
  );
}

export default function CetAmineNHTests() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three tests that count the hydrogens on nitrogen
      </p>
      <svg
        viewBox="0 0 320 240"
        className="block h-auto w-full"
        role="img"
        aria-label="Ethylamine has two hydrogens on nitrogen, diethylamine one, triethylamine none. Acylation: the first two react, triethylamine does not. Carbylamine test: only ethylamine gives a foul smell. Hinsberg's reagent: ethylamine gives a sulphonamide soluble in alkali, diethylamine an insoluble one, triethylamine no reaction."
      >
        {AMINES.map((a, i) => (
          <AmineDrawing key={a.name} a={a} cx={COL_X[i]} />
        ))}

        {TESTS.map((t) => (
          <g key={t.label}>
            <line x1={6} y1={t.y - 14} x2={314} y2={t.y - 14} className="stroke-border" strokeWidth={1} />
            <text x={8} y={t.y - 2} className="fill-muted-foreground text-[10px] font-semibold">
              {t.label}
            </text>
            {AMINES.map((a, i) => {
              const r = t.run(a.hOnN);
              const cls = r.reacts
                ? "fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300"
                : "fill-rose-700 text-[11px] dark:fill-rose-300";
              return (
                <g key={a.name}>
                  <text x={COL_X[i]} y={t.y + 13} textAnchor="middle" className={cls}>
                    {r.text}
                  </text>
                  {r.sub && (
                    <text x={COL_X[i]} y={t.y + 25} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                      {r.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each test needs a hydrogen on nitrogen. Acylation replaces one N–H, so 1° and 2° amines react. The carbylamine test needs both, so only a
        1° amine gives the isocyanide. Triethylamine has no N–H and gives nothing in all three.
      </p>
    </div>
  );
}
