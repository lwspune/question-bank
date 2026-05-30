/**
 * Horizontal frequency-band strip showing the three named ranges:
 * infrasonic (< 20 Hz), audible (20 Hz – 20 kHz), ultrasonic (> 20 kHz).
 * Log-axis layout so the 20 Hz and 20 kHz boundaries are visually
 * well-spaced rather than crushed at the left end.
 *
 * Server component — static; no animation needed for a band reference.
 */
export default function FrequencySpectrumStrip() {
  const width = 600;
  const height = 200;
  const margin = 40;
  const usable = width - 2 * margin;
  const stripY = 70;
  const stripH = 50;

  // Log axis: map [1 Hz, 1 MHz] linearly to [0, usable].
  // log10(1) = 0; log10(1e6) = 6.
  const logMin = 0;
  const logMax = 6;
  const xAt = (hz: number) =>
    margin + ((Math.log10(hz) - logMin) / (logMax - logMin)) * usable;

  const x20 = xAt(20);
  const x20k = xAt(20000);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Frequency spectrum showing infrasonic below 20 Hz, audible 20 Hz to 20 kHz, and ultrasonic above 20 kHz"
      >
        <text
          x={width / 2}
          y={22}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Frequency bands (log scale)
        </text>

        {/* Infrasonic band */}
        <rect
          x={margin}
          y={stripY}
          width={x20 - margin}
          height={stripH}
          className="fill-sky-200/70 dark:fill-sky-800/40"
        />
        {/* Audible band */}
        <rect
          x={x20}
          y={stripY}
          width={x20k - x20}
          height={stripH}
          className="fill-emerald-200/70 dark:fill-emerald-800/40"
        />
        {/* Ultrasonic band */}
        <rect
          x={x20k}
          y={stripY}
          width={width - margin - x20k}
          height={stripH}
          className="fill-rose-200/70 dark:fill-rose-800/40"
        />

        {/* Band borders */}
        <line
          x1={x20}
          y1={stripY - 5}
          x2={x20}
          y2={stripY + stripH + 5}
          className="stroke-indigo-700 dark:stroke-indigo-200"
          strokeWidth="1.5"
        />
        <line
          x1={x20k}
          y1={stripY - 5}
          x2={x20k}
          y2={stripY + stripH + 5}
          className="stroke-indigo-700 dark:stroke-indigo-200"
          strokeWidth="1.5"
        />

        {/* Band labels */}
        <text
          x={(margin + x20) / 2}
          y={stripY + stripH / 2 + 4}
          className="fill-sky-900 dark:fill-sky-100"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          infrasonic
        </text>
        <text
          x={(x20 + x20k) / 2}
          y={stripY + stripH / 2 + 4}
          className="fill-emerald-900 dark:fill-emerald-100"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
        >
          audible
        </text>
        <text
          x={(x20k + width - margin) / 2}
          y={stripY + stripH / 2 + 4}
          className="fill-rose-900 dark:fill-rose-100"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          ultrasonic
        </text>

        {/* Boundary numbers */}
        <text
          x={x20}
          y={stripY + stripH + 22}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
        >
          20 Hz
        </text>
        <text
          x={x20k}
          y={stripY + stripH + 22}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
        >
          20 kHz
        </text>

        {/* Examples beneath */}
        <text
          x={(margin + x20) / 2}
          y={stripY + stripH + 38}
          className="fill-sky-700 dark:fill-sky-300"
          fontSize="9"
          textAnchor="middle"
        >
          whales, earthquakes
        </text>
        <text
          x={(x20 + x20k) / 2}
          y={stripY + stripH + 38}
          className="fill-emerald-700 dark:fill-emerald-300"
          fontSize="9"
          textAnchor="middle"
        >
          human hearing
        </text>
        <text
          x={(x20k + width - margin) / 2}
          y={stripY + stripH + 38}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="9"
          textAnchor="middle"
        >
          bats, SONAR, sonography
        </text>

        {/* Axis */}
        <text
          x={width / 2}
          y={height - 10}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="11"
          textAnchor="middle"
        >
          The two endpoints — 20 Hz and 20 kHz — are the most-tested numbers in the chapter.
        </text>
      </svg>
    </div>
  );
}
