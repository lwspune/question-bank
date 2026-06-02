/**
 * The cofactor sign checkerboard: the sign attached to minor M(i,j) is
 * (−1)^(i+j), giving the +/− pattern that starts with + in the top-left.
 * A pure notation aid (genuinely visual), static server-component SVG.
 */
export default function CofactorSignGrid() {
  const width = 320;
  const height = 280;
  const cell = 64;
  const ox = (width - 3 * cell) / 2;
  const oy = 56;

  const signs = [
    ["+", "−", "+"],
    ["−", "+", "−"],
    ["+", "−", "+"],
  ];

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="The 3x3 cofactor sign checkerboard, plus minus plus on the top row">
        <text x={width / 2} y={26} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          Cofactor signs: (−1)^(i+j)
        </text>

        {signs.map((row, i) =>
          row.map((sgn, j) => {
            const x = ox + j * cell;
            const y = oy + i * cell;
            const positive = sgn === "+";
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  className={
                    positive
                      ? "fill-emerald-400/20 stroke-indigo-400/50"
                      : "fill-rose-400/20 stroke-indigo-400/50"
                  }
                  strokeWidth="1"
                />
                <text
                  x={x + cell / 2}
                  y={y + cell / 2 + 9}
                  className={positive ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}
                  fontSize="26"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {sgn}
                </text>
              </g>
            );
          })
        )}

        <text x={width / 2} y={height - 8} className="fill-indigo-700 dark:fill-indigo-300" fontSize="11" textAnchor="middle">
          Cofactor Cᵢⱼ = (sign) × minor Mᵢⱼ. Top-left is always +.
        </text>
      </svg>
    </div>
  );
}
