/**
 * Static figure: why water in an earthen pot (matka) stays cool
 * (concept sscfhthe-heat).
 *
 * The concept's self-check: the matka is porous, water seeps out through its
 * pores and evaporates from the outside, and evaporation takes latent heat
 * from the water inside, so that water cools. A steel pot has no pores. Values
 * pinned by tests/notes-w2-10.test.ts. Server component.
 */

/** The order of the story the figure tells, in the concept's words. */
export const MATKA_STEPS = [
  "water seeps out through the pores",
  "it evaporates outside",
  "evaporation takes latent heat from the water inside",
] as const;

export const POT = { x: 110, y: 124, outer: 62, inner: 55, waterline: 84 } as const;
/** Angles (degrees, clockwise from the right) where water leaves through the wall. */
export const SEEP_ANGLES = [-30, 0, 30] as const;

/** Half the width of the water surface inside the pot. */
export function waterHalfWidth(): number {
  const dy = POT.y - POT.waterline;
  return Math.sqrt(POT.inner * POT.inner - dy * dy);
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function at(radius: number, deg: number): { x: number; y: number } {
  const a = (deg * Math.PI) / 180;
  return { x: r2(POT.x + radius * Math.cos(a)), y: r2(POT.y + radius * Math.sin(a)) };
}

const PORES = [-60, -45, -15, 15, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210];

export default function SscMatkaCooling() {
  const hw = r2(waterHalfWidth());
  const water = `M ${r2(POT.x - hw)} ${POT.waterline} A ${POT.inner} ${POT.inner} 0 1 0 ${r2(POT.x + hw)} ${POT.waterline} Z`;
  const clay = "fill-orange-300 stroke-orange-700 dark:fill-orange-800 dark:stroke-orange-400";
  const leader = at((POT.outer + POT.inner) / 2, SEEP_ANGLES[0]);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · why a matka keeps water cool
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="A cut-away earthen pot full of water. Water seeps out through the pores in its wall and evaporates from the outside surface. The evaporation takes latent heat from the water inside, so the water cools."
      >
        {/* pot: neck, wall, hollow, water */}
        <rect x={POT.x - 20} y={44} width={40} height={24} className={clay} strokeWidth={1.2} />
        <rect x={POT.x - 25} y={40} width={50} height={7} rx={2} className={clay} strokeWidth={1.2} />
        <circle cx={POT.x} cy={POT.y} r={POT.outer} className={clay} strokeWidth={1.2} />
        <rect x={POT.x - 14} y={44} width={28} height={26} className="fill-background" />
        <circle cx={POT.x} cy={POT.y} r={POT.inner} className="fill-background stroke-orange-700 dark:stroke-orange-400" strokeWidth={1} />
        <path d={water} className="fill-sky-200 dark:fill-sky-900" />
        <line x1={r2(POT.x - hw)} y1={POT.waterline} x2={r2(POT.x + hw)} y2={POT.waterline} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1} />
        {PORES.map((d) => {
          const p = at((POT.outer + POT.inner) / 2, d);
          return <circle key={d} cx={p.x} cy={p.y} r={1.4} className="fill-background" />;
        })}

        {/* water through the wall, then evaporating */}
        {SEEP_ANGLES.map((d) => {
          const p = at((POT.outer + POT.inner) / 2, d);
          return (
            <g key={d}>
              <circle cx={p.x} cy={p.y} r={2.6} className="fill-sky-600 dark:fill-sky-400" />
              <g transform={`translate(${POT.x} ${POT.y}) rotate(${d})`}>
                <path d="M 66 0 q 3 -4 6 0 t 6 0 t 6 0 t 6 0" fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.4} />
                <polygon points="94,0 88,-3.5 88,3.5" className="fill-sky-600 dark:fill-sky-400" />
              </g>
            </g>
          );
        })}

        {/* heat leaving the water inside */}
        {SEEP_ANGLES.map((d) => (
          <g key={`h${d}`} transform={`translate(${POT.x} ${POT.y}) rotate(${d})`}>
            <line x1={12} y1={0} x2={40} y2={0} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.8} />
            <polygon points="47,0 39,-4 39,4" className="fill-rose-600 dark:fill-rose-400" />
          </g>
        ))}
        <text x={POT.x + 4} y={POT.y + 4} textAnchor="end" className="fill-rose-700 text-[10px] font-bold dark:fill-rose-300">
          heat
        </text>

        {/* labels */}
        <text x={8} y={20} className="fill-foreground text-[11px] font-bold">
          Earthen pot (matka), cut open
        </text>
        <text x={160} y={56} className="fill-foreground text-[10px] font-semibold">
          1. Water seeps out
        </text>
        <text x={160} y={68} className="fill-foreground text-[10px]">
          through the pores
        </text>
        <line x1={leader.x + 1} y1={72} x2={leader.x} y2={leader.y - 4} className="stroke-muted-foreground" strokeWidth={0.8} />
        <text x={210} y={120} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
          2. It evaporates
        </text>
        <text x={210} y={132} className="fill-sky-800 text-[10px] dark:fill-sky-200">
          from the outside
        </text>
        <text x={POT.x} y={202} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          3. Evaporation takes latent heat
        </text>
        <text x={POT.x} y={214} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          from the water inside, so it cools
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A steel pot has no pores, so no water evaporates from its outside and its water stays warmer.
      </p>
    </div>
  );
}
