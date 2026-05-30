/**
 * Beats — two sinusoids of close but unequal frequency superpose into a
 * wave whose amplitude is slowly modulated (the envelope). Drawing the
 * two components lightly + the sum heavily makes the beat phenomenon
 * visually obvious: where the two are in phase, the sum is large; where
 * they are out of phase, the sum near-cancels.
 *
 * Server component — static snapshot is clearest for the recall concept
 * (no need to animate; the envelope is what students need to see).
 */
export default function BeatsEnvelope() {
  const width = 600;
  const height = 240;
  const margin = 30;
  const usable = width - 2 * margin;
  const midY = 130;

  // Two frequencies — chosen so 9 cycles vs 10 cycles fit across the
  // panel. That gives one full envelope (one node + one antinode + one
  // node) clearly visible in the sum.
  const k1 = (2 * Math.PI * 9) / usable;
  const k2 = (2 * Math.PI * 10) / usable;
  const amp = 18;

  const samples = 240;
  const xs = Array.from(
    { length: samples },
    (_, i) => margin + (i / (samples - 1)) * usable
  );

  const wave1 = xs
    .map((x) => `${x},${midY - amp * Math.sin(k1 * (x - margin))}`)
    .join(" ");
  const wave2 = xs
    .map((x) => `${x},${midY - amp * Math.sin(k2 * (x - margin))}`)
    .join(" ");
  const sumTop = xs
    .map(
      (x) =>
        `${x},${
          midY -
          (amp * Math.sin(k1 * (x - margin)) +
            amp * Math.sin(k2 * (x - margin)))
        }`
    )
    .join(" ");

  // Envelope: |A1 + A2 cos((k2 - k1)(x - margin))| but we just trace the
  // analytic envelope ±2A·|cos((Δk/2)(x − m))|.
  const dk = (k2 - k1) / 2;
  const envTop = xs
    .map(
      (x) =>
        `${x},${midY - 2 * amp * Math.abs(Math.cos(dk * (x - margin)))}`
    )
    .join(" ");
  const envBot = xs
    .map(
      (x) =>
        `${x},${midY + 2 * amp * Math.abs(Math.cos(dk * (x - margin)))}`
    )
    .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Two close-frequency sinusoids superposing into a beat pattern with a slow amplitude envelope"
      >
        <text
          x={width / 2}
          y={20}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Beats — two close frequencies superpose
        </text>

        {/* Baseline */}
        <line
          x1={margin}
          y1={midY}
          x2={width - margin}
          y2={midY}
          className="stroke-indigo-300/50"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Component waves — lighter */}
        <polyline
          points={wave1}
          className="fill-none stroke-indigo-400/50 dark:stroke-indigo-500/40"
          strokeWidth="1"
        />
        <polyline
          points={wave2}
          className="fill-none stroke-rose-400/50 dark:stroke-rose-500/40"
          strokeWidth="1"
        />

        {/* Sum wave — heavy */}
        <polyline
          points={sumTop}
          className="fill-none stroke-indigo-700 dark:stroke-indigo-300"
          strokeWidth="2"
        />

        {/* Envelope — dashed */}
        <polyline
          points={envTop}
          className="fill-none stroke-rose-600 dark:stroke-rose-400"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <polyline
          points={envBot}
          className="fill-none stroke-rose-600 dark:stroke-rose-400"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />

        {/* Labels */}
        <text
          x={margin + usable * 0.25}
          y={midY + 70}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          textAnchor="middle"
        >
          loud (in phase)
        </text>
        <text
          x={margin + usable * 0.5}
          y={midY + 70}
          className="fill-sky-700 dark:fill-sky-300"
          fontSize="11"
          textAnchor="middle"
        >
          soft (out of phase)
        </text>
        <text
          x={margin + usable * 0.75}
          y={midY + 70}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          textAnchor="middle"
        >
          loud
        </text>

        <text
          x={width / 2}
          y={height - 5}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="11"
          textAnchor="middle"
        >
          Beat frequency = | f₁ − f₂ | — the rate of the loud/soft pulsing.
        </text>
      </svg>
    </div>
  );
}
