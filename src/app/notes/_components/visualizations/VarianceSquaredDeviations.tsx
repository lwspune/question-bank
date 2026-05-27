"use client";

import { useMemo, useState } from "react";

/**
 * Interactive: 5 sliders place 5 data points on a number line. Live
 * computation of mean, deviations, squared deviations, and variance —
 * with a square of side |x_i − mean| drawn above each point so the
 * student SEES "variance = average area of these squares".
 *
 * Pedagogical aim: turn the variance formula from a symbolic ritual
 * into an area you can spread or shrink by moving the points around.
 */

const INITIAL_VALUES = [2, 4, 6, 8, 10];
const X_MIN = 0;
const X_MAX = 20;

const W = 360;
const H = 240;
const PAD_L = 20;
const PAD_R = 20;
const BASELINE_Y = 200; // number line y

function xToSvg(x: number) {
  return PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - PAD_L - PAD_R);
}

// One svg-pixel per data unit for the "side" of the squared-deviation box.
// (Scaled so the largest square fits above the number line in the H above.)
const SIDE_PX_PER_UNIT = 14;

export default function VarianceSquaredDeviations() {
  const [values, setValues] = useState<number[]>(INITIAL_VALUES);

  const { mean, deviations, squared, variance, sd } = useMemo(() => {
    const n = values.length;
    const mean = values.reduce((a, v) => a + v, 0) / n;
    const deviations = values.map((v) => v - mean);
    const squared = deviations.map((d) => d * d);
    const variance = squared.reduce((a, s) => a + s, 0) / n;
    const sd = Math.sqrt(variance);
    return { mean, deviations, squared, variance, sd };
  }, [values]);

  const setValueAt = (i: number, v: number) =>
    setValues((prev) => prev.map((x, j) => (j === i ? v : x)));

  const meanX = xToSvg(mean);

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/60 dark:bg-emerald-950/15 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        Visualization · move the points, watch the squared deviations
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Variance as average squared deviation"
      >
        {/* Number line */}
        <line
          x1={xToSvg(X_MIN)}
          x2={xToSvg(X_MAX)}
          y1={BASELINE_Y}
          y2={BASELINE_Y}
          stroke="currentColor"
          className="text-muted-foreground/50"
          strokeWidth={1.5}
        />
        {/* Number-line ticks */}
        {[0, 5, 10, 15, 20].map((t) => (
          <g key={`nt-${t}`}>
            <line
              x1={xToSvg(t)}
              x2={xToSvg(t)}
              y1={BASELINE_Y}
              y2={BASELINE_Y + 5}
              stroke="currentColor"
              className="text-muted-foreground/50"
            />
            <text
              x={xToSvg(t)}
              y={BASELINE_Y + 18}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Squared-deviation boxes (drawn first so points sit on top) */}
        {values.map((v, i) => {
          const side = Math.abs(deviations[i]) * SIDE_PX_PER_UNIT;
          if (side < 1) return null;
          const cx = xToSvg(v);
          return (
            <rect
              key={`box-${i}`}
              x={cx - side / 2}
              y={BASELINE_Y - side}
              width={side}
              height={side}
              className="fill-rose-500/15 stroke-rose-500/70"
              strokeWidth={1}
            />
          );
        })}

        {/* Mean line */}
        <line
          x1={meanX}
          x2={meanX}
          y1={BASELINE_Y - 110}
          y2={BASELINE_Y + 10}
          stroke="currentColor"
          className="text-indigo-600 dark:text-indigo-400"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
        <text
          x={meanX}
          y={BASELINE_Y - 116}
          textAnchor="middle"
          className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold"
        >
          mean = {mean.toFixed(2)}
        </text>

        {/* Data points */}
        {values.map((v, i) => (
          <circle
            key={`pt-${i}`}
            cx={xToSvg(v)}
            cy={BASELINE_Y}
            r={5}
            className="fill-sky-600 dark:fill-sky-400"
          />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {values.map((v, i) => (
          <label key={i} className="flex flex-col gap-1">
            <span className="font-medium text-foreground">
              x{i + 1}: <span className="tabular-nums">{v.toFixed(1)}</span>
            </span>
            <input
              type="range"
              min={X_MIN}
              max={X_MAX}
              step={0.5}
              value={v}
              onChange={(e) => setValueAt(i, Number(e.target.value))}
              className="accent-rose-600"
              aria-label={`Data point ${i + 1}`}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          Variance σ² = <span className="tabular-nums">{variance.toFixed(2)}</span>
        </span>
        <span className="text-muted-foreground">
          SD σ = <span className="tabular-nums">{sd.toFixed(2)}</span>
        </span>
        <span className="text-muted-foreground">
          Σ(xᵢ − x̄)² = <span className="tabular-nums">{squared.reduce((a, s) => a + s, 0).toFixed(2)}</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Each red square has side <span className="font-medium">|xᵢ − x̄|</span>, so its
        AREA is the squared deviation. Variance is the AVERAGE area. Pull all
        points toward the mean — every square shrinks. Pull them apart — they grow.
      </p>
    </div>
  );
}
