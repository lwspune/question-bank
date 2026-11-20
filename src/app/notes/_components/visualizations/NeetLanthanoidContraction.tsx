/**
 * Still: lanthanoid contraction (concept nchdf-contraction). Top: the Ln³⁺
 * ions the concept names, in order of atomic number (La³⁺, Nd³⁺ Z = 60, Gd³⁺,
 * Dy³⁺ Z = 66, Lu³⁺), shrinking steadily; sizes show the trend only, the
 * concept gives no ionic radii. Bottom: the result the concept gives in
 * numbers, Zr 160 pm and Hf 159 pm, almost the same size although Hf is one
 * row lower.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-03.test.ts.
 */

export const IONS = [
  { ion: "La³⁺", z: null },
  { ion: "Nd³⁺", z: 60 },
  { ion: "Gd³⁺", z: null },
  { ion: "Dy³⁺", z: 66 },
  { ion: "Lu³⁺", z: null },
] as const;

/** Drawn radius of each ion: falls by the same small step each time (trend only). */
export const ionRadius = (i: number) => 19 - 1.6 * i;

export const GROUP = [
  { el: "Zr", row: "4d", pm: 160 },
  { el: "Hf", row: "5d", pm: 159 },
] as const;

/** Zr and Hf drawn to one scale: 8 pm per unit. */
export const atomRadius = (pm: number) => pm / 8;

export default function NeetLanthanoidContraction() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · lanthanoid contraction
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: the ions La3+, Nd3+ (Z 60), Gd3+, Dy3+ (Z 66) and Lu3+ in order of atomic number, each a little smaller than the one before. Bottom: zirconium, 4d, 160 pm, and hafnium, 5d, 159 pm, almost the same size because the 14 lanthanoids come between them."
      >
        <text x={6} y={14} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Ln³⁺ ions, La to Lu: each a little smaller
        </text>
        {IONS.map((p, i) => {
          const cx = 40 + i * 60;
          return (
            <g key={p.ion}>
              <circle cx={cx} cy={52} r={ionRadius(i)} className="fill-sky-300/60 stroke-sky-700 dark:fill-sky-500/30 dark:stroke-sky-300" strokeWidth={1} />
              <text x={cx} y={88} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {p.ion}
              </text>
              {p.z !== null && (
                <text x={cx} y={101} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  Z = {p.z}
                </text>
              )}
            </g>
          );
        })}
        <line x1={20} y1={116} x2={292} y2={116} strokeWidth={1.2} className="stroke-muted-foreground" />
        <polygon points="300,116 291,112 291,120" className="fill-muted-foreground" />
        <text x={160} y={130} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          atomic number rises, radius falls steadily
        </text>

        <line x1={6} y1={142} x2={314} y2={142} className="stroke-border" />

        {GROUP.map((g, i) => {
          const cy = 172 + i * 54;
          return (
            <g key={g.el}>
              <circle cx={44} cy={cy} r={atomRadius(g.pm)} className="fill-indigo-300/50 stroke-indigo-700 dark:fill-indigo-500/30 dark:stroke-indigo-300" strokeWidth={1} />
              <text x={44} y={cy + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                {g.el}
              </text>
              <text x={76} y={cy + 4} className="fill-foreground text-[11px] font-semibold">
                {g.el}, {g.row}: {g.pm} pm
              </text>
            </g>
          );
        })}
        <text x={76} y={203} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          the 14 lanthanoids come between them
        </text>
        <text x={190} y={176} className="fill-muted-foreground text-[10px]">
          down a group, size
        </text>
        <text x={190} y={189} className="fill-muted-foreground text-[10px]">
          normally grows
        </text>
        <text x={6} y={256} className="fill-foreground text-[10px]">
          Almost the same size, so Zr and Hf have very similar properties.
        </text>
      </svg>
      <p className="mt-2 text-sm text-foreground">
        A 4f electron shields another 4f electron poorly, so each step from La to Lu pulls the outer electrons in a little more. Fourteen small
        shrinkages cancel the usual growth in size down a group. The ion sizes are drawn to show the trend, not to scale.
      </p>
    </div>
  );
}
