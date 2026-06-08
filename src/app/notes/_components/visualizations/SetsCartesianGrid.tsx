/**
 * The Cartesian product A × B drawn as a grid of points: |A| columns × |B|
 * rows = |A|·|B| ordered pairs. A highlighted subset of points illustrates a
 * relation (a subset of A × B). Static SVG.
 */
export default function SetsCartesianGrid() {
  const A = [1, 2, 3]; // x-values
  const B = [1, 2, 3, 4]; // y-values
  const x0 = 60;
  const y0 = 150;
  const dx = 60;
  const dy = 34;
  // a sample relation R = {(x,y): y = x+1}
  const inR = (x: number, y: number) => y === x + 1;
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 260 180" className="w-full" role="img" aria-label="A grid of points for the Cartesian product of a 3-element set A and a 4-element set B, giving 12 ordered pairs; the pairs satisfying y = x + 1 are highlighted as a sample relation.">
        {/* axes */}
        <line x1={x0 - 14} y1={y0} x2={x0 + 3 * dx} y2={y0} className="stroke-slate-400" strokeWidth="1.4" />
        <line x1={x0} y1={y0 + 14} x2={x0} y2={y0 - 4 * dy} className="stroke-slate-400" strokeWidth="1.4" />
        <text x={x0 + 3 * dx - 4} y={y0 + 24} className="fill-indigo-700 dark:fill-indigo-300" fontSize="10" fontWeight="600">A</text>
        <text x={x0 - 30} y={y0 - 4 * dy + 8} className="fill-rose-700 dark:fill-rose-300" fontSize="10" fontWeight="600">B</text>
        {A.map((x) => (
          <text key={`ax${x}`} x={x0 + x * dx} y={y0 + 16} textAnchor="middle" className="fill-slate-500" fontSize="9">{x}</text>
        ))}
        {B.map((y) => (
          <text key={`by${y}`} x={x0 - 12} y={y0 - y * dy + 3} textAnchor="middle" className="fill-slate-500" fontSize="9">{y}</text>
        ))}
        {A.map((x) =>
          B.map((y) => {
            const hit = inR(x, y);
            return (
              <circle
                key={`${x}-${y}`}
                cx={x0 + x * dx}
                cy={y0 - y * dy}
                r={hit ? 5 : 3}
                className={hit ? "fill-rose-500 stroke-rose-700" : "fill-slate-300 dark:fill-slate-600"}
                strokeWidth={hit ? 1 : 0}
              />
            );
          })
        )}
        <text x={130} y={16} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9">A × B = 3 × 4 = 12 pairs · red: relation y = x+1</text>
      </svg>
    </div>
  );
}
