/**
 * Static figure: the change in oxidation number, read off a number line
 * (concept cetrdx-on-change).
 *
 * Each row is one of the concept's pairs, drawn as an arrow from the atom's
 * oxidation number in the reactant to its number in the product: up (to the
 * right) is oxidation, down (to the left) is reduction, and the length is the
 * change. ClO₃⁻ → ICl is the worked example, chlorine +5 → −1, down by 6.
 * CrO₄²⁻ → Cr₂O₇²⁻ keeps Cr at +6: no arrow, not redox (the concept's trap).
 * Values pinned by tests/notes-w2-01.test.ts. Server component.
 */

export type OnPair = { label: string; element: string; from: number; to: number };

/** The concept's pairs, in its own order. */
export const ON_PAIRS: readonly OnPair[] = [
  { label: "Cr₂O₇²⁻ → Cr³⁺", element: "Cr", from: 6, to: 3 },
  { label: "NO₃⁻ → NH₄⁺", element: "N", from: 5, to: -3 },
  { label: "H₂S → S", element: "S", from: -2, to: 0 },
  { label: "KMnO₄ → MnO₂", element: "Mn", from: 7, to: 4 },
  { label: "ClO₃⁻ → ICl", element: "Cl", from: 5, to: -1 },
  { label: "CrO₄²⁻ → Cr₂O₇²⁻", element: "Cr", from: 6, to: 6 },
];

/** Δ = ON(product) − ON(reactant). */
export const onChange = (p: OnPair) => p.to - p.from;

export function verdict(p: OnPair): "oxidised" | "reduced" | "no change" {
  const d = onChange(p);
  return d > 0 ? "oxidised" : d < 0 ? "reduced" : "no change";
}

/** Signed number as written in the notes: +5, −3, 0. */
export const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");

export const AXIS = { min: -3, max: 7, x0: 112, x1: 308 } as const;
export const xOf = (on: number) => Math.round((AXIS.x0 + ((on - AXIS.min) / (AXIS.max - AXIS.min)) * (AXIS.x1 - AXIS.x0)) * 100) / 100;

const ROW0 = 50;
const ROW_H = 30;
const BOTTOM = ROW0 + ON_PAIRS.length * ROW_H - 6;

const TONE = {
  oxidised: { line: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" },
  reduced: { line: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
  "no change": { line: "stroke-muted-foreground", fill: "fill-muted-foreground", text: "fill-muted-foreground" },
} as const;

export default function CetOxidationLadder() {
  const ticks: number[] = [];
  for (let k = AXIS.min; k <= AXIS.max; k++) ticks.push(k);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · oxidation number up or down across a reaction
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="Arrows on an oxidation-number line from minus 3 to plus 7. Cr in dichromate to Cr3+: plus 6 to plus 3, reduced by 3. N in nitrate to ammonium: plus 5 to minus 3, reduced by 8. S in H2S to S: minus 2 to 0, oxidised by 2. Mn in KMnO4 to MnO2: plus 7 to plus 4, reduced by 3. Cl in chlorate to ICl: plus 5 to minus 1, reduced by 6. Chromate to dichromate: Cr stays plus 6, no change."
      >
        <defs>
          {(["oxidised", "reduced"] as const).map((k) => (
            <marker key={k} id={`onl-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className={TONE[k].fill} />
            </marker>
          ))}
        </defs>

        <text x={AXIS.x0} y={12} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          ← down: reduction
        </text>
        <text x={AXIS.x1} y={12} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          up: oxidation →
        </text>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={xOf(t)} y1={30} x2={xOf(t)} y2={BOTTOM} className="stroke-border" strokeWidth={t === 0 ? 1.4 : 0.7} />
            <text x={xOf(t)} y={26} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {signed(t)}
            </text>
            <text x={xOf(t)} y={BOTTOM + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {signed(t)}
            </text>
          </g>
        ))}
        <text x={8} y={26} className="fill-muted-foreground text-[10px]">
          oxidation number
        </text>

        {ON_PAIRS.map((p, i) => {
          const y = ROW0 + i * ROW_H;
          const v = verdict(p);
          const tone = TONE[v];
          const d = onChange(p);
          return (
            <g key={p.label}>
              <text x={8} y={y + 2} className="fill-foreground text-[10px] font-semibold">
                {p.label}
              </text>
              <text x={8} y={y + 14} className={`${tone.text} text-[10px]`}>
                {p.element}: {v === "no change" ? `stays ${signed(p.from)}, not redox` : `${d > 0 ? "up" : "down"} ${Math.abs(d)}, ${v}`}
              </text>
              {v === "no change" ? (
                <circle cx={xOf(p.from)} cy={y + 4} r={4} className={tone.fill} />
              ) : (
                <g>
                  <circle cx={xOf(p.from)} cy={y + 4} r={3} className={tone.fill} />
                  <line
                    x1={xOf(p.from)}
                    y1={y + 4}
                    x2={xOf(p.to) + (d > 0 ? -3 : 3)}
                    y2={y + 4}
                    markerEnd={`url(#onl-${v})`}
                    className={tone.line}
                    strokeWidth={2.2}
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Δ = number in the product − number in the reactant. Chlorine in ClO₃⁻ is +5 and in ICl −1: down by 6, so chlorine is reduced and KClO₃
        is the oxidising agent. Chromate to dichromate changes the formula but not chromium&apos;s number, so it is not redox.
      </p>
    </div>
  );
}
