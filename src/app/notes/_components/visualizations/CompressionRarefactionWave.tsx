/**
 * Sound is a longitudinal pressure wave. Static SVG snapshot showing a
 * row of air molecules with their displaced positions (compressions
 * where they bunch, rarefactions where they spread), with the matching
 * pressure curve drawn underneath so students can read "compression =
 * high density = high pressure" top-to-bottom.
 *
 * Server component — no animation needed; one well-labelled snapshot
 * conveys the structure of a longitudinal wave more clearly than a
 * looping animation that students have to chase.
 */
export default function CompressionRarefactionWave() {
  const moleculeCount = 70;
  const width = 600;
  const margin = 30;
  const usable = width - 2 * margin;
  const moleculeY = 110;
  const pressureBaselineY = 220;
  const k = (2 * Math.PI * 2) / usable; // 2 wavelengths fit across
  const amp = 9;
  const pressureAmp = 30;

  // Each molecule's actual position = rest position + displacement.
  // Longitudinal: u(x) = A sin(kx) → particles bunch where strain is most
  // negative (compressions) and spread where strain is most positive.
  const molecules = Array.from({ length: moleculeCount }, (_, i) => {
    const restX = margin + (i / (moleculeCount - 1)) * usable;
    const u = amp * Math.sin(k * (restX - margin));
    return restX + u;
  });

  // Pressure curve: P(x) ∝ −∂u/∂x = −Ak cos(kx). Peaks at compressions,
  // troughs at rarefactions — phase-shifted by π/2 from displacement.
  const pressurePts = Array.from({ length: 120 }, (_, i) => {
    const x = margin + (i / 119) * usable;
    const p = -pressureAmp * Math.cos(k * (x - margin));
    return `${x},${pressureBaselineY - p}`;
  }).join(" ");

  // Compression centers (pressure peaks): cos(k(x − m)) = −1 → k(x − m) = π
  const comp1 = margin + Math.PI / k;
  const comp2 = margin + (3 * Math.PI) / k;
  // Rarefaction center (pressure trough): k(x − m) = 2π
  const rar = margin + (2 * Math.PI) / k;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} 290`}
        className="w-full"
        role="img"
        aria-label="Longitudinal sound wave snapshot — molecules bunching at compressions, spreading at rarefactions, with the pressure curve below"
      >
        <defs>
          <marker
            id="cr-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L0,6 L9,3 z"
              className="fill-indigo-700 dark:fill-indigo-300"
            />
          </marker>
        </defs>

        <text
          x={width / 2}
          y={22}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Longitudinal sound wave
        </text>

        {/* Wave direction arrow */}
        <line
          x1={width - margin - 65}
          y1={45}
          x2={width - margin - 5}
          y2={45}
          className="stroke-indigo-700 dark:stroke-indigo-300"
          strokeWidth="1.5"
          markerEnd="url(#cr-arrow)"
        />
        <text
          x={width - margin - 100}
          y={49}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="11"
          textAnchor="end"
        >
          wave direction
        </text>

        {/* Compression labels */}
        <text
          x={comp1}
          y={75}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
        >
          compression
        </text>
        <text
          x={comp2}
          y={75}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
        >
          compression
        </text>
        <line
          x1={comp1}
          y1={80}
          x2={comp1}
          y2={moleculeY - 14}
          className="stroke-rose-500/70"
          strokeWidth="1"
        />
        <line
          x1={comp2}
          y1={80}
          x2={comp2}
          y2={moleculeY - 14}
          className="stroke-rose-500/70"
          strokeWidth="1"
        />

        {/* Molecules */}
        {molecules.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={moleculeY}
            r={3.5}
            className="fill-indigo-600 dark:fill-indigo-400"
          />
        ))}

        {/* Rarefaction label */}
        <text
          x={rar}
          y={moleculeY + 32}
          className="fill-sky-700 dark:fill-sky-300"
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
        >
          rarefaction
        </text>
        <line
          x1={rar}
          y1={moleculeY + 8}
          x2={rar}
          y2={moleculeY + 22}
          className="stroke-sky-500/70"
          strokeWidth="1"
        />

        {/* Divider */}
        <line
          x1={margin}
          y1={170}
          x2={width - margin}
          y2={170}
          className="stroke-indigo-200 dark:stroke-indigo-800/40"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Pressure curve */}
        <text
          x={margin}
          y={188}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="11"
          fontWeight="500"
        >
          Pressure variation along the wave
        </text>
        <line
          x1={margin}
          y1={pressureBaselineY}
          x2={width - margin}
          y2={pressureBaselineY}
          className="stroke-indigo-300/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polyline
          points={pressurePts}
          className="fill-none stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />
        <text
          x={margin - 4}
          y={pressureBaselineY - pressureAmp + 2}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="10"
          textAnchor="end"
        >
          high P
        </text>
        <text
          x={margin - 4}
          y={pressureBaselineY + pressureAmp + 8}
          className="fill-sky-700 dark:fill-sky-300"
          fontSize="10"
          textAnchor="end"
        >
          low P
        </text>

        <text
          x={width / 2}
          y={275}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="11"
          textAnchor="middle"
        >
          Compressions = high density = high pressure. Rarefactions = the opposite.
        </text>
      </svg>
    </div>
  );
}
