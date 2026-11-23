/**
 * Static figure: three ways to add hydrogen to R–C≡C–R (concept
 * cetalkyne-lindlar).
 *
 * Lindlar's catalyst (Pd–C poisoned with quinoline) stops at the alkene and
 * delivers both H atoms on the same side: the cis-alkene. Na in liquid NH₃ also
 * stops at the alkene but gives the trans isomer (the concept's trap). Ni or
 * Pt with excess H₂ goes all the way to the alkane. The H positions are pinned
 * by tests/notes-w2-01.test.ts. Server component.
 */

/** Four groups on the C=C: up-left, down-left (first carbon), up-right, down-right (second carbon). */
export type AlkeneGroups = { upLeft: string; downLeft: string; upRight: string; downRight: string };

export type Route = { reagent: readonly string[]; product: string; note: string; alkene: AlkeneGroups | null; formula?: string };

export const ROUTES: readonly Route[] = [
  {
    reagent: ["Pd–C, quinoline", "(Lindlar)"],
    product: "cis-alkene",
    note: "both H on one side",
    alkene: { upLeft: "R", upRight: "R", downLeft: "H", downRight: "H" },
  },
  {
    reagent: ["Na,", "liquid NH₃"],
    product: "trans-alkene",
    note: "H on opposite sides",
    alkene: { upLeft: "R", upRight: "H", downLeft: "H", downRight: "R" },
  },
  {
    reagent: ["Ni or Pt,", "excess H₂"],
    product: "alkane",
    note: "all the way",
    alkene: null,
    formula: "R–CH₂–CH₂–R",
  },
];

/** cis when the two H sit on the same side (both up or both down). */
export function isCis(g: AlkeneGroups): boolean {
  return (g.upLeft === "H" && g.upRight === "H") || (g.downLeft === "H" && g.downRight === "H");
}

const COL_X = [54, 160, 266] as const;
const CY = 130;

function Alkene({ cx, g }: { cx: number; g: AlkeneGroups }) {
  const spots = [
    { key: "upLeft", x: cx - 26, y: CY - 22, from: cx - 11 },
    { key: "downLeft", x: cx - 26, y: CY + 22, from: cx - 11 },
    { key: "upRight", x: cx + 26, y: CY - 22, from: cx + 11 },
    { key: "downRight", x: cx + 26, y: CY + 22, from: cx + 11 },
  ] as const;
  return (
    <g>
      <line x1={cx - 11} y1={CY - 2} x2={cx + 11} y2={CY - 2} className="stroke-foreground" strokeWidth={1.5} />
      <line x1={cx - 11} y1={CY + 2} x2={cx + 11} y2={CY + 2} className="stroke-foreground" strokeWidth={1.5} />
      {spots.map((s) => {
        const label = g[s.key];
        const isH = label === "H";
        return (
          <g key={s.key}>
            <line x1={s.from} y1={CY} x2={s.x + (s.x < cx ? 5 : -5)} y2={s.y + (s.y < CY ? 6 : -6)} className="stroke-foreground" strokeWidth={1.3} />
            <text x={s.x} y={s.y + (s.y < CY ? -1 : 9)} textAnchor="middle" className={isH ? "fill-sky-700 text-[12px] font-bold dark:fill-sky-300" : "fill-foreground text-[12px] font-semibold"}>
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function CetAlkyneReduction() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which reagent gives cis, trans or the alkane
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="From an alkyne R–C≡C–R: Lindlar's catalyst, Pd–C with quinoline, gives the cis-alkene with both hydrogens on the same side; sodium in liquid ammonia gives the trans-alkene with the hydrogens on opposite sides; nickel or platinum with excess hydrogen gives the alkane."
      >
        <defs>
          <marker id="alkyne-red-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>
        <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[13px] font-bold">
          R–C≡C–R
        </text>
        {ROUTES.map((r, i) => {
          const cx = COL_X[i];
          return (
            <g key={r.product}>
              <line x1={160 + (cx - 160) * 0.12} y1={24} x2={cx} y2={52} markerEnd="url(#alkyne-red-arrow)" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.6} />
              {r.reagent.map((t, k) => (
                <text key={t} x={cx} y={68 + k * 12} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
                  {t}
                </text>
              ))}
              {r.alkene ? (
                <Alkene cx={cx} g={r.alkene} />
              ) : (
                <text x={cx} y={CY + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                  {r.formula}
                </text>
              )}
              <text x={cx} y={176} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
                {r.product}
              </text>
              <text x={cx} y={189} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {r.note}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Lindlar&apos;s catalyst is poisoned, so it stops at the alkene, and both H atoms come from the metal surface on the same side: cis. Sodium
        in liquid ammonia also stops at the alkene but gives trans. An ordinary catalyst with excess H₂ goes on to the alkane.
      </p>
    </div>
  );
}
