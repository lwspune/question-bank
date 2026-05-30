/**
 * Echo geometry — a person, a wall at distance d, an outgoing wave, and
 * a returning reflected wave. Labels the round-trip distance 2d and the
 * minimum reflector distance for a distinct echo (~17 m in air).
 *
 * Server component — purely geometric, no animation needed.
 */
export default function EchoGeometry() {
  const width = 600;
  const height = 240;

  const personX = 90;
  const wallX = 480;
  const groundY = 180;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Echo geometry showing a person shouting at a wall and the reflected wave returning"
      >
        <defs>
          <marker
            id="echo-arrow"
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
          <marker
            id="echo-arrow-back"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L0,6 L9,3 z"
              className="fill-rose-700 dark:fill-rose-300"
            />
          </marker>
        </defs>

        <text
          x={width / 2}
          y={20}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Echo — single reflection off a far wall
        </text>

        {/* Ground */}
        <line
          x1={20}
          y1={groundY}
          x2={width - 20}
          y2={groundY}
          className="stroke-indigo-300 dark:stroke-indigo-700"
          strokeWidth="1.5"
        />

        {/* Person (stick figure) */}
        <circle
          cx={personX}
          cy={groundY - 90}
          r={10}
          className="fill-none stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />
        <line
          x1={personX}
          y1={groundY - 80}
          x2={personX}
          y2={groundY - 30}
          className="stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />
        <line
          x1={personX}
          y1={groundY - 65}
          x2={personX - 15}
          y2={groundY - 50}
          className="stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />
        <line
          x1={personX}
          y1={groundY - 65}
          x2={personX + 15}
          y2={groundY - 50}
          className="stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />
        <line
          x1={personX}
          y1={groundY - 30}
          x2={personX - 10}
          y2={groundY}
          className="stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />
        <line
          x1={personX}
          y1={groundY - 30}
          x2={personX + 10}
          y2={groundY}
          className="stroke-indigo-800 dark:stroke-indigo-200"
          strokeWidth="2"
        />

        {/* Wall */}
        <rect
          x={wallX}
          y={groundY - 110}
          width={18}
          height={110}
          className="fill-stone-300 stroke-stone-700 dark:fill-stone-700 dark:stroke-stone-300"
          strokeWidth="1.5"
        />
        <text
          x={wallX + 9}
          y={groundY + 18}
          className="fill-stone-700 dark:fill-stone-300"
          fontSize="11"
          textAnchor="middle"
        >
          wall
        </text>

        {/* Outgoing arrow */}
        <line
          x1={personX + 15}
          y1={groundY - 75}
          x2={wallX - 5}
          y2={groundY - 75}
          className="stroke-indigo-700 dark:stroke-indigo-300"
          strokeWidth="2"
          markerEnd="url(#echo-arrow)"
        />
        <text
          x={(personX + wallX) / 2}
          y={groundY - 82}
          className="fill-indigo-800 dark:fill-indigo-200"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          outgoing (you shout)
        </text>

        {/* Return arrow */}
        <line
          x1={wallX - 5}
          y1={groundY - 45}
          x2={personX + 15}
          y2={groundY - 45}
          className="stroke-rose-700 dark:stroke-rose-300"
          strokeWidth="2"
          markerEnd="url(#echo-arrow-back)"
        />
        <text
          x={(personX + wallX) / 2}
          y={groundY - 28}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          reflected (you hear)
        </text>

        {/* Distance bracket */}
        <line
          x1={personX}
          y1={groundY + 28}
          x2={wallX + 9}
          y2={groundY + 28}
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="1"
        />
        <line
          x1={personX}
          y1={groundY + 24}
          x2={personX}
          y2={groundY + 32}
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="1"
        />
        <line
          x1={wallX + 9}
          y1={groundY + 24}
          x2={wallX + 9}
          y2={groundY + 32}
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="1"
        />
        <text
          x={(personX + wallX) / 2}
          y={groundY + 44}
          className="fill-indigo-800 dark:fill-indigo-200"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
        >
          distance d
        </text>

        <text
          x={width / 2}
          y={height - 5}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="11"
          textAnchor="middle"
        >
          Round-trip = 2d; for a distinct echo, d ≥ 17 m in air (so total time ≥ 0.1 s).
        </text>
      </svg>
    </div>
  );
}
