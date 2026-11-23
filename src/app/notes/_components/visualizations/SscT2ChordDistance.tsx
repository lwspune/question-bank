/**
 * Static figure: the perpendicular from the centre halves a chord, giving the
 * right triangle r² = (c/2)² + d² (concept ssc2cich-chords). Drawn to scale
 * with the concept's worked example: a chord of 16 cm lying 6 cm from the
 * centre, so half the chord is 8 cm and r = √(8² + 6²) = 10 cm. The chord is
 * placed so its ends truly lie on the circle. Plain geometry, server
 * component. Pinned by tests/notes-w2-05.test.ts.
 */

export type Pt = { x: number; y: number };

/** The worked example. */
export const CHORD_CM = 16;
export const DIST_CM = 6;
export const halfChord = (c: number) => c / 2;
export const radiusFrom = (c: number, d: number) => Math.sqrt(halfChord(c) ** 2 + d ** 2);
export const RADIUS_CM = radiusFrom(CHORD_CM, DIST_CM);

// Geometry (viewBox units), drawn to scale.
export const PX_PER_CM = 9;
export const O: Pt = { x: 160, y: 104 };
export const R_PX = RADIUS_CM * PX_PER_CM;
/** M: the foot of the perpendicular from O, the middle of the chord. */
export const M: Pt = { x: O.x, y: O.y + DIST_CM * PX_PER_CM };
export const A: Pt = { x: O.x - halfChord(CHORD_CM) * PX_PER_CM, y: M.y };
export const B: Pt = { x: O.x + halfChord(CHORD_CM) * PX_PER_CM, y: M.y };
export const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

const CHORD = "stroke-indigo-600 dark:stroke-indigo-400";
const DIST = "stroke-amber-500 dark:stroke-amber-400";
const RAD = "stroke-rose-600 dark:stroke-rose-400";

export default function SscT2ChordDistance() {
  const tick = (x: number) => <line x1={x} y1={M.y - 5} x2={x} y2={M.y + 5} strokeWidth={1.2} className="stroke-foreground" />;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · radius, half the chord and the distance from the centre
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="A circle with centre O and a chord AB 16 centimetres long. The perpendicular from O meets the chord at M, 6 centimetres from O, and cuts the chord into two halves of 8 centimetres. The radius OB, the half chord MB and the distance OM make a right triangle, so the radius squared is 8 squared plus 6 squared, 100, and the radius is 10 centimetres."
      >
        <circle cx={O.x} cy={O.y} r={R_PX} fill="none" strokeWidth={1.5} className="stroke-foreground" />

        {/* The right triangle O, M, B */}
        <polygon points={`${O.x},${O.y} ${M.x},${M.y} ${B.x},${B.y}`} className="fill-rose-100/70 dark:fill-rose-950/40" />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} strokeWidth={2.2} className={CHORD} />
        <line x1={O.x} y1={O.y} x2={M.x} y2={M.y} strokeWidth={2} className={DIST} />
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} strokeWidth={2} className={RAD} />
        <path d={`M ${M.x + 7} ${M.y} L ${M.x + 7} ${M.y - 7} L ${M.x} ${M.y - 7}`} fill="none" strokeWidth={1.2} className="stroke-foreground" />
        {tick((A.x + M.x) / 2)}
        {tick((M.x + B.x) / 2)}

        {[
          { p: O, name: "O", dx: -9, dy: -3 },
          { p: A, name: "A", dx: -8, dy: 4 },
          { p: B, name: "B", dx: 8, dy: 4 },
          { p: M, name: "M", dx: 0, dy: 15 },
        ].map(({ p, name, dx, dy }) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={2.2} className="fill-foreground" />
            <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
              {name}
            </text>
          </g>
        ))}

        <text x={(A.x + M.x) / 2} y={M.y + 16} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          8
        </text>
        <text x={(M.x + B.x) / 2} y={M.y + 16} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          8
        </text>
        <text x={118} y={M.y - 7} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          chord 16
        </text>
        <text x={O.x - 5} y={(O.y + M.y) / 2 + 4} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          d = 6
        </text>
        <text x={(O.x + B.x) / 2 + 5} y={(O.y + B.y) / 2 - 5} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          r = 10
        </text>

        <text x={160} y={216} textAnchor="middle" className="fill-foreground text-[10px]">
          Half the chord: 16 ÷ 2 = 8 cm
        </text>
        <text x={160} y={232} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          r² = 8² + 6² = 64 + 36 = 100, so r = 10 cm
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The line from the centre O at right angles to the chord AB cuts it in half at M. A chord of 16 cm lying 6 cm from the centre
        gives a right triangle with half the chord, 8 cm, and the distance, 6 cm, as its short sides and the radius as its long side.
        Use half the chord, not all of it. Drawn to scale.
      </p>
    </div>
  );
}
