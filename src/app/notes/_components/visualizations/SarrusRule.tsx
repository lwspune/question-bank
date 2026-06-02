/**
 * Sarrus' rule for a 3×3 determinant: copy the first two columns to the right,
 * then add the three down-right diagonal products and subtract the three
 * down-left ones. A genuinely visual computational mnemonic (3×3 only).
 * Static server-component SVG.
 */
export default function SarrusRule() {
  const width = 540;
  const height = 260;
  const cell = 58;
  const ox = 40;
  const oy = 70;

  // 3×3 grid with columns 1,2 repeated → 5 columns of labels
  const labels = [
    ["a", "b", "c", "a", "b"],
    ["d", "e", "f", "d", "e"],
    ["g", "h", "i", "g", "h"],
  ];
  const cx = (j: number) => ox + j * cell + cell / 2;
  const cy = (i: number) => oy + i * cell + cell / 2;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Sarrus rule: down-right diagonals added, down-left diagonals subtracted">
        <text x={width / 2} y={24} className="fill-indigo-900 dark:fill-indigo-100" fontSize="14" fontWeight="600" textAnchor="middle">
          Sarrus&apos; rule (3×3): copy first two columns, then diagonals
        </text>

        {/* down-right (+) diagonals */}
        {[0, 1, 2].map((k) => (
          <line key={`p${k}`} x1={cx(k)} y1={cy(0)} x2={cx(k + 2)} y2={cy(2)} className="stroke-emerald-500/70" strokeWidth="2" />
        ))}
        {/* down-left (−) diagonals */}
        {[2, 3, 4].map((k) => (
          <line key={`m${k}`} x1={cx(k)} y1={cy(0)} x2={cx(k - 2)} y2={cy(2)} className="stroke-rose-500/70" strokeWidth="2" strokeDasharray="5 3" />
        ))}

        {/* entries */}
        {labels.map((row, i) =>
          row.map((ch, j) => (
            <text
              key={`${i}-${j}`}
              x={cx(j)}
              y={cy(i) + 6}
              className={j < 3 ? "fill-indigo-900 dark:fill-indigo-100" : "fill-indigo-400/70 dark:fill-indigo-500/70"}
              fontSize="20"
              fontWeight="700"
              textAnchor="middle"
            >
              {ch}
            </text>
          ))
        )}
        {/* divider after the original 3 columns */}
        <line x1={ox + 3 * cell} y1={oy - 6} x2={ox + 3 * cell} y2={oy + 3 * cell + 6} className="stroke-indigo-300 dark:stroke-indigo-700" strokeWidth="1" strokeDasharray="2 3" />

        <text x={width / 2} y={height - 24} className="fill-emerald-700 dark:fill-emerald-300" fontSize="12" textAnchor="middle" fontWeight="600">
          + (aei + bfg + cdh)
        </text>
        <text x={width / 2} y={height - 8} className="fill-rose-700 dark:fill-rose-300" fontSize="12" textAnchor="middle" fontWeight="600">
          − (ceg + afh + bdi)
        </text>
      </svg>
    </div>
  );
}
