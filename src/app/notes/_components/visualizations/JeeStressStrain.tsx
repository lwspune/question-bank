/**
 * Static figure: reading Young's modulus off a graph, for two materials
 * (concept jpsolid-material-graphs).
 *
 * Left: stress (y) against strain (x) for steel (Y = 2 × 10¹¹ N/m²) and copper
 * (Y = 1 × 10¹¹ N/m², the chapter's own value), straight while within the
 * elastic limit. The slope is Y, so steel's line is the steeper. The marked
 * point is the steel wire of the worked example on the same page: stress
 * 8 × 10⁷ N/m² at strain 4 × 10⁻⁴.
 * Right: the same two materials with the axes swapped, strain (y) against
 * stress (x). The slope is now 1/Y, so the order reverses and COPPER is the
 * steeper line: the concept's trap. Values pinned by
 * tests/notes-jee-visuals-phys-a.test.ts. Server component.
 */

/** Young's moduli, N/m². */
export const MATERIALS = [
  { name: "steel", Y: 2e11 },
  { name: "copper", Y: 1e11 },
] as const;

/** The worked example's steel wire: stress 8 × 10⁷ N/m², strain 4 × 10⁻⁴. */
export const WORKED_POINT = { stress: 8e7, strain: 4e-4 } as const;

/** Slope of a stress-against-strain line: Y. */
export const stressStrainSlope = (Y: number) => Y;
/** Slope of a strain-against-stress line: 1/Y. */
export const strainStressSlope = (Y: number) => 1 / Y;

// Axis ranges in display units: stress in 10⁷ N/m², strain in 10⁻⁴.
export const LEFT_AXES = { strainMax: 5, stressMax: 10 } as const;
export const RIGHT_AXES = { stressMax: 10, strainMax: 10 } as const;

/** Stress (10⁷ N/m²) at a strain (10⁻⁴) for modulus Y: σ = Y ε. */
export function stressAt(strainE4: number, Y: number): number {
  return (Y * strainE4 * 1e-4) / 1e7;
}
/** Strain (10⁻⁴) at a stress (10⁷ N/m²) for modulus Y: ε = σ/Y. */
export function strainAt(stressE7: number, Y: number): number {
  return (stressE7 * 1e7) / Y / 1e-4;
}

const r2 = (n: number) => Math.round(n * 100) / 100;
type Panel = { x0: number; x1: number; y0: number; y1: number };
const PL: Panel = { x0: 34, x1: 146, y0: 40, y1: 150 };
const PR: Panel = { x0: 196, x1: 308, y0: 40, y1: 150 };

const lx = (strain: number) => r2(PL.x0 + (strain / LEFT_AXES.strainMax) * (PL.x1 - PL.x0));
const ly = (stress: number) => r2(PL.y1 - (stress / LEFT_AXES.stressMax) * (PL.y1 - PL.y0));
const rx = (stress: number) => r2(PR.x0 + (stress / RIGHT_AXES.stressMax) * (PR.x1 - PR.x0));
const ry = (strain: number) => r2(PR.y1 - (strain / RIGHT_AXES.strainMax) * (PR.y1 - PR.y0));

const TONE = {
  steel: { stroke: "stroke-indigo-600 dark:stroke-indigo-400", text: "fill-indigo-700 dark:fill-indigo-300" },
  copper: { stroke: "stroke-amber-600 dark:stroke-amber-400", text: "fill-amber-700 dark:fill-amber-300" },
} as const;

function Frame({ p, xLabel, yLabel }: { p: Panel; xLabel: string; yLabel: string }) {
  return (
    <g>
      <line x1={p.x0} y1={p.y1} x2={p.x1} y2={p.y1} className="stroke-muted-foreground" />
      <line x1={p.x0} y1={p.y1} x2={p.x0} y2={p.y0 - 4} className="stroke-muted-foreground" />
      <text x={p.x0 - 4} y={p.y0 - 10} className="fill-muted-foreground text-[10px]">
        {yLabel}
      </text>
      <text x={p.x1} y={p.y1 + 24} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
    </g>
  );
}

export default function JeeStressStrain() {
  const [steel, copper] = MATERIALS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading Young&apos;s modulus off a graph
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: stress against strain for steel and copper. Both are straight lines; steel's is steeper because its slope is Young's modulus, 2 times 10 to the 11 newtons per square metre, against copper's 1 times 10 to the 11. Right: strain against stress for the same two. Now copper's line is steeper, because the slope is 1 over Young's modulus."
      >
        {/* Left: stress against strain */}
        <Frame p={PL} xLabel="strain (10⁻⁴)" yLabel="stress (10⁷ N/m²)" />
        {[0, 2, 4].map((t) => (
          <text key={t} x={lx(t)} y={PL.y1 + 11} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        {[4, 8].map((t) => (
          <g key={t}>
            <line x1={PL.x0} y1={ly(t)} x2={PL.x1} y2={ly(t)} strokeDasharray="2 3" className="stroke-border" />
            <text x={PL.x0 - 4} y={ly(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {MATERIALS.map((m) => {
          const end = Math.min(LEFT_AXES.strainMax, (LEFT_AXES.stressMax * 1e7) / m.Y / 1e-4);
          return <line key={m.name} x1={lx(0)} y1={ly(0)} x2={lx(end)} y2={ly(stressAt(end, m.Y))} strokeWidth={2.2} className={TONE[m.name].stroke} />;
        })}
        <line x1={lx(4)} y1={ly(0)} x2={lx(4)} y2={ly(8)} strokeDasharray="3 2" className="stroke-muted-foreground" />
        <circle cx={lx(4)} cy={ly(8)} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={lx(4) + 5} y={ly(8) + 12} className={`${TONE.steel.text} text-[10px] tabular-nums`}>
          (4, 8)
        </text>
        <text x={lx(2.0)} y={ly(5.5)} textAnchor="end" className={`${TONE.steel.text} text-[11px] font-semibold`}>
          steel
        </text>
        <text x={lx(4.6)} y={ly(stressAt(4.6, copper.Y)) - 5} textAnchor="end" className={`${TONE.copper.text} text-[11px] font-semibold`}>
          copper
        </text>
        <text x={(PL.x0 + PL.x1) / 2} y={190} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          slope = Y
        </text>
        <text x={(PL.x0 + PL.x1) / 2} y={204} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          steepest = largest Y
        </text>

        {/* Right: strain against stress, the order reverses */}
        <Frame p={PR} xLabel="stress (10⁷ N/m²)" yLabel="strain (10⁻⁴)" />
        {[0, 5, 10].map((t) => (
          <text key={t} x={rx(t)} y={PR.y1 + 11} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        {[5, 10].map((t) => (
          <g key={t}>
            <line x1={PR.x0} y1={ry(t)} x2={PR.x1} y2={ry(t)} strokeDasharray="2 3" className="stroke-border" />
            <text x={PR.x0 - 4} y={ry(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        {MATERIALS.map((m) => (
          <line
            key={m.name}
            x1={rx(0)}
            y1={ry(0)}
            x2={rx(RIGHT_AXES.stressMax)}
            y2={ry(strainAt(RIGHT_AXES.stressMax, m.Y))}
            strokeWidth={2.2}
            className={TONE[m.name].stroke}
          />
        ))}
        <text x={rx(7.6)} y={ry(strainAt(7.6, copper.Y)) - 6} textAnchor="end" className={`${TONE.copper.text} text-[11px] font-semibold`}>
          copper
        </text>
        <text x={rx(9.6)} y={ry(strainAt(9.6, steel.Y)) + 14} textAnchor="end" className={`${TONE.steel.text} text-[11px] font-semibold`}>
          steel
        </text>
        <text x={(PR.x0 + PR.x1) / 2} y={190} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          slope = 1/Y
        </text>
        <text x={(PR.x0 + PR.x1) / 2} y={204} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          steepest = smallest Y
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Steel, Y = 2 × 10¹¹ N/m²; copper, Y = 1 × 10¹¹ N/m². Within the elastic limit each line is straight. Stress against strain: the slope is
        Y, so steel is steeper (its marked point, strain 4 × 10⁻⁴ at stress 8 × 10⁷ N/m², gives 8 × 10⁷ ÷ 4 × 10⁻⁴ = 2 × 10¹¹ N/m²). Swap the
        axes and the slope is 1/Y: copper is now the steeper line. Y belongs to the material, so a longer or thicker wire of steel gives the
        same line.
      </p>
    </div>
  );
}
