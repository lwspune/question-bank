/**
 * Unit-digit cycle wheel — the powers of 7 laid out as a closed 4-step loop
 * (7 -> 9 -> 3 -> 1 -> back to 7), with each node labelled by the exponent's
 * remainder on division by 4.
 *
 * Why this concept gets a diagram when almost nothing else in Number System
 * does: the teaching point is that the exponent WRAPS, and the single mistake
 * students make is sending a multiple of 4 to the first node instead of the
 * last one. A loop drawn as a loop makes "remainder 0 means you finished the
 * lap" visible in a way a row of four table cells does not.
 *
 * Server component — static 2-D, no interaction (the cross-section is the
 * clearer object here; there is nothing to rotate).
 */
export default function CdsUnitDigitCycleWheel() {
  const cx = 200;
  const cy = 150;
  const r = 92;

  // 7^1=7, 7^2=9, 7^3=3, 7^4=1 — clockwise from the top.
  const nodes = [
    { digit: "7", exp: "7¹", rem: "n ≡ 1", angle: -90 },
    { digit: "9", exp: "7²", rem: "n ≡ 2", angle: 0 },
    { digit: "3", exp: "7³", rem: "n ≡ 3", angle: 90 },
    { digit: "1", exp: "7⁴", rem: "n ≡ 0", angle: 180 },
  ];

  const pt = (angleDeg: number, radius: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  };

  // Arc from one node to the next, drawn just inside the node circles.
  const arcs = nodes.map((n, i) => {
    const next = nodes[(i + 1) % nodes.length];
    const from = pt(n.angle + 20, r);
    const to = pt(next.angle - 20, r);
    return (
      <path
        key={`arc-${i}`}
        d={`M ${from.x} ${from.y} A ${r} ${r} 0 0 1 ${to.x} ${to.y}`}
        className="stroke-indigo-500 dark:stroke-indigo-400"
        strokeWidth="1.8"
        fill="none"
        markerEnd="url(#cds-udw-arrow)"
      />
    );
  });

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 400 300"
        className="w-full"
        role="img"
        aria-label="The unit digits of powers of 7 drawn as a closed four-step loop: 7 to 9 to 3 to 1 and back to 7. Each node is labelled with the exponent's remainder on division by 4, with the fourth node labelled remainder 0."
      >
        <defs>
          <marker
            id="cds-udw-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-indigo-500 dark:fill-indigo-400" />
          </marker>
        </defs>

        {arcs}

        {nodes.map((n) => {
          const p = pt(n.angle, r);
          const isWrap = n.rem === "n ≡ 0";
          return (
            <g key={n.digit}>
              <circle
                cx={p.x}
                cy={p.y}
                r="27"
                className={
                  isWrap
                    ? "fill-amber-200 stroke-amber-600 dark:fill-amber-900/60 dark:stroke-amber-400"
                    : "fill-white stroke-indigo-600 dark:fill-slate-900 dark:stroke-indigo-400"
                }
                strokeWidth="1.8"
              />
              <text
                x={p.x}
                y={p.y + 7}
                textAnchor="middle"
                fontSize="20"
                fontWeight="700"
                className="fill-slate-800 dark:fill-slate-100"
              >
                {n.digit}
              </text>
              <text
                x={pt(n.angle, r + 46).x}
                y={pt(n.angle, r + 46).y - 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                className="fill-indigo-700 dark:fill-indigo-300"
              >
                {n.exp}
              </text>
              <text
                x={pt(n.angle, r + 46).x}
                y={pt(n.angle, r + 46).y + 11}
                textAnchor="middle"
                fontSize="11"
                className={
                  isWrap
                    ? "fill-amber-700 dark:fill-amber-300"
                    : "fill-slate-500 dark:fill-slate-400"
                }
              >
                {n.rem}
              </text>
            </g>
          );
        })}

        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          className="fill-slate-600 dark:fill-slate-300"
        >
          cycle length 4
        </text>
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          fontSize="12"
          className="fill-slate-500 dark:fill-slate-400"
        >
          multiply by 7
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The unit digit of <span className="font-semibold">7ⁿ</span> depends only on{" "}
        <span className="font-semibold">n mod 4</span>. The amber node is the trap: a
        remainder of <span className="font-semibold">0</span> means the lap just{" "}
        <em>finished</em>, so 7⁴, 7⁸, 7³² all land on{" "}
        <span className="font-semibold">1</span> — the last node, never the first.
      </p>
    </div>
  );
}
