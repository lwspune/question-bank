"use client";

import { useMemo, useState } from "react";

/**
 * Interactive: a fixed 30-value dataset rendered as a histogram whose
 * BIN WIDTH is controlled by a slider. Tightening or relaxing the bin
 * width reshapes the bars live — illustrating that the histogram is a
 * CHOICE, not an intrinsic property of the data.
 *
 * Pedagogical aim: the histogram you see depends on how you bin. Two
 * different bin widths on the same data can suggest two different shapes.
 */

// Roughly bell-shaped sample data over [0, 100].
const DATA = [
  12, 18, 22, 25, 27, 30, 31, 33, 35, 38, 40, 42, 43, 45, 47, 50, 52, 55, 58, 60,
  62, 65, 67, 70, 72, 75, 78, 82, 85, 90,
];

const BIN_WIDTHS = [5, 10, 15, 20, 25, 50] as const;
const DATA_MIN = 0;
const DATA_MAX = 100;

const W = 360;
const H = 240;
const PAD_L = 32;
const PAD_R = 12;
const PAD_T = 14;
const PAD_B = 30;

function binData(width: number) {
  const nBins = Math.ceil((DATA_MAX - DATA_MIN) / width);
  const counts = new Array<number>(nBins).fill(0);
  for (const v of DATA) {
    const idx = Math.min(nBins - 1, Math.floor((v - DATA_MIN) / width));
    counts[idx] += 1;
  }
  return counts;
}

export default function HistogramBinSlider() {
  const [binWidth, setBinWidth] = useState<number>(10);
  const counts = useMemo(() => binData(binWidth), [binWidth]);
  const maxCount = Math.max(...counts, 1);

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · change the bin width, watch the shape change
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="Histogram bin-width slider visualization"
      >
        {/* Y-axis */}
        <line
          x1={PAD_L}
          x2={PAD_L}
          y1={PAD_T}
          y2={H - PAD_B}
          stroke="currentColor"
          className="text-muted-foreground/40"
        />
        {/* X-axis */}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={H - PAD_B}
          y2={H - PAD_B}
          stroke="currentColor"
          className="text-muted-foreground/40"
        />
        {/* Y ticks (max + half) */}
        {[Math.ceil(maxCount / 2), maxCount].map((t) => {
          const y = PAD_T + (1 - t / maxCount) * innerH;
          return (
            <g key={`yt-${t}`}>
              <line
                x1={PAD_L - 4}
                x2={PAD_L}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-muted-foreground/40"
              />
              <text
                x={PAD_L - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-muted-foreground text-[10px]"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {counts.map((c, i) => {
          const binStart = DATA_MIN + i * binWidth;
          const binEnd = Math.min(DATA_MAX, binStart + binWidth);
          const barX = PAD_L + ((binStart - DATA_MIN) / (DATA_MAX - DATA_MIN)) * innerW;
          const barW =
            ((binEnd - binStart) / (DATA_MAX - DATA_MIN)) * innerW - 2;
          const barH = (c / maxCount) * innerH;
          const barY = H - PAD_B - barH;
          return (
            <g key={`bar-${i}`}>
              <rect
                x={barX + 1}
                y={barY}
                width={Math.max(0, barW)}
                height={barH}
                className="fill-indigo-600/80 dark:fill-indigo-400/80"
              />
              {c > 0 && (
                <text
                  x={barX + 1 + barW / 2}
                  y={barY - 3}
                  textAnchor="middle"
                  className="fill-foreground text-[10px] font-medium"
                >
                  {c}
                </text>
              )}
            </g>
          );
        })}

        {/* X tick labels */}
        {[0, 25, 50, 75, 100].map((t) => {
          const x = PAD_L + ((t - DATA_MIN) / (DATA_MAX - DATA_MIN)) * innerW;
          return (
            <g key={`xt-${t}`}>
              <line
                x1={x}
                x2={x}
                y1={H - PAD_B}
                y2={H - PAD_B + 4}
                stroke="currentColor"
                className="text-muted-foreground/40"
              />
              <text
                x={x}
                y={H - PAD_B + 16}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {t}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-foreground">Bin width:</span>
        {BIN_WIDTHS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setBinWidth(w)}
            className={
              "rounded-md px-2.5 py-1 font-medium tabular-nums transition-colors " +
              (binWidth === w
                ? "bg-indigo-600 text-white dark:bg-indigo-500"
                : "border border-input bg-background text-foreground hover:bg-accent")
            }
            aria-pressed={binWidth === w}
          >
            {w}
          </button>
        ))}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Same 30 data points each time — only the bin width changes. At width 50
        the shape looks almost uniform; at width 5 it looks jagged. Choosing
        bin width is part of the analysis, not the data.
      </p>
    </div>
  );
}
