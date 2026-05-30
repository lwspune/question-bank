/**
 * Static figure: the family of antiderivatives of f(x) = x.
 *
 * Every curve y = x²/2 + C is a vertical shift of the others — same slope at
 * each x, differing only by the constant C. This is the picture behind the
 * "+ C": indefinite integration recovers a whole FAMILY of curves, not one.
 *
 * Server component — no interactivity, pure SVG.
 */

const W = 360;
const H = 260;
const PAD = 28;

// Plot window: x ∈ [-3, 3], y ∈ [-2, 8].
const X_MIN = -3;
const X_MAX = 3;
const Y_MIN = -2;
const Y_MAX = 8;

function xToSvg(x: number) {
  return PAD + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
}
function yToSvg(y: number) {
  // SVG y grows downward — invert.
  return H - PAD - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - 2 * PAD);
}

// The constants whose curves we draw.
const CONSTANTS = [-1, 0, 1, 2, 3];

function curvePath(c: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = X_MIN + (i / 60) * (X_MAX - X_MIN);
    const y = (x * x) / 2 + c;
    if (y < Y_MIN - 1 || y > Y_MAX + 1) continue;
    pts.push(`${xToSvg(x).toFixed(1)},${yToSvg(y).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

// Tangent slope at x = 1 is f(1) = 1 for every curve — draw a short matching
// tangent segment on each curve at x = 1 to show "same slope, different curve".
const TANGENT_X = 1;
function tangentSegment(c: number) {
  const y0 = (TANGENT_X * TANGENT_X) / 2 + c; // curve value at x=1
  const slope = TANGENT_X; // f(1) = 1
  const dx = 0.7;
  const x1 = TANGENT_X - dx;
  const x2 = TANGENT_X + dx;
  const y1 = y0 - slope * dx;
  const y2 = y0 + slope * dx;
  return {
    x1: xToSvg(x1),
    y1: yToSvg(y1),
    x2: xToSvg(x2),
    y2: yToSvg(y2),
    dotX: xToSvg(TANGENT_X),
    dotY: yToSvg(y0),
  };
}

export default function AntiderivativeFamily() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the +C family of antiderivatives
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="A family of parabolas y = x squared over 2 plus C, each a vertical shift of the others, all sharing the same slope at x = 1"
      >
        {/* Axes */}
        <line
          x1={xToSvg(X_MIN)}
          x2={xToSvg(X_MAX)}
          y1={yToSvg(0)}
          y2={yToSvg(0)}
          stroke="currentColor"
          className="text-muted-foreground/50"
          strokeWidth={1.5}
        />
        <line
          x1={xToSvg(0)}
          x2={xToSvg(0)}
          y1={yToSvg(Y_MIN)}
          y2={yToSvg(Y_MAX)}
          stroke="currentColor"
          className="text-muted-foreground/50"
          strokeWidth={1.5}
        />
        <text
          x={xToSvg(X_MAX) - 4}
          y={yToSvg(0) - 6}
          textAnchor="end"
          className="fill-muted-foreground text-[10px]"
        >
          x
        </text>
        <text
          x={xToSvg(0) + 6}
          y={yToSvg(Y_MAX) + 4}
          className="fill-muted-foreground text-[10px]"
        >
          y
        </text>

        {/* The curves */}
        {CONSTANTS.map((c, i) => (
          <path
            key={`curve-${c}`}
            d={curvePath(c)}
            fill="none"
            stroke="currentColor"
            className={
              c === 0
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-sky-500/60 dark:text-sky-400/50"
            }
            strokeWidth={c === 0 ? 2.4 : 1.6}
          />
        ))}

        {/* Tangent segments at x = 1 — all parallel (slope = f(1) = 1) */}
        {CONSTANTS.map((c) => {
          const t = tangentSegment(c);
          return (
            <g key={`tan-${c}`}>
              <line
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                className="text-rose-500/80"
                strokeWidth={1.4}
              />
              <circle
                cx={t.dotX}
                cy={t.dotY}
                r={2.6}
                className="fill-rose-500"
              />
            </g>
          );
        })}

        {/* Label the middle curve */}
        <text
          x={xToSvg(-2.4)}
          y={yToSvg((-2.4 * -2.4) / 2 + 0) - 6}
          className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold"
        >
          y = x²/2 + C
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Every curve is an antiderivative of <span className="font-medium">f(x) = x</span>.
        They differ only by the constant <span className="font-medium">C</span> — a
        vertical shift. At <span className="font-medium">x = 1</span> the red tangents
        are all parallel (slope = <span className="font-medium">f(1) = 1</span>): same
        derivative, infinitely many curves. That is why every indefinite integral
        carries a <span className="font-medium">+ C</span>.
      </p>
    </div>
  );
}
