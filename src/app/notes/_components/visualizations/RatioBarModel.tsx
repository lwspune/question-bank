/**
 * Dividing ₹1,200 in the ratio 2 : 3 : 5, drawn as a bar of ten equal blocks.
 *
 * The bar is the total. It is cut into 2 + 3 + 5 = 10 blocks of ₹120, and each
 * person's share is a run of blocks. It is the worked example of the concept it
 * sits on (AFCAT Ratio, "Dividing a total in a ratio"), so the picture and the
 * arithmetic below it match number for number.
 *
 * Why this concept earns the chapter's only diagram: every share question on
 * the page turns on one idea, the size of one part, and a bar of equal blocks
 * shows that idea at a glance. The chapter's other concepts are manipulations
 * of fractions and have no spatial picture.
 *
 * Server component, static 2-D.
 */
const SHARES = [
  { name: "X", parts: 2, fill: "fill-indigo-500 dark:fill-indigo-400" },
  { name: "Y", parts: 3, fill: "fill-sky-500 dark:fill-sky-400" },
  { name: "Z", parts: 5, fill: "fill-emerald-500 dark:fill-emerald-400" },
];
const PART = 120;

export default function RatioBarModel() {
  const x0 = 30;
  const blockW = 46;
  const barY = 70;
  const barH = 44;
  const total = SHARES.reduce((s, r) => s + r.parts, 0);
  const x1 = x0 + total * blockW;

  let cursor = 0;
  const runs = SHARES.map((s) => {
    const start = cursor;
    cursor += s.parts;
    return { ...s, start };
  });

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 190"
        className="w-full"
        role="img"
        aria-label="A bar standing for 1,200 rupees, cut into ten equal blocks of 120 rupees each. The first two blocks are X's share of 240 rupees, the next three are Y's share of 360 rupees, and the last five are Z's share of 600 rupees."
      >
        {/* total, above the bar */}
        <line x1={x0} y1={40} x2={x1} y2={40} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={x0} y1={34} x2={x0} y2={46} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <line x1={x1} y1={34} x2={x1} y2={46} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
        <text x={(x0 + x1) / 2} y={30} textAnchor="middle" fontSize="13" className="fill-slate-700 dark:fill-slate-200">
          Total ₹1,200 = 10 equal parts
        </text>

        {/* the blocks */}
        {runs.flatMap((r) =>
          Array.from({ length: r.parts }, (_, i) => (
            <g key={`${r.name}-${i}`}>
              <rect
                x={x0 + (r.start + i) * blockW}
                y={barY}
                width={blockW}
                height={barH}
                className={`${r.fill} stroke-white dark:stroke-slate-900`}
                strokeWidth="2"
                fillOpacity="0.85"
              />
              <text
                x={x0 + (r.start + i + 0.5) * blockW}
                y={barY + barH / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                className="fill-white"
              >
                ₹{PART}
              </text>
            </g>
          ))
        )}

        {/* each share, below the bar */}
        {runs.map((r) => {
          const a = x0 + r.start * blockW + 3;
          const b = x0 + (r.start + r.parts) * blockW - 3;
          return (
            <g key={`brace-${r.name}`}>
              <line x1={a} y1={barY + barH + 14} x2={b} y2={barY + barH + 14} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.4" />
              <text x={(a + b) / 2} y={barY + barH + 34} textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200">
                {r.name}: {r.parts} parts
              </text>
              <text x={(a + b) / 2} y={barY + barH + 52} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-slate-900 dark:fill-slate-50">
                ₹{(r.parts * PART).toLocaleString("en-IN")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
