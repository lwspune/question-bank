/**
 * Convex mirror ray diagram — object in front, image always virtual, erect,
 * diminished, located between the pole P and the focus F BEHIND the mirror.
 * Ray 1: parallel to axis, reflects as if diverging from F (behind). Ray 2:
 * heading toward C (behind) retraces. Dashed lines behind the mirror are the
 * virtual back-projections that locate the image.
 *
 * Server component — static 2-D.
 */
export default function OptConvexMirrorRays() {
  const cx = 300; // pole / mirror plane (centre)
  const cy = 150;
  const Fx = 410; // focus BEHIND the mirror (right)
  const Cx = 470; // centre of curvature behind

  const objX = 90;
  const objTop = cy - 75;

  // Virtual image between P and F behind the mirror, erect + diminished
  const imgX = 360;
  const imgTop = cy - 22;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Convex mirror forming a virtual erect diminished image between the pole and focus behind the mirror"
      >
        <defs>
          <marker id="cvm-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* principal axis */}
        <line x1={40} y1={cy} x2={520} y2={cy} className="stroke-indigo-300/70" strokeWidth="1" strokeDasharray="4 4" />

        {/* mirror (convex arc bulging left toward the object) */}
        <path d={`M ${cx} ${cy - 95} A 150 150 0 0 1 ${cx} ${cy + 95}`} className="fill-none stroke-slate-600 dark:stroke-slate-300" strokeWidth="3" />

        {/* F, C behind the mirror */}
        <circle cx={Fx} cy={cy} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={Fx} y={cy + 18} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">F</text>
        <circle cx={Cx} cy={cy} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={Cx} y={cy + 18} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">C</text>
        <text x={cx} y={cy - 100} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">P</text>

        {/* object (upright) */}
        <line x1={objX} y1={cy} x2={objX} y2={objTop} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#cvm-arrow)" />
        <text x={objX} y={objTop - 6} textAnchor="middle" fontSize="11" className="fill-emerald-700 dark:fill-emerald-300">object</text>

        {/* ray 1: parallel to axis, reflects upward as if from F */}
        <line x1={objX} y1={objTop} x2={cx} y2={objTop} className="stroke-indigo-500/80" strokeWidth="1.6" />
        <line x1={cx} y1={objTop} x2={60} y2={objTop - 55} className="stroke-indigo-500/80" strokeWidth="1.6" />
        {/* virtual back-projection toward F */}
        <line x1={cx} y1={objTop} x2={Fx} y2={cy} className="stroke-indigo-400/60" strokeWidth="1.2" strokeDasharray="4 3" />

        {/* ray 2: heading toward C, reflects back on itself */}
        <line x1={objX} y1={objTop} x2={cx} y2={imgTop + 6} className="stroke-rose-500/70" strokeWidth="1.6" />
        <line x1={cx} y1={imgTop + 6} x2={70} y2={imgTop + 30} className="stroke-rose-500/70" strokeWidth="1.6" />
        {/* virtual back-projection to image tip */}
        <line x1={cx} y1={objTop} x2={imgX} y2={imgTop} className="stroke-indigo-400/60" strokeWidth="1.2" strokeDasharray="4 3" />

        {/* virtual image (erect, diminished, behind) */}
        <line x1={imgX} y1={cy} x2={imgX} y2={imgTop} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#cvm-arrow)" />
        <text x={imgX} y={imgTop - 6} textAnchor="middle" fontSize="11" className="fill-rose-700 dark:fill-rose-300">image</text>

        <text x={260} y={290} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">Always virtual, erect, diminished — between P and F, behind the mirror</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        A convex mirror diverges light, so it always gives a virtual, erect,
        diminished image — wherever the object is. That wide field of view is why
        it is used as a vehicle rear-view mirror.
      </p>
    </div>
  );
}
