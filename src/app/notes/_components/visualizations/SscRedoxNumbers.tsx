/**
 * Static figure: the oxidation numbers in 4NH₃ + 5O₂ → 4NO + 6H₂O on one
 * scale (concept ssccrre-redox).
 *
 * Nitrogen goes from −3 (in NH₃) to +2 (in NO): the number rises, so it is
 * oxidised (electrons lost). Oxygen goes from 0 (in O₂) to −2 (in NO and
 * H₂O): the number falls, so it is reduced (electrons gained). Values pinned
 * by tests/notes-w2-10.test.ts. Server component.
 */

export type OxidationChange = {
  element: string;
  from: number;
  fromIn: string;
  to: number;
  toIn: string;
};

export const REDOX_EQUATION = "4NH₃ + 5O₂ → 4NO + 6H₂O";

export const REDOX_CHANGES: readonly OxidationChange[] = [
  { element: "Nitrogen", from: -3, fromIn: "NH₃", to: 2, toIn: "NO" },
  { element: "Oxygen", from: 0, fromIn: "O₂", to: -2, toIn: "NO, H₂O" },
];

export function redoxVerdict(c: OxidationChange): "oxidised" | "reduced" | "unchanged" {
  if (c.to > c.from) return "oxidised";
  if (c.to < c.from) return "reduced";
  return "unchanged";
}

/** "+2", "0", "−3" with a true minus sign. */
export function signed(n: number): string {
  if (n === 0) return "0";
  return n > 0 ? `+${n}` : `−${Math.abs(n)}`;
}

const TOP = 2;
const BOTTOM = -3;
const Y_TOP = 52;
const PER = 24;
const COLS = [130, 240];

export function levelY(n: number): number {
  return Y_TOP + (TOP - n) * PER;
}

export default function SscRedoxNumbers() {
  const levels = Array.from({ length: TOP - BOTTOM + 1 }, (_, i) => TOP - i);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which element is oxidised and which reduced
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="An oxidation number scale from minus 3 to plus 2 for 4NH3 + 5O2 gives 4NO + 6H2O. Nitrogen rises from minus 3 in NH3 to plus 2 in NO, so it is oxidised and loses electrons. Oxygen falls from 0 in O2 to minus 2 in NO and H2O, so it is reduced and gains electrons."
      >
        <text x={160} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          {REDOX_EQUATION}
        </text>
        <text x={8} y={36} className="fill-muted-foreground text-[10px]">
          oxidation number
        </text>
        {levels.map((n) => (
          <g key={n}>
            <line x1={44} y1={levelY(n)} x2={300} y2={levelY(n)} className={n === 0 ? "stroke-muted-foreground" : "stroke-border"} strokeWidth={1} />
            <text x={36} y={levelY(n) + 4} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
              {signed(n)}
            </text>
          </g>
        ))}
        {REDOX_CHANGES.map((c, i) => {
          const x = COLS[i];
          const up = redoxVerdict(c) === "oxidised";
          const y1 = levelY(c.from);
          const y2 = levelY(c.to);
          const tone = up ? "fill-rose-600 dark:fill-rose-400" : "fill-sky-600 dark:fill-sky-400";
          const stroke = up ? "stroke-rose-600 dark:stroke-rose-400" : "stroke-sky-600 dark:stroke-sky-400";
          const tip = up ? y2 + 6 : y2 - 6;
          return (
            <g key={c.element}>
              <text x={x} y={36} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
                {c.element}
              </text>
              <line x1={x} y1={y1} x2={x} y2={tip} className={stroke} strokeWidth={2.2} />
              <polygon
                points={up ? `${x},${y2} ${x - 5},${y2 + 8} ${x + 5},${y2 + 8}` : `${x},${y2} ${x - 5},${y2 - 8} ${x + 5},${y2 - 8}`}
                className={tone}
              />
              <circle cx={x} cy={y1} r={3.5} className={tone} />
              <text x={x + 8} y={y1 + 4} className="fill-foreground text-[10px]">
                in {c.fromIn}
              </text>
              <text x={x + 8} y={y2 + 4} className="fill-foreground text-[10px]">
                in {c.toIn}
              </text>
            </g>
          );
        })}
        <text x={COLS[0]} y={levelY(BOTTOM) + 26} textAnchor="middle" className="fill-rose-700 text-[11px] font-bold dark:fill-rose-300">
          rises: oxidised
        </text>
        <text x={COLS[0]} y={levelY(BOTTOM) + 39} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          electrons lost
        </text>
        <text x={COLS[1]} y={levelY(BOTTOM) + 26} textAnchor="middle" className="fill-sky-700 text-[11px] font-bold dark:fill-sky-300">
          falls: reduced
        </text>
        <text x={COLS[1]} y={levelY(BOTTOM) + 39} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          electrons gained
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A redox reaction moves electrons between reactants. The element whose number rises is oxidised; the one whose number
        falls is reduced.
      </p>
    </div>
  );
}
