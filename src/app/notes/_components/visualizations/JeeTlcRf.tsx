/**
 * Static figure: a developed silica gel TLC plate with the concept's worked
 * example (jcgoc-rf): the solvent front 8.0 cm, spot A 3.2 cm and spot B
 * 6.0 cm, every distance measured from the base line.
 *
 * - Rf(A) = 3.2 / 8.0 = 0.40; Rf(B) = 6.0 / 8.0 = 0.75.
 * - A travels less, so silica holds it more strongly: A is the more polar.
 * - On a silica column the weakly held compound (higher Rf) elutes first: B.
 * - The base line sits above the plate's bottom edge, and the distances are
 *   drawn from the base line (the concept's trap); no number is given for the
 *   gap, since the example gives none.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-11.test.ts.
 */

export const SOLVENT_FRONT = 8.0;

export const SPOTS = [
  { id: "A", distance: 3.2, lane: 0 },
  { id: "B", distance: 6.0, lane: 1 },
] as const;

/** Rf = distance moved by the spot ÷ distance moved by the solvent front, both from the base line. */
export function rf(distance: number, front: number = SOLVENT_FRONT): number {
  return Math.round((distance / front) * 10000) / 10000;
}

/** The more polar compound on silica: the one with the LOWER Rf. */
export function morePolar(): string {
  return [...SPOTS].sort((a, b) => rf(a.distance) - rf(b.distance))[0].id;
}

/** First out of a silica column: the one with the HIGHER Rf. */
export function elutesFirst(): string {
  return [...SPOTS].sort((a, b) => rf(b.distance) - rf(a.distance))[0].id;
}

// Geometry: 20 viewBox units per cm, measured up from the base line.
export const SCALE = 20;
export const PLATE = { x0: 84, x1: 144, top: 30, bottom: 232, baseline: 212 } as const;
const LANE_X = [102, 126] as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
/** SVG y of a point d cm above the base line. */
export function yAt(d: number): number {
  return r2(PLATE.baseline - d * SCALE);
}

const fmt2 = (n: number) => n.toFixed(2);
const fmt1 = (n: number) => n.toFixed(1);

function Bracket({ x, d, label }: { x: number; d: number; label: string }) {
  const y0 = PLATE.baseline;
  const y1 = yAt(d);
  return (
    <g>
      <line x1={x} y1={y0} x2={x} y2={y1} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={x - 3} y1={y0} x2={x + 3} y2={y0} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={x - 3} y1={y1} x2={x + 3} y2={y1} strokeWidth={1.2} className="stroke-foreground" />
      <text x={x} y={y1 - 5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
        {label}
      </text>
    </g>
  );
}

export default function JeeTlcRf() {
  const yFront = yAt(SOLVENT_FRONT);
  const [a, b] = SPOTS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · measuring distances on a TLC plate
      </p>
      <svg
        viewBox="0 0 320 246"
        className="block h-auto w-full"
        role="img"
        aria-label="A developed silica gel TLC plate. The base line is drawn a little above the bottom edge, and both spots started on it. The solvent front is 8.0 centimetres above the base line, spot A 3.2 centimetres and spot B 6.0 centimetres. Rf of A is 3.2 divided by 8.0, 0.40; Rf of B is 6.0 divided by 8.0, 0.75. A is the more polar compound, and B comes out of a silica gel column first."
      >
        {/* Plate */}
        <rect x={PLATE.x0} y={PLATE.top} width={PLATE.x1 - PLATE.x0} height={PLATE.bottom - PLATE.top} strokeWidth={1.4} className="fill-background stroke-foreground" />
        {/* Wetted region up to the front */}
        <rect x={PLATE.x0 + 1} y={yFront} width={PLATE.x1 - PLATE.x0 - 2} height={PLATE.bottom - yFront - 1} className="fill-sky-100 dark:fill-sky-950/60" />
        {/* Solvent front */}
        <line x1={PLATE.x0} y1={yFront} x2={PLATE.x1} y2={yFront} strokeWidth={1.4} strokeDasharray="4 2" className="stroke-sky-600 dark:stroke-sky-400" />
        {/* Base line */}
        <line x1={PLATE.x0} y1={PLATE.baseline} x2={PLATE.x1} y2={PLATE.baseline} strokeWidth={1.2} className="stroke-muted-foreground" />
        {/* Start points and spots */}
        {SPOTS.map((s) => (
          <g key={s.id}>
            <circle cx={LANE_X[s.lane]} cy={PLATE.baseline} r={2.5} fill="none" strokeWidth={1} className="stroke-muted-foreground" />
            <ellipse cx={LANE_X[s.lane]} cy={yAt(s.distance)} rx={7} ry={5} className="fill-violet-500 dark:fill-violet-400" />
            <text x={LANE_X[s.lane]} y={yAt(s.distance) + 3.5} textAnchor="middle" className="fill-white text-[10px] font-semibold dark:fill-slate-950">
              {s.id}
            </text>
          </g>
        ))}

        {/* Left labels */}
        <text x={78} y={yFront + 3.5} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          solvent front
        </text>
        <text x={78} y={PLATE.baseline + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] font-semibold">
          base line
        </text>
        <text x={78} y={PLATE.bottom + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px]">
          bottom edge
        </text>

        {/* Distances from the base line */}
        <Bracket x={160} d={a.distance} label={`${fmt1(a.distance)} cm`} />
        <Bracket x={182} d={b.distance} label={`${fmt1(b.distance)} cm`} />
        <Bracket x={204} d={SOLVENT_FRONT} label={`${fmt1(SOLVENT_FRONT)} cm`} />

        {/* Working */}
        <text x={222} y={70} className="fill-foreground text-[10px] font-semibold">
          Rf of A
        </text>
        <text x={222} y={84} className="fill-foreground text-[10px] tabular-nums">
          {fmt1(a.distance)} ÷ {fmt1(SOLVENT_FRONT)} = {fmt2(rf(a.distance))}
        </text>
        <text x={222} y={106} className="fill-foreground text-[10px] font-semibold">
          Rf of B
        </text>
        <text x={222} y={120} className="fill-foreground text-[10px] tabular-nums">
          {fmt1(b.distance)} ÷ {fmt1(SOLVENT_FRONT)} = {fmt2(rf(b.distance))}
        </text>
        <text x={222} y={146} className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {morePolar()}: more polar,
        </text>
        <text x={222} y={159} className="fill-violet-700 text-[10px] dark:fill-violet-300">
          held more by silica
        </text>
        <text x={222} y={180} className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {elutesFirst()}: elutes first
        </text>
        <text x={222} y={193} className="fill-violet-700 text-[10px] dark:fill-violet-300">
          from a silica column
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Rf is the distance moved by the spot divided by the distance moved by the solvent front, both measured from the base line where the spots
        started, never from the bottom edge. It has no unit and is less than 1. The spot that travels less is held more strongly by silica gel.
      </p>
    </div>
  );
}
