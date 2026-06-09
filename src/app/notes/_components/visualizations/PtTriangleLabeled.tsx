/**
 * Standard triangle labelling: vertices A, B, C; the side opposite each vertex
 * is named with the matching lower-case letter (a opposite A, etc.). This is the
 * convention behind the sine rule (a/sin A = 2R) and cosine rule. Static SVG.
 */
export default function PtTriangleLabeled() {
  const A = { x: 60, y: 150 };
  const B = { x: 250, y: 150 };
  const C = { x: 175, y: 35 };
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 310 180" className="w-full" role="img" aria-label="A triangle with vertices A, B, C. The side opposite vertex A is labelled a, the side opposite B is b, and the side opposite C is c.">
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className="fill-indigo-500/10 stroke-indigo-600 dark:stroke-indigo-300" strokeWidth="2" />
        {/* vertices */}
        <text x={A.x - 12} y={A.y + 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="13">A</text>
        <text x={B.x + 6} y={B.y + 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="13">B</text>
        <text x={C.x - 4} y={C.y - 6} className="fill-indigo-700 font-semibold dark:fill-indigo-200" fontSize="13">C</text>
        {/* side labels (lower-case opposite the matching vertex) */}
        <text x={(B.x + C.x) / 2 + 8} y={(B.y + C.y) / 2} className="fill-rose-600 dark:fill-rose-300" fontSize="12" fontStyle="italic">a</text>
        <text x={(A.x + C.x) / 2 - 14} y={(A.y + C.y) / 2} className="fill-rose-600 dark:fill-rose-300" fontSize="12" fontStyle="italic">b</text>
        <text x={(A.x + B.x) / 2 - 3} y={A.y + 16} className="fill-rose-600 dark:fill-rose-300" fontSize="12" fontStyle="italic">c</text>
        <text x={155} y={172} className="fill-slate-500" fontSize="8.5">a opposite A · b opposite B · c opposite C</text>
      </svg>
    </div>
  );
}
