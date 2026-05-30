/**
 * Stylized cross-section of the human ear — outer (pinna + canal),
 * middle (eardrum + ossicles), and inner (cochlea + auditory nerve).
 * Drawn as simple shapes with labels and signal-flow arrows so a
 * student reads the conversion chain top-to-bottom:
 *   sound → vibration → mechanical → electrical.
 *
 * Server component — purely geometric, no client state.
 */
export default function EarAnatomy() {
  const width = 600;
  const height = 320;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Cross-section of the human ear showing pinna, ear canal, eardrum, ossicles, cochlea, and auditory nerve"
      >
        <defs>
          <marker
            id="ear-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L0,6 L9,3 z"
              className="fill-indigo-600 dark:fill-indigo-400"
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
          Human ear — signal flow
        </text>

        {/* Pinna (outer ear flap) — stylized C shape */}
        <path
          d="M 60 140 Q 30 90, 70 70 Q 110 50, 130 110 Q 140 150, 130 180 Q 110 230, 70 220 Q 40 200, 60 140 Z"
          className="fill-indigo-200/60 stroke-indigo-700 dark:fill-indigo-800/40 dark:stroke-indigo-300"
          strokeWidth="1.5"
        />
        <text
          x={75}
          y={140}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          pinna
        </text>
        <text
          x={75}
          y={154}
          className="fill-indigo-700 dark:fill-indigo-300"
          fontSize="9"
          textAnchor="middle"
        >
          (funnels sound)
        </text>

        {/* Ear canal — tube from pinna to eardrum */}
        <rect
          x={130}
          y={155}
          width={100}
          height={30}
          rx={3}
          className="fill-indigo-100/60 stroke-indigo-700 dark:fill-indigo-900/40 dark:stroke-indigo-300"
          strokeWidth="1.2"
        />
        <text
          x={180}
          y={172}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="10"
          textAnchor="middle"
        >
          ear canal
        </text>

        {/* Eardrum (tympanic membrane) — slanted line */}
        <line
          x1={230}
          y1={150}
          x2={230}
          y2={190}
          className="stroke-rose-600 dark:stroke-rose-400"
          strokeWidth="3"
        />
        <text
          x={232}
          y={140}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="11"
          fontWeight="600"
        >
          eardrum
        </text>
        <text
          x={232}
          y={205}
          className="fill-rose-700 dark:fill-rose-300"
          fontSize="9"
        >
          sound → vibration
        </text>

        {/* Ossicles — three small shapes (malleus, incus, stapes) */}
        <circle
          cx={262}
          cy={155}
          r={6}
          className="fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300"
          strokeWidth="1.2"
        />
        <circle
          cx={282}
          cy={170}
          r={6}
          className="fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300"
          strokeWidth="1.2"
        />
        <circle
          cx={302}
          cy={185}
          r={6}
          className="fill-amber-300 stroke-amber-700 dark:fill-amber-700 dark:stroke-amber-300"
          strokeWidth="1.2"
        />
        <text
          x={282}
          y={130}
          className="fill-amber-800 dark:fill-amber-200"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          ossicles
        </text>
        <text
          x={282}
          y={144}
          className="fill-amber-700 dark:fill-amber-300"
          fontSize="9"
          textAnchor="middle"
        >
          (amplify mechanically)
        </text>

        {/* Cochlea — spiral */}
        <path
          d="M 380 175 Q 380 145, 410 145 Q 440 145, 440 175 Q 440 205, 410 205 Q 392 205, 392 175 Q 392 160, 408 160 Q 422 160, 422 175 Q 422 188, 410 188"
          className="fill-none stroke-emerald-700 dark:stroke-emerald-300"
          strokeWidth="2.5"
        />
        <text
          x={410}
          y={130}
          className="fill-emerald-800 dark:fill-emerald-200"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
        >
          cochlea
        </text>
        <text
          x={410}
          y={232}
          className="fill-emerald-700 dark:fill-emerald-300"
          fontSize="9"
          textAnchor="middle"
        >
          pressure → electrical
        </text>

        {/* Auditory nerve */}
        <line
          x1={440}
          y1={185}
          x2={530}
          y2={195}
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2"
          markerEnd="url(#ear-arrow)"
        />
        <text
          x={500}
          y={175}
          className="fill-emerald-700 dark:fill-emerald-300"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          to brain
        </text>
        <text
          x={500}
          y={188}
          className="fill-emerald-700 dark:fill-emerald-300"
          fontSize="9"
          textAnchor="middle"
        >
          (auditory nerve)
        </text>

        {/* Flow arrows between stages */}
        <line
          x1={130}
          y1={252}
          x2={230}
          y2={252}
          className="stroke-indigo-500/60"
          strokeWidth="1.2"
          markerEnd="url(#ear-arrow)"
        />
        <line
          x1={232}
          y1={252}
          x2={310}
          y2={252}
          className="stroke-rose-500/60"
          strokeWidth="1.2"
          markerEnd="url(#ear-arrow)"
        />
        <line
          x1={312}
          y1={252}
          x2={385}
          y2={252}
          className="stroke-amber-600/60"
          strokeWidth="1.2"
          markerEnd="url(#ear-arrow)"
        />

        <text
          x={width / 2}
          y={290}
          className="fill-indigo-900 dark:fill-indigo-100"
          fontSize="11"
          fontWeight="500"
          textAnchor="middle"
        >
          Sound waves → mechanical vibration → mechanical amplification → electrical nerve impulses
        </text>
        <text
          x={width / 2}
          y={306}
          className="fill-indigo-600 dark:fill-indigo-400"
          fontSize="10"
          textAnchor="middle"
        >
          The cochlea is where pressure becomes electrical — the biological microphone.
        </text>
      </svg>
    </div>
  );
}
