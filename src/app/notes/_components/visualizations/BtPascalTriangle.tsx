/**
 * Pascal's triangle: each entry is C(n, r); each is the sum of the two above it
 * (Pascal's rule C(n,r)=C(n-1,r-1)+C(n-1,r)), each row reads the same forwards
 * and backwards (symmetry C(n,r)=C(n,n-r)), and row n sums to 2ⁿ. One Pascal-rule
 * addition (4 + 6 = 10) is highlighted. Static SVG, rows 0–6.
 */
export default function BtPascalTriangle() {
  const rows = 7; // n = 0..6
  const C: number[][] = [];
  for (let n = 0; n < rows; n++) {
    C[n] = [];
    for (let r = 0; r <= n; r++) {
      C[n][r] = r === 0 || r === n ? 1 : C[n - 1][r - 1] + C[n - 1][r];
    }
  }
  const W = 320;
  const H = 218;
  const dx = 26;
  const dy = 28;
  const ox = W / 2 - 24;
  const oy = 18;
  const pos = (n: number, r: number) => ({ x: ox + (2 * r - n) * dx, y: oy + n * dy });
  const isParent = (n: number, r: number) => n === 4 && (r === 1 || r === 2);
  const isChild = (n: number, r: number) => n === 5 && r === 2;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Pascal's triangle, rows 0 to 6. Each number is the sum of the two above it, each row is symmetric, and row n adds to 2 to the power n. The entries 4 and 6 in row 4 add to 10 in row 5.">
        {(() => {
          const c = pos(5, 2), p1 = pos(4, 1), p2 = pos(4, 2);
          return (
            <g>
              <line x1={p1.x} y1={p1.y} x2={c.x} y2={c.y} className="stroke-rose-300" strokeWidth="1.2" />
              <line x1={p2.x} y1={p2.y} x2={c.x} y2={c.y} className="stroke-rose-300" strokeWidth="1.2" />
            </g>
          );
        })()}
        {C.map((row, n) =>
          row.map((v, r) => {
            const { x, y } = pos(n, r);
            const hl = isParent(n, r) || isChild(n, r);
            return (
              <g key={`${n}-${r}`}>
                {hl && <circle cx={x} cy={y} r={11} className={isChild(n, r) ? "fill-rose-500/20 stroke-rose-500" : "fill-amber-400/20 stroke-amber-500"} strokeWidth="1" />}
                <text x={x} y={y + 3.5} fontSize={v >= 10 ? "9.5" : "11"} textAnchor="middle" className={hl ? "fill-rose-700 font-semibold dark:fill-rose-300" : "fill-indigo-700 dark:fill-indigo-200"}>
                  {v}
                </text>
              </g>
            );
          })
        )}
        {[0, 1, 2, 3, 4, 5, 6].map((n) => (
          <text key={n} x={W - 6} y={oy + n * dy + 3.5} fontSize="8.5" textAnchor="end" className="fill-slate-500">
            {`row ${n}: ${1 << n}`}
          </text>
        ))}
      </svg>
    </div>
  );
}
