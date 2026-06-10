/**
 * Least-count of a metre scale — a ruler with centimetre numerals and the ten
 * 1 mm subdivisions between two cm marks called out. Reinforces that the
 * smallest readable division (the least count) of an ordinary metre scale is
 * 1 mm, so a length can be reported honestly only to the millimetre.
 *
 * Server component — static 2-D.
 */
export default function UmdLeastCountRuler() {
  const ox = 40; // left edge of ruler
  const oy = 60; // top edge of ruler body
  const rulerW = 480;
  const rulerH = 56;
  const cmCount = 6; // show 0..6 cm
  const cmGap = rulerW / cmCount;

  const ticks = [];
  for (let c = 0; c <= cmCount; c++) {
    const x = ox + c * cmGap;
    // major (cm) tick
    ticks.push(
      <line
        key={`cm-${c}`}
        x1={x}
        y1={oy}
        x2={x}
        y2={oy + 26}
        className="stroke-slate-600 dark:stroke-slate-300"
        strokeWidth="1.6"
      />,
    );
    ticks.push(
      <text
        key={`cml-${c}`}
        x={x}
        y={oy + 42}
        textAnchor="middle"
        fontSize="12"
        className="fill-slate-600 dark:fill-slate-300"
      >
        {c}
      </text>,
    );
    // minor (mm) ticks within this cm interval
    if (c < cmCount) {
      for (let m = 1; m < 10; m++) {
        const mx = x + (m * cmGap) / 10;
        const tall = m === 5;
        ticks.push(
          <line
            key={`mm-${c}-${m}`}
            x1={mx}
            y1={oy}
            x2={mx}
            y2={oy + (tall ? 18 : 11)}
            className="stroke-slate-400 dark:stroke-slate-500"
            strokeWidth="1"
          />,
        );
      }
    }
  }

  // highlight the 1 mm gap between the 2nd and 3rd mm mark of the 2cm..3cm span
  const hiCmStart = ox + 2 * cmGap;
  const g1 = hiCmStart + (2 * cmGap) / 10;
  const g2 = hiCmStart + (3 * cmGap) / 10;

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 150"
        className="w-full"
        role="img"
        aria-label="A metre-scale ruler showing centimetre numbers and ten one-millimetre subdivisions between cm marks; one 1 mm gap is highlighted as the least count"
      >
        {/* ruler body */}
        <rect
          x={ox}
          y={oy}
          width={rulerW}
          height={rulerH}
          rx="4"
          className="fill-amber-50 stroke-slate-400 dark:fill-amber-100/10 dark:stroke-slate-500"
          strokeWidth="1.2"
        />
        {ticks}

        {/* cm label */}
        <text x={ox + rulerW + 8} y={oy + 42} fontSize="12" className="fill-slate-600 dark:fill-slate-300">cm</text>

        {/* highlighted 1 mm least-count gap */}
        <rect
          x={g1}
          y={oy - 4}
          width={g2 - g1}
          height={rulerH + 8}
          className="fill-indigo-400/30 stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="1.3"
        />
        <line
          x1={g1}
          y1={oy + rulerH + 18}
          x2={g2}
          y2={oy + rulerH + 18}
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="1.5"
        />
        <text
          x={(g1 + g2) / 2}
          y={oy + rulerH + 34}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          className="fill-indigo-700 dark:fill-indigo-300"
        >
          1 mm = least count
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Each centimetre is split into ten 1 mm divisions. The smallest readable
        division — 1 mm — is the least count, so an ordinary metre scale reports
        a length honestly only to the nearest millimetre.
      </p>
    </div>
  );
}
