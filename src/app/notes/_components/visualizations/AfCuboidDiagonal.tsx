/**
 * A cuboid 12 by 9 by 8 with its floor diagonal and its space diagonal drawn.
 *
 * Across the floor, the corner-to-corner line is the long side of a right
 * triangle with legs 12 and 9, so it is 15. Standing on that line, the space
 * diagonal is the long side of a second right triangle with legs 15 and 8, so
 * it is 17, the same as the square root of 12 squared plus 9 squared plus 8
 * squared. It is the worked example of the concept it sits on (AFCAT Surface
 * Area and Volume, "Cuboid: volume, surface, diagonal and the open tank"), so
 * the picture and the arithmetic match number for number.
 *
 * Why this concept earns a diagram: the space diagonal formula is Pythagoras
 * used twice, and only a drawn box shows the floor triangle under the slanted
 * one. Hidden edges are dashed.
 *
 * Server component, static 2-D.
 */
const S = 20; // px per cm along the front face
const DX = 94; // depth of 9 cm drawn at an angle
const DY = -54;

const A = { x: 60, y: 280 }; // front bottom left
const B = { x: A.x + 12 * S, y: A.y }; // front bottom right
const E = { x: A.x, y: A.y - 8 * S }; // front top left
const F = { x: B.x, y: E.y }; // front top right
const D = { x: A.x + DX, y: A.y + DY }; // back bottom left (hidden)
const C = { x: B.x + DX, y: B.y + DY }; // back bottom right
const H = { x: E.x + DX, y: E.y + DY }; // back top left
const G = { x: F.x + DX, y: F.y + DY }; // back top right

const EDGE = "stroke-slate-600 dark:stroke-slate-300";
const HIDDEN = "stroke-slate-400 dark:stroke-slate-500";

function line(p: { x: number; y: number }, q: { x: number; y: number }, cls: string, dashed = false, width = 2) {
  return (
    <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={cls} strokeWidth={width} strokeDasharray={dashed ? "5 5" : undefined} />
  );
}

export default function AfCuboidDiagonal() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 640 320"
        className="w-full"
        role="img"
        aria-label="A cuboid 12 cm long, 9 cm wide and 8 cm high. The diagonal across the floor joins two opposite floor corners and is 15 cm, from 12 and 9 by Pythagoras. The space diagonal rises from the same corner to the opposite top corner and is 17 cm, from 15 and 8 by Pythagoras."
      >
        {/* front face, lightly filled */}
        <rect x={E.x} y={E.y} width={12 * S} height={8 * S} className="fill-indigo-500 dark:fill-indigo-400" fillOpacity="0.12" />

        {/* visible edges */}
        {line(A, B, EDGE)}
        {line(B, F, EDGE)}
        {line(F, E, EDGE)}
        {line(E, A, EDGE)}
        {line(B, C, EDGE)}
        {line(C, G, EDGE)}
        {line(F, G, EDGE)}
        {line(E, H, EDGE)}
        {line(H, G, EDGE)}

        {/* hidden edges */}
        {line(A, D, HIDDEN, true)}
        {line(D, C, HIDDEN, true)}
        {line(D, H, HIDDEN, true)}

        {/* floor diagonal and space diagonal */}
        {line(A, C, "stroke-sky-600 dark:stroke-sky-400", true, 3)}
        {line(A, G, "stroke-amber-500 dark:stroke-amber-400", false, 3)}
        <circle cx={A.x} cy={A.y} r="4" className="fill-slate-800 dark:fill-slate-100" />
        <circle cx={G.x} cy={G.y} r="4" className="fill-slate-800 dark:fill-slate-100" />

        {/* edge labels */}
        <text x={(A.x + B.x) / 2} y={A.y + 22} textAnchor="middle" fontSize="14" className="fill-slate-700 dark:fill-slate-200">
          l = 12
        </text>
        <text x={(B.x + C.x) / 2 + 22} y={(B.y + C.y) / 2 + 12} fontSize="14" className="fill-slate-700 dark:fill-slate-200">
          b = 9
        </text>
        <text x={A.x - 12} y={(A.y + E.y) / 2} textAnchor="end" fontSize="14" className="fill-slate-700 dark:fill-slate-200">
          h = 8
        </text>
        <text x={C.x + 10} y={(C.y + G.y) / 2} fontSize="14" className="fill-slate-700 dark:fill-slate-200">
          8
        </text>

        {/* diagonal labels */}
        <text x={(A.x + C.x) / 2 + 10} y={(A.y + C.y) / 2 + 22} fontSize="14" fontWeight="600" className="fill-sky-700 dark:fill-sky-300">
          15
        </text>
        <text x={(A.x + G.x) / 2 - 18} y={(A.y + G.y) / 2 - 8} fontSize="14" fontWeight="600" className="fill-amber-700 dark:fill-amber-300">
          17
        </text>

        {/* working */}
        <text x={440} y={150} fontSize="13" fontWeight="600" className="fill-slate-800 dark:fill-slate-100">
          Pythagoras twice
        </text>
        <text x={440} y={174} fontSize="12" className="fill-sky-700 dark:fill-sky-300">
          floor: √(144 + 81) = 15
        </text>
        <text x={440} y={196} fontSize="12" className="fill-amber-700 dark:fill-amber-300">
          space: √(225 + 64) = 17
        </text>
        <text x={440} y={222} fontSize="12" className="fill-slate-700 dark:fill-slate-200">
          same as √(l² + b² + h²)
        </text>
      </svg>
    </div>
  );
}
