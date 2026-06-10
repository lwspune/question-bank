/**
 * Simple pendulum displaced by angle θ, with the bob's weight mg resolved into
 * two components: mg cosθ along the string (balanced by tension) and mg sinθ
 * along the arc, the restoring force pulling the bob back to the mean position.
 * For small θ, sinθ ≈ θ, so the restoring force is proportional to displacement
 * — the SHM condition. Reinforces why the period law T = 2π√(L/g) holds only at
 * small amplitudes.
 *
 * Server component — static 2-D.
 */
export default function OscPendulumRestoringForce() {
  const pivotX = 280;
  const pivotY = 30;
  const L = 150; // string length px
  const theta = (22 * Math.PI) / 180; // displacement angle

  const bobX = pivotX + L * Math.sin(theta);
  const bobY = pivotY + L * Math.cos(theta);

  // vertical mean position
  const meanX = pivotX;
  const meanY = pivotY + L;

  // weight vector mg straight down from bob
  const mgLen = 70;
  const mgX = bobX;
  const mgY = bobY + mgLen;

  // component along string (mg cosθ): direction from bob away from pivot
  const ux = Math.sin(theta);
  const uy = Math.cos(theta);
  const compStrLen = mgLen * Math.cos(theta);
  const strEndX = bobX + ux * compStrLen;
  const strEndY = bobY + uy * compStrLen;

  // restoring component (mg sinθ): tangent to arc, perpendicular to string,
  // pointing back toward the mean position
  const tx = Math.cos(theta);
  const ty = -Math.sin(theta);
  const compTanLen = mgLen * Math.sin(theta) * 1.6; // scaled up to be visible
  const tanEndX = bobX - tx * compTanLen;
  const tanEndY = bobY - ty * compTanLen;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 280"
        className="w-full"
        role="img"
        aria-label="A simple pendulum displaced by an angle theta. The weight mg of the bob is resolved into mg cosine theta along the string and mg sine theta along the arc, the restoring force toward the mean position."
      >
        <defs>
          <marker id="osc-pf-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
          <marker id="osc-pf-arrow2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* ceiling */}
        <line x1={pivotX - 70} y1={pivotY} x2={pivotX + 70} y2={pivotY} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="3" />
        <circle cx={pivotX} cy={pivotY} r="3" className="fill-slate-600 dark:fill-slate-300" />

        {/* mean (vertical) dashed line + string */}
        <line x1={pivotX} y1={pivotY} x2={meanX} y2={meanY} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />

        {/* angle arc */}
        <path
          d={`M ${pivotX} ${pivotY + 38} A 38 38 0 0 0 ${pivotX + 38 * Math.sin(theta)} ${pivotY + 38 * Math.cos(theta)}`}
          fill="none"
          className="stroke-slate-500"
          strokeWidth="1.2"
        />
        <text x={pivotX + 16} y={pivotY + 52} fontSize="13" className="fill-slate-700 dark:fill-slate-300">θ</text>

        {/* bob */}
        <circle cx={bobX} cy={bobY} r="11" className="fill-indigo-500 dark:fill-indigo-400" />

        {/* mean-position marker */}
        <circle cx={meanX} cy={meanY} r="3" className="fill-slate-400" />
        <text x={meanX - 8} y={meanY + 22} textAnchor="middle" fontSize="10" className="fill-slate-500">mean</text>

        {/* weight mg */}
        <line x1={bobX} y1={bobY} x2={mgX} y2={mgY} className="stroke-slate-500" strokeWidth="2" markerEnd="url(#osc-pf-arrow2)" />
        <text x={mgX + 6} y={mgY} fontSize="13" fontWeight="600" className="fill-slate-700 dark:fill-slate-300">mg</text>

        {/* component along string mg cosθ */}
        <line x1={bobX} y1={bobY} x2={strEndX} y2={strEndY} className="stroke-slate-400" strokeWidth="1.6" strokeDasharray="3 3" markerEnd="url(#osc-pf-arrow2)" />
        <text x={strEndX + 8} y={strEndY + 12} fontSize="11" className="fill-slate-600 dark:fill-slate-400">mg cosθ</text>

        {/* restoring component mg sinθ (tangent, toward mean) */}
        <line x1={bobX} y1={bobY} x2={tanEndX} y2={tanEndY} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.4" markerEnd="url(#osc-pf-arrow)" />
        <text x={tanEndX - 56} y={tanEndY + 4} fontSize="12" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">mg sinθ</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The restoring force is mg sinθ, directed along the arc back to the mean
        position. For small θ, sinθ ≈ θ, so the force is proportional to
        displacement — the simple-harmonic condition behind T = 2π√(L/g).
      </p>
    </div>
  );
}
