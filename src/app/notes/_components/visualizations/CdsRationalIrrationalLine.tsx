/**
 * Rational vs irrational on the number line, drawn as a zoom.
 *
 * Top rail: the interval 1 to 2 with a few rationals marked and the position of
 * root 2 shown. Bottom rail: the same picture magnified to 1.41-1.42, where the
 * decimal approximations 1.414, 1.4142, 1.41421 crowd in from the left and
 * right without ever landing on the point.
 *
 * Why this concept earns the chapter's only other diagram: the examinable fact
 * is that a rational number's decimal expansion terminates or recurs while an
 * irrational's does neither, and the reason is spatial — you can bracket an
 * irrational as tightly as you like with fractions and still never reach it.
 * A table of examples states that; a zoom shows it.
 *
 * Server component — static 2-D.
 */
export default function CdsRationalIrrationalLine() {
  const x0 = 50;
  const x1 = 470;
  const span = x1 - x0;

  // --- top rail: 1 .. 2 ---
  const topY = 62;
  const toTop = (v: number) => x0 + (v - 1) * span; // 1 -> x0, 2 -> x1
  const SQRT2 = Math.SQRT2; // 1.41421356...

  const topTicks = [
    { v: 1, label: "1" },
    { v: 1.25, label: "5/4" },
    { v: 1.5, label: "3/2" },
    { v: 1.75, label: "7/4" },
    { v: 2, label: "2" },
  ];

  // --- bottom rail: 1.41 .. 1.42 ---
  const botY = 186;
  const lo = 1.41;
  const hi = 1.42;
  const toBot = (v: number) => x0 + ((v - lo) / (hi - lo)) * span;

  const botTicks = [
    { v: 1.41, label: "1.41" },
    { v: 1.414, label: "1.414" },
    { v: 1.4142, label: "1.4142" },
    { v: 1.42, label: "1.42" },
  ];

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 250"
        className="w-full"
        role="img"
        aria-label="Two number lines. The upper line runs from 1 to 2 with the fractions five quarters, three halves and seven quarters marked, and the position of root 2 shown between 1.41 and 1.42. The lower line magnifies that region, showing the decimals 1.414 and 1.4142 approaching root 2 from the left without reaching it."
      >
        {/* ---------- top rail ---------- */}
        <line
          x1={x0}
          y1={topY}
          x2={x1}
          y2={topY}
          className="stroke-slate-500 dark:stroke-slate-300"
          strokeWidth="1.6"
        />
        {topTicks.map((t) => (
          <g key={`t-${t.v}`}>
            <line
              x1={toTop(t.v)}
              y1={topY - 7}
              x2={toTop(t.v)}
              y2={topY + 7}
              className="stroke-indigo-600 dark:stroke-indigo-400"
              strokeWidth="1.5"
            />
            <circle cx={toTop(t.v)} cy={topY} r="3.4" className="fill-indigo-600 dark:fill-indigo-400" />
            <text
              x={toTop(t.v)}
              y={topY + 24}
              textAnchor="middle"
              fontSize="11"
              className="fill-indigo-700 dark:fill-indigo-300"
            >
              {t.label}
            </text>
          </g>
        ))}
        {/* root 2 on the top rail */}
        <circle cx={toTop(SQRT2)} cy={topY} r="4.6" className="fill-amber-500 stroke-amber-700 dark:stroke-amber-300" strokeWidth="1.2" />
        <text
          x={toTop(SQRT2)}
          y={topY - 16}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          className="fill-amber-700 dark:fill-amber-300"
        >
          &#8730;2
        </text>
        <text x={x0 - 8} y={topY + 4} textAnchor="end" fontSize="11" className="fill-slate-500 dark:fill-slate-400">
          rationals
        </text>

        {/* ---------- zoom bracket ---------- */}
        <path
          d={`M ${toTop(1.41)} ${topY + 30} L ${toTop(1.42)} ${topY + 30} L ${x1} ${botY - 44} L ${x0} ${botY - 44} Z`}
          className="fill-amber-200/30 stroke-amber-500/70 dark:fill-amber-900/20 dark:stroke-amber-500/60"
          strokeWidth="1"
        />
        <text
          x={(x0 + x1) / 2}
          y={botY - 52}
          textAnchor="middle"
          fontSize="11"
          fontStyle="italic"
          className="fill-slate-500 dark:fill-slate-400"
        >
          magnify the gap between 1.41 and 1.42
        </text>

        {/* ---------- bottom rail ---------- */}
        <line
          x1={x0}
          y1={botY}
          x2={x1}
          y2={botY}
          className="stroke-slate-500 dark:stroke-slate-300"
          strokeWidth="1.6"
        />
        {botTicks.map((t) => (
          <g key={`b-${t.v}`}>
            <line
              x1={toBot(t.v)}
              y1={botY - 6}
              x2={toBot(t.v)}
              y2={botY + 6}
              className="stroke-indigo-600 dark:stroke-indigo-400"
              strokeWidth="1.4"
            />
            <circle cx={toBot(t.v)} cy={botY} r="3.2" className="fill-indigo-600 dark:fill-indigo-400" />
            <text
              x={toBot(t.v)}
              y={botY + 22}
              textAnchor="middle"
              fontSize="10.5"
              className="fill-indigo-700 dark:fill-indigo-300"
            >
              {t.label}
            </text>
          </g>
        ))}
        {/* root 2 on the bottom rail */}
        <circle cx={toBot(SQRT2)} cy={botY} r="4.6" className="fill-amber-500 stroke-amber-700 dark:stroke-amber-300" strokeWidth="1.2" />
        <text
          x={toBot(SQRT2)}
          y={botY - 14}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          className="fill-amber-700 dark:fill-amber-300"
        >
          &#8730;2
        </text>
        <text
          x={toBot(SQRT2)}
          y={botY + 40}
          textAnchor="middle"
          fontSize="10.5"
          className="fill-amber-700 dark:fill-amber-300"
        >
          1.41421356&#8230; never terminates, never repeats
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Zoom as far as you like: the decimals bracket{" "}
        <span className="font-semibold">&#8730;2</span> ever more tightly and never
        land on it. That is the whole difference — a{" "}
        <span className="font-semibold">rational</span> number&apos;s expansion
        terminates or recurs, so it is reachable; an{" "}
        <span className="font-semibold">irrational</span> number&apos;s does
        neither.
      </p>
    </div>
  );
}
