/**
 * Static figure: the Hinsberg test (concept jcamine-hinsberg), one row per
 * amine class with the concept's own examples from its table:
 *   primary C₂H₅NH₂ → C₆H₅SO₂NHC₂H₅, one N–H left, acidic, dissolves in alkali;
 *   secondary (C₂H₅)₂NH → C₆H₅SO₂N(C₂H₅)₂, no N–H left, insoluble solid;
 *   tertiary (C₂H₅)₃N, no N–H to replace, no reaction.
 * Reacts and dissolves: primary. Reacts and stays solid: secondary. No
 * reaction: tertiary. Pinned by tests/notes-w2-15.test.ts. Server component.
 */

export type HinsbergRow = {
  amineClass: "primary" | "secondary" | "tertiary";
  label: string;
  amine: string;
  /** H atoms on nitrogen in the amine. */
  nhInAmine: number;
  product: string | null;
  inAlkali: string;
  detail: string;
};

export const ROWS: readonly HinsbergRow[] = [
  { amineClass: "primary", label: "Primary", amine: "C₂H₅NH₂", nhInAmine: 2, product: "C₆H₅SO₂NHC₂H₅", inAlkali: "dissolves", detail: "clear solution" },
  { amineClass: "secondary", label: "Secondary", amine: "(C₂H₅)₂NH", nhInAmine: 1, product: "C₆H₅SO₂N(C₂H₅)₂", inAlkali: "solid", detail: "insoluble" },
  { amineClass: "tertiary", label: "Tertiary", amine: "(C₂H₅)₃N", nhInAmine: 0, product: null, inAlkali: "no reaction", detail: "unchanged" },
];

/** The reagent swaps one N–H for N–SO₂C₆H₅, so the product keeps one N–H fewer. Null: no reaction. */
export function nhInProduct(row: HinsbergRow): number | null {
  return row.nhInAmine === 0 ? null : row.nhInAmine - 1;
}

/** Alkali dissolves the product only if an (acidic) N–H is left on it. */
export function dissolvesInAlkali(row: HinsbergRow): boolean {
  return nhInProduct(row) !== null && (nhInProduct(row) as number) > 0;
}

export const ROW_Y = [62, 132, 202] as const;
const TUBE_X = 226;

function Tube({ y, kind }: { y: number; kind: HinsbergRow["amineClass"] }) {
  const top = y - 26;
  const bottom = y + 22;
  const x0 = TUBE_X;
  const w = 16;
  const liquidTop = y - 8;
  const shell = `M ${x0} ${top} L ${x0} ${bottom - 8} A 8 8 0 0 0 ${x0 + w} ${bottom - 8} L ${x0 + w} ${top}`;
  const liquid = `M ${x0} ${liquidTop} L ${x0} ${bottom - 8} A 8 8 0 0 0 ${x0 + w} ${bottom - 8} L ${x0 + w} ${liquidTop} Z`;
  return (
    <g>
      <path d={liquid} className="fill-sky-200/70 dark:fill-sky-800/50" />
      {kind === "secondary" && (
        <g className="fill-slate-500 dark:fill-slate-300">
          <circle cx={x0 + 4} cy={bottom - 5} r={2.4} />
          <circle cx={x0 + 9} cy={bottom - 3} r={2.4} />
          <circle cx={x0 + 12} cy={bottom - 7} r={2.2} />
          <circle cx={x0 + 6} cy={bottom - 9} r={2} />
          <circle cx={x0 + 10} cy={bottom - 11} r={1.8} />
        </g>
      )}
      <path d={shell} fill="none" strokeWidth={1.4} className="stroke-foreground" />
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 5} y2={y} strokeWidth={1.4} className="stroke-muted-foreground" />
      <polygon points={`${x2},${y} ${x2 - 6},${y - 3.5} ${x2 - 6},${y + 3.5}`} className="fill-muted-foreground" />
    </g>
  );
}

export default function JeeHinsbergTest() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the Hinsberg test for the three amine classes
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Three rows. Primary amine C2H5NH2 reacts with benzenesulphonyl chloride to give C6H5SO2NHC2H5, which keeps one acidic N-H and dissolves in alkali to a clear solution. Secondary amine (C2H5)2NH gives C6H5SO2N(C2H5)2 with no N-H, an insoluble solid. Tertiary amine (C2H5)3N has no N-H to replace and does not react."
      >
        <text x={8} y={16} className="fill-muted-foreground text-[10px] font-semibold">
          amine
        </text>
        <text x={146} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          with C₆H₅SO₂Cl
        </text>
        <text x={TUBE_X + 8} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          then alkali
        </text>

        {ROWS.map((row, i) => {
          const y = ROW_Y[i];
          const left = nhInProduct(row);
          const good = dissolvesInAlkali(row);
          return (
            <g key={row.amineClass}>
              {i > 0 && <line x1={6} y1={y - 38} x2={314} y2={y - 38} className="stroke-border" />}
              <text x={8} y={y - 6} className="fill-foreground text-[11px] font-bold">
                {row.label}
              </text>
              <text x={8} y={y + 9} className="fill-foreground text-[10.5px] font-semibold">
                {row.amine}
              </text>
              <Arrow x1={70} x2={90} y={y} />
              {row.product === null ? (
                <>
                  <text x={146} y={y - 2} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
                    no reaction
                  </text>
                  <text x={146} y={y + 11} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
                    no N–H to replace
                  </text>
                </>
              ) : (
                <>
                  <text x={146} y={y - 2} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
                    {row.amineClass === "primary" ? (
                      <>
                        C₆H₅SO₂N<tspan className="fill-emerald-600 font-bold dark:fill-emerald-400">H</tspan>C₂H₅
                      </>
                    ) : (
                      row.product
                    )}
                  </text>
                  <text
                    x={146}
                    y={y + 11}
                    textAnchor="middle"
                    className={`text-[9.5px] font-semibold ${left ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
                  >
                    {left ? "one N–H left, acidic" : "no N–H left"}
                  </text>
                </>
              )}
              <Arrow x1={200} x2={218} y={y} />
              <Tube y={y} kind={row.amineClass} />
              <text
                x={250}
                y={y - 2}
                className={`text-[10.5px] font-bold ${good ? "fill-emerald-700 dark:fill-emerald-300" : row.product ? "fill-rose-700 dark:fill-rose-300" : "fill-foreground"}`}
              >
                {row.inAlkali}
              </text>
              <text x={250} y={y + 11} className="fill-muted-foreground text-[9px]">
                {row.detail}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The reagent replaces an N–H. The SO₂ group makes any N–H still left acidic, so alkali dissolves the primary amine&apos;s product. Reacts
        and dissolves: primary. Reacts and stays solid: secondary. No reaction: tertiary.
      </p>
    </div>
  );
}
