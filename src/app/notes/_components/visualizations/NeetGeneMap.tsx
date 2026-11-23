/**
 * Static figure: ordering three genes from their recombination frequencies,
 * the worked example of the NEET concept "Recombination frequency and gene
 * mapping" (nbopi-gene-mapping).
 *
 * Genes P, Q and R on one chromosome: P and Q 8%, Q and R 12%, P and R 20%.
 * The largest distance marks the outer genes; 8 + 12 = 20, so Q lies between
 * P and R. Distances are drawn to scale (12 drawing units per 1%), the way
 * Sturtevant used recombination frequency as a measure of distance.
 *
 * The data are exported and pinned by tests/notes-w2-17.test.ts.
 * Server component, no client state.
 */

/** The worked example's recombination frequencies (%). */
export const RF = { PQ: 8, QR: 12, PR: 20 } as const;

/** Map positions (%) from P, read off the example. */
export const POSITIONS = { P: 0, Q: RF.PQ, R: RF.PQ + RF.QR } as const;

export const LEFT = 40;
export const UNIT = 12;

export function geneX(g: keyof typeof POSITIONS): number {
  return LEFT + POSITIONS[g] * UNIT;
}

/** The three gene order, left to right. */
export const ORDER = (Object.keys(POSITIONS) as (keyof typeof POSITIONS)[]).sort((a, b) => POSITIONS[a] - POSITIONS[b]);

type Span = { from: keyof typeof POSITIONS; to: keyof typeof POSITIONS; rf: number; y: number; tone: string; text: string };

export const SPANS: readonly Span[] = [
  { from: "P", to: "R", rf: RF.PR, y: 58, tone: "stroke-violet-600 dark:stroke-violet-400", text: "fill-violet-700 dark:fill-violet-300" },
  { from: "P", to: "Q", rf: RF.PQ, y: 92, tone: "stroke-sky-600 dark:stroke-sky-400", text: "fill-sky-700 dark:fill-sky-300" },
  { from: "Q", to: "R", rf: RF.QR, y: 92, tone: "stroke-emerald-600 dark:stroke-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" },
];

export default function NeetGeneMap() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a gene map from recombination frequencies
      </p>
      <svg
        viewBox="0 0 320 190"
        className="block h-auto w-full"
        role="img"
        aria-label="Genes P, Q and R on a chromosome drawn to scale. P to Q is 8 percent, Q to R is 12 percent and P to R is 20 percent. Since 8 plus 12 is 20, Q lies between P and R."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          recombination frequency used as the distance
        </text>

        {SPANS.map((s) => {
          const x1 = geneX(s.from);
          const x2 = geneX(s.to);
          return (
            <g key={`${s.from}${s.to}`}>
              <line x1={x1 + 1} y1={s.y} x2={x2 - 1} y2={s.y} strokeWidth={1.5} className={s.tone} />
              <line x1={x1 + 1} y1={s.y - 5} x2={x1 + 1} y2={s.y + 5} strokeWidth={1.5} className={s.tone} />
              <line x1={x2 - 1} y1={s.y - 5} x2={x2 - 1} y2={s.y + 5} strokeWidth={1.5} className={s.tone} />
              <text x={(x1 + x2) / 2} y={s.y - 7} textAnchor="middle" className={`${s.text} text-[11px] font-semibold`}>
                {s.rf}%
              </text>
            </g>
          );
        })}

        {/* The chromosome and the three genes. */}
        <rect x={28} y={108} width={264} height={18} rx={9} strokeWidth={1.2} className="fill-sky-100 stroke-sky-700 dark:fill-sky-950 dark:stroke-sky-300" />
        {ORDER.map((g) => (
          <g key={g}>
            <rect x={geneX(g) - 3} y={108} width={6} height={18} className="fill-indigo-700 dark:fill-indigo-300" />
            <line x1={geneX(g)} y1={92} x2={geneX(g)} y2={108} strokeWidth={1} strokeDasharray="2 2" className="stroke-muted-foreground" />
            <text x={geneX(g)} y={144} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
              {g}
            </text>
          </g>
        ))}

        <text x={160} y={166} textAnchor="middle" className="fill-foreground text-[11px]">
          {RF.PQ}% + {RF.QR}% = {RF.PR}%
        </text>
        <text x={160} y={182} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          so Q lies between P and R
        </text>
      </svg>
    </div>
  );
}
